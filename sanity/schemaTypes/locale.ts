// sanity/schemaTypes/locale.ts
// Spread these into defineField calls for translatable fields.
// Example: defineField({ name: 'title', title: 'Title', ...localizedString })

export const localizedString = {
  type: 'object' as const,
  fields: [
    { name: 'en', type: 'string', title: 'English' },
    { name: 'ru', type: 'string', title: 'Russian' },
  ],
}

export const localizedText = {
  type: 'object' as const,
  fields: [
    { name: 'en', type: 'text', title: 'English' },
    { name: 'ru', type: 'text', title: 'Russian' },
  ],
}
