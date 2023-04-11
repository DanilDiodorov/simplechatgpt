import styled, { createGlobalStyle } from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const colors = {
    blue: '#2155BF',
    white: '#fff',
    grey: '#ECEFF8',
}

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    * {
        font-family: 'Open Sans', sans-serif;
    }
`

export const Main = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const BGImage = styled.img`
    position: absolute;
    width: 100vw;
`

export const Chat = styled.div`
    width: 600px;
    height: 95%;
    background-color: ${colors.grey};
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 0 20px;
    z-index: 1;
    box-shadow: 0 0 40px rgb(0, 0, 0, 0.3);

    @media (max-width: 700px) {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
`

export const Messages = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    padding-top: 5px;
`

export const Input = styled.textarea`
    height: 35px;
    width: 83%;
    padding: 15px 20px 0 20px;
    resize: none;
    border: none;
    background-color: ${colors.white};
    border-radius: 20px;
    font-size: 18px;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);

    &:focus {
        outline: none;
    }
`

export const Send = styled.div`
    color: ${colors.white};
    width: 50px;
    height: 50px;
    background-color: ${({ canSend }) => (canSend ? colors.blue : 'grey')};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: ${({ canSend }) => (canSend ? 'pointer' : 'auto')};
    }
`

export const Message = styled.div`
    max-width: 60%;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    border-radius: 30px;
    padding: 20px;
    align-self: ${({ isMy }) => (isMy ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMy }) => (isMy ? colors.blue : colors.white)};
    color: ${({ isMy }) => (isMy ? colors.white : 'black')};
    margin-top: 10px;
    white-space: pre-wrap;
`

export const Canvas = styled.canvas`
    position: absolute;
    z-index: 0;
`

export const Header = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`
export const HeaderImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`
export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`
export const HeaderRight = styled.div``
export const HeaderNameStatus = styled.div`
    margin-left: 15px;
`
export const HeaderName = styled.div`
    font-size: 18px;
    font-weight: 500;
`
export const HeaderStatus = styled.div`
    color: grey;
    font-size: 14px;
`
export const ContextMenu = styled.div`
    display: ${({ contextMenu }) => (contextMenu ? 'block' : 'none')};
    width: 100px;
    background-color: ${colors.white};
    position: absolute;
    border-radius: 10px;
    margin-left: -80px;
`
export const ContextMenuList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`
export const ContextMenuItem = styled.li`
    padding: 15px;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        background-color: #c0c0c0;
    }
`
export const MoreIcon = styled(MoreVertIcon)`
    &:hover {
        cursor: pointer;
    }
`
