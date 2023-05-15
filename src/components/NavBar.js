import React from "react";
import MainImg from '../assets/assessment.png'
import '../styles/NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navBarWrapper">
                <div className="navBarContent">
                    <Link onMouseDown={(e) => e.preventDefault()} to='/url-summarizer' className="navLink">
                        <div className="navStartWrapper">
                            <img src={MainImg} className="navImg" onMouseDown={(e) => e.preventDefault()}/>
                            <h2 className="navTitle">Quick-Sum</h2>
                        </div>
                    </Link>
                    <ul className="navLinkWrapper">
                        <Link onMouseDown={(e) => e.preventDefault()} to='/url-summarizer' className="navLink" 
                        data-content="URL Summarizer"><li>URL Summarizer</li></Link>
                        <Link onMouseDown={(e) => e.preventDefault()} to='/FAQ' className="navLink" 
                        data-content="FAQ"><li>FAQ</li></Link>
                    </ul>
                </div>
            </nav>
    )
}

export default NavBar