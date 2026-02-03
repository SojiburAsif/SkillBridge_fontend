"use client";
import React from "react";
import {
    motion,
    Variants,
    easeInOut,
    easeOut,
} from "framer-motion";
import {
    UserPlus,
    Phone,
    BookOpen,
    GraduationCap,
    ArrowUpRight,
    PenTool,
    Lightbulb,
    GraduationCap as CapIcon,
} from "lucide-react";

const HeroSection = () => {
    // Left side text entrance animation
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    // Reusable floating animation for main images
    const transitionEffect = (delay: number = 0) => ({
        duration: 4,
        repeat: Infinity,
        ease: easeInOut,
        delay: delay,
    });

    // Background small icons floating loop
    const bgIconAnimation = (duration: number, delay: number) => ({
        animate: {
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: {
                duration,
                repeat: Infinity,
                ease: easeInOut,
                delay,
            },
        },
    });

    return (
        <section className="mt-12 relative min-h-[85vh] bg-white dark:bg-black transition-colors duration-300 overflow-hidden flex items-center py-12">
            
            {/* Background Animated Icons */}
            <motion.div {...bgIconAnimation(5, 0)} className="absolute top-20 left-[10%] hidden lg:block opacity-20 dark:opacity-40">
                <BookOpen className="text-blue-600" size={40} />
            </motion.div>

            <motion.div {...bgIconAnimation(7, 1)} className="absolute bottom-20 left-[5%] hidden lg:block opacity-20 dark:opacity-40">
                <PenTool className="text-yellow-500" size={35} />
            </motion.div>

            <motion.div {...bgIconAnimation(6, 0.5)} className="absolute top-1/4 left-1/2 hidden lg:block opacity-20 dark:opacity-40">
                <Lightbulb className="text-yellow-300" size={40} />
            </motion.div>

            <motion.div {...bgIconAnimation(8, 2)} className="absolute bottom-2/4 right-[50%] hidden lg:block opacity-10 dark:opacity-30">
                <CapIcon className="text-purple-500" size={45} />
            </motion.div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-7"
                    >
                        <motion.div
                            variants={fadeIn}
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800"
                        >
                            <GraduationCap size={16} />
                            <span className="text-xs md:text-sm tracking-wide uppercase font-semibold">
                                Find Your Perfect Tutor
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeIn}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.15]"
                        >
                            Best Tutoring Platform <br />
                            for Home & <span className="text-blue-500">Online</span> <br />
                            <span className="text-blue-600">Tuitions</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeIn}
                            className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-lg leading-relaxed"
                        >
                            Find the Perfect Tutor Near You: Enhance Learning with Expert Guidance and Personalized Support Today!
                        </motion.p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95">
                                Find Best Tutor <ArrowUpRight size={18} />
                            </button>

                            <button className="border border-blue-200 dark:border-slate-800 bg-transparent hover:bg-blue-50 dark:hover:bg-slate-900 text-blue-600 dark:text-blue-400 px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all active:scale-95">
                                Applying Tutor <UserPlus size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Side Images with Floating Effect */}
                    <div className="relative lg:ml-auto">
                        <div className="relative z-10 grid grid-cols-2 gap-5 items-center max-w-[500px] mx-auto p-4">
                            
                            {/* Image 1 - Student (Animated Up) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={transitionEffect(0)}
                                className="rounded-t-[100px] rounded-bl-[100px] overflow-hidden 
                                           border-2 md:border-4 border-slate-200 dark:border-zinc-800 
                                           bg-white dark:bg-black shadow-2xl transition-colors"
                            >
                                <img
                                    src="https://i.ibb.co.com/5xT38ht0/tutor-girl-home-writing-new-information-23-2148511025.avif"
                                    alt="Student"
                                    className="h-60 md:h-72 w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                                />
                            </motion.div>

                            {/* Image 2 - Tutor (Animated Down) */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={transitionEffect(0.5)}
                                className="rounded-b-[100px] rounded-tr-[100px] overflow-hidden 
                                           border-2 md:border-4 border-slate-200 dark:border-zinc-800 
                                           bg-white dark:bg-black shadow-2xl mt-12 transition-colors"
                            >
                                <img
                                    src="https://i.ibb.co.com/qYwHhvBZ/download.jpg"
                                    alt="Tutor"
                                    className="h-60 md:h-72 w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                                />
                            </motion.div>
                        </div>

                        {/* Floating Badge - Top Right */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
                            className="absolute -top-6 -right-4 z-20 bg-white dark:bg-zinc-900 
                                       p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3"
                        >
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                                <GraduationCap size={20} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Available</p>
                                <p className="text-xl font-black text-slate-800 dark:text-white leading-none">1520+</p>
                            </div>
                        </motion.div>

                        {/* Floating Badge - Bottom Left */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: easeInOut }}
                            className="absolute -bottom-8 -left-4 z-20 bg-white dark:bg-zinc-900 
                                       p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3"
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                <Phone size={18} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Support</p>
                                <p className="text-sm font-black text-slate-800 dark:text-white leading-none tracking-tight">
                                    +88 01840587095
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;