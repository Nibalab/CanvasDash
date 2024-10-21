<div class="rounded-lg w-full px-4 bg-white">
    <header class="text-center">
        <h4 class="text-2xl text-blue-400 border-b py-3 mb-3 font-bold">Edit Stock Market Widget</h4>
    </header>

    <div class="flex-1 overflow-y-auto max-h-[400px]">
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

            <footer class="mt-2 text-center flex flex-col sm:flex-row sm:space-x-4">

                <button type="submit"
                    class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0 hover:bg-blue-700 transition duration-200">
                    Save
                </button>
            </footer>
        </form>
    </div>
</div>