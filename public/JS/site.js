const ctx = document.getElementById('myChart').getContext('2d');

const url = 'http://localhost:3000/api/getanswers';

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setUpPieChart(data.labels, data.data);
    });
    

const setUpBarChart = (labels, data) => {
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

const setUpPieChart = (labels, data) => {
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data :{
            labels: [
            'Red',
            'Blue',
            'Green',
            'Dog',
            'Cat',
            'Fish',
            'Pizza',
            'Pasta',
            'Sushi'
            ],
            datasets: [{
            label: labels,
            data: data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(3, 252, 3)', 
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(7, 3, 252)',
                'rgb(252, 3, 3)'
            ],
            hoverOffset: 4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }