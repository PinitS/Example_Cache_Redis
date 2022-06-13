import { ChatMessage } from "./ChatMessage";
import { ChatRoomUser } from "./ChatRoomUser";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  
  // 1 to many
  @OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.user, {
    cascade: true,
  })
  chatRoomUser: ChatRoomUser[];
  // 1 to many

  // 1 to many
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user, {
    cascade: true,
  })
  chatMessage: ChatMessage[];
  // 1 to many

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
