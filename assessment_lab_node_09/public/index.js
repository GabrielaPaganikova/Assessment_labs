window.onload = async function () {
  try {
    const response = await fetch("http://localhost:3000/customer");
    const customer = await response.json();

    const customerInfoDiv = document.getElementById("customer-data");
    customerInfoDiv.innerHTML = `
      <p><strong>Customer Name:</strong> ${customer.name}</p>
      <p><strong>Address:</strong> ${customer.address.street}, ${customer.address.number}, ${customer.address.city}, ${customer.address.postalCode}</p>
      <p><strong>Monthly Consumption (January 2023):</strong> ${customer.consumption[0].kWhConsumed} kWh</p>
      <p><strong>Total Cost:</strong> €${customer.consumption[0].totalCost}</p>
      <p><strong>Tariff Type:</strong> ${customer.additionalInfo.tariffType}</p>
    `;
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};
