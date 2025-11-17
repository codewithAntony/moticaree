import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import carousel_bg_1 from "../../../assets/img/carousel-bg-1.jpg";
import { ClipLoader } from "react-spinners";

function Contact() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {/* Page Header */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: `url(${carousel_bg_1})` }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3" data-aos="slide-down">
              Contact
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Form & Map */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            {/* Google Map */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              {isLoading ? (
                <div
                  style={{ height: "450px", background: "#E5E3DF" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <ClipLoader size={50} color="#B8101F" />{" "}
                </div>
              ) : (
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.682238021306!2d36.804878844823264!3d-1.268124694879225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c0a1f9de7%3A0xad2c84df1f7f2ec8!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1762530562617!5m2!1sen!2ske"
                  frameBorder="0"
                  style={{ minHeight: "350px", border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              )}
            </div>

            {/* Contact Form */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
              <h2 className="mb-3">Have a Question?</h2>
              <p className="mb-4">
                We’re here to help and answer any questions you might have.
                Please fill out the form below, and our team will reach out to
                you shortly.
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div
              className="col-12 mt-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-center mb-5">
                <h1>Contact For Any Query</h1>
              </div>
              <div className="row gy-2">
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Phone</h5>
                    <p className="m-0">
                      <i className="fa fa-phone-alt text-primary me-2"></i>
                      +254 725 010 898
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Email</h5>
                    <p className="m-0">
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      antonymurithi51@gmail.com
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Address</h5>
                    <p className="m-0">
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
