document.addEventListener('DOMContentLoaded', function() {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
});

var activeAudioElements = [];
var scheduledTimeouts = [];

function playSong() {
    stopPlaying();

    const songText = document.getElementById('songInput').value.trim();
    const lines = songText.split('\n');
    let delay = 0; // initial delay

    for (const line of lines) {
        const notes = line.trim().split(/\s+/); // assuming space-separated notes
        for (const note of notes) {
            const timeoutId = setTimeout(() => playNote(note), delay);
            scheduledTimeouts.push(timeoutId);
            delay += 350; // our delay between notes
        }
    }
}

function playNote(note) {
    const noteFile = `https://cse122.github.io/warm_up/notes/${note}.mp3`;
    fetch(noteFile)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            activeAudioElements.push(audio);
            audio.play().then(() => {
                activeAudioElements = activeAudioElements.filter(el => el !== audio);
                URL.revokeObjectURL(url);
            });
        })
        .catch(error => console.error('Error playing note:', note, error));
}

function stopPlaying() {
    activeAudioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    activeAudioElements = [];

    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];
}
