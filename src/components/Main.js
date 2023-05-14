import React from "react";
import MainImg from '../assets/assessment.png'
import Down from '../assets/down.png'
import '../styles/Main.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Main = () => {
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false)
    const [summarizationType, setSummarizationType] = useState('Default')
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false)
    const [canClick, setCanClick] = useState(true)

    const id = useLocation()

    const toggleDropDownMenuOpen = () => {
        if (!dropDownMenuOpen) {
            setDropDownMenuOpen(true)
        } else {
            setDropDownMenuOpen(false)
        }
    }

    const handleSummarizeClick = async () => {
        setCanClick(false)
        const input = document.querySelector('.mainInput').value;
        if (!input) {
            alert('Input field is empty');
            setCanClick(true)
            return;
          }
        try {
          const response = await axios.post('http://localhost:3001/summarize', { url: input, summarizationType });
          setSummary(response.data.summary);
          console.log('hello')
          setTimeout(() => {
            setCanClick(true)
          }, 2000);
        } catch (error) {
          console.error(error);
          setTimeout(() => {
            setCanClick(true)
          }, 2000);
        }
      };
    
    const handleSummaryType = (e) => {
        console.log(e.target.innerHTML)
        setSummarizationType(e.target.innerHTML)
        setDropDownMenuOpen(false)
    }

    useEffect(() => {
        console.log(summary)
        console.log(summarizationType)
    },[summarizationType, summary])
   
    return (
        <section className="mainWrapper">
            <nav className="mainNavBarWrapper">
                <div className="mainNavBarContent">
                    <div className="mainNavStartWrapper">
                        <img src={MainImg} className="mainImg" />
                        <h2 className="mainNavTitle">Quick-Sum</h2>
                    </div>
                    <ul className="mainNavLinkWrapper">
                        <Link onMouseDown={(e) => e.preventDefault()} to='/url-summarizer' className="mainNavLink" 
                        data-content="URL Summarizer"><li>URL Summarizer</li></Link>
                        <Link onMouseDown={(e) => e.preventDefault()} to='/faq' className="mainNavLink" 
                        data-content="FAQ"><li>FAQ</li></Link>
                    </ul>
                </div>
            </nav>
            <div className="mainContent">
                <h1 className="mainTagLine">Summarize Content using <span className="highLightedTxt">Quick-Sum</span>! Powered by <span className="highLightedTxt">AI</span></h1>
                <p className="mainDescriptionParagraph">Discover Quick-Sum, the free AI-powered tool for effortless reading. 
                With a focus on articles and blog posts, Quick-Sum delivers concise summaries tailored to your needs. Experience the ease 
                of digesting news articles, insightful blog posts, and more with Quick-Sum's accurate and relevant summaries.</p>
                <form className="mainInputWrapper" onSubmit={(e) => e.preventDefault()}>
                    <input type="url" placeholder='Enter Url'
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
                <div className="summarizeContentWrapper">
                    <span className="summarizationTypeTxt">Summarization Type: {summarizationType}</span>
                    <button className="summarizeBtn" onClick={() => canClick ? handleSummarizeClick() : null}>Summarize</button>
                </div>
                </form>
                <div className="articleSummaryWrapper">
                    <h2>Content Summary</h2>
                </div>
            </div>
        </section>
    )
}

export default Main