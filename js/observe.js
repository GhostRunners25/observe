import { initialise, renderAllChunks } from './world.js';

function observe() {
    const canvas = document.getElementById('main');
    const fps = document.getElementById('fps');
    const ms = document.getElementById('ms-per-frame-num');
    const updateBtn = document.getElementById('update-btn');
    const display = canvas.getContext('2d');

    const chunkSize = { base: 16, height: 64 }
    let interval;

    updateBtn.onclick = updateInterval;

    function update() {

    }

    function updateInterval() {
        ms.value = Math.round(ms.value);
        clearInterval(interval);
        interval = setInterval(update, ms.value);
    }

    function play() {
        interval = setInterval(update, ms.value);
    }

    initialise(display, chunkSize, 4);
    renderAllChunks();
    play();
    console.log('rendered');
}

window.addEventListener('load', observe);