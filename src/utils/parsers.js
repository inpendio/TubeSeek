const DomParser = require('react-native-html-parser').DOMParser;

const mf_lists = {
  subscribed: {
    id: 'listing-subscribed',
    title: 'video-card-title',
    channel: 'video-card-channel',
    time: 'video-card-published',
    parsed: [],
    image: 'video-card-image',
  },
  all: {
    parsed: [],
    title: 'video-card-title',
    channel: 'video-card-channel',
    time: 'video-card-published',
    id: 'listing-all',
    image: 'video-card-image',
  },
  popular: {
    title: 'video-card-title',
    channel: 'video-card-channel',
    time: 'video-card-published',
    id: 'listing-popular',
    parsed: [],
    image: 'video-card-image',
  },
  trendingDay: {
    title: 'video-trending-title',
    channel: 'video-trending-channel',
    time: 'video-trending-details',
    parsed: [],
    id: 'trending-day',
    image: 'video-trending-image',
  },
  trendingWeek: {
    title: 'video-trending-title',
    channel: 'video-trending-channel',
    time: 'video-trending-details',
    parsed: [],
    id: 'trending-week',
    image: 'video-trending-image',
  },
  trendingMonth: {
    title: 'video-trending-title',
    channel: 'video-trending-channel',
    time: 'video-trending-details',
    parsed: [],
    id: 'trending-month',
    image: 'video-trending-image',
  },
};

function removeNewLines(str) {
  return str.replace(/>\n/gim, '>');
}

function findAtributeValue({ attributes }, name) {
  let out;
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].name === name) {
      out = attributes[i].value;
      break;
    }
  }
  return out;
}

function removeTextNodes(elems) {
  if (!elems) return elems;
  const out = [];
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].nodeName !== '#text') out.push(elems[i]);
  }
  return out;
}

function videoCardToJSON(card, meta) {
  const out = {};
  // console.log(-1, card);
  const sa = card.getElementsByTagName('a')[0];

  if (sa) {
    out.videoLink = findAtributeValue(sa, 'href');
    out.text = card.getElementsByClassName(meta.title)[0].textContent;
    // console.log(0, card.getElementsByClassName(meta.channel)[0]);
    const sc = card
      .getElementsByClassName(meta.channel)[0]
      .getElementsByTagName('a')[0];
    // console.log(1, sc);
    out.channel = {
      name: sc.textContent,
      link: sc.href,
    };
    console.log(
      2,
      card.getElementsByClassName(meta.time).textContent,
      meta.time,
      meta.id,
    );
    out.timePublished = card.getElementsByClassName(meta.time).textContent;
    const si = card.getElementsByClassName(meta.image)[0];
    const simg = si.getElementsByTagName('img')[0];
    out.thumbnail = findAtributeValue(simg, 'data-src');
    // console.log(3, card.getElementsByClassName('video-views')[0]);
    out.views = card
      .getElementsByClassName('video-views')[0]
      .textContent.trim();
    console.log(4, card.getElementsByClassName('video-duration')[0]);
    out.duration = card
      .getElementsByClassName('video-duration')[0]
      .textContent.trim();
    // meta.parsed.push(out);
    return out;
  }
  return null;
}

function getList(elems, meta) {
  const out = [];
  console.log(elems);
  for (let i = 0; i < elems.length; i++) {
    const parsedCard = videoCardToJSON(elems[i], meta);
    if (parsedCard) out.push(parsedCard);
    else break;
  }
  /* elems.forEach((s) => {
    const parsedCard = videoCardToJSON(s, meta);
    if (parsedCard) out.push(parsedCard);
  }); */
  /* for (const s of elems) {
    const out = {};
    const sa = s.getElementsByTagName('a')[0];
    if (sa) {
      out.videoLink = sa.href;
      out.text = s.getElementsByClassName(mf_lists[l].title)[0].textContent;
      const sc = s.getElementsByClassName(mf_lists[l].channel)[0].getElementsByTagName('a')[0];
      out.channel = {
        name: sc.textContent,
        link: sc.href,
      };
      out.timePublished = s.getElementsByClassName(mf_lists[l].time)[0].textContent;
      const si = s.getElementsByClassName(mf_lists[l].image)[0];
      const simg = si.getElementsByTagName('img')[0];
      out.thumbnail = simg.dataset.src;
      out.views = s.getElementsByClassName('video-views')[0].textContent.trim();
      out.duration = s.getElementsByClassName('video-duration')[0].textContent.trim();
      mf_lists[l].parsed.push(out);
    }
  } */
  return out;
}

export function parseLoginToken(html) {
  const doc = new DomParser().parseFromString(html, 'text/html');
  const hiddenInput = doc
    .getElementById('login_form')
    .getElementsByTagName('input')[0];
  const csrfmiddlewaretoken = hiddenInput.getAttribute('value');
  return csrfmiddlewaretoken;
}

export function parseBasicList(html) {
  const doc = new DomParser().parseFromString(
    removeNewLines(html),
    'text/html',
  );
  const out = {};
  Object.keys(mf_lists).forEach((l) => {
    console.log(l);
    const el = doc.getElementById(mf_lists[l].id);
    const elems = removeTextNodes(el.getElementsByTagName('div')[0].childNodes);
    out[l] = getList(elems, mf_lists[l]);
  });
  return out;
}
