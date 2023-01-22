const themes = ['themes/dark.css', 'themes/purple.css', 'themes/green.css', 'themes/red.css', 'themes/light.css'];
var current = 0;
var currentName = 'themes/dark.css';

function changeCSS(cssFile) 
{
	document.getElementById('stylesheet').href=cssFile;
	sessionStorage.setItem("style", cssFile);
	currentName = cssFile;
	setCurrent();
}

function setupCSS()
{
	if(sessionStorage.getItem("style") != null)
	{
		changeCSS(sessionStorage.getItem("style"));
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