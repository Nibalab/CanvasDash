<div class="weather-widget text-white overflow-y-auto h-full">
    <h3 class="font-semibold">{{ $widget->title }}</h3>
    <p class="font-serif">{{ $widget->description }}</p>
    <hr />
    <div class="overflow-y-auto h-full">
        @if (!empty($widget->details))
        @foreach ($widget->details as $article)
        <div class="news-article border-b-2 mt-4 p-3">
            <!-- Article Image -->
            <img src="{{ $article['urlToImage'] }}" 
                 alt="{{ $article['title'] }}" 
                 class="w-full h-48 object-cover rounded-md mb-3">
    
            <!-- Article Title -->
            <h4 class="font-bold text-xl">
                <a href="{{ $article['url'] }}" target="_blank" class="hover:underline">
                    {{ $article['title'] }}
                </a>
            </h4>
    
            <!-- Description -->
            <p class="text-sm mb-2 text-white">
                {{ Str::limit($article['description'], 100) }}
            </p>
    
            <!-- Article Meta -->
            <div class="text-xs text-white">
                <p>Author: {{ $article['author'] ?? 'Unknown' }}</p>
                <p>Source: {{ $article['source']['name'] ?? 'N/A' }}</p>
                <p>Published At: {{ \Carbon\Carbon::parse($article['publishedAt'])->format('F j, Y, g:i A') }}</p>
            </div>
        </div>
        @endforeach
        @else
        <p>No news available at the moment.</p>
        @endif
    </div>
</div>

@push('styles')
<style>
    .weather-widget {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        border-radius: 8px;
    }

    .news-article {
        margin-bottom: 5px;
        /* Space between articles */
    }

    .news-article h4 {
        margin: 0;
        /* No margin for the article title */
        font-size: 1rem;
        /* Adjust the font size for the title */
    }

    .news-article p {
        margin: 3px 0;
        /* Space for the article description */
    }

    .widget-header h3 {
        margin: 0;
        font-size: 1.25rem;
        text-align: center;
        color: white;
    }

    .widget-body p {
        margin: 5px 0;
        font-size: 1rem;
        text-align: center;
        color: white;
    }
</style>
@endpush