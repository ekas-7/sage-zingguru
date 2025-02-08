import React from 'react'
import Milestones from './Milestones'
import Sidebar from './Sidebar'

function MilestonePage() {
    return (

        <div className="w-full h-screen">
            <div className="h-screen bg-[#fffbea] dark:bg-gray-800 rounded-xl p-4 md:p-6">
                <div className="flex flex-col lg:flex-row h-full gap-4">
                    {/* Sidebar */}
                    <div className="w-full lg:w-72 flex flex-col gap-4 bg-[#d7e933] p-4 rounded-xl border-2 border-black">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg h-full p-6 transition-all hover:shadow-xl">
                            <Milestones />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MilestonePage