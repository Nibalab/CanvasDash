<div class="covid-widget">
    <h2 class="font-semibold">{{ $widget->title }}</h2>   
    <p class="widget-description font-serif text-gray-100 py-2 text-base leading-relaxed rounded-md shadow-md">
        {{ $widget->description }}
    </p>
    <hr />
    <canvas id="covidChart"></canvas>
</div>

@push('styles')
<style>
    .covid-widget {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%; 
        padding: 20px 20px 25px 10px;
        border: 1px solid #dee2e6;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    canvas {
        flex-grow: 1; 
        max-width: 100%;
    }
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
async function fetchCovidData() {
    try {
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        const data = await response.json();
        renderCovidChart(data);
    } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
    }
}

// Render the chart with fetched data
function renderCovidChart(data) {
    const ctx = document.getElementById('covidChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cases', 'Deaths', 'Recovered', 'Active'],
            datasets: [{
                label: 'Covid-19 Global Statistics',
                data: [data.cases, data.deaths, data.recovered, data.active],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 205, 86, 0.6)' 
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'white', 
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' 
                    }
                }
            }
        }
    });
}

// Fetch COVID-19 data when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    fetchCovidData();
});
</script>
@endpush
