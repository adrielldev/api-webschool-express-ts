export interface IActivitieRequest {
    title: string
    url: string
    student: string
}

export interface IActivitieResponse {
    id: string
    title: string
    url: string
    createdAt: Date
    updatedAt: Date
    student: string
}