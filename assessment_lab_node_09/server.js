const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

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

app.use(express.static("public"));
app.use(express.json());

// API to get customer data
app.get("/customer", (req, res) => {
  res.json(customerData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
