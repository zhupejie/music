/**
 * Created by hxsd on 2017/8/17.
 */
//mControler={
//    server:"http://music.126.com/song.php?id=```",//正常是这样操作接口
//    play:function(id){
//        $.ajax({
//            type:"get",
//            url:this.server+id,
//            async:true,
//            success:function(data){
//                  var url =data.url
//              }
//        })
//    }
//}
$("#btn1").click(function(ev){
    ev.stopPropagation();
    if($(this).hasClass("play")){
        $("#audio").get(0).play();
        $(this).removeClass();
        $('#controls .play').hide();
        $('#controls .pause').show();
        console.log("play")
    }else{
        $("#audio").get(0).pause();
        $(this).addClass("play");
        $('#controls .play').show();
        $('#controls .pause').hide();
        console.log("pu")
    }
})

var mControler={
    server:"http://music.126.com/song.php?id=```",//正常是这样操作接口
    play1:function(id){//传过来点击的那个id
        $.ajax({
            type:"get",
            url:"data/music.json",//自己模拟的数据
            async:true,
            success:function(data){
                console.log(data.list[id]);
                var url =data.list[id].url;//与数据里的id匹配
                $("#audio").attr("src",url);
                $("#audio").get(0).play();//或者$("#audio")[0].play()
                $("#btn1").removeClass();



            }
        })
    }
}
$("#global").click(function () {
    loadhtml("musicplay");
    $("#global").hide();

    // if($("#btn1").hasClass("play")){
    //     $('#controls .play').hide();
    //     $('#controls .pause').show();
    //
    // }else{
    //     $('#controls .play').show();
    //     $('#controls .pause').hide();
    // }
})
