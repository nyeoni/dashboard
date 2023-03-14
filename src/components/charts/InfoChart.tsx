import styled from 'styled-components';
import Pannel from '../common/Pannel';
import Col from '../common/Col';
import Row from '../common/Row';

type Info = {
  name: string;
  value: string;
};

interface InfoChartProps {
  infos: Info[];
}

const InfoChart: React.FC<InfoChartProps> = ({ infos, ...props }) => {
  return (
    <Pannel title="Application Information" {...props}>
      <Row justifyContent="space-between" gap="8px">
        {infos.map((info, index) => {
          return index != infos.length - 1 ? (
            <>
              <InfoItem name={info.name} value={info.value} />
              <InfoDivider />
            </>
          ) : (
            <InfoItem name={info.name} value={info.value} />
          );
        })}
      </Row>
    </Pannel>
  );
};

export default InfoChart;

const InfoItem: React.FC<Info> = ({ name, value, ...props }) => {
  return (
    <Col alignItems="flex-start" gap="8px" ratio={1}>
      <InfoName>{name}</InfoName>
      <InfoValue alignSelf="flex-end">{value}</InfoValue>
    </Col>
  );
};

const InfoDivider = styled.div`
  border-right: solid 0.5px rgba(255, 255, 255, 0.2);
`;

const InfoName = styled(Row)`
  font-size: 14px;

  color: ${(props) => props.theme.colors.onPrimary};
`;

const InfoValue = styled(Row)`
  font-size: 32px;
  font-weight: bold;

  color: ${(props) => props.theme.colors.onPrimary};
`;

const ItemTitle = styled.div``;
