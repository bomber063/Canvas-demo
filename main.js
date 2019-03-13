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

// context.fillStyle = "grey"//颜色要在画的图形前面 画图形的颜色填写，划线的颜色修改是ontext.strokeStyle
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

eraserUsing = false

penUsing = true

eraser.onclick = function () { //onclick是兼容触屏和鼠标点击的,只要是点了都算。
    // console.log(eraser.className.baseVal)
    // eraser.className.baseVal="icon active" //这里可能是用到SVG的原因，所以className后面跟了.baseVal
    eraser.classList.add('active')//用上面的也可以实现效果
    pen.classList.remove('active')
    eraserUsing = true
    penUsing = false
}


pen.onclick = function () {
    // pen.className.baseVal="icon active" //这里可能是用到SVG的原因，所以className后面跟了.baseVal
    pen.classList.add('active')//用上面的也可以实现效果
    eraser.classList.remove('active')
    penUsing = true
    eraserUsing = false
}



// eraser.className='icon active'
// pen.className='icon'


function listenToUser(canvas) {
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
                context.beginPath()//这里使重新橡皮擦开始的地方
            }
        }
        canvas.ontouchmove = function (eee) {
            // using = true 因为listenToUser每一if和else前面都有using = false，所以可以拿出去。
            if (using) {//在使用状态
    
                if (eraserUsing) {//如果同时满足橡皮擦状态就可以开始擦除
                    context.clearRect(eee.touches[0].clientX-5, eee.touches[0].clientY-5, 10, 10);
                    //正方形是按照左上角画图的，所以这里给x,y都减少5，也就是长宽的一半
                }
                else if(penUsing) {//如果同时满足用笔状态就可以开始用笔
                    // context.lineWidth = 5//因为后面需要改变线宽，所以这里不能限定死了线宽
                    // context.strokeStyle = "black"//划线的颜色修改,画图形的颜色修改是context.fillStyle，因为后面需要改变颜色，所以这里不能限定死了颜色
                    // context.beginPath()//beginPath不可以放到这里，不然lastpoint一直都不可以变化
                    // context.moveTo(5+i*14,5);
                    // var lastpoint={x:undefined,y:undefined}  可以不用定义lastpoint
                    var nextpoint = { x: eee.touches[0].clientX, y: eee.touches[0].clientY }
                    //ontouchmove的所在点与onmousemove不同,
                    //ontouchmove是eee.touches[0].clientX
                    //onmousemove是eee.clientX
                    // context.moveTo(lastpoint.x,lastpoint.y)
                    lastpoint = nextpoint//通过定义nextpoint，然后赋值给lastpoint,就可以不用定义lastpoint
                    // console.log(lastpoint)
                    // console.log(nextpoint)
                    // context.lineWidth = 5
                    context.lineTo(nextpoint.x, nextpoint.y)
                    context.stroke()//通过线条来绘制图形轮廓
                }
                else{//只有使用状态，但是橡皮擦状态和用笔状态都没有就什么都不做
                    using = false
                }
    
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
            else{
                // context.clearRect(eee.clientX,eee.clientY,10,10)
                context.beginPath()//这里使重新橡皮擦开始的地方
        }
    }


    canvas.onmousemove = function (eee) {
        // using = true 因为listenToUser每一if和else前面都有using = false，所以可以拿出去。
        if (using) {//在使用状态

            if (eraserUsing) {//如果同时满足橡皮擦状态就可以开始擦除
                context.clearRect(eee.clientX-5, eee.clientY-5, 10, 10);
                //正方形是按照左上角画图的，所以这里给x,y都减少5，也就是长宽的一半
            }
            else if(penUsing) {//如果同时满足用笔状态就可以开始用笔
                // context.lineWidth = 5//因为后面需要改变线宽，所以这里不能限定死了线宽
                // context.strokeStyle = "red"//划线的颜色修改,画图形的颜色修改是context.fillStyle,因为后面需要改变颜色，所以这里不能限定死了颜色
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
            else{//只有使用状态，但是橡皮擦状态和用笔状态都没有就什么都不做
                using = false
            }

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


clear.onclick = function clearcanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//上面的函数是清除整个画板

//改变划线颜色

black.onclick=function(){
    context.strokeStyle = "black"//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的颜色即可。
    black.className='black coloractive'
    green.className='green'
    yellow.className='yellow'
    blue.className='blue'
    //black.classList.add('coloractive')
    // green.classList.remove('coloractive')
    // yellow.classList.remove('coloractive')
    // blue.classList.remove('coloractive')
}

green.onclick=function(){
    context.strokeStyle = "green"//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的颜色即可。
    green.className='green coloractive'
    yellow.className='yellow'
    blue.className='blue'
    black.className='black'
    // green.classList.add('coloractive')
    // yellow.classList.remove('coloractive')
    // blue.classList.remove('coloractive')
    //black.classList.remove('coloractive')
}

yellow.onclick=function(){
    context.strokeStyle = "yellow"//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的颜色即可。
    green.className='green'
    yellow.className='yellow coloractive'
    blue.className='blue'
    black.className='black'
    // green.classList.remove('coloractive')
    // yellow.classList.add('coloractive')
    // blue.classList.remove('coloractive')
    //black.classList.remove('coloractive')
}

blue.onclick=function(){
    context.strokeStyle = "blue"//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的颜色即可。
    green.className='green'
    yellow.className='yellow'
    blue.className='blue coloractive'
    black.className='black'
    // green.classList.remove('coloractive')
    // yellow.classList.remove('coloractive')
    // blue.classList.add('coloractive')
    //black.classList.remove('coloractive')
}
//以上的代码green.className可以替换为classList.add('blue')和green.classList.remove('blue')


//以下的代码是改变线条粗细

thin1.onclick=function(){
    context.lineWidth=1//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的宽度即可。
    thin1.className='thin1 sizeactive'
    thin.className='thin'
    thick.className='thick'
    // thick.classList.remove('coloractive')
    // thin.classList.add('coloractive')
}

thin.onclick=function(){
    context.lineWidth=5//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的宽度即可。
    thin1.className='thin1'
    thin.className='thin sizeactive'
    thick.className='thick'
    // thick.classList.remove('coloractive')
    // thin.classList.add('coloractive')
}

thick.onclick=function(){
    context.lineWidth=10//因为上下文是全局变量，也就是context在最外面,所以只需要修改context的宽度即可。
    thin1.className='thin1'
    thick.className='thick sizeactive'
    thin.className='thin'
    // thick.classList.remove('coloractive')
    // thin.classList.add('coloractive')
}


// 颜色可以不给定值yellow,blue,black,green。
// 线条也可以不给定值1,5,10

// 可以定义一个全局变量color,在onmousemove把color赋值给context.strokeStyle，然后在点击监听的时候把某一种颜色比如'yellow'赋值给color，然后把color再赋值给context.strokeStyle来改变，这样默认的颜色就可以自己来设定。系统默认颜色是黑色。
// 可以定义一个全局变量size,在onmousemove把size赋值给context.lineWidth，然后在点击监听的时候把某一种粗细比如'10'赋值给size，然后把size再赋值给context.lineWidth来改变，这样默认的粗细就可以自己来设定。系统默认粗细是1。

clearwrap.onclick=function(){
    clearwrap.className='clearwrap clearactive'
    setTimeout(function(){ 
        clearwrap.className='clearwrap'; 
    }, 1000);//这里的setTimeout后面内容意思是代表1000ms后执行函数function(){ clearwrap.className='clearwrap';} 
    // clearwrap.className='clearwrap clearactive'
}


//下面的代码是用来保存的点击监听
download.onclick=function(){
    var url=canvas.toDataURL('./image/png')
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='我的画'
    a.target='_blank'
    //这上面是创建了一个a标签，并且插入到body里面，随便a标签在哪都可以
    a.click()//创建之后就需要点一下这个a标签就OK啦
    document.body.removeChild(a)//创建a然后点击一下就可以保存之后，然后移除掉a即可，这里不移除掉也影响
}

