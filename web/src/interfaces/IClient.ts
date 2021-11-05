import IPowerPlantParticipation from './IPowerPlantParticipation';

interface IClient {
  numeroCliente: number;
  nomeCliente: string;
  usinas: IPowerPlantParticipation[];
}

export default IClient;
