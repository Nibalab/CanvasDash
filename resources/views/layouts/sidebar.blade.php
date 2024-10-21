<!-- Sidebar -->
<div class="min-h-screen w-64 flex flex-col bg-dark border-r border-gray-700">
    <div class="pt-4 text-center font-bold text-lg border-b">
        <div class="wow animate__animated animate__fadeInDown flex justify-center mb-6">
            <picture>
                <source srcset="images/logo2.jpg" media="(max-width: 767px)" />
                <img src="images/logo1.jpg" alt="MyDashboard Logo" class="h-16 object-contain">
            </picture>
        </div>
    </div>
    <nav class="flex-grow">
        <ul class="space-y-4 mt-6 mx-2">
            <li>
                <a href="{{route('home')}}"
                    class="text-blue-500 block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg font-serif">
                    Home
                </a>
            </li>
            @foreach(['map', 'covid19', 'weather', 'news', 'stockmarket'] as $widget)
            <li>
                @if(!App\Models\Widget::where('user_id', auth()->id())->where('name', "{$widget}-widget")->exists())
                <a href="{{route('add.'.$widget.'.widget')}}"
                    class="text-blue-500 block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg font-serif">
                    Add {{ucfirst($widget)}} Widget
                </a>

                @else
                <a href="javascript:void(0)"
                    class="widget-trigger text-blue-500 block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg font-serif"
                    data-widget="{{$widget}}">
                    Edit {{ucfirst($widget)}} Widget
                </a>
                @endif
            </li>
            @endforeach

            <li>
                <!-- Logout Form -->
                <form method="POST" action="{{ route('logout') }}" id="logout-form">
                    @csrf
                </form>

                <!-- Logout Button -->
                <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                    class="text-red-500 block px-4 py-2  rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg font-serif">
                    Logout
                </a>
            </li>
        </ul>
    </nav>
</div>

<!-- Widget Modals -->
@foreach(['map', 'covid19', 'weather', 'news', 'stockmarket'] as $widget)
<div id="{{$widget}}-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        @livewire('edit-'.$widget.'-widget', ['name' => $widget], key('edit_'. $widget))
    </div>
</div>
@endforeach

<!-- Custom Styles -->
<style>
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
</style>

<!-- Scripts -->
<script>
    document.querySelectorAll('.widget-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const widget = e.currentTarget.dataset.widget;
            document.getElementById(`${widget}-modal`).classList.remove('hidden');
        });
    });

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            e.currentTarget.closest('.fixed').classList.add('hidden');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('fixed')) {
            e.target.classList.add('hidden');
        }
    });
</script>