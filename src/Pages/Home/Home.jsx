import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';
import { useState, useEffect } from 'react';

const Home = ({sidebar, searchQuery}) => {

    const [category, setCategory] = useState(0)

    // Reset category when a new search is performed
    useEffect(() => {
        if (searchQuery) {
            setCategory(0); // Reset to 'All' category
        }
    }, [searchQuery]);

    return (    
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
            <div className={`container ${sidebar ? "" : 'large-container'}`}>
                <Feed category={category} searchQuery={searchQuery} />
            </div>
        </>
    )
}

export default Home