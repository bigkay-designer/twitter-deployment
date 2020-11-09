import axios from 'axios'

// All url will start with the one below
const instance = axios.create({
    baseURL: "https://callmyneighbour.site/"
})


export default instance