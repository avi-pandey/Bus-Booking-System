
import axios from 'axios'

export function seatReserve(seats){
    let apiUrl = 'http://localhost:8080/seats/reserve'
    const authToken = sessionStorage.getItem('authToken') || ''


    return axios.post(apiUrl,seats,{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
}