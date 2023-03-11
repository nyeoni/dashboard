import styled from 'styled-components';
import { ReactComponent as Logo } from '../../public/logo_header.svg';

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0 16px;

  background-color: ${(props) => props.theme.colors.header};
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}
