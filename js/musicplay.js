$("#wrapper").find(".music_bg").css("background-image","url("+temp2.al.picUrl+")");
$("#wrapper").find(".music_song").html(temp2.name);
$("#wrapper").find(".music_artist").html(temp2.ar[0].name);

var player=$("#audio").get(0);
$(".detail_back").click(function(){
    loadhtml('detail');
    $("#global").show();
});
var originX= 0;
var duration1;
var currentTime1;
var interval=0;
var processBtnState=0;
$("#audio").on("canplay",function(){
    initProcessBtn($('#processBtn'));
    setInterval1();
});


setInterval1 = function () {
    if (!interval) {
        updateProcess();
        interval = setInterval(updateProcess, 1000);
    }
};

clearInterval = function () {
    if (interval) {
        clearInterval(interval);
    }

};



updateProcess = function () {
    var buffer = player.buffered,
        bufferTime = buffer.length > 0 ? buffer.end(buffer.length - 1) : 0,
        duration1 = player.duration,
        currentTime1 = player.currentTime;
    $('#totalTime').text(validateTime(duration1 / 60) + ":" + validateTime(duration1 % 60));
    $('#process .rdy').width(bufferTime / duration1 * 100 + '%');
    if (!processBtnState) {
        $('#process .cur').width(currentTime1 / duration1 * 100 + '%');
        $("#currentTime").text(validateTime(currentTime1 / 60) + ":" + validateTime(currentTime1 % 60));
    }
    // if(player.currentTime==player.duration){
    //     clearInterval(timer)
    // }
};
// var timer=setInterval(updateProcess, 1000);


initProcessBtn = function ($btn) {
    var moveFun = function (e) {
          var duration1 = player.duration,
                e = e.originalEvent,
                totalWidth = $('#process .process-bar').width();
          console.log(totalWidth)
            e.preventDefault();
            if (processBtnState) {
              var  moveX = (e.clientX || e.touches[0].clientX) - originX;
                var newWidth = $('#process .cur').width() + moveX;

                if (newWidth > totalWidth || newWidth < 0) {
                    processBtnState = 0;
                } else {
                    var  percent = newWidth / totalWidth;
                    $('#process .cur').width(newWidth);
                    $('#currentTime').text(validateTime(percent * duration1 / 60) + ":" + validateTime(percent * duration1 % 60));
                }
                originX = (e.clientX || e.touches[0].clientX);
            }
        },
        startFun = function (e) {
            e = e.originalEvent;
            processBtnState = 1;
            originX = (e.clientX || e.touches[0].clientX);
        },
        endFun = function () {
            if (processBtnState) {
                var a=($('#process .cur').width()) / ($('#process .process-bar').width());
                player.currentTime =a*(player.duration);
                console.log(a);
                processBtnState = 0;
                updateProcess();
            }
        };
    $btn.on('mousedown touchstart', startFun);
    $("body").on('mouseup touchend', endFun);
    $("#process").on('mousemove touchmove', moveFun);
}







$('.disk-cover').children('.album').attr('src', temp2.al.picUrl);

play = function () {

    player.play();

    changeAnimationState($('.disk-cover'), 'running');
    moveNeedle(true);
    $('#controls .play').hide();
    $('#controls .pause').show();
    $("#btn1").removeClass()
};
pause = function () {
    player.pause();

    moveNeedle(false);
    changeAnimationState($('.disk-cover'), 'paused');
    $('#controls .play').show();
    $('#controls .pause').hide();
    $("#btn1").addClass("play")

};
moveNeedle = function (play) {
    if (play) {
        $('#needle').removeClass("pause-needle").addClass("resume-needle");
    } else {
        $('#needle').removeClass("resume-needle").addClass("pause-needle");
    }
};

changeAnimationState = function ($ele, state) {
    $ele.css({
        "left":"50%",
        'animation-play-state': state,
        '-webkit-animation-play-state': state
    });
};

function validateTime(number) {
    var value = (number > 10 ? number + '' : '0' + number).substring(0, 2);
    return isNaN(value) ? '00' : value;
}





