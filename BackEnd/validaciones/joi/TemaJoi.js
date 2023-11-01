import Joi from "joi";

const TemaJoi = Joi.object({
  NombreTema: Joi.string().min(5).max(100).required(),
});

export default TemaJoi;
