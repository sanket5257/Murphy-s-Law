import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || '587')
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    requireTLS: port !== 465,
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    debug: true, // Enable debug logs
    logger: true
  })
}

// Alternative transporter for port 25 (if 587 fails)
const createAlternativeTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 25,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  })
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if SMTP configuration is available
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const contactEmail = process.env.CONTACT_EMAIL || 'tim@kvelld.co.za'
    const fromEmail = process.env.FROM_EMAIL || 'noreply@murphyslaw.ai'

    if (!smtpHost || !smtpUser || !smtpPass) {
      // Log the form data if SMTP is not configured
      console.log('Contact Form Submission (SMTP not configured):', {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        note: 'SMTP credentials not configured - message logged only'
      })
      
      return NextResponse.json(
        { message: 'Thank you for your message! We have received your inquiry and will respond soon.' },
        { status: 200 }
      )
    }

    try {
      let transporter;
      let connectionSuccessful = false;

      // Try primary transporter first (port 587)
      try {
        console.log('Attempting connection to SMTP server on port 587...')
        transporter = createTransporter()
        await transporter.verify()
        connectionSuccessful = true
        console.log('SMTP connection successful on port 587')
      } catch (primaryError) {
        console.log('Port 587 failed, trying port 25...', primaryError.message)
        
        // Try alternative transporter (port 25)
        try {
          transporter = createAlternativeTransporter()
          await transporter.verify()
          connectionSuccessful = true
          console.log('SMTP connection successful on port 25')
        } catch (alternativeError) {
          console.error('Both SMTP ports failed:', {
            port587: primaryError.message,
            port25: alternativeError.message
          })
          throw new Error(`SMTP connection failed on both ports: 587 (${primaryError.message}), 25 (${alternativeError.message})`)
        }
      }

      if (!connectionSuccessful) {
        throw new Error('Could not establish SMTP connection')
      }

      // Email content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 4px solid #000; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Murphy's Law - New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from the Murphy's Law website contact form.</p>
              <p>You can reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </body>
        </html>
      `

      const textContent = `
New Contact Form Submission - Murphy's Law

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}

Message:
${message}

---
This message was sent from the Murphy's Law website contact form.
You can reply directly to this email to respond to ${name}.
      `

      // Send email
      const info = await transporter.sendMail({
        from: `"Murphy's Law Website" <${fromEmail}>`,
        to: contactEmail,
        replyTo: email,
        subject: `Murphy's Law Contact Form - Message from ${name}`,
        text: textContent,
        html: htmlContent,
      })

      console.log('Email sent successfully:', {
        messageId: info.messageId,
        name,
        email,
        timestamp: new Date().toISOString()
      })

      return NextResponse.json(
        { message: 'Thank you for your message! We\'ll get back to you within 24 hours.' },
        { status: 200 }
      )

    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      
      // Log the form data as fallback
      console.log('Contact Form Submission (Email Failed):', {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        error: emailError instanceof Error ? emailError.message : 'Unknown email error'
      })
      
      return NextResponse.json(
        { message: 'Thank you for your message! We have received your inquiry and will respond soon.' },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    // Always log the form data for manual follow-up
    try {
      const { name, email, message } = await request.json()
      console.log('Contact Form Data (Error Fallback):', {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } catch (parseError) {
      console.error('Could not parse request data:', parseError)
    }
    
    return NextResponse.json(
      { error: 'There was an issue sending your message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}