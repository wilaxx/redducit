import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './App/components/SearchBar';
import Posts from './App/features/posts/Posts';
import Subreddits from './App/features/subreddits/Subreddits';
import useSequentialAnimation from './hooks/useSequentialAnimation';
import './App.css';

const App = () => {

    

    // // Utilisation avec des références
    // const element1Ref = useRef(null);
    // const element2Ref = useRef(null);

    // useSequentialAnimation(
    //     element1Ref.current,
    //     element2Ref.current,
    //     'animation1',
    //     'animation2',
    //     'click'
    // );

    // Utilisation avec des sélecteurs CSS
    useSequentialAnimation(
        '.element1',
        '.element2',
        'animation1',
        'animation2',
        'click'
    );


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
                    <h1>Redducit</h1>
                    <div ref={element1Ref} className="element1">Element 1</div>
                    <div ref={element2Ref} className="element2">Element 2</div>
                </div>
                <div className="headercenter">
                    <SearchBar />
                </div>
                <div className="headerright">
                    <div id="wrapperCurrentSub">
                        <button id="currentSubButton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z"></path></svg>  <span>yooo</span> 
                        </button>
                    </div>
                    
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