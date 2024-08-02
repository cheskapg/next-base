export default interface UserSession {
    user: string,
    id: number|0,
    canEditRegistration: boolean,
    iat: number,
    exp: number
  }