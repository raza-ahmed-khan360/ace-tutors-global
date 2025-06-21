import { type SchemaTypeDefinition } from 'sanity'
import privacyPolicy from './privacyPolicy'
import termsAndConditions from './termsAndConditions'
import blockContent from './blockedContent'
import heroSchema from './heroSchema'
import testimonials from './testimonials'
import faqs from './faqs'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSchema,
    blockContent,
    privacyPolicy,
    termsAndConditions,
    testimonials,
    faqs,
  ],
}
