import axios from 'axios'
import jwt from 'jwt-simple'

export const register = newUser => {
    let data = {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
    }

    return axios
        .post(window.env.backend + 'users/register', data)
        .then(res => {
            if (res.data.status && res.data.status.includes('registered')) {
                alert("Registered")
            } else {
                alert('Register fail. Either the email already registered or the server is down')
            }
        })
        .catch(err => {alert("Register fail due to network or database error")})
}


export const login = user => {
    let data = {        
        email: user.email,
        password: user.password
    }

    return axios
        .post(window.env.backend + 'users/login', data)
        .then(res => {
            localStorage.setItem('usertoken', res.data.token)
            localStorage.setItem('id', res.data.primary_k);
            return res.data.token
        })
        .catch(err => {debugger})
}

