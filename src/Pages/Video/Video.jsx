import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import './Video.css'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_Key } from '../../data'

function Video() {
    const {videoId, categoryID} = useParams()
    const [apiData, setApiData] = useState(null);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_Key}`;
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    return (
        <div className='play-container'>
            <PlayVideo apiData={apiData} />
            <Recommended categoryId={categoryID} channelId={apiData?.snippet.channelId} />
        </div>
    )
}

export default Video