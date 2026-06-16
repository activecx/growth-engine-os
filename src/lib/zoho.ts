/**
 * Zoho CRM lead helper.
 * Exchanges the stored refresh token for an access token, then POSTs a Lead record.
 *
 * Required env vars:
 *   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_DC (e.g. "com")
 */

interface ZohoLeadPayload {
  name: string;
  email: string;
  brand: string;
}

interface ZohoTokenResponse {
  access_token?: string;
  error?: string;
}

async function getZohoAccessToken(): Promise<string> {
  const dc = process.env.ZOHO_DC ?? 'com';
  const url = `https://accounts.zoho.${dc}/oauth/v2/token`;

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN ?? '',
    client_id: process.env.ZOHO_CLIENT_ID ?? '',
    client_secret: process.env.ZOHO_CLIENT_SECRET ?? '',
    grant_type: 'refresh_token',
  });

  const res = await fetch(`${url}?${params.toString()}`, { method: 'POST' });
  const data: ZohoTokenResponse = await res.json();

  if (!data.access_token) {
    throw new Error(`Zoho token exchange failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

export async function createZohoLead(payload: ZohoLeadPayload): Promise<void> {
  const dc = process.env.ZOHO_DC ?? 'com';
  const accessToken = await getZohoAccessToken();

  const leadRecord = {
    Last_Name: payload.name || 'Unknown',
    Email: payload.email,
    Company: payload.brand || 'Not provided',
    Lead_Source: 'video-services funnel',
    Description: `Product: $49 First AI Video Ad`,
  };

  const res = await fetch(`https://www.zohoapis.${dc}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [leadRecord] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoho Leads POST failed ${res.status}: ${text}`);
  }
}

export async function updateZohoLead(email: string, orderId: string): Promise<void> {
  const dc = process.env.ZOHO_DC ?? 'com';
  const accessToken = await getZohoAccessToken();

  // Search for the lead by email
  const searchRes = await fetch(
    `https://www.zohoapis.${dc}/crm/v2/Leads/search?criteria=(Email:equals:${encodeURIComponent(email)})`,
    {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    }
  );

  if (!searchRes.ok) return; // non-fatal if lead not found

  const searchData = await searchRes.json() as { data?: Array<{ id: string }> };
  const lead = searchData.data?.[0];
  if (!lead) return;

  await fetch(`https://www.zohoapis.${dc}/crm/v2/Leads/${lead.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [
        {
          Description: `Order paid — ID: ${orderId}. Product: $49 First AI Video Ad`,
        },
      ],
    }),
  });
}
