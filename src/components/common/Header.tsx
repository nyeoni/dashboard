import styled from 'styled-components';
import { ReactComponent as Logo } from '../../img/logo_header.svg';

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0 20px;

  background-color: ${(props) => props.theme.colors.primaryVariant};
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}
