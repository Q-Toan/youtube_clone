import { useEffect, useState } from "react";
import "./Recommended.css";
import { API_Key, value_converter } from "../../data";
import { Link } from "react-router-dom";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

const Recommended = ({categoryId, channelId}) => {

    const [apiData, setApiData] = useState([]);
    const [visibleVideos, setVisibleVideos] = useState(5);

    const fetchData = async () => {
        if (!categoryId && !channelId) {
            return;
        }

        try {
            let categoryVideos = [];
            if (categoryId) {
                const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_Key}`;
                const response = await fetch(relatedVideo_url);
                const data = await response.json();
                if (data.items) {
                    categoryVideos = data.items;
                }
            }

            let channelVideos = [];
            if (channelId) {
                const channelVideo_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&type=video&key=${API_Key}`;
                const response = await fetch(channelVideo_url);
                const data = await response.json();
                if (data.items) {
                    // The search endpoint returns a different structure, so we need to fetch video details
                    const videoIds = data.items.map(item => item.id.videoId).join(',');
                    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${API_Key}`;
                    const detailsResponse = await fetch(videoDetails_url);
                    const detailsData = await detailsResponse.json();
                    if (detailsData.items) {
                        channelVideos = detailsData.items;
                    }
                }
            }

            const combinedVideos = [...categoryVideos, ...channelVideos];
            const uniqueVideos = Array.from(new Map(combinedVideos.map(video => [video.id, video])).values());
            const shuffledVideos = uniqueVideos.sort(() => Math.random() - 0.5);

            setApiData(shuffledVideos);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    useEffect(()=> {
        fetchData();
    },[categoryId, channelId])

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