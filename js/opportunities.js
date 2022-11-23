const design = document.querySelector('#opportunities-design');
const designHeight = design.clientHeight;
const gear = document.querySelector('#develop-gear');
const leftArrow = document.querySelector('#develop-left-arrow');
const rightArrow = document.querySelector('#develop-right-arrow');
const slash = document.querySelector('#develop-slash');

setTimeout(() => {
	design.style.transform = `translateY(-${
		designHeight - design.parentNode.clientHeight
	}px)`;

	setTimeout(() => {
		design.style.transform = 'translateY(0)';
	}, 2500);
}, 2000);

setTimeout(() => {
	gear.style.transform = `rotate(360deg)`;

	setTimeout(() => {
		leftArrow.style.transform = `translateX(-5px)`;
		rightArrow.style.transform = `translateX(5px)`;
		slash.style.transform = `scale(1.1)`;
	}, 2000);

	setTimeout(() => {
		leftArrow.style.transform = `translateX(0)`;
		rightArrow.style.transform = `translateX(0)`;
		slash.style.transform = `scale(1)`;
	}, 2300);
}, 7000);
