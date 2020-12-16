import React from 'react'
import './css/sidebar.css'
function showSidebar({text, Icons, active, displayNone, notAvailable}) {
    return (
        <div className={`showSidebar ${ active && "showSidebar__active" } ${notAvailable && "showSidebar__notAvailable"} ${displayNone && "display__none"}`}>
            <Icons className="showSidebar__icons" />
            <h3>{text}</h3>
        </div>
    )
}

export default showSidebar
