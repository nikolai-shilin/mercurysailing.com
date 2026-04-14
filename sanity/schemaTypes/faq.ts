import { defineArrayMember, defineField, defineType } from 'sanity'
import { SUPPORTED_LANGUAGES } from './languages'
import { header } from './header'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: header.fields,
    }),

    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'faqCategory' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'question', title: 'Question', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Question (${ language.title })`,
                  type: 'string',
                  validation: rule => rule.required(),
                })
              )
            }),
            defineField({
              name: 'answer', title: 'Answer', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
                defineField({
                  name: language.id,
                  title: `Answer (${ language.title })`,
                  type: 'text',
                  validation: rule => rule.required(),
                })
              )
            }),
          ],
          preview: {
            select: { title: 'question.ru', subtitle: 'answer.ru' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'header.section.ru' },
  },
})
