import { Route, Routes } from 'react-router-dom'
import ContactsList from './components/ContactsList'
import Layout from './components/layout/Layout'
import TemplatesList from './components/templates/TemplatesList'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/templates" element={<TemplatesList />} />
      </Routes>
    </Layout>
  )
}
