package com.feast.Backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * SwiggyProxyController
 *
 * Server-side proxy to Swiggy API. Browser cannot call Swiggy directly
 * due to CORS + bot-detection. This controller forwards requests from
 * the React frontend to Swiggy with browser-like headers.
 *
 * Endpoints:
 *   GET /api/restaurants?lat=&lng=   -> Swiggy restaurant list
 *   GET /api/menu?restaurantId=      -> Swiggy restaurant menu
 */
@RestController
@RequestMapping("/api")
public class SwiggyProxyController {

    private static final String SWIGGY_RESTAURANTS_URL =
            "https://www.swiggy.com/dapi/restaurants/list/v5"
            + "?lat=%s&lng=%s&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    private static final String SWIGGY_MENU_URL =
              "https://www.swiggy.com/dapi/menu/pl"
            + "?page-type=REGULAR_MENU&complete-menu=true"
            + "&lat=26.4783732&lng=80.3542791"
            + "&restaurantId=%s&catalog_qa=undefined&submitAction=ENTER";

    // Shared HttpClient — reused across all requests (efficient, thread-safe)
    private static final HttpClient HTTP_CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();


    // GET /api/restaurants?lat=...&lng=...
    @GetMapping("/restaurants")
    public ResponseEntity<String> getRestaurants(
            @RequestParam(defaultValue = "26.4783732") String lat,
            @RequestParam(defaultValue = "80.3542791") String lng)
    {

        return proxySwiggy(String.format(SWIGGY_RESTAURANTS_URL, lat, lng), false);
    }

    // GET /api/menu?restaurantId=...
    @GetMapping("/menu")
    public ResponseEntity<String> getMenu(@RequestParam String restaurantId)
    {
        ResponseEntity<String> result = proxySwiggy(String.format(SWIGGY_MENU_URL, restaurantId), true);

        // If Swiggy returns empty/non-JSON body (202, 403, etc.) return
        // a structured error so the frontend gracefully falls back to
        // the local fallback menu (restaurantMenuFallback.js).
        String body = result.getBody();
        if (body == null || body.isBlank() || !body.trim().startsWith("{"))
        {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"SWIGGY_MENU_UNAVAILABLE\","
                          + "\"statusCode\":" + result.getStatusCode().value() + ","
                          + "\"message\":\"Swiggy menu is temporarily unavailable. Showing local menu.\"}");
        }
        return result;
    }

    // Internal proxy helper
    private ResponseEntity<String> proxySwiggy(String targetUrl, boolean isMenuCall)
    {
        try
        {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(targetUrl))
                    .timeout(Duration.ofSeconds(15))
                    // Browser-like headers to avoid Swiggy bot-detection
                    .header("User-Agent",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                            + "AppleWebKit/537.36 (KHTML, like Gecko) "
                            + "Chrome/124.0.0.0 Safari/537.36")
                    .header("Accept", "application/json, text/plain, */*")
                    .header("Accept-Language", "en-US,en;q=0.9,hi;q=0.8")
                    .header("Referer", "https://www.swiggy.com/")
                    .header("Origin", "https://www.swiggy.com")
                    .header("Cache-Control", "no-cache")
                    .header("Pragma", "no-cache")
                    .GET()
                    .build();

            HttpResponse<String> response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());

            String body = response.body();
            int status = response.statusCode();

            return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body);

        }
        catch (InterruptedException e)
        {
            Thread.currentThread().interrupt();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("{\"error\":\"Request interrupted\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("{\"error\":\"Proxy error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}