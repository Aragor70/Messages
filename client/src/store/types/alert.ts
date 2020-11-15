

export interface Alert {
    id: string
    message: string
    type: string
}
export interface AlertState {
    alerts: Alert[]
}