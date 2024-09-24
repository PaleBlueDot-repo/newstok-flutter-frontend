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



// Create a global Audio object
// Create a global Audio object
window.beeb = new Audio();

function displayReels(reels) {
    const reelsContainer = document.getElementById('reels-container');
    reelsContainer.innerHTML = '';

    reels.forEach(reel => {
        const reelDiv = document.createElement('div');
        reelDiv.classList.add('reel');
        reelDiv.style.backgroundImage = `url('data:image/png;base64,${reel.reels.image}')`;
        const audioSrc = `data:audio/mp3;base64,${reel.reels.music}`;


        reelDiv.innerHTML = `

         <div class="reel-upper">
             <h3>${reel.reels.title}</h3>
        </div>

         <div class="reel-content">
         <h3>${reel.reels.summary}</h3>
    </div>


          <div class="reel-buttons">
                <button class="stop-audio" onclick="toggleAudio('${audioSrc}', this)">🔇</button>
                <button class="like" onclick="likeReel(${reel.reels.reelsId})">❤️ </button>
                <label class="count">100 </label>
            </div>
            
            <div class="reel-bottoms">
                <p><strong>Source:</strong> ${reel.news.newspaperName}</p>
              <p ><a href="${reel.news.link}" target="_blank">Read more</a></p>
            </div>
        `;


        reelsContainer.appendChild(reelDiv);
    });
}

function toggleAudio(audioSrc, button) {
    // If the current audio source is the same, toggle play/pause
    if (window.beeb.src === audioSrc) {
        if (!window.beeb.paused) {
            window.beeb.pause();
            button.innerText = '🔇'; // Change icon to indicate audio is paused
        } else {
            window.beeb.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            button.innerText = '🔊'; // Change icon to indicate audio is playing
        }
    } else {
        // Set new source, enable looping, and play
        window.beeb.src = audioSrc;
        window.beeb.loop = true; // Enable looping
        window.beeb.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        button.innerText = '🔊'; // Change icon to indicate audio is playing
    }
}


function likeReel(reelsId) {
    // Implement like functionality
    console.log(`Liked reel with ID: ${reelsId}`);
    // Optionally, update the like count here if you have the logic
}

function readMore(reelsId) {
    // Implement read more functionality
    console.log(`Read more for reel with ID: ${reelsId}`);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = 'login.html';
}
