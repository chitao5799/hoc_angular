"use strict";
/**
 * chạy file :-> npm tsc -> node main.js
 * cách 2: npm start (start định nghĩa trong file package.json)
 */
var a;
var b;
var c;
var d;
var e = ['e', 'asdf', 'adf'];
var f;
var g;
var h;
var color;
(function (color) {
    color[color["red"] = 2] = "red";
    color["green"] = "green";
    color["blue"] = "blue";
})(color || (color = {}));
var reds = color.red;
//cast - ep kieu - chi ap dung voi kieu du lieu la any
var str;
var i = str = '';
var u = str;
//
{
    var a_1 = [];
    a_1.push('string'); //truoc khi su dung phai set gia tri cho bien - nhu lenh tren
    console.log(a_1);
    var b_1 = '';
    b_1.length;
}
//interface
{
    //let drawPoint = (point)=>{ //như này thì ko biết parameter chuyền vào là gì
    var drawPoint = function (point) {
        console.log("draw of point  at x:" + point.x + " and Y: " + point.y);
    };
    drawPoint({ x: 1, y: 4 });
    /////
    var getDistance = function (point1, point2) { }; //parameter dài dòng
    var newDistance = function (point1, point2) { };
}
