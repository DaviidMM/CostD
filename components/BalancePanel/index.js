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
import { getBarChartOptions, calculateDatasets } from '../../utils/balances';
import Debt from '../Debt';
import { createMovement } from '../../services/movements';
import { toast } from 'react-toastify';
import useGroup from '../../hooks/useGroup';
import Spinner from '../Loading/Spinner';
import Dots from '../Loading/Dots';

ChartJS.register(
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BalancePanel({
  movements,
  members,
  onMovementUpdate = () => {},
}) {
  const group = useGroup();
  const { datasets, membersBalance } = calculateDatasets({
    movements,
    members,
  });

  const payMovement = (movement) => {
    if (
      !confirm('¿Estás seguro de que quieres marcar el movimiento como pagado?')
    ) {
      return;
    }

    const promise = createMovement({
      amount: -movement.amount,
      description: 'Reembolso',
      group: group.id,
      member: movement.from.id,
      participants: [movement.to.id],
      payedAt: new Date(),
      type: 'refund',
    });

    toast
      .promise(promise, {
        success: '¡Reembolso realizado! 🥳',
        error: '¡Ha ocurrido un error! ❌',
        pending: 'Pagando tus deudas...',
      })
      .then((movement) => onMovementUpdate([movement, ...movements]));
  };

  const data = {
    labels: datasets.map((ds) => ds.label),
    datasets,
  };

  const options = getBarChartOptions();

  const individualDebts = membersBalance.reduce((acc, { data, id }) => {
    const memberDebts = data.reduce((debtAcc, curr, idx) => {
      if (curr < 0)
        debtAcc.push({ from: membersBalance[idx].id, to: id, amount: curr });
      return debtAcc;
    }, []);
    return [...acc, ...memberDebts];
  }, []);

  return (
    <div>
      <div className="p-4">
        <Bar data={data} width={400} height={200} options={options} />
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {individualDebts.map((debt, idx) => (
          <Debt
            amount={debt.amount}
            from={members.find((m) => m.id === debt.from)}
            key={idx}
            onPay={payMovement}
            to={members.find((m) => m.id === debt.to)}
          />
        ))}
      </div>
    </div>
  );
}
