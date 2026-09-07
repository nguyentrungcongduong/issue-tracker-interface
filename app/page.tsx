'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  FileText,
  Filter,
  History,
  MessageSquare,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ThumbsUp,
} from 'lucide-react'

const issues = [
  {
    id: 5,
    title: 'Thảo luận Technical: Tối ưu hiệu năng Frontend khi xử lý dữ liệu lớn bằng Web Worker',
    author: 'Nguyễn Đình Khang',
    created: '7 months ago',
    updated: '1 month ago',
    comments: 1,
    likes: 1,
    labels: [
      ['front-end', 'bg-emerald-600'],
      ['nextjs', 'bg-slate-700'],
      ['reactjs', 'bg-blue-500'],
      ['sharing', 'bg-purple-600'],
    ],
  },
  {
    id: 3,
    title: 'Thảo luận Technical: Dùng useRef thay vì useState để handle open/close Modal/Popup',
    author: 'Nguyễn Huỳnh Chí Bảo',
    created: '7 months ago',
    updated: '7 months ago',
    comments: 0,
    likes: 1,
    labels: [
      ['front-end', 'bg-emerald-600'],
      ['nextjs', 'bg-slate-700'],
      ['reactjs', 'bg-blue-500'],
      ['sharing', 'bg-purple-600'],
    ],
  },
  {
    id: 1,
    title: 'Xung đột CSS reset giữa TailwindCSS và Mantine (Next.js)',
    author: 'Trần Thanh Vũ',
    created: '8 months ago',
    updated: '7 months ago',
    comments: 1,
    likes: 0,
    labels: [
      ['css', 'bg-rose-600'],
      ['front-end', 'bg-emerald-600'],
      ['nextjs', 'bg-slate-700'],
      ['sharing', 'bg-purple-600'],
    ],
  },
]

export default function Page() {
  const [tab, setTab] = useState('Open')
  const [query, setQuery] = useState('')

  const visibleIssues = useMemo(
    () => issues.filter((issue) => issue.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-7 py-5 text-sm text-muted-foreground">
        <span>TRAINING AND LEARNING</span>
        <span className="mx-3 text-border">/</span>
        <span>00_GENERAL</span>
        <span className="mx-3 text-border">/</span>
        <strong className="font-medium text-foreground">Issues</strong>
      </div>

      <section className="mx-7 border-x border-border">
        <header className="flex h-16 items-center justify-between border-b border-border px-4">
          <nav className="flex h-full gap-8" aria-label="Issue status">
            {[
              ['Open', 3],
              ['Closed', 0],
              ['All', 3],
            ].map(([name, count]) => (
              <button
                key={name}
                onClick={() => setTab(String(name))}
                className={`relative flex items-center gap-2 px-1 text-base transition-colors ${tab === name ? 'font-semibold text-foreground' : 'text-foreground/80'}`}
              >
                {name}
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">{count}</span>
                {tab === name && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <button className="rounded-md bg-blue-600 px-5 py-2 text-base font-medium text-white transition hover:bg-blue-700">New issue</button>
            <button aria-label="More options" className="text-foreground"><MoreVertical size={22} /></button>
          </div>
        </header>

        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-5 py-5">
          <div className="flex h-10 min-w-0 flex-1 items-center rounded-md border border-input bg-background">
            <button aria-label="Search history" className="flex h-full items-center gap-2 border-r border-input px-3"><History size={20} /><ChevronDown size={15} /></button>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or filter results..." className="min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground" />
            <button aria-label="Search" className="border-l border-input px-3"><Search size={21} /></button>
          </div>
          <button className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-4 text-base">Created date <ChevronDown size={16} /></button>
          <button aria-label="Filter" className="flex h-10 items-center rounded-md border border-input bg-background px-3"><SlidersHorizontal size={19} /></button>
        </div>

        <div>
          {visibleIssues.map((issue) => (
            <article key={issue.id} className="flex min-h-[104px] items-start justify-between border-b border-border px-5 py-4">
              <div className="min-w-0 pr-5">
                <h2 className="flex items-center gap-2 text-[17px] font-semibold leading-6 text-foreground"><FileText size={20} strokeWidth={1.8} />{issue.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">#{issue.id} · created {issue.created} by {issue.author}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {issue.labels.map(([label, color]) => <span key={label} className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${color}`}>{label}</span>)}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-4 text-foreground">
                  {issue.comments > 0 && <span className="flex items-center gap-1"><MessageSquare size={20} />{issue.comments}</span>}
                  {issue.likes > 0 && <span className="flex items-center gap-1"><ThumbsUp size={19} />{issue.likes}</span>}
                </div>
                <span>updated {issue.updated}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-end px-5 py-9">
          <button className="flex items-center gap-2 rounded-md border border-input px-4 py-2 text-base">Show 20 items <ChevronDown size={16} /></button>
        </div>
      </section>
    </main>
  )
}
