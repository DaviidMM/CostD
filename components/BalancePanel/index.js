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
  // Los datasets tienen que ser:
  // David:  [0, -10, 0]
  // Victor: [10, 0, 10]
  // Sandra: [0, -10, 0]

  const balanceTotal = Object.fromEntries(
    members.map((member) => {
      return [
        member.id,
        movements.reduce((acc, movement) => {
          const { participants, member: payer, amount } = movement;
          if (payer === member.id) {
            return (
              acc + (amount / participants.length) * (participants.length - 1)
            );
          }
          if (participants.includes(member.id)) {
            return acc - amount / participants.length;
          }
          return acc;
        }, 0),
      ];
    })
  );

  console.log({ balanceTotal });

  const datasets = members.map((memberRow, idxMemberRow) => {
    let data = [];

    console.log('data', data);

    if (idxMemberRow === 0) data = [0, -10, 0];
    if (idxMemberRow === 1) data = [10, 0, 10];
    if (idxMemberRow === 2) data = [0, -10, 0];

    return {
      label: memberRow.name,
      data,
      backgroundColor: getBarColor,
    };
  });

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
        grace: '10%',
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
