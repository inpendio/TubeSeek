import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'video',
      columns: [
        { name: 'videoLink', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'channel', type: 'string' }, // channel, hashtags,description
        { name: 'thumbnail', type: 'string' },
        { name: 'provider', type: 'string' },
        { name: 'magnetLink', type: 'string' },
        { name: 'source', type: 'string' },
        { name: 'hashtags', type: 'string' },
        { name: 'description', type: 'string' },
      ],
    }),
  ],
});
