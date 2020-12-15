import { Resolver, Query, ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
class PlaceholderType {
  @Field()
  ph: Date = new Date()
}

@Resolver("Placeholder")
export class PlaceholderResolver {
  @Query((): typeof PlaceholderType => PlaceholderType, {
    name: "placeholderQuery",
  })
  getPlaceholder() {
    return new PlaceholderType()
  }
}
