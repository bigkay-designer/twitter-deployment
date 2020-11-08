import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed} from 'react-twitter-embed';
import './css/widget.css'

function Widget() {
    return (
        <div className="widget">
            <div className="input">
                <SearchIcon className="widget__input--icon" />
                <input type="text" placeholder="Search Twitter" />
            </div>
            <h2>What's happening</h2>
            <TwitterTimelineEmbed 
                sourceType="profile"
                screenName="hannaay__"
                options={{height: 400}}
            />
            
            <TwitterTweetEmbed
                tweetId={'1321479550002450434'}
            />
            <TwitterShareButton 
                url={"https://twitter.com/bigkayyy_"}
                options={{text: 'react is awesome', via: 'hannaay__'}}
            />
        </div>
    )
}

export default Widget
