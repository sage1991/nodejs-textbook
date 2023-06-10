import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 20
  })
  @Index("name_unique_index", { unique: true })
  name: string

  @Column({
    type: "int",
    unsigned: true
  })
  age: number

  @Column({
    type: "tinyint"
  })
  married: boolean
}
