<div class="weather-widget  text-white shadow-lg">
    <div class="widget-header">
        <h3 class="font-semibold text-2xl">{{ $widget->title }}</h3>
        <p class="text-sm italic text-gray-100">{{ $widget->description }}</p>
    </div>

    <div class="widget-body mt-4">
        <h2 class="text-lg font-bold">
            Weather on {{ $widget->details['datetime'] }}
        </h2>
        <p class="text-sm text-gray-300 mb-2">
            {{ $widget->details['description'] ?? 'No description available' }}
        </p>
        <p class="text-xl font-semibold">
            Temp: {{ $widget->details['temp'] }}°C
        </p>
        <p class="font-medium text-lg">
            Conditions: {{ $widget->details['conditions'] }}
        </p>
    </div>
</div>

@push('styles')
<style>
    .weather-widget {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-radius: 12px;
        max-width: 350px;
        margin: auto;
        text-align: center;
    }

    .widget-header h3 {
        margin: 0;
        font-size: 1.75rem;
    }

    .widget-header p {
        margin: 0;
        font-size: 0.875rem;
    }

    .widget-body h2 {
        margin-bottom: 10px;
    }

    .widget-body p {
        margin: 5px 0;
    }

    /* Add shadow and responsive behavior */
    .weather-widget {
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
        .weather-widget {
            padding: 15px;
            max-width: 100%;
        }

        .widget-header h3 {
            font-size: 1.5rem;
        }
    }
</style>
@endpush
