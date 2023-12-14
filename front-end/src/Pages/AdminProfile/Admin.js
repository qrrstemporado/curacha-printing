import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import FooterPage from '../FooterPage/FooterPage';
import './Admin.css';

const AdminProfile = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch quotes from your backend API
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://curacha-printing-backend.onrender.com/api/quote');
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error('Failed to fetch quotes');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="profileContainer">
        <div className="quote-container">
          <div className="quote-header">
            <label>Welcome Back, Admin!</label>
          </div>
          <div className="quote-body">
            {quotes.map((quote, index) => (
              <div key={index} className="quote-section">
                <div className="quote-section-header">QUOTATION {index + 1}</div>
                <div className="quote-detail">Name: {quote.name}</div>
                <div className="quote-detail">Email: {quote.email}</div>
                <hr />
                <div className="quote-detail">Title: {quote.title}</div>
                <div className="quote-detail">Product Selection: {quote.productSelection}</div>
                <div className="quote-detail">Quantity: {quote.quantity}</div>
                <div className="quote-detail">Size: {quote.size}</div>
                <div className="quote-detail">No of Ply: {quote.noOfPly}</div>
                <div className="quote-detail">Paper Size: {quote.paperSize}</div>
                <div className="quote-detail">Paper Type: {quote.paperType}</div>
                <div className="quote-detail">Color Printing: {quote.colorPrinting}</div>
                <div className="quote-detail">Color of Ply: {quote.colorForPly.join(", ")}</div>
                <div className="quote-detail">
                  Logo: {quote.logo ? <img src={quote.logo} alt="Uploaded Logo" className="logo-image" /> : "No logo uploaded"}
                </div>
                <div className="quote-price">
                  <span>VATable Cost: {quote.vatableCost}</span>
                  <br />
                  <span>VAT amount (12%): {quote.vatAmount}</span>
                  <br />
                  <span>Total Amount: {quote.totalPrice}</span>
                  <br />
                  <span>Price per Booklet: {quote.unitPrice}</span>
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default AdminProfile;
