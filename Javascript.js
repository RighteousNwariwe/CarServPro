Javascript
// Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Form submission handler
document.getElementById('inspectionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const ownerName = document.getElementById('ownerName').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const details = document.getElementById('details').value;
    const needsRepair = document.getElementById('repair').checked;
    const imageFile = document.getElementById('imageFile').files[0];
    const statusMessage = document.getElementById('statusMessage');

    try {
        let imageUrl = "";

        // Upload image if exists
        if (imageFile) {
            const storageRef = storage.ref(`inspectionImages/${imageFile.name}`);
            const snapshot = await storageRef.put(imageFile);
            imageUrl = await snapshot.ref.getDownloadURL();
        }

        // Add new inspection to Firestore
        await db.collection('vehicleInspections').add({
            ownerName: ownerName,
            model: model,
            year: year,
            inspectionDetails: details,
            needsRepair: needsRepair,
            imageUrl: imageUrl,
            inspectionDate: new Date()
        });

        statusMessage.textContent = "Vehicle Inspection added successfully!";
        statusMessage.style.color = "green";
        document.getElementById('inspectionForm').reset();  // Clear the form
    } catch (error) {
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = "red";
    }
});