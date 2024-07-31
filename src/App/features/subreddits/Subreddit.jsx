import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubredditsState, selectSubreddit } from './subredditsSlice';
import { setSearchTerm } from '../posts/postsSlice';
import './Subreddit.css';

const Subreddit = ({subreddit}) => {

    
    const dispatch = useDispatch();
    const subredditsState = useSelector(selectSubredditsState);
    const { isLoading, isError, errorMessage, errorStatus, filteredSubreddit } = subredditsState;
    const subredditsData = subredditsState.subreddits;

    const anime_subreddit = () => {
      document.querySelectorAll('.Subreddit button').forEach(item => {
        item.addEventListener('click', function() {
            const itemClone = this.cloneNode(true);
            itemClone.classList.add('header-item');
            document.querySelector('.headerright').replaceChild(itemClone);
    
            // Optionnel: ajouter une animation CSS ou transition pour le déplacement
            this.classList.add('clicked');
            
            // Retirer l'élément original après l'animation si nécessaire
            setTimeout(() => this.remove(), 300); // durée de l'animation
        });
    });
    
    };

    const handleImageError = (imgElement) => {
        // Créer un nouvel élément img avec le SVG fourni comme source
        const svgElement = document.createElement('img');
        svgElement.setAttribute('src', 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z"></path></svg>'));
        svgElement.setAttribute('alt', 'Image not found');
        svgElement.setAttribute('class', 'subreddit-icon');
    
        // Remplacer l'élément img défaillant par le nouvel élément img avec le SVG
        imgElement.parentNode.replaceChild(svgElement, imgElement);
    };

    return (
            <li className="Subreddit slide-in-elliptic-right-fwd">
                <button
                onClick={(e) => {
                  const search = document.getElementById('searchbar');
                  search.value = '';
                  dispatch(selectSubreddit(subreddit.display_name_prefixed))
                  dispatch(setSearchTerm(''))
                  window.scrollTo(0, 0);
                  anime_subreddit();    
                }}
                className={`subredditButton ${filteredSubreddit === subreddit.display_name_prefixed ? 'selected' : ''}`}
                >
                 <img
                src={
                  subreddit.icon_img ||
                  `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                }
                alt={`${subreddit.display_name}`}
                onError={(e) => handleImageError(e.target)}
              />  <span className='subname animate__animated animate__zoomInRight animate__slower'>{subreddit.display_name}</span> 
                </button>
            </li>
    );
};

export default Subreddit;