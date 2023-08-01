/* eslint-disable react/prop-types */
const Comment = ({ item }) => {
    return (
        <>
            <div className="component-container">
                <div className="comment">
                    <div className="score-container">
                    <div className="score-inner-container">
                        <button type="button" className="button-score" id="plus">
                            +
                        </button>
                        <p className="score-text">{item.score}</p>
                        <button type="button" className="button-score" id="minus">
                            -
                        </button>
                    </div>
                    </div>
                    <div className="content-container">
                        <div className="content-top">
                            <div className="content-top-left">
                                <img src="${user.image.webp}" className="user-img"/>
                                <h2 className="username">{item.user.username}</h2>
                                <p className="createdAt">{item.createdAt}</p>
                            </div>
                            <div className="button-group" id="${id}"></div>
                        </div>
                        <p className="content-text">{item.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment