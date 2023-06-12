export interface ILogin {
  password: string
  email: string
}

export interface IRegister {
  dto: {
    name: string
    username: string
    email: string
    password: string 
    role: string
  }
}