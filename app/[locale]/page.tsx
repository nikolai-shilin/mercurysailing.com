import { getTranslations } from 'next-intl/server'
import { sanityFetch } from '../../sanity/lib/live'
import { CoursesGallery, type CourseCard } from '../../components/CoursesGallery'
import { routing, type Locale } from '../../i18n/routing'
import Image from 'next/image'

const COURSES_QUERY = `*[_type == "course" && defined(slug.current)] | order(_createdAt desc){
  "slug": slug.current,
  type,
  "title": header.title[$locale],
  "description": header.description[$locale],
  "place": place[$locale],
  "country": country[$locale],
  duration,
  "image": header.image
}`

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = (routing.locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : routing.defaultLocale

  // const [t, { data: courses }] = await Promise.all([
  //   getTranslations({ locale, namespace: 'home' }),
  //   sanityFetch({
  //     query: COURSES_QUERY,
  //     params: { locale },
  //   }) as Promise<{ data: CourseCard[] }>,
  // ])

  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src="/images/season-plans-2026.png"
        alt="Планы на сезон 2026"
        width={800}
        max-width={800}
        height={400}
        aspect-ratio={2}
        loading='eager'
      />
    </div>
  )
}
