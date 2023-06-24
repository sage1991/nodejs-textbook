import { datasource } from "../core/datasource"
import { User } from "../entity"

export const userRepository = datasource.getRepository(User)
