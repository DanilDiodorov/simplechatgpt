import { useState } from 'react'
import * as S from './styles'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { socket } from './socket'
import { useEffect } from 'react'
import Loader from './Loader'
import { animateScroll } from 'react-scroll'

const App = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [canSend, setCanSend] = useState(true)

    const sendHandler = () => {
        if (canSend) {
            setMessages([
                ...messages,
                {
                    isMy: true,
                    text,
                },
            ])
            socket.emit('message', text)
            setLoading(true)
            setText('')
        }
    }

    const enterHandler = (e) => {
        if (e.keyCode === 13) sendHandler()
    }

    useEffect(() => {
        socket.on('message', (data) => {
            setLoading(false)
            setMessages([
                ...messages,
                {
                    isMy: false,
                    text: data,
                },
            ])
        })

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
            <S.Chat>
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
