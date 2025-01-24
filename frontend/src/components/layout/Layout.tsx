import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 selection:bg-[hsl(320,65%,52%,20%)]">
      <Navigation />
      <main className="container py-6">{children}</main>
    </div>
  )
}
