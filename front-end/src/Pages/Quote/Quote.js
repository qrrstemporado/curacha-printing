import React from 'react';
import NavBar from '../../components/Navbar/Navbar';
import FooterPage from '../FooterPage/FooterPage';
import './Quote.css';
import ReqQuote from '../../components/ReqQuote/ReqQuote';


const Quote = () => {
  return (
    <div>
      <NavBar />
      <ReqQuote />
      <FooterPage />
    </div>
  );
}

export default Quote;
