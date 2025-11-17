const dbConnection = require("../config/db.config");
const crypto = require("crypto");

async function addCustomer(customerData) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
  } = customerData;

  if (
    !customer_first_name ||
    !customer_last_name ||
    !customer_email ||
    !customer_phone_number
  ) {
    return { error: "Please fill all required fields.", status: 400 };
  }

  try {
    // Check if customer already exists
    const existingRows = await dbConnection.query(
      "SELECT * FROM customer_identifier WHERE customer_email = ?",
      [customer_email]
    );

    if (existingRows.length > 0) {
      return { error: "Customer already exists", status: 400 };
    }

    const customer_hash = crypto
      .createHash("sha256")
      .update(`${customer_email}-${Date.now()}`)
      .digest("hex")
      .slice(0, 16);

    //  Insert customer email & phone to get customer_id
    const identifierResult = await dbConnection.query(
      "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)",
      [customer_email, customer_phone_number, customer_hash]
    );

    if (identifierResult.affectedRows !== 1) {
      return { error: "Failed to insert customer identifier", status: 500 };
    }

    const customer_id = identifierResult.insertId;

    // 5. Insert into customer_info
    await dbConnection.query(
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, 1)",
      [customer_id, customer_first_name, customer_last_name]
    );

    return { message: "Customer added successfully", status: 201 };
  } catch (error) {
    console.error("Error adding customer:", error);
    return { error: "Internal server error", status: 500 };
  }
}

module.exports = { addCustomer };
