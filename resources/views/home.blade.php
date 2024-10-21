<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CanvasDash - Home Page</title>

    @vite('resources/css/app.css')

    <!-- WOW.js & Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
</head>

<body class="bg-gray-100 text-gray-900">

    <script>
        new WOW().init();
    </script>

    <!-- Header Section -->
    <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-2 md:px-6 py-4 flex justify-between items-center">
            <!-- Logo: Switch based on screen size -->
            <div class="wow animate__animated animate__fadeInDown">
                <picture>
                    <source srcset="images/logo2.jpg" media="(max-width: 767px)" />
                    <img src="images/logo1.jpg" alt="MyDashboard Logo" class="h-16 object-contain">
                </picture>
            </div>

            <div>
                @if (Route::has('login'))
                <nav class="flex flex-1 justify-end">
                    @auth
                    <!-- Authentication -->

                    <a href="{{ url('/dashboard') }}"
                        class=" bg-blue-600 text-white p-2 md:py-2 md:px-4 rounded-lg hover:bg-blue-700 wow animate__animated animate__bounceIn">
                        Dashboard
                    </a>

                    <!-- Logout Form -->
                    <form method="POST" action="{{ route('logout') }}" id="logout-form">
                        @csrf
                    </form>

                    <!-- Logout Button -->
                    <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                        class="ml-1 md:ml-2 bg-red-400 text-white p-2 md:py-2 md:px-4 rounded-lg hover:bg-red-700 wow animate__animated animate__bounceIn">
                        {{ __('Log Out') }}
                    </a>

                    @else
                    <a href="{{ route('login') }}"
                        class="text-blue-600 font-medium hover:underline mr-2 border-r-2 border-blue-200 pr-2">Login</a>
                    @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="text-blue-600 font-medium hover:underline">Register</a>
                    @endif
                    @endauth
                </nav>
                @endif
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-blue-50 py-16">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-extrabold text-blue-700 mb-4 wow animate__animated animate__fadeInUp">
                Create Your Custom Dashboard in Seconds
            </h2>
            <p class="text-lg text-gray-700 mb-6 wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
                Drag-and-drop widgets, real-time data from multiple sources, and complete customization—designed for
                you.
            </p>
            <a href="{{route('dashboard')}}"
                class="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 wow animate__animated animate__pulse"
                data-wow-delay="0.5s">
                Go to my Dashboard
            </a>
        </div>
    </section>


    <!-- Interactive Demo Section -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h3 class="text-2xl font-semibold text-gray-800 mb-8 text-center wow animate__animated animate__fadeIn">
                Explore Live Widgets
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gray-100 p-6 rounded-lg shadow-md wow animate__animated animate__zoomIn">
                    <h4 class="text-xl font-bold mb-4">🌤️ Live Weather</h4>
                    <div class="text-gray-700">22°C | Beirut</div>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md wow animate__animated animate__zoomIn"
                    data-wow-delay="0.2s">
                    <h4 class="text-xl font-bold mb-4">Stock Market</h4>
                    <div class="text-gray-700">AAPL: $174.50 ▲ 0.82%</div>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md wow animate__animated animate__zoomIn"
                    data-wow-delay="0.4s">
                    <h4 class="text-xl font-bold mb-4">Latest News</h4>
                    <div class="text-gray-700">“Global markets rally amid economic optimism...”</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Widget Cards Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <h3 class="text-2xl font-semibold text-gray-800 mb-8 wow animate__animated animate__fadeIn">Choose from a
                Variety of Widgets</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-md wow animate__animated animate__flipInX">
                    <h4 class="text-xl font-bold mb-4">Weather</h4>
                    <p class="text-gray-600 mb-4">Monitor weather trends in your favorite locations.</p>
                    @auth
                    @if(App\Models\Widget::where('user_id', auth()->id())->where('name', 'weather-widget')->exists())
                    <a href="{{route('dashboard')}}" class="text-blue-600 hover:underline">Go to Your
                        Dashboard</a>
                    @else
                    <a href="{{route('add.weather.widget')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endif
                    @else
                    <a href="{{route('login')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endauth
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md wow animate__animated animate__flipInX"
                    data-wow-delay="0.2s">
                    <h4 class="text-xl font-bold mb-4">Stocks</h4>
                    <p class="text-gray-600 mb-4">Track real-time stock prices and trends.</p>
                    @auth
                    @if(App\Models\Widget::where('user_id', auth()->id())->where('name',
                    'stockmarket-widget')->exists())
                    <a href="{{route('dashboard')}}" class="text-blue-600 hover:underline">Go to Your
                        Dashboard</a>
                    @else
                    <a href="{{route('add.stockmarket.widget')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endif
                    @else
                    <a href="{{route('login')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endauth
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md wow animate__animated animate__flipInX"
                    data-wow-delay="0.4s">
                    <h4 class="text-xl font-bold mb-4">Covid-19</h4>
                    <p class="text-gray-600 mb-4">Stay informed about the latest Covid-19 updates and safety measures.
                    </p>
                    @auth
                    @if(App\Models\Widget::where('user_id', auth()->id())->where('name', 'covid19-widget')->exists())
                    <a href="{{route('dashboard')}}" class="text-blue-600 hover:underline">Go to Your
                        Dashboard</a>
                    @else
                    <a href="{{route('add.covid19.widget')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endif
                    @else
                    <a href="{{route('login')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endauth
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md wow animate__animated animate__flipInX"
                    data-wow-delay="0.6s">
                    <h4 class="text-xl font-bold mb-4">News</h4>
                    <p class="text-gray-600 mb-4">Get the latest headlines relevant to you.</p>
                    @auth
                    @if(App\Models\Widget::where('user_id', auth()->id())->where('name', 'news-widget')->exists())
                    <a href="{{route('dashboard')}}" class="text-blue-600 hover:underline">Go to Your
                        Dashboard</a>
                    @else
                    <a href="{{route('add.news.widget')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endif
                    @else
                    <a href="{{route('login')}}" class="text-blue-600 hover:underline">Add to Your
                        Dashboard</a>
                    @endauth
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md wow animate__animated animate__flipInX"
                    data-wow-delay="0.6s">
                    <h4 class="text-xl font-bold mb-4">Interactive Map</h4>
                    <p class="text-gray-600 mb-4">Explore locations relevant to you on our interactive map.</p>

                    @auth
                    @if(App\Models\Widget::where('user_id', auth()->id())->where('name', 'map-widget')->exists())
                    <a href="{{ route('dashboard') }}" class="text-blue-600 hover:underline">Go to Your Dashboard</a>
                    @else
                    <a href="{{ route('add.map.widget') }}" class="text-blue-600 hover:underline">Add Map to Your
                        Dashboard</a>
                    @endif
                    @else
                    <a href="{{ route('login') }}" class="text-blue-600 hover:underline">Login to Add Map to Your
                        Dashboard</a>
                    @endauth
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Section -->
    <footer class="bg-gray-800 py-6 text-white">
        <div class="max-w-7xl mx-auto px-6 flex justify-center items-center">
            <p>&copy; 2024 CanvasDash. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // GridStack.init({column: 6});
    </script>
</body>

</html>