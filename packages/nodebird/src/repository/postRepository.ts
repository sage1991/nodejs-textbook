import { datasource } from "../core/datasource"
import { PostEntity } from "../entity"

export const postRepository = datasource.getRepository(PostEntity)
