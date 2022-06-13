import { ChatMessage } from "./ChatMessage";
import { ChatRoomUser } from "./ChatRoomUser";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
} from "typeorm";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chanelId: string;

  @Column()
  title: string;

  @Column()
  chatRoomType: string;


  // countRead: number;
  // @AfterLoad()
  // setComputed() {
  //   // this.fullName = this.firstName + " " + this.lastName;
  // }

  // 1 to many
  @OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.chatRoom, {
    cascade: true,
  })
  chatRoomUser: ChatRoomUser[];
  // 1 to many

  // 1 to many
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chatRoom, {
    cascade: true,
  })
  chatMessage: ChatMessage[];
  // 1 to many

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
