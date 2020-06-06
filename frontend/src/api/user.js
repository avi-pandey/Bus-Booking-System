import axios from 'axios'

export function signup(user){
    let apiUrl = 'http://localhost:8080/signup'
    return axios.post(apiUrl,user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export function login(userCred){
    let apiUrl = 'http://localhost:8080/login'
    return axios.post(apiUrl, userCred, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}