import Joi from 'joi';
class EmployeeValidationSchema {
  constructor() { }

  static addEmployeeSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobilNumber: Joi.number().required()
  })
  static employeeLogin =Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  static getEmployeeSchema = Joi.object({
    id: Joi.number().positive().required()
  })
  static updateEmployee = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    userName: Joi.string().optional(),
    email: Joi.string().optional(),
    mobilNumber: Joi.number().optional()
  })
  
 
}
export default EmployeeValidationSchema;