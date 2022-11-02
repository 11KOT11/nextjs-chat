import { useState } from "react";
import absoluteUrl from "next-absolute-url";
export default function Home(messageList) {
  const [messageContent, setMessageContent] = useState("");

  let sendMessage = async () => {
    await (
      await fetch(
        window.location.href + "api/sendMessage?message=" + messageContent
      )
    ).json();
    setMessageContent("");
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

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req, req.headers.host);
  const messageList = await (await fetch(origin + "/api/getMessage")).json();
  return {
    props: messageList,
  };
}
