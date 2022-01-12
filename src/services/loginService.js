import bcrypt from "bcrypt"
import connection from "../configs/connect"

let findUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = 'select * from users where email = ?'

            connection.query(sql, email, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    let user = result[0]
                    resolve(user)
                }
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

            connection.query(sql, id, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    let user = result[0]
                    resolve(user)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

let comparePasswordUser = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await bcrypt.compare(password, user.password)
            if (check) {
                resolve(true)
            } else {
                resolve('Password incorrect login service')
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePasswordUser: comparePasswordUser
}