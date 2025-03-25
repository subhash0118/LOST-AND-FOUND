import React, { createContext, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const addLostItem = (newItem) => {
    setLostItems((prev) => [...prev, newItem]);
  };

  const addFoundItem = (newItem) => {
    setFoundItems((prev) => [...prev, newItem]);
  };

  const deleteLostItem = (id) => {
    setLostItems((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteFoundItem = (id) => {
    setFoundItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider value={{ 
      lostItems, foundItems, 
      addLostItem, addFoundItem, 
      deleteLostItem, deleteFoundItem 
    }}>
      {children}
    </ItemsContext.Provider>
  );
};
