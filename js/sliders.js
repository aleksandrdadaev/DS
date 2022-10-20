function slider(id, infinity = true, autoplay = true, indicators = true) {
	const slider = document.querySelector(`#${id}`);
	const sliderWrapper = slider.firstElementChild;
	const sliderElements = Array.from(sliderWrapper.children);
	const sliderLength = sliderElements.length;
	let gapBetweenSlides = +getComputedStyle(sliderWrapper).gap.slice(0, -2);
	let slideWidth = +getComputedStyle(sliderElements[0]).width.slice(0, -2);
	let sliderWidth = (slideWidth + gapBetweenSlides) * sliderLength;
	let transformSlider = 0;
	let activeIndex = 0;
	let direction = true;
	let x1 = null;
	let divIndicators = null;

	if (infinity) {
		direction = false;
		//	Перебираем массив и задаем дата-атрибуты
		sliderElements.forEach((item, index) => {
			item.dataset.index = index;
			item.dataset.order = index;
			item.dataset.translate = 0;
		});

		changeOrder();
		changeTranslate();
		moveSlides();
	}

	if (autoplay) {
		let autoplayEnable = true;
		let autoplayDirection = true;

		function Autoplay() {
			if (!infinity) {
				if (activeIndex == 0) {
					autoplayDirection = true;
				}
				if (activeIndex == sliderLength - 1) {
					autoplayDirection = false;
				}
			}

			if (autoplayEnable) {
				if (autoplayDirection) {
					moveRight();
				} else {
					moveLeft();
				}
			}
		}

		sliderWrapper.addEventListener('mouseover', () => {
			autoplayEnable = false;
		});
		sliderWrapper.addEventListener('mouseout', () => {
			autoplayEnable = true;
		});
		setInterval(Autoplay, 5000);
	}

	if (indicators) {
		divIndicators = document.createElement('div');
		divIndicators.className = 'projects-slider__nav';

		for (let i = 0; i < sliderLength; i++) {
			let indicator = document.createElement('span');
			indicator.className = 'projects-slider__nav-button';
			indicator.dataset.index = i;
			divIndicators.append(indicator);
		}
		slider.append(divIndicators);
		divIndicators = Array.from(divIndicators.children);
		divIndicators[activeIndex].classList.add(
			'projects-slider__nav-button_active'
		);
	}

	function moveSlider() {
		sliderWrapper.style.transform = `translateX(${transformSlider}px)`;
	}

	function moveSlides() {
		sliderElements.forEach(item => {
			item.style.transform = `translateX(${item.dataset.translate}px)`;
		});
	}

	// 	Изменяем ордеры, исходя из активного элемента
	function changeOrder() {
		let newArray = sliderElements.map(item => +item.dataset.order);
		if (direction) {
			let elem = sliderElements.find(
				item => item.dataset.order == Math.min(...newArray)
			);
			elem.dataset.order = +elem.dataset.order + sliderLength;
		}
		if (!direction) {
			let elem = sliderElements.find(
				item => item.dataset.order == Math.max(...newArray)
			);
			elem.dataset.order = +elem.dataset.order - sliderLength;
		}
	}

	//	Изменяем translate у слайдов
	function changeTranslate() {
		sliderElements.forEach(item => {
			item.dataset.translate =
				Math.floor(+item.dataset.order / sliderLength) * sliderWidth;
		});
	}

	function changeActivity() {
		let nextActiveIndex = 0;
		if (indicators) {
			divIndicators[activeIndex].classList.remove(
				'projects-slider__nav-button_active'
			);
		}
		if (direction) {
			nextActiveIndex = activeIndex + 1;
			if (activeIndex == sliderLength - 1) {
				nextActiveIndex -= sliderLength;
			}
		} else {
			nextActiveIndex = activeIndex - 1;
			if (activeIndex == 0) {
				nextActiveIndex += sliderLength;
			}
		}
		activeIndex = nextActiveIndex;
		if (indicators) {
			divIndicators[activeIndex].classList.add(
				'projects-slider__nav-button_active'
			);
		}
	}

	//	Движение влево
	function moveLeft() {
		direction = false;
		if (!infinity) {
			if (!direction && activeIndex == 0) {
				return;
			}
		}
		changeActivity();
		if (infinity) {
			changeOrder();
			changeTranslate();

			setTimeout(moveSlides, 200);
		}
		transformSlider += slideWidth + gapBetweenSlides;
		moveSlider();
	}
	//	Движение вправо
	function moveRight() {
		direction = true;
		if (!infinity) {
			if (direction && activeIndex == sliderLength - 1) {
				return;
			}
		}
		changeActivity();
		if (infinity) {
			changeOrder();
			changeTranslate();

			setTimeout(moveSlides, 200);
		}
		transformSlider -= slideWidth + gapBetweenSlides;
		moveSlider();
	}

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
}

slider('services-slider', false, true, false);
slider('projects-slider');
