import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  // State for form fields
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: ""
  });

  // State for form validation
  const [formValidity, setFormValidity] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    country: false,
    state: false,
    zip: false,
    ccName: false,
    ccNumber: false,
    ccExpiration: false,
    ccCvv: false
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value
    });
    // Validate fields
    validateField(id, value);
  };

  // Validate individual field
  const validateField = (field, value) => {
    const isValid = value.trim() !== "";
    setFormValidity({
      ...formValidity,
      [field]: isValid
    });
  };

  // Function to check if all fields are valid
  const isFormValid = () => {
    return Object.values(formValidity).every((valid) => valid);
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})
                    <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate>
                  <div className="row g-3">
                    {[
                      { id: "firstName", label: "First name" },
                      { id: "lastName", label: "Last name" },
                      { id: "email", label: "Email", type: "email" },
                      { id: "address", label: "Address" },
                      { id: "address2", label: "Address 2", optional: true },
                      { id: "country", label: "Country" },
                      { id: "state", label: "State" },
                      { id: "zip", label: "Zip" }
                    ].map((field) => (
                      <div key={field.id} className={`col-${field.optional ? '12' : 'sm-6'} my-1`}>
                        <label htmlFor={field.id} className="form-label">
                          {field.label} {field.optional && <span className="text-muted">(Optional)</span>}
                        </label>
                        <input
                          type={field.type || "text"}
                          className="form-control"
                          id={field.id}
                          placeholder=""
                          value={formState[field.id]}
                          onChange={handleChange}
                          required={!field.optional}
                        />
                        <div className="invalid-feedback">
                          {field.label} is required.
                        </div>
                      </div>
                    ))}

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    {[
                      { id: "cc-name", label: "Name on card" },
                      { id: "cc-number", label: "Credit card number" },
                      { id: "cc-expiration", label: "Expiration" },
                      { id: "cc-cvv", label: "CVV" }
                    ].map((field) => (
                      <div key={field.id} className={`col-md-${field.id === 'cc-number' ? '6' : '3'} my-1`}>
                        <label htmlFor={field.id} className="form-label">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={field.id}
                          placeholder=""
                          value={formState[field.id]}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          {field.label} is required.
                        </div>
                      </div>
                    ))}

                    <hr className="my-4" />
                  </div>
                  <button
                    className="w-100 btn btn-primary"
                    id="finalCheckout"
                    onClick={() => {
                      if (isFormValid()) {
                        alert("Order Placed Successfully");
                        window.location.href = "/";
                      } else {
                        alert("Please fill out all required fields.");
                      }
                    }}
                    // disabled={!isFormValid()}
                  >
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length === 0 ? <EmptyCart /> : <ShowCheckout />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
