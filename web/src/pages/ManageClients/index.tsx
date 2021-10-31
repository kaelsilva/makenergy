import React, { FormEvent, useEffect, useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import {
  Button,
  Toolbar,
  LogoToolbar,
  List,
  ListItemText,
  DeleteButton,
  CreateButton,
  CreationContainer,
  InputText,
  H1,
} from './styles';
import dadosClientes from '../../assets/JSON_data/dadosClientes.json';
import logo from '../../assets/images/logo-Sharenergy-01.png';

interface IPowerPlantParticipation {
  usinaId: number;
  percentualDeParticipacao: number;
}

interface IPowerPlant {
  id: number;
}
interface IClient {
  numeroCliente: number;
  nomeCliente: string;
  usinas: IPowerPlantParticipation[];
}

const ManageClients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [creationBox, setCreationBox] = useState<boolean>(false);
  const [powerPlants, setPowerPlants] = useState<IPowerPlant[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  useEffect(() => {
    let clientData: IClient[] = [];
    dadosClientes.forEach((client) => {
      clientData = [
        ...clientData,
        {
          numeroCliente: client.numeroCliente,
          nomeCliente: client.nomeCliente,
          usinas: client.usinas,
        },
      ];
      setClients(clientData);
    });
  }, []);

  const createClient = (newClient: IClient): void => {
    let clientData: IClient[] = [];
    clients ? (clientData = clients) : [];
    setClients([...clientData, newClient]);
  };

  const deleteClient = (id: number): void => {
    let clientList: IClient[] = [];
    clients ? (clientList = clients) : [];
    const clientIndex = clientList.findIndex(
      (client) => client.numeroCliente === id
    );
    clientList.splice(clientIndex, 1);
    setClients([...clientList]);
  };

  const updateClient = (updatedClient: IClient): void => {
    let clientList: IClient[] = [];
    clients ? (clientList = clients) : [];

    const clientIndex = clientList.findIndex(
      (client) => client.numeroCliente === updatedClient.numeroCliente
    );
    clientList[clientIndex] = updatedClient;

    setClients([...clientList]);
  };

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    console.log(event.currentTarget);
    alert('teste');
  };

  return (
    <div>
      <Toolbar>
        <FiMenu size="48px" />
        <LogoToolbar src={logo} alt="Logo for the app" />
      </Toolbar>

      <CreateButton onClick={() => setCreationBox(!creationBox)}>
        Criar
      </CreateButton>

      {creationBox && (
        <CreationContainer onSubmit={(event) => handleForm(event)}>
          <H1>Novo cliente</H1>
          <InputText type="text" placeholder="Nome" />
          <Select
            labelId="select-power-plant"
            id="power-plant-select"
            label="variable"
            defaultValue="1"
            onChange={() => console.log('mudou')}
          >
            {powerPlants.map((powerPlant) => (
              <MenuItem value={powerPlant.id.toString()}>
                {powerPlant.id}
              </MenuItem>
            ))}
          </Select>
          <InputText
            type="text"
            placeholder="% de participação na usina (apenas números)"
          />
          <CreateButton type="submit">Confirmar criação</CreateButton>
        </CreationContainer>
      )}

      <List>
        {clients.map((client) => (
          <ListItemText id={client.numeroCliente.toString()}>
            {client.nomeCliente}
            <FormControl id="delete-client">
              <DeleteButton
                type="submit"
                onClick={() => deleteClient(client.numeroCliente)}
              >
                Deletar
              </DeleteButton>
            </FormControl>

            <CreateButton onClick={() => console.log('atualizar')}>
              Editar
            </CreateButton>
          </ListItemText>
        ))}
      </List>
      <FormControl id="create-client">
        <h2>Create</h2>
        <Button
          type="submit"
          onClick={() =>
            createClient({
              nomeCliente: 'Joãooo',
              numeroCliente: 55,
              usinas: [{ percentualDeParticipacao: 100, usinaId: 2 }],
            })
          }
        >
          Create
        </Button>
      </FormControl>

      <FormControl id="update-client">
        <h2>Update</h2>
        <Button
          type="submit"
          onClick={() =>
            updateClient({
              nomeCliente: 'João',
              numeroCliente: 55,
              usinas: [{ percentualDeParticipacao: 100, usinaId: 2 }],
            })
          }
        >
          Update
        </Button>
      </FormControl>
    </div>
  );
};

export default ManageClients;
