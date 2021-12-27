import bcrypt from "bcrypt"
import connection from "../configs/connect"

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await findUserByEmail(email);
        if (user) {
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'select * from users where email = ?'
            connection.query(sql, email, (error, resultado) => {
                if (error) {
                    reject(error)
                }
                let user  = resultado[0]
                resolve(user)
            })
        } catch (error) {
            reject(error)
        }
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'select * from users where id = ?'
            connection.query(sql, id, (error, resultado) => {
                if (error) {
                    reject(error)
                }
                let user  = resultado[0]
                resolve(user)
            })
        } catch (error) {
            reject(error)
        }
    })
}

let comparePasswordUser = (user, password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) resolve(true)
            reject('The password is incorrect')
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    findUserByEmail: findUserByEmail,
    comparePasswordUser: comparePasswordUser,
    findUserById: findUserById,
    handleLogin: handleLogin
}