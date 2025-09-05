import React from 'react'
import { Users } from 'lucide-react'

const SidebarSkeleton = () => {
    // Create an array for skeleton items
    const skeletonUsers = Array(5).fill(null);

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header skeleton */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* Online filter skeleton */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <div className="skeleton h-4 w-4"></div>
                    <div className="skeleton h-4 w-24"></div>
                </div>
            </div>

            {/* Users list skeleton */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonUsers.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full"></div>
                        </div>
                        <div className="hidden lg:block space-y-2 flex-1">
                            <div className="skeleton h-4 w-32"></div>
                            <div className="skeleton h-3 w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default SidebarSkeleton;