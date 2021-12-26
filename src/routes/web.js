import express from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import auth from "../validation/authValidation";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req, res)=>{
        return res.render("homepage.ejs");
    });

    router.get('/login', loginController.getLoginPage);

    router.get('/register', registerController.getRegisterPage);

    router.post('/register', auth.validateRegister, registerController.createNewUser);

    return app.use("/", router);
};

module.exports = initWebRoutes;