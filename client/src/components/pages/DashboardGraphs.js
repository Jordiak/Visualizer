import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, 
    Filler
  } from 'chart.js';
  import { Line, Pie } from 'react-chartjs-2';
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

export function LineGraph({ labels, data1, data2, label1, label2, color1, color2}) {
        const data = {
            labels: labels,
            datasets: [
              {
                label: label1,
                data: data1,
                borderColor: color1,
                backgroundColor: color1,
                fill: true,
                tension: 0.4
              },
              {
                label: label2,
                data: data2,
                borderColor: color2,
                backgroundColor: color2,
                fill: true,
                tension: 0.4
              }
            ],
          };
      const options = {
        responsive: true,
        scales: {
            y: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value) {if (value % 1 === 0) {return value;}}
                }
            }]
        },
        plugins: {
          legend: {
            position: 'top',
          },
          maintainAspectRatio: false
        },
      };
      return(
        <Line options={options} data={data}/>
      )
}
export function PieGraph({ labels, datas, label, color}) {
  const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: datas,
          borderColor: color,
          backgroundColor: color,
          borderWidth: 1
        }
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false
    };
return(
  <Pie options={options} data={data} width={600} height={600}/>
)
}