import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { lazy, Suspense, useState  } from "react";

const Main = lazy(() => import('./components/Main'));
const FAQ = lazy(() => import('./components/FAQ'));
const NavBar = lazy(() => import('./components/NavBar'));

const App = () => {

  const RedirectToHome = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
      navigate('/url-summarizer');
    }, [navigate]);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div className='loadingScreen'></div>}>
          <NavBar />
          <Routes>
            <Route path="/url-summarizer" element={<Main />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='*' element={<RedirectToHome />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>  
  );
}

export default App;
