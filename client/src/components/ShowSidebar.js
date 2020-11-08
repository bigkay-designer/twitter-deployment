import React from 'react'
import './css/sidebar.css'
function showSidebar({text, Icons, active, displayNone}) {
    return (
        <div className={`showSidebar ${ active && "showSidebar__active" } ${displayNone && "display__none"}`}>
            <Icons className="showSidebar__icons" />
            <h3>{text}</h3>
        </div>
    )
}

export default showSidebar
