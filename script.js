// Movie/TV Data
const tendenciasData = [
    {
        title: "Bugonia",
        date: "7 nov 2025",
        rating: 62,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/vDuGGKZGJNHJvfbHqWEQIc7ZqTt.jpg"
    },
    {
        title: "Zootrópolis 2",
        date: "28 nov 2025",
        rating: 78,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/pEXggVkEhM0cQV5S9PmCBBPAqp4.jpg"
    },
    {
        title: "Stranger Things",
        date: "15 jul 2016",
        rating: 86,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg"
    },
    {
        title: "A pesar de ti",
        date: "24 oct 2025",
        rating: 75,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/mFP8sXGw8x0UzWR5XH0q25pkKhp.jpg"
    },
    {
        title: "Blue Moon",
        date: "28 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/l6T7Kl4RYzn8pVDPJvPEKKMpLXM.jpg"
    },
    {
        title: "Sueños de trenes",
        date: "7 nov 2025",
        rating: 68,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/6DJEFPzIZj8AHfCXwx4FSQD3Q9i.jpg"
    },
    {
        title: "Wicked Parte II",
        date: "21 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/d6YtW4HLwzaBG1e8bR4EYeJrVQT.jpg"
    },
    {
        title: "Dos mundos, un deseo",
        date: "25 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/i7kqOUjPllXLPt7BO8uPOj0e6vH.jpg"
    },
    {
        title: "Plan en familia 2",
        date: "21 nov 2025",
        rating: 64,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/hZEiB6a9Yzq3CtZq9pGWKRBcqPl.jpg"
    },
    {
        title: "It: Bienvenidos a Derry",
        date: "26 oct 2025",
        rating: 71,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/i39VyNcCpqGeCz3ByPPhT9XDOj6.jpg"
    },
    {
        title: "Legend of the Magnate",
        date: "25 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/aOcLALT1VXB2qwNqcVOXvdx5EI4.jpg"
    },
    {
        title: "Pluribus",
        date: "6 nov 2025",
        rating: 56,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/xSF2wLvhp1pR3C6lWF5dXx5GdpZ.jpg"
    },
    {
        title: "Ahora me ves 3",
        date: "14 nov 2025",
        rating: 67,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/pbbVoLNxOcAE1e8E7l4tGjd3fpO.jpg"
    },
    {
        title: "Historias Extrañas de la Dinastía Tang",
        date: "27 sep 2022",
        rating: 80,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/r5bMMT6w5pErj1HW0e4S8lYhprH.jpg"
    },
    {
        title: "xXx",
        date: "18 oct 2002",
        rating: 59,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg"
    },
    {
        title: "Frankenstein",
        date: "24 oct 2025",
        rating: 66,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/gNR4zKoaqPvl6S0XWwLkLPt8oHi.jpg"
    },
    {
        title: "Tulsa King",
        date: "13 nov 2022",
        rating: 83,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/fwTv3RPRAIy0maOMns5eYRRwnDk.jpg"
    },
    {
        title: "Robin Hood",
        date: "2 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/nlFpeew3dX3dWUljdJEr1sjHMlX.jpg"
    },
    {
        title: "Una batalla tras otra",
        date: "26 sep 2025",
        rating: 72,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/qPEA4w3L3SI41ZEvlcvUjvlWblO.jpg"
    },
    {
        title: "Altered",
        date: "18 sep 2025",
        rating: 61,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/oo7UjdlYmZ9q8lZPi0e6oLAhqk5.jpg"
    }
];

const trailersData = [
    {
        title: "One Piece",
        subtitle: "Episode 1151 Trailer - Her and Her Father's Dream! Bonney's Free Future [Subtitled]",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg"
    },
    {
        title: "Bugonia",
        subtitle: "Tráiler final [Subtitulado]",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/vDuGGKZGJNHJvfbHqWEQIc7ZqTt.jpg"
    },
    {
        title: "Rental Family",
        subtitle: "Tráiler Oficial [Subtitulado]",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/4tWLZI8arDKw2wXohZkLRN8xXJA.jpg"
    },
    {
        title: "Wicked Parte II",
        subtitle: "Tráiler Oficial DUB",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/d6YtW4HLwzaBG1e8bR4EYeJrVQT.jpg"
    },
    {
        title: "The Running Man",
        subtitle: "¿Hasta dónde llegarías para ganar 1.000 millones?",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/lOLpHLkPBcDoxUjBpxJySfNnhKF.jpg"
    },
    {
        title: "Sisu: Camino a la vengaza",
        subtitle: "La venganza no se negocia. Se ejecuta.",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3Qmv5odP0fMM3r3LCqLe5q4k8cv.jpg"
    },
    {
        title: "It: Bienvenidos a Derry",
        subtitle: "Trailer Oficial (NSFW) [Doblado]",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/i39VyNcCpqGeCz3ByPPhT9XDOj6.jpg"
    },
    {
        title: "Landman: Un negocio crudo",
        subtitle: "Season 2 Episode 3 Official Promo",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/fMcHi5SgANmIMQBUdqiO7i0s1tX.jpg"
    },
    {
        title: "Predator: Badlands",
        subtitle: "Anuncio: 'Distinta'",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/hDGKXsv8FT8N8xX8EqJkXaDnBBG.jpg"
    },
    {
        title: "La asistenta",
        subtitle: "Tráiler oficial",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/75kHqpSNk8YqVj1cK9PjSYEwLOq.jpg"
    },
    {
        title: "Hoppers",
        subtitle: "Tráiler Oficial en español",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/xqxnpxGLJX3J2rqeqXDvFH6CwNF.jpg"
    },
    {
        title: "Sueños de trenes",
        subtitle: "Final Trailer",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/6DJEFPzIZj8AHfCXwx4FSQD3Q9i.jpg"
    },
    {
        title: "Hamnet",
        subtitle: "Tráiler Oficial en español",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/nPcNPbFvnOXxLKGjOoMx5hVxF5L.jpg"
    },
    {
        title: "Los Juegos del Hambre: Amanecer en la Cosecha",
        subtitle: "Official Teaser",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/4NuLqSNwrphVBfFqNZCdL1YEKLO.jpg"
    },
    {
        title: "Five Nights at Freddy's 2",
        subtitle: "Tráiler Oficial 2 en español",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/jBLgqPjf79qnnYcH1BPWvTLjlNx.jpg"
    },
    {
        title: "Zootrópolis 2",
        subtitle: "Anuncio: 'Bésame el anillo'",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/pEXggVkEhM0cQV5S9PmCBBPAqp4.jpg"
    },
    {
        title: "Prodigiosa: Las aventuras de Ladybug",
        subtitle: "Vampigami Teaser - Season 6",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/u4UGLoU6TAcNeSbXcQYRlUJ0pPY.jpg"
    },
    {
        title: "Vaiana",
        subtitle: "Teaser Tráiler en V.O.S.E.",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/jeKG4LMx8kXPpyiPvWwgccVvPpC.jpg"
    },
    {
        title: "Avatar: Fuego y ceniza",
        subtitle: "Nuevo Tráiler Oficial en V.O.S.E.",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/eDMFaD42x8RpKJbLJ2eiA6ySJRl.jpg"
    },
    {
        title: "Ahora me ves 3",
        subtitle: "Trailer oficial doblado",
        thumbnail: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/pbbVoLNxOcAE1e8E7l4tGjd3fpO.jpg"
    }
];

const popularData = [
    {
        title: "Stranger Things",
        date: "15 jul 2016",
        rating: 86,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg"
    },
    {
        title: "La asistenta",
        date: "1 oct 2021",
        rating: 83,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/75kHqpSNk8YqVj1cK9PjSYEwLOq.jpg"
    },
    {
        title: "Tulsa King",
        date: "13 nov 2022",
        rating: 83,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/fwTv3RPRAIy0maOMns5eYRRwnDk.jpg"
    },
    {
        title: "It: Bienvenidos a Derry",
        date: "26 oct 2025",
        rating: 71,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/i39VyNcCpqGeCz3ByPPhT9XDOj6.jpg"
    },
    {
        title: "Landman: Un negocio crudo",
        date: "17 nov 2024",
        rating: 74,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/fMcHi5SgANmIMQBUdqiO7i0s1tX.jpg"
    },
    {
        title: "Squid Game",
        date: "17 sep 2021",
        rating: 78,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg"
    },
    {
        title: "Juego de Tronos",
        date: "17 abr 2011",
        rating: 84,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg"
    },
    {
        title: "The Last of Us",
        date: "15 ene 2023",
        rating: 85,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
    },
    {
        title: "Wednesday",
        date: "23 nov 2022",
        rating: 84,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"
    },
    {
        title: "Yellowstone",
        date: "20 jun 2018",
        rating: 81,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg"
    }
];

const gratisData = [
    {
        title: "Bugonia",
        date: "7 nov 2025",
        rating: 62,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/vDuGGKZGJNHJvfbHqWEQIc7ZqTt.jpg"
    },
    {
        title: "Frankenstein",
        date: "24 oct 2025",
        rating: 66,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/gNR4zKoaqPvl6S0XWwLkLPt8oHi.jpg"
    },
    {
        title: "Ahora me ves 3",
        date: "14 nov 2025",
        rating: 67,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/pbbVoLNxOcAE1e8E7l4tGjd3fpO.jpg"
    },
    {
        title: "Wicked Parte II",
        date: "21 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/d6YtW4HLwzaBG1e8bR4EYeJrVQT.jpg"
    },
    {
        title: "Zootrópolis 2",
        date: "28 nov 2025",
        rating: 78,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/pEXggVkEhM0cQV5S9PmCBBPAqp4.jpg"
    },
    {
        title: "Sueños de trenes",
        date: "7 nov 2025",
        rating: 68,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/6DJEFPzIZj8AHfCXwx4FSQD3Q9i.jpg"
    },
    {
        title: "Blue Moon",
        date: "28 nov 2025",
        rating: 0,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/l6T7Kl4RYzn8pVDPJvPEKKMpLXM.jpg"
    },
    {
        title: "Plan en familia 2",
        date: "21 nov 2025",
        rating: 64,
        poster: "https://image.tmdb.org/t/p/w220_and_h330_face/hZEiB6a9Yzq3CtZq9pGWKRBcqPl.jpg"
    }
];

const leaderboardData = [
    {
        name: "enterpr1se",
        allTime: "1.865.820",
        thisWeek: "58.074",
        avatar: "E",
        color: "#e91e63",
        percentage: 100
    },
    {
        name: "djfresh828",
        allTime: "55.382",
        thisWeek: "19.008",
        avatar: "D",
        color: "#9c27b0",
        percentage: 33
    },
    {
        name: "Shei",
        allTime: "2.306.378",
        thisWeek: "18.568",
        avatar: "S",
        color: "#2196f3",
        percentage: 32
    },
    {
        name: "jedi.jesse",
        allTime: "369.796",
        thisWeek: "12.221",
        avatar: "J",
        color: "#4caf50",
        percentage: 21
    },
    {
        name: "RuiZafon",
        allTime: "1.726.515",
        thisWeek: "10.805",
        avatar: "R",
        color: "#ff9800",
        percentage: 19
    },
    {
        name: "Samara",
        allTime: "4.300.139",
        thisWeek: "8.796",
        avatar: "S",
        color: "#f44336",
        percentage: 15
    },
    {
        name: "howardyu77",
        allTime: "9.788",
        thisWeek: "6.293",
        avatar: "H",
        color: "#607d8b",
        percentage: 11
    },
    {
        name: "suwby",
        allTime: "137.835",
        thisWeek: "6.046",
        avatar: "S",
        color: "#795548",
        percentage: 10
    },
    {
        name: "CrazyCaleb",
        allTime: "37.948",
        thisWeek: "5.198",
        avatar: "C",
        color: "#3f51b5",
        percentage: 9
    },
    {
        name: "m 🥀",
        allTime: "89.121",
        thisWeek: "4.850",
        avatar: "M",
        color: "#009688",
        percentage: 8
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Render all sections
    renderTendencias();
    renderTrailers();
    renderPopular();
    renderGratis();
    renderLeaderboard();
    
    // Initialize toggle buttons
    initToggleButtons();
    
    // Cookie banner functionality
    initCookieBanner();
});

// Render functions
function renderTendencias() {
    const container = document.getElementById('tendencias-cards');
    container.innerHTML = tendenciasData.map(item => createMovieCard(item)).join('');
}

function renderTrailers() {
    const container = document.getElementById('trailers-cards');
    container.innerHTML = trailersData.map(item => createTrailerCard(item)).join('');
}

function renderPopular() {
    const container = document.getElementById('popular-cards');
    container.innerHTML = popularData.map(item => createMovieCard(item)).join('');
}

function renderGratis() {
    const container = document.getElementById('gratis-cards');
    container.innerHTML = gratisData.map(item => createMovieCard(item)).join('');
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = leaderboardData.map(item => createLeaderboardItem(item)).join('');
}

// Card creation functions
function createMovieCard(item) {
    const ratingClass = item.rating >= 70 ? 'high' : item.rating >= 50 ? 'medium' : 'low';
    const ratingDisplay = item.rating > 0 ? `${item.rating}<sup>%</sup>` : 'NR';
    
    return `
        <div class="card">
            <div class="card-poster">
                <img src="${item.poster}" alt="${item.title}" loading="lazy">
                <div class="card-rating ${ratingClass}">
                    <span>${ratingDisplay}</span>
                </div>
                <div class="card-menu">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${item.title}</div>
                <div class="card-date">${item.date}</div>
            </div>
        </div>
    `;
}

function createTrailerCard(item) {
    return `
        <div class="trailer-card">
            <div class="trailer-thumbnail">
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="play-icon">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="trailer-info">
                <div class="trailer-title">${item.title}</div>
                <div class="trailer-subtitle">${item.subtitle}</div>
            </div>
        </div>
    `;
}

function createLeaderboardItem(item) {
    return `
        <div class="leaderboard-item">
            <div class="leaderboard-avatar" style="background-color: ${item.color}">
                ${item.avatar}
            </div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${item.name}</div>
                <div class="leaderboard-stats">
                    <span>${item.allTime}</span>
                    <span>${item.thisWeek}</span>
                </div>
            </div>
            <div class="leaderboard-bar">
                <div class="leaderboard-bar-fill" style="width: ${item.percentage}%"></div>
            </div>
        </div>
    `;
}

// Toggle buttons functionality
function initToggleButtons() {
    const toggleContainers = document.querySelectorAll('.toggle-buttons');
    
    toggleContainers.forEach(container => {
        const buttons = container.querySelectorAll('.toggle-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this container
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });
}

// Cookie banner functionality
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    // Check if cookies have been accepted before
    if (localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.add('hidden');
    }
    
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('hidden');
    });
    
    // Also handle reject button
    const rejectBtn = cookieBanner.querySelector('.cookie-btn.reject');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            cookieBanner.classList.add('hidden');
        });
    }
}

// Smooth horizontal scroll with mouse wheel
document.querySelectorAll('.cards-container').forEach(container => {
    container.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        }
    });
});
