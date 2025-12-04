import React from 'react';

interface CategoryProps {
    title: string;
    icon: React.ReactNode;
}

export function CategoryCard({ title, icon }: CategoryProps) {
    return (
        <div className="bg-white p-8 rounded-xl text-center cursor-pointer transition-all duration-[300ms] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:bg-[#2D6DF6] hover:text-white group">
            <div className="text-[2.5rem] text-[#2D6DF6] mb-4 transition-colors duration-[300ms] group-hover:text-white [&>svg]:w-10 [&>svg]:h-10">
                {icon}
            </div>
            <h3 className="text-base font-semibold m-0">
                {title}
            </h3>
        </div>
    );
}
