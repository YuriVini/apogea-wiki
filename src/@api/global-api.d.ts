export as namespace GlobalApiTypes

export interface RefreshTokenResponse {
  access: string
  refresh: string
}

export interface ErrorResponse {
  status: number
  data: {
    message: string
    status: number
    error: string
  }
}
