import Image from 'next/image'
import s from './page.module.css'
import seasonPlans2026 from './season-plans-2026.png'

export default function Home() {
  return (
    <div className={s.container}>
      <Image
        src={seasonPlans2026}
        alt="Планы на сезон 2026"
        priority
        className={s.image}
      />
    </div>
  )
}
