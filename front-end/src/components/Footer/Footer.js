import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-background"></div>
      <div className="column-container">
        <div className="column">
          <div className="title">Curacha Printing</div>
          <div className="description">
            <p>“Delivering Excellence through the Achievement of Project Objectives 
                and the Timely, Cost-Effective, and High-Quality Delivery of Goods and Services”</p>
          </div>
        </div>
        <div className="line vertical"></div>
        <div className="column">
          <div className="title2">Contact Us </div>
          <div className="column-container2">
          <div className="description">
            <p id="bold-text">Email</p>
            <p>curacharoque@gmail.com</p>
            <p id="bold-text">Phone</p>
            <p>0917-857-4324</p></div>
        <div className="column-container2">
        <div className="description">
            <p id="bold-text">Facebook</p>
            <p>facebook.com/curacha.roque.1</p>
            <p id="bold-text">Address</p>
            <p>37 Roque NPC Village, Pasong Tamo, Q.C.</p></div>
          </div>
          </div>
        </div>
      </div>
      
      <div className="footer-content">
        <div className="copyright">
          <div className="line"></div>
          <div className="text">Curacha Printing © 2023, All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
