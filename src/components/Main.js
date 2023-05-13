import React from "react";
import MainImg from '../assets/assessment.png'
import Down from '../assets/down.png'
import '../styles/Main.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Main = () => {
    const [urlPageTxt, setUrlPageTxt] = useState("Make your reading easier with Quick-Sum, a free AI-powered tool that provides summaries for various types of content from any given URL. Whether it's articles, blog posts, SEC filings, financial statements, research papers, or more, Quick-Sum has got you covered!")
    const [contentPageTxt, setContentPageTxt] = useState("Make your reading easier with Quick-Sum, a free AI-powered tool that provides summaries for various types of content. Whether it's chapters in books, recipes, articles, blog posts, meeting notes, research papers, or more, Quick-Sum has got you covered!")
    const [currentTxt, setCurrentTxt] = useState('')
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(true)
    const [summarizationType, setSummarizationType] = useState('default')
    const [summary, setSummary] = useState('');

    const id = useLocation()

    useEffect(() => {
        if(id.pathname === '/content-summarizer') {
            setCurrentTxt(contentPageTxt)
        } else {
            setCurrentTxt(urlPageTxt)
        }
    },[id.pathname])

    const toggleDropDownMenuOpen = () => {
        if (!dropDownMenuOpen) {
            setDropDownMenuOpen(true)
        } else {
            setDropDownMenuOpen(false)
        }
    }

    const handleSummarizeClick = async () => {
        const input = document.querySelector('.mainInput').value;
        try {
          const response = await axios.post('http://localhost:3001/summarize', { url: input, summarizationType });
          setSummary(response.data.summary);
          console.log('hello')
        } catch (error) {
          console.error(error);
        }
      };
    
    const handleSummaryType = (e) => {
        console.log(e.target.innerHTML)
        setSummarizationType(e.target.innerHTML)
    }

    useEffect(() => {
        console.log(summary)
        console.log(summarizationType)
    },[summarizationType, summary])
   
    return (
        <div className="mainWrapper">
            <nav className="mainNavBarWrapper">
                <div className="mainNavBarContent">
                    <div className="mainNavStartWrapper">
                        <img src={MainImg} className="mainImg" />
                        <h2 className="mainNavTitle">Quick-Sum</h2>
                    </div>
                    <ul className="mainNavLinkWrapper">
                        <Link onMouseDown={(e) => e.preventDefault()} to='/url-summarizer' className="mainNavLink" 
                        data-content="URL Summarizer"><li>URL Summarizer</li></Link>
                        <Link onMouseDown={(e) => e.preventDefault()} to='/content-summarizer' className="mainNavLink" 
                        data-content="Content Summarizer"><li>Content Summarizer</li></Link>
                    </ul>
                </div>
            </nav>
            <div className="mainContent">
                <h1 className="mainTagLine">Summarize Content using <span className="highLightedTxt">Quick-Sum</span>! Powered by <span className="highLightedTxt">AI</span></h1>
                <p className="mainDescriptionParagraph">{currentTxt}</p>
                <form className="mainInputWrapper">
                    <input type="url" placeholder={`${id.pathname === '/content-summarizer' ? 'Enter Text Content' : 'Enter Url'}`} 
                    className="mainInput" />
                    <button type="button" className="dropDownMenuBtn" onClick={() => toggleDropDownMenuOpen()}>
                        <img className={`dropDownImg ${dropDownMenuOpen ? 'open' : ''}`} src={Down}/>
                    </button>
                    {dropDownMenuOpen &&(
                    <div className="mainDropDownMenu">
                        <ul className="mainDropDownMenuListWrapper">
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>Default</li>
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>Bullet Point</li>
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>One Sentence</li>
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>Keyword</li>
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>Executive</li>
                        </ul>
                    </div>
                )}
                </form>
                <button className="summarizeBtn" onClick={handleSummarizeClick}>Summarize</button>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Main