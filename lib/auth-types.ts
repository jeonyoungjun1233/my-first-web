export type AuthUser = {
  id: string;
  email: string;
  name: string;
  provider: "blog-cookie" | "supabase";
  verified: boolean;
  accessToken?: string | null;
};
