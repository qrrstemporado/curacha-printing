import React, { useState } from "react";
import "./ReqQuote.css";
import NavBar from '../../components/Navbar/Navbar';
import FooterPage from "../../Pages/FooterPage/FooterPage";
import { ceil } from "lodash";

const ReqQuote = () => {
  const [formData, setFormData] = useState({
    title: "",
    productSelection: "",
    quantity: "",
    size: "",
    noOfPly: "",
    paperSize: "",
    paperType: "",
    colorPrinting: "",
    logoPreview: '',
    colorForPly: [], // Use an array to store selected colors
  });

  const [isRequestQuoteVisible, setIsRequestQuoteVisible] = useState(true);
  const [isProductDetailsVisible, setIsProductDetailsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        logo: file,
        logoPreview: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handlePlyColorChange = (e) => {
    const { value, checked } = e.target;
    let selectedColors = [...formData.colorForPly];

    if (checked) {
      selectedColors.push(value);
    } else {
      selectedColors = selectedColors.filter((color) => color !== value);
    }

    setFormData({
      ...formData,
      colorForPly: selectedColors,
    });
  };
  
  const handleBookNow = async (e) => {
    e.preventDefault();
    setIsRequestQuoteVisible(false);
    setIsProductDetailsVisible(true);
    
    try {
      // Make a POST request to your backend endpoint
      const response = await fetch('http://localhost:4000/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response from the server
      } else {
        console.error('Failed to submit quote');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRequestQuoteVisible(false);
    setIsProductDetailsVisible(true);

    if (!formData.vatableCost) {
      calculateQuotation();
    }

    try {
      // Make a POST request to your backend endpoint
      const response = await fetch('http://localhost:4000/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response from the server
      } else {
        console.error('Failed to submit quote');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const calculateQuotation = () => {
    const { quantity, size, noOfPly, } = formData; //paperSize, paperType, colorPrinting (assigned a value but never used)
  
    // Calculate Total Sheets
    let totalSheets = quantity * 50;
    if (size === "1/2") {
      totalSheets /= 2;
    } else if (size === "1/4") {
      totalSheets /= 4;
    }
  
    // Calculate Total Reams
    const totalReams = ceil(totalSheets / 500) + 1;
  
    // Determine costPerReam based on paperType and paperSize (you need to define these values)
    let costPerReam = 0;
    // Add your logic here to set costPerReam based on paperType and paperSize
  
    // Calculate Total Paper Cost
    const totalPaperCost = noOfPly * totalReams * costPerReam;
  
    // Determine additionalColor based on the selected colorPrinting option
    let additionalColor = 0;
    // Add your logic here to set additionalColor based on colorPrinting
  
    // Calculate Additional Running
    const additionalRunning = additionalColor * totalSheets;
  
    // Calculate Overall Running
    const overallRunning = quantity * 50 * noOfPly + additionalRunning;
  
    // Determine Total Additional Running
    let totalAdditionalRunning = 0;
    if (overallRunning <= 1000) {
      totalAdditionalRunning = 400;
    } else {
      // Add your logic here to calculate succeedingRunning based on the exceeding sheets
      // totalAdditionalRunning = calculateSucceedingRunning(overallRunning);
    }
  
    // Determine Number of CTP (Computer to Plate) based on Color Printing
    let numberOfCTP = 0;
    // Add your logic here to set numberOfCTP based on colorPrinting
  
    // Calculate Total CTP Cost
    const totalCTPCost = numberOfCTP * 150;
  
    // Calculate Total Cost
    const totalCost = totalPaperCost + totalAdditionalRunning + totalCTPCost + 50 + 700;

    // Update state with calculated values
    setFormData({
      ...formData,
      vatableCost: `₱${totalCost.toFixed(2)}`,
      vatAmount: `₱${(totalCost * 0.12).toFixed(2)}`,
      totalPrice: `₱${(totalCost * 1.12).toFixed(2)}`,
      unitPrice: `₱${(totalCost / quantity).toFixed(2)}`,
    });
  };


  return (
    <div>
    <NavBar />
    <div className="itemsContainer">
    <div className="quote-box">
      <div className="tabs">
        <div
          className={`tab ${isRequestQuoteVisible ? "active" : ""}`}
          onClick={() => {
            setIsRequestQuoteVisible(true);
            setIsProductDetailsVisible(false);
          }}
        >
          Request Quote
        </div>
        <div
          className={`tab ${isProductDetailsVisible ? "active" : ""}`}
          onClick={() => {
            if (isProductDetailsVisible) {
              setIsRequestQuoteVisible(false);
              setIsProductDetailsVisible(true);
            } else {
              alert("Please input data first");
            }
          }}
        >
          Product Details
        </div>
      </div>

      {isRequestQuoteVisible && (
        <div className="quote-tab">
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <div className="input-box">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="productSelection">Product Selection:</label>
              <div className="input-box">
                <select
                  id="productSelection"
                  name="productSelection"
                  value={formData.productSelection}
                  onChange={handleChange}
                >
                  <option value=" ">Select Product</option>
                  <option value="Billing Invoice">Billing Invoice</option>
                  <option value="Sales Invoice">Sales Invoice</option>
                  <option value="Billing Invoice">Cash Invoice</option>
                  <option value="Delivery Receipt">Acknowledgement Receipt</option>
                  <option value="Collection Receipt">Collection Receipt</option>
                  <option value="Collection Receipt">Delivery Receipt</option>
                  <option value="Official Receipt">Official Receipt</option>
                  <option value="Forms">Forms</option>
                  <option value="Forms">Job Order</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <div className="input-box">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
            <label htmlFor="size">Size:</label>
            <div className="input-box">
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                <option value="1 Whole">1 Whole</option>
                <option value="1/2">1/2</option>
                <option value="1/4">1/4</option>
              </select>
            </div>
          </div>
            <div className="form-group">
              <label htmlFor="noOfPly">No. Of Ply:</label>
              <div className="input-box">
                <input
                  type="number"
                  id="noOfPly"
                  name="noOfPly"
                  value={formData.noOfPly}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
                  <label htmlFor="paperSize">Paper Size:</label>
                  <div className="input-box">
                    <select
                      id="paperSize"
                      name="paperSize"
                      value={formData.paperSize}
                      onChange={handleChange}
                    >
                      <option value="">Select Paper Size</option>
                      <option value="Short Size (8.5 x 11)">Short Size (8.5 x 11)</option>
                      <option value="Long Size (8.5 x 13)">Long Size (8.5 x 13)</option>
                    </select>
                  </div>
                </div>
            <div className="form-group">
              <label htmlFor="paperType">Paper Type:</label>
              <div className="input-box">
                <select
                  id="paperType"
                  name="paperType"
                  value={formData.paperType}
                  onChange={handleChange}
                >
                  <option value=" ">Select Paper Type</option>
                  <option value="Bond Paper">Bond paper</option>
                  <option value="Colored Bond">Colored Bond</option>
                  <option value="Onion Skin">Onion Skin</option>
                  <option value="Newsprint(white)">Newsprint(white)</option>
                  <option value="Newsprint(colored)"> Newsprint(colored)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="colorPrinting">Color Printing:</label>
              <div className="input-box">
                <input
                  type="text"
                  id="colorPrinting"
                  name="colorPrinting"
                  value={formData.colorPrinting}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ply-change">
              <p htmlFor="colorForPly">Color Of Ply:</p>
              <div className="input-box">
                <label>
                  <input
                    type="checkbox"
                    name="colorForPly"
                    value="White"
                    checked={formData.colorForPly.includes("White")}
                    onChange={handlePlyColorChange}
                  />
                  White
                </label>
              </div>
              <div className="input-box">
                <label>
                  <input
                    type="checkbox"
                    name="colorForPly"
                    value="Blue"
                    checked={formData.colorForPly.includes("Blue")}
                    onChange={handlePlyColorChange}
                  />
                  Blue
                </label>
              </div>
              <div className="input-box">
                <label>
                  <input
                    type="checkbox"
                    name="colorForPly"
                    value="Pink"
                    checked={formData.colorForPly.includes("Pink")}
                    onChange={handlePlyColorChange}
                  />
                  Pink
                </label>
              </div>
              <div className="input-box">
                <label>
                  <input
                    type="checkbox"
                    name="colorForPly"
                    value="Green"
                    checked={formData.colorForPly.includes("Green")}
                    onChange={handlePlyColorChange}
                  />
                  Green
                </label>
              </div>
              <div className="input-box">
                <label>
                  <input
                    type="checkbox"
                    name="colorForPly"
                    value="Yellow"
                    checked={formData.colorForPly.includes("Yellow")}
                    onChange={handlePlyColorChange}
                  />
                  Yellow
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="logo">Upload Logo:</label>
              <div className="input-upload-box">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
            {isProductDetailsVisible && (
      <div className="product-details-container">
        <div className="product-details-tab">
          <label>Product Details</label>
          <p>Title: {formData.title}</p>
          <p>Product Selection: {formData.productSelection}</p>
          <p>Quantity: {formData.quantity}</p>
          <p>Size: {formData.size}</p>
          <p>No. Of Ply: {formData.noOfPly}</p>
          <p>Paper Size: {formData.paperSize}</p>
          <p>Paper Type: {formData.paperType}</p>
          <p>Color Printing: {formData.colorPrinting}</p>
          <p>Color of Ply: {formData.colorForPly.join(", ")}</p>
          <p>Logo:{formData.logoPreview ? <img src={formData.logoPreview} alt="Uploaded Logo" className="logo-image" /> : "No logo uploaded"}</p>
        </div>
  
      <div className="product-details-section">
            {/* Pricing section from the image */}
            <div className="pricing-section">
              <p className="pricing-note">Note: Please be aware that the quoted price is an estimate and may be subject to changes.</p>
              <div className="pricing-details">
                <div className="pricing-row">
                  <span>VATable Cost</span>
                  <span>{formData.vatableCost || "₱0.00"}</span>
                </div>
                <div className="pricing-row">
                  <span>VAT amount (12%)</span>
                  <span>{formData.vatAmount || "₱0.00"}</span>
                </div>
                <div className="pricing-row">
                  <span>Total Amount</span>
                  <span>{formData.totalPrice || "₱0.00"}</span>
                </div>
                <div className="pricing-row">
                  <span>Price per Booklet</span>
                  <span>{formData.unitPrice || "₱0.00"}</span>
                </div>
              </div>
              <button className="book-now-btn"onClick={handleBookNow}>Book Now</button>
            </div>
          </div>
        </div>
      )}
      </div>
      

    </div>
    <FooterPage />
    </div>
  );
};

export default ReqQuote;
