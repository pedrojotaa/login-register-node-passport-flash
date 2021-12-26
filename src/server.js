import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectFlash from "connect-flash";
import session from "express-session";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./configs/connect";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Config sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 = 1 day
    }
}));

//Enable flash msg
app.use(connectFlash());

//Config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

//connect database
connection.connect(error => {
    if(error){
        console.log(error)
    }else{
        console.log('conectado db')
    };
});

let port = process.env.PORT || 3000;
app.listen(port, () =>console.log(`Building a login system with NodeJS is running on port ${port}!`));
