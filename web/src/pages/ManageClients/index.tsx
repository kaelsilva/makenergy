import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import { FiPlus, FiDelete } from 'react-icons/fi';
import Toolbar from '../../components/Toolbar';
import {
  List,
  ListItemText,
  DeleteButton,
  EditButton,
  CreateButton,
  CreationContainer,
  InputText,
  H1,
  EditContainer,
  CancelButton,
  NewButton,
  ListItemContainer,
  ButtonContainer,
  LabelAndInputContainer,
  Label,
  BodyContainer,
  ClientListContainer,
  FiPlusStyled,
  NewClientButton,
  BlurBackground,
} from './styles';
import Sidebar from '../../components/Sidebar';
import dadosClientes from '../../assets/JSON_data/dadosClientes.json';

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
  const [editBox, setEditBox] = useState<boolean>(false);
  const [createUserForm, setCreateUserForm] = useState<IClient>({
    nomeCliente: '',
    numeroCliente: 0,
    usinas: [],
  });
  const [clientEditForm, setClientEditForm] = useState<IClient>({
    nomeCliente: '',
    numeroCliente: 0,
    usinas: [],
  });
  const [powerPlants, setPowerPlants] = useState<IPowerPlant[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [selectablePowerPlants, setSelectablePowerPlants] = useState<
    IPowerPlant[]
  >([...powerPlants]);

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

  const handleEditForm = (event: FormEvent) => {
    event.preventDefault();
    updateClient(clientEditForm);
    setEditBox(false);
  };

  const handleUpdateButtonClick = (client: IClient) => {
    setEditBox(true);
    setClientEditForm(client);
  };

  const handleUpdatePowerPlantOnAlter = (
    event: SelectChangeEvent,
    usinaId: number
  ) => {
    const powerPlantIndex = clientEditForm.usinas.findIndex(
      (item) => item.usinaId === usinaId
    );

    const currentPowerPlants: IPowerPlantParticipation[] = [
      ...clientEditForm.usinas,
    ];

    const powerPlant = { ...currentPowerPlants[powerPlantIndex] };

    powerPlant.usinaId = Number(event.target.value);
    currentPowerPlants[powerPlantIndex] = powerPlant;
    setClientEditForm({
      ...clientEditForm,
      usinas: currentPowerPlants,
    });
  };

  const handleUpdatePowerPlantParticipationOnAlter = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    usinaId: number
  ): null => {
    const participationValue = Number(event.target.value);
    let maximumParticipationValue = 100;

    clients.forEach((client) => {
      if (client.numeroCliente !== clientEditForm.numeroCliente) {
        client.usinas.forEach((powerPlant) => {
          if (powerPlant.usinaId === usinaId) {
            maximumParticipationValue -= powerPlant.percentualDeParticipacao;
          }
        });
      }
    });

    if (
      Number.isNaN(participationValue) ||
      participationValue > maximumParticipationValue ||
      participationValue < 0
    ) {
      return null;
    }

    const powerPlantIndex = clientEditForm.usinas.findIndex(
      (item) => item.usinaId === usinaId
    );

    const currentPowerPlants: IPowerPlantParticipation[] = [
      ...clientEditForm.usinas,
    ];

    const powerPlant = { ...currentPowerPlants[powerPlantIndex] };

    powerPlant.percentualDeParticipacao = participationValue;
    currentPowerPlants[powerPlantIndex] = powerPlant;
    setClientEditForm({
      ...clientEditForm,
      usinas: currentPowerPlants,
    });
    return null;
  };

  const handleAddNewPowerPlantToClient = () => {
    const numPowerPlants = powerPlants.length;
    const possiblePowerPlants = [...powerPlants];
    let notFullLength = false;
    let missingId = 0;

    clientEditForm.usinas.forEach((item) => {
      possiblePowerPlants.forEach((item2) => {
        if (
          item.usinaId !== item2.id &&
          clientEditForm.usinas.length < numPowerPlants
        ) {
          notFullLength = true;
          missingId = item2.id;
        }
      });
    });

    if (
      (clientEditForm.usinas.length <= numPowerPlants && notFullLength) ||
      clientEditForm.usinas.length === 0
    ) {
      setClientEditForm({
        ...clientEditForm,
        usinas: [
          ...clientEditForm.usinas,
          {
            usinaId: missingId,
            percentualDeParticipacao: 0,
          },
        ],
      });
    }
  };

  const handleDeletePowerPlantFromClient = (usinaId: number): void => {
    const powerPlantIndex = clientEditForm.usinas.findIndex(
      (item) => item.usinaId === usinaId
    );

    const currentPowerPlants: IPowerPlantParticipation[] = [
      ...clientEditForm.usinas,
    ];

    currentPowerPlants.splice(powerPlantIndex, 1);
    setClientEditForm({ ...clientEditForm, usinas: currentPowerPlants });
  };

  const handleEditCancel = () => {
    setEditBox(false);

    const clientIndex = clients.findIndex(
      (item) => clientEditForm.numeroCliente === item.numeroCliente
    );

    const clientFound = clients[clientIndex];
    setClientEditForm(clientFound);
  };

  const handleLoadSelect = (usinaId: number) => {
    const possiblePowerPlants: IPowerPlant[] = [...powerPlants];

    const currentPowerPlants: IPowerPlant[] = [{ id: usinaId }];

    possiblePowerPlants.forEach((item) => {
      for (let i = 0; i < clientEditForm.usinas.length; i++) {
        if (
          item.id !== clientEditForm.usinas[i].usinaId &&
          item.id !== usinaId
        ) {
          if (
            !currentPowerPlants.some((pp) => pp.id === item.id) &&
            !clientEditForm.usinas.some((pp) => pp.usinaId === item.id)
          ) {
            currentPowerPlants.push({ id: item.id });
            i = clientEditForm.usinas.length;
          }
        }
      }
    });

    setSelectablePowerPlants(currentPowerPlants);
  };

  return (
    <>
      <Toolbar />
      <BodyContainer>
        <Sidebar />

        {creationBox && (
          <BlurBackground>
            <CreationContainer onSubmit={(event) => handleForm(event)}>
              <H1>Novo cliente</H1>
              <FormControl variant="standard">
                <LabelAndInputContainer>
                  <Label>Nome:</Label>
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
                </LabelAndInputContainer>
              </FormControl>

              <CreateButton type="submit">Confirmar criação</CreateButton>
              <CancelButton onClick={() => setCreationBox(false)}>
                Cancelar
              </CancelButton>
            </CreationContainer>
          </BlurBackground>
        )}

        {editBox && (
          <BlurBackground>
            <EditContainer onSubmit={(event) => handleEditForm(event)}>
              <H1>Editar cliente</H1>

              <FormControl variant="standard">
                <LabelAndInputContainer>
                  <Label>Nome:</Label>
                  <InputText
                    type="text"
                    placeholder="Nome"
                    value={clientEditForm.nomeCliente}
                    onChange={(e) =>
                      setClientEditForm({
                        ...clientEditForm,
                        nomeCliente: e.currentTarget.value,
                      })
                    }
                  />
                </LabelAndInputContainer>
              </FormControl>

              {clientEditForm.usinas.map((powerPlant) => (
                <LabelAndInputContainer key={powerPlant.usinaId}>
                  <Label>Usina:</Label>
                  <FormControl>
                    <InputLabel>ID {powerPlant.usinaId}</InputLabel>
                    <Select
                      labelId="select-power-plant"
                      id="power-plant-select"
                      label="variable"
                      value={powerPlant.usinaId.toString()}
                      onMouseMove={() => {
                        handleLoadSelect(powerPlant.usinaId);
                      }}
                      onChange={(event: SelectChangeEvent) =>
                        handleUpdatePowerPlantOnAlter(event, powerPlant.usinaId)
                      }
                    >
                      {selectablePowerPlants.map((pp) => (
                        <MenuItem value={pp.id.toString()} key={pp.id}>
                          {pp.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Label>Participação (%):</Label>
                  <InputText
                    id="Percent"
                    type="text"
                    value={powerPlant.percentualDeParticipacao.toString()}
                    placeholder="% de participação na usina (apenas números)"
                    onChange={(event) =>
                      handleUpdatePowerPlantParticipationOnAlter(
                        event,
                        powerPlant.usinaId
                      )
                    }
                  />
                  <FiDelete
                    size="28px"
                    onClick={() =>
                      handleDeletePowerPlantFromClient(powerPlant.usinaId)
                    }
                    style={{ color: 'red', cursor: 'pointer' }}
                  />
                </LabelAndInputContainer>
              ))}

              <NewButton onClick={handleAddNewPowerPlantToClient}>
                <FiPlus size="25px" />
              </NewButton>

              <EditButton type="submit">Confirmar edição</EditButton>
              <CancelButton onClick={handleEditCancel}>Cancelar</CancelButton>
            </EditContainer>
          </BlurBackground>
        )}

        <ClientListContainer>
          <NewClientButton onClick={() => setCreationBox(true)}>
            <FiPlusStyled />
            Novo Cliente
          </NewClientButton>
          <List>
            {clients.map((client) => (
              <ListItemContainer key={client.numeroCliente}>
                <ListItemText id={client.numeroCliente.toString()}>
                  {client.nomeCliente}
                </ListItemText>
                <FormControl id="delete-client">
                  <ButtonContainer>
                    <DeleteButton
                      type="submit"
                      onClick={() => deleteClient(client.numeroCliente)}
                    >
                      Deletar
                    </DeleteButton>

                    <EditButton
                      type="submit"
                      onClick={() => handleUpdateButtonClick(client)}
                    >
                      Editar
                    </EditButton>
                  </ButtonContainer>
                </FormControl>
              </ListItemContainer>
            ))}
          </List>
        </ClientListContainer>
      </BodyContainer>
    </>
  );
};

export default ManageClients;
