import React from 'react';

interface CategoryProps {
    title: string;
    icon: React.ReactNode;
}

export function CategoryCard({ title, icon }: CategoryProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer hover:-translate-y-1">
            <div className="text-primary group-hover:text-accent transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8">
                {icon}
            </div>
            <h3 className="font-semibold text-secondary">{title}</h3>
        </div>
    );
}
