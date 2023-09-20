import { RouterManager } from '../core/RouterManager'
import employeeController from '../controller/EmployeeController'
import {ensureAuthenticated} from '../auth/authUtils'

const employeeRouterManager: RouterManager = new RouterManager('/employee')
employeeRouterManager.post('/signup', employeeController.signup)
employeeRouterManager.post('/login', employeeController.login)
employeeRouterManager.get('/userInfo',ensureAuthenticated, employeeController.getEmployee);
employeeRouterManager.get('/getAllEmployee', employeeController.getAllEmployee);
employeeRouterManager.delete('/:id', employeeController.deleteEmployee);
employeeRouterManager.put('/:id', employeeController.updateEmployee);

export default employeeRouterManager

