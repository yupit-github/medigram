var previousValueName,
    previousValuePhone,
    contactUsForm,
    contactUsName,
    contactUsEmail,
    contactUsPhone,
    contactUsRadio,
    contactUsSubmit;

function checkInputRegexp(input, regexp) {

    if (input.name == 'name') {
        var previousValueOfField = previousValueName;
    } else {
        var previousValueOfField = previousValuePhone;
    };

    if (regexp == '') {
        return;
    }
    input = $(input);
    input.closest('.form-group').children('.error-regexp').removeClass('show-error');

    if (!regexp.test(input.val())) {
        if (previousValueOfField == undefined || previousValueOfField == '') {
            input.val(input.val().slice(0, -1));
            input.closest('.form-group').children('.error-regexp').addClass('show-error');
            input.addClass('no-valid-regexp');
            setTimeout(function(obj) {
                obj.removeClass('no-valid-regexp');
            }, 200, input);
        } else {
            for (var i = 0; i < previousValueOfField.length; i++) {
                if (previousValueOfField[i] != input.val()[i]) {
                    input.val(input.val().slice(0, i) + input.val().slice(i + 1, input.val().length));
                    input.closest('.form-group').children('.error-regexp').addClass('show-error');
                    input.addClass('no-valid-regexp');
                    setTimeout(function(obj) {
                        obj.removeClass('no-valid-regexp');
                    }, 200, input);
                    break;
                }
                if (i == previousValueOfField.length - 1 && previousValueOfField[previousValueOfField.length - 1] == input.val()[previousValueOfField.length - 1]) {
                    input.val(input.val().slice(0, -1));
                    input.closest('.form-group').children('.error-regexp').addClass('show-error');
                    input.addClass('no-valid-regexp');
                    setTimeout(function(obj) {
                        obj.removeClass('no-valid-regexp');
                    }, 200, input);
                }
            }
        }
    }
    if (input.name == 'name') {
        previousValueName = previousValueOfField;
    } else {
        previousValuePhone = previousValueOfField;
    };
}

function checkInputRequired(input) {
    input = $(input);
    if (input.val() == '' && input.attr('required')) {
        input.closest('.form-group').children('.error-required').addClass('show-error');
        input.addClass('no-valid-required');
    }
}

function removeInputRegexpErrors(input) {
    input = $(input);
    input.closest('.form-group').children('.error-regexp').removeClass('show-error');
    input.removeClass('no-valid-regexp');
}

function removeInputRequiredErrors(input) {
    input = $(input);
    input.closest('.form-group').children('.error-required').removeClass('show-error');
    input.removeClass('no-valid-required');
}

function formValidationController() {
    contactUsForm = $('.contacts-form');
    contactUsName = contactUsForm.find('#contact-us-name');
    contactUsEmail = contactUsForm.find('#contact-us-email');
    contactUsPhone = contactUsForm.find('#contact-us-phone');
    contactUsRadio = contactUsForm.find('input[type="radio"]');
    contactUsSubmit = contactUsForm.find('input[type="submit"]');

    //Form events
    contactUsForm.on('contextmenu', function(e) {
        e.preventDefault();
    });
    contactUsForm.on('paste', function(e) {
        e.preventDefault();
    });

    //Inputs events
    contactUsName.on('focus', function() {
        removeInputRegexpErrors(this);
        removeInputRequiredErrors(this);
    });
    contactUsName.on('input', function() {
        var regexp = /^[a-z]*$/ig;
        checkInputRegexp(this, regexp);
    });
    contactUsName.on('blur', function() {
        removeInputRegexpErrors(this);
        checkInputRequired(this);
    });
    contactUsEmail.on('focus', function() {
        removeInputRegexpErrors(this);
        removeInputRequiredErrors(this);
    });
    contactUsEmail.on('blur', function() {
        var regexp = /^.+@.+\..{2,4}$/i;
        checkInputRequired(this);
        if (this.value.length > 0 && !regexp.test(this.value)) {
            this.parentElement.querySelector('.error-regexp').classList.add('show-error');
            this.classList.add('no-valid-regexp');
        }
    });
    contactUsPhone.on('focus', function() {
        removeInputRegexpErrors(this);
        removeInputRequiredErrors(this);
    });
    contactUsPhone.on('input', function() {
        var regexp = /^\+?[0-9()-]*$/ig;
        checkInputRegexp(this, regexp);
    });
    contactUsPhone.on('blur', function() {
        removeInputRegexpErrors(this);
        checkInputRequired(this);
    });

    //Form's button submit event
    contactUsSubmit.on('click', function(e) {
        e.preventDefault();
        checkInputRequired(contactUsName);
        checkInputRequired(contactUsEmail);
        checkInputRequired(contactUsPhone);

        if ($(contactUsName).hasClass('no-valid-required') ||
            $(contactUsEmail).hasClass('no-valid-required') ||
            $(contactUsEmail).hasClass('no-valid-regexp') ||
            $(contactUsEmail).hasClass('no-valid-required')) {
            return;
        } else {
            $.ajax({
                type: contactUsForm.attr('method'),
                url: contactUsForm.attr('action'),
                data: {
                    'name': contactUsName.val(),
                    'email': contactUsEmail.val(),
                    'phone': contactUsPhone.val(),
                    'quastion': contactUsForm.find("input:radio:checked").val()
                },

                success: function(data) {
                    var response = $.parseJSON(data);
                    

                    if (response['success']) {
                        contactUsForm.append('<div class="response-success-message"><span>Your request has been sent successfully!</span></div>');

                        setTimeout(function() {
                            contactUsForm.find('.response-success-message').addClass('response-success-message-show');
                        }, 50);

                        setTimeout(function() {
                            contactUsForm.find('.response-success-message').removeClass('response-success-message-show');
                            contactUsForm.find('.response-message-message').remove();
                        }, 5000);
                    } else {
                        contactUsForm.append('<div class="response-error-message">Error</div>');
                    }
                },
            });
        }
    });
}