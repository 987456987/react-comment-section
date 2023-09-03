import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import data from "../assets/data.json"; // Import the data from the JSON file

const DataContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : data;
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  function addComment(value) {
    const newComment = {
      id: generateUUID(), // Generate a unique ID for the new comment
      content: value,
      createdAt: "Just now",
      score: 0,
      user: {
        image: {
          png: userData.currentUser.image.png,
          webp: userData.currentUser.image.webp,
        },
        username: userData.currentUser.username,
      },
      replies: [],
    };
  
    // Create a copy of userData
    const newData = { ...userData };
  
    // Add the new comment to the comments array
    newData.comments.push(newComment);
  
    // Update the userData state with the modified data
    setUserData(newData);
  }

  return (
    <DataContext.Provider value={{ userData, addComment }}>
      {children}
    </DataContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, ContextProvider };

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
