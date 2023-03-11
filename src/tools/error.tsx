import styled from "@emotion/styled"

interface ErrorProps {
    onTry: () => void;
}

export const Error: React.FC<ErrorProps> = ({ onTry }) => {
    return <ErrorUi>
        <RetryBtn onClick={() => onTry()}>Try Again</RetryBtn>
    </ErrorUi>
}

const ErrorUi = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
}))

const RetryBtn = styled.div(() => ({
    width: '100px',
    height: '50px',
    borderRadius: '5px',
    backgroundColor: 'red',
    color: 'white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
        fontWeight: 700
    }
}))