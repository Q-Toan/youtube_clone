import { useEffect, useState } from "react";
import "./Recommended.css";
import { API_Key, value_converter } from "../../data";
import { Link } from "react-router-dom";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

const Recommended = ({categoryId}) => {

    const [apiData, setApiData] = useState([]);
    const [visibleVideos, setVisibleVideos] = useState(5);

    const fetchData = async () => {
    try {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=US&videoCategoryId=${categoryId}&key=${API_Key}`;
        const response = await fetch(relatedVideo_url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
            setApiData(data.items);
        } else {
            setApiData([]); 
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
    useEffect(()=> {
        fetchData();
    },[categoryId])

    return (
        <div className="recommended">
            {apiData.slice(0, visibleVideos).map((item,index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                );
            })}
            {apiData.length > visibleVideos && (
                <ShowMoreButton onClick={() => setVisibleVideos(prev => prev + 5)}>
                    Show more
                </ShowMoreButton>
            )}
        </div>
    );
}
export default Recommended;