import React, { useEffect, useState } from "react";

function Customer() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => { fetch("/api/customers").then(res => res.json())
                  .then(customers => setCustomers(customers))});
  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => <li key={customer.id}>{customer.fname}</li>)}
      </ul>
    </div>
  );
}

export default Customer;
