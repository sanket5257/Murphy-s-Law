'use client'

import { useState } from 'react'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [checkingTables, setCheckingTables] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [tablesStatus, setTablesStatus] = useState<any>(null)

  const checkTables = async () => {
    setCheckingTables(true)
    try {
      const response = await fetch('/api/setup-tables', {
        method: 'POST',
      })
      const data = await response.json()
      setTablesStatus(data)
    } catch (error) {
      console.error('Error checking tables:', error)
    } finally {
      setCheckingTables(false)
    }
  }

  const handleSeed = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setResult({
          success: true,
          message: 'Database seeded successfully! You can now go to the admin panel.'
        })
      } else {
        setResult({
          success: false,
          message: data.message || 'Error seeding database. Check the console for details.'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
              <span className="text-4xl">🌱</span>
              <span>Database Seeder</span>
            </h1>
            <p className="text-green-50 mt-2">
              Populate your database with default FAQs, Pricing Plans, and Testimonials
            </p>
          </div>
          
          <div className="p-8">
            {/* Warning Box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-5 mb-6">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <p className="text-sm text-yellow-800 font-semibold mb-2">
                    Important: Database tables must be created first
                  </p>
                  <p className="text-sm text-yellow-700">
                    Run the SQL schema in Supabase before seeding. Click the button below to verify.
                  </p>
                </div>
              </div>
            </div>

            {/* Check Tables Button */}
            <button
              onClick={checkTables}
              disabled={checkingTables}
              className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 mb-6"
            >
              {checkingTables ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Checking Tables...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Check Tables Status</span>
                </>
              )}
            </button>

            {/* Tables Status */}
            {tablesStatus && (
              <div className={`mb-6 p-5 rounded-xl border-2 ${
                tablesStatus.success 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <p className={`font-bold mb-3 flex items-center space-x-2 ${
                  tablesStatus.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  <span className="text-2xl">{tablesStatus.success ? '✅' : '❌'}</span>
                  <span>{tablesStatus.message}</span>
                </p>
                {tablesStatus.tables && (
                  <div className="space-y-2">
                    {tablesStatus.tables.map((table: any) => (
                      <div key={table.table} className={`flex items-center space-x-2 text-sm font-medium ${
                        table.exists ? 'text-green-700' : 'text-red-700'
                      }`}>
                        <span className="text-lg">{table.exists ? '✓' : '✗'}</span>
                        <span>{table.table}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Seed Button */}
            <button
              onClick={handleSeed}
              disabled={loading || (tablesStatus && !tablesStatus.success)}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-bold text-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Seeding Database...</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">🌱</span>
                  <span>Seed Database Now</span>
                </>
              )}
            </button>

            {/* Result Message */}
            {result && (
              <div className={`mt-6 p-5 rounded-xl border-2 ${
                result.success 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <p className={`font-semibold flex items-center space-x-2 ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  <span className="text-2xl">{result.success ? '🎉' : '❌'}</span>
                  <span>{result.message}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="font-bold text-xl mb-4 flex items-center space-x-2">
            <span>📝</span>
            <span>Setup Instructions</span>
          </h2>
          <ol className="space-y-3">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="font-semibold text-gray-900">Create Database Tables</p>
                <p className="text-sm text-gray-600">Go to Supabase Dashboard → SQL Editor → Run <code className="bg-gray-100 px-2 py-1 rounded">supabase-schema.sql</code></p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="font-semibold text-gray-900">Verify Tables</p>
                <p className="text-sm text-gray-600">Click "Check Tables Status" button above</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <p className="font-semibold text-gray-900">Seed Database</p>
                <p className="text-sm text-gray-600">Click "Seed Database Now" to populate with default data</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <p className="font-semibold text-gray-900">Access Admin Panel</p>
                <a href="/admin" className="text-sm text-blue-600 hover:underline">Go to Admin Panel →</a>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
