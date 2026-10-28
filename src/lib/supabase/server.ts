import { createClient } from "@supabase/supabase-js";
import { isOwnerEmail } from "@/lib/cloud-auth";

interface AuthorizationResult {
  allowed: boolean;
  status?: number;
  error?: string;
  user?: {
    id: string;
    email?: string;
  };
}

export async function authorizeOwnerRequest(
  request: Request,
): Promise<AuthorizationResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return { allowed: true };
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return {
      allowed: false,
      status: 401,
      error: "請先使用 GitHub 登入。",
    };
  }

  const client = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) {
    return {
      allowed: false,
      status: 401,
      error: "登入狀態已失效，請重新登入。",
    };
  }

  const ownerEmail = process.env.OWNER_GITHUB_EMAIL;
  if (!isOwnerEmail(data.user.email, ownerEmail)) {
    return {
      allowed: false,
      status: 403,
      error: ownerEmail
        ? "這個帳號沒有提交題目的權限。"
        : "伺服器尚未設定 owner 帳號。",
    };
  }

  return {
    allowed: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  };
}
