/**
 * Created by hxsd on 2017/8/16.
 */
function fontSize(){
    var _html=document.getElementsByTagName("html")[0];
    var dw = dw>750?750:document.documentElement.clientWidth;
    _html.style.fontSize=dw/7.5+"px";
}
fontSize();
window.onresize=fontSize;
//获取url参数

function  getUrlParams(){
    var p_url = window.location.href;
    var p_arr = p_url.split("?")[1].split("&");
    var res = {};
    for(var i=0;i<p_arr.length;i++){
        var str = p_arr[i].split('=');
        res[str[0]]=str[1];
    }
    return res;
}

//通过url路径提取模块名
function  getM(){
    var m_url = window.location.href;
    var arr = m_url.split("#");
    if(arr.length==2){
        var m_arr=arr[1].split("?")[0];
    }
    return m_arr;
}

//通过模块名来加载不同模块

function loadhtml(m,$container){
    $container=$container||$("#share");//判断放哪个容器
    $.ajax({
        url:"views/"+m+".html",
        success:function(data){
            $container.html(data);
            loadjs(m);//当前模块的JS文件
        }
    });



}
function loadjs(m){
    $.ajax({
        type:"get",
        url:"js/"+m+".js",
        async:true
    })
}

$(function(){
    //如果本地localStorage.count不存在，赋初值
    if(!localStorage.count){
        localStorage.count=0
    }
    //存储在硬盘上，每次访问+1
    localStorage.count++;
    if(localStorage.count==1){
        loadhtml("hello");
    }else{
        loadhtml("tab");
        loadhtml("audio",$("#global"))
    }



    var addArray = [];
    collect = function () {
        addArray.push(temp2);
        localStorage.collect=JSON.stringify(addArray);
        console.log(JSON.parse(localStorage.collect));
    };

});
