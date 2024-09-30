// Import the functions from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const partNameInput = document.getElementById('partName');
const quantityInput = document.getElementById('quantity');
const categoryInput = document.getElementById('category');
const addPartBtn = document.getElementById('addPartBtn');
const updatePartBtn = document.getElementById('updatePartBtn');
const inventoryTableBody = document.querySelector('#inventoryTable tbody');

let currentPartId = null; // To track which part is being updated

// Function to add a new part
addPartBtn.addEventListener('click', async () => {
    const partName = partNameInput.value;
    const quantity = parseInt(quantityInput.value);
    const category = categoryInput.value;

    if (partName && quantity && category) {
        await addDoc(collection(db, 'inventory'), {
            partName,
            quantity,
            category
        });
        clearForm();
    } else {
        alert('Please fill out all fields');
    }
});

// Function to render inventory items in the table
function renderInventory(doc) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', doc.id);

    row.innerHTML = `
        <td>${doc.data().partName}</td>
        <td>${doc.data().quantity}</td>
        <td>${doc.data().category}</td>
        <td>
            <button class="editBtn" data-id="${doc.id}">Edit</button>
            <button class="deleteBtn" data-id="${doc.id}">Delete</button>
        </td>
    `;
    inventoryTableBody.appendChild(row);

    // Attach event listeners to the edit and delete buttons
    row.querySelector('.editBtn').addEventListener('click', () => loadPart(doc));
    row.querySelector('.deleteBtn').addEventListener('click', () => deletePart(doc.id));
}

// Function to get and display inventory in real-time
onSnapshot(collection(db, 'inventory'), (snapshot) => {
    inventoryTableBody.innerHTML = ''; // Clear table before rendering new data
    snapshot.forEach((doc) => renderInventory(doc));
});

// Function to delete a part from Firestore
async function deletePart(id) {
    await deleteDoc(doc(db, 'inventory', id));
}

// Function to load a part's data into the form for editing
function loadPart(doc) {
    currentPartId = doc.id;
    partNameInput.value = doc.data().partName;
    quantityInput.value = doc.data().quantity;
    categoryInput.value = doc.data().category;

    addPartBtn.style.display = 'none';
    updatePartBtn.style.display = 'inline';
}

// Function to update the part in Firestore
updatePartBtn.addEventListener('click', async () => {
    if (currentPartId) {
        const partRef = doc(db, 'inventory', currentPartId);

        await updateDoc(partRef, {
            partName: partNameInput.value,
            quantity: parseInt(quantityInput.value),
            category: categoryInput.value
        });

        clearForm();
    }
});

// Function to clear the form and reset buttons
function clearForm() {
    partNameInput.value = '';
    quantityInput.value = '';
    categoryInput.value = '';
    addPartBtn.style.display = 'inline';
    updatePartBtn.style.display = 'none';
    currentPartId = null;
}
