import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../sanity/lib/image'
import type { Locale } from '../../i18n/routing'
import s from './CoursesGallery.module.css'

type SanityImage = {
  asset?: { _ref?: string }
}

export type CourseCard = {
  slug: string
  type?: string
  title?: string
  description?: string
  place?: string
  country?: string
  duration?: number
  image?: SanityImage | null
}

type Props = {
  locale: Locale
  courses: CourseCard[]
  heading: string
  subheading?: string
  emptyText: string
  durationLabel: (days: number) => string
}

export function CoursesGallery({
  locale,
  courses,
  heading,
  subheading,
  emptyText,
  durationLabel,
}: Props) {
  return (
    <section className={s.section}>
      <h1 className={s.heading}>{heading}</h1>
      {subheading && <p className={s.subheading}>{subheading}</p>}

      {courses.length === 0 ? (
        <p className={s.empty}>{emptyText}</p>
      ) : (
        <div className={s.grid}>
          {courses.map((course) => {
            const imageUrl = course.image?.asset?._ref
              ? urlFor(course.image).width(800).height(600).fit('crop').url()
              : null
            const location = [course.place, course.country].filter(Boolean).join(', ')

            return (
              <Link
                key={course.slug}
                href={`/${locale}/courses/${course.slug}`}
                className={s.card}
              >
                <div className={s.imageWrap}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={course.title ?? ''}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className={s.image}
                    />
                  )}
                </div>
                <div className={s.body}>
                  {course.type && <span className={s.type}>{course.type}</span>}
                  {course.title && <h2 className={s.title}>{course.title}</h2>}
                  <div className={s.meta}>
                    {location && <span>{location}</span>}
                    {typeof course.duration === 'number' && (
                      <span className={location ? s.metaDot : undefined}>
                        {durationLabel(course.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
