import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './Gallery.css';

const Gallery = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [];

    Object.values(data).forEach(media => {
        if (media.s && media.s.u) {
            const imageUrl = media.s.u.replace(/&amp;/g, '&');
            images.push(imageUrl);
        }
    });

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    return (
        <div className="Gallery">
            {currentIndex > 0 && (
                <button className='btn-gallery-prev' onClick={handlePrev}>
                    <IoIosArrowBack />
                </button>
            )}
            <div className="gallery-container">
                {images.map((imageUrl, index) => (
                    <img
                        key={index + currentIndex + imageUrl}
                        src={imageUrl}
                        className={`gallery-img ${index === currentIndex ? 'active' : 'inactive'}`}
                        alt={`img-${index + "-" + currentIndex}`}
                    />
                ))}
            </div>
            {currentIndex < images.length - 1 && (
                <button className='btn-gallery-next' onClick={handleNext}>
                    <IoIosArrowForward />
                </button>
            )}
        </div>
    );
};

export default Gallery;