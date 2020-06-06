import axios from 'axios'

export function getResevedSeats(busNumber) {
    let apiUrl = 'http://localhost:8080/seats/reserved-seats'
    const authToken = sessionStorage.getItem('authToken') || ''

    return axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'busNumber': `${busNumber}`
        }
    })
}