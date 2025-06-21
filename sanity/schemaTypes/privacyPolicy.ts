export default {
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Privacy Policy',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }
  ]
};
