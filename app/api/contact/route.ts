import { NextRequest, NextResponse } from 'next/server'

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

    // For now, we'll use a simple email service or log the data
    // You can replace this with your preferred email service
    
    // Option 1: Use Web3Forms (free service)
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
        name,
        email,
        subject: `Contact Form Message from ${name}`,
        message: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
          
          Sent at: ${new Date().toLocaleString()}
        `,
        to: 'chougulesanket30@gmail.com'
      })
    })

    if (response.ok) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } else {
      // Fallback: Log the form data (for development)
      console.log('Contact Form Submission:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json(
        { message: 'Form submitted successfully' },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    
    // Log the form data even if email fails
    const { name, email, message } = await request.json().catch(() => ({}))
    console.log('Contact Form Data (Error Fallback):', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'Failed to send message, but your submission has been logged' },
      { status: 500 }
    )
  }
}