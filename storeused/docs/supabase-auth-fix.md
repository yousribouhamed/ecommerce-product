# Troubleshooting Supabase Email Confirmation

If you are not receiving confirmation emails during sign-up, follow these steps to diagnose and fix the issue.

## 1. Check Supabase Auth Logs
The most direct way to see if Supabase attempted to send an email is the logs:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication** > **Logs**.
3. Look for "Sign Up" or "Email Sent" events. If there is a red error icon, click it to see the delivery failure reason.

## 2. Disable Email Confirmation for Development
If you just want to test your application without waiting for emails:
1. Go to **Authentication** > **Providers**.
2. Expand the **Email** provider.
3. Toggle **Confirm email** to **OFF**.
4. Save changes.
*Now users will be automatically confirmed upon sign-up.*

## 3. Configure Custom SMTP (Production)
Supabase's built-in email provider has a strict rate limit (3 emails per hour per project) and may be blocked by some spam filters. For production:
1. Go to **Authentication** > **Auth Settings**.
2. Scroll down to **SMTP Settings**.
3. Toggle **Enable Custom SMTP** to **ON**.
4. Enter your SMTP credentials (using a service like Resend, SendGrid, or AWS SES).

## 4. Check Redirect URLs
Ensure your redirect URL is configured in **Authentication** > **URL Configuration**:
- **Site URL**: `http://localhost:3002`
- **Redirect URLs**: Add `http://localhost:3002/**`
