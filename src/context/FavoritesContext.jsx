// Избранное для всего сайта: список id товаров с сердечком
import { createContext, useContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';

const FavoritesContext = createContext();

// Избранное без всплывашек: и так видно сердечко и счётчик в меню
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState('keycraft_retro_favorites_v1', []);

  // Есть ли товар в избранном
  const isFavorite = (productId) => favorites.includes(productId);

  // Добавить, если нет, или убрать, если есть
  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, favoritesCount: favorites.length, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Короткий способ достать избранное в любом компоненте
export function useFavorites() {
  return useContext(FavoritesContext);
}
