// useCloneElement.js
import { useState, useCallback } from 'react';
import { cloneElementWithoutEvents } from '../tools/utility';

export function useCloneElement() {
  const [clonedElement, setClonedElement] = useState(null);

  const clone = useCallback((element, selector) => {
    const targetElement = document.querySelector(selector);

    if (targetElement) {
      const cloned = cloneElementWithoutEvents(element);
      setClonedElement(cloned);

      // On ajoute l'élément cloné au DOM
      targetElement.appendChild(cloned);
    } else {
      console.error(`L'élément avec le sélecteur ${selector} n'a pas été trouvé.`);
    }
  }, []);

  return { clonedElement, clone };
}
