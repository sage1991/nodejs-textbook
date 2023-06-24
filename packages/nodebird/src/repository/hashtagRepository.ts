import { datasource } from "../core/datasource"
import { HashTag } from "../entity"

export const hashtagRepository = datasource.getRepository(HashTag)
