import { LucideIcon } from "lucide-react";

export interface RouteItem {
    title: string;
    url: string;
    icon?: LucideIcon; // এই লাইনটি যোগ করুন
}

export interface Route {
    title: string;
    items: RouteItem[];
}

export interface RouteItem {
    title: string;
    url: string;
    icon?: LucideIcon;
}

export interface Route {
    title: string;
    items: RouteItem[];
}

export interface RouteItem {
    title: string;
    url: string;
    icon?: LucideIcon; // এই লাইনটি মাস্ট যোগ করতে হবে
}

export interface Route {
    title: string;
    items: RouteItem[];
}