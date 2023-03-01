const userModel = require('../models/userModel')
const taskModel = require('../models/taskModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require("moment")
const { emailService } = require('../utils/nodemailer')
const { otpTemplate } = require('../utils/template')
const secret = process.env.TOKEN_SECRET
const refreshSecret = process.env.REFRESH_TOKEN_SECRET

const registerUser = async (req, res) => {
    try {
        let body = req.body
        let token = jwt.sign({}, refreshSecret, {
            expiresIn: '03m'
        });
        const OTP = Math.floor(1000 + Math.random() * 9000);
        body.otp = OTP
        body.refreshToken = token
        body.password = await bcrypt.hash(body.password, 10);
        let addUser = await userModel.create(body)
        setTimeout(async () => {
            emailService(body.email, otpTemplate(OTP))
        }, 100);
        return res.status(200).send("User has been registred, OTP has been sent to registered email")
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const otpVerify = async (req, res) => {
    let { otp, email } = req.body
    let user = await userModel.findOne({ email: email })
    if (user) {
        if (otp === user.otp) {
            jwt.verify(user.refreshToken, refreshSecret, async (err, decoded) => {
                if (err) {
                    console.log("token expire");
                    user.otp = null
                    user.refreshToken = null
                    await user.save()
                    return res.status(400).send("OTP has been expire!");
                } else {
                    user.isOtpVerified = true
                    user.otp = null
                    user.refreshToken = null
                    await user.save()
                    return res.status(200).send("Otp has been verified")
                }
            });
        } else {
            return res.status(400).send("Invalid OTP")
        }
    } else {
        return res.status(400).send("user dose not exist!, please register")
    }


}

const loginController = async (req, res) => {
    let body = req.body
    const user = await userModel.findOne({ email: body.email })
    if (user) {
        if (user.isOtpVerified) {
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                let token = jwt.sign({ user: user }, secret, {
                    expiresIn: '05m' // 24 hours
                });
                req.session.views = 1
                return res.cookie('authorizationToken', token).status(200).send({
                    email: user.email,
                    message: "Logged in"
                })
            }
            else {
                return res.status(400).send('invalid Password')
            }
        } else {
            let token = jwt.sign({}, refreshSecret, {
                expiresIn: '03m'
            });
            const OTP = Math.floor(1000 + Math.random() * 9000);
            user.otp = OTP
            user.refreshToken = token
            user.save()
            setTimeout(async () => {
                emailService(body.email, otpTemplate(OTP))
            }, 100);
            return res.status(200).send("Otp has been sent to your registered email. Please verify your account.")
        }


    } else {
        return res.status(400).send('User dose not exist')
    }

}

const taskList = async (req, res) => {
    try {
        let { limit, page } = req.query
        limit ? limit * 1 : 0
        let skip
        if (page) {
            skip = (page - 1) * limit
        } else {
            skip = 0
        }
        if (req.cookies.authorizationToken) {
            let taskList
            if (req.url === "/sort/task") {
                taskList = await taskModel.find().limit(limit).skip(skip).sort({ task: 1 })
            } else {
                taskList = await taskModel.find().limit(limit).skip(skip)
            }
            return res.status(200).send({ listing: taskList })

        } else {
            return res.status(400).send("Session out!, redirecting to login page. Please login again");
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
const dateValidation = (date) => {
    let dateArr
    if (date.includes("-")) {
        dateArr = date.split("-")
    } else {
        dateArr = date.split("/")
    }
    let date2 = dateArr.map(x => parseInt(x))
    if (date2[0] <= 31 && date2[1] <= 12 && date2[2].toString().length === 4) {
        return `${date2[0]}-${date2[1]}-${date2[2]}`
    } else {
        return 'invalidDate'
    }
}

const createTask = async (req, res) => {
    try {

        if (req.cookies.authorizationToken) {
            let body = req.body
            if (body.date) {
                date = dateValidation(body.date)
                body.date = date
            }
            if (!body.date || body.date !== "invalidDate") {
                body.date = date
                const addTask = await taskModel.create(body)
                return res.status(200).send({ message: "task has been created", addTask })
            } else {
                return res.status(400).send("Invalid Date")
            }

        } else {
            return res.status(400).send("Session out!, redirecting to login page. Please login again");
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateTask = async (req, res) => {
    try {
        if (req.cookies.authorizationToken) {
            let body = req.body
            let id = req.params.id
            if (body.date) {
                date = dateValidation(body.date)
                body.date = date
            }
            if (!body.date || body.date !== "invalidDate") {
                const updateTask = await taskModel.findByIdAndUpdate(id, body, { new: true })
                return res.status(200).send({ message: "Task has been updated", UpdatedTask: updateTask })
            } else {
                return res.status(400).send("Invalid Date")
            }

        } else {
            return res.status(400).send("Session out!, redirecting to login page. Please login again");
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const logout = async (req, res) => {
    return res.clearCookie("authorizationToken").send('Logout! redirected to login page');
}

const deleteTask = async (req, res) => {
    try {
        if (req.cookies.authorizationToken) {
            let id = req.params.id
            const addTask = await taskModel.findByIdAndDelete(id)
            return res.status(200).send({ message: "task has been Deleted" })

        } else {
            return res.status(400).send("Session out!, Session out!, redirecting to login page. Please login again. Please login again");
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


module.exports = { loginController, createTask, taskList, updateTask, logout, deleteTask, registerUser, otpVerify }