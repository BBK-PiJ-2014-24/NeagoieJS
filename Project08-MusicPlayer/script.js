// DOM ELEMENTS
// ============
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// GLOBAL VARIABLES
// ================
let isPlaying =false;
let songIndex = 0;


const songs = [
    {
        name:'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
    
];

// FUNCTIONS
// =========
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    console.log('play');
    music.play();
}

function pauseSong(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    isPlaying = false;
    console.log('pause');
    music.pause();
}

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function prevSong(){
    songIndex--;
    songIndex = songIndex < 0 ?  songs.length -1:  songIndex;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    songIndex = songIndex > songs.length-1 ? 0 : songIndex; 
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime } = e.srcElement
        // Progress Bar
        const progressPercent = currentTime/duration *100;
        progress.style.width = `${progressPercent}%`;
        // Music Song Length
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
        // check if calculations are done before displaying
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Music Playtime
        const playTimeMins = Math.floor(currentTime/60);
        let  playTimeSecs = Math.floor(currentTime % 60);
        playTimeSecs = playTimeSecs < 10 ? `0${playTimeSecs}` : playTimeSecs;
        if(playTimeSecs){
            currentTimeEl.textContent = `${playTimeMins}:${playTimeSecs}`;
        }
    }

}

function setProgressBar(e){
    const width = this.clientWidth; //length of bar
    const clickX = e.offsetX; // location of click on bar
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}



// EVENT LISTENERS
// ===============
play.addEventListener('click', ()=>{
    isPlaying ? pauseSong() : playSong(); 
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar); //updates progress bar with song 
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
// ON LOAD
// =======
loadSong(songs[songIndex]);