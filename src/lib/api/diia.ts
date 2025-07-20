import getUserTokens from "@/utils/jwt";

export async function checkDiiaAuth(): Promise<boolean> {
  const {idToken, userId} = await getUserTokens();
  const res = await fetch(`https://kazeapi.uk/user/is_authorized?id=${userId}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const data = await res.json();
  return data?.result === true;
}
