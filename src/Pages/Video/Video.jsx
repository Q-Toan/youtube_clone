import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import './Video.css'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

function Video() {
    const {videoId, categoryID} = useParams()
    return (
        <div className='play-container'>
            <PlayVideo videoId={videoId}/>
            <Recommended categoryId={categoryID} />
        </div>
    )
}

export default Video