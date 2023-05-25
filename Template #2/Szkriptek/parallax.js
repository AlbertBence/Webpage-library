let text = document.getElementById('text');
let forest = document.getElementById('forest');
let moon = document.getElementById('moon');
let background = document.getElementById('background');

window.addEventListener('scroll', () => 
{
	let value = window.scrollY;
	
	text.style.marginTop = value * 1.5 + 'px';
	forest.style.top = value * 0.5 + 'px';
	moon.style.top = value * 0.9 + 'px';
	background.style.top = value * 1 + 'px';
});