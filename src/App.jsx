import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Video from './Pages/Video/Video';
import Home from './Pages/Home/Home';
import { useState, useEffect } from 'react';

const App = () => {

  const [sidebar, setSidebar] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const location = useLocation();

  useEffect(() => {
    setInputValue('');
  }, [location]);

  return (
    <div>
      <Navbar 
        setSidebar={setSidebar} 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
      />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryID/:videoId' element={<Video />} /> 
      </Routes>
    </div>
  )
}


export default App