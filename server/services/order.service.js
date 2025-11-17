const db = require("../config/db.config");
const crypto = require("crypto");

async function addOrder(orderData) {
  const { order_total_price, additional_request, order_services } = orderData;

  if (
    !order_total_price ||
    !order_services ||
    !Array.isArray(order_services) ||
    order_services.length === 0
  ) {
    return {
      error:
        "Please fill all required fields and provide at least one service.",
      status: 400,
    };
  }

  try {
    // Get most recent employee_id
    const employee = await db.query(
      "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1"
    );
    if (!employee || employee.length === 0) {
      return { error: "No employees found", status: 404 };
    }
    const employee_id = employee[0].employee_id;

    // Get most recent customer_id
    const customer = await db.query(
      "SELECT customer_id FROM customer_identifier ORDER BY customer_id DESC LIMIT 1"
    );
    if (!customer || customer.length === 0) {
      return { error: "No customers found", status: 404 };
    }
    const customer_id = customer[0].customer_id;

    // Get most recent vehicle_id
    const vehicle = await db.query(
      "SELECT vehicle_id FROM customer_vehicle_info WHERE customer_id = ? ORDER BY vehicle_id DESC LIMIT 1",
      [customer_id]
    );
    if (!vehicle || vehicle.length === 0) {
      return { error: "No vehicles found for this customer", status: 404 };
    }
    const vehicle_id = vehicle[0].vehicle_id;

    // Generate unique hash
    const order_hash = crypto
      .createHash("sha256")
      .update(`${Date.now()}-${employee_id}-${customer_id}-${vehicle_id}`)
      .digest("hex")
      .slice(0, 24);

    // Insert into orders
    const orderResult = await db.query(
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, ?, ?)",
      [employee_id, customer_id, vehicle_id, 1, order_hash]
    );

    if (orderResult.affectedRows === 0) {
      return { error: "Failed to add order", status: 500 };
    }

    const order_id = orderResult.insertId;

    // Insert into order_info
    await db.query(
      "INSERT INTO order_info (order_id, order_total_price, additional_request) VALUES (?, ?, ?)",
      [order_id, order_total_price, additional_request || null]
    );

    const defaultServiceStatus = "Received"; // default for service_completed

    // Insert into order_services with default service_completed = "Received"
    const placeholders = order_services.map(() => "(?, ?, ?,?)").join(", ");

    const values = [];
    order_services.forEach(({ service_id }) => {
      values.push(order_id, service_id, defaultServiceStatus, "Received");
    });

    await db.query(
      `INSERT INTO order_services (order_id, service_id, service_completed,additional_requests_completed) VALUES ${placeholders}`,
      values
    );

    return {
      message: "Order added successfully",
      order_id,
      status: 201,
    };
  } catch (error) {
    console.error("Add Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

async function getOrder() {
  try {
    const result = `
      SELECT 
        o.order_id,
        o.order_date,
        o.active_order,
        o.order_hash,
        oi.order_total_price,
        oi.estimated_completion_date,
        oi.additional_request,
        c.customer_first_name,
        c.customer_last_name,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year
      FROM orders o
      INNER JOIN order_info oi ON o.order_id = oi.order_id
      INNER JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      INNER JOIN customer_info c ON ci.customer_id = c.customer_id
      INNER JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
      ORDER BY o.order_id DESC
    `;

    const rows = await db.query(result);
    return { message: rows, status: 200 };
  } catch (error) {
    console.error("Get Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

// function to get single order
async function singleOrder(order_hash) {
  if (!order_hash) {
    return { error: "Order hash is required", status: 400 };
  }

  try {
    const query = `
SELECT 
  orders.*,
  order_info.*,
  customer_info.*,
  customer_identifier.*,
  customer_vehicle_info.*,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'service_id', common_services.service_id,
      'service_name', common_services.service_name,
      'service_description', common_services.service_description,
      'service_completed', order_services.service_completed,
      'additional_requests_completed', order_services.additional_requests_completed
    )
  ) AS services
FROM orders
INNER JOIN order_info 
  ON orders.order_id = order_info.order_id
LEFT JOIN customer_info 
  ON orders.customer_id = customer_info.customer_id
LEFT JOIN customer_identifier 
  ON orders.customer_id = customer_identifier.customer_id
LEFT JOIN customer_vehicle_info 
  ON orders.customer_id = customer_vehicle_info.customer_id
INNER JOIN order_services 
  ON orders.order_id = order_services.order_id
INNER JOIN common_services
  ON order_services.service_id = common_services.service_id
WHERE orders.order_hash = ?
GROUP BY orders.order_id;
`;

    const rows = await db.query(query, [order_hash]);

    if (!rows || rows.length === 0) {
      return { error: "Order not found", status: 404 };
    }

    const order = rows[0];
    order.services =
      typeof order.services === "string"
        ? JSON.parse(order.services)
        : order.services || [];

    return { message: order, status: 200 };
  } catch (error) {
    console.error("Single Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

// Update order and/or service status
async function updateOrder(
  order_id,
  updatedServices,
  additional_request_status
) {
  if (!order_id) return { error: "Order ID is required", status: 400 };

  if (
    (!Array.isArray(updatedServices) || updatedServices.length === 0) &&
    !additional_request_status
  ) {
    return { error: "No services provided for update", status: 400 };
  }

  try {
    const orderRows = await db.query(
      "SELECT order_id FROM orders WHERE order_id = ?",
      [order_id]
    );
    if (!orderRows || orderRows.length === 0)
      return { error: "Order not found", status: 404 };

    if (Array.isArray(updatedServices) && updatedServices.length > 0) {
      await Promise.all(
        updatedServices.map(
          ({
            service_id,
            service_completed,
            additional_requests_completed,
          }) => {
            return db.query(
              `UPDATE order_services 
           SET service_completed = COALESCE(?, service_completed),
               additional_requests_completed = COALESCE(?, additional_requests_completed)
           WHERE order_id = ? AND service_id = ?`,
              [
                service_completed,
                additional_requests_completed,
                order_id,
                service_id,
              ]
            );
          }
        )
      );
    }

    if (additional_request_status) {
      // Update first service only or a dedicated field
      await db.query(
        `UPDATE order_services 
         SET additional_requests_completed = ?
         WHERE order_id = ?`,
        [additional_request_status, order_id]
      );
    }

    return { message: "Service status updated successfully", status: 200 };
  } catch (error) {
    console.error("Update Service Status Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

async function deleteOrder(orderId) {
  try {
    // 1.delete from order_info table
    await db.query(`DELETE FROM order_info WHERE  order_id = ? `, [orderId]);

    // 2.delete from order_services table
    await db.query(`DELETE FROM order_services WHERE  order_id = ? `, [
      orderId,
    ]);

    // last delete from orders table
    const result = await db.query(`DELETE FROM orders WHERE  order_id = ? `, [
      orderId,
    ]);

    if (result.affectedRows === 0) {
      return { error: "Order not found", status: 404 };
    }

    return { message: "Delete order successfully", status: 200 };
  } catch (error) {
    console.error("delete order Status Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { addOrder, getOrder, singleOrder, updateOrder, deleteOrder };
