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
        // Afficher le bouton lorsque l'utilisateur commence à faire défiler vers le bas
        if (window.scrollY > 100) { // Vous pouvez ajuster cette valeur selon vos besoins
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToTop = () => {
        // Faites défiler vers le haut de la page lors du clic sur le bouton
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Faites défiler en douceur
        });
    };

    return (
        <div className="App">
            <header>
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
                <section>
                    <Posts />
                </section>
                <article>
                    <Subreddits />
                </article>
            </main>

            {showScrollButton && (
                <button id="scrollToTopButton" onClick={scrollToTop} title="Retour en haut">&#8593;</button>
            )}
        </div>
    );
}

export default App;