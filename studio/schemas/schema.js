import schemaTypes from "all:part:@sanity/base/schema-type"
import createSchema from "part:@sanity/base/schema-creator"

import albumSchema from "./albumSchema"
import trackSchema from "./trackSchema"
import userSchema from "./userSchema"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([albumSchema, userSchema, trackSchema]),
})
