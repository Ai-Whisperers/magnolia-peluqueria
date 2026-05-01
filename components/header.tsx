"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [open, setOpen] = useState(false);
  const items = ["Inicio", "Servicios", "Galer\u00eda", "Equipo", "Contacto"];
  const slugs: Record<string,string> = {"Inicio":"/","Servicios":"/servicios","Galería":"/galeria","Equipo":"/equipo","Contacto":"/contacto"};
  const w = "https://wa.me/59521558289?text=Hola!%20Quiero%20agendar%20una%20cita%20en%20Magnolia%20Peluquer%C3%ADa";
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="font-heading text-xl font-bold text-primary">Magnolia Peluquería</Link>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((i: string) => (
            <Link key={i} href={slugs[i]||"/"+i.toLowerCase()} className="px-3 py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors rounded-md hover:bg-gray-50">{i}</Link>
          ))}
        </nav>
        <a href={w} target="_blank" rel="noopener noreferrer"
           className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-secondary/90 transition-all">Reservar</a>
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
          {items.map((i: string) => (
            <Link key={i} href={slugs[i]||"/"+i.toLowerCase()} onClick={()=>setOpen(false)} className="block px-3 py-2 text-sm font-medium text-foreground hover:text-secondary">{i}</Link>
          ))}
          <a href={w} target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-md">Reservar</a>
        </div>
      )}
    </header>
  );
}
