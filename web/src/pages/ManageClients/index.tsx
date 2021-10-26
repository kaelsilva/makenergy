import React, { useEffect, useState } from 'react';
import { Button, FormControl } from '@mui/material';
import dadosClientes from '../../assets/JSON_data/dadosClientes.json';

interface IPowerPlantParticipation {
  usinaId: number;
  percentualDeParticipacao: number;
}

interface IClient {
  numeroCliente: number;
  nomeCliente: string;
  usinas: IPowerPlantParticipation[];
}

const ManageClients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);

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

  return (
    <div>
      {clients.map((client) => (
        <p>{client.nomeCliente}</p>
      ))}
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

      <FormControl id="delete-client">
        <h2>Delete</h2>
        <Button type="submit" onClick={() => deleteClient(55)}>
          Delete
        </Button>
      </FormControl>
    </div>
  );
};

export default ManageClients;
