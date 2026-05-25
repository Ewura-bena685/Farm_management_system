import React, { useState } from 'react'
import { requestVetAdvice } from '../../services/api'

function HealthTab({ vaccinationSchedule = [], feedSchedule = [], eggForecast }) {
  const [symptoms, setSymptoms] = useState('')
  const [adviceResult, setAdviceResult] = useState(null)
  const [loadingAdvice, setLoadingAdvice] = useState(false)
  const [adviceError, setAdviceError] = useState(null)

  const handleVetAdviceSubmit = async event => {
    event.preventDefault()
    setAdviceError(null)
    setLoadingAdvice(true)
    const response = await requestVetAdvice({ symptoms })

    if (response.success) {
      setAdviceResult(response.data)
    } else {
      setAdviceError(response.message)
    }

    setLoadingAdvice(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4">Poultry Health Dashboard</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-emerald-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Mature Layers</p>
              <p className="text-3xl font-bold text-emerald-800">{eggForecast?.mature_layers ?? 0}</p>
            </div>
            <div className="border border-emerald-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Weekly Egg Forecast</p>
              <p className="text-3xl font-bold text-emerald-800">{eggForecast?.expected_weekly_eggs ?? 0}</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-emerald-50 p-4 border border-emerald-100">
            <p className="text-sm text-emerald-700">Forecast note</p>
            <p className="mt-2 text-gray-800">{eggForecast?.forecast_note ?? 'Add layers and track age to unlock egg forecasts.'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Vet Advice</h3>
          <form onSubmit={handleVetAdviceSubmit} className="space-y-4">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                Describe symptoms
              </label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                className="mt-2 w-full rounded border border-gray-300 p-3 text-sm"
                rows={4}
                placeholder="e.g. weak birds, cough, drop in eggs"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-emerald-800 px-4 py-2 text-white hover:bg-emerald-900"
              disabled={loadingAdvice || symptoms.trim().length === 0}
            >
              {loadingAdvice ? 'Getting advice…' : 'Get advice'}
            </button>
          </form>
          {adviceError && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {adviceError}
            </div>
          )}
          {adviceResult && (
            <div className="mt-4 rounded border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-900">Advice Summary</p>
              <p className="mt-2 text-gray-700">{adviceResult.summary}</p>
              <p className="mt-3 text-gray-700">{adviceResult.recommendation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Vaccination Schedule</h3>
          {vaccinationSchedule.length === 0 ? (
            <p className="text-sm text-gray-600">No vaccination schedule available yet.</p>
          ) : (
            <div className="space-y-3">
              {vaccinationSchedule.map((item, index) => (
                <div key={index} className="rounded-lg border border-emerald-100 p-3">
                  <p className="font-semibold text-emerald-800">{item.vaccine_type}</p>
                  <p className="text-sm text-gray-600">Due: {item.age_weeks_due} week(s)</p>
                  <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Feed Schedule</h3>
          {feedSchedule.length === 0 ? (
            <p className="text-sm text-gray-600">No feed schedule available yet.</p>
          ) : (
            <div className="space-y-3">
              {feedSchedule.map((item, index) => (
                <div key={index} className="rounded-lg border border-emerald-100 p-3">
                  <p className="font-semibold text-emerald-800">{item.breed_type} — {item.feed_type}</p>
                  <p className="text-sm text-gray-600">Week {item.age_weeks}: {item.quantity_kg_per_day} kg/day</p>
                  <p className="mt-1 text-sm text-gray-700">{item.notes}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HealthTab
