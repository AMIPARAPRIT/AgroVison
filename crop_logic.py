def recommend_crop(data):
    """
    Recommends a crop based on soil and weather parameters.

    Parameters:
    - data: A dictionary containing soil and weather parameters
        - nitrogen: Nitrogen content in soil (mg/kg)
        - phosphorus: Phosphorus content in soil (mg/kg)
        - potassium: Potassium content in soil (mg/kg)
        - ph: pH value of soil
        - temperature: Temperature in Celsius
        - humidity: Humidity percentage
        - rainfall: Rainfall in mm

    Returns:
    - A dictionary containing crop recommendation details
    """

    # Extract parameters from data
    nitrogen = data.get("nitrogen", 0)
    phosphorus = data.get("phosphorus", 0)
    potassium = data.get("potassium", 0)
    ph = data.get("ph", 0)
    temperature = data.get("temperature", 0)
    humidity = data.get("humidity", 0)
    rainfall = data.get("rainfall", 0)

    # Logic to determine the best crop based on parameters
    # This is a simplified version - in a real system, you would use a more sophisticated model

    if (
        nitrogen > 80
        and phosphorus > 40
        and potassium > 40
        and temperature > 25
        and rainfall > 200
    ):
        return {
            "crop": "Rice",
            "description": "Rice thrives in high humidity and heavy rainfall.",
            "icon": "🌾",
            "duration": "4-5",
            "weather": "rainy",
            "fertilizers": ["Urea", "NPK 10-26-26", "Zinc Sulfate"],
            "pesticides": ["Carbofuran", "Chlorpyrifos", "Fipronil"],
            "schedule": "Plant at the beginning of the rainy season. Transplant seedlings after 20-25 days. Harvest when 80% of grains turn golden yellow.",
            "details": {
                "Soil": ["Clayey soil", "Rich in organic matter"],
                "Climate": ["Warm and humid"],
                "Water": ["Needs heavy irrigation"],
            },
        }

    elif (
        nitrogen > 40
        and phosphorus > 60
        and potassium > 30
        and temperature < 25
        and rainfall < 150
    ):
        return {
            "crop": "Wheat",
            "description": "Wheat grows well in moderate temperature and rainfall.",
            "icon": "🌾",
            "duration": "4-6",
            "weather": "sunny",
            "fertilizers": ["Urea", "DAP", "Potassium Chloride"],
            "pesticides": ["Chlorpyrifos", "Cypermethrin", "Deltamethrin"],
            "schedule": "Sow seeds in early winter. Apply first irrigation 20-25 days after sowing. Harvest when crop turns golden yellow.",
            "details": {
                "Soil": ["Loamy soil"],
                "Climate": ["Cool and dry"],
                "Water": ["Requires less water"],
            },
        }

    elif (
        nitrogen > 20
        and phosphorus > 20
        and potassium > 30
        and temperature > 25
        and ph < 6
    ):
        return {
            "crop": "Maize",
            "description": "Maize is a versatile crop that adapts to various conditions.",
            "icon": "🌽",
            "duration": "3-4",
            "weather": "sunny",
            "fertilizers": ["Urea", "DAP", "MOP"],
            "pesticides": ["Atrazine", "Pendimethalin", "Glyphosate"],
            "schedule": "Plant when soil temperature reaches 18°C. Apply fertilizer 3 weeks after planting. Harvest when kernels are firm and milky.",
            "details": {
                "Soil": ["Well-drained soil"],
                "Climate": ["Warm"],
                "Water": ["Moderate irrigation"],
            },
        }

    elif nitrogen < 40 and phosphorus < 40 and potassium > 40 and temperature > 30:
        return {
            "crop": "Cotton",
            "description": "Cotton thrives in hot and dry conditions.",
            "icon": "🧶",
            "duration": "5-6",
            "weather": "sunny",
            "fertilizers": ["Urea", "SSP", "Potassium Sulfate"],
            "pesticides": ["Imidacloprid", "Acetamiprid", "Spinosad"],
            "schedule": "Sow seeds after last frost. Thin plants when they have 4-5 true leaves. Harvest when bolls are fully open.",
            "details": {
                "Soil": ["Deep, well-drained soil"],
                "Climate": ["Hot and dry"],
                "Water": ["Moderate irrigation"],
            },
        }

    elif ph > 7 and temperature > 20 and rainfall > 100:
        return {
            "crop": "Sugarcane",
            "description": "Sugarcane requires warm climate and ample moisture.",
            "icon": "🍯",
            "duration": "10-12",
            "weather": "rainy",
            "fertilizers": ["Urea", "SSP", "MOP"],
            "pesticides": ["Fipronil", "Chlorantraniliprole", "Imidacloprid"],
            "schedule": "Plant at the beginning of the rainy season. Apply fertilizer 45 days after planting. Harvest when canes are mature and sweet.",
            "details": {
                "Soil": ["Loamy soil", "Well-drained"],
                "Climate": ["Tropical or subtropical"],
                "Water": ["Requires regular irrigation"],
            },
        }

    else:
        # Default recommendation
        return {
            "crop": "Soybean",
            "description": "Soybean is adaptable to various soil conditions.",
            "icon": "🌱",
            "duration": "3-5",
            "weather": "cloudy",
            "fertilizers": ["DAP", "MOP", "Gypsum"],
            "pesticides": ["Chlorantraniliprole", "Flubendiamide", "Indoxacarb"],
            "schedule": "Plant when soil temperature is at least 15°C. Apply fertilizer before planting. Harvest when pods are 80% brown.",
            "details": {
                "Soil": ["Well-drained soil"],
                "Climate": ["Moderate temperature"],
                "Water": ["Moderate irrigation"],
            },
        }
