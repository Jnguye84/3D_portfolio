import React, { useMemo, useState, useRef } from 'react'
import './index.css'

const floatingMarks = [
  { label: '01', tone: 'mint', x: '8%', y: '6%', size: '74px' },
  { label: '02', tone: 'rose', x: '38%', y: '9%', size: '52px' },
  { label: '03', tone: 'sand', x: '76%', y: '11%', size: '64px' },
  { label: '04', tone: 'sky', x: '83%', y: '34%', size: '58px' },
  { label: '05', tone: 'plum', x: '18%', y: '72%', size: '68px' },
  { label: '06', tone: 'citrus', x: '69%', y: '73%', size: '48px' },
]

function Sidebar({ navSections, contactItems, searchQuery, onSearchChange, onOpenItem }) {
  return (
    <aside className="sidebar" aria-label="Site navigation">
      <div className="search-box">
        <input
          type="search"
          aria-label="Search archive"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {navSections.map((section) => (
        <section key={section.id} className="nav-group" id={section.id}>
          <div className="nav-heading">
            <h2>{section.title}</h2>
            <span>({section.count})</span>
          </div>
          <ul>
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="nav-item-button"
                  onClick={() => onOpenItem(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="nav-group nav-group--contact">
        <div className="nav-heading">
          <h2>Contact</h2>
          <span>({contactItems.length})</span>
        </div>
        <ul>
          {contactItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="nav-item-button"
                onClick={() => onOpenItem(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function MainCanvas() {
  return (
    <section className="canvas" aria-label="Scattered collage">
      <div className="hero-copy-block">
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-left">
        <p>Personal archive skeleton with placeholders only.</p>
      </div>
      <div className="footer-right">
        <a href="#hardware">Hardware</a>
        <a href="#software">Software</a>
        <a href="#files">Files</a>
        <a href="#other">Other</a>
      </div>
    </footer>
  )
}

function FloatingWindow({ win, onClose, onBringToFront, onDrag, onToggleFullscreen }) {
  const dragRef = React.useRef(null)

  function handlePointerDown(e) {
    if (win.isFullscreen) return
    e.stopPropagation()
    onBringToFront(win.id)
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: Number.parseFloat(win.x) || 0,
      originY: Number.parseFloat(win.y) || 0,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  function handlePointerMove(e) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const nextLeft = Math.max(8, drag.originX + (e.clientX - drag.startX))
    const nextTop = Math.max(8, drag.originY + (e.clientY - drag.startY))
    onDrag(win.id, nextLeft, nextTop)
  }

  function endDrag(e) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    dragRef.current = null
  }

  return (
    <div
      className={`floating-window ${win.isFullscreen ? 'is-fullscreen' : ''}`}
      style={{
        left: win.isFullscreen ? 0 : win.x,
        top: win.isFullscreen ? 0 : win.y,
        width: win.isFullscreen ? '100vw' : undefined,
        height: win.isFullscreen ? '100vh' : undefined,
        zIndex: win.z,
      }}
      role="dialog"
      aria-label={win.title}
    >
      <div className="fw-titlebar">
        <div className="fw-titlewrap">
          <button
            className="fw-close"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose(win.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Close ${win.title}`}
          >
            ×
          </button>
          <div
            className="fw-draghandle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="fw-title">{win.title}</div>
          </div>
        </div>
        <button
          className="fw-open"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFullscreen(win.id)
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Open <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="fw-urlbar">
        <span>{win.url}</span>
      </div>
      <div className="fw-content">{win.content}</div>
    </div>
  )
}

export default function App() {
  // Single shared data source for tiles and navigation
  const displayItems = [
    {
      id: 'magic-lantern',
      label: 'Magic Lantern',
      section: 'Hardware',
      imageSrc: '/images/magiclantern.jpg',
      windowTitle: 'Magic Lantern',
      windowUrl: 'portfolio://projects/magic-lantern',
      windowContent: (
        <div className="popup-copy">
          <p>Magic Lantern project window.</p>
          <p>Replace this with your own project notes, media, and links.</p>
        </div>
      ),
    },
    {
      id: 'phone-booth',
      label: 'Phone Booth',
      section: 'Software',
      imageSrc: '/images/telephone-booth.png',
      cutout: true,
      windowTitle: 'Phone Booth',
      windowUrl: 'portfolio://projects/phone-booth',
      windowContent: (
        <div className="popup-copy">
          <p>Phone Booth project window.</p>
          <p>Add your own story, context, and supporting content here.</p>
        </div>
      ),
    },
    {
      id: 'stage-cart',
      label: 'Stage Cart',
      section: 'Files',
      imageSrc: '/images/bp.jpg',
      windowTitle: 'Stage Cart',
      windowUrl: 'portfolio://projects/stage-cart',
      windowContent: (
        <div className="popup-copy">
          <p>Stage Cart project window.</p>
          <p>Use this area for captions, milestones, embeds, or notes.</p>
        </div>
      ),
    },
  ]

  const contactItems = [
    {
      id: 'contact-email',
      label: 'Email',
      section: 'Contact',
      imageSrc: null,
      windowTitle: 'Email',
      windowContent: (
        <div style={{ padding: 12 }}>
          <p style={{ margin: 0 }}>hello@example.com</p>
        </div>
      ),
    },
    {
      id: 'contact-instagram',
      label: 'Instagram',
      section: 'Contact',
      imageSrc: null,
      windowTitle: 'Instagram',
      windowContent: (
        <div style={{ padding: 12 }}>
          <p style={{ margin: 0 }}>https://www.instagram.com/</p>
        </div>
      ),
    },
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const filteredNavSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const sectionsMap = new Map()

    displayItems.forEach((item) => {
      const searchable = `${item.label} ${item.section} ${item.windowTitle}`.toLowerCase()
      if (query && !searchable.includes(query)) return
      if (!sectionsMap.has(item.section)) {
        sectionsMap.set(item.section, { id: item.section.toLowerCase(), title: item.section, items: [] })
      }
      sectionsMap.get(item.section).items.push(item)
    })

    return Array.from(sectionsMap.values())
  }, [searchQuery, displayItems])

  const filteredContactItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return contactItems.filter((item) => {
      const searchable = `${item.label} ${item.section} ${item.windowTitle}`.toLowerCase()
      return !query || searchable.includes(query)
    })
  }, [searchQuery, contactItems])

  // Generate evenly spaced positions inside the content area to avoid overlaps
  function generatePositions(n) {
    const minX = 20 // percent from left of content area (keeps clear of sidebar)
    const maxX = 90
    const minY = 8
    const maxY = 78

    const cols = Math.ceil(Math.sqrt(n))
    const rows = Math.ceil(n / cols)

    const positions = []
    let idx = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (idx >= n) break
        const x = cols === 1 ? (minX + maxX) / 2 : minX + (c / (cols - 1)) * (maxX - minX)
        const y = rows === 1 ? (minY + maxY) / 2 : minY + (r / (rows - 1)) * (maxY - minY)
        // small deterministic jitter to make layout feel organic
        const jitterX = ((idx * 37) % 7) - 3 // pseudo-random-looking but deterministic
        const jitterY = ((idx * 53) % 7) - 3
        const px = Math.max(minX, Math.min(maxX, x + jitterX))
        const py = Math.max(minY, Math.min(maxY, y + jitterY))
        const rot = ((idx * 23) % 28) - 14
        positions.push({ x: `${px}%`, y: `${py}%`, rot, scale: 1 })
        idx++
      }
    }
    return positions
  }

  const scatteredPositions = generatePositions(displayItems.length)

  const [windows, setWindows] = useState([])
  const zRef = useRef(2000)

  function openWindow(item, pos) {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    zRef.current += 1
    const jitterX = Math.floor(Math.random() * 21) - 10
    const jitterY = Math.floor(Math.random() * 21) - 10
    const x = `${Math.round(window.innerWidth / 2 + jitterX)}px`
    const y = `${Math.round(window.innerHeight / 2 + jitterY)}px`
    const newWin = {
      id,
      title: item.windowTitle,
      url: item.windowUrl,
      content: item.windowContent,
      x,
      y,
      z: zRef.current,
      isFullscreen: false,
    }
    setWindows((s) => [...s, newWin])
  }

  function openItemWindow(item) {
    openWindow(item)
  }

  function closeWindow(id) {
    setWindows((s) => s.filter((w) => w.id !== id))
  }

  function bringToFront(id) {
    zRef.current += 1
    setWindows((s) => s.map((w) => (w.id === id ? { ...w, z: zRef.current } : w)))
  }

  function handleDrag(id, leftPx, topPx) {
    setWindows((s) => s.map((w) => (w.id === id ? { ...w, x: `${leftPx}px`, y: `${topPx}px` } : w)))
  }

  function toggleFullscreen(id) {
    setWindows((s) =>
      s.map((w) => {
        if (w.id !== id) return w
        if (w.isFullscreen) {
          return {
            ...w,
            isFullscreen: false,
            x: w.prevX ?? w.x,
            y: w.prevY ?? w.y,
          }
        }
        return {
          ...w,
          isFullscreen: true,
          prevX: w.x,
          prevY: w.y,
          x: 0,
          y: 0,
        }
      })
    )
  }

  return (
    <div className="page-shell">
      <Sidebar
        navSections={filteredNavSections}
        contactItems={filteredContactItems}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenItem={openItemWindow}
      />
      <div className="content-shell">
        <MainCanvas />

        <section className="scatter-main">
          {displayItems.map((item, idx) => {
            const pos = scatteredPositions[idx]
            return (
              <article
                key={item.id}
                className={`scatter-collection-card ${item.cutout ? 'scatter-collection-card--cutout' : ''}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: `rotate(${pos.rot}deg) scale(${pos.scale})`,
                  cursor: 'pointer',
                }}
                onClick={() => openWindow(item, pos)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openWindow(item, pos)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open ${item.label}`}
              >
                <img className="tile-image" src={item.imageSrc} alt={item.label} />
                <div className="card-label">
                  <p className="card-title">{item.label}</p>
                </div>
              </article>
            )
          })}
        </section>

        {/* Floating windows rendered above other content */}
        {windows.map((w) => (
          <FloatingWindow
            key={w.id}
            win={w}
            onClose={closeWindow}
            onBringToFront={bringToFront}
            onDrag={handleDrag}
            onToggleFullscreen={toggleFullscreen}
          />
        ))}

        <Footer />
      </div>
    </div>
  )
}
