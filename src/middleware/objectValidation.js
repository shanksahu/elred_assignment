const Joi = require('joi');

const validateotpVerify = async (req, res, next) => {

    const schema =  Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required().error(new Error("Email is required")),
        otp: Joi.number()
            .required().error(new Error("otp is required"))
    })

    let object = req.body;

    try {
        const value = await schema.validateAsync(object);
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}

const loginValidator = async (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required().error(new Error('Email is required')),
        password: Joi.string().required().error(new Error('Password is required')),
    })

    let object = req.body;

    try {
        const value = await schema.validateAsync(object);
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}

const taskValidator = async (req, res, next) => {

    const schema =  Joi.object({
        date: Joi.string(),
        task: Joi.string(),
        status: Joi.string()
    })

    let object = req.body;

    try {
        const value = await schema.validateAsync(object);
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err.message)
    }
}

module.exports = { validateotpVerify, loginValidator, taskValidator }