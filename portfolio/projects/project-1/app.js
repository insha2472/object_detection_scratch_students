const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMsg = document.getElementById('error-msg');

const mockData = {
    'london': { temp: 15, desc: 'cloudy', wind: '12 km/h', humidity: '70%', icon: 'fa-cloud' },
    'new york': { temp: 22, desc: 'sunny', wind: '15 km/h', humidity: '45%', icon: 'fa-sun' },
    'tokyo': { temp: 19, desc: 'rainy', wind: '8 km/h', humidity: '80%', icon: 'fa-cloud-rain' },
    'paris': { temp: 18, desc: 'partly cloudy', wind: '10 km/h', humidity: '60%', icon: 'fa-cloud-sun' },
    'sydney': { temp: 28, desc: 'sunny', wind: '20 km/h', humidity: '50%', icon: 'fa-sun' },
    'default': { temp: 20, desc: 'clear', wind: '10 km/h', humidity: '50%', icon: 'fa-sun' }
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.toLowerCase().trim();
    if (!city) return;
    
    fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.toLowerCase().trim();
        if (!city) return;
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    // Simulate API call
    setTimeout(() => {
        const data = mockData[city] || (Math.random() > 0.5 ? mockData['default'] : null);
        
        if (data) {
            updateUI(city, data);
            weatherDisplay.classList.remove('hidden');
            errorMsg.classList.add('hidden');
        } else {
            weatherDisplay.classList.add('hidden');
            errorMsg.classList.remove('hidden');
        }
    }, 300);
}

function updateUI(city, data) {
    document.getElementById('city-name').textContent = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById('temperature').textContent = data.temp;
    document.getElementById('weather-desc').textContent = data.desc;
    document.getElementById('wind-speed').textContent = data.wind;
    document.getElementById('humidity').textContent = data.humidity;
    
    const iconEl = document.getElementById('main-icon');
    iconEl.className = `fas ${data.icon}`;
}

// Initialize with a default city
fetchWeather('new york');
