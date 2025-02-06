import React from 'react'
import TopBox from './TopBox'
import SalesChart from './SalesChart'
import DashboardCalendar from './DashboardCalendar'

const AdminMainDashboard = () => {
    return (
        <div>
            <header className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            </header>

            <main>
                {/* Dashboard Home Section */}

                <TopBox></TopBox>

                {/* Additional Features */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calendar */}
                    <DashboardCalendar />

                    {/* Sales Chart */}
                    <SalesChart />
                </div>


            </main>
        </div>
    )
}

export default AdminMainDashboard