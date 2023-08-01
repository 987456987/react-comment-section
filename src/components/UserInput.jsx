const UserInput = () => {
    return (
        <div id="user-comment-input">
            <img src="${currentUser.image.webp}" className="user-img" />
            <textarea id="user-comment-textarea" placeholder="Add a comment..." ></textarea>
            <button className="submit" id="user-comment-input-submit">Send</button>
        </div>
    )
}

export default UserInput