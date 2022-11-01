import db from "../../utils/dbConnect";
import Message from "../../models/message";

import { v4 } from "uuid";
db();

let getDate = () => {
  const time = new Date();
  return {
    day: time.getDate(),
    month: time.getMonth(),
    hours: time.getHours(),
    minutes: time.getMinutes(),
  };
};

export default function handler(req, res) {
  const { message } = req.query;
  const newMessage = new Message({
    id: v4(),
    content: message,
    date: getDate(),
  });
  newMessage.save((error) => {
    if (error == null) res.status(200).json({ status: 1 });
    else res.status(200).json({ status: 0, error: "Повторите попытку позже!" });
  });
}
