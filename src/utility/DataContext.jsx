import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react';
import data from '../assets/data.json'; // Import the data from the JSON file

const MyContext = createContext();

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

  console.log(userData)

  return (
    <MyContext.Provider value={{ userData, setUserData }}>
      {children}
    </MyContext.Provider>
  )
};


ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export { MyContext, ContextProvider };
