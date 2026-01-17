# 📧 Email Setup Guide for Contact Form (Nodemailer)

Your contact form is ready to send emails using Nodemailer! Here's how to set it up:

## 🚀 Quick Setup with Gmail (Recommended)

### Step 1: Enable 2-Factor Authentication on Gmail

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Navigate to Security**
3. **Enable 2-Step Verification** if not already enabled

### Step 2: Generate App Password

1. **Go to Google Account Security**: https://myaccount.google.com/security
2. **Click "2-Step Verification"**
3. **Scroll down and click "App passwords"**
4. **Select "Mail" and "Other (Custom name)"**
5. **Enter "Murphy's Law Website"**
6. **Copy the 16-character app password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables

Open your `.env` file and update these values:

```env
# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tim@kvelld.co.za
SMTP_PASS=abcd efgh ijkl mnop
CONTACT_EMAIL=tim@kvelld.co.za
FROM_EMAIL=noreply@murphyslaw.ai
```

**Replace**:
- `SMTP_USER` with your Gmail address
- `SMTP_PASS` with the 16-character app password from Step 2

### Step 4: Test the Contact Form

1. **Start your development server**: `npm run dev`
2. **Go to your website**: http://localhost:3000
3. **Scroll to the footer contact form**
4. **Fill out and submit the form**
5. **Check your email** for the message

## ✅ What's Already Configured

- ✅ **Nodemailer SMTP transport** with Gmail
- ✅ **Professional HTML email template** with styling
- ✅ **Plain text fallback** for email clients
- ✅ **Email validation** and error handling
- ✅ **SMTP connection verification**
- ✅ **Fallback logging** if email service fails
- ✅ **Reply-to functionality** (reply directly to customer)
- ✅ **South African timezone** for timestamps

## 📧 Email Features

### What You'll Receive:
- **Subject**: "Murphy's Law Contact Form - Message from [Name]"
- **From**: "Murphy's Law Website" <noreply@murphyslaw.ai>
- **Reply-To**: Customer's email (so you can reply directly)
- **Format**: Beautiful HTML email with professional styling

### Example Email:
```html
Murphy's Law - New Contact Form Submission

Name: John Smith
Email: john@example.com
Message: I'm interested in learning more about Murphy's Law AI...
Submitted: 17/01/2026, 14:30:00

This message was sent from the Murphy's Law website contact form.
You can reply directly to this email to respond to John Smith.
```

## 🔧 Alternative SMTP Providers

### Option 1: Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Option 2: Custom Domain Email (cPanel/WHM)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-email-password
```

### Option 3: SendGrid SMTP
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Option 4: Mailgun SMTP
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

## 🛠️ Troubleshooting

### "Authentication failed" error:
1. **Gmail**: Make sure you're using an App Password, not your regular password
2. **2FA**: Ensure 2-Factor Authentication is enabled
3. **Less secure apps**: Not needed with App Passwords

### "Connection timeout" error:
1. Check your internet connection
2. Verify SMTP host and port are correct
3. Try port 465 with `secure: true` for SSL

### Form submits but no email received:
1. Check spam/junk folder
2. Verify SMTP credentials in `.env`
3. Check server logs for error messages
4. Test SMTP connection manually

### "SMTP not configured" message:
- Check that all SMTP environment variables are set
- Restart your development server after updating `.env`

## 📊 Monitoring Form Submissions

All form submissions are logged in your server console:

```bash
npm run dev
# Check terminal for logs like:
# Email sent successfully: { messageId: "...", name: "John", email: "john@example.com" }
```

## 🔒 Security Features

- ✅ **App Passwords** - more secure than regular passwords
- ✅ **SMTP over TLS** - encrypted email transmission
- ✅ **Input sanitization** - prevents malicious content
- ✅ **Email validation** - prevents invalid emails
- ✅ **Error handling** - graceful fallbacks
- ✅ **Connection verification** - tests SMTP before sending

## 🎨 Email Template Features

- **Responsive HTML design** - looks great on all devices
- **Professional styling** - matches your brand
- **Clear formatting** - easy to read customer information
- **Reply-to functionality** - click reply to respond to customer
- **Timestamp** - shows when form was submitted (SA time)

## 📞 Support

If you need help setting this up:
1. Double-check your Gmail App Password setup
2. Verify all environment variables are correct
3. Check server logs for detailed error messages
4. Test with a simple form submission first

## 🚀 Production Deployment

For production, consider:
1. **Custom domain email** - more professional than Gmail
2. **Dedicated SMTP service** - SendGrid, Mailgun, etc.
3. **Rate limiting** - prevent spam submissions
4. **Email templates** - branded HTML templates

---

**Your contact form is ready with Nodemailer! Just add your SMTP credentials and start receiving professional emails.** 📧✨