import styled, { keyframes } from 'styled-components'

const Loader = () => {
    return (
        <Main>
            <DotCont>
                <Dot1 />
            </DotCont>
            <DotCont>
                <Dot2 />
            </DotCont>
            <DotCont>
                <Dot3 />
            </DotCont>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    width: 50px;
    justify-content: space-between;
    align-items: center;
`

const DotCont = styled.div`
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Dot = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: grey;
`
const Dot1Keyframes = keyframes`
    0% {
        width: 0;
        height: 0;
    }
    50% {
        width: 14px;
        height: 14px;
    }
    100% {
        width: 0;
        height: 0;
    }
`

const Dot2Keyframes = keyframes`
    0% {
        width: 0;
        height: 0;
    }
    50% {
        width: 14px;
        height: 14px;
    }
    100% {
        width: 0;
        height: 0;
    }
`

const Dot3Keyframes = keyframes`
    0% {
        width: 0;
        height: 0;
    }
    50% {
        width: 14px;
        height: 14px;
    }
    100% {
        width: 0;
        height: 0;
    }
`

const Dot1 = styled(Dot)`
    animation: ${Dot1Keyframes} 2s linear infinite;
`

const Dot2 = styled(Dot)`
    animation: ${Dot2Keyframes} 2s linear infinite;
    animation-delay: 0.3s;
`

const Dot3 = styled(Dot)`
    animation: ${Dot3Keyframes} 2s linear infinite;
    animation-delay: 0.6s;
`

export default Loader