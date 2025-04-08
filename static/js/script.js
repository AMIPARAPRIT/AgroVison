// DOM Elements
const fetchWeatherBtn = document.getElementById('fetch-weather');
const weatherError = document.getElementById('weather-error');
const weatherDisplay = document.getElementById('weather-display');
const cropForm = document.getElementById('crop-form');
const cropResult = document.getElementById('crop-result');
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');
const soilTab = document.querySelector('.tab-trigger[data-tab="soil"]');

// API Key
const API_KEY = '9b3667c38506486a7828dc365c252998';

// Global state
let weatherData = null;

// Tab functionality
tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        // Deactivate all tabs
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Activate clicked tab
        trigger.classList.add('active');
        const tabId = `${trigger.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
    });
});

// Fetch weather data
fetchWeatherBtn.addEventListener('click', async () => {
    const pincode = document.getElementById('pincode').value.trim();
    const city = document.getElementById('city').value.trim();

    if (!pincode || !city) {
        weatherError.textContent = 'Please enter both pincode and city';
        weatherError.classList.remove('hidden');
        return;
    }

    weatherError.textContent = '';
    weatherError.classList.add('hidden');

    // Show loading state
    fetchWeatherBtn.querySelector('.btn-text').classList.add('hidden');
    fetchWeatherBtn.querySelector('.btn-loading').classList.remove('hidden');
    fetchWeatherBtn.disabled = true;

    try {
        const response = await fetch('/get-weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ pincode, city })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        const data = await response.json();
        weatherData = data;

        // Display weather data
        displayWeather(data);

        // Enable and switch to soil tab
        soilTab.disabled = false;
        soilTab.click();
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherError.textContent = error.message || 'Failed to fetch weather data. Please try again.';
        weatherError.classList.remove('hidden');
    } finally {
        // Reset button state
        fetchWeatherBtn.querySelector('.btn-text').classList.remove('hidden');
        fetchWeatherBtn.querySelector('.btn-loading').classList.add('hidden');
        fetchWeatherBtn.disabled = false;
    }
});

// Handle crop recommendation form submission
cropForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!weatherData) {
        alert('Please fetch weather data first');
        return;
    }

    const nitrogen = parseFloat(document.getElementById('nitrogen').value);
    const phosphorus = parseFloat(document.getElementById('phosphorus').value);
    const potassium = parseFloat(document.getElementById('potassium').value);
    const ph = parseFloat(document.getElementById('ph').value);

    const submitBtn = cropForm.querySelector('button[type="submit"]');

    // Show loading state
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');
    submitBtn.disabled = true;

    try {
        // Combine soil data with weather data
        const requestData = {
            nitrogen,
            phosphorus,
            potassium,
            ph,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            rainfall: weatherData.rainfall
        };

        // Call the backend API
        const response = await fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get crop recommendation');
        }

        const result = await response.json();

        // Display crop result
        displayCropResult(result);
    } catch (error) {
        console.error('Error getting crop recommendation:', error);
        alert('Error getting crop recommendation: ' + (error.message || 'Unknown error'));
    } finally {
        // Reset button state
        submitBtn.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.querySelector('.btn-loading').classList.add('hidden');
        submitBtn.disabled = false;
    }
});

// Display weather data in the UI
function displayWeather(data) {
    const weatherIcon = getWeatherIcon(data.weatherType);

    const html = `
        <div class="weather-header">
            <div class="weather-icon">${weatherIcon}</div>
            <div>
                <div class="weather-location">${data.location}</div>
                <div class="weather-type">${data.weatherType} conditions</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-detail-icon" style="color: #ef4444;">
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                </svg>
                <div>
                    <div class="weather-detail-label">Temperature</div>
                    <div class="weather-detail-value">${data.temperature}°C</div>
                </div>
            </div>
            <div class="weather-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-detail-icon" style="color: #3b82f6;">
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                </svg>
                <div>
                    <div class="weather-detail-label">Humidity</div>
                    <div class="weather-detail-value">${data.humidity}%</div>
                </div>
            </div>
            <div class="weather-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-detail-icon" style="color: #60a5fa;">
                    <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                    <path d="M16 14v2"></path>
                    <path d="M8 9v2"></path>
                    <path d="M8 17v2"></path>
                    <path d="M16 19v2"></path>
                    <path d="M12 13v2"></path>
                    <path d="M12 21v2"></path>
                </svg>
                <div>
                    <div class="weather-detail-label">Rainfall</div>
                    <div class="weather-detail-value">${data.rainfall} mm</div>
                </div>
            </div>
        </div>
    `;

    weatherDisplay.innerHTML = html;
    weatherDisplay.classList.remove('hidden');
}

// Display crop recommendation result in the UI
function displayCropResult(result) {
    const weatherIcon = getWeatherIcon(result.weather);

    const html = `
        <div class="crop-header">
            <div class="crop-icon">${result.icon}</div>
            <h3 class="crop-name">${result.crop}</h3>
        </div>
        <div class="crop-body">
            <p class="crop-description">${result.description}</p>
            
            <div class="crop-stats">
                <div class="crop-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="crop-stat-icon">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <div>
                        <div class="crop-stat-label">Growth Duration</div>
                        <div class="crop-stat-value">${result.duration} months</div>
                    </div>
                </div>
                
                <div class="crop-stat">
                    ${weatherIcon}
                    <div>
                        <div class="crop-stat-label">Ideal Weather</div>
                        <div class="crop-stat-value">${result.weather}</div>
                    </div>
                </div>
                
                <div class="crop-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="crop-stat-icon" style="color: #3b82f6;">
                        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                    </svg>
                    <div>
                        <div class="crop-stat-label">Water Needs</div>
                        <div class="crop-stat-value">${result.details.Water[0]}</div>
                    </div>
                </div>
            </div>
            
            <div class="crop-tabs">
                <div class="crop-tab-list">
                    <button class="crop-tab-trigger active" data-tab="details">Details</button>
                    <button class="crop-tab-trigger" data-tab="fertilizers">Fertilizers</button>
                    <button class="crop-tab-trigger" data-tab="pesticides">Pesticides</button>
                    <button class="crop-tab-trigger" data-tab="schedule">Schedule</button>
                </div>
                
                <div class="crop-tab-content active" id="details-tab">
                    <div class="crop-section">
                        <h4 class="crop-section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                            </svg>
                            Soil Requirements
                        </h4>
                        <ul class="crop-list">
                            ${result.details.Soil.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="crop-section">
                        <h4 class="crop-section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                            </svg>
                            Climate Needs
                        </h4>
                        <ul class="crop-list">
                            ${result.details.Climate.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="crop-section">
                        <h4 class="crop-section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                            Water Requirements
                        </h4>
                        <ul class="crop-list">
                            ${result.details.Water.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="crop-tab-content" id="fertilizers-tab">
                    <h4 class="crop-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 2v7.31"></path>
                            <path d="M14 9.3V1.99"></path>
                            <path d="M8.5 2h7"></path>
                            <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                            <path d="M5.58 16.5h12.85"></path>
                        </svg>
                        Recommended Fertilizers
                    </h4>
                    <ul class="crop-list">
                        ${result.fertilizers.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="crop-tab-content" id="pesticides-tab">
                    <h4 class="crop-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m18 5-3-3H7L4 5"></path>
                            <path d="M18 5v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5"></path>
                            <path d="m8 18 4-4 4 4"></path>
                            <path d="m8 10 4 4 4-4"></path>
                        </svg>
                        Recommended Pesticides
                    </h4>
                    <ul class="crop-list">
                        ${result.pesticides.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="crop-tab-content" id="schedule-tab">
                    <h4 class="crop-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                            <line x1="16" x2="16" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="2" y2="6"></line>
                            <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        Farming Schedule
                    </h4>
                    <p>${result.schedule}</p>
                </div>
            </div>
            
            <div class="crop-note">
                <p style="display: flex; align-items: flex-start; gap: 0.5rem;">
                    <span style="color: #3b82f6;">ℹ️</span>
                    These recommendations are based on your soil composition and weather conditions. For best results, consult with a local agricultural expert.
                </p>
            </div>
        </div>
    `;

    cropResult.innerHTML = html;
    cropResult.classList.remove('hidden');

    // Add event listeners for crop tabs
    const cropTabTriggers = document.querySelectorAll('.crop-tab-trigger');
    const cropTabContents = document.querySelectorAll('.crop-tab-content');

    cropTabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Deactivate all tabs
            cropTabTriggers.forEach(t => t.classList.remove('active'));
            cropTabContents.forEach(c => c.classList.remove('active'));

            // Activate clicked tab
            trigger.classList.add('active');
            const tabId = `${trigger.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Scroll to result
    cropResult.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get weather icon
function getWeatherIcon(weatherType) {
    switch (weatherType.toLowerCase()) {
        case 'sunny':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #eab308;">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>`;
        case 'rainy':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3b82f6;">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                <path d="M16 14v6"></path>
                <path d="M8 14v6"></path>
                <path d="M12 16v6"></path>
            </svg>`;
        case 'cloudy':
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>`;
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #9ca3af;">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>`;
    }
}

// Initialize current year in footer if element exists
document.addEventListener('DOMContentLoaded', function () {
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
