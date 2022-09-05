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
import { useContext } from 'react';

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const calculateChartLimit = (values) => {
  const { max, min, abs } = Math;
  const maxValue = abs(max(...values));
  const minValue = abs(min(...values));
  const limit = max(maxValue, minValue);
  return limit;
};

export default function BalancePanel({ movements, members }) {
  const debidoDavid = [null, -34];
  const debidoVictor = [34, null];

  const chartLimit = calculateChartLimit(debidoDavid);

  const tempLabels = ['David', 'Victor'];

  const data = {
    labels: tempLabels,
    datasets: [
      {
        data: debidoDavid,
        label: 'David',
        backgroundColor: getRandomColor(),
      },
      {
        data: debidoVictor,
        label: 'Victor',
        backgroundColor: getRandomColor(),
      },
    ],
  };

  const options = {
    // backgroundColor: (context) => {
    //   const { ctx } = context.chart;
    //   const positiveGradient = ctx.createLinearGradient(
    //     ctx.canvas.width / 2,
    //     0,
    //     ctx.canvas.width,
    //     0
    //   );
    //   positiveGradient.addColorStop(0, colors.green[600]);
    //   positiveGradient.addColorStop(0.5, colors.green[700]);
    //   positiveGradient.addColorStop(1, colors.green[700]);
    //   const negativeGradient = ctx.createLinearGradient(
    //     ctx.canvas.width / 2,
    //     0,
    //     0,
    //     0
    //   );
    //   negativeGradient.addColorStop(0, colors.rose[600]);
    //   negativeGradient.addColorStop(0.5, colors.red[700]);
    //   negativeGradient.addColorStop(1, colors.red[700]);
    //   return debidoDavid.map((val) =>
    //     val > 0 ? positiveGradient : val < 0 ? negativeGradient : 'yellow'
    //   );
    // },
    // hoverBackgroundColor: debidoDavid.map((val) =>
    //   val > 0 ? colors.green[800] : colors.red[700]
    // ),
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
        suggestedMin: -chartLimit,
        suggestedMax: chartLimit,
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
