import { ChatRoomUser } from "./../../database/entity/chat/ChatRoomUser";
import { ChatRoom } from "./../../database/entity/chat/ChatRoom";
import { User } from "./../../database/entity/chat/User";
import { myDataSource } from "./../../database/data-source";
import { mapResCode } from "./../../serverConfig/mapResCode";
import { Request, Response } from "express";
import { baseResponse } from "./../../helpers/baseResponse/baseResponse";
import _ from "lodash";
import { uuid } from "uuidv4";
import dayjs from "dayjs";
import { ChatMessage } from "../../database/entity/chat/ChatMessage";
import { genMessage } from "../../helpers/paragraphs/genMessage";

export const create = async (req: Request, res: Response) => {
  try {
    const responseCreateUser = await createUser();
    const responseCreateChatRoom = await createChatRoom(req);
    res.json(
      baseResponse(
        mapResCode.success.code,
        { responseCreateUser, responseCreateChatRoom },
        "Create seed success"
      )
    );
  } catch (error) {
    res.json(baseResponse(error, null, error.sqlMessage));
  }
};

const createUser = async () => {
  const [dataUser, totalUser] = await myDataSource
    .getRepository(User)
    .findAndCount();
  if (totalUser === 0) {
    const repositoryUser = myDataSource.getRepository(User);
    const userEntity = [
      { name: "FullStack" },
      { name: "FrontEnd" },
      { name: "BackEnd" },
      { name: "Mobile Dev" },
      { name: "Software Dev" },
      { name: "Game Dev" },
      { name: "Tester" },
      { name: "UX/UI" },
      { name: "Project Manager" },
    ];
    await repositoryUser.save(userEntity);
    return { position: "create User success" };
  } else {
    return { position: "user has database" };
  }
};

const createChatRoom = async (req: Request) => {
  const { maxChatRoom, maxChatMessage } = req.query;
  for (let index = 0; index < Number(maxChatRoom); index++) {
    const chatRoom = new ChatRoom();
    chatRoom.chanelId = uuid();
    chatRoom.title = uuid();
    chatRoom.chatRoomType = "group";
    const chatRoomResult = await myDataSource.manager.save(chatRoom);
    const [user, totalUser] = await myDataSource
      .getRepository(User)
      .findAndCount({ select: ["id"] });
    for (
      let index = 0;
      index < 2 + Math.floor(Math.random() * (totalUser - 2));
      index++
    ) {
      const chatRoomUser = new ChatRoomUser();
      chatRoomUser.userId = index + 1;
      chatRoomUser.chatRoomId = chatRoomResult.id;
      chatRoomUser.joinAt = new Date(
        dayjs()
          .subtract(Math.floor(Math.random() * 10), "hours")
          .format()
      );
      chatRoomUser.leaveAt = new Date();
      const resultChatRoomUser = await myDataSource.manager.save(chatRoomUser);
    }

    const userInChatRoomUser = await myDataSource
      .getRepository(ChatRoomUser)
      .find({
        select: ["userId"],
        where: { chatRoomId: chatRoomResult.id },
      });
    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");
    console.log("userInChatRoomUser", userInChatRoomUser);
    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");
    const arrayUserInChatRoomUser = userInChatRoomUser.map((item) => {
      return item.userId;
    });

    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");
    console.log("arrayUserInChatRoomUser", arrayUserInChatRoomUser);
    console.log(
      "Math.floor(Math.random() * arrayUserInChatRoomUser.length + 1)",
      Math.floor(Math.random() * arrayUserInChatRoomUser.length + 1)
    );
    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");
    console.log("************************************************");

    for (let index = 0; index < Number(maxChatMessage); index++) {
      const chatMessage = new ChatMessage();
      chatMessage.replyId = null;
      chatMessage.chatRoomId = chatRoomResult.id;
      chatMessage.userId =
        arrayUserInChatRoomUser[
          Math.floor(Math.random() * arrayUserInChatRoomUser.length)
        ];
      chatMessage.massageType = "text";
      chatMessage.value = genMessage();
      console.log("=======================================");
      console.log("=======================================");
      console.log("=======================================");
      console.log("=======================================");
      console.log("chatMessage", chatMessage);
      console.log("=======================================");
      console.log("=======================================");
      console.log("=======================================");
      console.log("=======================================");
      const resultChatRoomUser = await myDataSource.manager.save(chatMessage);
    }
  }
  return { chatRoom: null };
};
