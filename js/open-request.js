const requestBg = document.querySelector('#request');
const request = requestBg.firstElementChild;
const openRequestButtons = document.querySelectorAll('#open-request');
const closeRequestButton = request.querySelector('#request-close');

openRequestButtons.forEach(button => {
	button.addEventListener('click', e => {
		e.preventDefault();
		requestBg.classList.add('request-bg_active');
		request.classList.add('request_active');
		document.body.style.overflowY = 'hidden';
	});
});

closeRequestButton.addEventListener('click', e => {
	e.preventDefault();
	closeRequest();
});

document.addEventListener('click', e => {
	if (e.target === requestBg) {
		closeRequest();
	}
});

function closeRequest() {
	closeForm();
	closeFormBg();
}

function closeForm() {
	request.classList.remove('request_active');
}

function closeFormBg() {
	requestBg.classList.remove('request-bg_active');
	document.body.style.overflowY = '';
}
