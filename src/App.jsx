import React, { useMemo, useState, useRef } from 'react'
import './index.css'

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
            <span>({section.items.length})</span>
          </div>
          <ul>
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="nav-item-button"
                  onClick={() => onOpenItem(item)}
                >
                  {item.imageSrc && (
                    <img className="nav-item-icon" src={item.imageSrc} alt="" aria-hidden="true" />
                  )}
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
      className={`floating-window ${win.isFullscreen ? 'is-fullscreen' : ''} ${win.kind === 'scroll-image' ? 'floating-window--pdf' : ''}`}
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
      <div className="fw-content">
        {win.kind === 'scroll-image' ? (
          <div className="scroll-image-wrap">
            <img className="scroll-image" src={win.scrollImageSrc} alt={win.title} />
          </div>
        ) : (
          win.content
        )}
      </div>
    </div>
  )
}

export default function App() {
  // Single shared data source for tiles and navigation
  const displayItems = [
    {
      id: 'paint',
      label: 'Paint',
      section: 'Hardware',
      imageSrc: '/images/paint.JPG',
      cutout: true,
      windowTitle: 'paint',
      windowUrl: 'portfolio://projects/paint',
      windowContent: (
        <div className="popup-copy">
          <p>Magic Lantern project window.</p>
          <p>Replace this with your own project notes, media, and links.</p>
        </div>
      ),
      position: { x: '1%', y: '1%', rot: 5, scale: 1 },
    },
    {
      id: 'graduation',
      label: 'graduation',
      section: 'Hardware',
      imageSrc: '/images/grad1.jpg',
      cutout: true,
      windowTitle: 'graduation',
      windowUrl: 'portfolio://projects/graduation',
      windowContent: (
        <div className="popup-copy">
          <p>Magic Lantern project window.</p>
          <p>Replace this with your own project notes, media, and links.</p>
        </div>
      ),
      position: { x: '50%', y: '10%', rot: 1, scale: 1 },
    },
    {
      id: 'jessica',
      label: 'jessica',
      section: 'jessica',
      imageSrc: '/images/jessica.png',
      cutout: true,
      position: { x: '10%', y: '40%', rot: 1, scale: 1 },
    },
     {
      id: 'jester',
      label: 'jester',
      section: 'Hardware',
      imageSrc: '/images/jester_loop.gif',
      cutout: true,
      windowTitle: 'jester',
      windowUrl: 'portfolio://projects/jester',
      windowContent: (
        <div className="popup-copy">
          <img className="popup-image" src="/images/jester_loop.gif" alt="jester" />
        </div>
      ),
      position: { x: '30%', y: '40%', rot: 1, scale: 1},
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
      position: { x: '80%', y: '30%', rot: -3, scale: .9 },
    },
    {
      id: 'clay',
      label: 'Polymer Clay',
      section: 'Software',
      imageSrc: '/images/clay_figure-Photoroom.png',
      cutout: true,
      windowTitle: 'Polymer Clay',
      windowUrl: 'portfolio://projects/polymer-clay',
      windowContent: (
        <div className="popup-copy">
          <p>Polymer Clay</p>
          <p>Add your own story, context, and supporting content here.</p>
        </div>
      ),
      position: { x: '50%', y: '60%', rot: 10, scale: 1 },
      hoverRot: 50,
    },
    {
      id: 'Acting',
      label: 'Acting',
      section: 'Files',
      imageSrc: '/images/rte.JPG',
      cutout: true,
      windowTitle: 'Acting',
      windowUrl: 'portfolio://projects/acting',
      windowKind: 'scroll-image',
      scrollImageSrc: '/documents/acting.png',
      position: { x: '75%', y: '1%', rot: 3, scale: 1.1 },
          },
              {
      id: 'christmas',
      label: 'christmas',
      section: 'Files',
      imageSrc: '/images/christmas1.JPG',
      hoverImageSrc: '/images/christmas2.JPG',
      cutout: true,
      position: { x: '31%', y: '1%', rot: 3, scale: 1.1 },
          },
        {
      id: 'book',
      label: 'book',
      section: 'Files',
      imageSrc: '/images/book.png',
      cutout: true,
      windowTitle: 'Stage Cart',
      windowUrl: 'portfolio://projects/book',
      windowContent: (
        <div className="popup-copy">
          <p>Stage Cart project window.</p>
          <p>Use this area for captions, milestones, embeds, or notes.</p>
        </div>
      ),
      position: { x: '20%', y: '60%',rot: 1, scale: 1 },
    },
    {
      id: 'stamp',
      label: 'stamp',
      section: 'Files',
      imageSrc: '/images/stamp1.JPG',
      cutout: true,
      windowTitle: 'Stamp',
      windowUrl: 'portfolio://projects/stamp',
      windowContent: (
        <div className="popup-copy">
          <p>Stage Cart project window.</p>
          <p>Use this area for captions, milestones, embeds, or notes.</p>
        </div>
      ),
      position: { x: '20%', y: '60%',rot: 1, scale: 1 },
    },
        {
      id: 'book',
      label: 'book',
      section: 'Files',
      imageSrc: '/images/book.png',
      cutout: true,
      windowTitle: 'Book',
      windowUrl: 'portfolio://projects/book',
      windowContent: (
        <div className="popup-copy">
          <p>Stage Cart project window.</p>
          <p>Use this area for captions, milestones, embeds, or notes.</p>
        </div>
      ),
      position: { x: '15%', y: '23%',rot: 1, scale: .7},
    },
    {
      id: 'dress',
      label: 'stamp',
      section: 'Files',
      imageSrc: '/images/dress.jpg',
      cutout: true,
      windowTitle: 'Stamp',
      windowUrl: 'portfolio://projects/dress',
      windowContent: (
        <div className="popup-copy">
          <p>Stage Cart project window.</p>
          <p>Use this area for captions, milestones, embeds, or notes.</p>
        </div>
      ),
      position: { x: '70%', y: '60%',rot: 1, scale: 1 },
    },
    {
      id: 'star',
      label: 'star',
      section: 'Files',
      imageSrc: '/images/star.png',
      cutout: true,
      position: { x: '66%', y: '1%',rot: 1, scale: .4 },
    },
    {
      id: 'square',
      label: 'square',
      section: 'Files',
      imageSrc: '/images/square.png',
      cutout: true,
      position: { x: '1%', y: '50%',rot: 1, scale: .6 },
    },
    {
      id: 'eightball',
      label: 'eightball',
      section: 'Files',
      imageSrc: '/images/eightball.png',
      cutout: true,
      position: { x: '33%', y: '51%',rot: 1, scale: .3 },
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
          <p style={{ margin: 0 }}>jessicanguyen858@gmail.com</p>
        </div>
      ),
    },
    {
      id: 'substack',
      label: 'Substack',
      section: 'Contact',
      imageSrc: null,
      windowTitle: 'Substack',
      windowContent: (
        <div style={{ padding: 12 }}>
          <p style={{ margin: 0 }}>https://www.instagram.com/</p>
        </div>
      ),
    },
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [windows, setWindows] = useState([])
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const zRef = useRef(1)

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

  function openWindow(item) {
    const existing = windows.find((w) => w.itemId === item.id)
    zRef.current += 1
    const nextZ = zRef.current

    if (existing) {
      setWindows((s) => s.map((w) => (w.id === existing.id ? { ...w, z: nextZ } : w)))
      return
    }

    const cascadeStep = 32
    const offset = (windows.length % 8) * cascadeStep

    setWindows((s) => [
      ...s,
      {
        id: `${item.id}-${nextZ}`,
        itemId: item.id,
        title: item.windowTitle,
        url: item.windowUrl ?? '',
        content: item.windowContent,
        kind: item.windowKind,
        scrollImageSrc: item.scrollImageSrc,
        x: `${120 + offset}px`,
        y: `${120 + offset}px`,
        z: nextZ,
        isFullscreen: false,
      },
    ])
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
          {displayItems.map((item) => {
            const isHovered = hoveredItemId === item.id
            const rot = isHovered && item.hoverRot !== undefined ? item.hoverRot : item.position?.rot
            return (
              <article
                key={item.id}
                className={`scatter-collection-card ${item.cutout ? 'scatter-collection-card--cutout' : ''}`}
                style={{
                  left: item.position?.x,
                  top: item.position?.y,
                  transform: `rotate(${rot}deg) scale(${item.position?.scale})`,
                  cursor: 'pointer',
                }}
                onClick={() => openWindow(item, 1)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openWindow(item, 1)
                  }
                }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${item.label}`}
              >
                <img
                  className="tile-image"
                  src={item.hoverImageSrc && isHovered ? item.hoverImageSrc : item.imageSrc}
                  alt={item.label}
                />
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
