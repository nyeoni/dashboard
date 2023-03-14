import styled from 'styled-components';
import Col from './Col';

interface PannelProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
}

const Pannel = ({ children, title, ...props }: PannelProps) => {
  return (
    <Container {...props}>
      {title ? <Title>{title}</Title> : <></>}
      {children}
    </Container>
  );
};

export default Pannel;

const Container = styled(Col)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  padding: 20px;
`;

const Title = styled.div`
  display: flex;

  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.onPrimaryVariant};
`;
