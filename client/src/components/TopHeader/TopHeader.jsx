import { useAuth } from "../../contexts/AuthContext";

function TopHeader() {
  const { isLogin, employee, admin } = useAuth();
  console.log(useAuth());

  return (
    <div className="container-fluid bg-light p-0">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-map-marker-alt text-primary me-2"></small>
            <small>Nairobi, Kenya</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center py-3">
            <small className="far fa-clock text-primary me-2"></small>
            <small>Mon - Sat : 09.00 AM - 5.00 PM</small>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          {isLogin ? (
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-user text-primary me-2"></small>
              <small style={{ fontWeight: "bolder" }}>
                Welcome, {employee?.employee_first_name}
              </small>
            </div>
          ) : (
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2"></small>
              <small>+254 725 010 898</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
