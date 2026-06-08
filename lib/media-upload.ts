export type UploadedMedia = {
  media_url: string;
  media_type: "image" | "video";
};

const SUPPORTED_TYPES = ["image/", "video/"];

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function getMediaType(file: File): "image" | "video" | null {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return null;
}

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(new Error("파일을 읽지 못했습니다.")));
    reader.readAsDataURL(file);
  });
}

export async function uploadPostMedia(
  file: File,
  userId: string,
  accessToken?: string | null,
): Promise<UploadedMedia> {
  const mediaType = getMediaType(file);

  if (!mediaType || !SUPPORTED_TYPES.some((type) => file.type.startsWith(type))) {
    throw new Error("이미지 또는 동영상 파일만 업로드할 수 있습니다.");
  }

  if (!hasSupabaseEnv()) {
    return {
      media_url: await readFileAsDataUrl(file),
      media_type: mediaType,
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const filePath = `${userId}/${Date.now()}_${sanitizeFileName(file.name)}`;
  const endpoint = `${url.replace(/\/$/, "")}/storage/v1/object/post-media/${filePath}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken ?? anonKey}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("파일 업로드 중 문제가 발생했습니다.");
  }

  return {
    media_url: `${url.replace(/\/$/, "")}/storage/v1/object/public/post-media/${filePath}`,
    media_type: mediaType,
  };
}
