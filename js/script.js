let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let laps = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1000);
        running = true;
        startStopBtn.innerHTML = "Pause";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    lapsList.innerHTML = "";
}

function lap() {
    if (running) {
        laps++;
        const li = document.createElement("li");
        li.innerText = `Lap ${laps}: ${display.innerHTML}`;
        lapsList.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let seconds = Math.floor((difference / 1000) % 60);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
