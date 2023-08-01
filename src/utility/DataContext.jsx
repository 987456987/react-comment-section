/* eslint-disable react/prop-types */
// Context.js
import { createContext, useState, useEffect } from 'react';
import data from '../assets/data.json'; // Import the data from the JSON file

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate asynchronous data loading from the JSON file
    // In a real application, you might use fetch or other methods to load data from a JSON file.
    // Here, we'll just set the data directly.
    setItems(data);
  }, []);

  const contextData = {
    items,
  };

  return <MyContext.Provider value={contextData}>{children}</MyContext.Provider>;
};

export { MyContext, ContextProvider };
