import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";

function OrderDetail() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [estimatedCompletion, setEstimatedCompletion] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);

  const auth = getAuth();
  const token = auth?.token || "";

  const steps = [
    "Received",
    "In Progress",
    "Quality Check",
    "Ready for Pickup",
  ];

  // Fetch customers
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await axios.get("/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data.msg || []);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      }
    }
    fetchCustomers();
  }, [token]);

  // Fetch vehicles
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await axios.get("/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(res.data.msg || []);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    }
    fetchVehicles();
  }, [token]);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = res.data.msg || [];
        setOrders(ordersData);
        console.log("order data:", ordersData);

        if (ordersData.length > 0) {
          const orderDate = new Date(ordersData[0].order_date);
          const completionDate = new Date(orderDate);
          completionDate.setDate(orderDate.getDate() + 5);
          setEstimatedCompletion(completionDate.toLocaleDateString());
          setOrderStatus(ordersData[0].order_status || 0);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }
    fetchOrders();
  }, [token]);

  const order = orders[0] || {};
  const customerName = order.customer_first_name
    ? `${order.customer_first_name} ${order.customer_last_name}`
    : "-";
  const customerEmail = order.customer_email || "-";
  const customerPhone = order.customer_phone_number || "-";

  const vehicleMake = order.vehicle_make || "-";
  const vehicleModel = order.vehicle_model || "-";
  const vehicleYear = order.vehicle_year || "-";
  const vehicleColor = order.vehicle_color || "-";
  const vehicleSerial = order.vehicle_serial || "-";
  const vehicleTag = order.vehicle_tag || "-";

  console.log(order);

  const getCircleColor = (step) => {
    switch (step) {
      case "Received":
        return "#343a40"; // dark
      case "In Progress":
        return "#ffc107"; // warning
      case "Quality Check":
        return "#999"; // NEW inline
      case "Ready for Pickup":
        return "#28a745"; // success
      default:
        return "#6c757d"; // secondary
    }
  };

  const getTextColor = (step, idx) => {
    if (idx === orderStatus) return "#343a40";
    if (idx < orderStatus) return "#28a745";
    switch (step) {
      case "Received":
        return "#6c757d";
      case "In Progress":
        return "#ffc107";
      case "Quality Check":
        return "#999"; // NEW inline
      case "Ready for Pickup":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case "Received":
        return { backgroundColor: "#343a40", color: "#fff" };
      case "In Progress":
        return { backgroundColor: "#ffc107", color: "#343a40" };
      case "Quality Check":
        return { backgroundColor: "#999", color: "#fff" }; // NEW inline
      case "Ready for Pickup":
        return { backgroundColor: "#28a745", color: "#fff" };
      default:
        return { backgroundColor: "#6c757d", color: "#fff" };
    }
  };

  return (
    <div className="container my-5">
      <header className="mb-4">
        <div
          className="card"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "8px",
            borderRadius: "8px",
            maxWidth: "fit-content",
          }}
        >
          <h5 className="mb-0 d-flex align-items-center">
            <i className="fa fa-info-circle me-2 p-2 text-primary"></i>
            Order Details for{" "}
            <div className="text-danger p-2">
              {customer.customer_first_name
                ? `${customer.customer_first_name} ${customer.customer_last_name}`
                : "-"}
            </div>
          </h5>
        </div>
        <strong className="text-muted">
          Track your order progress and details below.
        </strong>
      </header>

      {/* Timeline */}
      <section className="mb-5">
        <h5 className="mb-3 text-center">Order Progress</h5>
        <div className="d-flex justify-content-between align-items-center position-relative">
          {steps.map((step, idx) => (
            <div key={step} className="text-center flex-fill position-relative">
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: getCircleColor(step),
                  borderRadius: "50%",
                  margin: "0 auto 8px",
                  zIndex: 2,
                }}
              />
              <small
                style={{
                  color: getTextColor(step, idx),
                  fontWeight: step === "Quality Check" ? 600 : 500,
                }}
              >
                {step}
              </small>
              {idx < steps.length - 1 && (
                <div
                  style={{
                    width: "100%",
                    height: 4,
                    backgroundColor: idx < orderStatus ? "#28a745" : "#6c757d",
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="row gx-4">
        {/* Left: Customer & Vehicle */}
        <aside className="col-lg-5 mb-4">
          <section className="card shadow-sm rounded">
            <header
              className="card-header"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <i className="fa fa-user me-2"></i> Customer Info
            </header>
            <div className="card-body">
              <p>
                <strong>Name:</strong>
                {customerName}
              </p>
              <p>
                <strong>Email:</strong> {customerEmail}
              </p>
              <p>
                <strong>Phone:</strong> {customerPhone}
              </p>
              <hr />
              <p>
                <strong>Order Date:</strong>{" "}
                {order.order_date
                  ? format(new Date(order.order_date), "dd/MM/yyyy")
                  : "-"}
              </p>
              <p>
                <strong>Estimated Completion:</strong>{" "}
                {estimatedCompletion || "-"}
              </p>
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header
              className="card-header"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <i className="fa fa-car me-2"></i> Vehicle Info
            </header>
            <div className="card-body">
              <p>
                <strong>Make:</strong> {vehicleMake}
              </p>
              <p>
                <strong>Model:</strong> {vehicleModel}
              </p>
              <p>
                <strong>Color:</strong> {vehicleColor}
              </p>
              <p>
                <strong>Year:</strong> {vehicleYear}
              </p>
              <p>
                <strong>Serial:</strong> {vehicleSerial}
              </p>
              <p>
                <strong>Tag:</strong> {vehicleTag}
              </p>
            </div>
          </section>
        </aside>

        {/* Right: Services & Summary */}
        <main className="col-lg-7">
          <section className="card shadow-sm rounded">
            <header
              className="card-header"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <i className="fa fa-cogs me-2"></i> Services Requested
            </header>
            <div className="card-body">
              {services.length === 0 ? (
                <p className="text-muted fst-italic">No services selected.</p>
              ) : (
                services.map(
                  ({
                    service_id,
                    service_name,
                    service_description,
                    service_completed,
                  }) => (
                    <div
                      key={service_id}
                      style={{
                        borderBottom: "1px solid #6c757d",
                        paddingBottom: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1 fw-bolder">{service_name}</p>
                        <span
                          className="badge p-2 my-1 border"
                          style={getBadgeStyle(service_completed || "Received")}
                        >
                          {service_completed || "Received"}
                        </span>
                      </div>
                      <p className="text-muted small mb-0">
                        {service_description}
                      </p>
                    </div>
                  )
                )
              )}

              {additionalRequestText && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h6 className="fw-semibold">Additional Request</h6>
                    <p className="text-muted">{additionalRequestText}</p>
                  </div>
                  <span
                    className="badge p-2 my-1 border"
                    style={getBadgeStyle(additionalRequestStatus)}
                  >
                    {additionalRequestStatus}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header
              className="card-header"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <i className="fa fa-file-invoice-dollar me-2"></i> Order Summary
            </header>
            <div className="card-body">
              <p>
                <strong>Total Services:</strong> {services.length}
              </p>
              <hr />
              <p className="fs-5 fw-bold">
                Total: ${order.order_total_price || "0.00"}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OrderDetail;
