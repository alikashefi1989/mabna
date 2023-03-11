import styled from "@emotion/styled"
import { BsSearch } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { onChange } from '../../redux/globalSearchSlice';
import { RootState } from "../../redux/store";

const Header = (): JSX.Element => {
    const searchValue = useSelector((state: RootState) => state.globalSearch.value)
    const dispatch = useDispatch()

    return <HeaderWrapper>
        <TitleWrapper>لیست دارایی ها</TitleWrapper>
        <InputWrapper>
            <SearchIconWrapper>
                <BsSearch />
            </SearchIconWrapper>
            <Input
                type='text'
                value={searchValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(onChange(event.target.value))}
            />
        </InputWrapper>
    </HeaderWrapper>
}

export default Header

const HeaderWrapper = styled.div(() => ({
    direction: 'rtl',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBlock: '15px',
    paddingInline: '25px',
    margin: 0,
    backgroundColor: '#232635',
}))

const TitleWrapper = styled.div(() => ({
    direction: 'rtl',
    boxSizing: 'border-box',
    width: '20%',
    height: '100%',
    fontSize: '15px',
    fontWeight: 600,
    color: 'white',
    padding: 0,
    margin: 0,
    textAlign: 'right',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}))

const InputWrapper = styled.div(() => ({
    direction: 'rtl',
    boxSizing: 'border-box',
    width: '80%',
    height: '50px',
    position: 'relative',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#474e6a',
    outline: 'none',
    borderRadius: '5px',
}))

const Input = styled.input(() => ({
    direction: 'rtl',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    fontSize: '14px',
    fontWeight: 500,
    color: 'white',
    padding: 0,
    paddingRight: '50px',
    paddingLeft: '10px',
    margin: 0,
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
}))

const SearchIconWrapper = styled.div(() => ({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '50px',
    height: '50px',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    outline: 'none',
}))