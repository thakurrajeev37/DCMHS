# Instagram API Integration Guide

This guide will help you set up Instagram Basic Display API to display your school's Instagram posts on the website.

## Prerequisites
- A Facebook Developer Account
- An Instagram Business or Creator Account
- Access to your Instagram account

## Step-by-Step Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Consumer"** as the app type
4. Fill in the app details:
   - **App Name**: DC Modern High School Website
   - **App Contact Email**: Your email
5. Click **"Create App"**

### 2. Add Instagram Basic Display

1. In your app dashboard, scroll down to **"Add Products"**
2. Find **"Instagram Basic Display"** and click **"Set Up"**
3. Click **"Create New App"** in the Instagram Basic Display settings
4. Fill in the required fields:
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
5. Click **"Save Changes"**

### 3. Add Instagram Tester

1. Go to **"Basic Display"** → **"User Token Generator"**
2. Click **"Add or Remove Instagram Testers"**
3. Enter your Instagram username
4. Log into your Instagram account and accept the tester invite:
   - Go to Instagram Settings → Apps and Websites → Tester Invites
   - Accept the invite

### 4. Generate Access Token

1. Go back to **"Basic Display"** → **"User Token Generator"**
2. Click **"Generate Token"** next to your Instagram account
3. Log in to Instagram and authorize the app
4. Copy the generated **Access Token** (it will look like a long string of characters)
5. Copy your **Instagram User ID** (displayed along with the token)

### 5. Configure Your App

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_INSTAGRAM_ACCESS_TOKEN=your_actual_access_token_here
VITE_INSTAGRAM_USER_ID=your_actual_user_id_here
```

3. Save the file
4. Restart your development server:
```bash
npm run dev
```

## Access Token Expiration

**Important**: Instagram Basic Display API tokens expire after 60 days. You have two options:

### Option A: Generate Long-Lived Token (Recommended)

Long-lived tokens last for 60 days and can be refreshed.

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={your-access-token}"
```

### Option B: Automatic Token Refresh

For production, implement automatic token refresh:

1. Store the token expiration date
2. Set up a cron job or scheduled task to refresh the token before it expires
3. Use the refresh endpoint to get a new token

## Troubleshooting

### Error: "Instagram API credentials not configured"
- Make sure you've set the environment variables in `.env`
- Restart your development server after updating `.env`

### Error: "Invalid Access Token"
- Token may have expired (tokens expire after 60 days)
- Generate a new token following steps 4-5 above

### Error: "OAuthException"
- Make sure your Instagram account accepted the tester invite
- Verify the app is in Development Mode (not Live)
- Check that you're using the correct User ID

### Posts Not Showing
- Verify your Instagram account has public posts
- Check that the account is set as Business or Creator
- Ensure you've accepted the tester invitation

## API Limitations

- **Rate Limits**: 200 calls per hour per user
- **Post Limit**: Can fetch up to 10,000 posts
- **Token Expiry**: Tokens expire after 60 days
- **Development Mode**: Limited to 25 users (testers)

## Going Live (Optional)

For production use with unlimited users:

1. Complete App Review in Facebook Developer Console
2. Submit your app for **"instagram_basic"** permission
3. Provide use case and demo video
4. Wait for Facebook's approval (usually 3-5 business days)

## Additional Resources

- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developer Console](https://developers.facebook.com/)
- [Instagram Graph API Reference](https://developers.facebook.com/docs/instagram-api)

## Security Notes

⚠️ **Important Security Practices:**

1. Never commit your `.env` file to version control
2. Add `.env` to your `.gitignore` file
3. Use environment variables for production deployment
4. Rotate tokens regularly
5. Monitor API usage in Facebook Developer Console

## Need Help?

If you encounter issues:
1. Check the [Facebook Developer Community](https://developers.facebook.com/community/)
2. Review the [API Changelog](https://developers.facebook.com/docs/instagram-basic-display-api/changelog)
3. Contact Facebook Developer Support
