// import React, { useRef } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const emailDom = useRef();
//   const passwordDom = useRef();
//   const confirmPasswordDom = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const nameValue = e.target.name.value;
//     const emailValue = e.target.email.value;
//     const passwordValue = e.target.password.value;
//     const confirmPasswordValue = e.target.confirmPassword.value;

//     if (passwordValue !== confirmPasswordValue) {
//       setError("Password do not match");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: nameValue,
//           email: emailValue,
//           password: passwordValue,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Registration successful!");
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Error registering:", error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 650 }} className="container py-5">
//       <div className="wow fadeInUp" data-wow-delay="0.2s">
//         <h2 className="mb-5 mt-3">Create Your Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             <div className="col-12">
//               <div className="form-floating">
//                 <input
//                   ref={emailDom}
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   placeholder="Email"
//                   required
//                 />
//                 <label htmlFor="email">Email</label>
//               </div>
//             </div>

//             <div className="col-12">
//               <div className="form-floating">
//                 <input
//                   ref={passwordDom}
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   placeholder="Password"
//                   required
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>
//             </div>

//             <div className="col-12">
//               <div className="form-floating">
//                 <input
//                   ref={confirmPasswordDom}
//                   type="password"
//                   className="form-control"
//                   id="confirmPassword"
//                   placeholder="Confirm Password"
//                   required
//                 />
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//               </div>
//             </div>

//             {error && (
//               <small
//                 style={{
//                   color: "red",
//                   fontSize: "14px",
//                   paddingBottom: "3px",
//                   margin: "10px 250px",
//                 }}
//               >
//                 {error}
//               </small>
//             )}

//             {success && (
//               <small
//                 style={{
//                   color: "green",
//                   fontSize: "14px",
//                   paddingBottom: "3px",
//                   margin: "10px 250px",
//                 }}
//               >
//                 {success}
//               </small>
//             )}

//             <div className="col-12">
//               <button className="btn btn-primary w-100 py-3" type="submit">
//                 Register
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
