import { SERVER } from '../config'
import axios from 'axios'

export const signup = user => {
    return axios({
        method: 'post',
        url: `${SERVER}/api/auth/signup`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(user)
    })
}

export const signin = user => {
    return axios({
            method: 'post',
            url:`${SERVER}/api/auth/signin`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(user)
        })
}

export const authenticate = (res, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(res.data.authenticationToken))
        localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}

