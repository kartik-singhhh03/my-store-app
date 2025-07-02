import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(
  to: string,
  orderNumber: string,
  products: Array<{ title: string; price: number }>,
  totalAmount: number
) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6;">Order Confirmation</h1>
          <p>Thank you for your purchase! Your order <strong>${orderNumber}</strong> has been confirmed.</p>
          
          <h2>Order Details:</h2>
          <ul>
            ${products.map(product => `
              <li>${product.title} - $${product.price.toFixed(2)}</li>
            `).join('')}
          </ul>
          
          <p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>
          
          <p>You can download your products from your dashboard at any time.</p>
          
          <p>Best regards,<br>Kartik Digital Store Team</p>
        </div>
      `
    })
  } catch (error) {
    console.error('Failed to send order confirmation email:', error)
  }
}

export async function sendAdminNotificationEmail(
  orderNumber: string,
  customerEmail: string,
  totalAmount: number
) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: 'admin@kartikdigitalstore.com', // Replace with actual admin email
      subject: `New Order Received - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6;">New Order Received</h1>
          <p>A new order has been placed on your store.</p>
          
          <h2>Order Details:</h2>
          <ul>
            <li><strong>Order Number:</strong> ${orderNumber}</li>
            <li><strong>Customer:</strong> ${customerEmail}</li>
            <li><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</li>
          </ul>
          
          <p>View the full order details in your admin dashboard.</p>
        </div>
      `
    })
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
  }
}