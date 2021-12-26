import { validationResult } from "express-validator";
import registerService from "../services/registerService";

let getRegisterPage = (req, res) => {
    return res.render('register.ejs', {
        errors: req.flash('errors')
    });
};

let createNewUser = async (req, res) => {
    let errArr = [];
    let validationErr = validationResult(req);

    if (!validationErr.isEmpty()) {
        let errors = Object.values(validationErr.mapped());
        errors.forEach((item) => {
            errArr.push(item.msg)
        });
        req.flash('errors', errArr);
        return res.redirect('/register');
    };

    try {
        let newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        };
        await registerService.createNewUser(newUser);
        return res.redirect('/login');
    } catch (e) {
        req.flash('errors', e);
        return res.redirect('/register');
    };

};

module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};