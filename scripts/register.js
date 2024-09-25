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
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("userid", data.user.userId);
        localStorage.setItem("name", data.user.name);
        alert('Registration successful. Please log in.');

        window.location.href = "profile.html"; // Redirect to login
    })
    .catch(error => {
        alert("Registration failed. Please try again.");
        console.error('Error:', error);
    });
});
