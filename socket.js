const ioLib = require('socket.io');
const Room = require('./models/Room')
const User = require('./models/User')
const sequelize = require('sequelize');
// const app = require('./server');
const Op = sequelize.Op

module.exports = (server, app) => {
    io = ioLib(server);
    app.set('socketio', io);
    io.on('connection', socket => {
        /*******************************************************************
         * 
         *                      socket for Room
         * 
         *******************************************************************/
        socket.on('reqRoomInfo', data=>{
            Room.findOne({
                where:{
                    id: data.roomid
                }
            })
            .then(room=>{
                if(room != undefined){
                    let roomInFo={
                        name: room.name,
                        active: room.active
                    }
                    socket.emit('resRoomInfo', roomInFo);
                }
                else{
                    socket.emit('err', "room doesnt exist!");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        socket.on('enter', data => {
            socket.join(`${data.roomid}`, () => {
                let usr = [];
                let room = Object.keys(socket.rooms);
                console.log(room);
                Room.findOne({
                    where: {
                        id: data.roomid
                    }
                })
                    .then(room => {
                        if(room != undefined){
                            let specific_usr = (room.playerid).filter(ele=>{
                                return ele == data.userid
                            })
                            let UserNotInRoom = (!specific_usr.length)?true:false;
                            if(room.active == false && UserNotInRoom){
                                (room.playerid).push(data.userid);
                                room.update({playerid: room.playerid});
                                console.log("room.playerid "+room.playerid);
                                User.findAll({
                                    where: {
                                        id: {
                                            [Op.or]: [...room.playerid]
                                        }
                                    }
                                })
                                    .then(user => {
                                        console.log("match user " + user);
                                        for(let i=0; i<user.length; ++i){
                                            let name = (user[i].first_name).concat(user[i].last_name)
                                            usr.push({
                                                id: user[i].id,
                                                name: name
                                            })
                                        }
                                    })
                                    .then(()=>{
                                        console.log("return usr" + usr);
                                        io.in(`${data.roomid}`).emit('players', usr);
                                        // io.in('home').emit('update_rooms', {
                                        //     primary_k: room.id,
                                        //     name: room.name,
                                        //     player_num: usr.length
                                        // })
                                        Room.findAll({
                                            where:{
                                                id:{[Op.gt]: 0}
                                            }
                                        })
                                        .then(allRoom=>{
                                            let updateRoom = [];
                                            allRoom.forEach(ele=>{
                                                updateRoom.push({
                                                    primary_k: ele.id,
                                                    name: ele.name,
                                                    player_num: ele.playerid.length
                                                })        
                                            })
                                            io.in('home').emit('update_rooms', updateRoom);
                                        })
                                        .catch(err=>{
                                            console.log(err);
                                        })
                                    })   
                            }else{
                                socket.emit('kickout');
                            }
                        }else{
                            socket.emit('err', "fail to use socket to enter the room!");
                        }
                        
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })
        })
        socket.on('leave', data => {
            socket.leave(`${data.roomid}`, () => {
                let user = [];
                let usr = [];
                // let roomName;
                let room = Object.keys(socket.rooms);
                console.log(room);
                Room.findOne({
                    where: {
                        id: data.roomid
                    }
                })
                    .then(room => {
                        user = room.playerid;
                        console.log("user before leave "+user);
                        let needToDelete = user.filter(ele => {
                            return ele == data.userid
                        })
                        console.log(needToDelete[0]);
                        user.splice(user.indexOf(needToDelete[0]), 1);
                        room.update({playerid: user});
                        // roomName = room.name
                    })
                    .then(() => {
                        console.log("user after leave "+user);
                        User.findAll({
                            where: {
                                id: {
                                    [Op.or]: [...user]
                                }
                            }
                        })
                            .then(user => {
                                for(let i=0; i<user.length; ++i){
                                    let name = (user[i].first_name).concat(user[i].last_name)
                                    usr.push({
                                        id: user[i].id,
                                        name: name
                                    })
                                }

                            })
                            .then(()=>{
                                console.log(usr);
                                io.to(`${data.roomid}`).emit('players', usr); // specific player leave the room 
                                                                              // and need to let the rest of players in the room update the condi of the room
                                // io.in('home').emit('update_rooms', {
                                //     primary_k: data.roomid,
                                //     name: roomName,
                                //     player_num: usr.length
                                // })
                            })
                            .then(()=>{
                                if(user.length === 0){
                                    // room.destroy({force: true});
                                    Room.findOne({
                                        where:{
                                            id: data.roomid
                                        }
                                    })
                                    .then(room=>{
                                        room.destroy({force: true});
                                    })
                                }
                                
                                Room.findAll({
                                    where:{
                                        id:{[Op.gt]: 0}
                                    }
                                })
                                .then(allRoom=>{
                                    let updateRoom = [];
                                    allRoom.forEach(ele=>{
                                        updateRoom.push({
                                            primary_k: ele.id,
                                            name: ele.name,
                                            player_num: ele.playerid.length
                                        })        
                                    })
                                    io.in('home').emit('update_rooms', updateRoom);
                                })
                                .catch(err=>{
                                    console.log(err);
                                })
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })
        })
        socket.on('step', data=>{
            let broadCastToPlayer = {
                id: data.userid,
                step: data.step
            }
            console.log(broadCastToPlayer);
            // socket.to(`${data.roomid}`).emit('update', broadCastToPlayer); // except sender
            io.in(`${data.roomid}`).emit('update', broadCastToPlayer); // include sender
        })
        socket.on('start', data=>{
            Room.findOne({
                where:{
                    id: data.roomid
                }
            })
            .then(room=>{
                room.update({active: true});
                console.log("room.id = "+room.id);
                console.log("inactive the room");
            })
            .then(()=>{
                io.in(`${data.roomid}`).emit('start');
            })
            .catch(err=>{
                console.log(err);
            })
        })
         /*******************************************************************
         * 
         *                      socket for Home
         * 
         *******************************************************************/
        socket.on('enter_home', ()=>{
            socket.join('home');
        })
        socket.on('leave_home', ()=>{
            socket.leave('home');
        })
    })
}