import styled from 'styled-components';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | string;
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gap?: number | string;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'auto';
  flexBasis?: 'auto' | string | number;
  style?: React.CSSProperties;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  flex-grow: ${(props) => props.ratio};
  flex-basis: ${(props) => props.flexBasis};
  gap: ${(props) => props.gap};
  align-self: ${(props) => props.alignSelf};
`;

export default Row;
