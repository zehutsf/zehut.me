import fetch from 'node-fetch';

async function getBumpersData() {
  const url = 
    'https://bumpers.fm/v1/users/' +
    process.env.BUMPERS_USER_ID +
    '/episodes';

  const result = await fetch(url);

  const data = await result.json();
  const episode = data.episodes[0];

  return {
    id: episode.episodeId,
    title: episode.about,
    description: episode.about,
    image: episode.imageURL,
    url: episode.permalinkURL
  };
}

async function getYoutubeVideoData() {
  const params = {
    order: 'date',
    part: 'snippet',
    maxResults: 1,
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    key: process.env.YOUTUBE_API_KEY,
  };

  const query = Object.keys(params).map(
    param =>  param + '=' + params[param]
  ).join('&');
  
  const result = await fetch(
    'https://www.googleapis.com/youtube/v3/search?' + query
  );

  const data = await result.json();
  const { id: { videoId }, snippet } = data.items[0];

  return {
    id: videoId,
    title: snippet.title,
    image: snippet.thumbnails.medium.url,
    description: snippet.description,
    url: 'https://www.youtube.com/channel/' + process.env.YOUTUBE_CHANNEL_ID,
  };
}

export async function getConfig() {
  const videoInfo = await getYoutubeVideoData();
  const bumpersInfo = await getBumpersData();

  return {
    videoInfo,
    bumpersInfo,
  };
}
