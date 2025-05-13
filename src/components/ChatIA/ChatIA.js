import React, { useEffect, useState } from "react";
import {
  Widget,
  addResponseMessage,
  renderCustomComponent,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
//import { TailSpin } from "react-loader-spinner";

const API_DEFAULT = "https://back-chatpbi-q2nhgfzuoq-uc.a.run.app/";

// const LoadingMessage = () => (
//   <div className="loading-message">
//     <TailSpin height="20" width="20" color="blue" ariaLabel="loading" />
//     {/* <span>Cargando...</span> */}
//   </div>
// );

const ChatComponent = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState(null);

  useEffect(() => {
    addResponseMessage("Bienvenido al asistente");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    setLoading(true);

    // const loadingMessageId = renderCustomComponent(LoadingMessage, {}, true);
    setLoadingMessageId(loadingMessageId);
    console.log(loadingMessageId, "Este id del mensaje ");
    try {
      const response = await fetch(`${API_DEFAULT}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await response.json();
      console.log("Response from server:", data); // Log detallado de la respuesta

      if (data.reply) {
        addResponseMessage(data.reply);
      } else {
        console.error("Error: No reply from server");
        addResponseMessage("Error: No reply from server");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      addResponseMessage("Error sending message");
    } finally {
      setLoading(false);
      const loadingMessageElement = document.querySelector(
        `[id="${loadingMessageId}"]`
      );
      if (loadingMessageElement) {
        loadingMessageElement.remove();
      }
    }
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat Casa Legado"
        subtitle="Pregunta sobre tus datos"
      />
    </div>
  );
};

export default ChatComponent;
