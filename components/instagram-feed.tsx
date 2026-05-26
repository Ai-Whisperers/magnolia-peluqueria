const posts = [
  { id: 1, img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80", likes: 247 },
  { id: 2, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80", likes: 189 },
  { id: 3, img: "https://images.unsplash.com/photo-1605491668644-b82e54f9f2af?w=400&q=80", likes: 156 },
  { id: 4, img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80", likes: 312 },
  { id: 5, img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&q=80", likes: 198 },
  { id: 6, img: "https://images.unsplash.com/photo-1595476108010-b4d1ef1b45e9?w=400&q=80", likes: 275 },
]

const IgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export function InstagramFeed() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary to-primary-light">
      <div className="container-page">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6">
            <IgIcon />
            <span className="text-white font-semibold text-sm">@magnolia_peluqueria</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Vida en Magnolia
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            Seguinos para ver trabajos diarios, tips de cuidado capilar y ofertas exclusivas.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((post) => (
            <a key={post.id} href="https://instagram.com/magnolia_peluqueria" target="_blank" rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-white/5">
              <img
                src={post.img}
                alt={`Instagram post`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-sm">&#x2764; {post.likes}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://instagram.com/magnolia_peluqueria" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-lg">
            <IgIcon />
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
