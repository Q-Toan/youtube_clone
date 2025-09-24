import './Feed.css';
import { Link } from 'react-router-dom';
import {API_Key, value_converter} from '../../data';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Feed = ({category}) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_Key}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.items && Array.isArray(data.items)) {
                setData(data.items);
            } else {
                setData([]); 
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setData([]);
        }
    }

    useEffect(() => {
        fetchData();
    },[category])

    return (
        <div className='feed'>
            {data.map((item, index)=> {
                const videoId = item.id.videoId || item.id;
                const categoryId = item.snippet.categoryId || '0'; 

                return (
                    <Link to= {`video/${categoryId}/${videoId}`} className='card' key={index}>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        {/* Search results don't have statistics, so conditionally render views and date */}
                        {item.statistics ? (
                            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                        ) : (
                            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
                        )}
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed