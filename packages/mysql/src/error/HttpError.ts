interface Config {
  status: number
  message: string
}

export class HttpError extends Error {
  public status: number
  constructor({ status, message }: Config) {
    super(message)
    this.status = status
  }
}
