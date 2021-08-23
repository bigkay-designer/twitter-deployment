import React from 'react';
import './css/sidebar.css';
function ShowSidebar({
  text,
  Icons,
  onClick,
  activeNavHome,
  activeNavMessages,
  displayNone,
  notAvailable,
}) {
  return (
    <div
      onClick={onClick}
      className={`showSidebar ${
        activeNavHome || activeNavMessages ? 'showSidebar__active' : null
      } ${notAvailable && 'showSidebar__notAvailable'} ${
        displayNone && 'display__none'
      }`}
    >
      <Icons className="showSidebar__icons" />
      <h3>{text}</h3>
    </div>
  );
}

export default ShowSidebar;
