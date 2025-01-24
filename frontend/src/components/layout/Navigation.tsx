import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Contacts' },
  { path: '/templates', label: 'Templates' },
  // We can add Analytics later
]

export default function Navigation() {
  const location = useLocation()
  const [activeStyles, setActiveStyles] = useState({ left: 0, width: 0 })
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.path === location.pathname)
    const activeLink = navRefs.current[activeIndex]

    if (activeLink) {
      const parentLeft = activeLink.parentElement?.getBoundingClientRect().left ?? 0
      const linkRect = activeLink.getBoundingClientRect()

      setActiveStyles({
        left: linkRect.left - parentLeft,
        width: linkRect.width,
      })
    }
  }, [location.pathname])

  return (
    <nav className="bg-white shadow">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center sm:mr-20">
              <h1 className="text-3xl font-bold text-primary-gradient">Sales Outreach</h1>
            </div>
            <div className="hidden sm:flex relative">
              <div className="absolute bottom-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out" style={activeStyles} />
              {navItems.map(({ path, label }, index) => (
                <Link
                  key={path}
                  ref={(el) => (navRefs.current[index] = el)}
                  to={path}
                  className={clsx(
                    'inline-flex items-center px-1 pt-1 relative flex-1 justify-center sm:px-4',
                    location.pathname === path ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
