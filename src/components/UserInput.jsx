import { useContext, useState } from "react";
import { DataContext } from "../utility/DataContext";

const UserInput = () => {
  const { userData, addComment } = useContext(DataContext);
  const [ input, setInput ]  = useState("");

  const imagePath = `${userData.currentUser.image.webp.substring(1)}`;

  function newComment() {
    if(input != "") {
        addComment(input) 
    }
  }

  function textInput(value) {
    setInput(value)
    console.log(input)
  }

  return (
    <div id="user-comment-input">
      <img src={imagePath} className="user-img" />
      <textarea
        id="user-comment-textarea"
        placeholder="Add a comment..."
        onChange={(e) => textInput(e.target.value)}
        value={input}
      >
      </textarea>
      <button
        className="submit"
        id="user-comment-input-submit"
        onClick={() => newComment()}
      >
        Send
      </button>
    </div>
  );
};

export default UserInput;
