import styled from "@emotion/styled"

export const Loader: React.FC = () => {
    return <LoaderUi>loading ...</LoaderUi>
}

const LoaderUi = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
}))