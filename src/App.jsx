import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Video from './Pages/Video/Video';
import Home from './Pages/Home/Home';
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';

const App = () => {

  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const debouncedSearchQuery = useDebounce(inputValue, 500); // 500ms delay

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <div>
      <Navbar 
        setSidebar={setSidebar} 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
      />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} searchQuery={searchQuery} />} />
        <Route path='/video/:categoryID/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App