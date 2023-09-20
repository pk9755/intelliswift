export class Employee {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
    status: string
    mobileNumber: number

    constructor() {
        this.id = 0
        this.firstName = null
        this.lastName = null
        this.userName = null
        this.email = null
        this.password = null
        this.status = null
        this.mobileNumber = 0
    }

    getId(id: number) {
        this.id = id
    }
    getFirstName(userName: string) {
        this.userName = userName
    }
    getLastName(userName: string) {
        this.userName = userName
    }
    getUserName(userName: string) {
        this.userName = userName
    }

    getEmail(email: string) {
        this.email = email
    }

    getPassword(password: string) {
        this.password = password
    }

    getStatus(status: string) {
        this.status = status
    }

    getMobileNumber(mobileNumber: number) {
        this.mobileNumber = mobileNumber
    }

    setId(id: number) {
       this.id = id
    }
    setFirstName(userName: string) {
        this.userName = userName
    }
    setLastName(userName: string) {
        this.userName = userName
    }
    setUserName(userName: string) {
        this.userName = userName
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    setStatus(status: string) {
        this.status = status
    }

    setMobileNumber(mobileNumber: number) {
        this.mobileNumber = mobileNumber
    }

   
}