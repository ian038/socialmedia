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

export const signout = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return axios.get(`${SERVER}/api/auth/signout`)
        .then(res => {
           return res.data
        })
        .catch(error => console.log(error))
    }
}


export const authenticate = (res, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(res.data.authenticationToken))
        localStorage.setItem('userid', JSON.stringify(res.data.userId))
        localStorage.setItem('username', JSON.stringify(res.data.username))
        localStorage.setItem('useremail', JSON.stringify(res.data.userEmail))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
    }
    if(localStorage.getItem('jwt')) {
        const user = {}
        user['id'] = JSON.parse(localStorage.getItem('userid'))
        user['username'] = JSON.parse(localStorage.getItem('username'))
        user['email'] = JSON.parse(localStorage.getItem('useremail'))
        return JSON.parse(localStorage.getItem('jwt')) && user
    } else {
        return false
    }
}

