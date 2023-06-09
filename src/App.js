import { useState } from 'react'
import * as S from './styles'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useEffect } from 'react'
import Loader from './Loader'
import { animateScroll } from 'react-scroll'
import { io } from 'socket.io-client'
import randomstring from 'randomstring'
import game from './particles'

let messagesTemp = []
let isMounted = false
let socket
let uid = randomstring.generate()
let isSending = false
let currentMessage = ''
let reconnecting = null
let waiting = false
let newMessage = []
let recievingMessage = ''

const App = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [canSend, setCanSend] = useState(true)
    const [contextMenu, setContextMenu] = useState(false)
    const [status, setStatus] = useState('online')

    const sendHandler = () => {
        if (canSend && !waiting) {
            messagesTemp = [
                ...messages,
                {
                    isMy: true,
                    text,
                },
            ]
            currentMessage = text
            setMessages(messagesTemp)
            isSending = true
            setLoading(true)
            setText('')
            waiting = true
        }
    }

    const deleteHandler = () => {
        setMessages([])
        messagesTemp = []
        socket.emit('stop', uid)
        socket.emit('delete', uid)
    }

    const handleTabClose = () => {
        socket.emit('stop', uid)
        socket.emit('deleteUser', uid)
    }

    const stopHandler = () => {
        socket.emit('stop', uid)
    }

    const enterHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            sendHandler()
        }
    }

    useEffect(() => {
        const textarea = document.querySelector('.input')
        if (textarea.scrollHeight > textarea.offsetHeight) {
            let height = textarea.scrollHeight
            if (textarea.scrollHeight > 120) {
                height = 110
            } else {
                textarea.style.height = 'auto'
            }
            textarea.style.height = height - 25 + 'px'
        } else {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight - 25 + 'px'
        }
    }, [text])

    useEffect(() => {
        if (isMounted === false) {
            setInterval(() => {
                if (isSending)
                    socket.emit(
                        'message',
                        { uid, text: currentMessage },
                        (response) => {
                            if (response === 'recieved') isSending = false
                        }
                    )
            }, 500)
            window.addEventListener('beforeunload', handleTabClose)
            document.addEventListener('click', () => {
                setContextMenu(false)
            })
            window.addEventListener('resize', () => {
                let main = document.querySelector('.main')
                main.style.width = window.innerWidth + 'px'
                main.style.height = window.innerHeight + 'px'
                animateScroll.scrollToBottom({
                    smooth: false,
                    duration: 0,
                    containerId: 'ContainerElementID',
                })
            })
            setMessages(messagesTemp)
            socket = io(
                process.env.NODE_ENV === 'production'
                    ? 'https://simplechatgpt-api.onrender.com'
                    : 'http://localhost:10000',
                {
                    reconnection: true,
                    reconnectionDelay: 500,
                }
            )
            socket.on('message', (data) => {
                if (data.uid === uid) {
                    if (data.message !== null) {
                        setLoading(false)
                        recievingMessage += data.message
                        newMessage = [
                            ...messagesTemp,
                            {
                                isMy: false,
                                text: recievingMessage,
                            },
                        ]
                        setMessages(newMessage)
                    } else {
                        messagesTemp = newMessage
                        socket.emit('recieved', uid)
                        waiting = false
                        recievingMessage = ''
                    }
                }
            })
            socket.on('connect_error', () => {
                if (reconnecting === null) {
                    messagesTemp = [
                        ...messagesTemp,
                        {
                            isMy: false,
                            text: 'Извините, произошла ошибка подключения к серверу.\n\nИдет повторное подключение...',
                        },
                    ]
                    setMessages(messagesTemp)
                    setLoading(true)
                    reconnecting = true
                }
                setStatus('offline')
            })
            socket.io.on('reconnect', () => {
                if (reconnecting === true) {
                    messagesTemp = [
                        ...messagesTemp,
                        {
                            isMy: false,
                            text: 'Соединение восстановлено!',
                        },
                    ]
                    setMessages(messagesTemp)
                    if (!waiting) setLoading(false)
                    reconnecting = null
                }
                setStatus('online')
            })
            game()
        }
        isMounted = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTimeout(() => {
            animateScroll.scrollToBottom({
                smooth: true,
                duration: 200,
                containerId: 'ContainerElementID',
            })
        }, 0)
    }, [messages])

    useEffect(() => {
        if (loading === true || text.trim() === '' || waiting === true)
            setCanSend(false)
        else setCanSend(true)
    }, [loading, text])

    return (
        <S.Main className="main">
            {/* <S.BGImage src="https://trafaret-decor.ru/sites/default/files/2022-12/Технический%20фон%20%283%29.jpg" /> */}
            <S.Canvas id="canvas"></S.Canvas>
            <S.Chat>
                <S.Header>
                    <S.HeaderLeft>
                        <S.HeaderImage src="https://ujasntkfphywizsdaapi.supabase.co/storage/v1/render/image/public/content/app_logos/ac41ab08-934f-44e3-bc01-655b17404600.png?width=900&height=0&quality=85&resize=contain" />
                        <S.HeaderNameStatus>
                            <S.HeaderName>Karen</S.HeaderName>
                            <S.HeaderStatus>{status}</S.HeaderStatus>
                        </S.HeaderNameStatus>
                    </S.HeaderLeft>
                    <S.HeaderRight>
                        <S.MoreIcon
                            sx={{ fontSize: 40 }}
                            onClick={() =>
                                setTimeout(
                                    () => setContextMenu(!contextMenu),
                                    0
                                )
                            }
                        />
                        <S.ContextMenu contextMenu={contextMenu}>
                            <S.ContextMenuList>
                                <S.ContextMenuItem
                                    onClick={() => deleteHandler()}
                                >
                                    Удалить
                                </S.ContextMenuItem>
                                <S.ContextMenuItem
                                    onClick={() => stopHandler()}
                                >
                                    Остановить
                                </S.ContextMenuItem>
                            </S.ContextMenuList>
                        </S.ContextMenu>
                    </S.HeaderRight>
                </S.Header>
                <S.Messages id="ContainerElementID">
                    {messages.map((message) => {
                        return (
                            <S.Message isMy={message.isMy}>
                                {message.text}
                            </S.Message>
                        )
                    })}
                    {loading ? (
                        <S.Message isMy={false}>
                            <Loader />
                        </S.Message>
                    ) : (
                        <></>
                    )}
                </S.Messages>
                <S.Footer className="footer">
                    <S.Input
                        placeholder="Сообщение"
                        className="input"
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
