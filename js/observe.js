import { initialise } from './world.js';

function observe() {
    const canvas = document.getElementById('main');
    const ms = document.getElementById('ms-per-frame-num');
    const updateBtn = document.getElementById('update-btn');
    const display = canvas.getContext('2d');

    const chunkSize = { base: 16, height: 64 }
    let interval;

    updateBtn.onclick = function () {
        updateInterval();
    }

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

    display.fillStyle = 'white';
    display.fillRect(0, 0, 512, 512);
    initialise(display, chunkSize, 4);
    play();
}

window.addEventListener('load', observe);