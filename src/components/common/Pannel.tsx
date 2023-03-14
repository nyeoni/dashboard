import styled from 'styled-components';

interface PannelProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
}

export default function Pannel({ children, title, ...props }: PannelProps) {
  return (
    <StyledContainer>
      {title ? <StyledTitle>{title}</StyledTitle> : <></>}
      {children}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  padding: 20px;
  color: ${(props) => props.theme.colors.onPrimaryVariant};
`;

const StyledTitle = styled.div`
  display: flex;

  padding-bottom: 20px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.onPrimary};
`;
