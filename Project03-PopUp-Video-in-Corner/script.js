// DOM ELEMENTS
// ============
const videoEl = document.getElementById('video');
const button = document.getElementById('button');


// GLOBAL VARIABLES
// ================ 

// FUNCTIONS
// =========
async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadedmetadata = ()=>{
            videoEl.play();
        }
    } catch(err){
        // error
    }
}

// ON LOAD
// =======
selectMediaStream();