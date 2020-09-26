function cpfMask (value) {
	return value
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1')
};

function phoneMask (value) {
	return value.replace(/\D/g,"")
		.substring(0, 11)
		.replace(/^(\d{2})(\d)/g,"($1) $2")
		.replace(/(\d)(\d{4})$/,"$1-$2");
};

function clickLPButton () {
	const lpContainer = document.querySelector('div[id^="LPMcontainer"]');

	if (lpContainer) lpContainer.click();
}

document.getElementById('inputCpf').addEventListener('keydown', (event) => {
	const hasCode = typeof(event.code) !== 'undefined';
	const isKey = hasCode && event.code.includes('Key');
	const isDigit = hasCode && event.code.includes('Digit');

	if (isKey || isDigit) event.preventDefault();
	event.target.value = cpfMask(`${event.target.value}${event.key}`);
});

document.getElementById('inputPhone').addEventListener('keydown', (event) => {
	const hasCode = typeof(event.code) !== 'undefined';
	const isKey = hasCode && event.code.includes('Key');
	const isDigit = hasCode && event.code.includes('Digit');

	if (isKey || isDigit) event.preventDefault();
	event.target.value = phoneMask(`${event.target.value}${event.key}`);
});

document.getElementById('form').addEventListener('submit', (event) => {
	event.preventDefault();
	const data = {};

	for (var i = 0; i < event.target.elements.length; i++) {
		const element = event.target.elements[i];

		if (element instanceof HTMLInputElement) {
			data[element.name] = element.value
		}
	}

	event.target.style.display = 'none';

	lpTag.sdes.push([
		{
			"type": "personal",
			"personal": {
				"firstname": data.name,
				"lastname": data.lastname,
				"contacts": [
					{
						"email": data.email,
						"phone": data.phone,
					}
				]
			}
		},
		{
			"type": "ctmrinfo",
			"info": {
				"customerId": data.cpf,
				"socialId": data.azul
			}
		}
	]);

	clickLPButton();
});
