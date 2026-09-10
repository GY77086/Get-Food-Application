import { useState, useEffect } from "react";

const BACKEND_URL = "https://get-food-application.onrender.com";

const useRestaurantMenu = (resId) => 
{
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => 
    {
        if (!resId) return;

        const controller = new AbortController();
        setResInfo(null);

        const fetchMenu = async () => 
        {
            try 
            {
                const response = await fetch(
                    `${BACKEND_URL}/api/menu?restaurantId=${encodeURIComponent(resId)}`,
                    { signal: controller.signal, credentials: "include" }
                );

                const contentType = response.headers.get("content-type") || "";
                const menu = contentType.includes("application/json") ? await response.json() : {};
                if (response.ok && !menu?.error && (Array.isArray(menu?.categories) || Array.isArray(menu?.data?.cards)))
                {
                    setResInfo(menu);
                    return;
                }

                setResInfo({ error: true });
            } 
            catch (error) 
            {
                if (error.name !== "AbortError") 
                {
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