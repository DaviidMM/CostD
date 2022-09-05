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

export default function BalancePanel({ movements, members }) {
  const debidoDavid = [-90, -28, -123, 1.24, null, 12];
  const debidoVictor = [13, -30, 90, -33, 78, 3];
  const debidoRober = [13, null, 90, -33, -37, 3];

  const chartLimit = calculateChartLimit(debidoDavid);

  const tempLabels = [
    'Usuario 1',
    'Usuario 2',
    'Usuario 3',
    'Usuario 4',
    'Usuario 5',
    'Usuario 6',
  ];

  const data = {
    labels: tempLabels,
    datasets: [
      {
        data: debidoDavid,
        label: 'David',
        backgroundColor: 'red',
      },
      {
        data: debidoVictor,
        label: 'Victor',
        backgroundColor: 'blue',
      },
      {
        data: debidoRober,
        label: 'Rober',
        backgroundColor: 'green',
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
        font: {
          size: 16,
          weight: '500',
        },
        textAlign: 'center',
        labels: {
          value: {
            // anchor: debidoDavid.map((val) => (val >= 0 ? 'start' : 'end')),
            // align: debidoDavid.map((val) => (val >= 0 ? 'end' : 'start')),
            color: 'white',
            formatter: (val, ctx) => {
              const getTextWidth = (text, font) => {
                // re-use canvas object for better performance
                var canvas =
                  getTextWidth.canvas ||
                  (getTextWidth.canvas = document.createElement('canvas'));
                var context = canvas.getContext('2d');
                context.font = font;
                var metrics = context.measureText(text);
                return metrics.width;
              };
              const { chart } = ctx;
              const { width: barWidth } = chart.getDatasetMeta(ctx.datasetIndex)
                .data[ctx.dataIndex];
              const textWidth = getTextWidth(val);
              console.log({ textWidth, barWidth });
              return val && textWidth + 20 < barWidth ? `${val} €` : '';
            },
          },
          // name: {
          //   anchor: debidoDavid.map((val) => (val >= 0 ? 'start' : 'end')),
          //   align: debidoDavid.map((val) => (val >= 0 ? 'start' : 'end')),
          //   color: 'white',
          //   formatter: (_, ctx) => `${ctx.chart.data.labels[ctx.dataIndex]}`,
          // },
        },
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
