const router = require('express').Router()
const authentication  = require('../middleware/authentication')
const { loginController, createTask, taskList, updateTask, logout, deleteTask, registerUser, otpVerify }=require('../controllers/controller')
const emptyStringValidate = require('../middleware/emptyString')
const { loginValidator, validateotpVerify, taskValidator } = require('../middleware/objectValidation')

router.post('/register', emptyStringValidate, loginValidator,  registerUser)

router.post('/otp-verify', emptyStringValidate, validateotpVerify, otpVerify)

router.post('/login', emptyStringValidate, loginValidator, loginController)

router.post('/logout', emptyStringValidate, logout)

router.post('/task', authentication, emptyStringValidate, taskValidator, createTask)

router.patch('/task/:id', authentication, emptyStringValidate, taskValidator, updateTask)

router.delete('/task/:id', authentication, emptyStringValidate, deleteTask)

router.get('/task', authentication, emptyStringValidate, taskList)

router.get('/sort/task', authentication, emptyStringValidate, taskList)

module.exports = router