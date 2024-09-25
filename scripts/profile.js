document.addEventListener("DOMContentLoaded", function() {
    fetchUserProfile();
    document.getElementById('profile-form').addEventListener('submit', updateUserProfile);
    
    const interestsSelect = document.getElementById('interests');
    interestsSelect.addEventListener('change', restrictInterestSelection);
});

function fetchUserProfile() {
    const name = localStorage.getItem('name');
    const interests = localStorage.getItem('interests'); // Interests are expected as a comma-separated string in localStorage
    console.log("line 12", name);
    console.log(name);
    // Set the name in the input field
    if (name) {
        document.getElementById('name').value = name;
    }

    // Set the selected interests
    if (interests) {
        setSelectedInterests(interests.split(',')); // Convert the comma-separated string to an array
    }
}


function setSelectedInterests(interests) {
    const interestsSelect = document.getElementById('interests');
    Array.from(interestsSelect.options).forEach(option => {
        if (interests.includes(option.value)) {
            option.selected = true;
        }
    });
}

function updateUserProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const interests = Array.from(document.getElementById('interests').selectedOptions).map(option => option.value);
    console.log(interests);
    
    if (interests.length > 3) {
        alert('You can only select up to 3 interests.');
        return;
    }

    const email = localStorage.getItem('email');

    fetch(`http://localhost:8080/user/addInterst`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({email, interests })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("interests",interests);
        alert('Profile updated successfully!');
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
}

function restrictInterestSelection() {
    const selectedInterests = Array.from(document.getElementById('interests').selectedOptions);
    
    if (selectedInterests.length > 3) {
        selectedInterests[selectedInterests.length - 1].selected = false; // Deselect the last selected option
        alert('You can only select up to 3 interests.');
    }
}

function goBack() {
    window.location.href = 'index.html';
}
