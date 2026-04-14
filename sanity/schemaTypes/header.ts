import { defineField, defineType } from 'sanity';
import { SUPPORTED_LANGUAGES } from './languages';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [

    defineField({ name: 'section', title: 'Section Label', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
      defineField({
        name: language.id,
        title: `Section Label (${ language.title })`,
        type: 'string',
        validation: rule => rule.required(),
      })
    )
    }),

    defineField({ name: 'title', title: 'Title', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
      defineField({
        name: language.id,
        title: `Title (${ language.title })`,
        type: 'string',
        validation: rule => rule.required(),
      })
    )
    }),

    defineField({ name: 'description', title: 'Description', type: 'object', fields: SUPPORTED_LANGUAGES.map(language =>
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
})
