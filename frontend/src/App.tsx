import { Route, Routes } from 'react-router-dom'
import { ContactsList } from './components/ContactsList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 selection:bg-[hsl(320,65%,52%,20%)]">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary-gradient">Sales Outreach Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<ContactsList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
