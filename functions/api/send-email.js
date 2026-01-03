
import { Resend } from 'resend';

export async function onRequestPost(context) {
    try {
        // Parse the request body (email and message from frontend)
        const { user_name, company, user_email, contact_number, interest, budget, message } = await context.request.json();

        // Initialize Resend with the API key from environment variables
        // IMPORTANT: The user must set RESEND_API_KEY in Cloudflare Pages settings
        const resend = new Resend(context.env.RESEND_API_KEY);

        // Sending the email
        const data = await resend.emails.send({
            from: 'WYKCLOUD Website <onboarding@resend.dev>', // Update this if you have a verified domain on Resend
            to: ["dariuscatinas1@gmail.com"], // Must be your registered Resend email until domain is verified
            subject: `[Lead] New Inquiry from ${user_name}`,
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050b14; color: #e2e8f0; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);">
                <div style="background-color: #02050a; padding: 30px 20px; text-align: center; border-bottom: 2px solid #00f0ff;">
                    <h2 style="margin: 0; font-family: 'Segoe UI', sans-serif; font-weight: 800; letter-spacing: 3px; font-size: 24px; color: #ffffff;">
                        WYK<span style="color: #00f0ff;">CLOUD</span>
                    </h2>
                    <p style="margin: 10px 0 0; font-size: 14px; color: #94a3b8; letter-spacing: 3px; text-transform: uppercase;">
                        new secure transmission
                    </p>
                </div>

                <div style="padding: 30px; background-color: #050b14;">
                    <p style="font-size: 18px; margin-bottom: 25px; color: #ffffff; font-weight: bold; border-left: 3px solid #00f0ff; padding-left: 10px;">
                        New Project Inquiry
                    </p>
                    
                    <div style="background-color: #0d1626; padding: 20px; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 25px;">
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #00f0ff;">Name:</strong> ${user_name}</p>
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #00f0ff;">Company:</strong> ${company || 'N/A'}</p>
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #00f0ff;">Email:</strong> ${user_email}</p>
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #00f0ff;">Phone:</strong> ${contact_number || 'N/A'}</p>
                        <hr style="border-color: #1e293b; margin: 15px 0;">
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #7000ff;">Interest:</strong> ${interest}</p>
                        <p style="margin: 8px 0; color: #cbd5e1;"><strong style="color: #7000ff;">Budget:</strong> ${budget}</p>
                    </div>

                    <p style="font-size: 14px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Message:</p>
                    <blockquote style="border-left: 4px solid #00f0ff; background-color: #0d1626; margin: 0; padding: 15px; color: #e2e8f0; font-style: italic;">
                        ${message}
                    </blockquote>
                </div>
            </div>
            `
        });

        if (data.error) {
            return new Response(JSON.stringify({ success: false, error: data.error }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
