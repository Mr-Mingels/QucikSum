import React from "react";
import Minus from '../assets/minus.png'
import Plus from '../assets/plus.png'
import '../styles/FAQ.css'
import { useState } from "react";

const FAQ = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const faqs = [
        { question: `What are summarization types?`, answer: <>Summarization types refer to different approaches and techniques used 
        to condense or extract the key information from a larger piece of text. Here are the types of summarization used on Quick-Sum:<div 
        className="faqListWrapper"><br /><br />1. Default: a concise and condensed summary that aims to capture the main points and 
        essential information. It serves as a brief overview or synopsis of the original content, providing readers with a quick understanding of the text's 
        key elements without going into extensive detail.<br /><br /> 2. Bullet Points: This would break down the summary into a list of 
        bullet points. This is a great option for users who want a quick, digestible summary.<br /><br />3. Executive Summary: This type 
        of summary is often used in business settings, where it's important to highlight the main points and conclusions 
        upfront.<br /><br /></div></> },
        { question: `Why did the content summary print out "Invalid url."`, answer: <>
        If you encountered the message "Invalid URL" when attempting to generate a content summary, it typically signifies 
        that the content within the URL you provided could not be parsed and utilized by the summarization tool. There are a 
        few potential reasons for this:<div className="faqListWrapper"><br /><br />
        1. Incorrect or Malformed URL: Ensure that you have entered a valid and correctly formatted URL. Double-check for any typos, 
        missing characters, or incorrect formatting that might render the URL invalid.<br /><br /> 2. Unsupported Content Type: 
        The summarization tool, such as Quick-Sum, is designed to work most effectively with articles and blog posts. If the provided 
        URL leads to a webpage or content that falls outside this scope, the tool may not be able to process it accurately. Consider 
        using URLs that directly point to articles or blog posts for optimal results.<br /><br /> 3. Accessibility or Network Issues: 
        Sometimes, the inability to parse and utilize content may be due to temporary network connectivity problems or accessibility 
        issues with the website hosting the content. Ensure that you have a stable internet connection and try again later to see if 
        the issue persists.<br /><br /></div></> },
        { question: `Why did the content summary print out "Error: Rate limit exceeded, try again later."`, answer: <>
        The error message "Error: Rate limit exceeded" appearing in the content summary indicates that the process of 
        generating the summary was halted because the rate limit for the summarization service was exceeded.<br /><br />Rate limiting 
        is a mechanism implemented by online services to control the number of requests made within a specific time period. It ensures 
        fair usage and prevents abuse or overloading of the system. When the rate limit is exceeded, the service temporarily blocks or 
        limits further requests until the limit is reset.<br /><br />In the case of content summarization, the "Error: 
        Rate limit exceeded" message suggests that the summarization service has received more requests than it can handle 
        within the allowed timeframe. This can occur if there is a high volume of concurrent requests or if the user has made 
        excessive requests within a short period.<br /><br />To resolve this issue, we recommend waiting a few minutes and trying again. 
        The rate limit is typically reset after a certain duration. Allow some time to pass before retrying the summarization process.</> },
        { question: `What kind of URL's can I use?`, answer: <>
         Quick-Sum supports specific types of URLs for generating summaries. You can use article and blog post URLs with Quick-Sum 
         successfully. These URLs typically include content from news articles, blog articles, opinion pieces, and similar textual content.
         <br /><br />However, it's important to note that certain types of URLs are not compatible with Quick-Sum. URLs leading to 
         SEC filings, research papers, financial statements, and similar documents are not suitable for summarization using Quick-Sum. 
         If you attempt to use such URLs, you will most likely receive an 'invalid URL' error message.<br /><br />
         To ensure successful summarization, it is recommended to provide URLs that contain the desired article or blog post content 
         rather than URLs leading to non-compatible documents. This way, you can make the most of Quick-Sum's capabilities and obtain 
         accurate and relevant summaries.</> },
         { question: `How long does it take for the summary to load?`, answer: <>The loading time for the summary is determined 
         by the amount of content present in the given URL. If the URL contains a substantial amount of content, it may take longer 
         for the summary to load completely. Conversely, if the content is relatively small or limited, the loading time will be shorter. 
         The speed of loading is directly proportional to the volume of content being processed.</>},
      ];

    const handleQuestionClick = index => {
        if (activeQuestion === index) {
          setActiveQuestion(null);
        } else {
          setActiveQuestion(index);
        }
      };

    return (
        <div className="faqWrapper">
        <div className="faqContent">
        {faqs.map((faq, index) => (
            <div key={index} className="faqBtnWrapper">
                <button 
                className="faqBtn" 
                onClick={() => handleQuestionClick(index)}
                >
                {faq.question}
                <img className="faqImg" src={activeQuestion === index ? Minus : Plus} />
                </button>
                <div className={`faqAnswerWrapper ${activeQuestion === index ? "open" : "transition-to-closed"}`}>
                    <p className="faqAnswer">{faq.answer}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
    )
}

export default FAQ