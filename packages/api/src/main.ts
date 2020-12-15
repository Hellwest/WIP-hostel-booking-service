import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"
import { serverConfig } from "./config"

// eslint-disable-next-line no-restricted-syntax
async function bootstrap() {
  const logger = new Logger("Bootstrap")
  const app = await NestFactory.create(AppModule)

  try {
    await app.listen(serverConfig.port)
  } catch (error) {
    logger.error(`Application starting failed: ${JSON.stringify(error)}`)
    throw error
  }

  logger.log(`Application listening on port: ${serverConfig.port}`)
}

bootstrap()
