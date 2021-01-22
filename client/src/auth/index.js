import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const signup = user => {
    return axios({
        method: 'post',
        url: `/api/auth/signup`,
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
            url:`/api/auth/signin`,
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
        return axios.get(`/api/auth/signout`)
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
        const decoded = jwt_decode(localStorage.getItem('jwt'))
        const expirationTime = (decoded.exp * 1000) - 60000
        if(Date.now() >= expirationTime) {
            localStorage.clear()
        }
        const user = {}
        user['id'] = JSON.parse(localStorage.getItem('userid'))
        user['username'] = JSON.parse(localStorage.getItem('username'))
        user['email'] = JSON.parse(localStorage.getItem('useremail'))
        user['token'] = JSON.parse(localStorage.getItem('jwt'))
        return user
    } else {
        return false
    }
}

export const forgotPassword = email => {
    return axios({
        method: 'post',
        url: `/api/auth/forgotpassword`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: email
    }) 
}

export const resetPassword = resetInfo => {
    return axios({
        method: 'put',
        url: `/api/auth/resetpassword/${resetInfo.userId}/${resetInfo.token}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: resetInfo.password
    }) 
}
