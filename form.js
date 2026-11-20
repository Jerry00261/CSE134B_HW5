const form = document.querySelector('form');
const firstName = document.querySelector('#firstName');
const email = document.querySelector('#email');
const comments = document.querySelector('#comments');
const errorTitle = document.querySelector('#error-title');
const firstNameError = document.querySelector('#firstName-error');
const emailError = document.querySelector('#email-error');
const commentsError = document.querySelector('#comments-error');
const infoArea = document.querySelector('#comments-info');
const formErrorsField = document.querySelector('#form-errors');
const submitButton = form.querySelector('button');
const form_errors = [];
const warningThreshold = 50;
infoArea.hidden = false;

function getMessage(field, label) {

    if (field.validity.valueMissing) {
        return label + ' is required. Please fill it in.';
    }

    if (field.validity.typeMismatch) {
        return label + ' must be a valid email adress.';
    }

    if (field.validity.tooShort) {
        return label + ' must be at least ' + field.minLength + ' characters. You have ' + field.value.length + '.'
    }

    return '';
}

function checkField(field, label) {

    field.setCustomValidity('');

    const message = getMessage(field, label);

    field.setCustomValidity(message);

    return message;
}

function showError(field, errorBox, message) {
    errorBox.textContent = message;

    if (message === '') {
        errorBox.hidden = true;
        field.removeAttribute('aria-invalid');
    }   
    
    else {
        errorBox.hidden = false;
        field.setAttribute('aria-invalid', 'true');
    }

    if (firstNameError.textContent === '' && emailError.textContent === '' && commentsError.textContent === '') {
        errorTitle.hidden = true;
    }

    else {
        errorTitle.hidden = false;
    }
}

checkField(firstName, 'First name');
checkField(email, 'Email');
checkField(comments, 'Comments');

firstName.addEventListener('input', function () {
    const message = checkField(firstName, 'First name');
    if (firstNameError.textContent !== '') {
        showError(firstName, firstNameError, message);
    }
});

firstName.addEventListener('change', function () {
    const message = checkField(firstName, 'First name');
    showError(firstName, firstNameError, message);
});

firstName.addEventListener('invalid', function () {
    showError(firstName, firstNameError, firstName.validationMessage);
    form_errors.push({field: 'firstName', error: firstName.validationMessage});
});



email.addEventListener('input', function () {
    const message = checkField(email, 'Email');
    if (emailError.textContent !== '') {
        showError(email, emailError, message);
    }
});

email.addEventListener('change', function () {
    const message = checkField(email, 'Email');
    showError(email, emailError, message);
});

email.addEventListener('invalid', function () {
    showError(email, emailError, email.validationMessage);
    form_errors.push({field: 'email', error: email.validationMessage});
});

comments.addEventListener('input', function () {
    const message = checkField(comments, 'Comments');
    if(commentsError.textContent !== '') {
        showError(comments, commentsError, message);
    }
    updateCount();
});

comments.addEventListener('change', function () {
    const message = checkField(comments, 'Comments');
    showError(comments, commentsError, message);
});

comments.addEventListener('invalid', function () {
    showError(comments, commentsError, comments.validationMessage);
    form_errors.push({field: 'comments', error: comments.validationMessage});
});

function updateCount () {
    const remaining = comments.maxLength - comments.value.length;

    if (remaining === 0) {
        infoArea.textContent = 'You have reached the ' + comments.maxLength + ' characters limit.';
        infoArea.className = 'at-limit';
    }

    else if (remaining <= warningThreshold) {
        infoArea.textContent = 'Warning: only ' + remaining + ' characters remaining.';
        infoArea.className = 'near-limit';
    }

    else {
        infoArea.textContent = remaining + ' characters remaining for comments.';
        infoArea.className = '';
    }
}

updateCount();

form.addEventListener('submit', function () {
    formErrorsField.value = JSON.stringify(form_errors);
});