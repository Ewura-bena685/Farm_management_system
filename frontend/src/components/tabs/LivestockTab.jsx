import React from 'react'

function LivestockTab({ livestockData }) {
  const getRFJBadgeColor = (rfj) => {
    const colors = {
      'breed_improvement': 'bg-blue-100 text-blue-800',
      'feed_conversion': 'bg-green-100 text-green-800',
      'mortality_tracking': 'bg-purple-100 text-purple-800',
      'production_rate': 'bg-amber-100 text-amber-800',
      'none': 'bg-gray-100 text-gray-800'
    }
    return colors[rfj] || 'bg-gray-100 text-gray-800'
  }

  const getTypeColor = (type) => {
    const colors = {
      'broiler': 'bg-yellow-50',
      'layer': 'bg-amber-50'
    }
    return colors[type] || 'bg-white'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-emerald-900">Livestock Inventory</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          + Add Livestock
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="text-left p-4 font-semibold">ID</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Breed</th>
                <th className="text-left p-4 font-semibold">Age (months)</th>
                <th className="text-left p-4 font-semibold">Weight (kg)</th>
                <th className="text-left p-4 font-semibold">RFJ Compliance</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {livestockData && livestockData.length > 0 ? (
                livestockData.map((animal, idx) => (
                  <tr key={idx} className={`border-b hover:shadow-md transition ${getTypeColor(animal.type)}`}>
                    <td className="p-4 font-semibold text-emerald-900">{animal.id || idx + 1}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-sm">
                        {animal.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800">{animal.breed}</td>
                    <td className="p-4 text-gray-800">{animal.age_months}</td>
                    <td className="p-4 font-semibold text-emerald-700">{animal.weight_kg} kg</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full font-semibold text-xs ${getRFJBadgeColor(animal.rfj_compliance)}`}>
                        {animal.rfj_compliance.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <p className="text-lg mb-2">No livestock records yet</p>
                    <p className="text-sm">Add your first animal to get started</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {livestockData && livestockData.length > 0 && (
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <p className="text-sm text-emerald-900">
            <strong>Total Animals:</strong> {livestockData.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default LivestockTab
