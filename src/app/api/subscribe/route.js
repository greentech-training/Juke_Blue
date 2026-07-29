import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, firstName, captchaToken } = await request.json();

  if (!captchaToken) {
    return NextResponse.json({ error: 'Please complete the reCAPTCHA verification.' }, { status: 400 });
  }

  // Verify reCAPTCHA token with Google API
  try {
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken,
      }).toString(),
    });

    const recaptchaData = await recaptchaRes.json();
    console.log('Google reCAPTCHA v3 verification result:', recaptchaData);

    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }
  } catch (captchaErr) {
    console.error('reCAPTCHA validation error:', captchaErr);
    return NextResponse.json({ error: 'Failed to verify reCAPTCHA.' }, { status: 500 });
  }

  try {
    const payload = {
      email: email,
      listIds: [4],
      updateEnabled: true,
    };

    if (firstName) {
      payload.attributes = {
        FIRSTNAME: firstName,
      };
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 204) {
      // Send instant admin notification email to commercial@jukeblue.com
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: "Juke Blue Website", email: "commercial@jukeblue.com" },
            to: [{ email: "commercial@jukeblue.com", name: "Juke Blue Admin" }],
            subject: "🥂 New Event Sign-up Alert!",
            htmlContent: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #25394B; background-color: #F2E3C0; border-radius: 8px;">
                <h2 style="color: #25394B; margin-bottom: 16px;">A new user just signed up on the website!</h2>
                <ul style="font-size: 16px; line-height: 1.8; color: #25394B;">
                  <li><b>First Name:</b> ${firstName || 'N/A'}</li>
                  <li><b>Email:</b> ${email}</li>
                </ul>
              </div>
            `
          }),
        });
      } catch (adminEmailError) {
        console.error('Failed to send admin notification email:', adminEmailError);
      }

      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}