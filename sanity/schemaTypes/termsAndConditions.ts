export default {
  name: 'termsAndConditions',
  title: 'Terms and Conditions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Terms and Conditions',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }
  ]
};
