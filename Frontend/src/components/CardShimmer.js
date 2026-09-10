import React from "react";

const CardShimmer = () => {
    return (
        <>
            {Array(12).fill(0).map((_, index) => (
                <div 
                    key={index} 
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl"
                >
                    {/* ── Image Skeleton ── */}
                    <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-t-[2.5rem] bg-neutral-950">
                        {/* Pulsing image placeholder */}
                        <div className="absolute inset-0 bg-neutral-800/80 animate-pulse" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />
                        
                        {/* Discount Tag Skeleton */}
                        <div className="absolute bottom-5 left-5 right-5 z-20 h-[52px] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 overflow-hidden flex items-center px-4">
                            <div className="h-6 w-1/2 bg-neutral-800/50 rounded-lg animate-pulse" />
                        </div>
                    </div>

                    {/* ── Content Skeleton ── */}
                    <div className="flex flex-1 flex-col p-6 z-20">
                        {/* Title & Rating */}
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="h-7 w-2/3 rounded-xl bg-neutral-800 animate-pulse" />
                            <div className="h-8 w-14 shrink-0 rounded-full bg-white/5 border border-white/10 animate-pulse" />
                        </div>

                        {/* Cuisines */}
                        <div className="mb-6 space-y-2.5">
                            <div className="h-4 w-full rounded-md bg-neutral-800/60 animate-pulse" />
                            <div className="h-4 w-3/4 rounded-md bg-neutral-800/60 animate-pulse" />
                        </div>

                        {/* Meta row skeleton (Time | Cost | Status) */}
                        <div className="mt-auto flex items-center justify-between rounded-2xl bg-neutral-950/50 p-3 border border-white/5">
                            {/* Time */}
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-neutral-800 animate-pulse" />
                                <div className="h-4 w-10 rounded-md bg-neutral-800 animate-pulse" />
                            </div>
                            
                            <div className="h-4 w-px bg-white/10" />
                            
                            {/* Cost */}
                            <div className="h-4 w-16 rounded-md bg-neutral-800 animate-pulse" />
                            
                            <div className="h-4 w-px bg-white/10" />
                            
                            {/* Status Indicator */}
                            <div className="flex items-center gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-neutral-800 animate-pulse" />
                                <div className="h-3 w-10 rounded-md bg-neutral-800 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CardShimmer;