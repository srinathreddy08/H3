package com.project.claude_demo.service;

import com.project.claude_demo.util.WeatherUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SafetyService {
    private static final Logger logger = LoggerFactory.getLogger(SafetyService.class);
    //@Autowired
    private final WeatherUtil weatherUtil;
    private final RestTemplate restTemplate;

    public SafetyService(WeatherUtil weatherUtil, RestTemplate restTemplate) {
        this.weatherUtil = weatherUtil;
        this.restTemplate = restTemplate;
    }
    @SuppressWarnings("unchecked")
	public Map<String, Object> getWeatherDetails(String location) {
        try {
            Map<String, Object> weatherData = weatherUtil.getWeatherForLocation(location);
           
			Map<String, Object> mainData = (Map<String, Object>) weatherData.get("main");
            Map<String, Object> windData = (Map<String, Object>) weatherData.get("wind");
            List<Map<String, Object>> weatherList = (List<Map<String, Object>>) weatherData.get("weather");

            Map<String, Object> result = new java.util.HashMap<>();
            result.put("temperature", mainData.get("temp"));
            result.put("humidity", mainData.get("humidity"));
            result.put("windSpeed", windData.get("speed"));
            result.put("description", weatherList.get(0).get("description"));
            result.put("safetyTip", getWeatherSafetyTip(weatherData));

            return result;
        } catch (RuntimeException e) {
            logger.error("Error in getWeatherDetails", e);
            throw new RuntimeException("Unable to fetch weather data: " + e.getMessage());
        }
    }

    //public String getWeatherSafetyTip(String location) {
       // try {
    @SuppressWarnings("unchecked")
	private String getWeatherSafetyTip(Map<String, Object> weatherData) {
            //Map<String, Object> weatherData = weatherUtil.getWeatherForLocation(location);
            List<Map<String, Object>> weatherList = (List<Map<String, Object>>) weatherData.get("weather");
            String mainWeather = (String) weatherList.get(0).get("main");
            Map<String, Object> mainData = (Map<String, Object>) weatherData.get("main");
            double temperature = ((Number) mainData.get("temp")).doubleValue() - 273.15; // Convert from Kelvin to Celsius

            switch (mainWeather.toLowerCase()) {
                case "thunderstorm":
                    return "Thunderstorm detected! Stay indoors, avoid using electrical equipment, and stay away from windows.";
                case "rain":
                    return "Rainy weather. Drive carefully, use windshield wipers, and watch for slippery roads.";
                case "snow":
                    return "Snowy conditions. Dress warmly, drive slowly, and be cautious of ice on roads and sidewalks.";
                case "clear":
                    if (temperature > 30) {
                        return "Clear but very hot. Stay hydrated, seek shade, and use sunscreen.";
                    } else if (temperature < 0) {
                        return "Clear but very cold. Dress in layers and be aware of the risk of hypothermia.";
                    } else {
                        return "Clear weather. Enjoy your day, but always stay alert to your surroundings.";
                    }
                default:
                    return "General safety tip: Always be aware of your surroundings and trust your instincts.";
            }
//        } catch (RuntimeException e) {
//            logger.error("Error in getWeatherSafetyTip", e);
//            return "Unable to fetch weather data: " + e.getMessage();
//        }
    }

@SuppressWarnings("unchecked")
public List<String> getNearbyPoliceStations(double lat, double lon) {
    String query = "[out:json];node(around:5000," + lat + "," + lon + ")[amenity=police];out;";
    String url = "https://overpass-api.de/api/interpreter?data=" + query;

    try {
        @SuppressWarnings("unchecked")
		Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> elements = (List<Map<String, Object>>) response.get("elements");

        List<String> policeStations = new ArrayList<>();
        for (Map<String, Object> element : elements) {
            Map<String, String> tags = (Map<String, String>) element.get("tags");
            String name = tags.get("name");
            if (name != null) {
                policeStations.add(name);
            }
        }

        return policeStations;
    } catch (Exception e) {
        return List.of("Unable to fetch nearby police stations. Please try again later.");
    }
}


@SuppressWarnings("unchecked")
public List<String> getNearbyHospitals(double lat, double lon) {
    String query = "[out:json];node(around:5000," + lat + "," + lon + ")[amenity=hospital];out;";
    String url = "https://overpass-api.de/api/interpreter?data=" + query;

    try {
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> elements = (List<Map<String, Object>>) response.get("elements");

        List<String> hospitals = new ArrayList<>();
        for (Map<String, Object> element : elements) {
            Map<String, String> tags = (Map<String, String>) element.get("tags");
            String name = tags.get("name");
            if (name != null) {
                hospitals.add(name);
            }
        }

        return hospitals;
    } catch (Exception e) {
        return List.of("Unable to fetch nearby hospitals. Please try again later.");
    }
}
}


