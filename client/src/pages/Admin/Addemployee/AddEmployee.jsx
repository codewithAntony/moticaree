import { useRef } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEmployee() {
  const navigate = useNavigate();

  const fNameDom = useRef();
  const lNameDom = useRef();
  const passwordDom = useRef();
  const emailDom = useRef();
  const phoneDom = useRef();
  const roleDom = useRef();

  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

  async function handleSubmit(e) {
    e.preventDefault();

    const fNameValue = fNameDom.current.value;
    const lNameValue = lNameDom.current.value;
    const passwordValue = passwordDom.current.value;
    const emailValue = emailDom.current.value;
    const phoneValue = phoneDom.current.value;
    const activeValue = 1;
    const roleValue = roleDom.current.value;

    try {
      const result = await axios.post(
        "/add-employee",
        {
          employee_first_name: fNameValue,
          employee_last_name: lNameValue,
          employee_email: emailValue,
          employee_password: passwordValue,
          employee_phone: phoneValue,
          active_employee: activeValue,
          company_role_id: roleValue,
        },
        {
          headers: {
            Authorization: `Bearer ${loginEmployee}`,
          },
        }
      );

      toast.success("Employee added successfully!");

      setTimeout(() => {
        navigate("/admin/employee");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data.msg || "Something went wrong!";
      setTimeout(() => {
        toast.error(errorMsg, {
          position: "top-right",
        });
      }, 100);
      console.log(errorMsg);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 px-5 py-4">
          <div className="section-title">Add a New Employee</div>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="mb-3">
              <input
                ref={fNameDom}
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <input
                ref={lNameDom}
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="mb-3">
              <input
                ref={emailDom}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                ref={passwordDom}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                ref={phoneDom}
                type="tel"
                className="form-control"
                placeholder="+254-7xx-xxx-xxx"
              />
            </div>
            <div className="mb-3">
              <select ref={roleDom} className="form-control">
                <option value="">Select role</option>
                <option value="1">Employee</option>
                <option value="2">Manager</option>
                <option value="3">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-danger px-4 py-2">
              ADD Employee
            </button>
          </form>
        </div>
      </div>

      {/* ToastContainer renders toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default AddEmployee;
