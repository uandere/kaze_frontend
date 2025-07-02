import { User } from "firebase/auth";

export async function checkDiiaAuth(user: User): Promise<boolean> {
  const idToken = await user.getIdToken();
  const res = await fetch(`https://kazeapi.uk/user/is_authorized?id=${user.uid}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const data = await res.json();
  return data?.result === true;
}
