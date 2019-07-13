import { Model, Database } from '@nozbe/watermelondb';
import { text, json, action } from '@nozbe/watermelondb/decorators';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';

class Video extends Model {
  static table = 'video';

  @text('videoLink') videoLink;

  @text('text') text;

  @text('thumbnail') thumbnail;

  @text('provider') provider;

  @text('magnetLink') magnetLink;

  @text('source') source;

  @json('channel') channel;

  @json('hashtags') hashtags;

  @json('description') description;

  @action async addVideo(body, author) {
    return await this.collections.get('video').create((video) => {
      video.post.set(this);
      video.author.set(author);
      video.body = body;
    });
  }
}

const adapter = new SQLiteAdapter({
  dbName: 'TubeSeekDB',
  schema,
});

export default new Database({
  adapter,
  modelClasses: [Video],
  actionsEnabled: true,
});
