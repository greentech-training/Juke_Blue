import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email } = await request.json();

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [4],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}