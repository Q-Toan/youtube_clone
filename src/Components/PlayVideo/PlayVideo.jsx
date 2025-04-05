import React from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import {API_Key, value_converter} from '../../data'
import { useEffect, useState } from 'react';
import moment from 'moment';

const PlayVideo = ({videoId}) => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        // fetch videos data
        const videoDetails = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_Key}`;
        await fetch(videoDetails).then(res => res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData = async () => {
        // fetch channel data
        const channelDetails = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_Key}`;
        await fetch(channelDetails).then(res => res.json()).then(data => setChannelData(data.items[0]));
        
        const commet_url =`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_Key}`; {
            await fetch(commet_url).then(res => res.json()).then(data => setCommentData(data.items));
        }
    }

    

    useEffect(() => {
        fetchVideoData();
    }, []);

    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);
    console.log(channelData)

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData?apiData.statistics.viewCount:"16k")} &bull; {moment(apiData?apiData.snippet.publishedAt:"waiting!").fromNow()}</p>
                <div>
                    <span><img src={like} alt="" />{value_converter(apiData?apiData.statistics.likeCount:"ko")}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:""}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscriber</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0, 250):""}</p>
                <hr />
                <h4>{value_converter(apiData?apiData.statistics.commentCount:"ko")} Comments</h4>
                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="like" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="like" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayVideo