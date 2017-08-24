/**
 * Created by hxsd on 2017/8/17.
 */
$(function(){
    loadhtml("home",$("#tabContainer"));
    $("nav ul li a").click(function(){

        $(this).addClass('ac').parent().siblings().children().removeClass('ac');
    });
    $("#v1").click(function(){
        loadhtml("v1",$("#tabContainer"));
    });
    $("#v2").click(function(){
        loadhtml("v2",$("#tabContainer"));
    });
    $("#home").click(function(){
        loadhtml("home",$("#tabContainer"));
    })
})