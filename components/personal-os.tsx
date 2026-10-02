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
type BuddyMood = 'happy' | 'sad' | 'celebrating' | 'thinking'

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
  const [mood, setMood] = useState<BuddyMood>('happy')
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
    }, 100)
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
        <button className="os-buddy-button" onClick={() => setMood(nextBuddyMood(mood))} aria-label={`Marco’s animated pixel doodle, ${mood}; drag to move or tap to change pose`}><FormaBuddy mood={mood}/></button>
      </motion.div>
      <AnimatePresence>
        {booting && <motion.div className="os-boot-screen" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}>
          <button className="os-boot-skip" onClick={() => setBooting(false)}>SKIP BOOT ↗</button>
          <div className="os-boot-layout">
            <div className="os-boot-identity"><div className="os-boot-avatar"><FormaBuddy mood="happy" compact/></div><div><p>MARCO OS</p><span>v1.0 · portfolio edition</span></div></div>
            <div className="os-boot-terminal" aria-live="polite">
              <p><i>›</i> loading /desktop <b>ok</b></p>
              <p><i>›</i> mounting /projects <b>ok</b></p>
              <p><i>›</i> preparing your workspace<span className="os-terminal-cursor">_</span></p>
            </div>
            <div className="os-boot-progress"><i style={{width:`${bootProgress}%`}} /></div>
            <div className="os-boot-percent"><span>OPENING THE PORTFOLIO...</span><b>{bootProgress}%</b></div>
            <div className="os-boot-welcome"><p>Welcome to Marco.</p><h1>This is my <em>portfolio desktop.</em></h1></div>
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
      <svg className="os-pixel-art" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pixel-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#e79c9e"/><stop offset=".48" stopColor="#f1aa98"/><stop offset=".78" stopColor="#ffd09a"/><stop offset="1" stopColor="#b78384"/></linearGradient>
          <radialGradient id="pixel-sun-glow"><stop stopColor="#fff1c2" stopOpacity=".82"/><stop offset=".48" stopColor="#ffd8a1" stopOpacity=".38"/><stop offset="1" stopColor="#f49a91" stopOpacity="0"/></radialGradient>
          <linearGradient id="pixel-cloud" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#fff4df"/><stop offset=".72" stopColor="#f7ddcc"/><stop offset="1" stopColor="#e9b3ad"/></linearGradient>
          <linearGradient id="pixel-far-hill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#a7737d"/><stop offset="1" stopColor="#625968"/></linearGradient>
          <linearGradient id="pixel-meadow" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#778158"/><stop offset=".48" stopColor="#4e6747"/><stop offset="1" stopColor="#283d35"/></linearGradient>
          <pattern id="pixel-grain" width="23" height="23" patternUnits="userSpaceOnUse"><circle cx="4" cy="6" r="1" fill="#fff7df" opacity=".28"/><circle cx="17" cy="15" r=".8" fill="#513e5b" opacity=".18"/></pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#pixel-sky)"/>
        <rect width="1920" height="780" fill="url(#pixel-grain)" opacity=".5"/>
        <ellipse cx="1000" cy="600" rx="720" ry="360" fill="url(#pixel-sun-glow)"/>
        <circle cx="1000" cy="555" r="116" fill="#ffe5b4" opacity=".7"/>
        <g className="pixel-stars" fill="#fff5dc"><circle cx="224" cy="135" r="3"/><circle cx="570" cy="235" r="2.5"/><circle cx="1440" cy="135" r="3"/><circle cx="1695" cy="300" r="2.5"/><circle cx="1240" cy="265" r="2"/><circle cx="820" cy="125" r="2"/><circle cx="355" cy="358" r="2"/><circle cx="1580" cy="438" r="2"/></g>
        <g className="pixel-cloud cloud-drift-a">
          <path d="M75 315c27-12 35-45 72-49 22-49 91-58 133-26 50-15 98 16 100 58 40 6 54 44 33 69-7 9-19 14-34 14H89c-36-11-42-48-14-66z" fill="#c9848e" opacity=".48" transform="translate(0 13)"/>
          <path d="M75 303c27-12 35-43 73-47 22-47 89-56 130-25 48-14 94 16 96 55 38 7 51 42 32 66-8 10-20 15-34 15H89c-35-11-41-46-14-64z" fill="url(#pixel-cloud)"/>
          <path d="M139 286c18-26 44-33 69-25m101 12c24-6 46 2 59 17" fill="none" stroke="#fff9eb" strokeWidth="7" strokeLinecap="round" opacity=".7"/>
        </g>
        <g className="pixel-cloud cloud-drift-b">
          <path d="M493 245c20-9 28-31 55-34 18-38 70-45 103-19 37-10 72 14 73 43 29 5 41 32 26 52-5 7-15 11-27 11H510c-27-8-32-36-17-53z" fill="#c8828e" opacity=".43" transform="translate(0 12)"/>
          <path d="M493 234c20-9 28-29 56-32 18-36 69-42 101-18 36-9 69 14 70 41 27 5 38 30 24 49-6 8-15 12-27 12H510c-25-8-31-34-17-52z" fill="url(#pixel-cloud)"/>
        </g>
        <g className="pixel-cloud cloud-drift-c">
          <path d="M1246 320c23-10 31-37 63-39 20-42 78-49 115-21 42-11 81 17 81 49 33 5 46 37 29 59-7 9-17 14-31 14h-278c-32-10-36-42-9-62z" fill="#c67f8a" opacity=".44" transform="translate(0 12)"/>
          <path d="M1246 309c23-10 31-35 64-37 20-40 76-46 113-20 40-11 78 16 78 47 31 5 43 35 28 56-7 10-17 15-31 15h-275c-31-10-35-41-9-61z" fill="url(#pixel-cloud)"/>
        </g>
        <g className="pixel-cloud cloud-drift-d">
          <path d="M835 425c17-7 24-27 48-29 15-32 58-37 86-16 31-8 60 12 60 37 23 4 34 26 20 43-5 7-13 10-23 10H851c-22-7-26-29-16-45z" fill="#c77f89" opacity=".42" transform="translate(0 10)"/>
          <path d="M835 416c17-7 24-25 49-27 15-30 56-35 84-15 29-8 57 12 57 35 21 4 31 25 19 40-5 7-13 11-23 11H851c-20-6-25-28-16-44z" fill="url(#pixel-cloud)"/>
        </g>
        <g className="pixel-cloud cloud-drift-e">
          <path d="M92 520c19-8 26-29 51-31 17-34 62-39 92-17 34-9 65 14 65 40 26 4 37 29 22 47-6 7-14 11-25 11H109c-25-8-29-34-17-50z" fill="#c9828c" opacity=".42" transform="translate(0 9)"/>
          <path d="M92 511c19-8 26-27 52-29 17-32 60-37 90-16 32-8 62 14 62 38 24 4 34 28 21 44-6 8-14 12-25 12H109c-23-7-28-32-17-49z" fill="url(#pixel-cloud)"/>
        </g>
        <path d="M0 758c173-47 332-60 487-18 141 38 248 33 384-17 149-55 296-49 433 2 190 71 363 25 616-26v381H0z" fill="url(#pixel-far-hill)"/>
        <path d="M0 816c194-60 369-66 531-20 172 49 296 30 453-20 181-57 359-39 505 12 167 59 300 38 431-9v301H0z" fill="#8c7958"/>
        <path d="M0 856c180-42 346-42 508 3 188 52 333 37 516-9 186-47 360-31 513 20 142 47 267 45 383 9v201H0z" fill="url(#pixel-meadow)"/>
        <path d="M0 933c183-35 362-27 540 17 176 44 327 28 494-11 193-46 385-17 541 31 119 36 222 35 345 1" fill="none" stroke="#929662" strokeWidth="5" opacity=".58"/>
        <path d="M0 1010c210-42 383-22 570 22 182 43 336 20 514-13 187-34 380-5 541 34 118 28 204 24 295 2" fill="none" stroke="#233a34" strokeWidth="8" opacity=".55"/>
        <g fill="#e7c37c" opacity=".62"><path d="M120 902h3v16h-3zm-8 7h19v3h-19zM420 982h3v14h-3zm-7 6h17v3h-17zM1438 916h3v16h-3zm-8 7h19v3h-19zM1720 1016h3v13h-3zm-6 5h15v3h-15z"/></g>
        <g className="pixel-lilies" fill="#f4d1bd" stroke="#f4d1bd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M340 1020c-7-51-5-81 5-123m0 102c17-30 35-43 55-49m-55 26c-20-25-36-34-58-37" fill="none" stroke="#748457" strokeWidth="8"/>
          <path d="M332 882c-27-22-22-46 9-54 2-28 34-32 47-5 28-1 35 26 15 44-5 28-35 34-52 14-8 9-14 9-19 1z"/>
          <circle cx="365" cy="878" r="10" fill="#f4d77f" stroke="none"/>
          <path d="M1473 1024c-7-49-5-78 5-113m0 94c17-27 33-39 51-44m-52 23c-18-22-32-30-52-33" fill="none" stroke="#748457" strokeWidth="8"/>
          <path d="M1466 894c-23-19-19-41 8-48 2-24 30-28 42-5 25-1 31 23 13 39-4 26-31 30-46 13-7 8-13 8-17 1z"/>
          <circle cx="1495" cy="891" r="9" fill="#f4d77f" stroke="none"/>
        </g>
      </svg>
    </div>
  )
}

function nextBuddyMood(mood: BuddyMood): BuddyMood {
  const cycle: Record<BuddyMood, BuddyMood> = { happy: 'celebrating', celebrating: 'thinking', thinking: 'sad', sad: 'happy' }
  return cycle[mood]
}

function FormaBuddy({
  mood,
  onClick,
  compact = false,
}: {
  mood: BuddyMood
  onClick?: () => void
  compact?: boolean
}) {
  const art = (
    <svg viewBox="0 0 96 184" aria-hidden="true" focusable="false" className={`os-buddy-svg ${compact ? 'compact' : ''}`} shapeRendering="crispEdges">
      <g className={`buddy-pose mood-${mood}`}>
        <ellipse cx="48" cy="175" rx="31" ry="5" fill="#69404b" opacity=".48"/>
        <path d="M31 119h15v35h-4v7H27v-8h4zm20 0h15v34h4v8H48v-8h3z" fill="#342b37" stroke="#292633" strokeWidth="3"/>
        <path d="M27 153h17v8h5v8H20v-7h7zm24 0h17v8h6v8H46v-8h5z" fill="#f4ead7" stroke="#292633" strokeWidth="3"/>
        <path d="M30 119h15v5H30zm21 0h15v5H51z" fill="#554050"/>
        <path d="M29 77h38l8 9v32l-8 5H28l-7-7V87z" fill="#a93648" stroke="#332837" strokeWidth="4"/>
        <path d="M31 83h13v7H31zm21 0h12v7H52zM28 96h7v17h-7zm34 7h8v14h-8z" fill="#d14e53"/>
        <path d="M46 76h9v10h-9z" fill="#d59a75"/>
        {mood === 'celebrating' ? (
          <g className="buddy-arms arms-up" stroke="#332837" strokeWidth="4" strokeLinejoin="miter">
            <path d="M28 84h-8V69h-7V54h8v10h8v12h7v8z" fill="#b8454d"/>
            <path d="M68 84h8V69h7V54h-8v10h-8v12h-7v8z" fill="#b8454d"/>
            <path d="M13 54h8v-9h9v12h-8v8h-9zM75 45h9v9h8v11h-9v-8h-8z" fill="#d6a17c"/>
          </g>
        ) : mood === 'sad' ? (
          <g className="buddy-arms arms-down" stroke="#332837" strokeWidth="4" strokeLinejoin="miter">
            <path d="M26 84h-8v12h-6v21h9v-8h7v-18h6v-7zM70 84h8v12h6v21h-9v-8h-7V91h-6v-7z" fill="#a93648"/>
            <path d="M14 114h8v8h8v8h-9v-5h-7zM74 122h8v-8h7v11h-7v5h-8z" fill="#d6a17c"/>
          </g>
        ) : mood === 'thinking' ? (
          <g className="buddy-arms arms-thinking" stroke="#332837" strokeWidth="4" strokeLinejoin="miter">
            <path d="M25 84h-7v12h-5v20h9v-8h7V92h5v-8zM69 84h7v12h5v10h-9v-7h-6v-9h-5v-6z" fill="#a93648"/>
            <path d="M13 114h9v8h8v8h-9v-5h-8zM72 96h8v-8h8v8h-7v7h-9z" fill="#d6a17c"/>
          </g>
        ) : (
          <g className="buddy-arms arms-crossed" stroke="#332837" strokeWidth="4" strokeLinejoin="miter">
            <path d="M27 84h-8v9h-5v15h8v-5h7v-9h7v-7h-9zM69 84h8v9h5v15h-8v-5h-7v-9h-7v-7h9z" fill="#a93648"/>
            <path d="M19 101h9v-7h10v7h12v7H34v7h-8v-7h-7zM77 101h-9v-7H58v7H46v7h16v7h8v-7h7z" fill="#d6a17c"/>
            <path d="M31 97h33v7H31z" fill="#f0b48a"/>
          </g>
        )}
        <path d="M29 35h39v38H29z" fill="#d6a17c" stroke="#332837" strokeWidth="4"/>
        <path d="M25 39h5v19h-5zm42-3h6v18h-6z" fill="#be805f"/>
        <path d="M24 29V17h8V9h9V5h23v5h8v9h5v16H66v-7H34v7H24z" fill="#292832" stroke="#24232d" strokeWidth="3"/>
        <path d="M31 17h9V9h22v6h8v10H31z" fill="#42313b"/>
        <path d="M31 35h10v4h-8v11h-6V37zm31-3h8v9h-8z" fill="#292832"/>
        <path d="M32 39h14v10H32zm19 0h14v10H51z" fill="#292832"/>
        <path d="M35 41h8v5h-8zm19 0h8v5h-8z" fill="#e2a65e"/>
        <path d="M45 48h7v7h-7z" fill="#b97b62"/>
        <path d={mood === 'sad' ? 'M41 64h5v-4h7v4h5' : mood === 'thinking' ? 'M43 63h9' : 'M41 58h6v5h9v-5h5'} fill="none" stroke="#713c43" strokeWidth="3"/>
        {mood === 'thinking' && <path d="M78 37h6v6h-6zm8-8h7v8h-7z" fill="#fff0b6" stroke="#332837" strokeWidth="2"/>}
        {mood === 'sad' && <path d="M69 54h4v12h-4z" fill="#83c8d4"/>}
        {mood === 'celebrating' && <g className="buddy-confetti" fill="#ffdf79"><path d="M7 24h5v15H7zm-5 5h15v5H2zM81 18h5v15h-5zm-5 5h15v5H76zM44 0h5v13h-5zm-4 4h13v5H40z"/></g>}
      </g>
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
