export interface ApiResponseModel {
  data?: Player[],
  error?: Error
}

export interface Player {
  name: string,
  score?: number,
  type: "NOOBIE" | "CHEATER" | "CHAMP"
}
