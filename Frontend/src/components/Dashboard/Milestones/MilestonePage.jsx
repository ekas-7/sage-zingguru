import React from 'react'
import Milestones from './Milestones'
import Sidebar from './Sidebar'

function MilestonePage() {
    return (
        // <div>
        //     <Sidebar />
        //     <Milestones/>
        // </div>

        <div className="w-full h-[calc(100vh-100px)]">
            <div className="h-full bg-[#fffbea] border-2 border-black rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col lg:flex-row h-full gap-4">
                    {/* Sidebar */}
                    <div className="w-full lg:w-72 flex flex-col gap-4 bg-[#d7e933] p-4 rounded-xl border-2 border-black">

                        {/* <Sidebar/> */}
                    </div>

                    {/* Main Editor */}
                    <div className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full">
                        <Milestones/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MilestonePage