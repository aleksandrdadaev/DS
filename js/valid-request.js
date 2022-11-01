const form = document.forms['request'];
const button = form.elements['button'];
const validInputArr = Array.from(form).filter(input => {
	if (input.hasAttribute('data-reg')) {
		input.dataset.valid = 0;
		return input;
	}
});

form.addEventListener('submit', formCheck);

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

function formCheck(e) {
	e.preventDefault();
	const isAllValid = [];
	validInputArr.forEach(input => {
		isAllValid.push(input.dataset.valid);
	});

	if (isAllValid.includes('0')) {
		validInputArr.find(input => input.dataset.valid == '0').style.outlineColor =
			'rgb(255,0,0)';
		return;
	}

	formSubmit();
}

async function formSubmit() {
	const data = serializeForm(form);
	const response = await sendData(data);
	if (response.ok) {
		let result = await response.json();
		formReset();
		closeForm();
		let formSend = document.createElement('div');
		let formSendImg = document.createElement('div');
		let formSendMessage = document.createElement('p');
		formSend.className = 'request-info-send';
		formSendImg.className = 'request-info-send__img';
		formSendMessage.className = 'request-info-send__message';
		formSend.append(formSendImg);
		formSend.append(formSendMessage);

		if (result.message) {
			formSendImg.style.backgroundImage =
				'url(../img/request/request-accept.svg)';
			formSendMessage.textContent = 'Заявка отправлена';
		} else {
			formSendImg.style.backgroundImage =
				'url(../img/request/request-error.svg)';
			formSendMessage.textContent = 'Ошибка :(';
		}
		requestBg.append(formSend);
		setTimeout(() => {
			closeFormBg();
			formSend.remove();
		}, 2000);
	} else {
		console.log('Код ошибки: ' + response.status);
	}
}

function serializeForm(formNode) {
	return new FormData(formNode);
}

async function sendData(data) {
	return await fetch('../send-mail.php', {
		method: 'POST',
		body: data,
	});
}

function formReset() {
	form.reset();
	validInputArr.forEach(input => {
		input.dataset.valid = 0;
		input.style.outlineColor = 'transparent';
	});
}
