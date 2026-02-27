"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BarChart2,
    ChevronDown,
    Home,
    PieChart,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const NavTabs = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const [dir, setDir] = useState<"l" | "r" | null>(null);

    const handleSetSelected = (val: number | null) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }
        setSelected(val);
    };

    return (
        <div
            onMouseLeave={() => handleSetSelected(null)}
            className="relative flex h-fit gap-2"
        >
            {TABS.map((t) => (
                <Tab
                    key={t.id}
                    selected={selected}
                    handleSetSelected={handleSetSelected}
                    tab={t.id}
                >
                    {t.title}
                </Tab>
            ))}

            <AnimatePresence>
                {selected && <Content dir={dir} selected={selected} />}
            </AnimatePresence>
        </div>
    );
};

const Tab = ({
    children,
    tab,
    handleSetSelected,
    selected,
}: {
    children: React.ReactNode;
    tab: number;
    handleSetSelected: (val: number | null) => void;
    selected: number | null;
}) => {
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => handleSetSelected(tab)}
            onClick={() => handleSetSelected(tab)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${selected === tab
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white/80"
                }`}
        >
            <span>{children}</span>
            <ChevronDown
                className={`w-3 h-3 transition-transform ${selected === tab ? "rotate-180" : ""
                    }`}
            />
        </button>
    );
};

const Content = ({
    selected,
    dir,
}: {
    selected: number;
    dir: "l" | "r" | null;
}) => {
    return (
        <motion.div
            id="overlay-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-white/10 bg-[#0a0a0a] p-4"
        >
            <Bridge />
            <Nub selected={selected} />

            {TABS.map((t) => (
                <div className="overflow-hidden" key={t.id}>
                    {selected === t.id && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <t.Component />
                        </motion.div>
                    )}
                </div>
            ))}
        </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }: { selected: number | null }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        moveNub();
    }, [selected]);

    const moveNub = () => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");
            if (!hoveredTab || !overlayContent) return;
            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } = overlayContent.getBoundingClientRect();
            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
            setLeft(tabCenter);
        }
    };

    return (
        <motion.span
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-white/10 bg-[#0a0a0a]"
        />
    );
};

const Products = () => {
    return (
        <div>
            <div className="flex gap-4">
                <div>
                    <h3 className="mb-2 text-sm font-medium text-white/90">Startup</h3>
                    <a href="#" className="mb-1 block text-sm text-white/40 hover:text-white/70">
                        Bookkeeping
                    </a>
                    <a href="#" className="block text-sm text-white/40 hover:text-white/70">
                        Invoicing
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium text-white/90">Scaleup</h3>
                    <a href="#" className="mb-1 block text-sm text-white/40 hover:text-white/70">
                        Live Coaching
                    </a>
                    <a href="#" className="mb-1 block text-sm text-white/40 hover:text-white/70">
                        Reviews
                    </a>
                    <a href="#" className="block text-sm text-white/40 hover:text-white/70">
                        Tax/VAT
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium text-white/90">Enterprise</h3>
                    <a href="#" className="mb-1 block text-sm text-white/40 hover:text-white/70">
                        White glove
                    </a>
                    <a href="#" className="mb-1 block text-sm text-white/40 hover:text-white/70">
                        SOX Compliance
                    </a>
                    <a href="#" className="block text-sm text-white/40 hover:text-white/70">
                        Staffing
                    </a>
                    <a href="#" className="block text-sm text-white/40 hover:text-white/70">
                        More
                    </a>
                </div>
            </div>

            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    );
};

const Pricing = () => {
    return (
        <div className="grid grid-cols-3 gap-4 divide-x divide-white/10">
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-white/40 transition-colors hover:text-white"
            >
                <Home className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Startup</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-white/40 transition-colors hover:text-white"
            >
                <BarChart2 className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Scaleup</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-white/40 transition-colors hover:text-white"
            >
                <PieChart className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Enterprise</span>
            </a>
        </div>
    );
};

const Blog = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <a href="#">
                    <div className="mb-2 h-14 w-full rounded bg-white/5" />
                    <h4 className="mb-0.5 text-sm font-medium text-white/90">Lorem ipsum dolor</h4>
                    <p className="text-xs text-white/40">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
                        quidem eos.
                    </p>
                </a>
                <a href="#">
                    <div className="mb-2 h-14 w-full rounded bg-white/5" />
                    <h4 className="mb-0.5 text-sm font-medium text-white/90">Lorem ipsum dolor</h4>
                    <p className="text-xs text-white/40">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
                        quidem eos.
                    </p>
                </a>
            </div>
            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    );
};

const TABS = [
    {
        title: "Products",
        Component: Products,
    },
    {
        title: "Pricing",
        Component: Pricing,
    },
    {
        title: "Blog",
        Component: Blog,
    },
].map((n, idx) => ({ ...n, id: idx + 1 }));
