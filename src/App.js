import { useState } from 'react'
import * as S from './styles'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useEffect } from 'react'
import Loader from './Loader'
import { animateScroll } from 'react-scroll'
import { io } from 'socket.io-client'

let messagesTemp = []
let isMounted = false
let socket
const App = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [canSend, setCanSend] = useState(true)
    const [contextMenu, setContextMenu] = useState(false)

    const sendHandler = () => {
        if (canSend) {
            messagesTemp = [
                ...messages,
                {
                    isMy: true,
                    text,
                },
            ]
            setMessages(messagesTemp)
            socket.emit('message', text)
            setLoading(true)
            setText('')
        }
    }

    const deleteHandler = () => {
        setMessages([])
        messagesTemp = []
        setContextMenu(false)
        socket.emit('delete')
    }

    const enterHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            sendHandler()
        }
    }

    useEffect(() => {
        if (isMounted === false) {
            socket = io(
                process.env.NODE_ENV === 'production'
                    ? 'https://simplechatgpt-api.onrender.com'
                    : 'http://localhost:10000',
                {
                    reconnection: true, // Включить повторное подключение
                    reconnectionAttempts: 10, // Количество попыток переподключения
                    reconnectionDelay: 1000, // Задержка между попытками переподключения
                }
            )
            socket.on('message', (data) => {
                setLoading(false)
                messagesTemp = [
                    ...messagesTemp,
                    {
                        isMy: false,
                        text: data,
                    },
                ]
                setMessages(messagesTemp)
            })
            socket.on('connect_error', () => {
                setLoading(true)
                messagesTemp = [
                    ...messagesTemp,
                    {
                        isMy: false,
                        text: 'Извините, произошла ошибка подключения к серверу. Идет повторное подключение...\n\n\nОбратите внимание, что контекст был потерян.',
                    },
                ]
                setMessages(messagesTemp)
                setLoading(true)
            })
            // socket.on('disconnect', () => {
            //     setLoading(true)
            //     messagesTemp = [
            //         ...messagesTemp,
            //         {
            //             isMy: false,
            //             text: 'Извините, произошла ошибка подключения к серверу. Идет повторное подключение...\n\n\nОбратите внимание, что контекст был потерян.',
            //         },
            //     ]
            //     setMessages(messagesTemp)
            //     setLoading(true)
            // })
            // socket.io.on('reconnect', () => {
            //     messagesTemp = [
            //         ...messagesTemp,
            //         {
            //             isMy: false,
            //             text: 'Соединение восстановлено!',
            //         },
            //     ]
            //     setLoading(false)
            //     setMessages(messagesTemp)
            // })
        }
        isMounted = true
    }, [])

    useEffect(() => {
        setTimeout(() => {
            animateScroll.scrollToBottom({
                smooth: true,
                containerId: 'ContainerElementID',
            })
        }, 0)
    }, [messages])

    useEffect(() => {
        if (loading === true || text.trim() === '') setCanSend(false)
        else setCanSend(true)
    }, [loading, text])

    return (
        <S.Main>
            <S.BGImage src="https://catherineasquithgallery.com/uploads/posts/2021-02/1613680438_26-p-fon-dlya-prezentatsii-programmirovanie-32.png" />
            <S.Chat>
                <S.Header>
                    <S.HeaderLeft>
                        <S.HeaderImage src="https://ujasntkfphywizsdaapi.supabase.co/storage/v1/render/image/public/content/app_logos/ac41ab08-934f-44e3-bc01-655b17404600.png?width=900&height=0&quality=85&resize=contain" />
                        <S.HeaderNameStatus>
                            <S.HeaderName>Karen</S.HeaderName>
                            <S.HeaderStatus>online</S.HeaderStatus>
                        </S.HeaderNameStatus>
                    </S.HeaderLeft>
                    <S.HeaderRight>
                        <S.MoreIcon
                            onClick={() => setContextMenu(!contextMenu)}
                        />
                        <S.ContextMenu contextMenu={contextMenu}>
                            <S.ContextMenuList>
                                <S.ContextMenuItem
                                    onClick={() => deleteHandler()}
                                >
                                    Удалить
                                </S.ContextMenuItem>
                            </S.ContextMenuList>
                        </S.ContextMenu>
                    </S.HeaderRight>
                </S.Header>
                <S.Messages id="ContainerElementID">
                    {messages.map((message) => (
                        <S.Message isMy={message.isMy}>
                            {message.text}
                        </S.Message>
                    ))}
                    {loading ? (
                        <S.Message isMy={false}>
                            <Loader />
                        </S.Message>
                    ) : (
                        <></>
                    )}
                </S.Messages>
                <S.Footer>
                    <S.Input
                        placeholder="Сообщение"
                        value={text}
                        onChange={(data) => setText(data.currentTarget.value)}
                        onKeyDown={(e) => enterHandler(e)}
                    />
                    <S.Send onClick={(e) => sendHandler(e)} canSend={canSend}>
                        <SendOutlinedIcon />
                    </S.Send>
                </S.Footer>
            </S.Chat>
            <S.GlobalStyle />
        </S.Main>
    )
}

export default App
