import React, { useState } from 'react';
import NavBar from '../../../../components/Navbar/Navbar';
import FooterPage from '../../../FooterPage/FooterPage';
import './Collection-Receipt.css';
import collection from '../../../../assets/collection-quote.svg';
import half1 from '../../../../assets/collection-one-half.svg';
import forth1 from '../../../../assets/collection-one-fourth.svg';

const Collection = () => {
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [paperSize, setPaperSize] = useState('');
  const [numberOfPly, setNumberOfPly] = useState('');
  const [paperType, setPaperType] = useState('');
  const [colorPrinting, setColorPrinting] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
  };

  const handlePaperSizeChange = (event) => {
    const newPaperSize = event.target.value;
    setPaperSize(newPaperSize);
  };

  const handleNumberOfPlyChange = (event) => {
    const newNumberOfPly = event.target.value;
    setNumberOfPly(newNumberOfPly);
  };

  const handlePaperTypeChange = (event) => {
    const newPaperType = event.target.value;
    setPaperType(newPaperType);
  };

  const handleColorPrintingChange = (event) => {
    const newColorPrinting = event.target.value;
    setColorPrinting(newColorPrinting);
  };

  const calculateTotal = () => {
    // Step 1: Calculate totalSheets
    let totalSheets = quantity * 50;
  
    if (size === "1/2") {
      totalSheets /= 2;
    } else if (size === "1/4") {
      totalSheets /= 4;
    }

    // Step 2: Calculate totalReams
    const totalReams = Math.ceil(totalSheets / 500) + 1;
    
    // Step 3: Calculate totalPaperCost based on selected options
    let costPerReam;
    let totalPaperCost = 0;
  
    if (paperType === "Carbonless Paper") {
      if (paperSize === "Short Size (8.5 x 11)") {
        costPerReam = 300;
      } else if (paperSize === "Long Size (8.5 x 13)") {
        costPerReam = 370;
      }
      for (let ply = 1; ply <= numberOfPly; ply++) {
        const plyCost = ply === 1 ? costPerReam : costPerReam + 30;
        totalPaperCost += plyCost * totalReams;
      }
    } else if (paperType === "Bond Paper") {
      costPerReam = paperSize === "Short Size (8.5 x 11)" ? 180 : 200;
      for (let ply = 1; ply <= numberOfPly; ply++) {
        totalPaperCost += costPerReam * totalReams;
      }
    } else if (paperType === "Colored Bond") {
      costPerReam = paperSize === "Short Size (8.5 x 11)" ? 230 : 260;
      for (let ply = 1; ply <= numberOfPly; ply++) {
        totalPaperCost += costPerReam * totalReams;
      }
    } else if (paperType === "Onion Skin") {
      if (paperSize === "Short Size (8.5 x 11)") {
        costPerReam = 180;
      } else if (paperSize === "Long Size (8.5 x 13)") {
        costPerReam = 200;
      }
      for (let ply = 1; ply <= numberOfPly; ply++) {
        const plyCost = ply === 1 ? costPerReam : costPerReam - 20;
        totalPaperCost += plyCost * totalReams;
      }
    } else if (paperType === "Newsprint (white)") {
      costPerReam = paperSize === "Short Size (8.5 x 11)" ? 160 : 190;
      for (let ply = 1; ply <= numberOfPly; ply++) {
        totalPaperCost += costPerReam * totalReams;
      }
    } else if (paperType === "Newsprint (colored)") {
      costPerReam = paperSize === "Short Size (8.5 x 11)" ? 165 : 195;
      for (let ply = 1; ply <= numberOfPly; ply++) {
        totalPaperCost += costPerReam * totalReams;
      }
    }

    // Step 4: Calculate totalRunning
    let totalRunning = totalSheets * numberOfPly;

    // Step 5: Determine additionalColor based on colorPrinting option
    let additionalColor = 0;

    if (colorPrinting === "1 color") {
      additionalColor = 1;
    } else if (colorPrinting === "2 color") {
      additionalColor = 2;
    } else if (colorPrinting === "3 color") {
      additionalColor = 3;
    }

    // Step 6: Calculate additionalRunning
    let additionalRunning = additionalColor * totalSheets;

    // Step 7: Calculate overallRunning
    let overallRunning = totalRunning + additionalRunning;

    // Step 8: Determine totalAdditionalRunning based on overallRunning
    let totalAdditionalRunning = 0;

    if (overallRunning <= 1000) {
      totalAdditionalRunning = 400;
    } else {
      const succeedingRunning = (Math.ceil((overallRunning - 1000) / 1000)+1) * 200;
      totalAdditionalRunning = 400 + succeedingRunning;
    }

    // Step 9: Determine numberOfCTP based on colorPrinting option
    let numberOfCTP = 1;

    if (colorPrinting === "1 color") {
      numberOfCTP = 2;
    } else if (colorPrinting === "2 color") {
      numberOfCTP = 3;
    } else if (colorPrinting === "3 color") {
      numberOfCTP = 4;
    }

    // Step 10: Calculate totalCTPCost
    const totalCTPCost = numberOfCTP * 150;

    // Calculate totalCost by adding all components
    const totalCost = totalPaperCost + totalAdditionalRunning + totalCTPCost + 50 + 700;

    return totalCost;
  };
  
  if (quantity === '' || size === '' || paperSize === '' || numberOfPly === '' || paperType === '' || colorPrinting === '') {
    // Set other variables to 0 when required fields are empty
    var vatable = 0;
    var vat = 0;
    var total = 0;
    var pricePerBooklet = 0;
  } else {
    // Calculate other variables when required fields have values
    var totalCost = calculateTotal();
    vatable = totalCost * 1.7;
    vat = vatable * 0.12;
    total = vatable + vat;
    pricePerBooklet = total / quantity;
  }

  const images = [collection, half1, forth1];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <NavBar />
      <div className="collectionContainer">
        <div className="main-container">
          <div className="product-info">
            <div className="image-container">
              <button className="nav-button left" onClick={handlePrevImage}>&lt;</button>
              <img src={images[currentImageIndex]} alt="Product" className="product-image" />
              <button className="nav-button right" onClick={handleNextImage}>&gt;</button>
            </div>
            <h1 className="red-title">Collection Receipt</h1>
            <p className="description">DESCRIPTION OF THE PRODUCT</p>
          </div>

          <div className="price-calc-container">
            <h3> Price Calculator</h3>
            <div className="input-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                className="input-box"
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="0"
              />
            </div>

            <div className="input-group">
              <label htmlFor="size">Size:</label>
              <select
                className="input-box"
                id="size"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="">Select Size</option>
                <option value="1/4">1/4</option>
                <option value="1/2">1/2</option>
                <option value="1 Whole">1 Whole</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="paper-size">Paper Size:</label>
              <select
                className="input-box"
                id="paper-size"
                value={paperSize}
                onChange={handlePaperSizeChange}
              >
                <option value="">Select Paper Size</option>
                <option value="Short Size (8.5 x 11)">Short Size (8.5 x 11)</option>
                <option value="Long Size (8.5 x 13)">Long Size (8.5 x 13)</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="number-of-ply">Number of Ply:</label>
              <input
                className="input-box"
                type="number"
                id="number-of-ply"
                value={numberOfPly}
                onChange={handleNumberOfPlyChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="paper-type">Paper Type:</label>
              <select
                className="input-box"
                id="paper-type"
                value={paperType}
                onChange={handlePaperTypeChange}
              >
                <option value="">Select Paper Type</option>
                <option value="Carbonless Paper">Carbonless Paper</option>
                <option value="Bond Paper">Bond Paper</option>
                <option value="Colored Bond">Colored Bond</option>
                <option value="Onion Skin">Onion Skin</option>
                <option value="Newsprint (white)">Newsprint (white)</option>
                <option value="Newsprint (colored)">Newsprint (colored)</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="color-printing">Color Printing:</label>
              <select
                className="input-box"
                id="color-printing"
                value={colorPrinting}
                onChange={handleColorPrintingChange}
              >
                <option value="">Select Color Printing</option>
                <option value="Black and White">Black and White</option>
                <option value="1 color">1 additional color</option>
                <option value="2 color">2 additional colors</option>
                <option value="3 color">3 additional colors</option>
              </select>
            </div>

            <div className="total-container">
              <label htmlFor="vatable-cost" className="align-right">VATable Cost: </label>
              <span className="vatable-cost align-right">₱{vatable.toFixed(2)}</span>
            </div>
            <div className="total-container">
              <label htmlFor="vat-amount" className="align-right">VAT Amount (12%): </label>
              <span className="vat-amount align-right">₱{vat.toFixed(2)}</span>
            </div>
            <div className="total-container">
              <label htmlFor="total-amount" className="align-right">Total Amount: </label>
              <span className="total-amount align-right">₱{total.toFixed(2)}</span>
            </div>
            <div className="total-container">
              <label htmlFor="price-per-booklet" className="align-right">Price per Booklet: </label>
              <span className="price-per-booklet align-right">₱{pricePerBooklet.toFixed(2)}</span>
            </div>

          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Collection;
