


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


/////////// Carousels Slide /////////////
const carousel = [...$$(".carousel img")];

console.log(carousel);

var carouselImgIndex = 0;

const changeCarouse = function(){
    carousel[carouselImgIndex].classList.toggle("active");
    if(carouselImgIndex >= carousel.length - 1 )
        carouselImgIndex = 0;
    else
        carouselImgIndex++;  
    carousel[carouselImgIndex].classList.toggle("active");
}
setInterval(()=>{
    changeCarouse();
}, 3000);



///////// Navigation//////////////

//////// music player section //////////////


const musicPlayerSection = $(".music-player-section");

let countClick = 1;

musicPlayerSection.addEventListener('click', function(){
    if(countClick >= 2){
        musicPlayerSection.classList.add("active");
        countClick = 0;
        return;
    }
    countClick++;
    setTimeout(function(){
        countClick = 1;
    }, 300)
})

/////////////// back to the music BASE //////////////

const backToHomeBtn = $(".music-player-section .back-btn");

backToHomeBtn.addEventListener('click', function(){
    musicPlayerSection.classList.remove("active");
})


///////////access playlist //////

const playlistSection = $(".playlist");

const navBtnPlaylist = $(".music-player-section .nav-btn");

navBtnPlaylist.addEventListener("click", function(){
    playlistSection.classList.add("active")
})

///// back to the music player

const backToMusicPlayer = $(".playlist .back-btn");

backToMusicPlayer.addEventListener("click", function(){
    playlistSection.classList.remove("active");
})

////////// MUSIC CURRENT PLAYED ///////////////

var currentMusic = 0;

const music = $("#audio-source");
const seekBar = $(".music-seek-bar");
const songName = $(".current-song-name");
const artistName = $(".artist-name");
const coverImage = $(".cover");
const currentMusicTime = $(".current-time");
const durationMusicTime = $(".duration");

const queue = [...$$(".queue")];

const queneName = [...$$(".queue .name")];


for(var i = 0; i < queneName.length; i++){
    queneName[i].innerHTML = songs[i].name;
}

//// Select all buttons here

const forwardBtn = $("i.fa-forward"); 
const backwardBtn = $("i.fa-backward"); 
const playBtn = $("i.fa-play"); 
const pauseBtn = $("i.fa-pause"); 
const repeatBtn = $("span.fa-redo"); 
const volumeBtn = $("span.fa-volume-up"); 
const volumeSlider = $(".volume-slider")

///// Button click //////////
// play click
playBtn.addEventListener("click", function(){
    music.play();
    playBtn.classList.remove("active");
    pauseBtn.classList.add("active");
})
// pause click
pauseBtn.addEventListener("click", function(){
    music.pause();
    pauseBtn.classList.remove("active");
    playBtn.classList.add("active");
})


////// Setup music playing....

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];

    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        durationMusicTime.innerHTML = formatTime(music.duration);
    }, 300);

    currentMusic.innerHTML = "00 : 00";

    queue.forEach(item => item.classList.remove("active"));
    queue[currentMusic].classList.add("active");
}

setMusic(2);


///// Format duration in 00:00

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60)
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}


////// Seek Event /////

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes("active")){
            setMusic(currentMusic);
            playBtn.click();
        }else {
            forwardBtn.click();
        }
    }
}, 500)


seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value
})

////// Forward, Backward button

forwardBtn.addEventListener("click", () => {
    if(currentMusic >= songs.length - 1)
        currentMusic = 0;
    else
        currentMusic++;

    setMusic(currentMusic);
    playBtn.click();
})

backwardBtn.addEventListener("click", () => {
    if(currentMusic <= 0)
        currentMusic = song.length - 1;
    else
        currentMusic--;

    setMusic(currentMusic);
    playBtn.click();
})

//////// Repeat Button

repeatBtn.addEventListener("click", () => {
    repeatBtn.classList.toggle("active");
})

///////// Volume Button

volumeBtn.addEventListener("click", () => {
    volumeBtn.classList.toggle("active");
    volumeSlider.classList.toggle("active");
})

volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener("click", () => {
        setMusic(i);
        playBtn.click();
    })
})

