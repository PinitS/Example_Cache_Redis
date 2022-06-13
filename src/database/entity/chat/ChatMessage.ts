import { User } from "./User";
import { ChatRoom } from "./ChatRoom";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  replyId: number;

  // many to 1
  @Column()
  chatRoomId: number;
  @ManyToOne(() => ChatRoom, (chatRoomUser) => chatRoomUser.chatMessage, {
    onDelete: "CASCADE",
  })
  chatRoom: ChatRoom;
  // many to 1

  // many to 1
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.chatMessage, {
    onDelete: "CASCADE",
  })
  user: User;
  // many to 1

  @Column()
  massageType: string;

  @Column({ type: "text" })
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
