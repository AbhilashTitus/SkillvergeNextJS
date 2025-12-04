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
        title: "Advanced MERN Stack Projects",
        instructor: "Arjun Mehta",
        rating: 4.8,
        price: 3499,
        category: "development",
        level: "advanced",
        icon: <Terminal size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "6",
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
        id: "7",
        title: "Python for Data Science",
        instructor: "Karthik Kumar",
        rating: 4.7,
        price: 2499,
        category: "data-science",
        level: "intermediate",
        icon: <BarChart size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "8",
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
        id: "9",
        title: "Advanced JavaScript & ES6+",
        instructor: "Amit Joshi",
        rating: 4.8,
        price: 1999,
        category: "development",
        level: "advanced",
        icon: <Terminal size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "10",
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
        id: "11",
        title: "Node.js Backend Development",
        instructor: "Rohan Das",
        rating: 4.7,
        price: 2499,
        category: "development",
        level: "intermediate",
        icon: <Server size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "12",
        title: "UI/UX Design Fundamentals",
        instructor: "Divya Nair",
        rating: 4.6,
        price: 1499,
        category: "design",
        level: "beginner",
        icon: <PaletteIcon size={48} />,
        color: "#00B894"
    },
    {
        id: "13",
        title: "Figma Design Mastery",
        instructor: "Sanjay Kapoor",
        rating: 4.8,
        price: 1799,
        category: "design",
        level: "intermediate",
        icon: <PenTool size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "14",
        title: "Mobile App Development",
        instructor: "Manish Agarwal",
        rating: 4.7,
        price: 3499,
        category: "development",
        level: "intermediate",
        icon: <Smartphone size={48} />,
        color: "#00B894"
    },
    {
        id: "15",
        title: "Flutter Complete Course",
        instructor: "Ravi Shankar",
        rating: 4.8,
        price: 2999,
        category: "development",
        level: "intermediate",
        icon: <AppWindow size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "16",
        title: "Complete Freelancing Guide",
        instructor: "Meera Shah",
        rating: 4.5,
        price: 799,
        category: "business",
        level: "beginner",
        icon: <Briefcase size={48} />,
        color: "#00B894"
    },
    {
        id: "17",
        title: "Productivity Hacks & Time Management",
        instructor: "Kavita Desai",
        rating: 4.6,
        price: 599,
        category: "productivity",
        level: "beginner",
        icon: <Zap size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "18",
        title: "Time Management Mastery",
        instructor: "Suresh Pillai",
        rating: 4.4,
        price: 499,
        category: "productivity",
        level: "beginner",
        icon: <Clock size={48} />,
        color: "#00B894"
    },
    {
        id: "19",
        title: "Digital Marketing Complete Course",
        instructor: "Tanvi Malhotra",
        rating: 4.7,
        price: 1999,
        category: "marketing",
        level: "intermediate",
        icon: <Megaphone size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "20",
        title: "SEO Mastery & Google Rankings",
        instructor: "Aditya Rao",
        rating: 4.8,
        price: 1799,
        category: "marketing",
        level: "advanced",
        icon: <TrendingUp size={48} />,
        color: "#00B894"
    },
    {
        id: "21",
        title: "Data Analytics Complete Course",
        instructor: "Deepak Jain",
        rating: 4.7,
        price: 2999,
        category: "data-science",
        level: "intermediate",
        icon: <BarChart size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "22",
        title: "Advanced Excel for Professionals",
        instructor: "Lakshmi Krishnan",
        rating: 4.6,
        price: 1299,
        category: "productivity",
        level: "intermediate",
        icon: <Table size={48} />,
        color: "#00B894"
    },
    {
        id: "23",
        title: "Canva Design for Beginners",
        instructor: "Simran Kaur",
        rating: 4.5,
        price: 699,
        category: "design",
        level: "beginner",
        icon: <Layout size={48} />,
        color: "#2D6DF6"
    },
    {
        id: "24",
        title: "No-Code Tools & App Building",
        instructor: "Harsh Patel",
        rating: 4.6,
        price: 1499,
        category: "development",
        level: "beginner",
        icon: <Code size={48} />,
        color: "#00B894"
    },
    {
        id: "25",
        title: "Startup & Business Fundamentals",
        instructor: "Nikhil Bhatia",
        rating: 4.8,
        price: 2499,
        category: "business",
        level: "intermediate",
        icon: <Rocket size={48} />,
        color: "#2D6DF6"
    }
];
