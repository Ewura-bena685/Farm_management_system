import React, { useState, useEffect } from 'react'
import { fetchDashboard, fetchLivestock, fetchVaccinationSchedule, fetchFeedSchedule, fetchEggForecast } from '../services/api'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [livestockData, setLivestockData] = useState([])
  const [vaccinationSchedule, setVaccinationSchedule] = useState([])
  const [feedSchedule, setFeedSchedule] = useState([])
  const [eggForecast, setEggForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const dashResult = await fetchDashboard()
      const livestockResult = await fetchLivestock()
      const vaccResult = await fetchVaccinationSchedule()
      const feedResult = await fetchFeedSchedule()
      const eggResult = await fetchEggForecast()

      if (dashResult.success) {
        setDashboardData(dashResult.data)
      } else {
        setError(dashResult.message)
      }

      if (livestockResult.success) {
        setLivestockData(livestockResult.data)
      }

      if (vaccResult.success) {
        setVaccinationSchedule(vaccResult.data)
      }

      if (feedResult.success) {
        setFeedSchedule(feedResult.data)
      }

      if (eggResult.success) {
        setEggForecast(eggResult.data)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-amber-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <DashboardContent
          activeTab={activeTab}
          dashboardData={dashboardData}
          livestockData={livestockData}
          vaccinationSchedule={vaccinationSchedule}
          feedSchedule={feedSchedule}
          eggForecast={eggForecast}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default Dashboard
