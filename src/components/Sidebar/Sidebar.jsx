import { Link } from "react-router-dom";

import { useFetchCategoriesQuery } from "../../store/apis/postsApi";
import "./sidebar.css";

export default function Sidebar() {
    const { data: categories } = useFetchCategoriesQuery();

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <p>
                Children of the sun, see your time has just begun, searching for your ways, 
                through adventures every day. Every day and night, with the condor in flight.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {categories && categories.map(cat => (
                        <li key={cat?.id} className="sidebarListItem">
                            <Link className="link" to={`/categories?cat=${cat?.id}`}>
                                {cat?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    );
}