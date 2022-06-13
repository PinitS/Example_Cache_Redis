import { ChatRoom } from "./ChatRoom";
import { ChatMessage } from "./ChatMessage";
import { User } from "./User";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class ChatRoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatRoomId: number;
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatRoomUser, {
    onDelete: "CASCADE",
  })
  chatRoom: ChatRoom;

  @Column({ comment: "chatRoom Id" })
  userId: number;
  @ManyToOne(() => User, (user) => user.chatRoomUser, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({ type: "datetime", precision: 6 })
  joinAt: Date;

  @Column({ type: "datetime", precision: 6 })
  leaveAt: Date;

  // // 1 to many
  // @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chatRoomUser, {
  //   cascade: true,
  // })
  // chatMessage: ChatMessage[];
  // // 1 to many

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
