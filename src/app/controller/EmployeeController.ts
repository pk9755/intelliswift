import { Context } from "koa";
import logger from "../../logger";
import httpConstants from "../constant/httpConstants";
import EmployeeService from "../service/EmployeeService";
import employeeValidator from "../validation/custom/EmployeeValidator";
import apiErrorHandler from "../utils/ApiErrorHandler";
import { Employee } from '../model/Employee'


class Employeeontroller {
  constructor() { }

  async signup(ctx: Context) {
    try {
      let validation = await employeeValidator.signup(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : signup, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await EmployeeService.signup(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : signup, Error : ${JSON.stringify(error)}`);
    }
  }

  async login(ctx: Context) {
    try {
      let validation = await employeeValidator.login(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      let result = await EmployeeService.login(ctx);
      ctx.status = httpConstants.HTTP_SUCCESS_OK;
      ctx.body = result;
      logger.info(
        `Controller : Employee, Response-Body : ${JSON.stringify(ctx.body)}`
      );
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : Employee, Error : ${JSON.stringify(error)}`);
    }
  }

  async getEmployee(ctx: Context) {
    try {
      let validation = await employeeValidator.getEmployee(ctx)
      if (!validation.isValid) {
        ctx.status = validation.status
        ctx.body = validation.data
        return
      }

      logger.info(`Controller : getEmployee, Request-Body : ${JSON.stringify(ctx.params)}`)

      // getting the book
      let employee = await EmployeeService.getEmployee(ctx)

      ctx.status = httpConstants.HTTP_SUCCESS_OK
      ctx.body = employee
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : getEmployee, Error : ${JSON.stringify(error)}`)
    }
  }

  async getAllEmployee(ctx: Context) {
    try {
      let data = await EmployeeService.getAllEmployee(ctx)

      ctx.status = httpConstants.HTTP_SUCCESS_OK
      ctx.body = data
      logger.info(`Controller : getAllEmployee, Response-Body : ${JSON.stringify(ctx.body)}`)
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : getAllEmployee, Error : ${JSON.stringify(error)}`)
    }
  }

  async deleteEmployee(ctx: Context) {
    try {
      let data: any = await EmployeeService.deleteEmployee(ctx);
      if (!data.success) {
        ctx.status = httpConstants.HTTP_PRECONDITION_FAILED;
        ctx.body = {
          error: data.message,
        };
        return;
      }
      ctx.status = httpConstants.HTTP_SUCCESS_OK;
      ctx.body = {
        message: 'Delete successfully.',
      };
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : deleteEmployee, Error : ${JSON.stringify(error)}`);
    }
  }
  
  async updateEmployee(ctx: Context) {
    try {
      let validation = await employeeValidator.updateEmployee(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : updateEmployee, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await EmployeeService.updateEmployee(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : updateEmployee, Error : ${JSON.stringify(error)}`);
    }
  }
}

const employeeontroller: Employeeontroller = new Employeeontroller();
export default employeeontroller;
