import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import colors from 'tailwindcss/colors';

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const calculateChartLimit = (values) => {
  const { max, min, abs } = Math;
  const maxValue = abs(max(...values));
  const minValue = abs(min(...values));
  const limit = max(maxValue, minValue);
  return limit;
};

const barColors = [
  colors.red[500],
  colors.blue[500],
  colors.green[500],
  colors.yellow[500],
];

const getBarColor = (context) => {
  const { datasetIndex } = context;
  const gradientIndex = ((datasetIndex - 1) % barColors.length) + 1;
  return barColors[gradientIndex];
};

export default function BalancePanel({ movements, members }) {
  // 2 movimientos:
  // dfa paga 30€
  // dfa paga 30€

  // Los datasets tienen que ser:
  // dfa:   [null, -20, -20]
  // David: [20, null, null]
  // Otro:  [20, null, null]

  const datasets = members.map((memberRow, i) => {
    const balance = members.map((memberCol, idx) => {
      const { id } = memberCol;
      const value = movements.reduce((acc, movement) => {
        const { amount, member, participants } = movement;
        if (member === id && participants.includes(id)) {
          return acc + amount / participants.length;
        }
        if (member === memberRow.id && participants.includes(id)) {
          return acc - amount / participants.length;
        }
        return acc;
      }, 0);
      const memberBalance = value || null;
      return memberCol.id === memberRow.id ? null : memberBalance;
    });

    return {
      label: memberRow.name,
      data: balance,
      backgroundColor: getBarColor,
    };
  });

  const datasetsData = datasets.map((ds) => ds.data);

  console.log({ data: datasetsData });

  // const chartLimit = calculateChartLimit(debidoDavid);

  const data = {
    labels: members.map((m) => m.name),
    datasets,
  };

  const options = {
    borderWidth: 0,
    borderRadius: 6,
    barThickness: 40,
    maxBarThickness: 60,
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: true,
        },
        // suggestedMin: -chartLimit,
        // suggestedMax: chartLimit,
        stacked: true,
      },
      y: {
        display: true,
        stacked: true,
      },
    },
    maxTicksLimit: 10,
    plugins: {
      datalabels: {
        display: false,
        anchor: 'start',
        align: 'center',
        font: {
          size: 16,
          weight: '500',
        },
        formatter: (value, ctx) => {
          const datasetArray = [];
          ctx.chart.data.datasets.forEach((dataset) => {
            if (dataset.data[ctx.dataIndex] !== undefined) {
              datasetArray.push(dataset.data[ctx.dataIndex]);
            }
          });
          console.log({ datasetArray });
          const total = datasetArray.reduce((a, b) => a + b, 0);
          if (ctx.datasetIndex === datasetArray.length - 1) {
            return total;
          }
          return null;
        },
        textAlign: 'center',
      },
      legend: {
        display: true,
        title: {
          display: true,
          text: 'Debido a:',
        },
      },
      tooltip: {
        xAlign: 'center',
        yAlign: 'center',
        callbacks: {
          title: (item) => item[0].dataset.label,
          label: (item) => `${item.formattedValue} €`,
        },
      },
    },
  };

  return (
    <div>
      <div className="p-4 bg-white">
        <Bar data={data} width={400} height={180} options={options} />
      </div>
    </div>
  );
}
