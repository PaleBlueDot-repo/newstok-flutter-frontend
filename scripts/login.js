document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        window.location.href = "index.html"; // Redirect to the reels page
    })
    .catch(error => {
        alert("Login failed. Please try again.");
        console.error('Error:', error);
    });
});
