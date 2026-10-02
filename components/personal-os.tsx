'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import {
  AppWindow, ArrowUpRight, Camera, Check, ChevronDown,
  Code2, FileText, FolderOpen, Globe2, Mail, Minus, Monitor,
  Moon, MoreHorizontal, MoveUpRight, Plus, Search, Settings2, Sun, X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import ownerProfile from '@/content/owner-profile.json'

type AppId = 'work' | 'about' | 'services' | 'notes' | 'browser' | 'settings' | 'contact'
type Theme = 'day' | 'night' | 'dark'
type TextSize = 'standard' | 'large'
type Note = { id: number; text: string; x?: number; y?: number }

const APPS: { id: AppId; name: string; subtitle: string; icon: typeof FolderOpen; tone: string }[] = [
  { id: 'work', name: 'My Work', subtitle: 'Portfolio', icon: FolderOpen, tone: 'mint' },
  { id: 'about', name: 'About Me', subtitle: 'Profile', icon: FileText, tone: 'peach' },
  { id: 'services', name: 'What I Build', subtitle: 'Services', icon: Code2, tone: 'blue' },
  { id: 'notes', name: 'Whiteboard', subtitle: 'Sticky notes', icon: FileText, tone: 'yellow' },
  { id: 'browser', name: 'Web Browser', subtitle: 'Live website', icon: Globe2, tone: 'blue' },
  { id: 'contact', name: 'Contact', subtitle: 'Instagram', icon: Camera, tone: 'pink' },
  { id: 'settings', name: 'Preferences', subtitle: 'Display', icon: Settings2, tone: 'slate' },
]
const DESKTOP_SHORTCUTS: { id: string; label: string; emoji: string; app: AppId }[] = [
  { id: 'projects', label: 'Projects', emoji: '📁', app: 'work' },
  { id: 'websites', label: 'Websites', emoji: '🖥️', app: 'work' },
  { id: 'services', label: 'Services', emoji: '🧩', app: 'services' },
  { id: 'about', label: 'About Marco', emoji: '🪪', app: 'about' },
  { id: 'proof', label: 'Proof & concepts', emoji: '🏆', app: 'work' },
  { id: 'socials', label: 'Socials', emoji: '📸', app: 'contact' },
  { id: 'founder', label: 'Founder.txt', emoji: '📄', app: 'about' },
  { id: 'whiteboard', label: 'Whiteboard', emoji: '📝', app: 'notes' },
  { id: 'browser', label: 'Browser', emoji: '🌐', app: 'browser' },
  { id: 'message', label: 'Leave a message', emoji: '✉️', app: 'contact' },
  { id: 'preferences', label: 'Preferences', emoji: '⚙️', app: 'settings' },
]

const LIVE_SITE = ownerProfile.projects.find((project) => project.kind === 'live')?.url ?? ''
const INSTAGRAM = ownerProfile.conversion.secondaryUrl ?? ''
const INSTAGRAM_HANDLE = ownerProfile.socials.find((social) => social.name === 'Instagram')?.handle ?? 'Instagram'
const DEMOS = ownerProfile.projects.flatMap((project) => project.kind === 'concept' && project.image
  ? [{ name: project.name, category: project.category, image: project.image, href: project.url }]
  : [])

const STORAGE_KEY = 'forma-personal-os-notes-v1'
const THEME_KEY = 'forma-personal-os-theme-v1'
const TEXT_SIZE_KEY = 'forma-personal-os-text-size-v1'

export function PersonalOS() {
  const [active, setActive] = useState<AppId | null>(null)
  const [theme, setTheme] = useState<Theme>(ownerProfile.themes.default as Theme)
  const [textSize, setTextSize] = useState<TextSize>('standard')
  const [clock, setClock] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [mood, setMood] = useState<'happy' | 'sad' | 'celebrating'>('happy')
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const workspaceRef = useRef<HTMLElement>(null)
  const windowRef = useRef<HTMLElement>(null)

  useEffect(() => {
    try {
      const storedTheme = sessionStorage.getItem(THEME_KEY) as Theme | null
      if (storedTheme === 'day' || storedTheme === 'night' || storedTheme === 'dark') setTheme(storedTheme)
      const storedTextSize = sessionStorage.getItem(TEXT_SIZE_KEY) as TextSize | null
      if (storedTextSize === 'standard' || storedTextSize === 'large') setTextSize(storedTextSize)
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const value = JSON.parse(raw) as Note[]
        if (Array.isArray(value)) setNotes(value)
      }
    } catch { /* Ignore malformed session notes and keep an empty board. */ }
    const tick = () => setClock(new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    tick()
    const timer = window.setInterval(tick, 30_000)
    let progress = 0
    const bootTimer = window.setInterval(() => {
      progress = Math.min(100, progress + 5)
      setBootProgress(progress)
      if (progress >= 100) {
        window.clearInterval(bootTimer)
        window.setTimeout(() => setBooting(false), 180)
      }
    }, 80)
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setActive(null) }
    }
    window.addEventListener('keydown', shortcut)
    return () => { window.clearInterval(timer); window.clearInterval(bootTimer); window.removeEventListener('keydown', shortcut) }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.formaTheme = theme
    try { sessionStorage.setItem(THEME_KEY, theme) } catch { /* Keep the selected theme for this render. */ }
  }, [theme])

  useEffect(() => {
    try { sessionStorage.setItem(TEXT_SIZE_KEY, textSize) } catch { /* Keep the selected size for this render. */ }
  }, [textSize])

  useEffect(() => {
    if (active) windowRef.current?.focus()
  }, [active])

  const openApp = useCallback((id: AppId) => { setActive(id); setSearchOpen(false); setQuery('') }, [])
  const filteredApps = useMemo(() => APPS.filter((app) => `${app.name} ${app.subtitle}`.toLowerCase().includes(query.toLowerCase())), [query])

  function saveNotes(next: Note[]) { setNotes(next); try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* Keep the board usable if storage is unavailable. */ } }
  function addNote() { saveNotes([...notes, { id: Date.now(), text: '' }]) }
  function changeNote(id: number, text: string) { saveNotes(notes.map((note) => note.id === id ? { ...note, text } : note)) }
  function moveNote(id: number, x: number, y: number) { saveNotes(notes.map((note) => note.id === id ? { ...note, x, y } : note)) }
  function deleteNote(id: number) { saveNotes(notes.filter((note) => note.id !== id)) }

  const currentApp = APPS.find((app) => app.id === active)

  return (
    <main ref={workspaceRef} data-text-size={textSize} className={`personal-os theme-${theme} relative isolate flex min-h-svh flex-col overflow-hidden`}>
      <PixelLandscape theme={theme} />
      <header className="os-menubar relative z-30 flex h-14 shrink-0 items-center justify-between px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button className="os-brand" onClick={() => setActive(null)} aria-label="Return to Marco’s portfolio desktop"><span className="os-brand-mark">M</span><span>MARCO</span></button>
          <span className="os-menubar-separator hidden h-5 w-px sm:block" />
          <span className="os-menubar-subtitle hidden text-xs sm:inline">OS v1.0 · PORTFOLIO EDITION</span>
          <div className="hidden items-center gap-1 md:flex">
            <button className="os-menulink" onClick={() => openApp('work')}>Work</button>
            <button className="os-menulink" onClick={() => openApp('work')}>Proof</button>
            <button className="os-menulink" onClick={() => openApp('about')}>Journey</button>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button className="os-top-action hidden sm:inline-flex" onClick={() => setActive(null)}>Show Desktop</button>
          <button className="os-top-action hidden sm:inline-flex" onClick={() => setWelcomeOpen(true)}>Daily Transmission</button>
          <button onClick={() => setSearchOpen(true)} className="os-search-trigger" aria-label="Search apps"><Search size={15}/><span className="hidden sm:inline">Search</span><kbd className="hidden lg:inline">⌘ K</kbd></button>
          <button className="os-clock" onClick={() => openApp('settings')} aria-label="Open settings">{clock || '—:—'}</button>
          <button className="os-status" onClick={() => setTheme(theme === 'day' ? 'night' : theme === 'night' ? 'dark' : 'day')} aria-label={`Theme: ${theme}; change theme`}>
            {theme === 'day' ? <Sun size={16}/> : theme === 'night' ? <Moon size={16}/> : <Monitor size={16}/>}
          </button>
        </div>
      </header>

      <section className="os-workspace relative z-10 flex flex-1 flex-col" aria-label="Marco’s portfolio desktop">
        <div className="os-desktop-icons" aria-label="Desktop applications">
          {DESKTOP_SHORTCUTS.map((shortcut) => <DesktopIcon key={shortcut.id} label={shortcut.label} emoji={shortcut.emoji} onClick={() => openApp(shortcut.app)} />)}
          <a className="os-desktop-icon os-live-link" href={LIVE_SITE} target="_blank" rel="noreferrer"><span className="os-icon-tile tone-slate">🌐</span><span>Forma Website</span></a>
        </div>

        {welcomeOpen && <aside className="os-pixel-note">
          <button className="os-pixel-note-close" aria-label="Dismiss daily note" onClick={() => setWelcomeOpen(false)}>×</button>
          <p>MARCO OS / DAILY TRANSMISSION</p>
          <h1>We Build n We Conquer.</h1>
          <span>Web development · editing · entrepreneurship</span>
          <button onClick={() => openApp('notes')}>Open whiteboard <ArrowUpRight size={13}/></button>
        </aside>}

        <div className="os-desktop-hint"><span>OPEN AN APP TO EXPLORE</span><span className="os-hint-line"/><span>MARCO OS / DESKTOP</span></div>

        <div className="os-dock-wrap"><nav className="os-dock" aria-label="Application dock">
          {APPS.filter((app) => ['work','about','services','notes','browser','contact'].includes(app.id)).map((app) => <button key={app.id} className={`os-dock-icon ${active === app.id ? 'is-active' : ''}`} onClick={() => openApp(app.id)} aria-label={`Open ${app.name}`} title={app.name}><span className={`os-icon-tile tone-${app.tone}`}><app.icon size={21}/></span><i/></button>)}
          <span className="os-dock-separator"/>
          <button className="os-dock-icon" onClick={() => openApp('settings')} aria-label="Open preferences" title="Preferences"><span className="os-icon-tile tone-slate"><Settings2 size={21}/></span><i/></button>
        </nav></div>

        <AnimatePresence>
          {currentApp && <motion.section ref={windowRef} tabIndex={-1} key={active} initial={{opacity:0,y:16,scale:.985}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.99}} transition={{duration:.2}} className="os-window" role="dialog" aria-modal="true" aria-labelledby="window-title" onKeyDown={(event) => {
            if (event.key !== 'Tab') return
            const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])'))
            if (focusable.length === 0) { event.preventDefault(); event.currentTarget.focus(); return }
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
          }}>
            <header className="os-window-titlebar">
              <div className="os-window-controls"><button aria-label="Close window" onClick={() => setActive(null)}><X size={12}/></button><button aria-label="Minimize window" onClick={() => setActive(null)}><Minus size={12}/></button><button aria-label="Open preferences" onClick={() => openApp('settings')}><MoreHorizontal size={12}/></button></div>
              <h2 id="window-title">{currentApp.name}</h2>
              <span className="os-window-title-end">MARCO DESKTOP <span>·</span> {currentApp.subtitle}</span>
            </header>
            <div className="os-window-content">
              {active === 'work' && <WorkApp/>}
              {active === 'about' && <AboutApp/>}
              {active === 'services' && <ServicesApp/>}
              {active === 'notes' && <NotesApp notes={notes} onAdd={addNote} onChange={changeNote} onDelete={deleteNote} onMove={moveNote} constraintsRef={workspaceRef}/>}
              {active === 'browser' && <BrowserApp/>}
              {active === 'contact' && <ContactApp/>}
              {active === 'settings' && <SettingsApp theme={theme} setTheme={setTheme} textSize={textSize} setTextSize={setTextSize} onReset={() => { saveNotes([]); setTheme('night'); setTextSize('standard') }}/>}
            </div>
          </motion.section>}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {searchOpen && <motion.div className="os-search-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(event) => {if(event.target===event.currentTarget)setSearchOpen(false)}}>
          <motion.div className="os-search-panel" initial={{opacity:0,y:-10,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:.98}}>
            <label className="os-search-input"><Search size={18}/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apps and tools…" onKeyDown={(event) => {if(event.key==='Enter'&&filteredApps[0])openApp(filteredApps[0].id)}}/><kbd>ESC</kbd></label>
            <div className="os-search-results">{filteredApps.map((app) => <button key={app.id} onClick={() => openApp(app.id)}><span className={`os-icon-tile tone-${app.tone}`}><app.icon size={18}/></span><span><b>{app.name}</b><small>{app.subtitle}</small></span><ArrowUpRight size={15}/></button>)}{filteredApps.length===0&&<p>No apps found.</p>}</div>
            <div className="os-search-foot">MARCO QUICK FIND <span>Navigate your desktop</span></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <motion.div drag dragMomentum={false} dragConstraints={workspaceRef} dragElastic={0} className="os-buddy-drag" whileDrag={{scale:1.08}}>
        <button className="os-buddy-button" onClick={() => setMood(mood === 'happy' ? 'celebrating' : mood === 'celebrating' ? 'sad' : 'happy')} aria-label="Marco’s pixel doodle; drag to move or tap to change expression"><FormaBuddy mood={mood}/></button>
      </motion.div>
      <AnimatePresence>
        {booting && <motion.div className="os-boot-screen" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}>
          <button className="os-boot-skip" onClick={() => setBooting(false)}>SKIP BOOT ↗</button>
          <div className="os-boot-card">
            <span className="os-boot-mark">M</span>
            <p>MARCO OS v1.0 · PORTFOLIO EDITION</p>
            <h1>Waking up the desktop<span className="os-boot-dots">...</span></h1>
            <div className="os-boot-progress"><i style={{width:`${bootProgress}%`}} /></div>
            <span className="os-boot-percent">STARTING PORTFOLIO · {bootProgress}%</span>
          </div>
        </motion.div>}
      </AnimatePresence>
    </main>
  )
}

function DesktopIcon({label,emoji,onClick}:{label:string;emoji:string;onClick:()=>void}) {
  return <button className="os-desktop-icon" onClick={onClick}><span className="os-icon-tile" aria-hidden="true">{emoji}</span><span>{label}</span></button>
}

function PixelLandscape({ theme }: { theme: Theme }) {
  return (
    <div className={`os-pixel-landscape theme-${theme}`} aria-hidden="true">
      <svg className="os-pixel-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
        <defs>
          <linearGradient id="pixel-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f8d5a1"/><stop offset=".48" stopColor="#f19a83"/><stop offset="1" stopColor="#c76372"/></linearGradient>
          <linearGradient id="pixel-sun" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#fff2b6"/><stop offset="1" stopColor="#ffd077"/></linearGradient>
          <pattern id="pixel-grain" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="2" height="2" fill="#fff3d4" opacity=".25"/><rect x="8" y="7" width="2" height="2" fill="#9d5267" opacity=".16"/></pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#pixel-sky)"/>
        <rect width="1440" height="740" fill="url(#pixel-grain)"/>
        <g className="pixel-stars" fill="#fff6d9">
          <path d="M1110 105h7v18h-7zm-6 6h19v7h-19zM960 210h5v14h-5zm-5 5h15v5h-15zM1290 282h6v16h-6zm-5 5h16v6h-16zM680 95h5v14h-5zm-5 5h15v5h-15zM470 290h5v13h-5zm-4 4h13v5h-13zM1370 180h5v14h-5zm-5 5h15v5h-15z"/>
          <path d="M1040 345h4v10h-4zm-3 3h10v4h-10zM820 155h4v10h-4zm-3 3h10v4h-10zM330 175h4v10h-4zm-3 3h10v4h-10z" opacity=".8"/>
        </g>
        <g className="pixel-sun"><path d="M590 515h20v-12h20v-12h180v12h20v12h20v20h12v120h-12v20h-20v12h-20v12H630v-12h-20v-12h-20v-20h-12V535h12z" fill="url(#pixel-sun)" opacity=".88"/></g>
        <g className="pixel-cloud cloud-drift-a" fill="#ffe3bd"><path d="M70 254h30v-18h42v-18h66v18h24v18h30v30h18v30H52v-30h18z"/><path d="M60 314h220v15H60z" fill="#efaa9a"/></g>
        <g className="pixel-cloud cloud-drift-b" fill="#ffe6c5"><path d="M410 370h26v-14h38v-24h70v14h26v24h26v24h14v24H390v-24h20z"/><path d="M398 414h220v12H398z" fill="#eea698"/></g>
        <g className="pixel-cloud cloud-drift-c" fill="#ffe7c6"><path d="M965 205h22v-13h40v-22h68v14h22v21h25v23h14v24H950v-24h15z"/><path d="M955 247h215v12H955z" fill="#efa493"/></g>
        <g className="pixel-cloud cloud-drift-d" fill="#ffddb6"><path d="M1190 420h18v-12h35v-20h54v12h23v20h20v20h12v20h-174v-20h12z"/><path d="M1178 458h185v12h-185z" fill="#e99b90"/></g>
        <g className="pixel-cloud cloud-drift-e" fill="#ffdfbd"><path d="M145 505h20v-12h38v-21h58v14h23v19h22v22h13v19H130v-19h15z"/><path d="M137 541h190v12H137z" fill="#e9998a"/></g>
        <path d="M0 720h120v-12h110v12h100v-12h115v12h100v-12h125v12h130v-12h100v12h120v-12h110v12h110v180H0z" fill="#665244"/>
        <path d="M0 750h90v-12h80v12h115v-15h95v15h130v-12h100v12h120v-15h110v15h130v-12h95v12h120v-15h100v15h65v150H0z" fill="#555239"/>
        <path d="M0 795h130v-12h115v12h105v-10h150v10h120v-14h105v14h130v-12h120v12h115v-10h130v10h120v105H0z" fill="#373f32"/>
        <path d="M0 845h100v-10h100v10h150v-12h100v12h110v-9h150v9h120v-12h110v12h135v-10h120v10h145v55H0z" fill="#293b32"/>
        <g className="pixel-meadow" fill="#f6d58b"><path d="M160 742h6v-12h6v12h6v6h-18zM500 786h6v-11h6v11h6v6h-18zM1060 752h6v-12h6v12h6v6h-18zM1290 815h5v-10h5v10h5v5h-15z"/></g>
        <g className="pixel-lilies" fill="#f4c8ae"><path d="M350 802h5v-50h5v50h13v5h-23zM342 745h10v10h-10zM359 730h10v10h-10zM373 746h10v10h-10z"/><path d="M890 800h5v-42h5v42h12v5h-22zM882 750h10v10h-10zM900 734h10v10h-10zM914 750h10v10h-10z"/></g>
      </svg>
    </div>
  )
}

function FormaBuddy({
  mood,
  onClick,
  compact = false,
}: {
  mood: 'happy' | 'sad' | 'celebrating'
  onClick?: () => void
  compact?: boolean
}) {
  const art = (
    <svg viewBox="0 0 96 184" aria-hidden="true" focusable="false" className={`os-buddy-svg ${compact ? 'compact' : ''}`} shapeRendering="crispEdges">
      <ellipse cx="48" cy="174" rx="34" ry="6" fill="#583d43" opacity=".55"/>
      <g className="buddy-sparkles" fill="#fff0a9"><path d="M8 48h6v18H8zm-6 6h18v6H2zM78 26h5v15h-5zm-5 5h15v5H73z"/></g>
      <path d="M28 120h17v37H29v-7h-5v-22h4zm24 0h17v8h5v22h-5v7H52z" fill="#292a38"/>
      <path d="M28 151h18v9h5v7H22v-7h6zm24 0h18v9h5v7H47v-7h5z" fill="#422b35"/>
      <path d="M27 78h42v43H27zM20 84h8v25h-8zm48 0h8v25h-8z" fill="#a93f46"/>
      <path d="M28 82h9v8h-9zm31 0h9v8h-9z" fill="#d85a55"/>
      <path d="M19 91h10v9h23v8H29v7h-9zm57 0H66v9H43v8h23v7h10z" fill="#d5a17a"/>
      <path d="M27 34h42v39H27z" fill="#d6a17c"/>
      <path d="M22 20h10V9h37v8h10v17h-9V27H33v8h-6v8h-9V26h4z" fill="#302c31"/>
      <path d="M22 34h9v8h-9zm46-8h9v9h-9zM32 8h36v8H32z" fill="#43343a"/>
      <path d="M36 43h6v6h-6zm19 0h6v6h-6z" fill="#312932"/>
      <path d={mood === 'sad' ? 'M41 61h6v-4h7v4h6' : 'M41 56h6v5h7v-5h6'} fill="none" stroke="#6b343c" strokeWidth="3"/>
      <path d="M24 31h5v9h-5zm43 0h5v9h-5z" fill="#d6a17c"/>
      {mood === 'celebrating' && <g fill="#ffe071"><path d="M10 5h5v14h-5zM5 10h15v5H5zM80 56h5v14h-5zM75 61h15v5H75z"/></g>}
    </svg>
  )

  return onClick ? (
    <button className={`os-buddy-art ${compact ? 'compact' : ''}`} onClick={onClick} aria-label={`Forma companion, ${mood}; tap to change mood`}>
      {art}
    </button>
  ) : art
}

function AppHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="os-app-heading">
      <p>{eyebrow}</p>
      <h3>{title}</h3>
      {copy && <span>{copy}</span>}
    </div>
  )
}

function WorkApp() {
  return (
    <div className="os-app-page">
      <AppHeading eyebrow="WORKSPACE / 01" title="A few things I’ve built." copy={`One live site and ${DEMOS.length} fictional visual concepts from the ${ownerProfile.identity.osName} project.`} />
      <a href={LIVE_SITE} target="_blank" rel="noreferrer" className="os-featured-project">
        <div className="os-featured-icon"><AppWindow size={26} /></div>
        <div>
          <span className="os-live-label"><i /> EXISTING FORMA SITE</span>
        <h4>Forma Studio Website</h4>
          <p>Visit the separate Forma studio website. This portfolio has its own design and project.</p>
        </div>
        <ArrowUpRight size={19} />
      </a>
      <div className="os-section-label"><span>CONCEPT LIBRARY</span><span>FICTIONAL DEMOS</span></div>
      <div className="os-project-grid">
        {DEMOS.map((demo, index) => (
          <a href={demo.href} key={demo.name} className="os-project-card">
            <div className="os-project-thumb">
              <Image src={demo.image} alt={`${demo.name} demo concept`} fill sizes="(max-width:700px) 50vw, 300px" />
              <span>CONCEPT 0{index + 1}</span>
            </div>
            <div className="os-project-meta">
              <div><b>{demo.name}</b><small>{demo.category}</small></div>
              <ArrowUpRight size={15} />
            </div>
          </a>
        ))}
      </div>
      <p className="os-disclosure"><Check size={14} /> Demo concepts are practice work; they do not represent clients or verified results.</p>
    </div>
  )
}

function AboutApp() {
  return (
    <div className="os-app-page os-about-page">
      <AppHeading eyebrow="PROFILE / MARCO" title={'Web developer & editor.'} />
      <div className="os-about-grid">
        <div className="os-about-monogram">F<span>01</span></div>
        <div>
          <p className="os-about-lead">I’m {ownerProfile.identity.fullName}, a web developer and entrepreneur at {ownerProfile.identity.osName}, working alongside my partner {ownerProfile.identity.partner}.</p>
          <p className="os-muted">My focus is building websites. I also work in editing. This profile is being shaped from the information Marco has approved so far.</p>
          <div className="os-role-pills"><span>Web development</span><span>Editing</span><span>Entrepreneurship</span></div>
        </div>
      </div>
      <div className="os-quote-card"><span>01 / PRINCIPLE</span><p>“Professionalism Starts Here”</p><small>Forma’s approved opening line</small></div>
    </div>
  )
}

function ServicesApp() {
  return (
    <div className="os-app-page">
      <AppHeading eyebrow="CAPABILITIES / 01" title="Website development." copy="The service Marco named. Project scope and deliverables are agreed case by case." />
      <div className="os-service-card">
        <span className="os-service-icon"><Code2 size={22} /></span>
        <div>
          <h4>Web development</h4>
          <p>Planning and building a website around the project’s content, audience, and needs.</p>
          <ul><li>Responsive page structure</li><li>Custom visual direction</li><li>Project-specific interactions</li></ul>
        </div>
        <span className="os-service-number">01</span>
      </div>
      <p className="os-disclosure">No pricing, delivery guarantees, or client outcomes are published here.</p>
    </div>
  )
}

function NotesApp({ notes, onAdd, onChange, onDelete, onMove, constraintsRef }: {
  notes: Note[]
  onAdd: () => void
  onChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  onMove: (id: number, x: number, y: number) => void
  constraintsRef: RefObject<HTMLElement | null>
}) {
  return (
    <div className="os-app-page">
      <div className="os-notes-top">
        <AppHeading eyebrow="WHITEBOARD / SESSION NOTES" title="Catch a thought." copy="Add, edit, drag, or remove notes. They stay in this browser session." />
        <button className="os-small-action" onClick={onAdd}><Plus size={15} /> New note</button>
      </div>
      <div className="os-notes-grid">
        {notes.map((note, index) => (
          <StickyNoteCard key={note.id} note={note} index={index} constraintsRef={constraintsRef} onChange={onChange} onDelete={onDelete} onMove={onMove} />
        ))}
        {notes.length === 0 && <button className="os-empty-note" onClick={onAdd}><Plus size={21} /><span>Add your first note</span></button>}
      </div>
    </div>
  )
}

function StickyNoteCard({ note, index, constraintsRef, onChange, onDelete, onMove }: {
  note: Note
  index: number
  constraintsRef: RefObject<HTMLElement | null>
  onChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  onMove: (id: number, x: number, y: number) => void
}) {
  const controls = useDragControls()

  return (
    <motion.article
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onDragEnd={(_event, info) => onMove(note.id, (note.x ?? 0) + info.offset.x, (note.y ?? 0) + info.offset.y)}
      style={{ x: note.x ?? 0, y: note.y ?? 0 }}
      className={`os-sticky-note note-${index % 3}`}
    >
      <button onClick={() => onDelete(note.id)} aria-label="Delete note"><X size={13} /></button>
      <textarea aria-label="Edit sticky note" value={note.text} onChange={(event) => onChange(note.id, event.target.value)} placeholder="Write a note…" />
      <span onPointerDown={(event) => controls.start(event)}>STICKY {String(index + 1).padStart(2, '0')} · DRAG TO MOVE</span>
    </motion.article>
  )
}

function BrowserApp() {
  return (
    <div className="os-app-page">
        <div className="os-browser-toolbar">
        <span><ChevronDown size={14} /></span>
        <div><Globe2 size={14} /> {LIVE_SITE.replace(/^https:\/\//, '').replace(/\/$/, '')}</div>
        <a href={LIVE_SITE} target="_blank" rel="noreferrer" aria-label={`Open ${ownerProfile.identity.osName} site`}><ArrowUpRight size={15} /></a>
      </div>
      <div className="os-browser-preview">
        <div className="os-browser-mark">{ownerProfile.identity.osName.toUpperCase()}<span>WEB DEVELOPMENT</span></div>
        <p className="os-eyebrow">WEB DEVELOPMENT</p>
        <h3>Professionalism<br /><em>starts here.</em></h3>
        <p>We Build n We Conquer</p>
        <a href={LIVE_SITE} target="_blank" rel="noreferrer" className="os-primary-btn">Visit the live site <ArrowUpRight size={16} /></a>
        <span className="os-browser-disclosure">Preview card · opens the owner-provided Vercel website</span>
      </div>
    </div>
  )
}

function ContactApp() {
  return (
    <div className="os-app-page">
      <AppHeading eyebrow="CONNECTION / INSTAGRAM" title="Let’s talk about your website." copy="Instagram is the contact route supplied by Marco." />
      <a className="os-contact-card" href={INSTAGRAM} target="_blank" rel="noreferrer">
        <span className="os-contact-icon"><Camera size={24} /></span>
        <span><b>{INSTAGRAM_HANDLE}</b><small>Open {ownerProfile.identity.osName} on Instagram</small></span>
        <ArrowUpRight size={18} />
      </a>
      <div className="os-contact-note"><Mail size={16} /><p>No email or booking link has been supplied yet. This link opens Instagram; no message is sent automatically.</p></div>
    </div>
  )
}

function SettingsApp({ theme, setTheme, textSize, setTextSize, onReset }: {
  theme: Theme
  setTheme: (theme: Theme) => void
  textSize: TextSize
  setTextSize: (size: TextSize) => void
  onReset: () => void
}) {
  return (
    <div className="os-app-page">
      <AppHeading eyebrow="PREFERENCES / DISPLAY" title="Make it comfortable." copy="Your display selection lasts only for this browser session." />
      <div className="os-setting-row">
        <div><b>Appearance</b><small>Choose a desktop palette</small></div>
        <div className="os-theme-options">
          {(['day', 'night', 'dark'] as Theme[]).map((item) => (
            <button className={theme === item ? 'selected' : ''} onClick={() => setTheme(item)} key={item}>
              {item === 'day' ? <Sun size={15} /> : item === 'night' ? <Moon size={15} /> : <Monitor size={15} />}
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="os-setting-row">
        <div><b>Text size</b><small>Adjust app copy for your screen</small></div>
        <div className="os-theme-options">
          {(['standard', 'large'] as TextSize[]).map((item) => (
            <button className={textSize === item ? 'selected' : ''} onClick={() => setTextSize(item)} key={item}>
              <span>{item === 'standard' ? 'Standard' : 'Larger'}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="os-setting-row"><div><b>Motion</b><small>Follows your device reduced-motion setting</small></div><span className="os-setting-value">ACCESSIBLE</span></div>
      <div className="os-setting-row"><div><b>Privacy</b><small>Notes and preferences use session storage only</small></div><span className="os-setting-value">SESSION ONLY</span></div>
      <div className="os-setting-row"><div><b>Reset</b><small>Clear whiteboard notes and restore standard display</small></div><button className="os-small-action" onClick={onReset}>Reset workspace</button></div>
    </div>
  )
}
