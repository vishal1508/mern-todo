import Joi from "joi";

// Username Schema
const usernameSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30)
  .lowercase()
  .required()
  .messages({
    "string.alphanum": "Username must only contain letters and numbers.",
    "string.min": "Username must be at least 6 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
    "any.required": "Username is required.",
  });

// Email Schema
const emailSchema = Joi.string().email({ minDomainSegments: 2 }).required();

// Password Schema
const passwordSchema = Joi.string()
  .min(8) // Minimum 8 characters
  .max(30) // Maximum 30 characters
  .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")) // At least one letter and one number
  .required();

// Combined Schema
const loginSchema = Joi.object({
  username: usernameSchema.optional(),
  password: passwordSchema.optional(),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => err.message),
      });
    }

    next(); // Proceed if validation passes
  };
};

export { validate, loginSchema };
