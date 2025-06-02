import React from 'react'


const CircleSkeleton: React.FC = () => {
    return (
        <div className='space-w-2.5 animate-pulse'>
            <div className='flex items-center w-full space-x-2'>
                <div className='h-6 w-8 rounded-full bg-dark-fill-3'></div>
            </div>
        </div>
    )
}
export default CircleSkeleton