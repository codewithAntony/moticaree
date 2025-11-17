import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Address</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>Nairobi, Kenya
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+254 725 010 898
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>antonymurithi51@gmail.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Opening Hours</h4>
              <h6 className="text-light">Monday - Friday:</h6>
              <p className="mb-4">09.00 AM - 09.00 PM</p>
              <h6 className="text-light">Saturday - Sunday:</h6>
              <p className="mb-0">09.00 AM - 12.00 PM</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Services</h4>
              <Link className="btn btn-link" to="">
                Diagnostic Test
              </Link>
              <Link className="btn btn-link" to="">
                Engine Servicing
              </Link>
              <Link className="btn btn-link" to="">
                Tires Replacement
              </Link>
              <Link className="btn btn-link" to="">
                Oil Changing
              </Link>
              <Link className="btn btn-link" to="">
                Vacuum Cleaning
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Newsletter</h4>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: 400 }}
              >
                <input
                  className="form-control border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-12 text-center mb-0 ">
                &copy; 2025{" "}
                <Link className="" href="#">
                  Kimong'o
                </Link>
                . All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
