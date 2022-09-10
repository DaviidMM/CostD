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
import useAuth from '../../hooks/useAuth';

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
  const { user } = useAuth();
  const userId = user.id;
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
    const memberDebts = data.reduce((debtAcc, debtAmount, idx) => {
      if (debtAmount < 0)
        debtAcc.push({
          from: members.find((m) => m.id === membersBalance[idx].id),
          to: members.find((m) => m.id === id),
          amount: Number(debtAmount.toFixed(2)),
        });
      return debtAcc;
    }, []);
    return [...acc, ...memberDebts];
  }, []);

  const myDebts = individualDebts.filter(
    (debt) => debt.from.uid === userId || debt.to.uid === userId
  );
  const otherDebts = individualDebts.filter(
    (debt) => debt.from.uid !== userId && debt.to.uid !== userId
  );

  return (
    <div className="flex flex-col gap-4">
      {individualDebts.length === 0 && (
        <h1 className="text-3xl font-semibold text-center">
          Todo el grupo está cuadrado
        </h1>
      )}
      <div className="p-4 h-[500px]">
        <Bar data={data} options={options} />
      </div>
      {individualDebts.length !== 0 && (
        <>
          <div>
            <h3 className="mb-2 text-xl">Mis deudas</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {myDebts.length === 0 ? (
                <p>No tengo deudas pendientes 👍</p>
              ) : (
                myDebts.map((debt, idx) => (
                  <Debt
                    amount={debt.amount}
                    from={debt.from}
                    key={idx}
                    onPay={payMovement}
                    to={debt.to}
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl">Deudas de otros</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {otherDebts.length === 0 ? (
                <p>Nadie tiene deudas pendientes 👍</p>
              ) : (
                otherDebts.map((debt, idx) => (
                  <Debt
                    amount={debt.amount}
                    from={debt.from}
                    key={idx}
                    onPay={payMovement}
                    to={debt.to}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
