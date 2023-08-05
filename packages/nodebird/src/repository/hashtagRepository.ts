import { datasource } from "../core/datasource"
import { HashTagEntity } from "../entity"

export const hashtagRepository = datasource.getRepository(HashTagEntity)
