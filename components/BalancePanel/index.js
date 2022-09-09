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
import { getBarChartOptions, getDatasets } from '../../utils/balances';
import Debt from '../Debt';

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
  const { datasets, membersBalance } = getDatasets({ movements, members });

  const data = {
    labels: datasets.map((ds) => ds.label),
    datasets,
  };

  const options = getBarChartOptions();

  const individualDebts = membersBalance.reduce((acc, { data, id }) => {
    const memberDebts = data.reduce((debtAcc, curr, idx) => {
      if (curr < 0)
        debtAcc.push({ from: id, to: membersBalance[idx].id, amount: curr });
      return debtAcc;
    }, []);
    return [...acc, ...memberDebts];
  }, []);

  console.log({ individualDebts });

  return (
    <div>
      <div className="p-4">
        <Bar data={data} width={400} height={180} options={options} />
      </div>
      <div className="p-4">
        {individualDebts.map((debt, idx) => (
          <Debt
            key={idx}
            from={members.find((m) => m.id === debt.from)}
            to={members.find((m) => m.id === debt.to)}
            amount={debt.amount}
          />
        ))}
      </div>
    </div>
  );
}
