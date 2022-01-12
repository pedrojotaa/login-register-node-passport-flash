import { check } from "express-validator";

let validateRegister = [
    check('email', 'Invalid Email').isEmail().trim(),

    check('password', 'Invalid passwword, must be 2 chars long').isLength({min: 2}),

    check('passwordConfirmation', 'Password does not match').custom((value, {req}) => {
        return value === req.body.password;
    })
];

let validateLogin = [
    check('email', 'Invalid Email').isEmail().trim(),

    check('password', 'Invalid passwword').not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};