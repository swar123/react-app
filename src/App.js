import logo from './logo.svg';
import './App.css';
import CheckList from './component/check-list';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [currentCookie, setCurrentCookie] = useState(1);
  const handleChange = (e) => {
    setCurrentCookie(() => e.target.value);
  };

  return (
    <Router>
      <div>
        <input type="number" min={0} value={currentCookie} onChange={handleChange}></input>
        <div className="container-md mt-5">
          <Routes>
            <Route path="/" element={<CheckList cookieId={currentCookie} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
