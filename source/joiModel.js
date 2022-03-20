const Joi = require("joi");

module.exports.blogModel = Joi.object({
    title:Joi.string().required(),
    des: Joi.string().required(),
    content: Joi.string().required(),
    // avata: Joi.string().required(),
    // TopicId: Joi.number().required()
  });
module.exports.topicModel = Joi.object({
    title:Joi.string().required()
})
  