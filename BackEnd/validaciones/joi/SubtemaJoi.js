import Joi from "joi";

const SubtemaJoi = Joi.object({
  IdTema: Joi.string().uuid({ version: "uuidv4" }).required(),
  NombreSubTema: Joi.string().min(5).max(100).required(),
});

export default SubtemaJoi;
