import {
    Code, Briefcase, Cpu, Palette, BarChart, Zap, Bot, Megaphone,
    Infinity, Award, Clock, TrendingUp,
    Terminal, Server, Smartphone, AppWindow, Rocket, Table,
    Stars, MessageSquare, Layers, FileCode, Braces, Repeat, Palette as PaletteIcon, PenTool, Layout
} from "lucide-react";
import { CourseProps } from "@/components/CourseCard";

export const categories = [
    { title: "Development", icon: <Code /> },
    { title: "Business", icon: <Briefcase /> },
    { title: "Tech & IT", icon: <Cpu /> },
    { title: "Creativity", icon: <Palette /> },
    { title: "Data Science", icon: <BarChart /> },
    { title: "Productivity", icon: <Zap /> },
    { title: "AI & Prompt Engineering", icon: <Bot /> },
    { title: "Marketing", icon: <Megaphone /> },
];

export const features = [
    { title: "Lifetime Access", description: "Learn at your own pace with unlimited access to all course materials.", icon: <Infinity /> },
    { title: "Certification", description: "Earn certificates upon completion to showcase your new skills.", icon: <Award /> },
    { title: "Learn at Your Own Pace", description: "Study whenever and wherever you want, on any device.", icon: <Clock /> },
    { title: "Beginner to Advanced", description: "Courses for all skill levels, from complete beginners to experts.", icon: <TrendingUp /> },
];

export const courses: CourseProps[] = [
    {
        id: "1",
        title: "AI Prompt Engineering Basics",
        instructor: "Priya Sharma",
        rating: 4.5,
        price: 199,
        category: "ai",
        level: "beginner",
        icon: <Bot size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "2",
        title: "Advanced Prompt Engineering",
        instructor: "Rahul Verma",
        rating: 4.8,
        price: 299,
        category: "ai",
        level: "advanced",
        icon: <Stars size={48} />,
        color: "#00B894"
    },
    {
        id: "3",
        title: "ChatGPT Mastery Course",
        instructor: "Anjali Patel",
        rating: 4.7,
        price: 249,
        category: "ai",
        level: "intermediate",
        icon: <MessageSquare size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "4",
        title: "Complete MERN Stack Development",
        instructor: "Vikram Singh",
        rating: 4.9,
        price: 4999,
        category: "development",
        level: "advanced",
        icon: <Layers size={48} />,
        color: "#00B894"
    },
    {
        id: "5",
        title: "Python Programming for Beginners",
        instructor: "Sneha Reddy",
        rating: 4.6,
        price: 999,
        category: "development",
        level: "beginner",
        icon: <FileCode size={48} />,
        color: "#00B894"
    },
    {
        id: "6",
        title: "JavaScript Fundamentals",
        instructor: "Neha Gupta",
        rating: 4.5,
        price: 899,
        category: "development",
        level: "beginner",
        icon: <Braces size={48} />,
        color: "#00B894"
    },
    {
        id: "7",
        title: "Complete React Development",
        instructor: "Pooja Iyer",
        rating: 4.9,
        price: 2999,
        category: "development",
        level: "intermediate",
        icon: <Repeat size={48} />,
        color: "#00B894"
    },
    {
        id: "8",
        title: "UI/UX Design Fundamentals",
        instructor: "Divya Nair",
        rating: 4.6,
        price: 1499,
        category: "design",
        level: "beginner",
        icon: <PaletteIcon size={48} />,
        color: "#00B894"
    }
];
