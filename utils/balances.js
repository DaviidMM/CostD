import colors from 'tailwindcss/colors';

const barColors = [
  colors.red[500],
  colors.blue[500],
  colors.green[500],
  colors.yellow[500],
  colors.purple[500],
  colors.red[800],
  colors.orange[600]
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
          color: 'white'
        }
      },
      grace: '5%',
      stacked: true,
      grid: {
        lineWidth: 0.3,
        color: 'gray'
      },
      suggestedMin: -10,
      suggestedMax: 10
    },
    y: {
      display: false,
      stacked: true,
      grid: {
        lineWidth: 0.3,
        color: 'gray'
      },
      font: {
        size: 16
      },
      ticks: {
        color: 'white',
        font: {
          weight: 700
        }
      }
    }
  },
  maxTicksLimit: 10,
  plugins: {
    datalabels: {
      display: false,
      font: {
        size: 16,
        weight: '500'
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

            return context.datasetIndex === 0
              ? sum < 0
                ? 'start'
                : 'end'
              : null;
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

            return context.datasetIndex === 0
              ? (sum > 0 ? '+' : '') + `${sum}€`
              : null;
          }
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

            return context.datasetIndex === 0
              ? sum < 0
                ? 'end'
                : 'start'
              : null;
          },
          color: 'white',
          formatter: (_, context) => {
            return context.datasetIndex === 0
              ? context.chart.data.labels[context.dataIndex]
              : null;
          }
        }
      },
      textAlign: 'center'
    },
    legend: {
      display: true,
      labels: {
        font: {
          weight: 700
        },
        color: 'white'
      },
      title: {
        display: true,
        font: {
          weight: 700
        },
        color: 'white'
      }
    },
    tooltip: {
      xAlign: 'center',
      yAlign: 'center',
      callbacks: {
        title: (item) => item[0].dataset.label,
        label: (item) => {
          console.log(item);
          return `${item.formattedValue} €`;
        }
      }
    }
  }
};

export const getBarChartOptions = () => barChartOptions;

const formatNum = (num) => Number(Number(num).toFixed(2));
function splitPayments(payments) {
  // Order object by payments
  const sortedPayments = Object.fromEntries(
    Object.entries(payments).sort(([, a], [, b]) => a - b)
  );
  const people = Object.keys(sortedPayments);
  const valuesPaid = Object.values(sortedPayments);

  let i = 0;
  let j = people.length - 1;
  let debt;

  // If all payments are 0, return empty matrix
  if (valuesPaid.every((p) => p === 0)) {
    return people.map((person) => ({
      id: person,
      data: Array(people.length).fill(null),
      total: payments[person]
    }));
  }

  // Initialize payment matrix
  const matrix = new Array(people.length)
    .fill()
    .map(() => Array(people.length).fill(null));

  while (i < j) {
    debt = Math.min(valuesPaid[i], valuesPaid[j]);
    valuesPaid[i] = formatNum(valuesPaid[i] - debt);
    valuesPaid[j] = formatNum(valuesPaid[j] + debt);

    matrix[i][j] = -debt;
    matrix[j][i] = debt;
    if (Math.abs(valuesPaid[i]) <= 0.01) i++;
    if (Math.abs(valuesPaid[j]) <= 0.01) j--;
  }

  const result = people.map((person, idx) => ({
    id: person,
    data: matrix[idx],
    total: payments[person]
  }));

  // Flip the matrix
  return result.reverse().map((r) => ({ ...r, data: r.data.reverse() }));
}

function calculateBalances(movements) {
  const balances = {};

  movements.forEach((movement) => {
    if (movement.type === 'expense') {
      const share = movement.amount / movement.participants.length;
      movement.participants.forEach((participant) => {
        if (balances[participant]) {
          balances[participant] -= share;
        } else {
          balances[participant] = -share;
        }
      });
      balances[movement.member] =
        (balances[movement.member] || 0) + movement.amount;
    } else if (movement.type === 'refund') {
      if (balances[movement.member]) {
        balances[movement.member] += movement.amount;
      } else {
        balances[movement.member] = movement.amount;
      }
      movement.participants.forEach((participant) => {
        if (balances[participant]) {
          balances[participant] -=
            movement.amount / movement.participants.length;
        } else {
          balances[participant] =
            -movement.amount / movement.participants.length;
        }
      });
    }
  });

  // Ajuste de saldos cercanos a 0 y redondeo a dos decimales
  for (const key in balances) {
    if (Object.prototype.hasOwnProperty.call(balances, key)) {
      if (Math.abs(balances[key]) <= 0.01) {
        balances[key] = 0;
      } else {
        balances[key] = Math.floor(balances[key] * 100) / 100;
      }
    }
  }

  return balances;
}

export const getMembersBalance = ({ movements, members }) => {
  const balances = calculateBalances(movements);

  console.log({ movements });
  console.log({ balances });

  const splittedPayments = splitPayments(balances);
  const result = splittedPayments.map((p) => ({
    ...p,
    label: members.find((m) => m.id === p.id).name
  }));

  return result;
};

export const calculateDatasets = ({ movements, members }) => {
  const membersBalance = getMembersBalance({ movements, members });

  const datasets = membersBalance.map(({ label, data }) => {
    return {
      label,
      data,
      backgroundColor: getBarColor
    };
  });

  return { datasets, membersBalance };
};
