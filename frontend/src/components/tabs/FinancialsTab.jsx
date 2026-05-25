import React from 'react'

function FinancialsTab() {
  const mockTransactions = [
    { id: 1, type: 'MTN MoMo', amount: 500, date: '2026-05-15', status: 'completed', reference: 'REF-00001' },
    { id: 2, type: 'Vodafone Cash', amount: 750, date: '2026-05-14', status: 'completed', reference: 'REF-00002' },
    { id: 3, type: 'MTN MoMo', amount: 250, date: '2026-05-13', status: 'pending', reference: 'REF-00003' },
    { id: 4, type: 'Bank Transfer', amount: 1000, date: '2026-05-12', status: 'completed', reference: 'REF-00004' }
  ]

  const totalTransactions = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const completedTransactions = mockTransactions.filter(tx => tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-900">Financials & Transactions</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
          <p className="text-gray-600 text-sm font-semibold mb-2">Total Transactions</p>
          <p className="text-3xl font-bold text-emerald-800">₵{totalTransactions.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-800">₵{completedTransactions.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
          <p className="text-gray-600 text-sm font-semibold mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-800">
            ₵{(totalTransactions - completedTransactions).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-emerald-900">Recent MoMo Transactions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="text-left p-4 font-semibold">Reference</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx, idx) => (
                <tr key={idx} className="border-b hover:bg-emerald-50 transition">
                  <td className="p-4 font-mono text-sm text-emerald-700">{tx.reference}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-800">₵{tx.amount.toFixed(2)}</td>
                  <td className="p-4 text-gray-600">{tx.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-semibold text-xs ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Quick Payment</h3>
        <p className="text-emerald-100 mb-4">Process a new MoMo or mobile money transaction</p>
        <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-2 rounded-lg font-semibold transition">
          New Transaction
        </button>
      </div>
    </div>
  )
}

export default FinancialsTab
