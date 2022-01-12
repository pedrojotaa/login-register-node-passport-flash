import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectFlash from "connect-flash";
import session from "express-session";
import passport from "passport";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./configs/connect";

let app = express();

//Utilizando cookie parser
app.use(cookieParser('secret'))

//habilitando o post de dados pelo body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//configurando sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 = 1 dia
    }
}));

//configurando passport middleware
app.use(passport.initialize())
app.use(passport.session())

//abilitando flash msg
app.use(connectFlash());

//configurando view engine
configViewEngine(app);

//iniciando todas rotas
initWebRoutes(app);

//conectando banco de dados
connection.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('conectado db')
    };
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));