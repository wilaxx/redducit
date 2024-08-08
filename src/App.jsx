import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './App/components/SearchBar';
import SelectedSubreddit from './App/components/SelectedSubreddit';
import Posts from './App/features/posts/Posts';
import Subreddits from './App/features/subreddits/Subreddits';
import './wy-lib/styles/animations.css';
import './App.css';

const App = () => {

    const [showScrollButton, setShowScrollButton] = useState(false);
    const referenceElement = useRef(null);

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
                    <SelectedSubreddit referenceElement={referenceElement} />
                </div>  
            </header>
            
            <main>
                <section className='app-section'>
                    <Posts />
                </section>
                <aside ref={referenceElement}>
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