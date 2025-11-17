import { Link } from "react-router-dom";
import about from "../../../assets/img/about.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Image Column */}
          <div className="col-lg-6" data-aos="fade-up">
            <div
              className="position-relative w-100 h-100"
              style={{ minHeight: "400px" }}
            >
              <img
                className="img-fluid w-100 h-100 rounded shadow"
                src={about}
                style={{ objectFit: "cover" }}
                alt="About MotiCare"
              />
              <div
                className="position-absolute top-0 end-0 mt-3 me-3 py-3 px-4"
                style={{
                  background: "rgba(0, 0, 0, .08)",
                  borderRadius: "10px",
                }}
              >
                <h1 className="display-4 text-white mb-0">
                  12<sup>+</sup> <span className="fs-4">Years</span>
                </h1>
                <h4 className="text-white">Experience</h4>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h6 className="text-primary text-uppercase">// About Us //</h6>
            <h1 className="mb-2">
              <span className="text-primary">MotiCare</span> Is The Best Place
              For Your Auto Care
            </h1>
            <p className="mb-4">
              From routine maintenance to complex repairs, our expert team is
              dedicated to keeping your vehicle in top condition. We combine
              quality workmanship, modern diagnostics, and exceptional customer
              service to ensure your car gets the care it deserves.
            </p>

            {/* Features */}
            <div className="row g-4 mb-3 pb-3">
              {[
                {
                  num: "01",
                  title: "Professional & Expert",
                  text: "Skilled technicians you can trust.",
                  delay: 300,
                },
                {
                  num: "02",
                  title: "Quality Servicing Center",
                  text: "State-of-the-art care for your car.",
                  delay: 400,
                },
                {
                  num: "03",
                  title: "Awards Winning Workers",
                  text: "Recognized for excellence and reliability.",
                  delay: 500,
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="col-12"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                >
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">{item.num}</span>
                    </div>
                    <div className="ps-3">
                      <h6>{item.title}</h6>
                      <span>{item.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="btn btn-primary py-3 px-5"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Read More <i className="fa fa-arrow-right ms-3"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
