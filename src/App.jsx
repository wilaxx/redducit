import React, { useState, useEffect } from 'react';
import SearchBar from './App/components/SearchBar';
import Posts from './App/features/posts/Posts';
import Subreddits from './App/features/subreddits/Subreddits';
import './App.css';

const App = () => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
       
        if (window.scrollY > 100) { 
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

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
                    <h1>Reddit</h1>
                </div>
                <div className="headercenter">
                    <SearchBar />
                </div>
                <div className="headerright">

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