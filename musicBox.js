document.addEventListener('DOMContentLoaded', function() {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
});

function playSong() {
    const songText = document.getElementById('songInput').value.trim();
    const lines = songText.split('\n');
    let delay = 0; // Initial delay

    for (const line of lines) {
        const notes = line.trim().split(/\s+/); // Assuming space-separated notes
        for (const note of notes) {
            setTimeout(() => playNote(note), delay);
            delay += 500; // Delay between notes, adjust as needed
        }
    }
}

function playNote(note) {
    const noteFile = `https://cse122.github.io/warm_up/notes/${note}.mp3`; // Update with path to your note files
    fetch(noteFile)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play().then(() => URL.revokeObjectURL(url));
        })
        .catch(error => console.error('Error playing note:', note, error));
}
