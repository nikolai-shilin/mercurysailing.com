import { defineArrayMember, defineField, defineType } from 'sanity'
import { header } from './header'
import { SUPPORTED_LANGUAGES } from './languages'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'header.title.en' },
    }),

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: header.fields,
    }),

    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title', title: 'Title', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Title (${ language.title })`,
                  type: 'string',
                  validation: rule => rule.required(),
                })
              )
            }),
            defineField({
              name: 'description', title: 'Description', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Description (${ language.title })`,
                  type: 'text',
                  validation: rule => rule.required(),
                })
              )
            }),
            defineField({ name: 'image', title: 'Image', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'slug.current' },
  },
})
