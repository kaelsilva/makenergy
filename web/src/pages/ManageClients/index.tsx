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
  EditButton,
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
  const [createUserForm, setCreateUserForm] = useState<IClient>({
    nomeCliente: '',
    numeroCliente: 0,
    usinas: [],
  });
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

    const generatedNumeroCliente = Number((Math.random() * 3000).toFixed());

    setCreateUserForm({
      ...createUserForm,
      numeroCliente: generatedNumeroCliente,
    });
    createClient(createUserForm);
    setCreationBox(false);
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
          <InputText
            type="text"
            placeholder="Nome"
            onChange={(e) =>
              setCreateUserForm({
                ...createUserForm,
                nomeCliente: e.currentTarget.value,
              })
            }
          />
          <Select
            labelId="select-power-plant"
            id="power-plant-select"
            label="variable"
            defaultValue="1"
            onChange={(e) =>
              setCreateUserForm({
                ...createUserForm,
                usinas: [
                  {
                    usinaId: Number(e.target.value),
                    percentualDeParticipacao: 0,
                  },
                ],
              })
            }
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
            onChange={(e) => {
              setCreateUserForm({
                ...createUserForm,
                usinas: [
                  {
                    usinaId: 0,
                    percentualDeParticipacao: Number(e.currentTarget.value),
                  },
                ],
              });
            }}
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

            <EditButton onClick={() => setCreationBox(!creationBox)}>
              Editar
            </EditButton>
          </ListItemText>
        ))}
      </List>

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
