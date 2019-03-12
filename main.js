var canvas = document.getElementById('canvasId')

var context = canvas.getContext('2d')// getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能
//里面的2D是针对2D图像

// resize(canvasId)

// function autoSetCanvasSize(canvasId)
// console.log(document.documentElement.clientWidth)//7和16行这两个console.log输出结果不同


pageWidth = document.documentElement.clientWidth
pageHeigth = document.documentElement.clientHeight

canvas.width = pageWidth
canvas.height = pageHeigth
//以上代码是初始化画图的大小与canvas大小相同，要不然会自动放大的

// console.log(document.documentElement.clientWidth)//7和16行这两个console.log输出结果不同


window.onresize = function () {
    pageWidth = document.documentElement.clientWidth
    pageHeigth = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeigth
}
//以上代码是窗口变化后,画图的大小与canvas大小相同，要不然会自动放大的



// context.fillStyle = "grey"//颜色要在画的图形前面
// context.fillRect(0, 0, 500, 500) 这里的矩形是从x,y坐标开始画，然后长宽分别为50

// canvas.onclick=function(eee){
//     console.log(eee)
//     x=eee.clientX
//     y=eee.clientY
//     context.fillStyle = "red"//颜色要在画的图形前面
//     context.fillRect(x, y, 50, 50) //这里的矩形是从x,y坐标开始画，然后长宽分别为50
// }
// //以上34-40行代码只能监听鼠标点击一瞬间的事件，不能保持鼠标点击和鼠标松开的监听。
// using = false
// canvas.onmousedown = function (eee) {
//     // console.log(eee)
//     using = true
//     if (using === true) {
//         x = eee.clientX
//         y = eee.clientY
//         context.fillStyle = "red"//颜色要在画的图形前面
//         context.fillRect(x, y, 50, 50) //这里的矩形是从x,y坐标开始画，然后长宽分别为50
//     }
//     else {
//         using = false
//     }
// }

// canvas.onmousemove = function (eee) {
//     if (using == true) {
//         console.log(eee)
//         x = eee.clientX
//         y = eee.clientY
//         context.fillStyle = "red"//颜色要在画的图形前面
//         context.fillRect(x, y, 50, 50) //这里的矩形是从x,y坐标开始画，然后长宽分别为50
//     }
//     else {
//         using = false
//     }
// }

// canvas.onmouseup = function (eee) {
//     using = false
// }
// //以上代码如果拖动过快就会出现间隙，因为没有通过划线的API, 也就是下面的context.lineTo

listenToUser(canvas)

using = false

function listenToUser(canvas){
    if (document.body.ontouchstart !== undefined) { //检测触屏模式如果不等于underfined就说明支持ontouchstart，这叫特性检测。因为电脑并不一定不支持触屏，所以不能检测设备，而要检查特性。
        //也可以通过'ontouchstart' in document.body是否等于true或者false来检查
        //下面的是手机端的监听，手机上一般都是触摸式，ontouchstart、ontouchmove、ontouchend

        // using = false  因为listenToUser每一if和else前面都有using = false，所以可以拿出去。
        canvas.ontouchstart = function (eee) {
            // console.log(eee)
            using = true
            if (using === true) {

                context.beginPath()//如果在onmousedown的时候给处beginPath(),那么每次画图都会按照上一次结束的位置连接
                // context.lineWidth = 5 因为这里没有lastpoint,起始位置是underfined，所以没有连接，这里的线宽也就没有作用
                // var lastpoint={x:undefined,y:undefined} 可以不用定义lastpoint
                // var nextpoint={x:eee.clientX,y:eee.clientY}
                // lastpoint=nextpoint
                // context.strokeStyle = "red"//颜色要在画的图形前面
                // context.stroke()
            }
            else {
                using = false
            }
        }
        canvas.ontouchmove = function (eee) {
            // using = true
            if (using == true) {
                context.lineWidth = 5
                context.strokeStyle = "black"
                // context.beginPath()//beginPath不可以放到这里，不然lastpoint一直都不可以变化
                // context.moveTo(5+i*14,5);
                // var lastpoint={x:undefined,y:undefined}  可以不用定义lastpoint
                var nextpoint = { x: eee.touches[0].clientX, y: eee.touches[0].clientY }
                // context.moveTo(lastpoint.x,lastpoint.y)
                lastpoint = nextpoint//通过定义nextpoint，然后赋值给lastpoint,就可以不用定义lastpoint
                // console.log(lastpoint)
                // console.log(nextpoint)
                // context.lineWidth = 5
                context.lineTo(nextpoint.x, nextpoint.y)
                context.stroke()//通过线条来绘制图形轮廓
            }
            else {
                using = false
            }
        }
        canvas.ontouchend = function (eee) {
            using = false
        }
    }
    else {
        //检测触屏模式如果不等于underfined就说明支持ontouchstart，这叫特性检测。因为电脑并不一定不支持触屏，所以不能检测设备，而要检查特性。
        //也可以通过'ontouchstart' in document.body是否等于true或者false来检查
        //以下是PC端的监听,因为PC端才会有鼠标的onclick和onmousedown、onmousemove、onmouseup。
        // using = false
        canvas.onmousedown = function (eee) {
            // console.log(eee)
            using = true
            if (using === true) {

                context.beginPath()//如果在onmousedown的时候给处beginPath(),那么每次画图都会按照上一次结束的位置连接
                // context.lineWidth = 5 因为这里没有lastpoint,起始位置是underfined，所以没有连接，这里的线宽也就没有作用
                // var lastpoint={x:undefined,y:undefined} 可以不用定义lastpoint
                // var nextpoint={x:eee.clientX,y:eee.clientY}
                // lastpoint=nextpoint
                // context.strokeStyle = "red"//颜色要在画的图形前面
                // context.stroke()
            }
            else {
                using = false
            }
        }


        canvas.onmousemove = function (eee) {
            // using = true 因为listenToUser每一if和else前面都有using = false，所以可以拿出去。
            if (using == true) {
                context.lineWidth = 5
                context.strokeStyle = "black"
                // context.beginPath()//beginPath不可以放到这里，不然lastpoint一直都不可以变化
                // context.moveTo(5+i*14,5);
                // var lastpoint={x:undefined,y:undefined}  可以不用定义lastpoint
                var nextpoint = { x: eee.clientX, y: eee.clientY }
                // context.moveTo(lastpoint.x,lastpoint.y)
                lastpoint = nextpoint//通过定义nextpoint，然后赋值给lastpoint,就可以不用定义lastpoint
                // console.log(lastpoint)
                // console.log(nextpoint)
                // context.lineWidth = 5
                context.lineTo(nextpoint.x, nextpoint.y)
                context.stroke()//通过线条来绘制图形轮廓
            }
            else {
                using = false
            }
        }

        canvas.onmouseup = function (eee) {
            using = false
        }
        
    }
}


clear.onclick=function clearcanvas(){
    context.clearRect(0,0,canvas.width,canvas.height);  
}






