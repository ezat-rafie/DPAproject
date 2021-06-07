function isFormValid(){
    var f = $("#erRegisterForm");
    f.validate({
        rules: {
            txtUsername: {
                required: true,
                minlength: 3
            },
            txtFullName: {
                required: true,
            },
            txtEmail: {
                required: true,
                email: true
            },
            txtPassword: {
                required: true,
                minlength: 8,
                containDigit: true
            },
            txtVerifyPassword: {
                required: true,
                equalTo: '#txtPassword'
            }
        },
        messages: {
            txtUsername: {
                required: "You must enter Username",
                minlength: "Username must be at least 3 characters long"
            },
            txtFullName: {
                required: "You must enter full name"
            },
            txtEmail: {
                required: "You must enter Email address",
                email: "You must enter a valid email"
            },
            txtPassword: {
                required: "You must enter Password",
                minlength: "Password must be at least 8 characters long",
                containDigit: "Password must contain at least 1 digit and 1 Capital letter"
            },
            txtVerifyPassword: {
                required: "You must re-enter password",
                equalTo: "Password must match"
            }
        }
    });
    return f.valid();
}

jQuery.validator.addMethod(
    "containDigit",
    function(value, element){
        var passTest = /([A-Za-z\d]*[A-Z]+[A-Za-z\d]*[\d]+[A-Za-z\d]*)|([A-Za-z\d]*[\d]+[A-Za-z\d]*[A-Z]+[A-Za-z\d]*)/;
        return this.optional(element) || passTest.test(value);
    },
    "Password must contain at least 1 digit and 1 capital letter"
);

function loginFormValid(){
    var f = $("#erLoginForm");
    f.validate({
        rules: {
            txtLoginUsername: {
                required: true
            },
            txtLoginPassword: {
                required: true
            }
        },
        messages: {
            txtLoginUsername: {
                required: "You must enter Username"
            },
            txtLoginPassword: {
                required: "You must enter password"
            }
        }
    });
    return f.valid();
}

function addArtFormValid(){
    var f = $("#erAddArtForm");
    f.validate({
        rules: {
            txtArtName: {
                required: true,
            },
            txtPrice: {
                required: true,
                number: true
            },
            txtArtLink: {
                required: true
            }
        },
        messages: {
            txtArtName: {
                required: "You must enter art name",
            },
            txtPrice: {
                required: "You must enter price address",
                number: "You must enter digits"
            },
            txtArtLink: {
                required: "You must enter Password"
            }
        }
    });
    return f.valid();
}


