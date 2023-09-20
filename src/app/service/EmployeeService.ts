import { Context } from "koa";
import library from "../db/entity/library";
import { Employee } from "../model/Employee";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();


class EmployeeService {
  constructor() { }
  async signup(ctx: Context) {
    let firstName: string = ctx.request.body.userName;
    let lastName: string = ctx.request.body.userName;
    let userName: string = ctx.request.body.userName;
    let email: string = ctx.request.body.email;
    let password: string = ctx.request.body.password;
    let mobilNumber: number = ctx.request.body.mobilNumber;
    let checkUser = await library.Employee.findOne({
      where: { email: email },
    });
    const hash = await bcryptjs.hash(password, 10);
    if (!checkUser) {
      await library.Users.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hash,
        mobilNumber: mobilNumber,
      });
    } else {
      ctx.status = 400;
      ctx.body = "The specified e-mail address already exists";
    }
  }

  async login(ctx: Context) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = ctx.request.body;
        const checkUser = await library.Employee.findOne({
          where: { email: email },
        });
        if (checkUser == null || checkUser == "") {
          resolve({
            status: false,
            statusCode: 409,
            message: "User email not found......",
          });
        } else {
          const { id, userName, email } = checkUser;
          const Match = await bcryptjs.compare(password, checkUser.password);

          if (Match == true) {
            const token = jwt.sign(
              {
                id: id,
                name: userName,
                email: email,
                role: "admin",
              },
              process.env.JWT_SECRET
            );
            const data = {
              id: id,
              name: userName,
              email: email,
            };

            resolve({
              status: true,
              statusCode: 200,
              data: data,
              token: token,
              message: "Success......",
            });
          } else {
            resolve({
              status: false,
              statusCode: 409,
              message: "Password not match......",
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async getEmployee(ctx: Context) {
    let userId = parseInt(ctx.params.id);

    let userModel = await library.Employee.findByPk(userId);
    return userModel;
  }

  async getAllEmployee(ctx: Context) {
    let getAllEmployeeData = await library.Employee.findAll();
    return getAllEmployeeData;
  }

  async deleteEmployee(ctx: Context) {
    try {
      let isUserExists = await library.Employee.findOne({
        where: {
          id: parseInt(ctx.params.id),
        },
        attributes: ["id", "username"],
      });
      if (!isUserExists) {
        let userNotExists: any = {
          success: false,
          message: 'User not exists',
          httpstatus: 404,
        };
        return userNotExists;
      }
      await library.Employee.destroy({
        where: {
          id: parseInt(ctx.params.id),
        },
      });
      return {
        success: true,
        httpstatus: 201,
        message: 'successfull',
      };

    } catch (errMail) {
      console.log(`ERROR`, errMail);
    }
  }

  async updateEmployee(ctx: Context) {
    let isUserExists = await library.Employee.findOne({
      where: {
        id: parseInt(ctx.params.id),
      },
      attributes: ["id", "username"],
    });
    if (!isUserExists) {
      let userNotExists: any = {
        success: false,
        message: 'User not exists',
        httpstatus: 404,
      };
      return userNotExists;
    }
    let firstName: string = ctx.request.body.userName;
    let lastName: string = ctx.request.body.userName;
    let userName: string = ctx.request.body.userName;    
    let mobilNumber: number = ctx.request.body.mobilNumber;
    if (isUserExists) {
      await library.Users.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        mobilNumber: mobilNumber,
      });
      
    } 
  }
  
  async generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.userName,
        role: "admin",
        exp: Math.floor(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  }
  

}
let employeeService: EmployeeService = new EmployeeService();
export default employeeService;
