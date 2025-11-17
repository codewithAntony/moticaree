import car_tire from "../../../assets/img/car tire.webp";
import about from "../../../assets/img/about.jpg";
import carousel_bg_1 from "../../../assets/img/carousel-bg-1.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: `url(${carousel_bg_1})` }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3" data-aos="fade-down">
              About Us
            </h1>
            <nav
              aria-label="breadcrumb"
              data-aos="fade-up"
              data-aos-delay="200"
            >
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
                  About
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* About Section 1 */}
      <section style={{ margin: "80px auto" }} className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-4">
              We are highly skilled mechanics for your car repair
            </h2>
            <p className="mb-3">
              With years of hands-on experience, our team provides top-quality
              auto repair and maintenance to keep your car running at its best.
              From diagnostics to detailed repairs, we ensure reliable,
              efficient service every time.
            </p>
            <p>
              Trust our skilled mechanics to handle everything with care and
              expertise, so you can drive with confidence.
            </p>
          </div>
          <div className="col-md-6 text-center" data-aos-delay="200">
            <img
              src={car_tire}
              alt="Mechanic holding car tire"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* About Section 2 */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 pt-4"
              style={{ minHeight: "400px" }}
              data-aos="zoom-in"
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute img-fluid w-100 h-100"
                  src={about}
                  style={{ objectFit: "cover" }}
                  alt="About MotiCare"
                />
                <div
                  className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5"
                  style={{ background: "rgba(0, 0, 0, .08)" }}
                >
                  <h1 className="display-4 text-white mb-0">
                    12<sup>+</sup> <span className="fs-4">Years</span>
                  </h1>
                  <h4 className="text-white">Experience</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-out">
              <h6 className="text-primary text-uppercase">// About Us //</h6>
              <h1 className="mb-2">
                <span className="text-primary">MotiCare</span> Is The Best Place
                For Your Auto Care
              </h1>
              <p className="mb-4">
                From routine maintenance to complex repairs, our expert team is
                dedicated to keeping your vehicle in top condition. We combine
                quality workmanship, modern diagnostics, and exceptional
                customer service to ensure your car gets the care it deserves.
              </p>

              {/* Features */}
              <div className="row g-4 mb-3 pb-3">
                <div className="col-12" data-aos="fade-up" data-aos-delay="100">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">01</span>
                    </div>
                    <div className="ps-3">
                      <h6>Professional & Expert</h6>
                      <span>Skilled technicians you can trust.</span>
                    </div>
                  </div>
                </div>
                <div className="col-12" data-aos="fade-up" data-aos-delay="300">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">02</span>
                    </div>
                    <div className="ps-3">
                      <h6>Quality Servicing Center</h6>
                      <span>State-of-the-art care for your car.</span>
                    </div>
                  </div>
                </div>
                <div className="col-12" data-aos="fade-up" data-aos-delay="500">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">03</span>
                    </div>
                    <div className="ps-3">
                      <h6>Awards Winning Workers</h6>
                      <span>Recognized for excellence and reliability.</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="btn btn-primary py-3 px-5"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Read More
                <i className="fa fa-arrow-right ms-3"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
