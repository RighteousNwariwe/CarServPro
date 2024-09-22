// JavaScript to manage customer records

document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const vehicle = document.getElementById("vehicle").value;
    const service = document.getElementById("service").value;
    
    if (name && email && vehicle && service) {
        addRecord(name, email, vehicle, service);
        document.getElementById("customerForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});

function addRecord(name, email, vehicle, service) {
    const table = document.getElementById("recordsTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow(table.rows.length);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.textContent = name;
    cell2.textContent = email;
    cell3.textContent = vehicle;
    cell4.textContent = service;
}
