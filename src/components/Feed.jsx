import Comment from "./Comment"
import Reply from "./Reply"
import { useContext } from "react"
import { DataContext } from "../utility/DataContext"

const Feed = () => {

    const { userData } = useContext(DataContext)

    return (
        <div className="feed">
            {userData.comments.map((item, index) => (
                <div key={index}>
                    <Comment  item={item} />
                    {item.replies.map((item1, index1) => (
                        <Reply key={index1} item={item1} comment={item} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Feed