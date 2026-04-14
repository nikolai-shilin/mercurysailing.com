import { defineArrayMember, defineField, defineType } from 'sanity'
import { header } from './header'
import { SUPPORTED_LANGUAGES } from './languages'

export const price = defineType({
  name: 'price',
  title: 'Price',
  type: 'document',
  fields: [

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: header.fields,
    }),

    defineField({
      name: 'total', title: 'Total Price', type: 'object', fields: [
        defineField({ name: 'single_guest', title: 'Single Guest', type: 'number' }),
        defineField({ name: 'full_cabin', title: 'Full Cabin', type: 'number' }),
        defineField({ name: 'early_bird', title: 'Early Bird', type: 'number' }),
      ]
    }),

    defineField({ name: 'currency', title: 'Currency', type: 'string', options: { list: ['RUB', 'USD', 'EUR'] } }),

    defineField({
      name: 'included',
      title: 'Included Items',
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
            defineField({ name: 'price', title: 'Price', type: 'number' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'excluded',
      title: 'Excluded Items',
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
            defineField({ name: 'price', title: 'Price', type: 'number' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'header.section.ru' },
  },
})
