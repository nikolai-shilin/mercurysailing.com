import { type SchemaTypeDefinition } from 'sanity'
import { section } from './section'
import { page } from './page'
import { gallery } from './gallery'
import { event } from './event'
import { feedback } from './feedback'
import { faq } from './faq'
import { faqCategory } from './faqCategory'
import { price } from './price'
import { cruise } from './cruise'
import { course } from './course'

export { localizedString, localizedText } from './locale'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [section, page, gallery, event, feedback, faq, faqCategory, price, cruise, course],
}
