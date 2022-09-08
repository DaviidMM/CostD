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

const barColors = [
  colors.red[500],
  colors.blue[500],
  colors.green[500],
  colors.yellow[500],
  colors.purple[500],
  colors.rose[900],
];

const getBarColor = (context) => {
  const { datasetIndex } = context;
  const gradientIndex = ((datasetIndex - 1) % barColors.length) + 1;
  return barColors[gradientIndex];
};

export default function BalancePanel({ movements, members }) {
  console.clear();
  const balanceTotal = Object.fromEntries(
    members.map((member) => {
      return [
        member.id,
        Number(
          movements
            .reduce((acc, movement) => {
              const { participants, member: payer, amount, type } = movement;
              if (payer === member.id) {
                if (type === 'refund') return acc + amount;
                return (
                  acc +
                  (amount / participants.length) * (participants.length - 1)
                );
              }
              if (participants.includes(member.id)) {
                return acc - amount / participants.length;
              }
              return acc;
            }, 0)
            .toFixed(2)
        ),
      ];
    })
  );

  const deudores = Object.entries(balanceTotal)
    .filter(([, balance]) => balance < 0)
    .map(([id, balance]) => {
      return {
        id,
        balance,
      };
    });
  const acreedores = Object.entries(balanceTotal)
    .filter(([, balance]) => balance > 0)
    .map(([id, balance]) => {
      return {
        id,
        balance,
      };
    });

  const neutros = Object.entries(balanceTotal)
    .filter(([, balance]) => balance === 0)
    .map(([id, balance]) => {
      return {
        id,
        balance,
      };
    });

  // sort balanceTotal array by deudores and acreedores
  const membersBalance = [...acreedores, ...deudores, ...neutros];

  // console.table(membersBalance);

  const auxiliar = Array.from(Array(members.length), () => []);

  const datasets = membersBalance.map((memberRow, idxMemberRow) => {
    // console.log('EMPEZANDO NUEVA FILA ======================');
    // console.table(memberRow);
    const deudorRow = deudores.some((deudor) => deudor.id === memberRow.id);
    const acreedorRow = acreedores.some(
      (acreedor) => acreedor.id === memberRow.id
    );
    let remainingBalance = membersBalance.find(
      (m) => m.id === memberRow.id
    ).balance;
    // console.log('remainingBalance', remainingBalance);

    membersBalance.map((memberColumn, idxMemberCol) => {
      // console.table(membersBalance);
      if (memberRow.id === memberColumn.id) {
        auxiliar[idxMemberRow][idxMemberCol] = null;
        return;
      }
      if (acreedorRow) {
        if (remainingBalance === 0) {
          auxiliar[idxMemberRow][idxMemberCol] = null;
          return;
        }
        const deudor = deudores.find((deudor) => deudor.id === memberColumn.id);
        if (deudor) {
          const { balance } = deudor;
          const acreedorIndex = membersBalance.findIndex(
            (m) => m.id === memberRow.id
          );
          const deudorIndex = membersBalance.findIndex(
            (m) => m.id === memberColumn.id
          );

          const result = remainingBalance + balance;
          if (result === 0) {
            remainingBalance = 0;
            membersBalance[acreedorIndex].balance = 0;
            membersBalance[deudorIndex].balance = 0;
            auxiliar[idxMemberRow][idxMemberCol] = balance.toFixed(2);
            return;
          }
          if (result > 0) {
            remainingBalance = result;
            membersBalance[acreedorIndex].balance = result;
            membersBalance[deudorIndex].balance = 0;
            auxiliar[idxMemberRow][idxMemberCol] = balance.toFixed(2);
            return;
          }
          if (result < 0) {
            membersBalance[deudorIndex].balance +=
              membersBalance[acreedorIndex].balance;
            auxiliar[idxMemberRow][idxMemberCol] = -remainingBalance;
            remainingBalance = 0;
            membersBalance[acreedorIndex].balance = remainingBalance;
            return;
          }
        }
        auxiliar[idxMemberRow][idxMemberCol] = null;
        return;
      }
      if (deudorRow) {
        auxiliar[idxMemberRow][idxMemberCol] =
          -auxiliar[idxMemberCol][idxMemberRow] || null;
        return;
      }
      auxiliar[idxMemberRow][idxMemberCol] = null;
      return;
    });

    return {
      label: members.find((m) => m.id === memberRow.id).name,
      data: auxiliar[idxMemberRow],
      backgroundColor: getBarColor,
    };
  });

  // const chartLimit = calculateChartLimit(debidoDavid);

  // console.table(auxiliar);

  const data = {
    labels: membersBalance.map((_) => members.find((m) => m.id === _.id).name),
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
