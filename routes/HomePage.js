const express = require('express');
const homePage = express.Router();
const cors = require("cors");
const Room = require('../models/Room');
const User = require('../models/User');
const sequelize = require('sequelize');
const Op = sequelize.Op
const numOfHighScoreUser = 5;

homePage.use(cors());

homePage.get('/rooms', (req, res)=>{
    console.log("get /rooms api is called");
    //let headerInFo = req.headers; // if anything needs to transmit to backend
    Room.findAll({
        where: sequelize.where(sequelize.fn('array_length', sequelize.col('playerid'), 1), 3) // three players in a room is full 
    })
    .then(needToBeTrue=>{
        for(let i=0; i<needToBeTrue.length; ++i){
            needToBeTrue[i].update({active: true});
        }
    })
    .then(()=>{
        Room.findAll({
            where:{
                active: false
            }
        })
        .then(activeRoom=>{
            let roomArr =[];
            activeRoom.forEach(ele=>{
                roomArr.push({
                    primary_k: ele.id,
                    name: ele.name,
                    player_num: ele.playerid.length
                })
            })
            res.send(roomArr);
        })
        .catch(err=>{
            console.log(err)
        });
    })
    .catch(err=>{
        console.log(err);
    })
    
})

homePage.get('/highScore', (req, res)=>{
    console.log("get /highScore api is called");

    User.findAll({
        where:{
            score:{[Op.gt]: 0}
        }
    })
    .then(highScoreUser=>{
        let userWillReturn = highScoreUser.sort((a,b)=>{
            // return b.score - a.score; // largest one to smallest one
            return a.score - b.score; // small to high
        })
        let usr = [];
        for(let i=0; i<userWillReturn.length; ++i){
            let name = (userWillReturn[i].first_name).concat(userWillReturn[i].last_name);
            usr.push({
                id: userWillReturn[i].id,
                name: name,
                score: userWillReturn[i].score
            })
        }
        // console.log(usr);

        if(usr.length > numOfHighScoreUser){
            let lastAvailableScore = usr[numOfHighScoreUser-1].score;
            let user = usr.filter(element=>{
                return element.score <= lastAvailableScore
            })
            res.send(user);
        }else{
            res.send(usr);
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

homePage.post('/rooms', (req, res)=>{
    let io = req.app.get('socketio') // use socket io in api
    let roomInFo ={
        name: req.body.roomName,
        active: false,
        playerid: []
    }
    Room.create(roomInFo)
    .then(newRoom=>{
        // io.in('home').emit('update_rooms', {
        //     primary_k: newRoom.id,
        //     name: req.body.roomName,
        //     player_num: newRoom.playerid.length
        // })
        res.send({roomid: newRoom.id});
    })
    .then(()=>{
        Room.findAll({
            where:{
                id:{[Op.gt]: 0}
            }
        })
        .then(allRoom=>{
            let updateRoom = [];
            allRoom.forEach(ele=>{
                if(!ele.active){
                    updateRoom.push({
                        primary_k: ele.id,
                        name: ele.name,
                        player_num: ele.playerid.length
                    })       
                } 
            })
            io.in('home').emit('update_rooms', updateRoom);
            console.log("io works");
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err); 
    })
})

homePage.post('/record', (req, res)=>{
    // User.findAll({
    //     where:{
    //         score:{[Op.gt]: 0}
    //     }
    // })
    // .then(user=>{
    //     for(let i=0; i<user.length; ++i){
    //         user[i].update({score: (Math.floor(Math.random() * 10) + 1)*10000})
    //     }
    //     res.send("succeed");
    // })
    // .catch(err=>{
    //     console.log(err);
    // })

    User.findOne({
        where:{
            id: req.headers.id
        }
    })
    .then(user=>{
        let newScore;
        if(!user.score || user.score > req.body.score){
            newScore = req.body.score;
        }else{
            newScore = user.score;
        }

        user.update({score: newScore})
        .then(()=>{
            res.sendStatus(200)
            Room.findOne({
                where:{
                    id: req.body.roomid
                }
            })
            .then(room=>{
                if(room != undefined){
                    room.destroy({force: true});
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

homePage.get('/score', (req, res)=>{
    let id = parseInt(req.headers.id)
    User.findOne({
        where: {
            id: id
        }
    })
        .then(user=>{
            if(user){
                res.send({score: user.score});
            }else{
                res.send("user is not exist!");
            }
        })
        .catch(err=>{
            console.log(err);
        })
})

module.exports = homePage;
