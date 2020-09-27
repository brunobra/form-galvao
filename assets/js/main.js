if (sessionStorage.getItem('azulPrecareForm')) {
	document.getElementById('precare-form').style.display = 'none';
	document.getElementById('precare-close').style.display = 'block';
}

const precare = document.getElementById('precare');
const config = { attributes: true, childList: true, subtree: true };

const callback = function() {
	const lpChat = document.getElementById('lpChat');

	if (lpChat) {
		document.getElementById('lp-button-style').disabled = false;
	} else if (sessionStorage.getItem('azulPrecareForm')) {
		document.getElementById('lp-button-style').disabled = true;
	}
};

const observer = new MutationObserver(callback);
observer.observe(precare, config);

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

function isValidCPF(cpf) {
	if (typeof cpf !== "string") return false
	cpf = cpf.replace(/[\s.-]*/igm, '')
	if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
		return false
	}
	var soma = 0
	var resto
	for (var i = 1; i <= 9; i++)
		soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
	resto = (soma * 10) % 11
	if ((resto == 10) || (resto == 11))  resto = 0
	if (resto != parseInt(cpf.substring(9, 10)) ) return false
	soma = 0
	for (var i = 1; i <= 10; i++)
		soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
	resto = (soma * 10) % 11
	if ((resto == 10) || (resto == 11))  resto = 0
	if (resto != parseInt(cpf.substring(10, 11) ) ) return false
	return true
}

function isValidPhone(value) {
	return value.length > 12;
}

function validate(element) {
	if (element.required && !element.value) {
		element.parentElement.classList.add('error');
		return;
	}

	if (element.name === "cpf" && !isValidCPF(element.value)) {
		element.parentElement.classList.add('error');
		return;
	}

	if (element.name === "phone" && !isValidPhone(element.value)) {
		element.parentElement.classList.add('error');
		return;
	}

	element.parentElement.classList.remove('error');
}

function clickLPButton () {
	const lpContainer = document.querySelector('div[id^="LPMcontainer"]');

	if (lpContainer) lpContainer.click();
}


document.getElementByC

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

document.getElementById('precare-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const data = {};
	let hasError = false;

	for (var i = 0; i < event.target.elements.length; i++) {
		const element = event.target.elements[i];

		if (element instanceof HTMLInputElement) {
			data[element.name] = element.value

			if (element.parentElement.classList.contains('error')) {
				hasError = true
			}
		}
	}

	if (hasError) return;

	sessionStorage.setItem('azulPrecareForm', JSON.stringify(data));
	event.target.style.display = 'none';
	document.getElementById('precare-close').style.display = 'block';

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

document.getElementById('precare-close').addEventListener('click', () => {
	window.close();
});
