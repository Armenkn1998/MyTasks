export interface IEmployees {
    id: number
    email: string
    name: string
    position: string
    surname: string
}
export interface ITasks {
    id: number
    name:string
    description: string
    employeeId: string
    endDate: string
    startDate: string
}