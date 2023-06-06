import { Sequelize } from "sequelize-typescript"

import { config } from "./config"
import { User } from "./model/User"
import { Comment } from "./model/Comment"

export const sequelize = new Sequelize({ ...config, models: [User, Comment] })
