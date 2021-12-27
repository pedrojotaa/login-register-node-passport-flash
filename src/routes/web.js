import express from "express";
import passport from "passport";
import homePageController from "../controllers/homePageController";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passportLocalController"

//iiciando todos passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);

    router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage);
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }))

    router.get('/register', registerController.getRegisterPage);
    router.post('/register', auth.validateRegister, registerController.createNewUser);

    return app.use("/", router);
};

module.exports = initWebRoutes;