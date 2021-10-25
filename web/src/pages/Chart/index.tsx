/* eslint-disable no-shadow */
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

interface IPlotVariable {
  type: string;
}

const Chart: React.FC = () => {
  const [plotData, setPlotData] = useState<IPlotData[]>();
  const [plotVariable, setPlotVariable] = useState<IPlotVariable>({
    type: 'potency',
  });

  const handlePlotVariableChange = (event: SelectChangeEvent): void => {
    setPlotVariable({ type: event.target.value });
  };

  useEffect(() => {
    let dataArray: IPlotData[] = [];
    switch (plotVariable.type) {
      case 'potency': {
        dadosUsina.forEach((item) => {
          dataArray = [
            ...dataArray,
            { uv: item.potencia_kW, amp: item.tempo_h },
          ];
        });

        setPlotData(dataArray);
        break;
      }
      case 'tension': {
        dadosUsina.forEach((item) => {
          dataArray = [...dataArray, { uv: item.tensao_V, amp: item.tempo_h }];
        });
        setPlotData(dataArray);
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
        break;
      }
      default: {
        break;
      }
    }
  }, [plotVariable]);

  const data = plotData as unknown as readonly object[];

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
    </div>
  );
};

export default Chart;
