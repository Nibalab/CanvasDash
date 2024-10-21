<div class="stockmarket-widget">
    <h2 class="font-semibold">{{ $widget->title }}</h2>   
    <p class="widget-description font-serif text-gray-100 py-2 text-base leading-relaxed rounded-md">
        {{ $widget->description }}
    </p>
    <hr />
    <canvas id="stockmarketChart"></canvas>
</div>

@push('styles')
<style>
    .stockmarket-widget {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px 20px 40px 10px;
        border: 1px solid #dee2e6;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    canvas {
        flex-grow: 1;
        max-width: 100%;
        padding-bottom: 25px;
    }
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    let stockChart;

    function renderStockChart(labels, prices) {
        const ctx = document.getElementById('stockmarketChart').getContext('2d');

        if (stockChart) {
            stockChart.destroy();
        }

        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'IBM Stock Price',
                    data: prices,
                    borderColor: 'rgba(54, 162, 235, 0.8)',
                    backgroundColor: 'rgba(54, 162, 235, 0.3)',
                    fill: true,
                    tension: 0.4,
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
                            color: 'white',
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: 'white',
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                        }
                    }
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const chartData = {!! $chartData !!}; 
        renderStockChart(chartData.labels, chartData.data); 
    });
</script>
@endpush