import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg"
            alt="Card"
            style={{ height: "auto", maxHeight: "300px", objectFit: "cover" }} //mobile responsiveness
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center p-3 p-sm-4">
            <div className="text-center">
              <h5 className="card-title fs-4 fs-sm-1 fw-lighter">
                New Season Arrivals
              </h5>
              <p className="card-text fs-6 d-none d-sm-block">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
