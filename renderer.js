const { ipcRenderer } = require('electron');
const videojs = require('video.js');

document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = videojs('videoPlayer', {
        // Video.js options and configurations can be added here
    });

    // Function to open file dialog and select video
    const selectVideo = async () => {
        try {
            const filePath = await ipcRenderer.invoke('open-file-dialog');
            if (filePath) {
                console.log('Selected file path:', filePath); // Debugging log
                videoPlayer.src({ type: 'video/mp4', src: filePath }); // Set the video source
                videoPlayer.load();
                videoPlayer.play(); // Play the video

                // Show the video player and hide the video selection bar
                document.getElementById('videoPlayer').style.display = 'block';
                document.getElementById('videoBar').style.display = 'none';
            } else {
                console.log('No file selected'); // Debugging log
            }
        } catch (error) {
            console.error('Failed to select video:', error); // Debugging log
        }
    };

    // Add event listener to the button
    document.getElementById('selectVideoButton').addEventListener('click', selectVideo);

    // Handle playback control events
    ipcRenderer.on('play', () => {
        videoPlayer.play();
    });

    ipcRenderer.on('pause', () => {
        videoPlayer.pause();
    });

    ipcRenderer.on('seek', (event, time) => {
        videoPlayer.currentTime(time);
    });

    // Other event listeners and functionalities can be added as needed
});
