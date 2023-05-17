import React from "react";
import Down from '../assets/down.png'
import '../styles/Main.css'
import { useState } from "react";
import axios from 'axios';

const Main = () => {
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false)
    const [summarizationType, setSummarizationType] = useState('Default')
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false)
    const [canClick, setCanClick] = useState(true)

    const toggleDropDownMenuOpen = () => {
        if (!dropDownMenuOpen) {
            setDropDownMenuOpen(true)
        } else {
            setDropDownMenuOpen(false)
        }
    }

    const handleSummarizeClick = async () => {
        setLoading(true)
        setCanClick(false)
        const input = document.querySelector('.mainInput').value;
        const urlPattern = /^(http|https):\/\/[^ "]+$/; 
        if (!input) {
            alert('Input field is empty');
            setCanClick(true)
            setLoading(false)
            return;
          }
        if (!urlPattern.test(input)) {
            setCanClick(true);
            setLoading(false)
            return;
          }
        try {
          const response = await axios.post('https://quicksum-production.up.railway.app/api/summarize', { url: input, summarizationType });
          setSummary(response.data.summary);
          setLoading(false)
          setTimeout(() => {
            setCanClick(true)
          }, 2000);
        } catch (error) {
          console.error(error);
          setLoading(false)
          setTimeout(() => {
            setCanClick(true)
          }, 2000);
        }
      };
    
    const handleSummaryType = (e) => {
        setSummarizationType(e.target.innerHTML)
        setDropDownMenuOpen(false)
    }


    return (
        <section className="mainWrapper">
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
                            <li className="mainDropDownMenuListItem" onClick={(e) => handleSummaryType(e)}>Executive</li>
                        </ul>
                    </div>
                )}
                <div className="summarizeContentWrapper">
                    <span className="summarizationTypeTxt">Summarization Type: {summarizationType}</span>
                    <button className="summarizeBtn" onClick={() => canClick ? handleSummarizeClick() : null}>Summarize</button>
                </div>
                </form>
                {loading ?(
                    <div className="loadingSummaryWrapper">
                        <span className="mainLoader"></span>
                    </div>
                ) : (
                    <div className={`articleSummaryWrapper ${summary ? '' : 'empty'}`}>
                        <h2>Content <span className="highLightedTxt">Summary</span></h2>
                        <div className="renderedSummary">
                            <p className={`summary ${summarizationType === 'Bullet Point' ? 'bulletPoint' : ''}`} 
                            dangerouslySetInnerHTML={{ __html: summary }}></p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Main