import { Q } from '@nozbe/watermelondb';
import { actionVideoAddToCache, actionBitchuteAddToQueue } from 'store';

class DBHandler {
  constructor() {
    this.isRunning = false;
    this.queue = [];
  }

  setDB = async (db) => {
    this.db = db;
    this.videoCollection = this.db.collections.get('video');
  };

  setDispatch = (d) => {
    this.dispatch = d;
  };

  retrieveQueue = async (q) => {
    for (let i = 0; i < q.length; i++) {
      try {
        const item = await this.getItemFromDBByVideoLink(q[i]);
        if (item[0].videoLink) {
          this.dispatch(actionVideoAddToCache(item[0]));
          this.dispatch(actionBitchuteAddToQueue(item[0], '_from_storage'));
        }
      } catch (error) {
        console.log(error, q[i]);
      }
    }
  };

  addItems = (arrayOfItems) => {
    this.queue = this.queue.concat(arrayOfItems);
    if (!this.isRunning) this.start();
  };

  getItemFromDBByVideoLink = async (videoLink) => {
    try {
      const item = await this.videoCollection
        .query(Q.where('videoLink', videoLink))
        .fetch();
      return item;
    } catch (error) {
      console.log(error);
    }
  };

  queryFromCollection = async (videoLink) => {
    try {
      const itemToCache = await this.getItemFromDBByVideoLink(videoLink);
      if (itemToCache[0] && itemToCache[0].videoLink) this.dispatch(actionVideoAddToCache(itemToCache[0]));
    } catch (error) {
      console.log(error);
    }
  };

  start = async () => {
    this.isRunning = true;
    while (this.queue.length > 0) {
      const { videoLink } = this.queue.shift();
      try {
        this.queryFromCollection(videoLink);
      } catch (error) {
        console.log('video->db->ERROR', error, { ...this });
      }
    }
    this.isRunning = false;
  };

  /* eslint-disable no-param-reassign */
  addToDB = (item) => {
    try {
      this.db.action(async () => {
        this.db.collections.get('video').create((v) => {
          v.text = item.text;
          v.videoLink = item.videoLink;
          v.source = item.source;
          v.thumbnail = item.thumbnail;
          v.provider = item.provider;
          v.magnetLink = item.magnetLink;
          v.channel = JSON.stringify(item.channel);
          v.hashtags = JSON.stringify(item.hashtags);
          v.description = JSON.stringify(item.description);
        });
      });
    } catch (error) {
      console.log('video->db->ERROR', error);
    }
  };
}

export default new DBHandler();
