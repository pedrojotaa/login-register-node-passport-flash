import { validationResult } from "express-validator";

let getLoginPage = (req, res) => {
    return res.render('login.ejs', {
        errors: req.flash('errors')
    })
};

let handleLogin = async (req, res) => {
    let errArr = [];
    let validationErr = validationResult(req);

    if (!validationErr.isEmpty()) {
        let errors = Object.values(validationErr.mapped());
        errors.forEach((item) => {
            errArr.push(item.msg)
        });
        req.flash('errors', errArr);
        return res.redirect('/login');
    };
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
};

let postLogOut = (req, res) => {
    req.session.destroy((error) => {
        return res.redirect('/login')
    });
};

module.exports = {
    getLoginPage: getLoginPage,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};