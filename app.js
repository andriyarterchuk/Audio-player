const songs = [{
    title: "Everyday i'm shuffling",
    author: "LMFAO",
    src: "LMFAO_-_Everyday i'm shuffling.mp3",
    img: "http://media.vintagecotton.com/shirt/372/Shufflin_T-Shirt1.jpg"
}, {
    title: "Sorry for party rocking",
    author: "LMFAO",
    src: "lmfao_-_sorry_for_party_rocking_zaycev_net.mp3",
    img: "https://images-na.ssl-images-amazon.com/images/I/71guj33uOUL._SY355_.jpg"
}, {
    title: "Party Rock Anthem",
    author: "LMFAO",
    src: "LMFAO_-_Party Rock Anthem (feat. Lauren Bennett & GoonRock).mp3",
    img: "http://www.dafont.com/forum/attach/orig/6/8/68204.png"
}, {
    title: "Rock Star",
    author: "Chamillionaire",
    src: "chamillionaire_-_07_rock_star_featuring_lil_wayne_zaycev_net.mp3",
    img: "https://assets.audiomack.com/lilwaynehq/aff1ea6c8ca6feacb102fd0c2096deca-275-275.jpeg"
}, {
    title: "La La La",
    author: "LMFAO",
    src: "LMFAO_-_La La La.mp3",
    img: "https://upload.wikimedia.org/wikipedia/en/0/09/Lmfao-la-la-la3.jpg"
}];
let playing = true;
let song = document.getElementById("myAudio");
let pauseButton = document.getElementById("pauseButton");
let currentSong = 0;
let goToSong = (current) => {
    currentSong = (current + songs.length) % songs.length;
    document.getElementById("mp3_src").src = songs[currentSong].src;
    document.getElementById("title").innerHTML = songs[currentSong].title;
    document.getElementById("poster").src = songs[currentSong].img;
    document.getElementById("author").innerHTML = songs[currentSong].author;
    song.load();
    playSong();
};

let previousSong = () => {
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove("active");
    goToSong(currentSong - 1);
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
};

let nextSong = () => {
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove("active");
    goToSong(currentSong + 1);
    document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
};

let pause = () => {
    playing ? pauseSong() : playSong();
};

let pauseSong = () => {
    pauseButton.innerHTML = "&#61;";
    playing = false;
    song.pause();
};

let playSong = () => {
    pauseButton.innerHTML = '&rtrif;';
    playing = true;
    song.play();
};

let changeVolume = () => {
    song.volume = document.getElementById("volume").value / 100;
};

let changeCurrentTime = () => {
    song.currentTime = document.getElementById("currentTime").value * song.duration / 100;
};


let duration = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
};

let showPlaylist = () => {
    let text = '<h1>List of songs:</h1>';
    let playlist = document.getElementById("playlist");
    songs.forEach(function(item, pos) {
        text += `<div class="song" data-pos=${pos}><h2>${item.title}-${item.author}</h2></div>`;

    });
    playlist.innerHTML = text;
};

let updateTime = () => {
    document.getElementById("Time").innerHTML = duration(song.currentTime);
    document.getElementById("currentTime").value = song.currentTime / song.duration * 100;
};

showPlaylist();
document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add("active");
setInterval(updateTime, 1000);
