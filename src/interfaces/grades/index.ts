export interface IGradesRequest {
    matter: string
    grade: number
    student: string
}

export interface IActivitieResponse {
    id: string
    matter: string
    grade: number
    createdAt: Date
    updatedAt: Date
    student: string
}