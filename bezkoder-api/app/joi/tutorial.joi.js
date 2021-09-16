const Joi = require('joi');

module.exports = {
    schemas: {
        schema: Joi.object().keys({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            published: Joi.string().required(),
        }),
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    status_code: 400,
                    status_message: result.error.details[0].message
                })
            } else {
                if (!req.value) {
                    req.value = {}
                }
                req.value['body'] = result.value;
                next();
            }
        }
    }
}