import React from 'react';
import NavBar from '../../components/Navbar/Navbar';
import FooterPage from '../FooterPage/FooterPage';
import './Profile.css';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="profileContainer">
        <div className="quote-container">
          <div className="quote-header">
            <label>Welcome, Alexia Roque!</label>
            <p>Email: roquealexia09@gmail.com</p>
          </div>
          <div className="quote-body">
            <div className="quote-section">
              <div className="quote-section-header">QUOTATION 1</div>
              <div className="quote-detail">Title: Q1</div>
              <div className="quote-detail">Product Selection: Delivery Receipt</div>
              <div className="quote-detail">Quantity: *</div>
              <div className="quote-detail">Size: *</div>
              <div className="quote-detail">No of Ply: *</div>
              <div className="quote-detail">Paper Size: *</div>
              <div className="quote-detail">Paper Type: *</div>
              <div className="quote-detail">Color Printing: *</div>
              <div className="quote-detail">Color of Ply: *</div>
              <div className="quote-detail">Logo: *</div>
          
              <div className="quote-price">
                <span>VATable Cost: P134.50</span>
                <br />
                <span>VAT amount (12%): P13,450.00</span>
                <br />
                <span>Total Amount: P134.50</span>
                <br />
                <span>Price per Booklet: P13,450.00</span>
                <br />
              </div>
            </div>

            <div className="quote-section">
              <div className="quote-section-header">QUOTATION 2</div>
              <div className="quote-detail">Title: Q2</div>
              <div className="quote-detail">Product Selection: Delivery Receipt</div>
              <div className="quote-detail">Quantity: *</div>
              <div className="quote-detail">Size: *</div>
              <div className="quote-detail">No of Ply: *</div>
              <div className="quote-detail">Paper Size: *</div>
              <div className="quote-detail">Paper Type: *</div>
              <div className="quote-detail">Color Printing: *</div>
              <div className="quote-detail">Color of Ply: *</div>
              <div className="quote-detail">Logo: *</div>
              <div className="quote-price">
              <span>VATable Cost: P134.50</span>
                <br />
                <span>VAT amount (12%): P13,450.00</span>
                <br />
                <span>Total Amount: P134.50</span>
                <br />
                <span>Price per Booklet: P13,450.00</span>
                <br />
              </div>
            </div>


          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Profile;
