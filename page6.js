// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get maintenance suggestions
function getMaintenanceSuggestions(make, model, mileage) {
    let suggestions = [];

    if (mileage < 50000) {
        suggestions.push("Oil change required.");
        suggestions.push("Tire rotation recommended.");
    } else if (mileage < 100000) {
        suggestions.push("Inspect brake pads.");
        suggestions.push("Replace air filter.");
    } else {
        suggestions.push("Timing belt replacement.");
        suggestions.push("Transmission fluid change.");
    }

    // Custom suggestion for specific makes and models
    if (make === "Toyota" && model === "Corolla") {
        suggestions.push("Inspect oxygen sensor.");
    } else if (make === "Honda" && model === "Civic") {
        suggestions.push("Check spark plugs.");
    } else if (make === "Ford" && model === "F-150") {
        suggestions.push("Inspect suspension components.");
    } else if (make === "BMW" && model === "3 Series") {
        suggestions.push("Check coolant system.");
    } else if (make === "Audi" && model === "A4") {
        suggestions.push("Check turbocharger system.");
    } else if (make === "Mercedes-Benz" && model === "C-Class") {
        suggestions.push("Inspect timing chain.");
    } else if (make === "Nissan" && model === "Altima") {
        suggestions.push("Inspect CVT transmission.");
    } else if (make === "Chevrolet" && model === "Silverado") {
        suggestions.push("Check fuel injectors.");
    } else if (make === "Hyundai" && model === "Elantra") {
        suggestions.push("Check brake fluid.");
    } else if (make === "Volkswagen" && model === "Golf") {
        suggestions.push("Check DSG transmission.");
    } else if (make === "Subaru" && model === "Impreza") {
        suggestions.push("Inspect head gaskets.");
    }

    return suggestions;
}

// Function to handle form submission and save data to Firebase
async function handleSubmit(event) {
    event.preventDefault();

    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const mileage = parseInt(document.getElementById('mileage').value);

    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = "";  // Clear previous suggestions

    if (!isNaN(mileage)) {
        const suggestions = getMaintenanceSuggestions(make, model, mileage);
        document.getElementById('suggestionsLabel').textContent = `Maintenance Suggestions for ${make} ${model} with ${mileage} km:`;

        // Display suggestions
        suggestions.forEach(suggestion => {
            const listItem = document.createElement('li');
            listItem.textContent = suggestion;
            suggestionsList.appendChild(listItem);
        });

        // Save data to Firebase
        try {
            await db.collection('carMaintenance').add({
                make: make,
                model: model,
                mileage: mileage,
                suggestions: suggestions,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Car details saved successfully!');
        } catch (error) {
            console.error('Error saving car details:', error);
        }
    } else {
        document.getElementById('suggestionsLabel').textContent = "Please enter a valid mileage.";
    }
}

// Add event listener to the form
document.getElementById('carForm').addEventListener('submit', handleSubmit);
