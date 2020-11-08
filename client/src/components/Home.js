import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom";
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgegts from './Widget'
import axios from 'axios'

import '../App.css';

function Home() {
    const [data, setData]= useState(true)


    useEffect (()=>{
             axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:3001/user",
              }).then((res) => {
                  if(!res.data){
                      setData(false);
                  }
              });
    }, [])

    return (
        <>
        {data ?
            <div className="App">
                <Sidebar />
                <Feed />
                <Widgegts />
            </div>
        : <Redirect to="/" /> }
        </>
    )
}

export default Home
