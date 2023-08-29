import Loader from 'react-fullpage-custom-loader';
import { useFetchPostsQuery } from "../../store/apis/postsApi";

import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./homepage.css";

export default function Homepage() {
  const { data: posts, isLoading } = useFetchPostsQuery();

  return <>
    <Header />
    <div className="home">
      {isLoading ? <Loader sentences={[]} /> : <Posts posts={posts} />}
      <Sidebar />
    </div>
  </>
}