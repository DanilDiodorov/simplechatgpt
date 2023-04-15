import styled, { createGlobalStyle } from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const colors = {
    blue: '#2155BF',
    white: '#fff',
    grey: '#ECEFF8',
}

export const GlobalStyle = createGlobalStyle`
    html body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    * {
        font-family: 'Open Sans', sans-serif;
    }
`

export const Main = styled.div`
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const BGImage = styled.img`
    position: absolute;
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    top: 0;
    left: 0;
`

export const Chat = styled.div`
    width: 600px;
    height: 95%;
    background-color: ${colors.grey};
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    box-shadow: 0 0 40px rgb(0, 0, 0, 0.3);
    overflow: hidden;
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`

export const Messages = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: thin;
    padding-left: 20px;
    padding-right: 20px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    @media (max-width: 700px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3px 20px 15px 20px;
    align-items: flex-end;

    @media (max-width: 700px) {
        padding: 3px 10px 8px 10px;
    }
`

export const Input = styled.textarea`
    width: 83%;
    padding: 13px 20px 0 20px;
    resize: none;
    border: none;
    background-color: ${colors.white};
    border-radius: 30px;
    font-size: 18px;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);

    &:focus {
        outline: none;
    }

    @media (max-width: 700px) {
        width: 75%;
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
    @media (max-width: 700px) {
        max-width: 80%;
    }
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
    padding: 10px 30px;
    border-bottom: 1px solid #ccc;

    @media (max-width: 700px) {
        padding: 5px 20px;
    }
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
    width: 200px;
    background-color: ${colors.white};
    position: absolute;
    border-radius: 10px;
    margin-left: -170px;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.3);
`
export const ContextMenuList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`
export const ContextMenuItem = styled.li`
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    transition: all 0.2s ease;
    &:hover {
        cursor: pointer;
        background-color: #c0c0c0;
    }
`
export const MoreIcon = styled(MoreVertIcon)`
    margin-top: 10px;
    color: #4b4b4b;
    &:hover {
        cursor: pointer;
    }
`
