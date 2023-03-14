import { useSpot } from '../../hooks/useSpot';
import InfoChart from '../charts/InfoChart';

const ApplicationInfoChart: React.FC = () => {
  const [inactAgent] = useSpot('inact_agent');
  const [actAgent] = useSpot('act_agent');
  const [actSQL] = useSpot('act_sql');
  const [host] = useSpot('host');

  const infos = [
    { name: 'ACTIVE_AGENT', value: actAgent?.data },
    { name: 'INACTIVE_AGENT', value: inactAgent?.data },
    { name: 'ACTIVE_SQL', value: actSQL?.data },
    { name: 'HOST', value: host?.data },
  ];

  // TODO : infos typescript handling
  return <InfoChart infos={infos} style={{ flexGrow: 1 }} />;
};

export default ApplicationInfoChart;
