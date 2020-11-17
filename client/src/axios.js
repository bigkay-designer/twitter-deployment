import axios from 'axios'

// All url will start with the one below
const instance = axios.create({
    baseURL: "http://twitter-clone.xyz/"
})


export default instance