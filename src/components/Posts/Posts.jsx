import Post from "../Post/Post";
import "./posts.css";

export default function Posts({ posts }) {

    return (
        <div className="posts">
            {
                posts?.map(post => {
                    return <Post key={post?.id} post={post} />
                })
            }
        </div>
    );
}