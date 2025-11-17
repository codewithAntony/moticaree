import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { RingLoader } from "react-spinners";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [hash, setHash] = useState([]);

  const auth = getAuth();
  const token = auth?.token || "";

  const statusOptions = [
    "Received",
    "In Progress",
    "Quality Check",
    "Ready for Pickup",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, customersRes, vehiclesRes, servicesRes] =
          await Promise.all([
            axios.get("/orders", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/customers", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/vehicles", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/all-services", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const customersData = customersRes.data.msg || [];
        const vehiclesData = vehiclesRes.data.msg || [];
        const allServicesData = Array.isArray(servicesRes.data.data)
          ? servicesRes.data.data
          : [];

        setCustomers(customersData);
        setVehicles(vehiclesData);
        setServices(allServicesData);

        const ordersData = ordersRes.data.msg || [];
        console.log(ordersData);

        const mappedOrders = ordersData.map((o) => {
          const customer =
            customersData.find((c) => c.customer_id === o.customer_id) || {};
          const vehicle =
            vehiclesData.find((v) => v.vehicle_id === o.vehicle_id) || {};

          const requestedServices = (o.services || []).map(
            (s) =>
              allServicesData.find((as) => as.service_id === s.service_id)
                ?.service_name || "N/A"
          );

          // Determine status based on all services AND additional request
          const allReady = (o.services || []).every(
            (s) => s.service_completed === "Ready for Pickup"
          );
          const additionalReady =
            (o.services && o.services.length > 0
              ? o.services[0].additional_requests_completed
              : "") === "Ready for Pickup";

          const status = allReady && additionalReady ? "Closed" : "Open";

          return {
            ...o,
            customer,
            vehicle,
            requestedServices,
            services: o.services || [],
            date: o.order_date
              ? format(new Date(o.order_date), "MM/dd/yyyy")
              : "-",
            status,
          };
        });

        setOrders(mappedOrders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleEditClick = async (orderHash) => {
    if (!orderHash) return toast.error("Order hash missing");
    try {
      const res = await axios.get(`/order/${orderHash}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && res.data.msg) setEditOrder(res.data.msg);
      else toast.error("Order data not found");
    } catch (err) {
      toast.error("Failed to fetch order details");
    }
  };

  const handleUpdate = async () => {
    if (!editOrder) return;

    setUpdating(true);

    try {
      // Prepare payload for backend
      const payload = editOrder.services.length
        ? editOrder.services.map((s, idx) => ({
            service_id: s.service_id,
            service_completed: s.service_completed,
            // Only first service holds additional request
            additional_requests_completed:
              idx === 0 ? s.additional_requests_completed : null,
          }))
        : [
            {
              service_id: editOrder.services[0]?.service_id || null,
              service_completed: null,
              additional_requests_completed:
                editOrder.services[0]?.additional_requests_completed || null,
            },
          ];

      // Send PUT request
      await axios.put(`/order/update/${editOrder.order_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update orders locally
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === editOrder.order_id
            ? {
                ...o,
                services: editOrder.services,
                requestedServices: editOrder.services.map(
                  (s) =>
                    services.find((as) => as.service_id === s.service_id)
                      ?.service_name || "N/A"
                ),
                status:
                  editOrder.services.every(
                    (s) => s.service_completed === "Ready for Pickup"
                  ) &&
                  editOrder.services[0]?.additional_requests_completed ===
                    "Ready for Pickup"
                    ? "Closed"
                    : "Open",
              }
            : o
        )
      );

      toast.success("Order updated successfully!");
      setEditOrder(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setEditOrder((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.service_id === serviceId ? { ...s, service_completed: newStatus } : s
      ),
    }));
  };

  // delete order
  async function handleDelete(orderId) {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const result = await axios.delete(`/order/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(result);
      setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to delete order!");
    }
  }

  const getBadgeColor = (status) => {
    switch (status) {
      case "Received":
        return "bg-dark text-white";
      case "In Progress":
        return "bg-warning text-dark";
      case "Quality Check":
        return ""; // handled via inline style
      case "Ready for Pickup":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const handleAdditionalRequestChange = (newStatus) => {
    setEditOrder((prev) => ({
      ...prev,
      services: prev.services.map((s, idx) =>
        idx === 0 ? { ...s, additional_requests_completed: newStatus } : s
      ),
    }));
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-lg-10 px-5">
          <h1 className="title-bar section-title pt-4 pb-1">Orders</h1>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <RingLoader size={50} color="#B8101F" />
            </div>
          ) : (
            <div
              className="table-responsive"
              style={{ maxHeight: "365px", overflowY: "auto" }}
            >
              <table className="table table-bordered table-hover bg-white mb-0">
                <thead
                  className="table-light"
                  style={{ position: "sticky", top: 0, zIndex: 10 }}
                >
                  <tr
                    style={{
                      fontSize: "14.5px",
                    }}
                  >
                    <th>#</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Date</th>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      Requested Services
                    </th>

                    <th>Services Status</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => {
                      return (
                        <React.Fragment key={order.order_id}>
                          {/* Render services normally */}
                          {order.services.map((s, sIdx) => {
                            const serviceName =
                              services.find(
                                (as) => as.service_id === s.service_id
                              )?.service_name || "N/A";

                            return (
                              <tr
                                key={`${order.order_id}-${s.service_id}`}
                                style={{
                                  borderBottom: "2px solid #dee2e6", // thin line for normal service rows
                                }}
                              >
                                {/* First row order details */}
                                {sIdx === 0 && (
                                  <>
                                    <td rowSpan={order.services.length + 1}>
                                      {index + 1}
                                    </td>

                                    {/* Customer */}
                                    <td rowSpan={order.services.length + 1}>
                                      <strong>
                                        <small className="fa fa-user text-primary me-2"></small>
                                        {order.customer.customer_first_name}{" "}
                                        {order.customer.customer_last_name}
                                      </strong>

                                      <p
                                        className="text-muted "
                                        style={{ marginTop: "15px" }}
                                      >
                                        <p
                                          className="fw-bold"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {order.order_hash}
                                        </p>
                                        <small style={{ fontSize: "12px" }}>
                                          📞
                                        </small>{" "}
                                        {order.customer.customer_phone_number}
                                      </p>
                                    </td>

                                    {/* Vehicle */}
                                    <td
                                      rowSpan={order.services.length + 1}
                                      style={{
                                        wordBreak: "break-all",
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      <strong>
                                        {order.vehicle.vehicle_make}
                                      </strong>
                                      <br />
                                      <small className="text-muted">
                                        | {order.vehicle.vehicle_color} |
                                      </small>
                                      <br />
                                      <small className="text-muted">
                                        {order.vehicle.vehicle_tag}
                                      </small>
                                    </td>

                                    <td rowSpan={order.services.length + 1}>
                                      <div className="mt-3">{order.date}</div>
                                    </td>
                                  </>
                                )}

                                {/* Requested service */}
                                <td>
                                  <small style={{ fontWeight: "550" }}>
                                    {serviceName}
                                  </small>
                                </td>

                                {/* Service status */}
                                <td>
                                  <span
                                    className={`badge mx-3 p-2 border ${getBadgeColor(
                                      s.service_completed
                                    )}`}
                                    style={
                                      s.service_completed === "Quality Check"
                                        ? {
                                            backgroundColor: "#999",
                                            color: "#fff",
                                          }
                                        : {}
                                    }
                                  >
                                    <strong style={{ fontSize: "10px" }}>
                                      {s.service_completed}
                                    </strong>
                                  </span>
                                </td>

                                {/* First row only: order status + actions */}
                                {sIdx === 0 && (
                                  <>
                                    <td rowSpan={order.services.length + 1}>
                                      <span
                                        className={`badge p-2 mt-4 mx-auto text-white`}
                                        style={{
                                          backgroundColor:
                                            order.status === "Open"
                                              ? "#091436"
                                              : "#dc3545",
                                        }}
                                      >
                                        {order.status}
                                      </span>
                                    </td>
                                    <td rowSpan={order.services.length + 1}>
                                      <i
                                        className="bi bi-pencil-square fw-bolder text-secondary mx-1"
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "17px",
                                        }}
                                        onClick={() =>
                                          handleEditClick(order.order_hash)
                                        }
                                      ></i>
                                      <i
                                        className="bi bi-trash-fill fw-bolder text-danger"
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "18px",
                                        }}
                                        onClick={() =>
                                          handleDelete(order.order_id)
                                        }
                                      ></i>
                                    </td>
                                  </>
                                )}
                              </tr>
                            );
                          })}

                          {/* Extra row for Additional Request */}
                          <tr
                            key={`${order.order_id}-additional`}
                            style={{
                              borderBottom: "1.8px solid #000", // ✅ thick divider between orders
                            }}
                          >
                            {/* Requested Services column */}
                            <td>
                              <small
                                style={{ fontWeight: "600", color: "#000" }}
                              >
                                Additional Request
                              </small>
                              <br />
                            </td>

                            {/* Services Status column */}
                            <td>
                              {order.services[0]
                                ?.additional_requests_completed ? (
                                <span
                                  className={`badge mx-3 p-2 border ${getBadgeColor(
                                    order.services[0]
                                      .additional_requests_completed
                                  )}`}
                                  style={
                                    order.services[0]
                                      .additional_requests_completed ===
                                    "Quality Check"
                                      ? {
                                          backgroundColor: "#999",
                                          color: "#fff",
                                        }
                                      : {}
                                  }
                                >
                                  <strong style={{ fontSize: "10px" }}>
                                    {
                                      order.services[0]
                                        .additional_requests_completed
                                    }
                                  </strong>
                                </span>
                              ) : (
                                <span className="text-muted">No status</span>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No orders available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Edit/Update Modal */}
          {editOrder && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Update Services for Order #{editOrder.order_id}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setEditOrder(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editOrder.services.map((service) => (
                      <div key={service.service_id} className="mb-2">
                        <h6 className="form-label">
                          {services.find(
                            (as) => as.service_id === service.service_id
                          )?.service_name || service.service_name}
                        </h6>
                        <select
                          className="form-select"
                          value={service.service_completed}
                          onChange={(e) =>
                            handleStatusChange(
                              service.service_id,
                              e.target.value
                            )
                          }
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    {/* Additional Request Editor */}
                    <div className="mb-2">
                      <h6 className="form-label">Additional Request</h6>
                      <select
                        className="form-select"
                        value={
                          editOrder.services[0]
                            ?.additional_requests_completed || ""
                        }
                        onChange={(e) =>
                          handleAdditionalRequestChange(e.target.value)
                        }
                      >
                        <option value="">-- Select Status --</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditOrder(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdate}
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
