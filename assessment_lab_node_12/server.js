const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const secretKey = "ubi";

const customerData = {
  customerId: "12345",
  name: "João Silva",
  address: {
    street: "Example Street",
    number: "42",
    city: "Lisbon",
    postalCode: "1234-567",
  },
  consumption: [
    {
      month: "January",
      year: 2023,
      kWhConsumed: 250,
      totalCost: 35.5,
      readingDate: "2023-01-31",
    },
  ],
  additionalInfo: {
    tariffType: "Residential",
    energySupplier: "Company XYZ",
    activeContract: true,
  },
};

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

app.get("/customer", verifyToken, (req, res) => {
  res.json(customerData);
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}!` });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@test.com" && password === "test123") {
    const user = {
      id: 1,
      name: "Test User",
      email: "test@test.com",
    };

    const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
