import React from 'react';
import './Landing.css';
import background from '../../assets/background.svg';
import cashInvoice from '../../assets/cash.svg';
import billingInvoice from '../../assets/billing.svg';
import salesInvoice from '../../assets/sales.svg';
import acknowledgementReceipt from '../../assets/acknowledgement.svg';
import collectionReceipt from '../../assets/collection.svg';
import delveryReceipt from '../../assets/delivery.svg';
import officialReceipt from '../../assets/official.svg';
import forms from '../../assets/forms.svg';
import jobOrder from '../../assets/job-order.svg';

const Landing = () => {
  return (
    <div>
      <div className="intro-container">
        <div className="background-image" style={{ backgroundImage: `url(${background})` }}></div>
        <div className="rectangle">
          <h1>Print Receipts Suited For Your Business</h1>
          <h2>Streamline your transactions with our range of custom-designed receipt layouts, 
            tailored to enhance your brand and optimize your customer's experience</h2>
          <button className="quote-button" onClick={() => { window.location.href = '/quote' }}>GET A QUOTE</button>
        </div>
      </div>
      <div id="services-container" className="services-container"></div>
      <div className="services-container"> 
        <h1>Our Services</h1>
        <p> A commercial printing service provider in the Philippines.<br/>Printing your requirements is now easier than ever. Here’s how it works:</p>
        <p> <br/>Step 1: Select a product<br/> Step 2: Customize<br/>Step 3: Book Now</p>
      <div className="product-container">
        <div className="product1">
          <img src={billingInvoice} alt="Billing Invoice"/>
          <h3>Billing Invoice</h3>
          <p> Simplify your financial processes with our billing invoice.</p>
          <button className="create-button" onClick={() => { window.location.href = '/billing-invoice' }}>CREATE</button>
        </div>
        <div className="product2">
          <img src={salesInvoice} alt="Sales Invoice"/> 
          <h3>Sales Invoice</h3>
          <p>Simplify sales transactions with our sales invoice.</p>
          <button className="create-button" onClick={() => { window.location.href = '/sales-invoice' }}>CREATE</button>
        </div>
        <div className="product3">
          <img src={cashInvoice} alt="Cash Invoice"/>
          <h3>Cash Invoice</h3>
          <p>Simplify cash transactions effortlessly using our cash invoice.</p>
          <button className="create-button" onClick={() => { window.location.href = '/cash-invoice' }}>CREATE</button>
        </div>
      </div>
      <div className="product-container2">
        <div className="product4">
          <img src={acknowledgementReceipt} alt="Product 4"/>
          <h3>Acknowledgement Receipt</h3>
          <p>Easily track transactions with our acknowledgment receipt.</p>
          <button className="create-button" onClick={() => { window.location.href = '/acknowledgement-receipt' }}>CREATE</button>
        </div>
        <div className="product5">
          <img src={collectionReceipt} alt="Product 5"/> 
          <h3>Collection Receipt</h3>
          <p>Easily track received payments with our collection receipt.</p>
          <button className="create-button" onClick={() => { window.location.href = '/collection-receipt' }}>CREATE</button>
        </div>
        <div className="product6">
          <img src={delveryReceipt} alt="Product 6"/>
          <h3>Delivery Receipt</h3>
          <p>Easily track delivery confirmations with our delivery receipt.</p>
          <button className="create-button" onClick={() => { window.location.href = '/delivery-receipt' }}>CREATE</button>
        </div>
      </div>
      <div className="product-container3">
        <div className="product7">
          <img src={officialReceipt} alt="Product 7"/>
          <h3>Official Receipt</h3>
          <p>Easily track with our official receipt.</p>
          <button className="create-button" onClick={() => { window.location.href = '/official-receipt' }}>CREATE</button>
        </div>
        <div className="product8">
          <img src={forms} alt="Product 8"/> 
          <h3>Forms</h3>
          <p>Simplify data collection and documentation with our forms.</p>
          <button className="create-button" onClick={() => { window.location.href = '/forms' }}>CREATE</button>
        </div>
        <div className="product9">
          <img src={jobOrder} alt="Product 9"/>
          <h3>Job Order</h3>
          <p>Efficiently organize and track your job orders.</p>
          <button className="create-button" onClick={() => { window.location.href = '/job-order' }}>CREATE</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Landing;
