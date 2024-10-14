import { useEffect, useRef, useState } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import SocketService from "@/services/socket"
import { validWSURL } from "@/utils/validate"

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [WebSocketUrl, setWebSocketUrl] = useState<string>('ws://127.0.0.1:3000')
  const [messageInput, setMessageInput] = useState<string>('')
  const [socketService, setSocketService] = useState<SocketService | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [messages, setMessages] = useState<string[] | null>([])
  const refInputMessage = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      socketService?.disconnect();
    };
  }, []);

  const connect = () => {
    if (!validWSURL(WebSocketUrl)) {
      onError()
      return
    }

    setIsLoading(true)
    const socketService = new SocketService(WebSocketUrl);

    socketService.connect(
      onConnect,
      onDisconnect,
      onMessages,
      (error) => {
        console.error('Erro no Socket.io', error);
      }
    );

    setSocketService(socketService);
  }

  const disconnect = () => {
    socketService?.disconnect()
  }

  const onError = () => {
    setError(true)
    setTimeout(() => setError(false), 500);
  }

  const onConnect = () => {
    console.log("conectou!!!")
    setMessages([])
    setIsLoading(false)
    setIsConnected(true)
  }

  const onDisconnect = () => {
    setMessages([])
    setIsLoading(false)
    setIsConnected(false)
  }

  const onMessages = (data: string) => {
    console.log(data)
    setMessages((prev) => (
      prev !== null ?
      [...prev, data] :
      [data]
    ));
  }

  const sendMessage = () => {
    if (messageInput.trim() === '') {
      onError()
      return
    }
    socketService?.send('chat message', messageInput);
    setMessageInput('');

    //focus
    refInputMessage.current?.focus();
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-indigo-300">
      <div className="shadow bg-white p-4 rounded-lg min-w-[450px] flex flex-col gap-4">

        {!isConnected &&
          <form onSubmit={(e) => { e.preventDefault(); connect() }} className="flex flex-col gap-4">
            <Input
              disabled={isLoading}
              placeholder="Endereço do WebSocket"
              value={WebSocketUrl}
              onChange={(e) => setWebSocketUrl(e.target.value)} />
            <Button disabled={isLoading} error={error}>
              {isLoading ? 'Conectando...' : 'Conectar'}
            </Button>
          </form>
        }

        {isConnected &&
          <>
            <div className="h-[350px] rounded-md overflow-y-auto pb-4 flex flex-col items-start gap-2">
              {
                messages &&
                messages.map((message, index) => (
                  <div key={index} className="p-2 bg-gray-300 rounded-lg">{message}</div>
                ))
              }
            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-4">
              <Input
                ref={refInputMessage}
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                disabled={isLoading}
                placeholder="Mensagem" />
              <Button disabled={isLoading} error={error} className="flex-1">
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
            <Button disabled={isLoading} onClick={() => disconnect()} className="bg-red-600 hover:bg-red-800">
              Desconectar
            </Button>
          </>
        }


      </div>
    </div>
  )
}