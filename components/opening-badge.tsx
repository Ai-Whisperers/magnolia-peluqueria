"use client"
import { useEffect, useState } from "react"

interface HoursConfig {
  open: number   // hour (0-23)
  close: number  // hour (0-23)
  closedDays: number[]  // 0=Sun, 1=Mon, ... 6=Sat
}

const DEFAULT_CONFIG: HoursConfig = {
  open: 9,
  close: 19,
  closedDays: [0, 1], // Sunday, Monday
}

function isOpen(config: HoursConfig = DEFAULT_CONFIG): boolean {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()

  if (config.closedDays.includes(day)) return false
  return hour >= config.open && hour < config.close
}

function getNextOpen(config: HoursConfig = DEFAULT_CONFIG): string {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()

  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const checkDay = (day + i) % 7
    if (!config.closedDays.includes(checkDay)) {
      const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
      return `Abre ${dayNames[checkDay]} a las ${config.open}:00`
    }
  }
  return "Consultá por WhatsApp"
}

export function OpeningBadge() {
  const [open, setOpen] = useState<boolean | null>(null)
  const [nextOpen, setNextOpen] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const result = isOpen()
    setOpen(result)
    setNextOpen(getNextOpen())
    // Update every minute
    const interval = setInterval(() => {
      const r = isOpen()
      setOpen(r)
      setNextOpen(getNextOpen())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const colorClass = open ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
  const dotClass = open ? "bg-green-500 animate-pulse" : "bg-red-500"

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${colorClass}`}>
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      {open ? "Abierto ahora" : "Cerrado"}
      {!open && nextOpen && (
        <span className="font-normal opacity-80 ml-1">· {nextOpen}</span>
      )}
    </span>
  )
}