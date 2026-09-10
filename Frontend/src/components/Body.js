import { useState, useEffect, useContext } from "react";
import CardShimmer from "./CardShimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import userContext from "../utils/userContext.js";

const CDN_BASE = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
const BACKEND_URL = "http://localhost:8080";

export const RestaurantCard = ({ restData }) => {
    const {
        name,
        cuisines,
        avgRating,
        sla,
        costForTwo,
        cloudinaryImageId,
        aggregatedDiscountInfoV3,
        isOpen,
    } = restData || {};

    const isHighRating = avgRating >= 4.0;
    const ratingColor = avgRating >= 4.5 
        ? "text-emerald-400" 
        : isHighRating 
        ? "text-amber-400"
        : "text-neutral-400";

    const discountHeader = aggregatedDiscountInfoV3?.header;
    const discountSub    = aggregatedDiscountInfoV3?.subHeader;
    const deliveryTime   = sla?.deliveryTime ?? sla?.slaString;

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] hover:border-amber-500/40 will-change-transform">
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-10" />

            <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-t-[2.5rem] bg-neutral-950">
                {cloudinaryImageId ? (
                    <img
                        src={`${CDN_BASE}${cloudinaryImageId}`}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-600">
                        <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />
                
                {discountHeader && (
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between overflow-hidden rounded-2xl bg-black/40 px-4 py-3 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-1">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                        <span className="truncate text-xl font-black tracking-tight text-white drop-shadow-lg">
                            {discountHeader}
                        </span>
                        {discountSub && (
                            <span className="truncate pl-3 text-xs font-bold uppercase tracking-widest text-amber-400 drop-shadow-md">
                                {discountSub}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6 z-20">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="line-clamp-2 text-xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                        {name || "Restaurant Name"}
                    </h3>
                    {avgRating && (
                        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm font-bold backdrop-blur-md border border-white/10 shadow-inner">
                            <svg className={`h-4 w-4 ${ratingColor}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <span className="text-white/90">{avgRating}</span>
                        </div>
                    )}
                </div>

                <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-neutral-400">
                    {cuisines?.join(" • ") || "Various cuisines"}
                </p>

                <div className="mt-auto flex items-center justify-between rounded-2xl bg-neutral-950/50 p-3 text-sm font-bold border border-white/5">
                    <div className="flex items-center gap-2 text-amber-400/90">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="truncate">{deliveryTime ? `${deliveryTime}` : "—"}</span>
                    </div>
                    
                    <div className="h-4 w-px bg-white/10" />
                    
                    <span className="truncate text-neutral-300">
                        {costForTwo || "—"}
                    </span>
                    
                    <div className="h-4 w-px bg-white/10" />
                    
                    <div className="flex items-center gap-1.5">
                        <span className={`relative flex h-2.5 w-2.5`}>
                            {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        </span>
                        <span className={`text-xs uppercase tracking-widest ${isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isOpen ? "Open" : "Closed"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Body = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleHomeReset = () => {
            if (restaurantList.length > 0) {
                setSearchText(""); 
                setFilteredRestaurantList(restaurantList); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }
        };
        window.addEventListener("resetHome", handleHomeReset);
        return () => window.removeEventListener("resetHome", handleHomeReset);
    }, [restaurantList]); 

    const fetchData = async () => 
    {
        setIsLoading(true);
        setLoadError("");
        try 
        {
            const data = await fetch(`${BACKEND_URL}/api/restaurants?lat=26.4783732&lng=80.3542791`);
            if (!data.ok) {
                throw new Error("Swiggy restaurant list is unavailable.");
            }
            const jsonData = await data.json();

            const cardsArray = jsonData?.data?.cards || [];

            // Targeted GridWidget filter karna jahan top restaurants ka list hota hai
            const topRestaurantsCard = cardsArray.find(
                (c) =>
                    c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
                    c?.card?.card?.header?.title?.toLowerCase().includes("top restaurant")
            );

            // Targeted section me se list nikalna
            const restaurants = topRestaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            // Fallback: Agar upar title match na ho sake toh pehla valid GridWidget pick karega
            const fallbackRestaurants = cardsArray
                ?.map((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
                ?.find((res) => res !== undefined);

            const finalRestaurantList = restaurants || fallbackRestaurants || [];
            if (finalRestaurantList.length === 0) {
                throw new Error("Swiggy did not return any restaurants for this location.");
            }

            setRestaurantList(finalRestaurantList);
            setFilteredRestaurantList(finalRestaurantList);
        } 
        catch (error) 
        {
            setRestaurantList([]);
            setFilteredRestaurantList([]);
            setLoadError(error.message || "Live Swiggy restaurants could not be loaded.");
        } 
        finally 
        {
            setIsLoading(false);
        }
    };

    const internetStatus = useOnlineStatus();
    if (internetStatus === false) {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-neutral-950 to-neutral-950 -z-10" />
                <div className="w-full max-w-lg overflow-hidden rounded-[3rem] bg-neutral-900 p-12 border border-white/10 shadow-[0_0_60px_-15px_rgba(225,29,72,0.3)]">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 animate-ping rounded-full bg-rose-500/20" />
                            <div className="relative rounded-full bg-neutral-950 p-6 text-rose-500 border border-rose-500/30">
                                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="mb-4 text-3xl font-black tracking-tight text-white">Signal Lost</h1>
                    <p className="text-base font-medium text-neutral-400">
                        Your connection to the culinary matrix has been severed. Please verify your network uplink and try again.
                    </p>
                </div>
            </div>
        );
    }

    const { loggedInUser, setUserName } = useContext(userContext);

    return (
        <div className="relative min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-amber-500/30 overflow-x-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-950/0 to-transparent -z-10 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
                
                <div className="mb-16 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 mb-6 text-xs font-black uppercase tracking-widest text-amber-400 border border-white/10 shadow-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        Live Selection
                    </div>
                    <h1 className="max-w-4xl mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                        Elite <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700">Gastronomy</span> Awaits.
                    </h1>
                    <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
                        Immerse yourself in a curated collection of the city's finest culinary experiences. Masterpieces crafted for the discerning palate.
                    </p>
                </div>

                {/* ── CORRECTED STICKY CONTROL PANEL: Sticking strictly below the header without collisions ── */}
                <div className="sticky top-[104px] z-40 mb-12 flex flex-col gap-4 rounded-[2.5rem] bg-neutral-900 p-4 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] xl:flex-row xl:items-center xl:justify-between xl:p-4 transition-all duration-300">
                    
                    <div className="flex w-full flex-col sm:flex-row gap-3 xl:max-w-2xl">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-neutral-500 transition-colors group-focus-within:text-amber-500">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                className="w-full rounded-[2rem] bg-neutral-950 py-5 pl-14 pr-6 text-base font-bold text-white placeholder-neutral-600 border border-transparent focus:border-amber-500/50 focus:bg-neutral-950 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all shadow-inner"
                                type="text"
                                placeholder="Search by restaurant, cuisine, or mood..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const filtered = restaurantList.filter((rest) =>
                                            rest?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
                                        );
                                        setFilteredRestaurantList(filtered);
                                    }
                                }}
                            />
                        </div>
                        <button
                            className="shrink-0 rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] active:scale-95 flex items-center justify-center gap-2"
                            onClick={() => {
                                const filtered = restaurantList.filter((rest) =>
                                    rest?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
                                );
                                setFilteredRestaurantList(filtered);
                            }}
                        >
                            Explore
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            className="group flex items-center gap-2.5 rounded-[2rem] bg-neutral-950 px-6 py-5 text-sm font-bold text-neutral-400 border border-transparent transition-all hover:bg-neutral-800 hover:text-white hover:border-white/10 active:scale-95 shadow-inner"
                            onClick={() => {
                                const filtered = restaurantList.filter((rest) => rest?.info?.avgRating >= 4.5);
                                setFilteredRestaurantList(filtered);
                            }}
                        >
                            <svg className="h-5 w-5 text-neutral-500 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            Top Rated
                        </button>

                        <div className="flex flex-1 items-center gap-3 rounded-[2rem] bg-neutral-950 px-6 py-5 border border-transparent shadow-inner focus-within:border-white/10 focus-within:bg-neutral-900 transition-all min-w-[220px]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-amber-400">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            </div>
                            <input
                                className="w-full bg-transparent text-sm font-bold text-white placeholder-neutral-600 focus:outline-none"
                                type="text"
                                placeholder="Guest Mode..."
                                value={loggedInUser || ""}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <CardShimmer />
                    </div>
                ) : filteredRestaurantList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredRestaurantList.map((restaurants) => (
                            <Link
                                key={restaurants?.info?.id}
                                to={"/restaurant/" + restaurants?.info?.id}
                                state={{ restaurant: restaurants?.info }}
                                className="outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 rounded-[2.5rem] transition-all h-full"
                            >
                                <RestaurantCard restData={restaurants?.info} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto max-w-2xl mt-12 flex flex-col items-center justify-center rounded-[3rem] border border-white/5 bg-neutral-900/30 py-32 px-8 backdrop-blur-md text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="mb-8 rounded-full bg-neutral-950 p-8 text-neutral-600 border border-white/5 shadow-inner">
                            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="mb-4 text-3xl font-black text-white tracking-tight">
                            {loadError ? "Live restaurants unavailable" : "Zero Matches Found"}
                        </h3>
                        <p className="text-neutral-400 max-w-md text-base leading-relaxed font-medium">
                            {loadError || "The culinary target you're searching for eludes us. Try altering your parameters to unveil hidden gems."}
                        </p>
                        <button 
                            className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-neutral-950 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            onClick={() => {
                                if (loadError) {
                                    fetchData();
                                    return;
                                }
                                setSearchText("");
                                setFilteredRestaurantList(restaurantList);
                            }}
                        >
                            {loadError ? "Retry live restaurants" : "Reset Search"}
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Body;
