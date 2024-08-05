// utility.js
export function cloneElementWithoutEvents(element) {
    const clonedElement = React.cloneElement(element, {
      // Filtrer les props pour supprimer les attributs d'événement
      ...Object.keys(element.props).reduce((acc, key) => {
        if (!key.startsWith('on')) {
          acc[key] = element.props[key];
        }
        return acc;
      }, {})
    });
  
    return clonedElement;
  }
  