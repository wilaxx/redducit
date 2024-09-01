import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './App/components/SearchBar';
import PostsInfos from './App/components/PostsInfos';
import Posts from './App/features/posts/Posts';
import Subreddits from './App/features/subreddits/Subreddits';
import './wy-lib/styles/animations.css';
import './App.css';

const App = () => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    const handleScroll = () => {
       
        if (window.scrollY > 200) { 
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    return (
        <div className="App">
            <header className='app-header'>
                <div className="headerleft">
                    <h1 onClick={() => window.location.reload()} >Redducit</h1>
                </div>
                <div className="headercenter">
                    <SearchBar />
                </div>
                <div className="headerright">
                    <PostsInfos />
                </div>  
            </header>
            
            <main>
                <section className='app-section'>
                    
                    <Posts />
                </section>
                <aside>
                    <Subreddits />
                </aside>
            </main>

            {showScrollButton && (
                <button id="scrollToTopButton" onClick={scrollToTop} title="Retour en haut">&#8593;</button>
            )}
        </div>
    );
}

export default App;