import {fetchAuthSession, getCurrentUser} from "@aws-amplify/auth";

async function getUserTokens() {
  const {tokens} = await fetchAuthSession();
  const idToken = tokens?.idToken?.toString();
  const {userId} = await getCurrentUser();
  return {idToken, userId};
}

export default getUserTokens;