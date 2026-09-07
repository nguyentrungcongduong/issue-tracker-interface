'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  ExternalLink,
  FileText,
  History,
  Link2,
  MessageSquare,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  X,
} from 'lucide-react'

type Issue = {
  id: number
  title: string
  author: string
  created: string
  updated: string
  comments: number
  likes: number
  labels: [string, string][]
}

const issues: Issue[] = [
  {
    id: 5,
    title: 'Thảo luận Technical: Tối ưu hiệu năng Frontend khi xử lý dữ liệu lớn bằng Web Worker',
    author: 'Nguyễn Đình Khang',
    created: '7 months ago',
    updated: '1 month ago',
    comments: 1,
    likes: 1,
    labels: [['front-end', 'bg-emerald-600'], ['nextjs', 'bg-slate-700'], ['reactjs', 'bg-blue-500'], ['sharing', 'bg-purple-600']],
  },
  {
    id: 3,
    title: 'Thảo luận Technical: Dùng useRef thay vì useState để handle open/close Modal/Popup',
    author: 'Nguyễn Huỳnh Chí Bảo',
    created: '7 months ago',
    updated: '7 months ago',
    comments: 0,
    likes: 1,
    labels: [['front-end', 'bg-emerald-600'], ['nextjs', 'bg-slate-700'], ['reactjs', 'bg-blue-500'], ['sharing', 'bg-purple-600']],
  },
  {
    id: 1,
    title: 'Xung đột CSS reset giữa TailwindCSS và Mantine (Next.js)',
    author: 'Trần Thanh Vũ',
    created: '8 months ago',
    updated: '7 months ago',
    comments: 1,
    likes: 0,
    labels: [['css', 'bg-rose-600'], ['front-end', 'bg-emerald-600'], ['nextjs', 'bg-slate-700'], ['sharing', 'bg-purple-600']],
  },
]

function IssueLabels({ issue }: { issue: Issue }) {
  return <div className="flex flex-wrap gap-1.5">{issue.labels.map(([label, color]) => <span key={label} className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${color}`}>{label}</span>)}</div>
}

function DetailDrawer({ issue, onClose }: { issue: Issue; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`${issue.title} details`}>
      <button aria-label="Close issue details backdrop" className="absolute inset-0 bg-black/25" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-[min(72rem,calc(100vw-1rem))] flex-col bg-background shadow-2xl sm:w-[min(72rem,calc(100vw-2rem))]">
        <header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3 text-sm text-blue-700 dark:text-blue-300">
            <a href="#issue" className="font-medium underline underline-offset-2">00_general#{issue.id}</a>
            <Link2 size={18} aria-label="Copy issue link" />
            <ExternalLink size={17} aria-label="Open issue" />
          </div>
          <button onClick={onClose} aria-label="Close issue details" className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"><X size={22} /></button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid min-h-full md:grid-cols-[minmax(0,1fr)_290px]">
            <article className="min-w-0 px-5 py-6 sm:px-8 md:border-r md:border-border">
              <div className="flex items-start justify-between gap-4">
                <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{issue.title}</h1>
                <button aria-label="Issue actions" className="hidden shrink-0 rounded-md border border-input p-2 sm:block"><MoreVertical size={20} /></button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">Open</span>
                <FileText size={17} />
                <span>Issue created {issue.created} by <strong className="text-foreground">{issue.author}</strong></span>
              </div>

              <div className="mt-9 flex flex-col gap-8 text-[17px] leading-7">
                <section>
                  <h2 className="border-b border-border pb-3 text-2xl font-bold">Sharing: Sử dụng Web Worker để xử lý dữ liệu lớn phía Client (Browser)</h2>
                </section>
                <section>
                  <h2 className="border-b border-border pb-3 text-2xl font-bold">Bối cảnh</h2>
                  <p className="pt-4">Trong quá trình phát triển các hệ thống web (CRM, SFA, báo cáo, export/import dữ liệu...), có nhiều trường hợp Client phải tiếp nhận và xử lý một lượng dữ liệu rất lớn (ví dụ: ~1 triệu record).</p>
                  <p className="pt-4">Các tình huống thường gặp:</p>
                  <ul className="list-disc pl-6"><li>Parse dữ liệu lớn từ API</li><li>Tính toán, filter, sort, group dữ liệu</li><li>Chuẩn bị dữ liệu để render table / chart</li><li>Chuẩn bị dữ liệu export (CSV, Excel)</li></ul>
                  <p className="pt-4">Nếu xử lý trực tiếp trên Main Thread, trình duyệt sẽ:</p>
                  <ul className="list-disc pl-6"><li>Bị đơ (freeze) trong vài giây</li><li>UX rất tệ (scroll, click, input đều lag)</li><li>Có nguy cơ crash tab trên máy cấu hình yếu</li></ul>
                </section>
                <section>
                  <h2 className="border-b border-border pb-3 text-2xl font-bold">Nguyên nhân</h2>
                  <p className="pt-4">JavaScript mặc định chạy trên một luồng duy nhất. Khi thực hiện các tác vụ nặng, Main Thread bị block và không thể tiếp tục xử lý thao tác giao diện.</p>
                </section>
              </div>

              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">Edited {issue.updated} by {issue.author}</p>
                <div className="mt-4 flex flex-wrap gap-2"><button className="rounded-md border border-input px-4 py-2">Thumbs up {issue.likes}</button><button className="rounded-md border border-input px-4 py-2">Thumbs down 0</button><button className="rounded-md border border-input px-4 py-2">Heart 1</button></div>
                <h2 className="mt-10 text-2xl font-bold">Activity</h2>
                <div className="mt-5 border-l-2 border-border pl-5 text-sm text-muted-foreground"><p><strong className="text-foreground">{issue.author}</strong> changed the description 7 months ago</p><div className="mt-5 rounded-lg border border-border p-4"><p><strong className="text-foreground">Nguyễn Ngọc Diễm Ngân</strong> <span className="ml-2">1 month ago</span></p><p className="mt-3 text-foreground">Mình đồng ý, cách này giúp giao diện không bị block khi xử lý nhiều dữ liệu.</p><input aria-label="Reply" placeholder="Reply..." className="mt-4 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" /></div></div>
              </div>
            </article>

            <aside className="border-t border-border px-5 py-6 sm:px-8 md:border-t-0">
              <div className="flex flex-col gap-6 text-sm"><Info label="Assignee" value="None" /><div><p className="font-semibold">Labels</p><div className="mt-2"><IssueLabels issue={issue} /></div></div><Info label="Dates" value="Start:  None\nDue:  None" /><Info label="Milestone" value="None" /><Info label="Parent" value="None" /><Info label="Time tracking" value="No estimate or time spent" /><Info label="Contacts" value="None" /><Info label="3 Participants" value="" /></div>
            </aside>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border pb-5"><p className="font-semibold">{label}</p><p className="mt-1 whitespace-pre-line text-muted-foreground">{value}</p></div>
}

export default function Page() {
  const [tab, setTab] = useState('Open')
  const [query, setQuery] = useState('')
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const visibleIssues = useMemo(() => issues.filter((issue) => issue.title.toLowerCase().includes(query.toLowerCase())), [query])

  return <main className="min-h-screen bg-background text-foreground"><div className="border-b border-border px-7 py-5 text-sm text-muted-foreground"><span>TRAINING AND LEARNING</span><span className="mx-3 text-border">/</span><span>00_GENERAL</span><span className="mx-3 text-border">/</span><strong className="font-medium text-foreground">Issues</strong></div><section className="mx-7 border-x border-border"><header className="flex h-16 items-center justify-between border-b border-border px-4"><nav className="flex h-full gap-8" aria-label="Issue status">{[['Open', 3], ['Closed', 0], ['All', 3]].map(([name, count]) => <button key={name} onClick={() => setTab(String(name))} className={`relative flex items-center gap-2 px-1 text-base transition-colors ${tab === name ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>{name}<span className="rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">{count}</span>{tab === name && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />}</button>)}</nav><div className="flex items-center gap-5"><button className="rounded-md bg-blue-600 px-5 py-2 text-base font-medium text-white transition hover:bg-blue-700">New issue</button><button aria-label="More options" className="text-foreground"><MoreVertical size={22} /></button></div></header><div className="flex items-center gap-2 border-b border-border bg-muted/30 px-5 py-5"><div className="flex h-10 min-w-0 flex-1 items-center rounded-md border border-input bg-background"><button aria-label="Search history" className="flex h-full items-center gap-2 border-r border-input px-3"><History size={20} /><ChevronDown size={15} /></button><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or filter results..." className="min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground" /><button aria-label="Search" className="border-l border-input px-3"><Search size={21} /></button></div><button className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-4 text-base">Created date <ChevronDown size={16} /></button><button aria-label="Filter" className="flex h-10 items-center rounded-md border border-input bg-background px-3"><SlidersHorizontal size={19} /></button></div><div>{visibleIssues.map((issue) => <article key={issue.id} onClick={() => setSelectedIssue(issue)} className="flex min-h-[104px] cursor-pointer items-start justify-between border-b border-border px-5 py-4 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/20"><div className="min-w-0 pr-5"><h2 className="flex items-center gap-2 text-[17px] font-semibold leading-6 text-foreground"><FileText size={20} strokeWidth={1.8} />{issue.title}</h2><p className="mt-1 text-sm text-muted-foreground">#{issue.id} · created {issue.created} by {issue.author}</p><div className="mt-1.5"><IssueLabels issue={issue} /></div></div><div className="flex shrink-0 flex-col items-end gap-3 text-sm text-muted-foreground"><div className="flex items-center gap-4 text-foreground">{issue.comments > 0 && <span className="flex items-center gap-1"><MessageSquare size={20} />{issue.comments}</span>}{issue.likes > 0 && <span className="flex items-center gap-1"><ThumbsUp size={19} />{issue.likes}</span>}</div><span>updated {issue.updated}</span></div></article>)}</div><div className="flex justify-end px-5 py-9"><button className="flex items-center gap-2 rounded-md border border-input px-4 py-2 text-base">Show 20 items <ChevronDown size={16} /></button></div></section>{selectedIssue && <DetailDrawer issue={selectedIssue} onClose={() => setSelectedIssue(null)} />}</main>
}
