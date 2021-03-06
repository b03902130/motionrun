import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {
    Typography,
    Box,
    Divider,
    Fab,
    Grid,
    Paper,
} from '@material-ui/core'
import './Room.css'

import { Animate } from "react-rebound"
import Camera from './Camera'
import Runner from './Runner'
import axios from 'axios'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roominfo: null,
            players: [],
            timer: 3,
            players_info: {},
            endplayersnum: 0,
        }
        this.end = false
        this.socket = undefined
        this.userid = localStorage.getItem('id')
        this.endpoint = 500
    } 
    
    componentDidMount() {
        window.onbeforeunload = () => {
            console.log('onbeforeunload')
            // debugger
            this.leave()
        }

        // Handling socket
        this.socket = openSocket(window.env.backend)
        if (this.socket !== undefined) {
            this.socket.on('err', data => {
                console.log(data)
                this.props.history.push('/')
            })
            this.socket.on('resRoomInfo', data => {
                this.setState({roominfo: data})
            })
            this.socket.on('kickout', data => {
                alert('This room is not available anymore')
                this.props.history.push('/')
            })
            this.socket.on('players', data => {
                this.setState({players: data})
            })
            this.socket.on('start', data => {
                let info = {}
                // initialization
                this.state.players.forEach(player => {
                    info[player.id] = {
                        x: 0,
                        imgurl: Math.floor(Math.random() * 15) + 1
                    }
                })
                this.setState(state => ({roominfo: {...state.roominfo, active: true}, players_info: info}))
                this.interval = window.setInterval(() => {this.countdown()}, 1000)
            })
            this.socket.on('update', data => {
                let playerid = parseInt(data.id)
                this.setState(state => {
                    let info = state.players_info[playerid]
                    if (info) {
                        let old_x = info.x
                        let new_x = data.step > old_x ? data.step : old_x
                        info.x = new_x
                    }
                    return state
                })
            })

            // enter the room
            this.reqRoomInfo()
            this.enter()            
        } else {
            alert('Can not connect to server via Socket.io')
        }
    }

    componentWillUnmount() {
        // leave the room
        let id = parseInt(this.userid)
        let ids = this.state.players.map(player => player.id)
        if (ids.includes(id)) {
            console.log('componentWillUnmount')
            // debugger
            this.leave()
        }
        window.onbeforeunload = null 
    }
    
    updateX = (diffPixels) => {
        let threshold = 10
        let endpoint = this.endpoint
        let pixel = Math.round(diffPixels / 1000)
        pixel = pixel <= threshold ? pixel : threshold
        
        if (process.env.NODE_ENV === 'development') {
            pixel *= 100
        }
        else {
            pixel *= 5 
        }

        let old_x = this.state.players_info[this.userid].x
        if (diffPixels && !this.end) {
            this.step(old_x + pixel)
        } 
    };
    
    countdown = () => {
        this.setState(state => {
            let newTimer = state.timer - 1
            if (newTimer === 0) {
                window.clearInterval(this.interval)
                this.interval = window.setInterval(this.judger, 10)
                this.startTime = new Date().getTime()
            }
            return {timer: newTimer}
        })
    }
    
    judger = () => {
        let start = document.getElementsByClassName(`gif-start`)[0].getBoundingClientRect().x
        let movements = [...document.getElementsByClassName(`gif-now`)].map(obj => obj.getBoundingClientRect().x - start)
        this.setState(state => {
            let new_rank = state.endplayersnum + 1
            let update = {}
            movements.forEach((movement, index) => {
                if (movement >= this.endpoint) {
                    let player = state.players[index]
                    let playerinfo = state.players_info[player.id]
                    let timing = new Date().getTime() - this.startTime
                    if (!playerinfo.rank) {
                        update.players_info = {
                            ...state.players_info,
                            [player.id]: {
                                ...playerinfo,
                                rank: new_rank,
                                timing: timing
                            }
                        }
                        update.endplayersnum = new_rank
                    }
                    if (!state.winner) {
                        update.winner = player.name
                    }
                    if (!this.end && state.players[index].id == this.userid) {
                        this.end = true
                        let userid = this.userid 
                        let roomid = this.props.match.params.roomid
                        axios.post(window.env.backend + 'record', {roomid: roomid, score: parseInt(timing)}, {headers: {id: userid} })
                            .then(res => {
                                console.log('Update successes')
                            })
                            .catch(err => {
                                alert('Error when posting record')
                            })
                    }
                }
            })
            return update
        })
    }

    enter = () => {
        let userid = this.userid 
        let roomid = this.props.match.params.roomid
        if (userid === 'undefined' || roomid === undefined) {
            alert('Data not complete')
        } else {
            this.socket.emit('enter', {
                userid: userid, 
                roomid: roomid
            })
        }
    }
    
    reqRoomInfo = () => {
        let roomid = this.props.match.params.roomid
        if (roomid === undefined) {
            alert('Data not complete')
        } else {
            this.socket.emit('reqRoomInfo', {
                roomid: roomid
            })
        }
    }

    leave = () => {
        // debugger
        console.log('Leave')
        let userid = this.userid 
        let roomid = this.props.match.params.roomid
        if (userid === 'undefined' || roomid === undefined) {
            alert('Data not complete')
        } else {
            let tmp = this
            this.socket.emit('leave', {
                userid: userid,
                roomid: roomid
            })
        }
        window.clearInterval(this.interval)
    }
    
    start = () => {
        this.socket.emit('start', {roomid: this.props.match.params.roomid})
    }

    step = (amount) => { 
        if (this.state.timer === 0) {
            this.socket.emit('step', {
                roomid: this.props.match.params.roomid,
                userid: this.userid,
                step: amount
            })
        }
    }

    render() {
        return ( !this.state.roominfo ? 
            <h3>Loading</h3>
            :
            !this.state.roominfo.active ?
                <div>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="Add"
                        onClick={this.start}
                        style={{
                            margin: "20px auto",
                            display: "block"
                        }}
                    >
                        START    
                    </Fab>
                    <Typography component="div">
                        <Box className="title" textAlign="center" fontWeight="fontWeightLight" fontSize={22} fontFamily="Segoe UI">
                            Room Name
                        </Box>
                        <Box className="content" textAlign="center" fontWeight="fontWeightHeavy" fontSize={60} fontFamily="Segoe UI">
                            {this.state.roominfo.name}
                        </Box>
                        <Divider className="divider" />
                        <Box className="title" textAlign="center" fontWeight="fontWeightLight" fontSize={22} fontFamily="Segoe UI">
                            Players
                        </Box>
                        {
                            this.state.players.map(player => (
                                <Box className="content" textAlign="center" fontWeight="fontWeightHeavy" fontSize={36} fontFamily="Segoe UI">
                                    {player.name}
                                </Box>
                            ))
                        }
                    </Typography>
                </div>
                :
                <div>
                    <Grid container spacing={3}>
                        {
                            this.state.timer !== 0 ?
                                <Grid item xs={8} style={{marginTop: "50px"}}>
                                {
                                    <Typography component="div">
                                        <Box textAlign="center" fontWeight="fontWeightBold" fontSize={48} fontFamily="Segoe UI">
                                            ARE YOU READY
                                        </Box>
                                        <Box textAlign="center" fontWeight="fontWeightBold" fontSize={200} fontFamily="Segoe UI">
                                            {this.state.timer}
                                        </Box>
                                    </Typography>
                                }
                                </Grid>
                                :
                                <Grid item xs={8}>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        {
                                            this.state.players.map(player => (
                                                <Grid item style={{marginTop: "30px"}}>
                                                    <h3 style={{display: "inline-block"}}><strong>{player.name}</strong></h3>
                                                    { this.state.players_info[player.id].rank &&
                                                            <span>
                                                                <h3 style={{display: "inline-block", color: "red", fontWeight: 900, marginLeft: "15px"}}>
                                                                    {`rank ${this.state.players_info[player.id].rank}`}
                                                                </h3>
                                                                {
                                                                    player.id == this.userid && 
                                                                        <h3 style={{display: "inline-block", color: "gray", fontWeight: 900, marginLeft: "15px"}}>
                                                                            {`${this.state.players_info[player.id].timing} ms`}
                                                                        </h3>
                                                                }
                                                            </span>
                                                    }
                                                    <Runner info={this.state.players_info[player.id]} playerid={player.id} />
                                                </Grid>        
                                            ))
                                        }
                                </Grid>
                                </Grid>
                        }
                        <Grid item xs={4} style={{marginTop: "30px"}}>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {
                                    this.state.winner && 
                                    <Grid item>
                                        <Paper>
                                            <Typography component="div">
                                                <Box style={{width: "350px"}} textAlign="center" fontWeight="fontWeightLight" fontSize={22} fontFamily="Segoe UI">
                                                    WINNER
                                                </Box>
                                                <Box style={{width: "350px"}} textAlign="center" fontWeight="fontWeightBold" fontSize={40} fontFamily="Segoe UI">
                                                    {this.state.winner}
                                                </Box>
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                }        
                                <Grid item>
                                    <Camera updateX={this.updateX} />        
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
        )
    }
} 
        
export default withRouter(Room)


