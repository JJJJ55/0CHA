import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 추가된 플러그인
import { exerciseData } from '../../../util/TestData';
import styled from 'styled-components';

// 라이브러리 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels, // 추가된 플러그인
);

const s = {
  Container: styled.section`
    width: 90%;
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-color: #000;
  `,
  Title: styled.div`
    width: 90%;
    margin: 10px auto;
    text-align: left;
    border: 1px solid red;
    font-size: 14px;
    color: ${(props) => props.theme.textColor2};
  `,
};

const FitnessDetailChart: React.FC = () => {
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#666666',
        display: true,
        anchor: 'end',
        align: 'top',
        formatter: (value: number) => value.toString(),
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        // label: '벤치프레스',
        data: exerciseData,
        borderColor: '#ccff33',
        backgroundColor: '#ccff33',
        // 데이터 포인트 스타일
        pointRadius: 3, // 포인트 크기
        pointBorderWidth: 1, // 포인트 경계 두께
      },
    ],
  };
  return (
    <>
      <s.Title>운동이력</s.Title>
      <s.Container>
        <Line options={options} data={data} />
      </s.Container>
    </>
  );
};

export default FitnessDetailChart;
