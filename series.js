// Series page specific JavaScript
let currentFilter = 'popular';
let currentPage = 1;
let isLoading = false;

document.addEventListener('DOMContentLoaded', function() {
    // Get filter from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    // Validate filter parameter
    const validFilters = ['popular', 'airing_today', 'on_the_air', 'top_rated'];
    if (filterParam && validFilters.includes(filterParam)) {
        currentFilter = filterParam;
        // Update active button
        updateActiveFilterButton(currentFilter);
    }
    
    // Load initial series
    loadSeriesPage();
    
    // Initialize filter buttons
    initFilterButtons();
    
    // Initialize load more button
    initLoadMoreButton();
    
    // Initialize sort select
    initSortSelect();
});

function updateActiveFilterButton(filter) {
    document.querySelectorAll('.filter-btn-vertical').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
}

function initFilterButtons() {
    document.querySelectorAll('.filter-btn-vertical').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            if (filter && filter !== currentFilter) {
                currentFilter = filter;
                currentPage = 1;
                updateActiveFilterButton(filter);
                // Update URL without page reload
                const url = new URL(window.location);
                url.searchParams.set('filter', filter);
                window.history.pushState({}, '', url);
                loadSeriesPage(true);
            }
        });
    });
}

function initLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (!isLoading) {
                currentPage++;
                loadSeriesPage(false);
            }
        });
    }
}

function initSortSelect() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentPage = 1;
            loadSeriesPage(true);
        });
    }
}

async function loadSeriesPage(clearExisting = true) {
    const container = document.getElementById('series-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!container) return;
    
    isLoading = true;
    
    if (clearExisting) {
        container.innerHTML = '<div class="loading">Cargando series...</div>';
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Cargando...';
    }
    
    try {
        const data = await fetchTMDB(`/tv/${currentFilter}?language=es-ES&page=${currentPage}`);
        const items = data.results.map(item => ({
            id: item.id,
            title: item.name,
            date: formatDate(item.first_air_date),
            rating: Math.round(item.vote_average * 10),
            poster: item.poster_path ? `${IMAGE_BASE_URL}/w220_and_h330_face${item.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image',
            mediaType: 'tv'
        }));
        
        const cardsHtml = items.map(item => createSeriesCardGrid(item)).join('');
        
        if (clearExisting) {
            container.innerHTML = cardsHtml;
        } else {
            container.insertAdjacentHTML('beforeend', cardsHtml);
        }
        
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Cargar más';
            // Hide button if no more pages
            if (currentPage >= data.total_pages) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error loading series:', error);
        if (clearExisting) {
            container.innerHTML = '<div class="error">Error al cargar series. Por favor, intenta de nuevo.</div>';
        }
        if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Cargar más';
        }
    }
    
    isLoading = false;
}

function createSeriesCardGrid(item) {
    const ratingClass = item.rating >= 70 ? 'high' : item.rating >= 50 ? 'medium' : 'low';
    const ratingDisplay = item.rating > 0 ? `${item.rating}<sup>%</sup>` : 'NR';
    const safeMediaType = isValidMediaType(item.mediaType) ? item.mediaType : 'tv';
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
