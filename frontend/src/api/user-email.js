import axios from 'axios'

export function emailAuth(user){
    let apiUrl = `http://localhost:8080/auth/email`
    // const authToken = sessionStorage.getItem('authToken') || ''
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlZDVmZDAyNjg1YWY4NDhiNmFkN2U3MiIsImVtYWlsIjoidHJAZy5jb20ifSwiaWF0IjoxNTkxMzI3NzA3fQ.Nc_K1ngafaVuv6CPYwEYZvNg3nV26GgBBUcuwK6FQX4'

    const email = {'email':`${user}`}
    return axios.post(apiUrl,email,{
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`


        }
    })
}