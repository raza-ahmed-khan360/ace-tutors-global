export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/ogg',
      },
      description: 'Upload a video file for the hero section (recommended: mp4, webm, or ogg)'
    },
    {
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of course names to display',
    },
  ],
};
