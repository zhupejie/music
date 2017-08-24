/**
 * Created by hxsd on 2017/8/17.
 */
var params=getUrlParams();
var temp2;
var aplaylist;
var id = params.id;

//根据id号查询对应专辑歌单列表
// $("#songdetail").find(".songcon").html(des);
function getlist(id,callback){
    $.ajax({
        type:"get",
        url:"data/playlist.json",
        async:true,
        success:function(data){
            callback(data.playlist.tracks);
        }
    })
}



getlist(null,function(list){//上方定义有id。下方如果没有需要传一个空
    var $slist = $("#slist");
    var item=$("#songItem1").html();
    aplaylist=list;

    for(var i =0;i<list.length;i++){
        var $item=$(item);
        var musicindex = list[i];
        $item.find(".music").html(list[i].name);
        $item.find(".artist").html(list[i].ar[0].name+"&nbsp;-&nbsp;"+list[i].al.name);
        $item.find(".list_num").html(i+1);
        $item.data("music",musicindex).click(function(){
            $("#global").hide();
            $("#global").find(".music").html($(this).data("music").name);
            $("#global").find(".artist").html($(this).data("music").ar[0].name);
            $("#global").find(".musicpic").attr("src",$(this).data("music").al.picUrl);
            mControler.play1($(this).data("music").id);
            loadhtml("musicplay");
            temp2=$(this).data("music");

        });
        $slist.append($item);

    }
});

$("#back").click(function(){
    loadhtml("tab");
    $(this).find("a").attr("href","index.html")
})


$("#songdetail").find(".songtop .songtop_con>p").html(temp.name);
$("#songdetail").find(".songtop .songtop_pic>img").attr("src",temp.coverImgUrl);
$("#songdetail").find(".songtop .songtop_pic>div>span").html(temp.playCount);
$("#songdetail").find(".songtop .songtop_con .user>img").attr("src",temp.creator.avatarUrl);
$("#songdetail").find(".songtop .songtop_con .user>p").html(temp.creator.nickname);
$("#songdetail").find(".songtopbg").css("background-image","url("+temp.coverImgUrl+")");



$("#songdetail").find(".songcon").html("<span>简介:&nbsp;&nbsp;&nbsp;</span>"+temp.description);
var html="";
for(var i=0;i<temp.tags.length;i++){
   html+="<span>"+temp.tags[i]+"</span>"
}
$("#songdetail").find(".songtag").html(html);

if($(".songcon").html().length>=100){
    $(".btnshow").show();
}


var allContent = $(".songcon").html();
var x=$(".songcon").html().substr(0,100);
$(".songcon").html(x);
var flag=true;

$(".btnshow").click(function () {
    if(flag){
        $(".songcon").html(allContent);
        $(".btnshow>img").attr("src","images/ic_tag_folder_up.png");
        flag=!flag;
    }else{
        $(".songcon").html(x);
        $(".btnshow>img").attr("src","images/ic_tag_folder_down.png");
        flag=!flag;
    }

})