import db from "../../utils/dbConnect";
import Message from "../../models/message";

db();

export default async function handler(req, res) {
  const findMessage = await Message.find({}, { _id: 0, __v: 0 });
  if (findMessage.length != 0) res.status(200).json({ findMessage, status: 1 });
  else res.status(200).json({ status: 0, error: "Нет сообщений!" });
}
