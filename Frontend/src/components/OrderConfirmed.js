import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderConfirmed = () => {
    const [orderId, setOrderId] = useState("");

    // Generate a mock order ID on component mount
    useEffect(() => {
        const generatedId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(generatedId);
    }, []);

    return (
        <div className="order-confirmed-page bg-[#1c1812] min-h-screen text-amber-50/90 antialiased pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-xl w-full">
                <div className="bg-[#241e15] border border-amber-900/30 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
                    
                    {/* Decorative background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>

                    {/* Success Icon */}
                    <div className="mb-8 flex justify-center relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                            <span className="text-5xl">✨</span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4 relative z-10 mb-10">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                            Order <span className="text-amber-400">Confirmed</span>
                        </h1>
                        <p className="text-sm text-amber-100/60 leading-relaxed font-medium">
                            Your culinary selection has been successfully processed. The kitchen is now preparing your order with the utmost care.
                        </p>
                    </div>

                    {/* Order Details Ledger */}
                    <div className="bg-[#1a150e] border border-amber-950/50 rounded-2xl p-6 mb-10 relative z-10 text-left">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">Order ID</span>
                            <span className="text-sm font-mono font-bold text-white">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">Status</span>
                            <span className="text-xs font-sans font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                                Kitchen Preparing
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">Est. Delivery</span>
                            <span className="text-sm font-mono font-bold text-amber-400">35-45 mins</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="relative z-10">
                        <Link 
                            to="/" 
                            className="inline-flex w-full sm:w-auto h-12 items-center justify-center px-8 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmed;