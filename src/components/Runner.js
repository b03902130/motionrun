import React, { Component } from "react";
import { Animate } from "react-rebound";
import {
    Paper,
} from '@material-ui/core'
import './Runner.css'

function Runner(props) {
    return (
        <Paper style={{width: "700px", padding: "10px"}}>
            <span className={`gif-start`}></span>
            <Animate translateX={props.info.x} friction={80}>
                <img className={`gif-now`} style={{width: "100px"}} src={`${window.env.backend}gifs/${props.info.imgurl}.gif`} alt="loading..." />
            </Animate>
        </Paper>
    )
}

export default Runner;


