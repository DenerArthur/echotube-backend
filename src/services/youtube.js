import { Innertube } from "youtubei.js";

let ytInstance = null;
let initInProgress = false;

async function getClient() {
  if (ytInstance) return ytInstance;

  if (!initInProgress) {
    initInProgress = true;
    console.log("🔄 Inicializando YouTubei.js...");
    try {
      ytInstance = await Innertube.create();
      console.log("✅ YouTubei.js pronto!");
    } catch (err) {
      console.error("❌ Erro ao iniciar YouTubei.js:", err);
    } finally {
      initInProgress = false;
    }
  }

  while (!ytInstance) {
    await new Promise(r => setTimeout(r, 500));
  }

  return ytInstance;
}

export async function searchVideos(query) {
  const client = await getClient();
  const res = await client.search(query, { type: "video" });
  return res.videos.slice(0, 10).map(v => ({
    id: v.id,
    title: v.title,
    duration: v.duration?.text || "0:00",
    thumbnails: v.thumbnails,
    author: v.author?.name,
  }));
}

export async function getAudioUrl(videoId) {
  const client = await getClient();
  const info = await client.getInfo(videoId);
  const bestAudio = info.streaming_data?.adaptive_formats?.find(f =>
    f.mime_type?.includes("audio/mp4")
  );

  return {
    id: videoId,
    title: info.basic_info?.title,
    audioUrl: bestAudio?.url || null,
  };
}
