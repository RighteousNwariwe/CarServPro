<script type="text/javascript">
    // Function to validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to validate password strength
    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{14,}$/;
        return regex.test(password);
    }

    // Handle form submission
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('form-signup');

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Get input values
            const email = form.email.value.trim();
            const password = form.password.value.trim();
            const fullname = form.fullname.value.trim();

            // Validate email
            if (!isValidEmail(email)) {
                document.getElementById('warn-invalid-email').classList.remove('hide');
                return;
            } else {
                document.getElementById('warn-invalid-email').classList.add('hide');
            }

            // Validate password
            if (!isValidPassword(password)) {
                document.getElementById('warn-insuff').classList.remove('hide');
                return;
            } else {
                document.getElementById('warn-insuff').classList.add('hide');
            }

            // If validation passes, submit the form (or perform AJAX submission)
            // Uncomment the next line to allow actual form submission
            // form.submit();

            // For demonstration, we'll just show a success message
            alert(`Account created successfully for ${fullname} with email ${email}`);
        });
    });
</script>
