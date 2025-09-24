import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_Key } from '../../data'
import useDebounce from '../../hooks/useDebounce'
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'

const Navbar = ({setSidebar, inputValue, setInputValue}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedSearchTerm = useDebounce(inputValue, 500);
    const navigate = useNavigate();

    const getSearchSuggestions = async (searchTerm) => {
        if (searchTerm) {
          const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=10&key=${API_Key}`;
          await fetch(search_url)
            .then(res => res.json())
            .then(data => {
                if (data.items) {
                    setSuggestions(data.items);
                }
            });
        } else {
          setSuggestions([]);
        }
    };

    useEffect(() => {
        getSearchSuggestions(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const handleSuggestionClick = async (suggestion) => {
        setInputValue(suggestion.snippet.title);
        setSuggestions([]);
        setShowSuggestions(false);
        const videoId = suggestion.id.videoId;
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_Key}`;
        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const categoryId = data.items[0].snippet.categoryId;
                    navigate(`/video/${categoryId}/${videoId}`);
                }
            });
    };

    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className='menu-icon' onClick={() => setSidebar( prev => prev === false ? true : false)} src={menu_icon} alt="" />
                <Link to='/'>
                    <img className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='nav-middle flex-div'>
                <div className="search-box flex-div">
                    <input 
                        type="text" 
                        placeholder='Search' 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    <Link to={`/`}>
                        <img src={search_icon} alt="" />
                    </Link>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <SearchSuggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
                )}
            </div>
            <div className='nav-right flex-div'>
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} className='user-icon' alt="" />
            </div>
        </nav>
    )
}

export default Navbar