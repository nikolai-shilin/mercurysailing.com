import { getTranslations } from 'next-intl/server'
import { sanityFetch } from '../../sanity/lib/live'
import { CoursesGallery, type CourseCard } from '../../components/CoursesGallery'
import { routing, type Locale } from '../../i18n/routing'

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

  const [t, { data: courses }] = await Promise.all([
    getTranslations({ locale, namespace: 'home' }),
    sanityFetch({
      query: COURSES_QUERY,
      params: { locale },
    }) as Promise<{ data: CourseCard[] }>,
  ])

  return (
    <CoursesGallery
      locale={locale}
      courses={courses ?? []}
      heading={t('heading')}
      subheading={t('subheading')}
      emptyText={t('empty')}
      durationLabel={(days) => t('duration', { days })}
    />
  )
}
