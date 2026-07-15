# 📧 EmailJS Setup Guide for SmartPin Forms

## Step 1: Create EmailJS Account

1. Go to [https://emailjs.com](https://emailjs.com)
2. Sign up with your **harish@aquataurustech.com** email
3. Verify your email address

## Step 2: Connect Your Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (if harish@aquataurustech.com is Gmail)
   - **Outlook** (if it's Outlook/Hotmail)
   - **Other** (if custom domain)
4. Follow the OAuth setup to connect your email
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
{{subject}}
```

### Template Body:
```html
<h2>New {{form_type}} Form Submission</h2>

<h3>Contact Information:</h3>
<p><strong>Name:</strong> {{full_name}}</p>
<p><strong>Email:</strong> {{work_email}}{{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>

{{#school_name}}<p><strong>School:</strong> {{school_name}}</p>{{/school_name}}
{{#school_district}}<p><strong>School/District:</strong> {{school_district}}</p>{{/school_district}}
{{#role}}<p><strong>Role:</strong> {{role}}</p>{{/role}}
{{#preferred_date}}<p><strong>Preferred Date:</strong> {{preferred_date}}</p>{{/preferred_date}}
{{#student_count}}<p><strong>Student Count:</strong> {{student_count}}</p>{{/student_count}}
{{#topic}}<p><strong>Topic:</strong> {{topic}}</p>{{/topic}}

<h3>Message:</h3>
<p>{{message}}</p>

---
<p><em>Sent from SmartPin website contact form</em></p>
```

4. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key**

## Step 5: Update Your Code

Replace the values in `/src/lib/submitContactForm.ts`:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id',     // ← Replace with your Service ID
  TEMPLATE_ID: 'your_template_id',   // ← Replace with your Template ID  
  PUBLIC_KEY: 'your_public_key'      // ← Replace with your Public Key
};
```

## Step 6: Test the Integration

1. Run your development server: `npm run dev`
2. Fill out a form on your website
3. Submit the form
4. Check **harish@aquataurustech.com** for the email
5. Check browser console for any errors

## 🚀 Alternative: Quick Setup with Resend

If you want a more robust solution, here's how to set up Resend:

### 1. Create Resend Account
- Go to [https://resend.com](https://resend.com)
- Sign up and verify your domain or use their subdomain
- Get your API key

### 2. Create Vercel API Route
```typescript
// pages/api/contact.ts or app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    await resend.emails.send({
      from: 'noreply@yoursite.com',
      to: 'harish@aquataurustech.com',
      subject: `New ${data.type} form submission`,
      html: formatEmailHTML(data)
    });
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
```

## 📊 Comparison

| Service | Setup Time | Free Tier | Deliverability | Backend Required |
|---------|------------|-----------|----------------|------------------|
| **EmailJS** | 10 mins | 200/month | Good | ❌ No |
| **Resend** | 20 mins | 3,000/month | Excellent | ✅ Yes |
| **SendGrid** | 30 mins | 100/day | Excellent | ✅ Yes |

## 🛟 Need Help?

If you run into any issues:
1. Check the browser console for error messages
2. Verify all IDs are correct in the config
3. Make sure your email service is properly connected
4. Test the EmailJS template directly in their dashboard first

**Recommended**: Start with EmailJS since it requires no backend setup!