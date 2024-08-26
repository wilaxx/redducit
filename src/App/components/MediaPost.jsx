import React from 'react';
import { useSelector } from 'react-redux';

// il faut penser à utiliser encodeURI

const MediaPost = () => {
    // Utiliser useSelector pour récupérer les posts depuis le store Redux
    const posts = useSelector(state => state.posts.posts);

    // Fonction pour trouver le premier post avec un media_metadata valide
    const findPostWithMediaMetadata = (posts) => {
        return posts.find(post => post.media_metadata && Object.keys(post.media_metadata).length > 0);
    };

    // Trouver le premier post avec media_metadata
    const postWithMedia = findPostWithMediaMetadata(posts);

    // Si aucun post n'a media_metadata, retourner null ou un message
    if (!postWithMedia) {
        return <div>No media found in posts.</div>;
    }

    // Extraire les images du media_metadata
    const images = [];
    const { media_metadata } = postWithMedia;

    Object.values(media_metadata).forEach(media => {
        if (media.s && media.s.u) {
            // Remplacer &amp; par & dans l'URL
            const imageUrl = media.s.u.replace(/&amp;/g, '&');
            images.push(imageUrl);  // Ajouter l'image en haute résolution
        }
    });

    return (
        <div className="media-post">
            {images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`media-${index}`} />
            ))}
        </div>
    );
};

export default MediaPost;
