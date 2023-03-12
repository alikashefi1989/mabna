import styled from "@emotion/styled"

export interface ContentProps {
    children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }): JSX.Element => {
    return <ContentWrapper>
        {children}
    </ContentWrapper>
}

export default Content


const ContentWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    minHeight: 'calc(100vh - 80px)',
    height: 'max-content',
    backgroundColor: '#f6f6fa',
    paddingInline: '50px',
    paddingBlock: '15px',
    margin: 0,
}))