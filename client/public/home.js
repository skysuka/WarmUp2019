var canvas = document.getElementById("cas");
var ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
resize();
window.onresize = resize; // 改变浏览器窗口大小触发canvas的边界改变

var RAF = (function() {
    return window.requestAnimationFrame       || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    || 
           window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
            };
    })();

// 鼠标活动时，获取鼠标坐标
var warea = {x: null, y: null, max: 20000};
window.onmousemove = function(e) {
    e = e || window.event;
    warea.x = e.clientX;
    warea.y = e.clientY;
    };
window.onmouseout = function(e) {
    warea.x = null;
    warea.y = null;
};

// 添加粒子
// x，y为粒子坐标，xv, yv为粒子xy轴速度，max为连线的最大距离
var dots = [];
for (var i = 0; i < 300; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    // xv, yx 的取值范围(-1, 1)
    var xv = Math.random() * 2 - 1;
    var yv = Math.random() * 2 - 1;
    dots.push({
        x: x,
        y: y,
        xv: xv,
        yv: yv,
        max: 6000
    })
}

animate();

// 帧循环
function animate() {
    // 每一帧清除上一帧的图像
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
    var ndots = [warea].concat(dots);
    dots.forEach(function(dot) {
        // 粒子单位时间的位移
        dot.x += dot.xv;
        dot.y += dot.yv;
        // 遇到边界将速度反向
        dot.xv *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
        dot.yv *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
        // 绘制粒子
        ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
        // 循环计算粒子间的距离
        for (var i = 0; i < ndots.length; i++) {
            var d2 = ndots[i];
            if (dot === d2 || d2.x === null || d2.y === null) continue;
            var xc = dot.x - d2.x;
            var yc = dot.y - d2.y;
            // 两个粒子之间的距离平方
            var dis = xc * xc + yc * yc;
            // 透明度
            var ratio;
            // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
            if (dis < d2.max) {
                // 如果是鼠标，则让粒子向鼠标的位置移动
                if (d2 === warea && dis > (d2.max / 2)) {
                    dot.x -= xc * 0.03;
                    dot.y -= yc * 0.03;
                }
                // 计算透明度
                ratio = (d2.max - dis) / d2.max;
                // 画线
                ctx.beginPath();
                ctx.lineWidth = ratio / 2;
                ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(d2.x, d2.y);
                ctx.stroke();
            }
        }
        // 将已经计算过的粒子从数组中删除
        ndots.splice(ndots.indexOf(dot), 1);
    });
    // 循环
    RAF(animate);
}