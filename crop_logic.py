def recommend_crop(data):
    nitrogen = data.get("nitrogen", 0)
    phosphorus = data.get("phosphorus", 0)
    potassium = data.get("potassium", 0)
    ph = data.get("ph", 0)
    temperature = data.get("temperature", 0)
    humidity = data.get("humidity", 0)
    rainfall = data.get("rainfall", 0)

    # --- Food Grains ---
    if (
        80 < nitrogen < 150
        and 40 < phosphorus < 70
        and 40 < potassium < 70
        and 25 < temperature < 35
        and rainfall > 180
    ):
        return {
            "crop": "Rice",
            "category": "Food Grain",
            "description": "High humidity & rainfall needed.",
            "icon": "🌾",
            "duration": "4-5",
            "weather": "rainy",
            "fertilizers": ["Urea", "NPK 10-26-26", "Zinc Sulfate"],
            "pesticides": ["Carbofuran", "Chlorpyrifos", "Fipronil"],
            "details": {
                "Soil": ["Clayey, Organic"],
                "Climate": ["Warm & humid"],
                "Water": ["Heavy irrigation"],
            },
        }

    if (
        40 < nitrogen < 90
        and phosphorus > 60
        and 30 < potassium < 60
        and 15 < temperature < 25
        and rainfall < 150
    ):
        return {
            "crop": "Wheat",
            "category": "Food Grain",
            "description": "Grows in cool & dry regions.",
            "icon": "🌾",
            "duration": "4-6",
            "weather": "sunny",
            "fertilizers": ["Urea", "DAP", "Potassium Chloride"],
            "pesticides": ["Chlorpyrifos", "Deltamethrin"],
            "details": {
                "Soil": ["Loamy"],
                "Climate": ["Cool, dry"],
                "Water": ["Low requirement"],
            },
        }

    if (
        20 < nitrogen < 60
        and 20 < phosphorus < 50
        and 30 < potassium < 60
        and 26 < temperature < 34
        and ph < 6.5
    ):
        return {
            "crop": "Maize",
            "category": "Food Grain",
            "description": "Versatile crop; sunny & moderate conditions.",
            "icon": "🌽",
            "duration": "3-4",
            "weather": "sunny",
            "fertilizers": ["Urea", "DAP", "MOP"],
            "pesticides": ["Atrazine", "Glyphosate"],
            "details": {
                "Soil": ["Well-drained"],
                "Climate": ["Warm"],
                "Water": ["Moderate"],
            },
        }

    if (
        40 < nitrogen < 80
        and 40 < phosphorus < 70
        and 30 < potassium < 50
        and temperature > 22
        and ph > 6
    ):
        return {
            "crop": "Pulses",
            "category": "Food Grain",
            "description": "Lentils, Moong, etc. need well-drained soil and warm temperature.",
            "icon": "🥣",
            "duration": "3-4",
            "weather": "dry",
            "fertilizers": ["Bio-fertilizers", "SSP"],
            "pesticides": ["Neem Oil", "Chlorpyrifos"],
            "details": {
                "Soil": ["Sandy loam"],
                "Climate": ["Semi-arid"],
                "Water": ["Low"],
            },
        }

    if ph < 6.5 and rainfall < 100 and 24 < temperature < 34:
        return {
            "crop": "Millets",
            "category": "Food Grain",
            "description": "Drought-resistant grains like Bajra, Jowar.",
            "icon": "🌾",
            "duration": "2-3",
            "weather": "dry",
            "fertilizers": ["Organic compost"],
            "pesticides": ["Spinosad", "Neem extract"],
            "details": {
                "Soil": ["Sandy", "Low fertility"],
                "Climate": ["Hot, dry"],
                "Water": ["Very low"],
            },
        }

    # --- Commercial Crops ---
    if nitrogen < 40 and phosphorus < 35 and potassium > 45 and temperature > 30:
        return {
            "crop": "Cotton",
            "category": "Commercial Crop",
            "description": "Thrives in hot & dry climate.",
            "icon": "🧶",
            "duration": "5-6",
            "weather": "sunny",
            "fertilizers": ["Urea", "SSP", "Potassium Sulfate"],
            "pesticides": ["Imidacloprid", "Spinosad"],
            "details": {
                "Soil": ["Well-drained"],
                "Climate": ["Hot"],
                "Water": ["Moderate"],
            },
        }

    if rainfall > 100 and temperature > 20 and ph > 7:
        return {
            "crop": "Sugarcane",
            "category": "Commercial Crop",
            "description": "Heavy water and warm tropical needs.",
            "icon": "🍯",
            "duration": "10-12",
            "weather": "rainy",
            "fertilizers": ["Urea", "SSP", "MOP"],
            "pesticides": ["Fipronil", "Imidacloprid"],
            "details": {
                "Soil": ["Loamy"],
                "Climate": ["Tropical"],
                "Water": ["Heavy"],
            },
        }

    if temperature > 25 and ph < 6.5 and nitrogen > 60:
        return {
            "crop": "Oilseeds",
            "category": "Commercial Crop",
            "description": "Groundnut, mustard, etc. for oil production.",
            "icon": "🌻",
            "duration": "3-4",
            "weather": "sunny",
            "fertilizers": ["Gypsum", "DAP"],
            "pesticides": ["Quinalphos"],
            "details": {
                "Soil": ["Light soil"],
                "Climate": ["Warm"],
                "Water": ["Moderate"],
            },
        }

    if temperature > 25 and rainfall > 150 and ph < 6.5:
        return {
            "crop": "Jute",
            "category": "Commercial Crop",
            "description": "Needs high rainfall and warm humid climate.",
            "icon": "🧵",
            "duration": "4-5",
            "weather": "rainy",
            "fertilizers": ["Organic Manure", "NPK"],
            "pesticides": ["Neem-based"],
            "details": {
                "Soil": ["Alluvial soil"],
                "Climate": ["Humid"],
                "Water": ["High"],
            },
        }

    # --- Plantation Crops ---
    if temperature > 28 and rainfall > 200 and ph < 6:
        return {
            "crop": "Rubber",
            "category": "Plantation Crop",
            "description": "Needs heavy rainfall & tropical climate.",
            "icon": "🌳",
            "duration": "6-7",
            "weather": "humid",
            "fertilizers": ["NPK", "Lime"],
            "pesticides": ["Biological agents"],
            "details": {
                "Soil": ["Laterite"],
                "Climate": ["Hot, humid"],
                "Water": ["High"],
            },
        }

    if temperature > 20 and ph < 6.5 and rainfall > 150:
        return {
            "crop": "Tea",
            "category": "Plantation Crop",
            "description": "Grows in cool highlands and acidic soil.",
            "icon": "🍵",
            "duration": "3-4",
            "weather": "cloudy",
            "fertilizers": ["Ammonium Sulfate"],
            "pesticides": ["Fungal sprays"],
            "details": {
                "Soil": ["Acidic", "Well-drained"],
                "Climate": ["Cool, moist"],
                "Water": ["Frequent rain"],
            },
        }

    if temperature > 24 and rainfall > 150 and ph > 6:
        return {
            "crop": "Coffee",
            "category": "Plantation Crop",
            "description": "Prefers shade, rain & loamy soil.",
            "icon": "☕",
            "duration": "5-6",
            "weather": "humid",
            "fertilizers": ["Potassium Sulfate", "Compost"],
            "pesticides": ["Organic sprays"],
            "details": {
                "Soil": ["Loamy", "Shady"],
                "Climate": ["Mild"],
                "Water": ["High"],
            },
        }

    # --- Horticulture Crops (Vegetables & Fruits) ---
    if 24 < temperature < 32 and 6 < ph < 7.5 and rainfall < 120:
        return {
            "crop": "Banana",
            "category": "Fruit (Horticulture)",
            "description": "Loves warm & moist soil.",
            "icon": "🍌",
            "duration": "9-10",
            "weather": "humid",
            "fertilizers": ["FYM", "Potassium"],
            "pesticides": ["Carbendazim"],
            "details": {
                "Soil": ["Rich loam"],
                "Climate": ["Humid tropical"],
                "Water": ["High"],
            },
        }

    if 22 < temperature < 30 and 6.5 < ph < 7.5:
        return {
            "crop": "Mango",
            "category": "Fruit (Horticulture)",
            "description": "Loves sunny tropical zones.",
            "icon": "🥭",
            "duration": "4-5",
            "weather": "sunny",
            "fertilizers": ["Compost", "NPK"],
            "pesticides": ["Copper Oxychloride"],
            "details": {
                "Soil": ["Red loam"],
                "Climate": ["Hot, dry"],
                "Water": ["Moderate"],
            },
        }

    # DEFAULT RESPONSE
    return None  # No match found for given conditions
