import React from 'react'

function PensTab() {
  const mockPens = [
    { id: 1, type: 'poultry', capacity: 500, current: 450 },
    { id: 2, type: 'poultry', capacity: 300, current: 280 },
    { id: 3, type: 'poultry', capacity: 400, current: 360 }
  ]

  const getTypeIcon = () => 'Poultry'

  const calculateCapacityPercent = (current, capacity) => (current / capacity) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-emerald-900">Pen Management</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          + New Pen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPens.map(pen => {
          const capacityPercent = calculateCapacityPercent(pen.current, pen.capacity)
          const capacityColor = capacityPercent > 80 ? 'text-red-600' : capacityPercent > 60 ? 'text-yellow-600' : 'text-green-600'

          return (
            <div key={pen.id} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-emerald-900">Pen {pen.id}</h3>
                <span className="text-3xl">{getTypeIcon(pen.type)}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="font-semibold text-gray-800 capitalize">{pen.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Capacity: {pen.current}/{pen.capacity}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        capacityPercent > 80 ? 'bg-red-500' : capacityPercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>
                  <p className={`text-sm font-semibold mt-1 ${capacityColor}`}>
                    {capacityPercent.toFixed(0)}% Full
                  </p>
                </div>

                <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-semibold transition">
                  Manage Pen
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PensTab
