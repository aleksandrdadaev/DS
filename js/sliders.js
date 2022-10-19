function slider(Slider) {
	const slider = Slider;
	const sliderWrapper = slider.firstElementChild;
	const sliderElements = Array.from(sliderWrapper.children);
	const sliderLength = sliderElements.length;
	let gapBetweenSlides = +getComputedStyle(sliderWrapper).gap.slice(0, -2);
	let slideWidth = +getComputedStyle(sliderElements[0]).width.slice(0, -2);
	let transformSlider = 0;
	let activeIndex = 0;
	let x1 = null;
	let autoplay;
	let autoplayDirection = true;
	if (document.documentElement.clientWidth >= 1280) {
		autoplay = true;
	} else {
		autoplay = false;
	}

	function moveRight() {
		if (activeIndex == sliderLength - 1) {
			// autoplayDirection = false;
			return;
		}
		transformSlider -= slideWidth + gapBetweenSlides;
		sliderWrapper.style.transform = `translateX(${transformSlider}px)`;
		activeIndex += 1;
		if (activeIndex == sliderLength - 1) {
			autoplayDirection = false;
		}
	}

	function moveLeft() {
		if (activeIndex == 0) {
			// autoplayDirection = true;
			return;
		}
		transformSlider += slideWidth + gapBetweenSlides;
		sliderWrapper.style.transform = `translateX(${transformSlider}px)`;
		activeIndex -= 1;
		if (activeIndex == 0) {
			autoplayDirection = true;
		}
	}
	//

	sliderWrapper.addEventListener('touchstart', handleTouchStart, false);
	sliderWrapper.addEventListener('touchmove', handleTouchMove, false);

	//	Функция, которая обрабатывает касание слайдера
	function handleTouchStart(event) {
		x1 = event.touches[0].clientX;
	}

	function handleTouchMove(event) {
		if (!x1) {
			return false;
		}
		let x2 = event.touches[0].clientX;

		if (x2 - x1 > 0) {
			moveLeft();
		} else {
			moveRight();
		}
		x1 = null;
	}

	setInterval(() => {
		if (autoplay) {
			if (autoplayDirection) {
				moveRight();
			} else {
				moveLeft();
			}
		}
	}, 5000);

	sliderWrapper.addEventListener('mouseover', () => {
		if (autoplay) {
			autoplay = false;
		}
	});

	sliderWrapper.addEventListener('mouseout', () => {
		if (!autoplay) {
			autoplay = true;
		}
	});
}

slider(document.querySelector('#services-slider'));
slider(document.querySelector('#projects-slider'));
