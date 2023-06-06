import { images } from "@/components/Global/Image";
import NavWithBack from "@/components/Global/NavWithBack";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <NavWithBack />
      <section className="allDetails mt-3 pt-5">
        <div className=" container mt-5" style={{ overflow: "hidden" }}>
          <div>
            <h4 style={{ fontWeight: "300", color: "#022873" }}>
              Welcome to <span className="highlight"> UniGhana,</span>
            </h4>
            <p>
              Explore the contents from the various universities in the country,
              get to know <br></br> more about the courses they offer,
              <span>
                how the school can help your career journey and a <br></br>lot
                more exciting feature!!
              </span>
            </p>
          </div>
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ height: "450px" }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Image
                  src={images.legon}
                  className="d-block w-100"
                  alt="First Slide"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src={images.upsa}
                  className="d-block w-100"
                  alt="Second Slide"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src={images.knust}
                  className="d-block w-100"
                  alt="Third Slide"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="row align-items-center justify-content-center my-5 mx-auto">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <Image
                src={images.legon}
                alt="Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus euismod fringilla tellus at suscipit. Ut sed
                  sagittis tortor.
                </p>
                <a href="/details" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <Image
                src={images.legon}
                alt="Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus euismod fringilla tellus at suscipit. Ut sed
                  sagittis tortor.
                </p>
                <a href="/details" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <Image
                src={images.legon}
                alt="Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus euismod fringilla tellus at suscipit. Ut sed
                  sagittis tortor.
                </p>
                <a href="/details" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
