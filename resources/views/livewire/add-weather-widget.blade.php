<div class="min-h-screen rounded-lg w-full px-4 bg-white">
    <header class="text-center">
        <h4 class="text-2xl text-blue-400 border-b py-3 mb-3 font-bold">Add Weather Widget</h4>
    </header>

    <form wire:submit.prevent="saveWidget">
        <div class="mb-4">
            <label for="title" class="block text-gray-700 mb-1">Title</label>
            <input type="text" id="title" wire:model="title"
                class="w-full mt-1 border rounded transition duration-200 focus:border-blue-500 focus:outline-none">
            @error('title') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>
        <div class="mb-4">
            <label for="description" class="block text-gray-700 mb-1">description</label>
            <input type="text" id="description" wire:model="description"
                class="w-full mt-1 border rounded transition duration-200 focus:border-blue-500 focus:outline-none">
            @error('description') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>
        <div class="mb-4">
            <label for="color" class="block text-gray-700 mb-1">Color</label>
            <input type="color" id="color" wire:model="color"
                class="w-full p-1 border rounded transition duration-200 focus:border-blue-500 focus:outline-none">
        </div>

        <div class="mb-4 flex flex-col sm:flex-row sm:space-x-4">
            <div class="flex-1">
                <label for="width" class="block text-gray-700 mb-1">Width</label>
                <input type="number" id="width" wire:model="width" min="1" max="12"
                    class="w-full mt-1 p-3 border rounded transition duration-200 focus:border-blue-500 focus:outline-none">
                @error('width') <span class="text-red-500">{{ $message }}</span> @enderror
            </div>

            <div class="flex-1">
                <label for="height" class="block text-gray-700 mb-1">Height</label>
                <input type="number" id="height" wire:model="height" min="1" max="12"
                    class="w-full mt-1 p-3 border rounded transition duration-200 focus:border-blue-500 focus:outline-none">
                @error('height') <span class="text-red-500">{{ $message }}</span> @enderror
            </div>
        </div>

        <div class="mb-4">
            <label for="date" class="block text-gray-700 mb-1">Choose Date</label>
            <input type="date" id="date" wire:model="date"
                class="w-full p-2 border rounded-lg shadow-sm transition duration-200 focus:border-blue-500 focus:outline-none">
            @error('date') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>

        <input type="hidden" id="longitude" wire:model="longitude">
        <input type="hidden" id="latitude" wire:model="latitude">

        <footer class="mt-2 text-center flex flex-col sm:flex-row sm:space-x-4">
            <button type="button" onclick="getLocation()"
                class="w-full text-white bg-gray-600 font-bold py-2 px-4 rounded mt-4 sm:mt-0 hover:bg-gray-700 transition duration-200">
                Get Current Location
            </button>

            <button type="submit"
                class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0 hover:bg-blue-700 transition duration-200">
                Save
            </button>
        </footer>

        @error('longitude') <span class="text-red-500 block mt-2">{{ $message }}</span> @enderror
        @error('latitude') <span class="text-red-500 block">{{ $message }}</span> @enderror
    </form>
</div>

<script>
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;

                // Pass values to Livewire component
                @this.set('longitude', longitude);
                @this.set('latitude', latitude);
            }, (error) => {
                alert('Unable to retrieve location. Make sure location services are enabled.');
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }
</script>
