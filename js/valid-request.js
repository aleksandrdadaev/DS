const form = document.forms['request'];
const button = form.elements['button'];
const validInputArr = Array.from(form).filter(input => {
	if (input.hasAttribute('data-reg')) {
		input.dataset.valid = 0;
		return input;
	}
});

button.addEventListener('click', buttonHandler);

form.addEventListener('input', inputHandler);

function inputHandler({ target }) {
	if (target.hasAttribute('data-reg')) inputCheck(target);
}

function inputCheck(input) {
	const inputValue = input.value;
	const inputReg = new RegExp(input.getAttribute('data-reg'));

	input.style.outlineColor = inputReg.test(inputValue)
		? 'rgb(0,196,0)'
		: 'rgb(255,0,0)';

	input.dataset.valid = inputReg.test(inputValue) ? 1 : 0;
}

function buttonHandler(e) {
	const isAllValid = [];
	validInputArr.forEach(input => {
		isAllValid.push(input.dataset.valid);
	});
	const isValid = isAllValid.includes('0');

	if (isValid) {
		e.preventDefault();
		validInputArr.find(input => input.dataset.valid == '0').style.outlineColor =
			'rgb(255,0,0)';
	}
}
