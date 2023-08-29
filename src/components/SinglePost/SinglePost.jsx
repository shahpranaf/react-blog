import { Link, useParams } from "react-router-dom";
import Loader from 'react-fullpage-custom-loader';
import parse from 'html-react-parser';

import "./singlepost.css";

import { useFetchMediaQuery, useFetchPostQuery } from "../../store/apis/postsApi";

export default function SinglePost() {
    const { id } = useParams();
    const { data: post, isLoading } = useFetchPostQuery(id);
    const { data: featuredImage } = useFetchMediaQuery(post?.featured_media)

    const title = post?.title?.rendered;
    const content = post?.content?.rendered;

    return isLoading ?
        <Loader sentences={[]} />
        :
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src={`${featuredImage?.source_url}`}
                    alt=""
                />
                <h1 className="singlePostTitle">
                    {title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            <Link className="link" to="/posts?username=Safak">
                                Admin
                            </Link>
                        </b>
                    </span>
                    <span>1 day ago</span>
                </div>
                <p className="singlePostDesc">
                    {parse(content)}
                </p>
            </div>
        </div>

}