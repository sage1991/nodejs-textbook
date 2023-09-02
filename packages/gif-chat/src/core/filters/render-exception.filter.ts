import { type ArgumentsHost, Catch, type ExceptionFilter } from "@nestjs/common"
import { HttpAdapterHost } from "@nestjs/core"

@Catch()
export class RenderExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapter: HttpAdapterHost) {}

  catch(error: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.adapter
    const http = host.switchToHttp()
    httpAdapter.render(http.getResponse(), "error.html", {
      message: error.message,
      error
    })
  }
}
