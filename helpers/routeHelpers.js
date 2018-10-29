const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req['params'][name] }, schema);
      if (!result.error) {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['params']) {
          req.value['params'] = {};
        }
        req.value['params'][name] = result.value.param;
        next();
      } else {
        return res.status(400).json(result.error);
      }
    };
  },
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (!result.error) {
        if (!result.value) {
          result.value = {};
        }
        if (result.value['body']) {
          req.value['body'] = {};
        }
        req.value['body'] = result.value;
        next();
      } else {
        return res.status(400).json(result.error);
      }
    };
  },
  schemas: {
    userSchema: Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[a-fA-F]+$/)
        .required(),
      lastName: Joi.string()
        .regex(/^[a-fA-F]+$/)
        .required(),
      email: Joi.string()
        .email()
        .required(),
    }),
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
