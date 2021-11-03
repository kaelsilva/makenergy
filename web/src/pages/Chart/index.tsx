import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  BodyContainer,
  DataContainer,
  DataLineContainer,
  DataLabel,
  DataValue,
  ChartContainer,
} from './styles';
import Toolbar from '../../components/Toolbar';
import dadosUsina from '../../assets/JSON_data/dadosUsina.json';
import Sidebar from '../../components/Sidebar';

interface IPlotData {
  name?: string;
  uv: number;
  amp: number;
}

interface IMean {
  meanPotency: number;
  meanCurrent: number;
  meanTension: number;
  meanTemperature: number;
}

const Chart: React.FC = () => {
  const [plotData, setPlotData] = useState<IPlotData[]>();
  const [plotVariable, setPlotVariable] = useState<string>('potency');

  useEffect(() => {
    let dataArray: IPlotData[] = [];
    switch (plotVariable) {
      case 'potency': {
        dadosUsina.forEach((item) => {
          dataArray = [
            ...dataArray,
            { uv: item.potencia_kW, amp: item.tempo_h },
          ];
        });

        setPlotData(dataArray);
        setMeanValue(
          calculateMean().meanPotency.toLocaleString('pt-br', {
            maximumFractionDigits: 2,
          })
        );
        setMeanUnity('kW');
        break;
      }
      case 'tension': {
        dadosUsina.forEach((item) => {
          dataArray = [...dataArray, { uv: item.tensao_V, amp: item.tempo_h }];
        });
        setPlotData(dataArray);
        setMeanValue(
          calculateMean().meanTension.toLocaleString('pt-br', {
            maximumFractionDigits: 2,
          })
        );
        setMeanUnity('V');
        break;
      }
      case 'current': {
        dadosUsina.forEach((item) => {
          dataArray = [
            ...dataArray,
            { uv: item.corrente_A, amp: item.tempo_h },
          ];
        });
        setPlotData(dataArray);
        setMeanValue(
          calculateMean().meanCurrent.toLocaleString('pt-br', {
            maximumFractionDigits: 2,
          })
        );
        setMeanUnity('A');
        break;
      }
      case 'temperature': {
        dadosUsina.forEach((item) => {
          dataArray = [
            ...dataArray,
            { uv: item.temperatura_C, amp: item.tempo_h },
          ];
        });
        setPlotData(dataArray);
        setMeanValue(
          calculateMean().meanTemperature.toLocaleString('pt-br', {
            maximumFractionDigits: 2,
          })
        );
        setMeanUnity('ºC');
        break;
      }
      default: {
        break;
      }
    }
  }, [plotVariable]);

  const data = plotData as unknown as readonly object[];

  const calculatePrice = (): string => {
    const priceUnityKWh = 0.95;
    const time = dadosUsina[1].tempo_h - dadosUsina[0].tempo_h;
    let pot = 0;
    dadosUsina.forEach((item) => {
      pot += item.potencia_kW;
    });

    const result = (pot * time * priceUnityKWh).toLocaleString('pt-br', {
      maximumFractionDigits: 2,
    });

    return result;
  };

  const calculateMean = (): IMean => {
    const meanValues: IMean = {
      meanPotency: 0,
      meanCurrent: 0,
      meanTension: 0,
      meanTemperature: 0,
    };

    dadosUsina.forEach((item) => {
      meanValues.meanCurrent += item.corrente_A / dadosUsina.length;
      meanValues.meanPotency += item.potencia_kW / dadosUsina.length;
      meanValues.meanTemperature += item.temperatura_C / dadosUsina.length;
      meanValues.meanTension += item.tensao_V / dadosUsina.length;
    });

    return meanValues;
  };

  const [meanValue, setMeanValue] = useState<string>();
  const [meanUnity, setMeanUnity] = useState<string>();

  const calculateStandardDeviation = (): string => {
    switch (plotVariable) {
      case 'temperature': {
        const mean = calculateMean().meanTemperature;
        let sd = 0;
        dadosUsina.forEach((item) => {
          sd += Math.pow(Math.abs(mean - item.temperatura_C), 2);
        });
        const variancy = sd / dadosUsina.length;
        const result = Math.sqrt(variancy);
        return result.toLocaleString('pt-br', { maximumFractionDigits: 2 });
      }
      case 'potency': {
        const mean = calculateMean().meanPotency;
        let sd = 0;
        dadosUsina.forEach((item) => {
          sd += Math.pow(Math.abs(mean - item.potencia_kW), 2);
        });
        const variancy = sd / dadosUsina.length;
        const result = Math.sqrt(variancy);
        return result.toLocaleString('pt-br', { maximumFractionDigits: 2 });
      }
      case 'current': {
        const mean = calculateMean().meanCurrent;
        let sd = 0;
        dadosUsina.forEach((item) => {
          sd += Math.pow(Math.abs(mean - item.corrente_A), 2);
        });
        const variancy = sd / dadosUsina.length;
        const result = Math.sqrt(variancy);
        return result.toLocaleString('pt-br', { maximumFractionDigits: 2 });
      }
      case 'tension': {
        const mean = calculateMean().meanTension;
        let sd = 0;
        dadosUsina.forEach((item) => {
          sd += Math.pow(Math.abs(mean - item.tensao_V), 2);
        });
        const variancy = sd / dadosUsina.length;
        const result = Math.sqrt(variancy);
        return result.toLocaleString('pt-br', { maximumFractionDigits: 2 });
      }
      default: {
        return '';
      }
    }
  };

  const findMinimumValue = (): string => {
    const valueArray: number[] = [];

    switch (plotVariable) {
      case 'potency': {
        dadosUsina.forEach((item) => valueArray.push(item.potencia_kW));
        return Math.min(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'tension': {
        dadosUsina.forEach((item) => valueArray.push(item.tensao_V));
        return Math.min(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'temperature': {
        dadosUsina.forEach((item) => valueArray.push(item.temperatura_C));
        return Math.min(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'current': {
        dadosUsina.forEach((item) => valueArray.push(item.corrente_A));
        return Math.min(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      default: {
        return '';
      }
    }
  };

  const findMaximumValue = (): string => {
    const valueArray: number[] = [];

    switch (plotVariable) {
      case 'potency': {
        dadosUsina.forEach((item) => valueArray.push(item.potencia_kW));
        return Math.max(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'tension': {
        dadosUsina.forEach((item) => valueArray.push(item.tensao_V));
        return Math.max(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'temperature': {
        dadosUsina.forEach((item) => valueArray.push(item.temperatura_C));
        return Math.max(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      case 'current': {
        dadosUsina.forEach((item) => valueArray.push(item.corrente_A));
        return Math.max(...valueArray).toLocaleString('pt-br', {
          maximumFractionDigits: 2,
        });
      }
      default: {
        return '';
      }
    }
  };

  const handlePlotVariableChange = (event: SelectChangeEvent): void => {
    setPlotVariable(event.target.value);
  };

  const formatter = (num: number): string => {
    return num.toFixed();
  };

  return (
    <>
      <Toolbar />

      <BodyContainer>
        <Sidebar />
        <FormControl>
          <InputLabel>Variável</InputLabel>
          <Select
            labelId="chart-select-label"
            id="chart-select"
            label="Variável"
            defaultValue="potency"
            onChange={handlePlotVariableChange}
            style={{
              minWidth: '150px',
              maxWidth: '150px',
              marginBottom: '10px',
            }}
          >
            <MenuItem value="current">Corrente</MenuItem>
            <MenuItem value="potency">Potência</MenuItem>
            <MenuItem value="temperature">Temperatura</MenuItem>
            <MenuItem value="tension">Tensão</MenuItem>
          </Select>
        </FormControl>

        <ChartContainer>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis
                dataKey="amp"
                type="number"
                domain={[
                  (dataMin) => dataMin - 0.5,
                  (dataMax) => dataMax + 0.5,
                ]}
                tickCount={24}
                interval={2}
                unit="h"
                tickFormatter={formatter}
              />
              <YAxis
                dataKey="uv"
                type="number"
                domain={[(dataMin) => dataMin, (dataMax) => dataMax + 0.5]}
                tickCount={17}
                interval={1}
                unit={meanUnity}
                tickFormatter={formatter}
              />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <DataContainer>
          <DataLineContainer>
            <DataLabel>Retorno financeiro:</DataLabel>
            <DataValue>R$ {calculatePrice()}</DataValue>
          </DataLineContainer>

          <DataLineContainer>
            <DataLabel>Média:</DataLabel>
            <DataValue>{`${meanValue} ${meanUnity}`}</DataValue>
          </DataLineContainer>

          <DataLineContainer>
            <DataLabel>Desvio padrão:</DataLabel>
            <DataValue>{calculateStandardDeviation()}</DataValue>
          </DataLineContainer>

          <DataLineContainer>
            <DataLabel>Mínimo:</DataLabel>
            <DataValue>{`${findMinimumValue()} ${meanUnity}`}</DataValue>
          </DataLineContainer>

          <DataLineContainer>
            <DataLabel>Máximo:</DataLabel>
            <DataValue>{`${findMaximumValue()} ${meanUnity}`}</DataValue>
          </DataLineContainer>
        </DataContainer>
      </BodyContainer>
    </>
  );
};

export default Chart;
