const themes = ['dark.css', 'light.css'];
var current = 0;
var currentName = 'dark.css';

function changeCSS(cssFile) 
{
	var path = document.getElementById('theme').href;
	document.getElementById('theme').href= path.replace(currentName, cssFile);
	sessionStorage.setItem("style", cssFile);
	currentName = cssFile;
	setCurrent();
}

function setupCSS()
{
	if(sessionStorage.getItem("style") != null)
	{
		if(themes.includes(sessionStorage.getItem("style")))
		{
			changeCSS(sessionStorage.getItem("style"));
		}
		else
		{
			changeCSS(currentName);
		}
	}
	else
	{
		changeCSS(currentName);
	}
	
	setCurrent();
}

function setCurrent()
{
	var newC = -1;
	for(let i = 0; i < themes.length; i++)
	{
		if(newC == -1 && themes[i] == currentName)
		{
			newC = i;
		}
	}
	if (newC == -1)
	{
		newC = 0;
	}
	current = newC;
}

function switchCSS()
{
	if(current >= themes.length - 1)
	{
		changeCSS(themes[0]);
	}
	else
	{
		changeCSS(themes[current + 1]);
	}
}

window.onpaint = setupCSS();