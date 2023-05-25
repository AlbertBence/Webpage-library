;const toggleBtn = document.querySelector('.toggle');
const toggleBtnIcon = document.querySelector('.toggle i');
const dropdown = document.querySelector('.dropdown');

toggleBtn.onclick = function ()
{
	dropdown.classList.toggle('open');
	const isOpen = dropdown.classList.contains('open');
	toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}