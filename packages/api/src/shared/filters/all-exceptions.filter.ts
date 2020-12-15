import { Catch, InternalServerErrorException } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"

import { UniqueConstraintError } from "../errors/unique-constraint.error"

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown): unknown {
    switch ((exception as Error).constructor) {
      case UniqueConstraintError:
        exception = new InternalServerErrorException(
          (exception as Error).message,
        )
    }

    return exception
  }
}
