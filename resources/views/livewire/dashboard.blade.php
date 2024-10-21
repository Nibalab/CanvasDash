<div class="h-screen flex flex-col">
    <div class="grid-stack flex-1">
        @foreach($widgets as $widget)
        <div class="grid-stack-item" wire:key="grid-item-{{ $widget->id }}" data-gs-id="{{ $widget->id }}"
            data-gs-width="{{ $widget->width }}" data-gs-x="{{ $widget->x }}" data-gs-y="{{ $widget->y }}"
            data-gs-height="{{ $widget->height }}">
            <div class="grid-stack-item-content" style="background-color: {{$widget->color}}">
                @livewire($widget->name, ['widget' => $widget->id], key($widget->name . '_' . $widget->id))
            </div>
        </div>

        @endforeach
    </div>

    <footer class="p-4 flex justify-between items-center fixed bottom-0 w-full">
        <button class="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded" id="save-widgets-btn">
            Save Widgets
        </button>
    </footer>
</div>

@push('styles')
<link href="{{ asset('gridstack/gridstack.min.css') }}" rel="stylesheet" />
<link rel="stylesheet" href="{{ asset('gridstack.css') }}" />
<script src="{{ asset('gridstack/gridstack-all.js') }}"></script>
@endpush

@push('scripts')
<script>
    let updatedWidgets = [];

    document.addEventListener('DOMContentLoaded', () => {
        let grid = GridStack.init({
            float: true,
            cellHeight: 120,
            acceptWidgets: true,
        });

        // Initialize grid items with saved positions
        document.querySelectorAll('.grid-stack-item').forEach(item => {
            const id = parseInt(item.getAttribute('data-gs-id'));
            const width = parseInt(item.getAttribute('data-gs-width'));
            const height = parseInt(item.getAttribute('data-gs-height'));
            const x = parseInt(item.getAttribute('data-gs-x'));
            const y = parseInt(item.getAttribute('data-gs-y'));

            grid.makeWidget(item);
            grid.update(item, { w: width, h: height, x, y, id:id });
        });

        // Merge changes into the `updatedWidgets` array
        function mergeWidgetChanges(newItems) {
            newItems.forEach(newItem => {
                const existingIndex = updatedWidgets.findIndex(
                    widget => widget.id === newItem.el.getAttribute('data-gs-id')
                );

                const widgetData = {
                    id: newItem.el.getAttribute('data-gs-id'),
                    width: newItem.w,
                    height: newItem.h,
                    x: newItem.x,
                    y: newItem.y
                };

                if (existingIndex !== -1) {
                    // Update the existing widget data
                    updatedWidgets[existingIndex] = widgetData;
                } else {
                    // Add new widget data
                    updatedWidgets.push(widgetData);
                }
            });
        }

        // Listen for layout changes
        grid.on('change', function(event, items) {
            mergeWidgetChanges(items);
        });

        // Save button click event to send updates to Livewire
        document.getElementById('save-widgets-btn').addEventListener('click', function() {
            if (updatedWidgets.length > 0) {
                Livewire.dispatch('updateWidgets', {widgets : updatedWidgets});
                toastr.success('Widgets saved successfully!', 'Success');
            } else {
                toastr.info('No changes to save.', 'Info');
            }
        });
    });
</script>
@endpush