import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;

    const controller = new AbortController();
    setResInfo(null);

    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/menu?restaurantId=${encodeURIComponent(resId)}`,
          { signal: controller.signal, credentials: "include" }
        );

        const contentType = response.headers.get("content-type") || "";
        const menu = contentType.includes("application/json") ? await response.json() : {};
        if (response.ok && !menu?.error && (Array.isArray(menu?.categories) || Array.isArray(menu?.data?.cards))) {
          setResInfo(menu);
          return;
        }

        // Return error marker so RestaurantsMenu.js can use location.state.restaurant
        // (the real clicked restaurant data) to build the fallback with correct name/cuisine
        setResInfo({ error: true });
      } catch (error) {
        if (error.name !== "AbortError") {
          // Same — let RestaurantsMenu handle fallback with real restaurant info
          setResInfo({ error: true });
        }
      }
    };

    fetchMenu();
    return () => controller.abort();
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
