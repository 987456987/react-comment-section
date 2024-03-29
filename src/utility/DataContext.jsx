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

    const newData = { ...userData };
    newData.comments.push(newComment);
    setUserData(newData);
  }

  function addReply(id, parentID, value) {
    const newData = { ...userData };
    let index = 0;
    let replyIndex = 0;
    if (parentID) {
      index = newData.comments.findIndex((comment) => comment.id == parentID)
      replyIndex = newData.comments[index].replies.findIndex((comment) => comment.id == id)
    } else {
      index = newData.comments.findIndex((comment) => comment.id == id)
    }
    const replyingTo = parentID ? newData.comments[index].replies[replyIndex].user.username : newData.comments[index].user.username

      const newReply = {
        id: generateUUID(), // Generate a unique ID for the new comment
        content: value,
        createdAt: "Just now",
        score: 0,
        replyingTo: replyingTo,
        user: {
          image: {
            png: userData.currentUser.image.png,
            webp: userData.currentUser.image.webp,
          },
          username: userData.currentUser.username,
        }
      }

    newData.comments[index].replies.push(newReply)

    setUserData(newData);
  }

  function deleteComment(id) {
    const newData = { ...userData };
    const index = newData.comments.findIndex((comment) => comment.id == id);
    if (index !== -1) {
      // Use splice to remove the comment at the found index
      newData.comments.splice(index, 1);
    } else {
      // Handle the case where the comment with the specified ID was not found
      console.log("Comment not found");
    }
    setUserData(newData);
  }

  function deleteReply(id, parentID) {
    const newData = { ...userData };
    const index = newData.comments.findIndex(
      (comment) => comment.id == parentID
    );
    if (index !== -1) {
      // Use splice to remove the comment at the found index
      const replyIndex = newData.comments[index].replies.findIndex(
        (reply) => reply.id == id
      );
      console.log(replyIndex);
      if (replyIndex !== -1)
        newData.comments[index].replies.splice(replyIndex, 1);
    } else {
      // Handle the case where the comment with the specified ID was not found
      console.log("Reply not found");
    }
    setUserData(newData);
  }

  function updateComment(id, content) {
    const newData = { ...userData };
    const index = newData.comments.findIndex((comment) => comment.id == id);
    if (index !== -1) {
      newData.comments[index].content = content;
    } else {
      // Handle the case where the comment with the specified ID was not found
      console.log("Reply not found");
    }
    setUserData(newData);
  }
  function updateReply(id, parentID, content) {
    const newData = { ...userData };
    const index = newData.comments.findIndex(
      (comment) => comment.id == parentID
    );
    if (index !== -1) {
      const replyIndex = newData.comments[index].replies.findIndex(
        (reply) => reply.id == id
      );
      if (replyIndex !== -1)
        newData.comments[index].replies[replyIndex].content = content;
    } else {
      // Handle the case where the comment with the specified ID was not found
      console.log("Reply not found");
    }
    setUserData(newData);
  }

  return (
    <DataContext.Provider
      value={{
        userData,
        addComment,
        deleteComment,
        deleteReply,
        updateComment,
        updateReply,
        addReply
      }}
    >
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
