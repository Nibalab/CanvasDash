<!-- Map Container -->
<div class="map-widget w-full text-white overflow-auto">
    <div class="px-2">
        <h3 class="font-semibold">{{ $widget->title }}</h3>
        <p class="font-serif">{{ $widget->description }}</p>
    </div>
    <div id="map" class="w-full overflow-auto z-10" style="height: 300px; min-width:200px"></div>
</div>
@push('styles')
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<style>
    .map-widget {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 8px;
    }
</style>
@endpush

@push('scripts')
<script>
    let map = L.map('map').setView([{{ $latitude }}, {{ $longitude }}], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
</script>
@endpush