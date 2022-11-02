const design = document.querySelector('#opportunities-design');
const designHeight = design.clientHeight;

setTimeout(() => {
	design.style.transform = `translateY(-${
		designHeight - design.parentNode.clientHeight
	}px)`;

	setTimeout(() => {
		design.style.transform = 'translateY(0)';
	}, 2500);
}, 2000);
