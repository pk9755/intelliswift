import { Context } from "koa";
import httpConstants from "../../constant/httpConstants";
import EmployeeValidationSchema from "../schema/EmployeeValidationSchema";
import joiValidator from "../joi/validator";
export class EmployeeValidator {
  constructor() {}

  async signup(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      EmployeeValidationSchema.addEmployeeSchema
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
  async login(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      EmployeeValidationSchema.employeeLogin
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }

  async getEmployee(ctx: Context) {
    //joi validation for request
    await joiValidator.joiValidation(
      ctx.params,
      EmployeeValidationSchema.getEmployeeSchema
    );

    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
  async updateEmployee(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      EmployeeValidationSchema.updateEmployee
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
}

const employeeValidator: EmployeeValidator = new EmployeeValidator();

export default employeeValidator;
