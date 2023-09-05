/* eslint-disable react/prop-types */
import { ReactComponent as Plus } from "../assets/images/icon-plus.svg";
import { ReactComponent as Minus } from "../assets/images/icon-minus.svg";
import { ReactComponent as Reply } from "../assets/images/icon-reply.svg";
import { ReactComponent as Edit } from "../assets/images/icon-edit.svg";
import { ReactComponent as Delete } from "../assets/images/icon-delete.svg";
import { useState, useContext } from "react";
import { DataContext } from "../utility/DataContext";

const Comment = ({ item, comment }) => {
  const { userData, deleteReply } = useContext(DataContext);

  const imagePath = `${item.user.image.webp.substring(1)}`;

  const [rating, setRating] = useState(item.score);
  const [isEditing, setIsEditing] = useState(false);

  function plusClick() {
    setRating(item.score + 1);
  }
  function minusClick() {
    setRating(item.score - 1);
  }

  return (
    <>
      <div className="comment">
        <div className="score-container">
          <div className="score-inner-container">
            <button
              type="button"
              className="button-score"
              onClick={() => plusClick()}
            >
              <Plus />
            </button>
            <p className="score-text">{rating}</p>
            <button
              type="button"
              className="button-score"
              onClick={() => minusClick()}
            >
              <Minus />
            </button>
          </div>
        </div>
        <div className="content-container">
          <div className="content-top">
            <div className="content-top-left">
              <img src={imagePath} className="user-img" />
              <h2 className="username">{item.user.username}</h2>
              <p className="createdAt">{item.createdAt}</p>
            </div>
            <div className="button-group">
              {userData.currentUser.username === item.user.username ? (
                <>
                  <button
                    className="button-delete"
                    onClick={() => deleteReply(item.id, comment.id)}
                  >
                    <Delete />
                    Delete
                  </button>
                  <button className="button-edit" onClick={() => setIsEditing(true)}>
                    <Edit />
                    Edit
                  </button>
                </>
              ) : (
                <button className="button-reply">
                  <Reply />
                  Reply
                </button>
              )}
            </div>
          </div>
          {!isEditing ? (
            <p className="content-text">
              <span className="replying-to">@{item.replyingTo} </span>
              {item.content}
            </p>
          ) : (
            <textarea>{item.content}</textarea>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
