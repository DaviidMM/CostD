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

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BalancePanel({ movements, members }) {
  console.log({ movements, members });

  const values = [12, 19, -80, 46, 21, 32];

  const data = {
    labels: [...members.map((m) => m.name), ...members.map((m) => m.name)],
    datasets: [
      {
        data: values,
      },
    ],
  };

  const options = {
    backgroundColor: values.map((val) => (val > 0 ? 'green' : 'red')),
    hoverBackgroundColor: values.map((val) =>
      val > 0 ? 'rgb(39, 148, 39)' : 'rgb(255, 59, 59)'
    ),
    borderWidth: 0,
    borderRadius: 6,
    barThickness: 40,
    maxBarThickness: 60,
    minBarLength: 40,
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: true,
        },
        grace: '20%',
        type: 'linear',
      },
    },
    maxTicksLimit: 10,
    plugins: {
      datalabels: {
        anchor: values.map((val) => (val > 0 ? 'start' : 'end')),
        align: values.map((val) => (val > 0 ? 'start' : 'end')),
        font: {
          size: 16,
          weight: 'bold',
        },
        textAlign: 'center',
        labels: {
          value: {
            color: 'black',
            formatter: (val, ctx) =>
              `${ctx.chart.data.labels[ctx.dataIndex]}\n${val}€`,
          },
        },
      },
      legend: {
        display: false,
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
        <Bar data={data} width={400} height={200} options={options} />
      </div>
    </div>
  );
}
