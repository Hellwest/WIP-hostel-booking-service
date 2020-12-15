import config = require("config")
import { GqlModuleOptions, DateScalarMode } from "@nestjs/graphql"
import * as depthLimit from "graphql-depth-limit"

import { getBoolean } from "./get-boolean"

interface GraphQLConfig {
  debug: boolean
  playground: boolean
  introspection: boolean
  autoSchemaFile: string | boolean
  dateScalarMode: DateScalarMode
  depthLimit: number
}

const configFromFile = config.get<GraphQLConfig>("graphql")

export const graphQLConfig: GqlModuleOptions = {
  validationRules: [
    depthLimit(process.env.GRAPHQL_DEPTH_LIMIT || configFromFile.depthLimit),
  ],
  debug: getBoolean(process.env.GRAPHQL_DEBUG, configFromFile.debug),
  playground: getBoolean(
    process.env.GRAPHQL_PLAYGROUND,
    configFromFile.playground,
  ),
  introspection: getBoolean(
    process.env.GRAPHQL_INTROSPECTION,
    configFromFile.introspection,
  ),
  autoSchemaFile:
    process.env.GRAPHQL_AUTO_SCHEMA_FILE || configFromFile.autoSchemaFile,
  buildSchemaOptions: {
    dateScalarMode:
      (process.env.GRAPHQL_DATE_SCALAR_MODE as DateScalarMode) ||
      configFromFile.dateScalarMode,
  },
}
