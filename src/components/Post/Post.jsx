import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import moment from 'moment';

import { useFetchMediaQuery } from "../../store/apis/postsApi";
import "./post.css";

export default function Post({ post }) {
  const title = post?.title?.rendered;
  const excerpt = post?.excerpt?.rendered;
  const id = post?.id;
  const { data: featuredImage } = useFetchMediaQuery(post?.featured_media);
  const postDate = post?.date ? moment.utc(post?.date).local().startOf('seconds').fromNow() : "";

  return (
    <div className="post">
      <img
        className="postImg"
        src={featuredImage?.media_details?.sizes?.large?.source_url}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Nature">
              Nature
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Base">
              Base
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{postDate}</span>
      </div>
      <p className="postDesc">
        {parse(excerpt)}
      </p>
    </div>
  );
}