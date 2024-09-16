document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const name = document.getElementById('register-name').value;
    const password = document.getElementById('register-password').value;

    fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful. Please log in.');
        window.location.href = "login.html"; // Redirect to login
    })
    .catch(error => {
        alert("Registration failed. Please try again.");
        console.error('Error:', error);
    });
});
