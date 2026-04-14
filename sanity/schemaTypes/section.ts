import { defineField, defineType } from 'sanity'
import { header } from './header'
import { SUPPORTED_LANGUAGES } from './languages'

export const section = defineType({
  name: 'section',
  title: 'Section',
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
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'White', value: 'white' },
          { title: 'Black', value: 'black' },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Half Width Image', value: 'half-width-image' },
          { title: 'Full Width Image', value: 'full-width-image' },
        ],
      },
      initialValue: 'half-width-image',
    }),

    defineField({ name: 'header', title: 'Header', type: 'object', fields: header.fields }),

    defineField({
      name: 'text', title: 'Text', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
        defineField({
          name: language.id,
          title: `Text (${ language.title })`,
          type: 'text',
          validation: rule => rule.required(),
        })
      )
    }),

    defineField({
      name: 'action',
      title: 'Action',
      type: 'object',
      fields: [
        defineField({
          name: 'label', title: 'Label', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
            defineField({
              name: language.id,
              title: `Label (${ language.title })`,
              type: 'string',
              validation: rule => rule.required(),
            })
          )
        }),
        defineField({ name: 'to', title: 'Link', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'slug.current' },
  },
})
