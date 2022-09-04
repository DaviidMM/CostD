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

  const values = [12, 19, -280, 5, 2, 3];

  const data = {
    labels: members.map((m) => m.name),
    datasets: [
      {
        label: 'Balance',
        data: values,
        backgroundColor: values.map((val) => (val > 0 ? 'green' : 'red')),
        borderWidth: 0,
        hoverBackgroundColor: values.map((val) =>
          val > 0 ? 'rgb(39, 148, 39)' : 'rgb(255, 59, 59)'
        ),
        datalabels: {
          anchor: values.map((val) => (val > 0 ? 'start' : 'end')),
          align: values.map((val) => (val > 0 ? 'start' : 'end')),
          formatter: (val, a) => `${val} €`,
        },
      },
    ],
  };

  const options = {
    barThickness: 40,
    maxBarThickness: 50,
    minBarLength: 40,
    indexAxis: 'x',
    elements: {
      bar: {},
    },
    responsive: true,
    plugins: {
      datalabels: {
        formatter: Math.round,
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
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
