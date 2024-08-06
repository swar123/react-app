import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { isTruthy } from './validations';

function useCookieState(key) { 
  const getCookieValue = () => {
    const storedValue =  Cookies.get(key);
    return storedValue;
  };

  const [cookieValue,setCookieData] = useState(getCookieValue());
  
  const setCookieValue = (value, key, duration) => {
    Cookies.set(key, JSON.stringify(value), {
      expires: duration,
    });
    setCookieData(JSON.stringify(value));
  };

  return [cookieValue, setCookieValue];
};

export default useCookieState;