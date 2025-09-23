import './Feed.css';
import { Link } from 'react-router-dom';
import {API_Key, value_converter} from '../../data';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Feed = ({category, searchQuery}) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_Key}`;

        if (searchQuery) {
            url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=50&type=video&key=${API_Key}`;
        }
        
        await fetch(url)
            .then(response => response.json())
            .then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData();
    },[category, searchQuery])

    return (
        <div className='feed'>
            {data.map((item, index)=> {
                const videoId = item.id.videoId || item.id;
                // The search result doesn't contain categoryId in the snippet, so we can't pass it in the URL.
                // The recommended feed will just show most popular for now when coming from a search result.
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