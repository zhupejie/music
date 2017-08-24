/**
 * Created by hxsd on 2017/8/17.
 */
var temp;
$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        loop: true,
        autoplay: 1000,
        pagination : '.swiper-pagination',
    });



    function getPlaylist(n,callback){//n是歌曲数量,回掉函数
        //本地有数据本地请求，没有就ajax请求
        if(checkCache()){//如果真，本地取数据
            var list=JSON.parse(localStorage.playlists);
            callback(list);
            console.log("访问缓存")
        }else {
            console.log("访问网络")
            $.ajax({
                url:"data/topPlayList.json",
                success:function(data){
                    //获取数据列表
                    var list=data.playlists;
                    callback(list)
                    //将请求得到的数据，转换为字符串并保存到本地存储中
                    localStorage.playlists=JSON.stringify(data.playlists);

                    //保存当前缓存的时间
                    localStorage.cacheTime = new Date().getTime();

                }
            })
        }


    }
//检查本地是否缓存了请求的数据
    function  checkCache(){
        if(!localStorage.playlists){//如果缓存不存在returnfalse
            return false;
        }
        //缓存是否过期,当前时间减去缓存时间超过5秒走网络
        var time=new Date().getTime()-localStorage.cacheTime;
        console.log(localStorage.cacheTime)
        if(time > 5*1000){
            return false;
        }
        return true;
    }


    getPlaylist(9,function(list){
        //歌单容器
        var $songlist = $(".songlist");
        var item = $("#songItem").html();//dom结构
        for(var i= 0;i<list.length;i++){
            var $item=$(item);//创建一个JS对象
            $item.find("img").attr("src",list[i].coverImgUrl);
            var a=list[i].playCount;
            var s=a.toString();
            if(s.length>=5){
              var num = s.substring(0,s.length-4)+"万";
                $item.find("span").html(num);
            }else{
                $item.find("span").html(s);
            }

            var plistindex = list[i];
            $item.find("p").html(list[i].name);
            $item.find("a").attr("href","#detail?id"+list[i].id)
            $item.find("a").data("plist",plistindex).click(function(){
                loadhtml('detail');
                temp=$(this).data("plist");

            })
            $songlist.append($item);
        }
    })




})