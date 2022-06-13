import { ChatMessage } from "./../../database/entity/chat/ChatMessage";
import { ChatRoomUser } from "./../../database/entity/chat/ChatRoomUser";
import { myDataSource } from "./../../database/data-source";
import { mapResCode } from "./../../serverConfig/mapResCode";
import { Request, Response } from "express";
import { baseResponse } from "./../../helpers/baseResponse/baseResponse";
import _ from "lodash";
import { ChatRoom } from "../../database/entity/chat/ChatRoom";

export const list = async (req: Request, res: Response) => {
  try {
    const { userId, roomId } = req.query;
    const chatMessage = await myDataSource
      .createQueryBuilder(ChatMessage, "chatMessage")
      .select("*")
      .addSelect(
        (qb) =>
          qb
            .select("COUNT(chatRoomId)", "countRead")
            .from(ChatRoomUser, "chatRoomUser")
            .where(`chatRoomUser.chatRoomId = ${roomId}`)
            .andWhere(`chatRoomUser.id != ${userId}`)
            .andWhere(`chatRoomUser.joinAt >= chatMessage.createdAt`),
        "countRead"
      )
      .where(`chatMessage.chatRoomId = ${roomId}`)
      .orderBy("chatMessage.id", "ASC")
      .getRawMany();
    res.json(
      baseResponse(mapResCode.success.code, { chatMessage }, "Example Create")
    );
  } catch (error) {
    res.json(baseResponse(error, null, error.sqlMessage));
  }
};
