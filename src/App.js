import logo from './logo.svg';
import './App.css';
import CheckList from './component/check-list';
import { useState } from 'react';

function App() {
  const [currentCookie, setCurrentCookie] = useState(1);
  const handleChange = (e) => {
    setCurrentCookie(() => e.target.value);
  };

  return (
    <div>
      <input type="number" min={0} value={currentCookie} onChange={ handleChange }></input>
    <div className="container-md mt-5">
      <CheckList cookieId = {currentCookie}/>
    </div>
  </div>
  );
}

export default App;
