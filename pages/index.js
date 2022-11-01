import { useState } from "react";
export default function Home(messageList) {
  const [messageContent, setMessageContent] = useState("");

  let sendMessage = async () => {
    setMessageContent("");
    await (
      await fetch(
        "http://localhost:3000/api/sendMessage?message=" + messageContent
      )
    ).json();
  };

  return (
    <div className="container">
      <div>
        <div className="sendMessageForm">
          <input
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
          />
          <button onClick={sendMessage}>send</button>
        </div>
        <div className="messageList">
          {!messageList.status && <div>{messageList.error}</div>}
          {messageList.findMessage.map((e) => {
            return (
              <div key={e.key} className="message border my-3 p-3">
                <div>
                  месяц: {e.date.month} день:{e.date.day}
                </div>
                <div>
                  {e.date.hours}:{e.date.minutes}
                </div>
                <a className="messageContent">{e.content}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const messageList = await (
    await fetch("http://localhost:3000/api/getMessage")
  ).json();
  return {
    props: messageList,
  };
}
