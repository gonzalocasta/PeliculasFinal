// TMDB API Configuration
// Note: For production, this token should be stored securely on a backend server
// This is a read-only API token provided by the user for this demo project
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzYzODA2NzNhNTVlZGQyMGUyZDE2NTI0YTg4MTUzZCIsIm5iZiI6MTc2Mjg4MTAwNS4wNzksInN1YiI6IjY5MTM2ZGVkYzFlNzlkNzNhYmFhMjEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hMEIUzVIxyJ_gxHIRy7rh8CjE5Y3vgnr5a0SSnOUuIk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const MAX_KEYWORDS_FOR_SEARCH = 3;
const DEFAULT_MEDIA_TYPE = 'movie';

// HTML escape function to prevent XSS
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

// Escape for use in HTML attributes
function escapeAttr(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Validate YouTube video ID format (alphanumeric, hyphens, underscores, exactly 11 chars)
function isValidYouTubeId(id) {
    if (!id) return false;
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

// Validate media type
function isValidMediaType(type) {
    return type === 'movie' || type === 'tv';
}

// API fetch helper with error handling
async function fetchTMDB(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    
    return response.json();
}

// Format date to Spanish format
function formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Format runtime to hours and minutes
function formatRuntime(minutes) {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Get year from date
function getYear(dateString) {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
}

// Leaderboard static data (no API available for this)
const leaderboardData = [
    { name: "enterpr1se", allTime: "1.865.820", thisWeek: "58.074", avatar: "E", color: "#e91e63", percentage: 100 },
    { name: "djfresh828", allTime: "55.382", thisWeek: "19.008", avatar: "D", color: "#9c27b0", percentage: 33 },
    { name: "Shei", allTime: "2.306.378", thisWeek: "18.568", avatar: "S", color: "#2196f3", percentage: 32 },
    { name: "jedi.jesse", allTime: "369.796", thisWeek: "12.221", avatar: "J", color: "#4caf50", percentage: 21 },
    { name: "RuiZafon", allTime: "1.726.515", thisWeek: "10.805", avatar: "R", color: "#ff9800", percentage: 19 },
    { name: "Samara", allTime: "4.300.139", thisWeek: "8.796", avatar: "S", color: "#f44336", percentage: 15 },
    { name: "howardyu77", allTime: "9.788", thisWeek: "6.293", avatar: "H", color: "#607d8b", percentage: 11 },
    { name: "suwby", allTime: "137.835", thisWeek: "6.046", avatar: "S", color: "#795548", percentage: 10 },
    { name: "CrazyCaleb", allTime: "37.948", thisWeek: "5.198", avatar: "C", color: "#3f51b5", percentage: 9 },
    { name: "m 🥀", allTime: "89.121", thisWeek: "4.850", avatar: "M", color: "#009688", percentage: 8 }
];

// Current time window for trending
let currentTrendingWindow = 'day';

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Render all sections with API data
    loadTendencias();
    loadPeliculas();
    loadSeries();
    loadTrailers();
    loadPopular();
    loadGratis();
    renderLeaderboard();
    
    // Initialize toggle buttons
    initToggleButtons();
    
    // Cookie banner functionality
    initCookieBanner();
    
    // Initialize search
    initSearch();
    
    // Initialize header search
    initHeaderSearch();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize browse section
    initBrowseSection();
    
    // Smooth horizontal scroll with mouse wheel
    document.querySelectorAll('.cards-container').forEach(container => {
        container.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    });
});

// API Data Loading Functions
async function loadTendencias(timeWindow = 'day') {
    const container = document.getElementById('tendencias-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB(`/trending/all/${timeWindow}?language=es-ES`);
        const items = data.results.map(item => ({
            id: item.id,
            title: item.title || item.name,
            date: formatDate(item.release_date || item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: item.media_type || 'movie'
        }));
        container.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading trending:', error);
        container.innerHTML = '<div class="error">Error al cargar datos</div>';
    }
}

async function loadPeliculas(filter = 'popular') {
    const container = document.getElementById('peliculas-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB(`/movie/${filter}?language=es-ES&page=1`);
        const items = data.results.map(item => ({
            id: item.id,
            title: item.title,
            date: formatDate(item.release_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'movie'
        }));
        container.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading movies:', error);
        container.innerHTML = '<div class="error">Error al cargar películas</div>';
    }
}

async function loadSeries(filter = 'popular') {
    const container = document.getElementById('series-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB(`/tv/${filter}?language=es-ES&page=1`);
        const items = data.results.map(item => ({
            id: item.id,
            title: item.name,
            date: formatDate(item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'tv'
        }));
        container.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading series:', error);
        container.innerHTML = '<div class="error">Error al cargar series</div>';
    }
}

async function loadTrailers() {
    const container = document.getElementById('trailers-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB('/movie/now_playing?language=es-ES&page=1');
        
        // Get videos for each movie concurrently using Promise.all
        const movies = data.results.slice(0, 15);
        const videoPromises = movies.map(async (movie) => {
            try {
                const videos = await fetchTMDB(`/movie/${movie.id}/videos?language=es-ES`);
                let trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                if (!trailer) {
                    // Try English if no Spanish trailer
                    const enVideos = await fetchTMDB(`/movie/${movie.id}/videos?language=en-US`);
                    trailer = enVideos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                }
                if (trailer) {
                    return {
                        id: movie.id,
                        title: movie.title,
                        subtitle: trailer.name,
                        thumbnail: movie.backdrop_path ? `${IMAGE_BASE_URL}/w533_and_h300_bestv2${movie.backdrop_path}` : `${IMAGE_BASE_URL}/w533_and_h300_bestv2${movie.poster_path}`,
                        videoKey: trailer.key,
                        mediaType: 'movie'
                    };
                }
                return null;
            } catch (err) {
                // Skip movies where video fetch fails
                return null;
            }
        });
        
        const results = await Promise.all(videoPromises);
        const moviesWithVideos = results.filter(item => item !== null);
        
        container.innerHTML = moviesWithVideos.map(item => createTrailerCard(item)).join('');
    } catch (error) {
        console.error('Error loading trailers:', error);
        container.innerHTML = '<div class="error">Error al cargar tráileres</div>';
    }
}

async function loadPopular() {
    const container = document.getElementById('popular-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB('/tv/popular?language=es-ES&page=1');
        const items = data.results.map(item => ({
            id: item.id,
            title: item.name,
            date: formatDate(item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'tv'
        }));
        container.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading popular:', error);
        container.innerHTML = '<div class="error">Error al cargar datos</div>';
    }
}

async function loadGratis() {
    const container = document.getElementById('gratis-cards');
    container.innerHTML = '<div class="loading">Cargando...</div>';
    
    try {
        const data = await fetchTMDB('/movie/upcoming?language=es-ES&page=1');
        const items = data.results.map(item => ({
            id: item.id,
            title: item.title,
            date: formatDate(item.release_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'movie'
        }));
        container.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading free movies:', error);
        container.innerHTML = '<div class="error">Error al cargar datos</div>';
    }
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = leaderboardData.map(item => createLeaderboardItem(item)).join('');
}

// Card creation functions
function createMovieCard(item) {
    const ratingClass = item.rating >= 70 ? 'high' : item.rating >= 50 ? 'medium' : 'low';
    const ratingDisplay = item.rating > 0 ? `${item.rating}<sup>%</sup>` : 'NR';
    const safeMediaType = isValidMediaType(item.mediaType) ? item.mediaType : DEFAULT_MEDIA_TYPE;
    const safeId = parseInt(item.id, 10);
    
    return `
        <div class="card" onclick="openMovieDetail(${safeId}, '${safeMediaType}')">
            <div class="card-poster">
                <img src="${escapeAttr(item.poster)}" alt="${escapeAttr(item.title)}" loading="lazy">
                <div class="card-rating ${ratingClass}">
                    <span>${ratingDisplay}</span>
                </div>
                <div class="card-menu">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${escapeHtml(item.title)}</div>
                <div class="card-date">${escapeHtml(item.date)}</div>
            </div>
        </div>
    `;
}

function createTrailerCard(item) {
    const safeVideoKey = isValidYouTubeId(item.videoKey) ? item.videoKey : '';
    
    return `
        <div class="trailer-card" onclick="playTrailer('${escapeAttr(safeVideoKey)}', '${escapeAttr(item.title)}')">
            <div class="trailer-thumbnail">
                <img src="${escapeAttr(item.thumbnail)}" alt="${escapeAttr(item.title)}" loading="lazy">
                <div class="play-icon">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="trailer-info">
                <div class="trailer-title">${escapeHtml(item.title)}</div>
                <div class="trailer-subtitle">${escapeHtml(item.subtitle)}</div>
            </div>
        </div>
    `;
}

function createLeaderboardItem(item) {
    return `
        <div class="leaderboard-item">
            <div class="leaderboard-avatar" style="background-color: ${escapeAttr(item.color)}">
                ${escapeHtml(item.avatar)}
            </div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${escapeHtml(item.name)}</div>
                <div class="leaderboard-stats">
                    <span>${escapeHtml(item.allTime)}</span>
                    <span>${escapeHtml(item.thisWeek)}</span>
                </div>
            </div>
            <div class="leaderboard-bar">
                <div class="leaderboard-bar-fill" style="width: ${parseInt(item.percentage, 10)}%"></div>
            </div>
        </div>
    `;
}

// Movie Detail Modal Functions
async function openMovieDetail(id, mediaType) {
    // Validate inputs
    const safeId = parseInt(id, 10);
    if (isNaN(safeId) || safeId <= 0) {
        console.error('Invalid movie ID');
        return;
    }
    
    if (!isValidMediaType(mediaType)) {
        console.error('Invalid media type');
        return;
    }
    
    const modal = document.getElementById('movie-modal');
    const modalContent = document.getElementById('movie-detail-content');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalContent.innerHTML = '<div class="loading-detail">Cargando...</div>';
    
    try {
        // Fetch movie/tv details with credits
        const details = await fetchTMDB(`/${mediaType}/${safeId}?language=es-ES&append_to_response=credits,videos`);
        
        // Get director(s) or creator(s)
        let director = null;
        if (mediaType === 'movie') {
            director = details.credits.crew.find(person => person.job === 'Director');
        } else {
            director = details.created_by && details.created_by[0];
        }
        
        // Get main cast (first 8)
        const cast = details.credits.cast.slice(0, 8);
        
        // Get trailer
        let trailer = null;
        if (details.videos && details.videos.results) {
            trailer = details.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        }
        
        // Format genres
        const genres = details.genres.map(g => g.name).join(', ');
        
        // Get runtime or episode runtime
        const runtime = mediaType === 'movie' ? details.runtime : (details.episode_run_time && details.episode_run_time[0]);
        
        // Build the detail HTML
        const backdropUrl = details.backdrop_path ? `${IMAGE_BASE_URL}/w1920_and_h800_multi_faces${details.backdrop_path}` : '';
        const posterUrl = details.poster_path ? `${IMAGE_BASE_URL}/w342${details.poster_path}` : 'https://via.placeholder.com/342x513?text=No+Image';
        const releaseDate = details.release_date || details.first_air_date;
        const title = details.title || details.name;
        const rating = Math.round(details.vote_average * 10);
        const ratingClass = rating >= 70 ? 'high' : rating >= 50 ? 'medium' : 'low';
        
        // Validate trailer key
        const safeTrailerKey = trailer && isValidYouTubeId(trailer.key) ? trailer.key : null;
        
        modalContent.innerHTML = `
            <div class="movie-detail-header" style="background-image: linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%), url('${escapeAttr(backdropUrl)}');">
                <div class="movie-detail-poster">
                    <img src="${escapeAttr(posterUrl)}" alt="${escapeAttr(title)}">
                </div>
                <div class="movie-detail-info">
                    <h1 class="movie-detail-title">
                        ${escapeHtml(title)} <span class="movie-year">(${getYear(releaseDate)})</span>
                    </h1>
                    <div class="movie-detail-facts">
                        <span class="movie-date">${escapeHtml(formatDate(releaseDate))} (ES)</span>
                        <span class="movie-genres">${escapeHtml(genres)}</span>
                        ${runtime ? `<span class="movie-runtime">${escapeHtml(formatRuntime(runtime))}</span>` : ''}
                    </div>
                    <div class="movie-detail-actions">
                        <div class="movie-rating-circle ${ratingClass}">
                            <span>${rating}<sup>%</sup></span>
                        </div>
                        <span class="rating-label">Puntuación<br>de usuarios</span>
                        ${safeTrailerKey ? `<button class="play-trailer-btn" onclick="playTrailer('${escapeAttr(safeTrailerKey)}', '${escapeAttr(title)}')">
                            <i class="fas fa-play"></i> Reproducir tráiler
                        </button>` : ''}
                    </div>
                    ${details.tagline ? `<p class="movie-tagline">${escapeHtml(details.tagline)}</p>` : ''}
                    <div class="movie-overview">
                        <h3>Vista general</h3>
                        <p>${escapeHtml(details.overview || 'Sin descripción disponible.')}</p>
                    </div>
                    ${director ? `
                    <div class="movie-director">
                        <div class="director-info">
                            <span class="director-name">${escapeHtml(director.name)}</span>
                            <span class="director-job">${mediaType === 'movie' ? 'Director' : 'Creador'}</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="movie-detail-cast">
                <h2>Reparto principal</h2>
                <div class="cast-scroll">
                    ${cast.map(person => `
                        <div class="cast-card">
                            <img src="${person.profile_path ? escapeAttr(`${IMAGE_BASE_URL}/w185${person.profile_path}`) : 'https://via.placeholder.com/185x278?text=No+Image'}" alt="${escapeAttr(person.name)}">
                            <div class="cast-info">
                                <span class="cast-name">${escapeHtml(person.name)}</span>
                                <span class="cast-character">${escapeHtml(person.character)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="movie-detail-sidebar">
                <div class="sidebar-info">
                    <h4>Estado</h4>
                    <p>${escapeHtml(details.status === 'Released' ? 'Estrenada' : details.status === 'Returning Series' ? 'En emisión' : details.status)}</p>
                </div>
                <div class="sidebar-info">
                    <h4>Idioma original</h4>
                    <p>${escapeHtml(getLanguageName(details.original_language))}</p>
                </div>
                ${details.budget ? `
                <div class="sidebar-info">
                    <h4>Presupuesto</h4>
                    <p>${escapeHtml(formatMoney(details.budget))}</p>
                </div>
                ` : ''}
                ${details.revenue ? `
                <div class="sidebar-info">
                    <h4>Ingresos</h4>
                    <p>${escapeHtml(formatMoney(details.revenue))}</p>
                </div>
                ` : ''}
            </div>
        `;
    } catch (error) {
        console.error('Error loading movie details:', error);
        modalContent.innerHTML = '<div class="error">Error al cargar los detalles</div>';
    }
}

function closeMovieDetail() {
    const modal = document.getElementById('movie-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Trailer player
function playTrailer(videoKey, title) {
    // Validate YouTube video ID
    if (!isValidYouTubeId(videoKey)) {
        console.error('Invalid YouTube video ID');
        return;
    }
    
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    const trailerTitle = document.getElementById('trailer-title');
    
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoKey)}?autoplay=1`;
    trailerTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTrailer() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Helper functions
function getLanguageName(code) {
    const languages = {
        'en': 'Inglés',
        'es': 'Español',
        'fr': 'Francés',
        'de': 'Alemán',
        'it': 'Italiano',
        'pt': 'Portugués',
        'ja': 'Japonés',
        'ko': 'Coreano',
        'zh': 'Chino',
        'ru': 'Ruso'
    };
    return languages[code] || code.toUpperCase();
}

function formatMoney(amount) {
    if (!amount) return '-';
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
}

// Toggle buttons functionality
function initToggleButtons() {
    // Tendencias toggle
    const tendenciasSection = document.querySelector('.tendencias .toggle-buttons');
    if (tendenciasSection) {
        tendenciasSection.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                tendenciasSection.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                if (filter === 'hoy') {
                    loadTendencias('day');
                } else if (filter === 'semana') {
                    loadTendencias('week');
                }
            });
        });
    }
    
    // Películas toggle
    const peliculasSection = document.querySelector('.peliculas .toggle-buttons');
    if (peliculasSection) {
        peliculasSection.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                peliculasSection.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                loadPeliculas(filter);
            });
        });
    }
    
    // Series toggle
    const seriesSection = document.querySelector('.series .toggle-buttons');
    if (seriesSection) {
        seriesSection.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                seriesSection.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                loadSeries(filter);
            });
        });
    }
    
    // Other toggle buttons (visual only for now)
    document.querySelectorAll('.toggle-buttons').forEach(container => {
        if (container === tendenciasSection || container === peliculasSection || container === seriesSection) return;
        
        container.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                container.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

async function performSearch(query) {
    // Validate and sanitize search query
    if (!query || typeof query !== 'string') return;
    
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    
    // Limit query length to prevent abuse
    const sanitizedQuery = trimmedQuery.slice(0, 100);
    
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsCards = document.getElementById('search-results-cards');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    // Show loading state
    searchResultsSection.style.display = 'block';
    searchResultsCards.innerHTML = '<div class="loading">Buscando...</div>';
    searchResultsInfo.innerHTML = '';
    
    // Scroll to search results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
    
    try {
        // Search by title/name using multi search
        const titleSearchPromise = fetchTMDB(`/search/multi?language=es-ES&query=${encodeURIComponent(sanitizedQuery)}&page=1`);
        
        // Search by keyword to get keyword IDs
        const keywordSearchPromise = fetchTMDB(`/search/keyword?query=${encodeURIComponent(sanitizedQuery)}&page=1`);
        
        const [titleData, keywordData] = await Promise.all([titleSearchPromise, keywordSearchPromise]);
        
        // Collect results from title search (movies and TV shows only)
        const titleResults = (titleData.results || [])
            .filter(r => r.media_type === 'movie' || r.media_type === 'tv')
            .map(item => ({
                id: item.id,
                title: item.title || item.name,
                date: formatDate(item.release_date || item.first_air_date),
                rating: Math.round(item.vote_average * 10),
                poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
                mediaType: item.media_type
            }));
        
        // Search movies by keywords
        let keywordResults = [];
        if (keywordData.results && keywordData.results.length > 0) {
            // Get movies for each keyword (limit to MAX_KEYWORDS_FOR_SEARCH keywords)
            const keywordIds = keywordData.results.slice(0, MAX_KEYWORDS_FOR_SEARCH).map(k => k.id);
            
            const keywordMoviePromises = keywordIds.map(keywordId =>
                fetchTMDB(`/discover/movie?language=es-ES&with_keywords=${keywordId}&page=1`)
                    .catch(() => ({ results: [] }))
            );
            
            const keywordMoviesResults = await Promise.all(keywordMoviePromises);
            
            // Flatten and format keyword results
            keywordMoviesResults.forEach(data => {
                if (data.results) {
                    data.results.forEach(item => {
                        keywordResults.push({
                            id: item.id,
                            title: item.title,
                            date: formatDate(item.release_date),
                            rating: Math.round(item.vote_average * 10),
                            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
                            mediaType: 'movie'
                        });
                    });
                }
            });
        }
        
        // Combine results and remove duplicates using Map for efficiency
        const resultsMap = new Map();
        [...titleResults, ...keywordResults].forEach(result => {
            const key = `${result.mediaType}-${result.id}`;
            if (!resultsMap.has(key)) {
                resultsMap.set(key, result);
            }
        });
        const uniqueResults = Array.from(resultsMap.values());
        
        // Display results
        if (uniqueResults.length > 0) {
            searchResultsInfo.innerHTML = `<p>Se encontraron <strong>${uniqueResults.length}</strong> resultados para "<strong>${escapeHtml(sanitizedQuery)}</strong>"</p>`;
            searchResultsCards.innerHTML = uniqueResults.map(item => createMovieCard(item)).join('');
        } else {
            searchResultsInfo.innerHTML = `<p>No se encontraron resultados para "<strong>${escapeHtml(sanitizedQuery)}</strong>"</p>`;
            searchResultsCards.innerHTML = '<div class="no-results">No hay películas o series que coincidan con tu búsqueda.</div>';
        }
    } catch (error) {
        console.error('Error searching:', error);
        searchResultsCards.innerHTML = '<div class="error">Error al buscar. Por favor, intenta de nuevo.</div>';
    }
}

function closeSearchResults() {
    const searchResultsSection = document.getElementById('search-results');
    searchResultsSection.style.display = 'none';
}

// Cookie banner functionality
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.add('hidden');
    }
    
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('hidden');
    });
    
    const rejectBtn = cookieBanner.querySelector('.cookie-btn.reject');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            cookieBanner.classList.add('hidden');
        });
    }
}

// Navigation functionality
function initNavigation() {
    // Dropdown navigation is handled via CSS hover states
    // This function can be used for mobile menu toggle if needed
}

// Go to home - closes any open sections and returns to the initial home view
function goHome() {
    // Close browse section if open
    const browseSection = document.getElementById('browse-section');
    if (browseSection) {
        browseSection.style.display = 'none';
    }
    
    // Close search results if open
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    // Close any open modals
    closeMovieDetail();
    closeTrailer();
    
    // Show all main sections
    toggleMainSections(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modals on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMovieDetail();
        closeTrailer();
    }
});

// Close modals on click outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeMovieDetail();
    }
    if (e.target.classList.contains('trailer-modal-overlay')) {
        closeTrailer();
    }
});

// Navigation functions for movies and series
async function showMovies() {
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsCards = document.getElementById('search-results-cards');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    // Show loading state
    searchResultsSection.style.display = 'block';
    searchResultsCards.innerHTML = '<div class="loading">Cargando películas...</div>';
    searchResultsInfo.innerHTML = '';
    
    // Scroll to search results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
    
    try {
        const data = await fetchTMDB('/movie/popular?language=es-ES&page=1');
        const items = data.results.map(item => ({
            id: item.id,
            title: item.title,
            date: formatDate(item.release_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'movie'
        }));
        
        searchResultsInfo.innerHTML = `<p><strong>Películas populares</strong></p>`;
        searchResultsCards.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading movies:', error);
        searchResultsCards.innerHTML = '<div class="error">Error al cargar películas</div>';
    }
}

async function showSeries() {
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsCards = document.getElementById('search-results-cards');
    const searchResultsInfo = document.getElementById('search-results-info');
    
    // Show loading state
    searchResultsSection.style.display = 'block';
    searchResultsCards.innerHTML = '<div class="loading">Cargando series...</div>';
    searchResultsInfo.innerHTML = '';
    
    // Scroll to search results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
    
    try {
        const data = await fetchTMDB('/tv/popular?language=es-ES&page=1');
        const items = data.results.map(item => ({
            id: item.id,
            title: item.name,
            date: formatDate(item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'tv'
        }));
        
        searchResultsInfo.innerHTML = `<p><strong>Series populares</strong></p>`;
        searchResultsCards.innerHTML = items.map(item => createMovieCard(item)).join('');
    } catch (error) {
        console.error('Error loading series:', error);
        searchResultsCards.innerHTML = '<div class="error">Error al cargar series</div>';
    }
}

// ========== Browse Section Functionality ==========
// Unified browse section for movies and series

let browseCurrentType = 'movie'; // 'movie' or 'tv'
let browseCurrentFilter = 'popular';
let browseCurrentPage = 1;
let browseIsLoading = false;

// Filter configurations
const movieFilters = [
    { value: 'popular', label: 'Populares' },
    { value: 'now_playing', label: 'En cartelera' },
    { value: 'upcoming', label: 'Próximamente' },
    { value: 'top_rated', label: 'Mejor valoradas' }
];

const tvFilters = [
    { value: 'popular', label: 'Populares' },
    { value: 'airing_today', label: 'Emitiendo hoy' },
    { value: 'on_the_air', label: 'En emisión' },
    { value: 'top_rated', label: 'Mejor valoradas' }
];

// Show browse section with specific type and filter
function showBrowseSection(type, filter) {
    // Validate type
    if (!isValidMediaType(type)) {
        console.error('Invalid type');
        return;
    }
    
    // Validate filter based on type
    const validFilters = type === 'movie' ? movieFilters : tvFilters;
    if (!validFilters.some(f => f.value === filter)) {
        filter = 'popular'; // Default to popular if invalid
    }
    
    browseCurrentType = type;
    browseCurrentFilter = filter;
    browseCurrentPage = 1;
    
    // Hide main content sections
    toggleMainSections(false);
    
    // Show browse section
    const browseSection = document.getElementById('browse-section');
    browseSection.style.display = 'block';
    
    // Update title
    document.getElementById('browse-title').textContent = type === 'movie' ? 'Películas' : 'Series';
    
    // Update type buttons
    updateBrowseTypeButtons(type);
    
    // Update filter buttons
    updateBrowseFilterButtons(type, filter);
    
    // Load content
    loadBrowseContent(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close browse section and show main content
function closeBrowseSection() {
    document.getElementById('browse-section').style.display = 'none';
    toggleMainSections(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle main content sections visibility
function toggleMainSections(show) {
    const sections = [
        'tendencias-section', 'peliculas-section', 
        'series-section', 'trailers-section', 'popular-section', 
        'gratis-section', 'leaderboard-section'
    ];
    
    // Handle hero section separately (it uses a class selector)
    const heroEl = document.querySelector('.hero');
    if (heroEl) heroEl.style.display = show ? '' : 'none';
    
    // Handle search results section
    const searchResultsEl = document.getElementById('search-results');
    if (searchResultsEl) searchResultsEl.style.display = show ? 'none' : 'none';
    
    // Handle all other sections
    sections.forEach(id => {
        const sectionEl = document.getElementById(id);
        if (sectionEl) sectionEl.style.display = show ? '' : 'none';
    });
}

// Update type buttons (Movies/Series)
function updateBrowseTypeButtons(currentType) {
    const container = document.getElementById('browse-type-buttons');
    if (!container) return;
    
    container.querySelectorAll('.filter-btn-vertical').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === currentType) {
            btn.classList.add('active');
        }
    });
}

// Update filter buttons based on type
function updateBrowseFilterButtons(type, currentFilter) {
    const container = document.getElementById('browse-filter-buttons');
    if (!container) return;
    
    const filters = type === 'movie' ? movieFilters : tvFilters;
    
    container.innerHTML = filters.map(f => `
        <button class="filter-btn-vertical ${f.value === currentFilter ? 'active' : ''}" 
                data-filter="${escapeAttr(f.value)}">${escapeHtml(f.label)}</button>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.filter-btn-vertical').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            if (filter && filter !== browseCurrentFilter) {
                browseCurrentFilter = filter;
                browseCurrentPage = 1;
                updateBrowseFilterButtons(browseCurrentType, filter);
                loadBrowseContent(true);
            }
        });
    });
}

// Initialize browse section event listeners
function initBrowseSection() {
    // Type buttons
    const typeContainer = document.getElementById('browse-type-buttons');
    if (typeContainer) {
        typeContainer.querySelectorAll('.filter-btn-vertical').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.dataset.type;
                if (type && type !== browseCurrentType) {
                    browseCurrentType = type;
                    browseCurrentFilter = 'popular';
                    browseCurrentPage = 1;
                    
                    // Update title
                    document.getElementById('browse-title').textContent = type === 'movie' ? 'Películas' : 'Series';
                    
                    // Update buttons
                    updateBrowseTypeButtons(type);
                    updateBrowseFilterButtons(type, 'popular');
                    
                    // Load content
                    loadBrowseContent(true);
                }
            });
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('browse-load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (!browseIsLoading) {
                browseCurrentPage++;
                loadBrowseContent(false);
            }
        });
    }
}

// Load browse content (movies or series)
async function loadBrowseContent(clearExisting = true) {
    const container = document.getElementById('browse-grid');
    const loadMoreBtn = document.getElementById('browse-load-more-btn');
    
    if (!container) return;
    
    browseIsLoading = true;
    
    if (clearExisting) {
        container.innerHTML = '<div class="loading">Cargando...</div>';
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Cargando...';
    }
    
    try {
        const endpoint = browseCurrentType === 'movie' 
            ? `/movie/${browseCurrentFilter}?language=es-ES&page=${browseCurrentPage}`
            : `/tv/${browseCurrentFilter}?language=es-ES&page=${browseCurrentPage}`;
        
        const data = await fetchTMDB(endpoint);
        
        const items = data.results.map(item => ({
            id: item.id,
            title: browseCurrentType === 'movie' ? item.title : item.name,
            date: formatDate(browseCurrentType === 'movie' ? item.release_date : item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: browseCurrentType
        }));
        
        const cardsHtml = items.map(item => createBrowseCardGrid(item)).join('');
        
        if (clearExisting) {
            container.innerHTML = cardsHtml;
        } else {
            container.insertAdjacentHTML('beforeend', cardsHtml);
        }
        
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Cargar más';
            // Hide button if no more pages
            if (browseCurrentPage >= data.total_pages) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error loading browse content:', error);
        if (clearExisting) {
            container.innerHTML = '<div class="error">Error al cargar contenido. Por favor, intenta de nuevo.</div>';
        }
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Cargar más';
        }
    }
    
    browseIsLoading = false;
}

// Create card for browse grid
function createBrowseCardGrid(item) {
    const ratingClass = item.rating >= 70 ? 'high' : item.rating >= 50 ? 'medium' : 'low';
    const ratingDisplay = item.rating > 0 ? `${item.rating}<sup>%</sup>` : 'NR';
    const safeMediaType = isValidMediaType(item.mediaType) ? item.mediaType : DEFAULT_MEDIA_TYPE;
    const safeId = parseInt(item.id, 10);
    
    return `
        <div class="card-grid" onclick="openMovieDetail(${safeId}, '${safeMediaType}')">
            <div class="card-poster">
                <img src="${escapeAttr(item.poster)}" alt="${escapeAttr(item.title)}" loading="lazy">
                <div class="card-rating ${ratingClass}">
                    <span>${ratingDisplay}</span>
                </div>
                <div class="card-menu">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${escapeHtml(item.title)}</div>
                <div class="card-date">${escapeHtml(item.date)}</div>
            </div>
        </div>
    `;
}

// ========== Header Search Functionality ==========

// Toggle header search bar visibility
function toggleHeaderSearch() {
    const searchBar = document.getElementById('header-search-bar');
    const searchInput = document.getElementById('header-search-input');
    
    if (searchBar.classList.contains('active')) {
        closeHeaderSearch();
    } else {
        searchBar.classList.add('active');
        searchInput.focus();
    }
}

// Close header search bar
function closeHeaderSearch() {
    const searchBar = document.getElementById('header-search-bar');
    const searchInput = document.getElementById('header-search-input');
    
    searchBar.classList.remove('active');
    searchInput.value = '';
}

// Perform search from header search bar
function performHeaderSearch() {
    const searchInput = document.getElementById('header-search-input');
    const query = searchInput.value;
    
    if (query && query.trim()) {
        // Close browse section if open
        const browseSection = document.getElementById('browse-section');
        if (browseSection && browseSection.style.display !== 'none') {
            closeBrowseSection();
        }
        
        // Perform the search using existing function
        performSearch(query);
        
        // Close the header search bar
        closeHeaderSearch();
    }
}

// Initialize header search events
function initHeaderSearch() {
    const searchInput = document.getElementById('header-search-input');
    const searchToggle = document.getElementById('header-search-toggle');
    const searchBtn = document.getElementById('header-search-btn');
    const searchClose = document.getElementById('header-search-close');
    
    // Toggle search bar on icon click
    if (searchToggle) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleHeaderSearch();
        });
    }
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performHeaderSearch();
        });
    }
    
    // Close button click
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            closeHeaderSearch();
        });
    }
    
    if (searchInput) {
        // Handle Enter key press
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
        
        // Handle Escape key to close
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeHeaderSearch();
            }
        });
    }
}
