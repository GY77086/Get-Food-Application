import React, { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice.js";
import { Star, Flame, Check } from "lucide-react";

const ItemList = ({ items, restaurantId }) => {
    const dispatch = useDispatch();
    const [liveImageUrls, setLiveImageUrls] = useState({});
    
    // Grab cart items from Redux state
    const cartItems = useSelector((state) => state.cart.items);

    const handleAddItems = (item) => {
        dispatch(addItem(item));
    };

    const getItemCount = (id) => {
        return cartItems.filter(cartItem => cartItem.card.info.id === id).length;
    };

    const itemImageRequestKey = items.map((item) => item?.card?.info?.id || item?.card?.info?.name).join("|");

    useEffect(() => {
        if (!restaurantId) return;

        let isCurrent = true;
        const loadImages = async () => {
            const missingImages = items
                .map((item) => item?.card?.info)
                .filter((info) => info?.name && !info?.imageUrl && !info?.imageId);

            const imageEntries = await Promise.all(missingImages.map(async (info) => {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/swiggy/item-image?restaurantId=${encodeURIComponent(restaurantId)}&itemName=${encodeURIComponent(info.name)}`,
                        { credentials: "include" }
                    );
                    const data = response.ok ? await response.json() : {};
                    return data?.imageUrl ? [info.id, data.imageUrl] : null;
                } catch {
                    return null;
                }
            }));

            if (isCurrent) {
                setLiveImageUrls(Object.fromEntries(imageEntries.filter(Boolean)));
            }
        };

        loadImages();
        return () => { isCurrent = false; };
    }, [restaurantId, itemImageRequestKey]);

    return (
        <div className="divide-y divide-[#5c462b]/30 space-y-4">
            {items.map((item, index) => {
                const info = item?.card?.info;
                if (!info) return null;

                const priceInPaise = info.price ?? info.finalPrice ?? info.defaultPrice;
                const price = Number.isFinite(priceInPaise) ? priceInPaise / 100 : null;
                const isBestseller = info?.ribbon?.text === "Bestseller";
                const rating = info?.ratings?.aggregatedRating?.rating;
                const inCartCount = getItemCount(info.id);
                const imageUrl = liveImageUrls[info.id] || info.imageUrl || (info.imageId ? CDN_URL + info.imageId : null);

                return (
                    <div
                        className="group relative flex flex-col-reverse sm:flex-row justify-between items-start gap-4 p-4 sm:p-6 rounded-2xl transition-all duration-300 bg-[#1e1910]/30 border border-[#5c462b]/15 hover:border-[#5c462b]/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-[#13100a]/60 overflow-hidden"
                        key={`${info.id || 'item'}-${index}`}
                    >
                        {/* Left/Top Content Container - added min-w-0 to prevent flex item text blowouts */}
                        <div className="item-container flex-1 min-w-0 space-y-3 w-full">
                            {/* Veg / Non-Veg & Bestseller / Rating Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Veg/Non-veg indicator */}
                                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${info.isVeg ? 'border-green-600/80' : 'border-red-600/80'}`}>
                                    <span className={`w-2 h-2 rounded-full ${info.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                </span>

                                {/* Bestseller Ribbon */}
                                {isBestseller && (
                                    <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                        <Flame className="w-3 h-3" /> Bestseller
                                    </span>
                                )}

                                {/* Aggregated Rating */}
                                {rating && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-950/40 text-green-400 border border-green-800/40">
                                        <Star className="w-3 h-3 fill-green-400 text-green-400" /> {rating}
                                    </span>
                                )}
                            </div>
                            
                            {/* Title & Price */}
                            <div>
                                <h4 className="font-serif text-base sm:text-xl font-bold tracking-wide text-[#F7F2E7] group-hover:text-[#E59A54] transition-colors duration-300 leading-snug break-words">
                                    {info.name}
                                </h4>
                                <p className="text-sm font-black text-amber-500 mt-1.5">
                                {price !== null ? `₹ ${price.toFixed(2)}` : "Market Price"}
                                </p>
                            </div>
                            
                            {/* Description */}
                            <p className="item-description text-xs text-[#A0A0A5] leading-relaxed line-clamp-2">
                                {info.description}
                            </p>
                        </div>

                        {/* Right/Bottom Image & Add Action Container */}
                        <div className="relative shrink-0 w-full sm:w-32 h-44 sm:h-32 rounded-xl overflow-hidden border border-[#5c462b]/30 shadow-md group/image">
                            {imageUrl ? (
                                <img 
                                    className="item-image w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                                    src={imageUrl}
                                    alt={info.name}
                                />
                            ) : (
                                <div className="w-full h-full bg-[#13100a]" aria-label="Food image unavailable" />
                            )}
                            
                            {/* Elegant Gradient Protection for readability over images */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#13100a] via-[#13100a]/30 to-transparent opacity-70" />

                            {/* Add/Counter Button Zone */}
                            <div className="absolute bottom-2.5 inset-x-2.5 flex flex-col items-center gap-1.5">
                                <button 
                                    className="add-button w-full py-2 bg-gradient-to-r from-[#E59A54] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#18110E] text-xs font-black rounded-lg shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-95 uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-300/20"
                                    onClick={() => handleAddItems(item)}
                                >
                                    {inCartCount > 0 ? <Check className="w-3.5 h-3.5" /> : null}
                                    {inCartCount > 0 ? 'Add More' : '+ Add'}
                                </button>
                                
                                {/* Cart counter indicator */}
                                {inCartCount > 0 && (
                                    <span className="text-[9px] font-extrabold text-[#F7F2E7] tracking-wider bg-[#13100a]/80 backdrop-blur px-2 py-0.5 rounded border border-amber-900/40">
                                        In Cart: {inCartCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ItemList;
