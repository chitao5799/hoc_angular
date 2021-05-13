/**
 * chạy file :-> npm tsc -> node main.js
 * cách 2: npm start (start định nghĩa trong file package.json)
 */

 //khai báo biến và kiểu dữ liệu
let a :string;
let b:number;
let c:boolean;
let d:any;
let e:string[ ] = ['e','asdf','adf'];
let f: null;
let g:undefined;
let h:void;

enum color{
    red =2,
    green ='green',
    blue ='blue'
}

let reds=color.red;

//cast - ep kieu - chi ap dung voi kieu du lieu la any
let str:any
let i=(str as string)='';
let u=(<string[]>str);
//
{
    let a :string[]=[];
    a.push('string');//truoc khi su dung phai set gia tri cho bien - nhu lenh tren
    console.log(a);
    let b:string='';
    b.length;
}


//interface
{
    //let drawPoint = (point)=>{ //như này thì ko biết parameter chuyền vào là gì
    let drawPoint = (point:{x:number,y:number})=>{//inline annotation
        console.log(`draw of point  at x:${point.x} and Y: ${point.y}`);
        
    }

    drawPoint({x:1,y:4});
    /////

    let getDistance=(point1:{x:number, y:number}, point2:{x:number, y:number}) =>{};//parameter dài dòng

    interface Point{
        x:number,
        y:number
    }

    let newDistance =(point1:Point, point2:Point)=>{};

    // hoặc dùng class thay thế cho kiểu dùng interface như này
}