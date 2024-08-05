import { useEffect, cloneElement } from 'react';

const useSequentialAnimation = (element1, element2, animation2, event) => {
    useEffect(() => {
        const getElement = (el) => {
            if (typeof el === 'string') {
                return document.querySelector(el);
            }
            return el;
        };

        const el1 = getElement(element1);
        const el2 = getElement(element2);

        if (!el1 || !el2) return;

        const handleEvent = () => {
            el1.classList.add('selected'); // Ajoute la classe 'selected' au premier élément
            el1.addEventListener('animationend', () => {
                el2.classList.add(animation2); // Ajoute la classe d'animation au second élément
            }, { once: true });
        };

        el1.addEventListener(event, handleEvent);

        return () => {
            el1.removeEventListener(event, handleEvent);
        };
    }, [element1, element2, animation2, event]);

};

export default useSequentialAnimation;