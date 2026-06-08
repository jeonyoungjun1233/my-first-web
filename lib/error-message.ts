export function getFriendlyErrorMessage(message?: string | null) {
  if (!message) {
    return "잠시 후 다시 시도해주세요.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid") || normalized.includes("unauthorized")) {
    return "이메일 또는 비밀번호를 다시 확인해주세요.";
  }

  if (normalized.includes("permission") || normalized.includes("policy")) {
    return "이 글을 변경할 권한이 없습니다.";
  }

  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "네트워크 연결을 확인한 뒤 다시 시도해주세요.";
  }

  return message;
}
