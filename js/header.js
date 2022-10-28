const header = document.querySelector('#header');
let scrollPosition = 0;

document.addEventListener('scroll', e => {
	let yOffset = window.pageYOffset;

	if (scrollPosition < yOffset) {
		header.classList.remove('header_active');
		document.body.firstElementChild.style.paddingTop = '0';
	} else {
		header.classList.add('header_active');
		document.body.firstElementChild.style.paddingTop = '100px';
	}
	scrollPosition = yOffset;
});
