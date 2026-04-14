import { defineField, defineType } from 'sanity'
import { SUPPORTED_LANGUAGES } from './languages'
import { header } from './header'


export const cruise = defineType({
  name: 'cruise',
  title: 'Cruise',
  type: 'document',
  fields: [

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),

    defineField({
      name: 'type',
      title: 'Type of cruise',
      type: 'string',
      options: {
        list: [
          { title: 'Workation', value: 'workation' },
          { title: 'Vacation', value: 'vacation' },
          { title: 'Family Vacation', value: 'family-vacation' },
          { title: 'Regatta', value: 'regatta' },
        ],
      },
      initialValue: 'workation',
    }),

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: header.fields,
    }),

    defineField({
      name: 'place',
      title: 'Place',
      type: 'object',
      fields: SUPPORTED_LANGUAGES.map(language =>
        defineField({
          name: language.id,
          title: `Place (${language.title})`,
          type: 'string',
          validation: rule => rule.required(),
        })
      ),
    }),

    defineField({ name: 'country', title: 'Country', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
      defineField({
        name: language.id,
        title: `Country (${language.title})`,
        type: 'string',
        validation: rule => rule.required(),
      })
    ) }),
    defineField({ name: 'duration', title: 'Duration (days)', type: 'number', initialValue: 7 }),

    defineField({ name: 'reasons', title: 'Reasons', type: 'reference', to: [{ type: 'gallery' }] }),
    defineField({ name: 'route', title: 'Route', type: 'reference', to: [{ type: 'gallery' }] }),
    defineField({ name: 'fleet', title: 'Fleet', type: 'reference', to: [{ type: 'gallery' }] }),
    defineField({ name: 'price', title: 'Price', type: 'reference', to: [{ type: 'price' }] }),
    defineField({ name: 'faq', title: 'FAQ', type: 'reference', to: [{ type: 'faq' }] }),
  ],
  preview: {
    select: { title: 'header.title.ru', subtitle: 'slug.current' },
  },
})
