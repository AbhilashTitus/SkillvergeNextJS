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
        instructor: "Video Creator", // Replace with actual creator name from YouTube video
        rating: 4.5,
        price: 199,
        category: "ai",
        level: "beginner",
        icon: <Bot size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/gHg1OA5wMDc?si=ik-dOehCz2bcPVWs"
    },
    {
        id: "2",
        title: "Advanced Prompt Engineering",
        instructor: "Video Creator", // Replace with actual creator name from YouTube video
        rating: 4.8,
        price: 299,
        category: "ai",
        level: "advanced",
        icon: <Stars size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/ROjfumHCY7Y?si=NChjtsTompvhyCBw"
    },
    {
        id: "3",
        title: "ChatGPT Mastery Course",
        instructor: "Video Creator", // Replace with actual creator name from YouTube video
        rating: 4.7,
        price: 249,
        category: "ai",
        level: "intermediate",
        icon: <MessageSquare size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/KMviqH0IYJ0?si=NQmEhd8_GOs8BePu"
    },
    {
        id: "4",
        title: "Complete MERN Stack Development",
        instructor: "Video Creator",
        rating: 4.9,
        price: 4999,
        category: "development",
        level: "advanced",
        icon: <Layers size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/ib5_HfCwqL4?si=N15HLMhdDHrlh5FG"
    },
    {
        id: "5",
        title: "Advanced MERN Stack Projects",
        instructor: "Video Creator",
        rating: 4.8,
        price: 3499,
        category: "development",
        level: "advanced",
        icon: <Terminal size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/jB_JBLbOpMg?si=xEAtl0aDBYdq5wL2"
    },
    {
        id: "6",
        title: "Python Programming for Beginners",
        instructor: "Video Creator",
        rating: 4.6,
        price: 999,
        category: "development",
        level: "beginner",
        icon: <FileCode size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/jHk5tpF3NVI?si=IjerlAZqq92kYb4i"
    },
    {
        id: "7",
        title: "Python for Data Science",
        instructor: "Video Creator",
        rating: 4.7,
        price: 2499,
        category: "data-science",
        level: "intermediate",
        icon: <BarChart size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/SBfEKDQw470?si=BMLAyCoscUByBd7o"
    },
    {
        id: "8",
        title: "JavaScript Fundamentals",
        instructor: "Video Creator",
        rating: 4.5,
        price: 899,
        category: "development",
        level: "beginner",
        icon: <Braces size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/b7je5Bqx550?si=kEE31kUDib2fsX5K"
    },
    {
        id: "9",
        title: "Advanced JavaScript & ES6+",
        instructor: "Video Creator",
        rating: 4.8,
        price: 1999,
        category: "development",
        level: "advanced",
        icon: <Terminal size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/GEjQouYYPnQ?si=sxIM2L9pH2JyDrHv"
    },
    {
        id: "10",
        title: "Complete React Development",
        instructor: "Video Creator",
        rating: 4.9,
        price: 2999,
        category: "development",
        level: "intermediate",
        icon: <Repeat size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/tqjJrXd27m4?si=abWmZudkQ59lF7Ld"
    },
    {
        id: "11",
        title: "Node.js Backend Development",
        instructor: "Video Creator",
        rating: 4.7,
        price: 2499,
        category: "development",
        level: "intermediate",
        icon: <Server size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/g09PoiCob4Y?si=zqSOLIQqDnctMn3L"
    },
    {
        id: "12",
        title: "UI/UX Design Fundamentals",
        instructor: "Video Creator",
        rating: 4.6,
        price: 1499,
        category: "design",
        level: "beginner",
        icon: <PaletteIcon size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/xaCrTHuiYz0?si=b0nXAdLDuXsikx5t"
    },
    {
        id: "13",
        title: "Figma Design Mastery",
        instructor: "Video Creator",
        rating: 4.8,
        price: 1799,
        category: "design",
        level: "intermediate",
        icon: <PenTool size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/9N57WqxgkjA?si=qUmLtD7BtcfsTXWf"
    },
    {
        id: "14",
        title: "Mobile App Development",
        instructor: "Video Creator",
        rating: 4.7,
        price: 3499,
        category: "development",
        level: "intermediate",
        icon: <Smartphone size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/ZRPn752U8r4?si=JPJwDgU6TXm5M7qG"
    },
    {
        id: "15",
        title: "Flutter Complete Course",
        instructor: "Video Creator",
        rating: 4.8,
        price: 2999,
        category: "development",
        level: "intermediate",
        icon: <AppWindow size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/Jy_inQPBxsw?si=4QH6y6Hs5kKzSarS"
    },
    {
        id: "16",
        title: "Complete Freelancing Guide",
        instructor: "Video Creator",
        rating: 4.5,
        price: 799,
        category: "business",
        level: "beginner",
        icon: <Briefcase size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/gWIpsqIgxbA?si=SCybeL3dgQvxFsxZ"
    },
    {
        id: "17",
        title: "Productivity Hacks & Time Management",
        instructor: "Video Creator",
        rating: 4.6,
        price: 599,
        category: "productivity",
        level: "beginner",
        icon: <Zap size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/kZ8iLvqVz4E?si=R0vuv4o7NWU8M-o3"
    },
    {
        id: "18",
        title: "Time Management Mastery",
        instructor: "Video Creator",
        rating: 4.4,
        price: 499,
        category: "productivity",
        level: "beginner",
        icon: <Clock size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/F0s-U2hO_Gw?si=1VPbW8JHJxi2utEe"
    },
    {
        id: "19",
        title: "Digital Marketing Complete Course",
        instructor: "Video Creator",
        rating: 4.7,
        price: 1999,
        category: "marketing",
        level: "intermediate",
        icon: <Megaphone size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/hIiHkaOw6Uw?si=T_EO-EpfethvCYpV"
    },
    {
        id: "20",
        title: "SEO Mastery & Google Rankings",
        instructor: "Video Creator",
        rating: 4.8,
        price: 1799,
        category: "marketing",
        level: "advanced",
        icon: <TrendingUp size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/gC5wFoi6v8E?si=xRoeZOUgpexxu4Av"
    },
    {
        id: "21",
        title: "Data Analytics Complete Course",
        instructor: "Video Creator",
        rating: 4.7,
        price: 2999,
        category: "data-science",
        level: "intermediate",
        icon: <BarChart size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/UE2FYfujpFs?si=862MQrZE6HnjDtZ9"
    },
    {
        id: "22",
        title: "Advanced Excel for Professionals",
        instructor: "Video Creator",
        rating: 4.6,
        price: 1299,
        category: "productivity",
        level: "intermediate",
        icon: <Table size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/9aJFSH7-zTo?si=d9Qbz7m60V5CXT_m"
    },
    {
        id: "23",
        title: "Canva Design for Beginners",
        instructor: "Video Creator",
        rating: 4.5,
        price: 699,
        category: "design",
        level: "beginner",
        icon: <Layout size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/o3JU8cHtR9s?si=EaaNe6-ErzL8-AmF"
    },
    {
        id: "24",
        title: "No-Code Tools & App Building",
        instructor: "Video Creator",
        rating: 4.6,
        price: 1499,
        category: "development",
        level: "beginner",
        icon: <Code size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/mPfvfjLkiDA?si=aHp2fTv5VKav1zc0"
    },
    {
        id: "25",
        title: "Startup & Business Fundamentals",
        instructor: "Video Creator",
        rating: 4.8,
        price: 2499,
        category: "business",
        level: "intermediate",
        icon: <Rocket size={48} />,
        color: "#2D6DF6",
        videoEmbed: "https://www.youtube.com/embed/jfKlXQ_Ei2I?si=OyXGdhn_Y44ep9u2"
    },
    {
        id: "26",
        title: "2025 AI Productivity Masterclass",
        instructor: "Video Creator",
        rating: 5.0,
        price: 99,
        category: "productivity",
        level: "beginner",
        icon: <Bot size={48} />,
        color: "#00B894",
        videoEmbed: "https://www.youtube.com/embed/Uw78K4nMejM?si=oLRgoQbt28GdiUEH"
    }
];
