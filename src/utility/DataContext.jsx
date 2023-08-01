import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react';
import data from '../assets/data.json'; // Import the data from the JSON file

const DataContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData')
    return savedData
      ? JSON.parse(savedData)
      : data
  })

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  )
};


ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export { DataContext, ContextProvider };
