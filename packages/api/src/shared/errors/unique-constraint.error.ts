import { QueryFailedError } from "typeorm"

const UNIQUE_CONSTRAINT_ERROR = "23505"

export class UniqueConstraintError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static is(error: any): error is QueryFailedError {
    if (!error) {
      return false
    }

    const isQueryFailedError = error.name === "QueryFailedError"

    const isUniqueConstraintError = error.code === UNIQUE_CONSTRAINT_ERROR

    return isQueryFailedError && isUniqueConstraintError
  }

  constructor(error: QueryFailedError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super(`Unsatisfied unique constraint: ${(error as any).detail}`)
  }
}
