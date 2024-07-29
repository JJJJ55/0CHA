// import React from 'react';
// import styled from 'styled-components';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { exerciseData } from '../../../util/TestData';

// const s = {
//   Container: styled.section`
//     width: 100%;
//     height: 300px;
//     border: 1px solid orange;
//   `,
// };

// const FitnessDetailChart = () => {
//   const data = {
//     labels: [['07.09'], ['07.14'], ['07.15'], ['07.21'], ['07.25'], ['07.28']],
//     datasets: [
//       {
//         type: 'line',
//         label: '운동량',
//         backgroundColor: 'black',
//         borderColor: '#ccff33',
//         borderWidth: 2,
//         data: exerciseData,
//       },
//     ],
//   };
//   const options = {
//     maintainAspectRatio: false,
//     spanGaps: true,
//     maxBarThickness: 30,
//     grouped: true,
//     interaction: {
//       mode: 'point',
//     },

//     plugins: {
//       legend: {
//         position: 'top', // 범례 위치를 상단으로 설정
//         align: 'end', // 범례를 오른쪽 정렬
//         labels: {
//           usePointStyle: true,
//           font: {
//             family: "'Noto Sans KR', 'serif'",
//             lineHeight: 1,
//             size: 10,
//           },
//         },
//       },
//       tooltip: {
//         backgroundColor: '#000',
//         padding: 10,
//         bodySpacing: 5,
//         bodyFont: {
//           font: {
//             family: "'Noto Sans KR', sans-serif",
//           },
//         },
//         usePointStyle: true,
//         filter: (item: any) => item.parsed.y !== null,
//         callbacks: {
//           title: (context: any) => context[0].label,
//           label: (context: any) => {
//             let label = context.dataset.label + '' || '';

//             return context.parsed.y !== null ? label + ': ' + context.parsed.y + '등급' : null;
//           },
//         },
//         events: ['click'],
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//           drawTicks: true,
//           tickLength: 4,
//           color: '#E2E2E230',
//         },
//         axis: 'x',
//         position: 'bottom',
//         ticks: {
//           padding: 10,
//           font: {
//             size: 10,
//           },
//         },
//       },
//       y: {
//         type: 'linear',
//         reverse: true,
//         grid: {
//           color: '#E2E2E230',
//         },
//         afterDataLimits: (scale: any) => {
//           scale.max = scale.max * 1;
//           scale.min = scale.min * 0.1;
//         },
//         axis: 'y',
//         display: true,
//         position: 'left',
//         min: 1,
//         max: 9,
//         ticks: {
//           padding: 8,
//           stepSize: 2,
//           font: {
//             size: 12,
//             family: "'Noto Sans KR', sans-serif",
//           },
//         },
//       },
//     },
//     elements: {
//       point: {
//         radius: 3, // 도형의 크기를 줄임
//       },
//     },
//   };
//   return (
//     <s.Container>
//       <Line type="line" data={data} options={options} />
//     </s.Container>
//   );
// };

// export default FitnessDetailChart;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { exerciseData } from '../../../util/TestData';
import styled from 'styled-components';

// 라이브러리 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const s = {
  Container: styled.section`
    width: 100%;
    height: 300px;
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
  `,
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: exerciseData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const FitnessDetailChart = () => {
  return (
    <s.Container>
      <Line options={options} data={data} />
    </s.Container>
  );
};

export default FitnessDetailChart;
