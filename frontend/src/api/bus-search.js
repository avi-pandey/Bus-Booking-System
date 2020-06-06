import axios from 'axios'

export function busSearch({ from, to, trvDate }) {
    let apiUrl = `http://localhost:8080/bus/search`
    const authToken = sessionStorage.getItem('authToken') || ''

    return axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'to': `${to}`,
            'trvDate': `${trvDate}`,
            'from': `${from}`
        }
    })
}