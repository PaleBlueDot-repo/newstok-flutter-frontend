document.addEventListener("DOMContentLoaded", function() {
    checkAuthentication();
});

function checkAuthentication() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    } else {
        fetchReelsFeed(email);
    }
}

function fetchReelsFeed(email) {
    fetch(`http://localhost:8080/user/getReelsFeed?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayReels(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayReels(reels) {
    const reelsContainer = document.getElementById('reels-container');
    reelsContainer.innerHTML = '';

    reels.forEach(reel => {
        const reelDiv = document.createElement('div');
        reelDiv.classList.add('reel');
        reelDiv.style.backgroundImage = `url('data:image/png;base64,${reel.reels.image}')`;

        const reelButtons = `
            <div class="reel-buttons">
                <button class="like" onclick="likeReel(${reel.reels.reelsId})">❤️</button>
                <button class="stop-audio" onclick="stopAudio()">🔇</button>
                <button class="share" onclick="shareReel()">🔗</button>
            </div>
        `;

        reelDiv.innerHTML = `
            ${reelButtons}
            <div>
                <h3>${reel.reels.title}</h3>
                <p>${reel.reels.summary}</p>
            </div>
        `;
        reelsContainer.appendChild(reelDiv);
    });
}

function likeReel(reelsId) {
    // Implement like functionality
    console.log(`Liked reel with ID: ${reelsId}`);
}

function stopAudio() {
    // Implement stop audio functionality
    console.log('Stopping audio');
}

function shareReel() {
    // Implement share functionality
    console.log('Sharing reel');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = 'login.html';
}
