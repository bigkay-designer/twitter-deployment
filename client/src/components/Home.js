import React from 'react'
// import {Redirect} from "react-router-dom";
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgegts from './Widget'
// import axios from '../axios'

import '../App.css';

function Home() {
    // const [data, setData]= useState(false)


    // useEffect (()=>{
    //          axios({
    //             method: "GET",
    //             url: "/api",
    //             headers: {"auth-token": localStorage.getItem("token")}
    //           }).then((res) => {
    //                     setData(true);
    //           });
    // }, [])

    return (
        <>
            <div className="App">
                <Sidebar />
                <Feed />
                <Widgegts />
            </div>
        </>
    )
}

export default Home
