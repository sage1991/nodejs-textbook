import { datasource } from "../core/datasource"
import { UserEntity } from "../entity"

export const userRepository = datasource.getRepository(UserEntity)
