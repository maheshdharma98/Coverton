import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

function getCredential(): ClientSecretCredential {
  return new ClientSecretCredential(
    process.env.MICROSOFT_TENANT_ID!,
    process.env.MICROSOFT_CLIENT_ID!,
    process.env.MICROSOFT_CLIENT_SECRET!
  );
}

export function getGraphClient(): Client {
  const authProvider = new TokenCredentialAuthenticationProvider(getCredential(), {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  return Client.initWithMiddleware({ authProvider });
}

export async function getAccessToken(
  scope = "https://graph.microsoft.com/.default"
): Promise<string> {
  const token = await getCredential().getToken(scope);
  if (!token?.token) throw new Error(`[auth] Failed to acquire access token for scope: ${scope}`);
  return token.token;
}
