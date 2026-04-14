import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'
import { SUPPORTED_LANGUAGES } from './languages'

export const faqCategory = defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.ru', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: SUPPORTED_LANGUAGES.map((language) =>
        defineField({
          name: language.id,
          title: `${language.title}`,
          type: 'string',
          validation: (rule) => rule.required(),
        })
      ),
    }),
  ],
  preview: {
    select: { title: 'title.ru', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title ?? subtitle, subtitle: subtitle ? `/${subtitle}` : '' }
    },
  },
})
