// DOCUMENTATION
// =============
// Picture-in-Picture Web API - https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/
// 
// Screen Capture API:- https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
//
 


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
        console.log(err);
    }
}

// EVENT LISTENERS
// ===============
button.addEventListener('click', async () =>{
    // disable button
    button.disabled = true;
    //start Picture in Picture
    await videoEl.requestPictureInPicture();
    // re-enable button
    button.displayed = false;
});


// ON LOAD
// =======
selectMediaStream();