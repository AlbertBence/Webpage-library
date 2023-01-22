var targets = ["main", "sub1", "sub2", "sub3"]; //Names of classes, which used to define a page
var active = targets[0];
var objects = {};
var buttonObjects = {};

function Capture()
{
    for(let i = 0; i < targets.length; i++)
	{
        objects[targets[i]] = document.getElementsByClassName(targets[i]);
        buttonObjects[targets[i]] = document.getElementsByClassName((targets[i]+"Btn"));
    }
}

function ShowActive()
{
    for(let className in objects)
	{
        for(let i = 0; i <  objects[className].length; i++)
		{
            let element = objects[className][i];
            if(className == active)
			{
                element.classList.add("activeContent");
                element.classList.remove("inactiveContent");
            }
			else
			{
                element.classList.add("inactiveContent");
                element.classList.remove("activeContent");
            }
        }
        for(let i = 0; i <  buttonObjects[className].length; i++)
		{
            let element = buttonObjects[className][i];
            if(className == active)
			{
                element.classList.add("active");
            }
			else
			{
                element.classList.remove("active");
            }
        }
    }
}

function SetActive(className)
{
    active = className;
    ShowActive();
}

function Load()
{
    Capture();
    ShowActive();
}