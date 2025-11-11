const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

// 🔍 Buscar vídeos
async function searchVideos(query) {
  const r = await ytSearch(query);
  const videos = r.videos.slice(0, 10);
  return videos.map(v => ({
    id: v.videoId,
    title: v.title,
    duration: v.timestamp,
    author: v.author.name,
    thumbnails: [{ url: v.thumbnail }]
  }));
}

// 🎵 Obter URL de streaming de áudio
async function getAudioUrl(videoId) {
  if (!videoId) throw new Error("ID do vídeo não fornecido");

  const info = await ytdl.getInfo(videoId);
  const audioFormat = ytdl.chooseFormat(info.formats, {
    filter: "audioonly",
    quality: "highestaudio"
  });

  return {
    id: videoId,
    title: info.videoDetails.title,
    audioUrl: audioFormat.url
  };
}

module.exports = { searchVideos, getAudioUrl };
