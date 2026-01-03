
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
            from: 'WYKCLOUD Website <notifications@wykcloud.co.uk>',
            to: ['office@wykcloud.co.uk', "dariuscatinas1@gmail.com"],
            subject: `[Lead] New Inquiry from ${user_name}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #050b14;">
                <div style="font-family: 'Rajdhani', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050b14; color: #e2e8f0; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);">
                    
                    <!-- Header -->
                    <div style="background-color: #02050a; padding: 30px 20px; text-align: center; border-bottom: 2px solid #00f0ff;">
                        <h2 style="margin: 0; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-weight: 800; letter-spacing: 3px; font-size: 24px; color: #ffffff;">
                            WYK<span style="color: #00f0ff;">CLOUD</span>
                        </h2>
                        <p style="margin: 10px 0 0; font-family: 'Rajdhani', 'Segoe UI', sans-serif; font-size: 14px; color: #94a3b8; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                            INCOMING SYSTEM TRANSMISSION
                        </p>
                    </div>

                    <!-- Content -->
                    <div style="padding: 30px; background-color: #050b14;">
                        <p style="font-family: 'Rajdhani', 'Segoe UI', sans-serif; font-size: 18px; margin-bottom: 25px; color: #ffffff; font-weight: bold; border-left: 3px solid #00f0ff; padding-left: 10px;">
                            You received a new message from the site!
                        </p>

                        <!-- Data Box -->
                        <div style="background-color: #0d1626; padding: 20px; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 25px;">
                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #00f0ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Name:</span>
                                <span style="color: #ffffff; font-weight: 600;">${user_name}</span>
                            </p>
                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #00f0ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Company:</span>
                                <span style="color: #ffffff; font-weight: 600;">${company || 'N/A'}</span>
                            </p>
                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #00f0ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Email:</span>
                                <span style="color: #ffffff; text-decoration: none; font-weight: 600;">${user_email}</span>
                            </p>
                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #00f0ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Phone:</span>
                                <span style="color: #ffffff; font-weight: 600;">${contact_number || 'N/A'}</span>
                            </p>

                            <div style="border-top: 1px solid #1e293b; margin: 15px 0;"></div>

                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #7000ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Interest:</span>
                                <span style="color: #ffffff; font-weight: 600;">${interest}</span>
                            </p>
                            <p style="margin: 8px 0; color: #cbd5e1; font-size: 16px;">
                                <span style="color: #7000ff; font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; letter-spacing: 1px; font-weight: bold; text-transform: uppercase;">Budget:</span>
                                <span style="color: #ffffff; font-weight: 600;">${budget}</span>
                            </p>
                        </div>

                        <p style="font-family: 'Orbitron', 'Segoe UI', sans-serif; font-size: 12px; color: #94a3b8; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">
                            Client Message:
                        </p>
                        <blockquote style="border-left: 4px solid #00f0ff; background-color: #0d1626; margin: 0; padding: 15px; color: #e2e8f0; font-family: 'Rajdhani', 'Segoe UI', sans-serif; font-size: 16px; font-style: italic; border-radius: 0 4px 4px 0;">
                            ${message}
                        </blockquote>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #02050a; padding: 15px; text-align: center; font-family: 'Rajdhani', 'Segoe UI', sans-serif; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; letter-spacing: 1px;">
                        SECURE TRANSMISSION // WYKCLOUD SYSTEM NOTIFICATION<br>
                        This message was sent automatically from the WYKCLOUD website.
                    </div>
                </div>
            </body>
            </html>
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
