import './Feed.css';
import { Link } from 'react-router-dom';
import {API_Key} from '../../data';
import { useEffect, useState } from 'react';
import { value_converter } from '../../data';
import moment from 'moment';

const Feed = ({category}) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_Key}` 
        await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
    }
    useEffect(() => {
        fetchData();
    },[category])

    console.log(data)

    return (
        <div className='feed'>
            {data.map((item, video)=> {
                return (
                    <Link to= {`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                        <h3>{item.snippet.channelTitle}</h3>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed