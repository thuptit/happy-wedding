if (ttt === undefined) {
    var ttt = {
        mode: 'live'
    }
}
var audioPlayer = document.createElement("AUDIO");
audioPlayer.style.display = "none";

setTimeout(function(){
    if (audioPlayer.canPlayType("audio/mpeg")) {
        audioPlayer.setAttribute("src", document.getElementById('ttt-music').value);
        document.getElementsByClassName("bii-player")[0].style.display = "block";
    }
    audioPlayer.volume = 0.3;
    audioPlayer.setAttribute("controls", "controls");
    document.body.appendChild(audioPlayer);
}, 1000);

var myInterval = setInterval(function(){
    if(document.querySelector(".bii-player")){
        setTimeout(function(){
            document.getElementsByClassName("bii-player")[0].classList.add("show-sec");
        },2000);
        setTimeout(function(){
            document.getElementsByClassName("bii-player")[0].classList.remove("show-sec");
        },7000);
        clearInterval(myInterval);
    }
}, 200);
function playPause() {
    document.getElementsByClassName("bii-player")[0].classList.remove("show-sec");
    if (audioPlayer.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}
function playAudio(){
    console.log("helo")
    audioPlayer.play();
    document.getElementById("playerVolumeOff").style.display = "none";
    document.getElementById("playerVolumeOn").style.display = "block";
}
function pauseAudio(){
    audioPlayer.pause();
    document.getElementById("playerVolumeOff").style.display = "block";
    document.getElementById("playerVolumeOn").style.display = "none";
}
var sendajax = function(form) {
    var inputs = form.getElementsByTagName('input');
    var textareas = form.getElementsByTagName('textarea');
    var dataJson = [];
    for (let i=0; i<inputs.length; i++) {
        if (inputs[i].getAttribute('name') !== null) {
            dataJson[inputs[i].getAttribute('name')] = inputs[i].value;
        }
    }
    for (let i=0; i<textareas.length; i++) {
        if (textareas[i].getAttribute('name') !== null) {
            dataJson[textareas[i].getAttribute('name')] = textareas[i].value;
        }
    }
    jQuery.ajax({
        url: '/form/wish/send',
        beforeSend: function(request) {
            request.setRequestHeader("X-CSRF-TOKEN", document.querySelector('meta[name="csrf-token"]').content);
        },
        type: 'POST',
        dataType: 'json',
        data: {...dataJson}
    }).done(function(response) {
        console.log(response)
        if (response.success) {
            document.getElementsByClassName('form-submit-alert')[0].setAttribute("style", "display: block");
            document.getElementsByClassName('form-submit-success')[0].setAttribute("style", "display: block");
            document.getElementsByClassName('form-submit-error')[0].setAttribute("style", "display: none");
        }
    }).error(function (xhr, status, error) {
        var err = eval("(" + xhr.responseText + ")");
        document.getElementsByClassName('form-submit-alert')[0].setAttribute("style", "display: block");
        document.getElementsByClassName('form-submit-error')[0].setAttribute("style", "display: block");
        document.getElementsByClassName('form-submit-success')[0].setAttribute("style", "none: block");
    })
}

window.onload = function() {
    var wishForm = document.getElementsByClassName('wish-form');
    for (var i = 0; i < wishForm.length; i++) {
        wishForm[i].addEventListener('submit', (event) => {
            event.preventDefault();
            sendajax(event.currentTarget);
        });
    }
}