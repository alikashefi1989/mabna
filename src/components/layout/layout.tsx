import styled from "@emotion/styled"
import Header from './header'
import Content from './content'

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
    return <LayoutWrapper>
        <Header />
        <Content children={children} />
    </LayoutWrapper>
}

export default Layout

const LayoutWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    overflowY: 'auto',
}));