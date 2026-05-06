import Image from 'next/image'
import s from './page.module.css'

export default function Home() {
  return (
    <div className={s.container}>
      <Image
        src="/images/season-plans-2026.png"
        alt="Планы на сезон 2026"
        width={800}
        height={400}
        priority
        className={s.image}
      />
    </div>
  )
}
