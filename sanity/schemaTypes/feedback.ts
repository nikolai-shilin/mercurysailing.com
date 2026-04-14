import { defineArrayMember, defineField, defineType } from 'sanity'
import { SUPPORTED_LANGUAGES } from './languages'
import { header } from './header'

export const feedback = defineType({
  name: 'feedback',
  title: 'Feedback',
  type: 'document',
  fields: [

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: header.fields,
    }),

    defineField({
      name: 'items',
      title: 'Feedback Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name', title: 'Name', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Name (${ language.title })`,
                  type: 'string',
                  validation: rule => rule.required(),
                })
              )
            }),
            defineField({
              name: 'role', title: 'Role', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Role (${ language.title })`,
                  type: 'string',
                  validation: rule => rule.required(),
                })
              )
            }),
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
            defineField({ name: 'photo', title: 'Photo', type: 'image' }),
          ],
          preview: {
            select: { title: 'name.ru', subtitle: 'role.ru' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'header.section.ru' },
  },
})
