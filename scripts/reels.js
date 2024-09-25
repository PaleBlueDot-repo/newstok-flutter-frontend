document.addEventListener("DOMContentLoaded", function () {
    checkAuthentication();
});

let reelStartTime; // Global variable to track when the reel starts
let currentReelId = null; // Track current reel

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
    console.log(localStorage.getItem("name"));
    fetch(`http://localhost:8080/user/getReelsFeed?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            displayReels(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


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
            <div style="color:${reel.reels.font_color}" class="reel-content">
                <h3>${reel.reels.summary}</h3>
            </div>
            <div class="reel-buttons">
                <button class="stop-audio" onclick="toggleAudio('${audioSrc}', this)">🔇</button>
                <button class="like" onclick="likeReel(${reel.reels.reelsId}, this)" style="background-color: ${reel.reels.liked ? 'black' : 'transparent'}">❤️ </button>
                
            </div>
            <div class="reel-bottoms">
                <p style="color:white"><strong>Source:</strong> ${reel.news.newspaperName}</p>
                <p><a href="${reel.news.link}" target="_blank">Read more</a></p>
            </div>
        `;

        reelDiv.addEventListener('mouseenter', () => startTrackingTime(reel.reels.reelsId));
        reelDiv.addEventListener('mouseleave', () => stopTrackingTime(reel.reels.reelsId));

        reelsContainer.appendChild(reelDiv);
    });
}

function startTrackingTime(reelId) {

    if (currentReelId !== reelId) {
        stopTrackingTime(currentReelId); // Stop tracking the previous reel
    }

    currentReelId = reelId;
    reelStartTime = new Date();

    // Set a timeout to automatically stop tracking after 15 seconds
    setTimeout(() => {
        if (currentReelId === reelId) {
            stopTrackingTime(reelId);
        }
    }, 15000); // 15 seconds
}

function stopTrackingTime(reelId) {
    const userId = localStorage.getItem('userid');
    if(userId!=null){

    if (reelStartTime) {
        const timeSpent = (new Date() - reelStartTime) / 1000; // Time in seconds

        // Send the time spent to the backend
        fetch(`http://localhost:8080/user/saveReelTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                reelsId: reelId,
                userId:userId,
                timeSpent: timeSpent
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Time saved:', data);
            })
            .catch(error => {
                console.error('Error saving time:', error);
            });

        reelStartTime = null; // Reset the timer
    }

}
}

function toggleAudio(audioSrc, button) {
    if (window.beeb.src === audioSrc) {
        if (!window.beeb.paused) {
            window.beeb.pause();
            button.innerText = '🔇';
        } else {
            window.beeb.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            button.innerText = '🔊';
        }
    } else {
        window.beeb.src = audioSrc;
        window.beeb.loop = true;
        window.beeb.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        button.innerText = '🔊';
    }
}

function likeReel(reelId, button) {
    const userId = localStorage.getItem('userid');

   if(userId!=null){

    fetch(`http://localhost:8080/user/likeReel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reelsId: reelId,
                              userId:userId
         })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            button.style.backgroundColor = data.liked ? 'red' : 'transparent';
        })
        .catch(error => {
            console.error('Error liking reel:', error);
        });

    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = 'login.html';
}
