import React from 'react'
import ComStatus from "../Cards/AdminComStatus";


function AdminComStatus() {

    return (
        <section className="relative container_admin" >
            <div className="bg-white overflow-hidden rounded">
                <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between flex-wrap">
                    <h3 className="text-lg font-bold text-black">
                        Admin Commission Status
                    </h3>
                </div>
            </div>
            <div className="grid mb-4 md:grid-cols-1 gap-3">
                <ComStatus />
            </div>
        </section>
    )
}

export default AdminComStatus
