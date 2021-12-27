import bcrypt from "bcrypt";
import connection from "../configs/connect";

let createNewUser = (newUser) => {
    return new Promise (async (resolve, reject) => {
        try {
            let check = await checkEmailUser(newUser.email);
            if(check){
                reject(`This email ${newUser.email} already exists`);
            }else{
                let hashedPassword = await bcrypt.hash(newUser.password, 10);
                let data = {
                    fullName: newUser.fullName,
                    email: newUser.email,
                    password: hashedPassword
                };
                let sql = `insert into users set ?`;
           
                connection.query(sql, data, (error, resultado) => {
                        if(error){
                            reject(error);
                        }else{
                            resolve('Create a new user')
                        }
                    });
            };
        } catch (error) {
            reject(error);
        };
    });
};

let checkEmailUser = async (email) => {
    return new Promise ((resolve, reject) => {
        try {
            let sql = `select * from users where email = ?`;
           
            connection.query(sql, email, (error, resultado) => {
                    if(error){
                        reject(error);
                    };
                    if(resultado > 0){
                        resolve(true);
                    }else{
                        resolve(false);
                    };
            });
            }catch (error) {
                reject(error);
            };
    });
};

module.exports = {
    createNewUser: createNewUser
};