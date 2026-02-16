import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Homee';  
import ExampleDetail from './components/ExampleDetail';
import DocsButton from './components/DocsButton';
import AsciiTable from './components/AsciiTable';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <DocsButton />
        <AsciiTable />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/examples/:exampleName" element={<ExampleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
