import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import dadosUsina from '../../assets/JSON_data/dadosUsina.json';

interface IPlotData {
  name?: string;
  uv: number;
  amp: number;
}

interface IMeanString {
  meanPotency: string;
  meanCurrent: string;
  meanTension: string;
  meanTemperature: string;
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
        setMeanValue(calculateMean().meanPotency);
        break;
      }
      case 'tension': {
        dadosUsina.forEach((item) => {
          dataArray = [...dataArray, { uv: item.tensao_V, amp: item.tempo_h }];
        });
        setPlotData(dataArray);
        setMeanValue(calculateMean().meanTension);
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
        setMeanValue(calculateMean().meanCurrent);
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
        setMeanValue(calculateMean().meanTemperature);
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

  const calculateMean = (): IMeanString => {
    interface IMean {
      meanPotency: number;
      meanCurrent: number;
      meanTension: number;
      meanTemperature: number;
    }

    const meanValues: IMean = {
      meanPotency: 0,
      meanCurrent: 0,
      meanTension: 0,
      meanTemperature: 0,
    };

    let normalization = 0;
    dadosUsina.forEach((item) => {
      normalization += 1;
      meanValues.meanCurrent += item.corrente_A;
      meanValues.meanPotency += item.potencia_kW;
      meanValues.meanTemperature += item.temperatura_C;
      meanValues.meanTension += item.tensao_V;
    });

    return {
      meanCurrent: `${(meanValues.meanCurrent / normalization).toLocaleString(
        'pt-br',
        {
          maximumFractionDigits: 2,
        }
      )} A`,
      meanPotency: `${(meanValues.meanPotency / normalization).toLocaleString(
        'pt-br',
        {
          maximumFractionDigits: 2,
        }
      )} W`,
      meanTemperature: `${(
        meanValues.meanTemperature / normalization
      ).toLocaleString('pt-br', {
        maximumFractionDigits: 2,
      })} ºC`,
      meanTension: `${(meanValues.meanTension / normalization).toLocaleString(
        'pt-br',
        {
          maximumFractionDigits: 2,
        }
      )} V`,
    } as IMeanString;
  };
  const [meanValue, setMeanValue] = useState<string>();

  const handlePlotVariableChange = (event: SelectChangeEvent): void => {
    setPlotVariable(event.target.value);
  };

  const formatter = (num: number): string => {
    return num.toFixed();
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Variável</InputLabel>
        <Select
          labelId="chart-select-label"
          id="chart-select"
          label="Variável"
          defaultValue="potency"
          onChange={handlePlotVariableChange}
        >
          <MenuItem value="current">Corrente</MenuItem>
          <MenuItem value="potency">Potência</MenuItem>
          <MenuItem value="temperature">Temperatura</MenuItem>
          <MenuItem value="tension">Tensão</MenuItem>
        </Select>
      </FormControl>
      <LineChart width={800} height={600} data={data}>
        <XAxis
          dataKey="amp"
          type="number"
          domain={[(dataMin) => dataMin - 0.5, (dataMax) => dataMax + 0.5]}
          tickCount={24}
          interval={1}
          tickFormatter={formatter}
        />
        <YAxis
          dataKey="uv"
          type="number"
          domain={[(dataMin) => dataMin, (dataMax) => dataMax + 0.5]}
          tickCount={17}
          interval={1}
          tickFormatter={formatter}
        />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false} />
      </LineChart>
      <div>Retorno financeiro: R$ {calculatePrice()}</div>
      <div>Média: {meanValue}</div>
    </div>
  );
};

export default Chart;
