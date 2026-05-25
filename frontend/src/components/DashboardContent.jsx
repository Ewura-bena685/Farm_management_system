import React from 'react'
import OverviewTab from './tabs/OverviewTab'
import PensTab from './tabs/PensTab'
import LivestockTab from './tabs/LivestockTab'
import FinancialsTab from './tabs/FinancialsTab'
import HealthTab from './tabs/HealthTab'

function DashboardContent({ activeTab, dashboardData, livestockData, vaccinationSchedule, feedSchedule, eggForecast, loading, error }) {
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">Loading...</div>
            <p className="text-emerald-700 font-semibold">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && <OverviewTab data={dashboardData} />}
          {activeTab === 'pens' && <PensTab />}
          {activeTab === 'livestock' && <LivestockTab livestockData={livestockData} />}
          {activeTab === 'health' && <HealthTab vaccinationSchedule={vaccinationSchedule} feedSchedule={feedSchedule} eggForecast={eggForecast} />}
          {activeTab === 'financials' && <FinancialsTab />}
        </>
      )}
    </div>
  )
}

export default DashboardContent
