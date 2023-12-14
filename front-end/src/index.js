import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'; // Import the Signup component
import Profile from './Pages/Profile/Profile';
import Billing from './Pages/Products/Invoices/Billing Invoice/Billing-Invoice';
import Cash from './Pages/Products/Invoices/Cash Invoice/Cash-Invoice';
import Sales from './Pages/Products/Invoices/Sales Invoice/Sales-Invoice';
import Collection from './Pages/Products/Receipts/Collection Receipts/Collection-Receipt';
import Official from './Pages/Products/Receipts/Official Receipts/Official-Receipt';
import Delivery from './Pages/Products/Receipts/Delivery Receipts/Delivery-Receipt';
import Acknowledgement from './Pages/Products/Receipts/Acknowledgement Receipts/Acknowledgement-Receipt';
import Forms from './Pages/Products/Forms/Forms';
import JobOrder from './Pages/Products/JobOrder/Job-Order';
import ReqQuote from './components/ReqQuote/ReqQuote';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "quote",
    element: <ReqQuote />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup", // Add a route for Sign Up
    element: <Signup />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "billing-invoice",
    element: <Billing />,
  },
  {
    path: "cash-invoice",
    element: <Cash />,
  },
  {
    path: "sales-invoice",
    element: <Sales />,
  },
  {
    path: "acknowledgement-receipt",
    element: <Acknowledgement/>,
  },
  {
    path: "collection-receipt",
    element: <Collection/>,
  },
  {
    path: "official-receipt",
    element: <Official/>,
  },
  {
    path: "delivery-receipt",
    element: <Delivery/>,
  },
  {
    path: "forms",
    element: <Forms/>,
  },
  {
    path: "job-order",
    element: <JobOrder/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
