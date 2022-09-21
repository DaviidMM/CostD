import colors from 'tailwindcss/colors';

const barColors = [
  colors.red[500],
  colors.blue[500],
  colors.green[500],
  colors.yellow[500],
  colors.purple[500],
  colors.red[800],
  colors.orange[600],
];

const getBarColor = (context) => {
  const { datasetIndex } = context;
  const gradientIndex = ((datasetIndex - 1) % barColors.length) + 1;
  return barColors[gradientIndex];
};

const barChartOptions = {
  borderWidth: 0,
  borderRadius: 6,
  barThickness: 30,
  minBarLength: 30,
  maxBarThickness: 60,
  indexAxis: 'y',
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        display: true,
        color: 'white',
        font: {
          weight: 700,
          color: 'white',
        },
      },
      grace: '5%',
      stacked: true,
      grid: {
        lineWidth: 0.3,
        color: 'gray',
      },
      suggestedMin: -10,
      suggestedMax: 10,
    },
    y: {
      display: false,
      stacked: true,
      grid: {
        lineWidth: 0.3,
        color: 'gray',
      },
      font: {
        size: 16,
      },
      ticks: {
        color: 'white',
        font: {
          weight: 700,
        },
      },
    },
  },
  maxTicksLimit: 10,
  plugins: {
    datalabels: {
      display: false,
      font: {
        size: 16,
        weight: '500',
      },
      labels: {
        totalValue: {
          display: true,
          anchor: 'end',
          backgroundColor: '#0000006F',
          borderRadius: 5,
          align: (context) => {
            const datasetsArray = [];
            context.chart.data.datasets.forEach((dataset) => {
              if (dataset.data[context.dataIndex] !== undefined) {
                datasetsArray.push(dataset.data[context.dataIndex]);
              }
            });
            const sum = datasetsArray.reduce(
              (total, datapoint) => total + datapoint,
              0
            );

            if (context.datasetIndex === 0) {
              return sum < 0 ? 'start' : 'end';
            } else {
              return null;
            }
          },
          color: 'white',
          formatter: (_, context) => {
            const datasetsArray = [];
            context.chart.data.datasets.forEach((dataset) => {
              if (dataset.data[context.dataIndex] !== undefined) {
                datasetsArray.push(dataset.data[context.dataIndex]);
              }
            });
            const sum = datasetsArray.reduce(
              (total, datapoint) => total + datapoint,
              0
            );

            if (context.datasetIndex === 0) {
              return (sum < 0 ? '' : '+') + Number(sum.toFixed(2)) + '€';
            } else {
              return null;
            }
          },
        },
        member: {
          display: true,
          anchor: 'end',
          align: (context) => {
            const datasetsArray = [];
            context.chart.data.datasets.forEach((dataset) => {
              if (dataset.data[context.dataIndex] !== undefined) {
                datasetsArray.push(dataset.data[context.dataIndex]);
              }
            });
            const sum = datasetsArray.reduce(
              (total, datapoint) => total + datapoint,
              0
            );

            if (context.datasetIndex === 0) {
              return sum < 0 ? 'end' : 'start';
            } else {
              return null;
            }
          },
          color: 'white',
          formatter: (_, context) => {
            return context.datasetIndex === 0
              ? context.chart.data.labels[context.dataIndex]
              : null;
          },
        },
      },
      textAlign: 'center',
    },
    legend: {
      display: true,
      labels: {
        font: {
          weight: 700,
        },
        color: 'white',
      },
      title: {
        display: true,
        font: {
          weight: 700,
        },
        color: 'white',
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

export const getBarChartOptions = () => barChartOptions;

export const getMembersBalance = ({ movements, members }) => {
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

  const debtors = Object.entries(balanceTotal)
    .filter(([, balance]) => balance < 0)
    .map(([id, balance]) => {
      return {
        id,
        balance,
      };
    });
  const creditors = Object.entries(balanceTotal)
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

  // sort balanceTotal array by creditors and debtors
  const membersBalance = [...creditors, ...debtors, ...neutros];

  // console.table(membersBalance);

  const auxiliar = Array.from(Array(members.length), () => []);

  const datasets = membersBalance.map((memberRow, idxMemberRow) => {
    // console.log('EMPEZANDO NUEVA FILA ======================');
    // console.table(memberRow);
    const deudorRow = debtors.some((deudor) => deudor.id === memberRow.id);
    const acreedorRow = creditors.some(
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
        const deudor = debtors.find((deudor) => deudor.id === memberColumn.id);
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
            auxiliar[idxMemberRow][idxMemberCol] = Number(balance.toFixed(2));
            return;
          }
          if (result > 0) {
            remainingBalance = result;
            membersBalance[acreedorIndex].balance = result;
            membersBalance[deudorIndex].balance = 0;
            auxiliar[idxMemberRow][idxMemberCol] =
              balance === 0 ? null : Number(balance.toFixed(2));
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
      id: memberRow.id,
      data: auxiliar[idxMemberRow],
    };
  });
  return {
    debtors,
    creditors,
    membersBalance: datasets,
  };
};

export const calculateDatasets = ({ movements, members }) => {
  const { membersBalance } = getMembersBalance({
    movements,
    members,
  });
  const datasets = membersBalance.map(({ label, data }) => {
    return {
      label,
      data,
      backgroundColor: getBarColor,
    };
  });

  return { datasets, membersBalance };
};
