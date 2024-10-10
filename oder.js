// If the form is valid, store the total amount in localStorage and redirect
if (isValid) {
    var totalAmount = document.getElementById('stotal').innerText; // Get the total from the span
    localStorage.setItem('checkoutTotal', totalAmount); // Store it in localStorage
    
    // Redirect to order.html
    window.location.href = 'order.html'; // Redirect directly to order.html
}
