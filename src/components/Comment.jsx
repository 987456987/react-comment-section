/* eslint-disable react/prop-types */
import { ReactComponent as Plus } from "../assets/images/icon-plus.svg";
import { ReactComponent as Minus } from "../assets/images/icon-minus.svg";
import { ReactComponent as Reply } from "../assets/images/icon-reply.svg";
import { ReactComponent as Edit } from "../assets/images/icon-edit.svg";
import { ReactComponent as Delete } from "../assets/images/icon-delete.svg";
import { useState, useContext } from "react";
import { DataContext } from "../utility/DataContext";

const Comment = ({ item, comment, replyNum }) => {
  const {
    userData,
    deleteComment,
    deleteReply,
    updateComment,
    updateReply,
    addReply,
  } = useContext(DataContext);

  const imagePath = `${item.user.image.webp.substring(1)}`;
  const userImagePath = `${userData.currentUser.image.webp.substring(1)}`;

  const [rating, setRating] = useState(item.score);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [textareaEdit, setTextareaEdit] = useState(item.content);
  const [textareaReply, setTextareaReply] = useState("");

  function plusClick() {
    setRating(item.score + 1);
  }
  function minusClick() {
    setRating(item.score - 1);
  }

  const updateTextareaHeight = (e) => {
    setTextareaHeight("auto"); // Reset the height to 'auto'
    setTextareaHeight(`${e.target.scrollHeight}px`); // Set the height to match the content
  };

  function textareaEditChange(content) {
    updateTextareaHeight;
    setTextareaEdit(content);
  }

  function updateOnClick() {
    item.replyingTo
      ? updateReply(item.id, comment.id, textareaEdit)
      : updateComment(item.id, textareaEdit);
    setIsEditing(false);
  }

  function addReplyOnClick() {
    item.replyingTo
      ? addReply(item.id, comment.id, textareaReply)
      : addReply(item.id, null, textareaReply);
    setIsReplying(false);
    setTextareaReply("");
  }

  return (
    <div className={item.replyingTo && "comment-container"}>
      <div className="outer-container">
        {item.replyingTo && (
          <div
            className={"reply-divider" + (replyNum === 0 ? " divider-top" : "")}
          ></div>
        )}

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
                      onClick={() =>
                        item.replyingTo
                          ? deleteReply(item.id, comment.id)
                          : deleteComment(item.id)
                      }
                    >
                      <Delete />
                      Delete
                    </button>
                    <button
                      className="button-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit />
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    className="button-reply"
                    onClick={() => setIsReplying(true)}
                  >
                    <Reply />
                    Reply
                  </button>
                )}
              </div>
            </div>
            {!isEditing ? (
              <p className="content-text">
                {item.replyingTo && (
                  <span className="replying-to">@{item.replyingTo} </span>
                )}
                {item.content}
              </p>
            ) : (
              <div className="editing-container">
                <textarea
                  id="user-comment-textarea"
                  value={textareaEdit}
                  onChange={(e) => textareaEditChange(e.target.value)}
                  style={{ height: textareaHeight }}
                />
                <button
                  className="submit update-button"
                  id="user-comment-input-submit"
                  onClick={() => updateOnClick()}
                >
                  UPDATE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="outer-container">
          {item.replyingTo && (
            <div
              className={
                "reply-divider" + (replyNum === 0 ? " divider-top" : "")
              }
            ></div>
          )}
          <div id="user-comment-input" className="comment edit-comment">
            <img src={userImagePath} className="user-img" />
            <textarea
              id="user-comment-textarea"
              placeholder="Add a reply..."
              onChange={(e) => setTextareaReply(e.target.value)}
              value={textareaReply}
            ></textarea>
            <button
              className="submit"
              id="user-comment-input-submit"
              onClick={() => addReplyOnClick()}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
