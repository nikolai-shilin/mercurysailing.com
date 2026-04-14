'use client'

import { visionTool } from '@sanity/vision'
import { languageFilter } from '@sanity/language-filter'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    languageFilter({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ru', title: 'Russian' },
      ],
      defaultLanguages: ['en'],
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
