import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'cruise',
      title: 'Cruise',
      type: 'reference',
      to: [{ type: 'cruise' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'from',
      title: 'From Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
      validation: (rule) => rule.required().min(1),
      initialValue: 7,
    }),

    defineField({
      name: 'seats',
      title: 'Seats',
      type: 'object',
      fields: [
        defineField({ name: 'total', title: 'Total seats', type: 'number', validation: (rule) => rule.required().min(1) }),
        defineField({ name: 'available', title: 'Available seats', type: 'number', validation: (rule) => rule.required().min(0) }),
      ],
    }),

    defineField({
      name: 'boat',
      title: 'Boat',
      type: 'object',
      fields: [
        defineField({ name: 'model', title: 'Model', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'year', title: 'Year', type: 'number', validation: (rule) => rule.required() }),
      ],
    }),
  ],
  preview: {
    select: { title: 'cruise.header.title.ru', subtitle: 'from' },
  },
})
