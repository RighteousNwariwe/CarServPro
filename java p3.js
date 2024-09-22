// Firebase configuration and initialization
const firebaseConfig = {
    // Add your Firebase configuration here
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to add part to inventory
document.getElementById('addPartBtn').addEventListener('click', () => {
    const partName = document.getElementById('partName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const category = document.getElementById('category').value;

    if (partName && quantity && category) {
        db.collection('inventory').add({
            partName,
            quantity,
            category
        }).then(() => {
            alert('Part added successfully');
            document.getElementById('partName').value = '';
            document.getElementById('quantity').value = '';
        }).catch(err => console.error('Error adding part:', err));
    } else {
        alert('Please fill out all fields');
    }
});

// Function to render inventory
function renderInventory(doc) {
    const tableBody = document.querySelector('#inventoryTable tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', doc.id);

    row.innerHTML = `
        <td>${doc.data().partName}</td>
        <td>${doc.data().quantity}</td>
        <td>${doc.data().category}</td>
        <td>
            <button onclick="deletePart('${doc.id}')">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Function to get and display inventory
db.collection('inventory').onSnapshot(snapshot => {
    const tableBody = document.querySelector('#inventoryTable tbody');
    tableBody.innerHTML = ''; // Clear the table before re-rendering
    snapshot.forEach(doc => renderInventory(doc));
});

// Function to delete part from inventory
function deletePart(id) {
    db.collection('inventory').doc(id).delete()
    .then(() => alert('Part deleted successfully'))
    .catch(err => console.error('Error deleting part:', err));
}
