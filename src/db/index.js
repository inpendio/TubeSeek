import { Model, Database } from '@nozbe/watermelondb';
import { text, json, action } from '@nozbe/watermelondb/decorators';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import logger from '@nozbe/watermelondb/utils/common/logger';
import schema from './schema';

export { default as DBhandler } from './DBhandler';

const isObject = require('lodash.isobject');

const sanitizer = (s) => {
  if (!s) return null;
  try {
    if (isObject(s) || Array.isArray(s)) return s;
    const data = JSON.parse(s);
    return data;
  } catch (error) {
    console.log(error, s);
    return s;
  }
};

logger.silence();

class Video extends Model {
  static table = 'video';

  @text('videoLink') videoLink;

  @text('text') text;

  @text('thumbnail') thumbnail;

  @text('provider') provider;

  @text('duration') duration;

  @text('magnetLink') magnetLink;

  @text('source') source;

  @json('channel', sanitizer) channel;

  @json('hashtags', sanitizer) hashtags;

  @json('description', sanitizer) description;

  /* @action async addVideo(body, author) {
    return await this.collections.get('video').create((video) => {
      video.post.set(this);
      video.author.set(author);
      video.body = body;
    });
  } */
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
