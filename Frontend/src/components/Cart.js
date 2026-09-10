import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ItemList from "./ItemList.js";
import { clearCart } from "../utils/cartSlice.js";
import { Link, useNavigate } from "react-router-dom"; // IMPORT useNavigate

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // INITIALIZE useNavigate

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Calculate aggregated billing parameters safely from the client-side cart
    const totalAmount = cartItems.reduce((acc, item) => {
        const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
        return acc + (price / 100);
    }, 0);

    const deliveryFee = cartItems.length > 0 ? 40 : 0;
    const platformFee = cartItems.length > 0 ? 15 : 0;
    const finalToPay = totalAmount + deliveryFee + platformFee;

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Standard local checkout action without external payment gateways
    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        setIsPlacingOrder(true);

        // Simulate network latency for placing an order
        setTimeout(() => {
            dispatch(clearCart());
            setIsPlacingOrder(false);
            
            // Navigate to Order Confirmed Page instead of alert
            navigate("/order-confirmed");
        }, 800);
    };

    return (
        <div className="cart-page bg-[#1c1812] min-h-screen text-amber-50/90 antialiased pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-900/20 pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
                            Shopping <span className="text-amber-400">Cart</span>
                        </h1>
                        <p className="text-xs text-amber-100/40 mt-1 font-medium">
                            Review your selected culinary items before placing your delivery order.
                        </p>
                    </div>
                    {cartItems.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 h-9 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-red-500/20 transition-all cursor-pointer active:scale-95"
                        >
                            🗑️ Empty Cart
                        </button>
                    )}
                </div>

                {/* Main Dynamic View Layout */}
                {cartItems.length === 0 ? (
                    <div className="bg-[#241e15] border border-amber-900/30 rounded-2xl p-12 text-center max-w-md mx-auto shadow-xl space-y-6">
                        <span className="text-5xl block">🛒</span>
                        <div className="space-y-1">
                            <h2 className="text-xl font-serif font-bold text-white">Your Cart is Empty</h2>
                            <p className="text-xs text-amber-100/50 leading-relaxed max-w-xs mx-auto">
                                Browse nearby elite restaurants to populate your delivery summary tracker.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link 
                                to="/" 
                                className="inline-flex h-11 items-center px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                            >
                                Discover Food Items
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* LEFT GRID: Item Manifest Display */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-[#241e15] border border-amber-900/30 rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest border-b border-amber-950/40 pb-3 mb-4">
                                    Selected Items Breakdown ({cartItems.length})
                                </h3>
                                <div className="bg-[#1a150e] rounded-xl border border-amber-950/50 p-2">
                                    <ItemList items={cartItems} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT GRID: Premium Ledger Cost Account Panel */}
                        <div className="lg:col-span-5 bg-[#241e15] border border-amber-900/30 rounded-2xl p-6 shadow-xl space-y-6 lg:sticky lg:top-32">
                            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest border-b border-amber-950/40 pb-3">
                                Financial Ledger Details
                            </h3>

                            <div className="space-y-4 text-xs font-medium text-amber-100/70 font-mono tracking-wide">
                                <div className="flex justify-between items-center">
                                    <span>Item Total Gross:</span>
                                    <span className="text-white font-bold font-sans">₹{totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Insulated Delivery Fee:</span>
                                    <span className="text-white font-bold font-sans">₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Platform Operational Costs:</span>
                                    <span className="text-white font-bold font-sans">₹{platformFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-amber-950/60 pt-4 flex justify-between items-end">
                                    <span className="text-amber-400 uppercase font-serif font-black text-sm">Aggregate Balance Payable:</span>
                                    <span className="text-xl font-sans font-black text-white">
                                        ₹{finalToPay.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Standard Checkout Action */}
                            <button
                                onClick={handleCheckout}
                                disabled={isPlacingOrder}
                                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl disabled:opacity-50 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer flex justify-center items-center"
                            >
                                {isPlacingOrder ? (
                                    "Processing..."
                                ) : (
                                    `Place Order ₹${finalToPay.toFixed(2)} 🛍️`
                                )}
                            </button>

                            {/* Secure Packaging Sub-Element Badge */}
                            <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] text-amber-200/50 leading-relaxed font-sans flex gap-2.5 shadow-inner">
                                <span className="text-amber-400 select-none">🛡️</span>
                                <p>Our strict insulation matrix guarantees items reach your destination matching exact peak counter production qualities.</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;