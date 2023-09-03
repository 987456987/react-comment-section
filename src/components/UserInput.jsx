import { useContext } from "react"
import { DataContext } from "../utility/DataContext"

const UserInput = () => {
    const { userData } = useContext(DataContext)
    const imagePath = `${userData.currentUser.image.webp.substring(1)}`;

    return (
        <div id="user-comment-input">
            <img src={imagePath} className="user-img" />
            <textarea id="user-comment-textarea" placeholder="Add a comment..." ></textarea>
            <button className="submit" id="user-comment-input-submit">Send</button>
        </div>
    )
}

export default UserInput