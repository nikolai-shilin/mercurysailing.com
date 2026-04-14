import { defineField, defineType } from 'sanity'
import { header } from './header'
import { SUPPORTED_LANGUAGES } from './languages'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'header', title: 'Header', type: 'object', fields: header.fields,
    }),

    defineField({
      name: 'keywords', title: 'Keywords', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
        defineField({
          name: language.id,
          title: `Keywords (${ language.title })`,
          type: 'string',
          validation: rule => rule.required(),
        })
      )
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'slug.current' },
  },
})
