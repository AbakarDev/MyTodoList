import { useState, useEffect } from "react";


function useLocalStorage(key, initialValue) {
  //Etat pour stocker la valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      //Récupérer la valeur depuis le localStorage
      const item = window.localStorage.getItem(key);

      //Parser la valeur stockée ou utiliser la valeur initiale
      return item ? JSON.parse(item) : initialValue;

    } catch (error) {
      console.error("Erreur lors de la récupération du localStorage", error);
      return initialValue;
    }
  });

  //Retouner une version wrapped de la fonction setter useState qui persiste la nouvelle valeur dans le localStorage
  const setValue = (value) => {
    try {
      //Permet d'accepter une fonction comme dans useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      //sauvegarder dans l'etat
      setStoredValue(valueToStore);

      //Stocker la valeur dans le localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde dans le localStorage", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
