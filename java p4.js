// Firebase configuration and initialization
const firebaseConfig = {
    // Add your Firebase configuration here
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to submit repair request
document.getElementById('submitRequestBtn').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value;
    const carModel = document.getElementById('carModel').value;
    const problemDescription = document.getElementById('problemDescription').value;

    if (customerName && carModel && problemDescription) {
        db.collection('requests').add({
            customerName,
            carModel,
            problemDescription,
            status: 'Pending'
        }).then(() => {
            alert('Request submitted successfully');
            document.getElementById('customerName').value = '';
            document.getElementById('carModel').value = '';
            document.getElementById('problemDescription').value = '';
        }).catch(err => console.error('Error submitting request:', err));
    } else {
        alert('Please fill out all fields');
    }
});

// Function to add service quote
document.getElementById('addQuoteBtn').addEventListener('click', () => {
    const requestId = document.getElementById('requestId').value;
    const quoteAmount = parseFloat(document.getElementById('quoteAmount').value);
    const priority = document.getElementById('priority').value;

    if (requestId && quoteAmount && priority) {
        db.collection('quotes').add({
            requestId,
            quoteAmount,
            priority
        }).then(() => {
            alert('Quote added successfully');
            document.getElementById('requestId').value = '';
            document.getElementById('quoteAmount').value = '';
        }).catch(err => console.error('Error adding quote:', err));
    } else {
        alert('Please fill out all fields');
    }
});

// Function to render requests
function renderRequests(doc) {
    const tableBody = document.querySelector('#requestsTable tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', doc.id);

    row.innerHTML = `
        <td>${doc.id}</td>
        <td>${doc.data().customerName}</td>
        <td>${doc.data().carModel}</td>
        <td>${doc.data().problemDescription}</td>
        <td>${doc.data().status}</td>
        <td>
            <button onclick="markAsComplete('${doc.id}')">Mark as Complete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Function to get and display requests
db.collection('requests').onSnapshot(snapshot => {
    const tableBody = document.querySelector('#requestsTable tbody');
    tableBody.innerHTML = ''; // Clear the table before re-rendering
    snapshot.forEach(doc => renderRequests(doc));
});

// Function to mark request as complete
function markAsComplete(id) {
    db.collection('requests').doc(id).update({
        status: 'Completed'
    }).then(() => alert('Request marked as complete'))
    .catch(err => console.error('Error updating status:', err));
}

// Function to render quotes
function renderQuotes(doc) {
    const tableBody = document.querySelector('#quotesTable tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', doc.id);

    row.innerHTML = `
        <td>${doc.data().requestId}</td>
        <td>${doc.data().quoteAmount}</td>
        <td>${doc.data().priority}</td>
        <td>
            <button onclick="deleteQuote('${doc.id}')">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Function to get and display quotes
db.collection('quotes').onSnapshot(snapshot => {
    const tableBody = document.querySelector('#quotesTable tbody');
    tableBody.innerHTML = ''; // Clear the table before re-rendering
    snapshot.forEach(doc => renderQuotes(doc));
});

// Function to delete quote
function deleteQuote(id) {
    db.collection
