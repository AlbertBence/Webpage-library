var prevTarget;
var backgroundImage = 'url(img/background.png)';

document.onmousemove = function (e) {
    e = e || window.event;
    evt = e;
    let target = e.target;
    let break_ = false;
    while(!target.classList.contains("interactive") && !break_)
	{
        if(target.parentElement != null && target.parentElement.nodeName != "BODY" && target.parentElement.nodeName != "HTML")
		{
            target = target.parentElement;
        }
		else
		{//Reached the top of the document without anything
            target = e.target;//Revert to the original target
            break_ = true;//Exit the loop
        }
    }
    if(target.classList.contains("interactive"))
	{
        let rect = target.getBoundingClientRect();
        let Xmin = rect.left; let Xmax = rect.right; let Xmid = (Xmax+Xmin)/2;
        let Ymin = rect.top; let Ymax = rect.bottom; let Ymid = (Ymax+Ymin)/2;
        let Xdist = e.clientX - Xmid;
        let Ydist = e.clientY - Ymid;
        let Xpercent = Xdist/(Xmax-Xmid);
        let Ypercent = Ydist/(Ymax-Ymid)
        target.classList.add("interactiveHighlight");
        let power = Math.sqrt(Math.abs(Xpercent) + Math.abs(Ypercent));
        target.style.transform = "rotate3d("+-Ypercent+","+Xpercent+",0,"+power*30+"deg)";
    }
	else if(prevTarget != null && prevTarget != undefined)
	{
        prevTarget.classList.remove("interactiveHighlight");
        prevTarget.style.transform = "";
    }
    if(prevTarget != null && prevTarget != undefined && prevTarget != target)
	{//If the current target is an other "interactive" object
        prevTarget.classList.remove("interactiveHighlight");
        prevTarget.style.transform = "";
    }
    prevTarget = target;
}

document.onclick = function(e){
    e = e || window.event;
    evt = e;
    let target = evt.target;
    let break_ = false;
    while(!target.classList.contains("flip") && !break_)
	{
        if(target.parentElement.nodeName != "BODY" && target.parentElement.nodeName != "HTML")
		{
            target = target.parentElement;
        }
		else
		{//Reached the top of the document without anything
            target = e.target;//Revert to the original target
            break_ = true;//Exit the loop
        }
    }
    if(target.classList.contains("flip"))
	{
        flip(target);
    }
}

function flip(target)
{
    const transformDuration = 300;
    if(!target.classList.contains("flipBack"))
	{//It's the normal way around, turn it on its back
        target.classList.add("flipFaceMidTo");
        setTimeout(function() {
            target.classList.remove("flipFaceMidTo");
            target.classList.add("flipBackMidFrom");
        }, transformDuration);
        setTimeout(function() {
            target.classList.remove("flipBackMidFrom");
            target.classList.add("flipBack");
        }, transformDuration+30);
    }
	else
	{
        target.classList.add("flipBackMidTo");
        setTimeout(function() 
		{
            target.classList.remove("flipBackMidTo");
            target.classList.add("flipFaceMidFrom");
        }, transformDuration);
        setTimeout(function() 
		{
            target.classList.remove("flipFaceMidFrom");
            target.classList.remove("flipBack");
        }, transformDuration+30);
    }
}

var huePointer = 0;//0->1536, managed by HueIncrease
var posPointer = 0;//0->100
setInterval(function()
{
    setGradient();
    posPointer += 1;
    //huePointer = hueIncrease(huePointer, 4);
},30);

function setGradient()
{
    let colorDiffernece = 240;
    let transitionHeight = 20;
    if(posPointer >= 100)
	{
        posPointer = -transitionHeight;
        huePointer = hueIncrease(huePointer, -colorDiffernece)
    }
    let rgbO = rgbFromInt(huePointer);
    let rgbE = rgbFromInt(huePointer + colorDiffernece);
    let doc = document.getElementById("html");
    let imageVal = backgroundImage + ', linear-gradient(0deg,' + RGBstrArr(rgbO) + ' ' + (posPointer) + '%,' + RGBstrArr(rgbE) + ' ' + (posPointer+transitionHeight) + '%)';
    doc.style.backgroundImage = imageVal

    let borderTargets = document.getElementsByClassName("slave-rgb-border");
    let hoverBorderTargets = document.getElementsByClassName("hover-slave-rgb-border");
    let progress = (posPointer+transitionHeight)/(100+transitionHeight);
    let r = lerp(progress, rgbE[0], rgbO[0]);
    let g = lerp(progress, rgbE[1], rgbO[1]);
    let b = lerp(progress, rgbE[2], rgbO[2]);
    for(let i = 0; i < borderTargets.length; i++)
	{
        borderTargets[i].style.borderColor = RGBstr(r,g,b);
    }
    for(let i = 0; i < hoverBorderTargets.length; i++)
	{
        hoverBorderTargets[i].style.borderColor = RGBstr(r,g,b);
    }
    
}

function RGBstr(r,g,b)
{
    return "rgb("+r+","+g+","+b+")";
}

function RGBstrArr(rgb)
{
    return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
}

function lerp(x, a0, a1)
{
    let oWeight = 1-x;
    let eWeight = x;
    return Math.trunc(a0*oWeight+a1*eWeight);
}

function rgbFromInt(input)
{
    input = input%1536;
    let red = 0;
    let green = 0;
    let blue = 0;
    rise = input % 256;
    fall = 255-rise;
    switch(Math.trunc(input/256)%6)
	{
      case 0: {red = 255; green = rise; blue = 0;}break;
      case 1: {red = fall; green = 255; blue = 0;}break;
      case 2: {red = 0; green = 255; blue = rise;}break;
      case 3: {red = 0; green = fall; blue = 255;}break;
      case 4: {red = rise; green = 0; blue = 255;}break;
      case 5: {red = 255; green = 0; blue = fall;}break;
    }
    return [red, green, blue];
}

function hueIncrease(input, x)
{
    y = input + x;
    if(y < 0)return 1536+y;
    else if(y >= 1536) return y-1536;
    else return y;
}