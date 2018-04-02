const endTime=new Date(2018,3,3,10,19,52);

var curTimeSeconds=0;

var balls=[];
const colors=["#F39"," #FFFF66", "#00CCFF", "#99FFCC", "#33FF66", "#FF0000", "#6699FF", "#0099FF", "#CCFFFF", "#FF3366"];

window.onload=function(){
	//屏幕自适应
	CANVAS_WIDTH=document.body.clientWidth;
	CANVAS_HEIGHT=document.body.clientHeight;
	
	MARGIN_LEFT=Math.round(CANVAS_WIDTH/10);
	MARGIN_TOP=Math.round(CANVAS_HEIGHT/5);
	RADIUS=Math.round(CANVAS_WIDTH*4/5/108)-1;
	
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	
	canvas.width=CANVAS_WIDTH;
	canvas.height=CANVAS_HEIGHT;
	
	curTimeSeconds=getCurSeconds();
	setInterval(
		function(){
			draw(context);
			//时间小球变化
			update();
		},50);
}

function getCurSeconds(){
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	//毫秒转成秒
	ret=Math.round(ret/1000);
	
	return ret>=0?ret:0;

}

function update(){
	var nextTimeSeconds=getCurSeconds();
	
	var nextHours=parseInt(nextTimeSeconds/3600);
	var nextMinutes=parseInt((nextTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextTimeSeconds%60;
	
	var curHours=parseInt(curTimeSeconds/3600);
	var curMinutes=parseInt((curTimeSeconds-curHours*3600)/60);
	var curSeconds=curTimeSeconds%60;
	
	if(nextSeconds!=curSeconds){
		
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}
		
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
		}
		
		curTimeSeconds=nextTimeSeconds;
	}
	
	updateBalls();

}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		
		if(balls[i].y>=CANVAS_HEIGHT-RADIUS){
			balls[i].y=CANVAS_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for(var i=0;i<balls.length;i++)
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<CANVAS_WIDTH)
			balls[cnt++]=balls[i];
	while(balls.length>Math.min(300,cnt)){
		balls.pop();
	}
	

}

function addBalls(x,y,num)
{
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
}

function draw(cxt){
	//时间刷新
	cxt.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
	var hours=parseInt(curTimeSeconds/3600);
	var minutes=parseInt((curTimeSeconds-hours*3600)/60);
	var seconds=curTimeSeconds%60;
	
	//绘制时间
	//小时的两个数字
	drawDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	drawDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	//冒号
	drawDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	//分钟
	drawDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	drawDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	//冒号
	drawDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	//秒钟
	drawDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	drawDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	
	//绘制小球
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y , RADIUS , 0 , 2*Math.PI,true);
		cxt.closePath();
				
		cxt.fill();
	}
		
}

function drawDigit(x,y,num,cxt){
	
	cxt.fillStyle="#336699";
	
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
				cxt.closePath();
				
				cxt.fill();
			}

}
