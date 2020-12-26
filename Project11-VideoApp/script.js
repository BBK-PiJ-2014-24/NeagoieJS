// DOM ELEMENTS
// ============
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// GLOBAL VARIABLES
// ================
let lastVolume = 1; //remember volume level after mute
let fullscreen = false;


// FUNCTIONS
// =========


// Play & Pause ----------------------------------- //
function togglePlay(){
if(video.paused){
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', "pause");
} else {
    video.pause();
    showPlayIcon();
}
}

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', "play");
}

// Progress Bar ---------------------------------- //
function updateProgress(){
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /` ;
    duration.textContent = `${displayTime(video.duration)}`;
}

function displayTime(time){
    const mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60 );
    secs = (secs < 10) ? `0${secs}` : secs;
    return `${mins}:${secs}`;
}

function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime*100}%`
    video.currentTime = newTime*video.duration;
}


// Volume Controls --------------------------- //
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // ensure tolerance for full and zero volume settings
    if (volume < 0.1) { 
        volume = 0;
    }

    if(volume >0.9){
        volume = 1.0;
}

    volumeBar.style.width = `${volume *100}%`
    video.volume = volume;
    // Change icons with volume settings
    volumeIcon.className = '';
    if(volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else  {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = volume;

}

function toggleMute(){
volumeIcon.className = '';
    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute')
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume*100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute')
    }
}


// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value; // speed is the tag for the options
}


// Fullscreen ------------------------------- //

function toggleFullscreen(){
    !fullscreen ? openFullscreen(player) : closeFullscreen(player);

    fullscreen = !fullscreen;
}


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen(elem) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}



// EVENT LISTENERS
// ===============
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);

volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);

speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);

// ON LOAD
// =======
