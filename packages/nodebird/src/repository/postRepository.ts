import { datasource } from "../core/datasource"
import { Post } from "../entity"

export const postRepository = datasource.getRepository(Post)
