const { Innertube } = require('youtubei.js');

let yt;

async function getClient() {
  if (!yt) yt = await Innertube.create();
  return yt;
}

async function searchVideos(query) {
  const client = await getClient();
  const res = await client.search(query, { type: 'video' });

  return res.videos.slice(0, 10).map(v => ({
    id: v.id,
    title: v.title,
    duration: v.duration?.text || '0:00',
    thumbnails: v.thumbnails,
    author: v.author?.name
  }));
}

async function getAudioUrl(videoId) {
  const client = await getClient();
  const info = await client.getInfo(videoId);
  const bestAudio = info.streaming_data?.adaptive_formats?.find(f =>
    f.mime_type?.includes('audio/mp4')
  );

  return {
    id: videoId,
    title: info.basic_info?.title,
    audioUrl: bestAudio?.url || null
  };
}

module.exports = { searchVideos, getAudioUrl };
