import Joi from "joi";

const TeoriaJoi = Joi.object({
  IdSubTema: Joi.string().uuid({ version: "uuidv4" }).required(),
  NombreTeoria: Joi.string().min(5).max(100).required(),
  contenido: Joi.string().min(10).required(),
});

const TeoriaId = Joi.object({
  IdSubTema: Joi.string().uuid({ version: "uuidv4" }).required(),
  NombreTeoria: Joi.string().min(5).max(100).required(),
  contenido: Joi.string().min(10).required(),
});

export { TeoriaJoi, TeoriaId };
