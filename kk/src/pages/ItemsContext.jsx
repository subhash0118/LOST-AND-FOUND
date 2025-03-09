import React, { createContext, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
};
