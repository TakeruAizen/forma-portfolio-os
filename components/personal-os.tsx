'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import {
  AppWindow, ArrowUpRight, Check, ChevronDown,
  CircleHelp, Code2, FileText, FolderOpen, Globe2, Instagram, Mail, Minus, Monitor,
  Moon, MoreHorizontal, MoveUpRight, Plus, Search, Settings2, Sun, X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Snowfall } from '@/components/snowfall'
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
  { id: 'contact', name: 'Contact', subtitle: 'Instagram', icon: Instagram, tone: 'pink' },
  { id: 'settings', name: 'Preferences', subtitle: 'Display', icon: Settings2, tone: 'slate' },
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
    const tick = () => setClock(new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()))
    tick()
    const timer = window.setInterval(tick, 30_000)
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setActive(null) }
    }
    window.addEventListener('keydown', shortcut)
    return () => { window.clearInterval(timer); window.removeEventListener('keydown', shortcut) }
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
      <div className="os-wallpaper" aria-hidden="true">
        <div className="os-aurora" />
        <div className="grid-bg radial-fade os-preserved-grid" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="os-original-ring ring-one" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} className="os-original-ring ring-two" />
        <motion.div animate={{ y: [0, -24, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="os-original-diamond" />
      </div>
      <Snowfall />
      <header className="os-menubar relative z-30 flex h-14 shrink-0 items-center justify-between px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button className="os-brand" onClick={() => setActive(null)} aria-label={`Return to ${ownerProfile.identity.osName} desktop`}><span className="os-brand-mark">F</span><span>{ownerProfile.identity.osName.toUpperCase()}</span></button>
          <span className="os-menubar-separator hidden h-5 w-px sm:block" />
          <span className="os-menubar-subtitle hidden text-xs sm:inline">{ownerProfile.identity.fullName}’s Desktop</span>
          <div className="hidden items-center gap-1 md:flex">
            <button className="os-menulink" onClick={() => openApp('work')}>Work</button>
            <button className="os-menulink" onClick={() => openApp('about')}>About</button>
            <button className="os-menulink" onClick={() => openApp('services')}>Services</button>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button onClick={() => setSearchOpen(true)} className="os-search-trigger" aria-label="Search apps"><Search size={15}/><span className="hidden sm:inline">Search</span><kbd className="hidden lg:inline">⌘ K</kbd></button>
          <button className="os-clock" onClick={() => openApp('settings')} aria-label="Open settings">{clock || '—:—'}</button>
          <button className="os-status" onClick={() => setTheme(theme === 'day' ? 'night' : theme === 'night' ? 'dark' : 'day')} aria-label={`Theme: ${theme}; change theme`}>
            {theme === 'day' ? <Sun size={16}/> : theme === 'night' ? <Moon size={16}/> : <Monitor size={16}/>}
          </button>
        </div>
      </header>

      <section className="os-workspace relative z-10 flex flex-1 flex-col" aria-label="Forma desktop">
        <div className="os-desktop-icons" aria-label="Desktop applications">
          {APPS.slice(0, 4).map((app) => <DesktopIcon key={app.id} app={app} onClick={() => openApp(app.id)} />)}
          <a className="os-desktop-icon os-live-link" href={LIVE_SITE} target="_blank" rel="noreferrer"><span className="os-icon-tile tone-slate"><Globe2 size={23}/></span><span>Live Site</span></a>
        </div>

        <div className="os-welcome-card">
          <div className="os-welcome-kicker"><span className="os-online-dot"/> PERSONAL OPERATING SYSTEM <span className="os-kicker-id">V.01</span></div>
          <div className="os-welcome-main">
            <div className="os-welcome-copy">
              <p className="os-eyebrow">{ownerProfile.identity.roles.join(' · ').toUpperCase()}</p>
              <h1>{ownerProfile.identity.headline.split(' ').slice(0, 1).join(' ')}<br/><span>{ownerProfile.identity.headline.split(' ').slice(1).join(' ')}.</span></h1>
              <p className="os-supporting">{ownerProfile.identity.intro}</p>
              <div className="os-welcome-actions">
                <button onClick={() => openApp('work')} className="os-primary-btn">Explore my work <MoveUpRight size={16}/></button>
                <button onClick={() => openApp('contact')} className="os-secondary-btn"><Instagram size={15}/> Say hello</button>
              </div>
                <button className="os-work-summary" onClick={() => openApp('work')}>
                <span>WORKSPACE</span><b>1 live site · {DEMOS.length} fictional concepts</b><ArrowUpRight size={14}/>
              </button>
            </div>
            <div className="os-profile-card">
              <FormaBuddy mood={mood} onClick={() => setMood(mood === 'happy' ? 'celebrating' : mood === 'celebrating' ? 'sad' : 'happy')} />
              <div className="os-profile-caption"><span className="os-profile-name">{ownerProfile.identity.fullName}</span><span>{ownerProfile.identity.osName} · Web development</span></div>
              <span className="os-profile-hint">TAP TO CHANGE MOOD</span>
            </div>
          </div>
          <div className="os-welcome-foot"><span>DESIGN WITH INTENTION</span><span>BUILD WITH CARE</span><span className="hidden sm:inline">SCROLL LESS · EXPLORE MORE</span></div>
        </div>

        <div className="os-desktop-hint"><span>OPEN AN APP TO EXPLORE</span><span className="os-hint-line"/><span>FORMA / DESKTOP</span></div>

        <div className="os-dock-wrap"><nav className="os-dock" aria-label="Application dock">
          {APPS.filter((app) => ['work','services','notes','browser','contact'].includes(app.id)).map((app) => <button key={app.id} className={`os-dock-icon ${active === app.id ? 'is-active' : ''}`} onClick={() => openApp(app.id)} aria-label={`Open ${app.name}`} title={app.name}><span className={`os-icon-tile tone-${app.tone}`}><app.icon size={21}/></span><i/></button>)}
          <span className="os-dock-separator"/>
          <button className="os-dock-icon" onClick={() => openApp('settings')} aria-label="Open preferences" title="Preferences"><span className="os-icon-tile tone-slate"><Settings2 size={21}/></span><i/></button>
        </nav></div>

        <AnimatePresence>
          {welcomeOpen && <motion.button initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} onClick={() => setWelcomeOpen(false)} className="os-tip" aria-label="Dismiss desktop hint"><CircleHelp size={14}/> Your workspace is ready <X size={13}/></motion.button>}
        </AnimatePresence>

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
              <span className="os-window-title-end">FORMA OS <span>·</span> {currentApp.subtitle}</span>
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
            <div className="os-search-foot">FORMA QUICK FIND <span>Navigate your desktop</span></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <motion.div drag dragMomentum={false} dragConstraints={workspaceRef} dragElastic={0} className="os-buddy-drag" whileDrag={{scale:1.08}}>
        <button className="os-buddy-button" onClick={() => setMood(mood === 'happy' ? 'celebrating' : mood === 'celebrating' ? 'sad' : 'happy')} aria-label="Forma companion, drag to move or tap to change mood"><FormaBuddy mood={mood} compact/></button>
      </motion.div>
    </main>
  )
}

function DesktopIcon({app,onClick}:{app:typeof APPS[number];onClick:()=>void}) { return <button className="os-desktop-icon" onClick={onClick}><span className={`os-icon-tile tone-${app.tone}`}><app.icon size={23}/></span><span>{app.name}</span></button> }

function FormaBuddy({
  mood,
  onClick,
  compact = false,
}: {
  mood: 'happy' | 'sad' | 'celebrating'
  onClick?: () => void
  compact?: boolean
}) {
  const face = mood === 'sad' ? 'M20 25 Q25 19 30 25' : 'M20 22 Q25 28 30 22'
  const art = (
    <svg viewBox="0 0 50 54" aria-hidden="true" focusable="false" className={compact ? 'os-buddy-svg compact' : 'os-buddy-svg'}>
      <path d="M15 6h20v4h5v7h4v22h-5v6H11v-6H6V17h4v-7h5z" fill="#b8f2d8" stroke="#123c43" strokeWidth="2" shapeRendering="crispEdges" />
      <path d="M18 16h4v4h-4zm10 0h4v4h-4z" fill="#153e47" shapeRendering="crispEdges" />
      <path d={face} fill="none" stroke="#153e47" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M5 29H1v8h4m40-8h4v8h-4" fill="#f3bc87" stroke="#123c43" strokeWidth="2" shapeRendering="crispEdges" />
      <path d="M14 44v6h7v-6m8 0v6h7v-6" fill="#ffb78c" stroke="#123c43" strokeWidth="2" shapeRendering="crispEdges" />
      {mood === 'celebrating' && <path d="M4 7l2 3 3-2m32 1 2 3 3-2" fill="none" stroke="#ffd27d" strokeWidth="2" />}
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
          <span className="os-live-label"><i /> LIVE WEBSITE</span>
        <h4>{ownerProfile.identity.osName} Website</h4>
          <p>Open the current portfolio site on Vercel.</p>
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
        <span className="os-contact-icon"><Instagram size={24} /></span>
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
