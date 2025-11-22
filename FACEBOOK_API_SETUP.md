# Facebook API Setup Guide

This guide will help you get your Facebook Access Token and Page ID to display Facebook posts on your website.

## Prerequisites
- A Facebook account
- A Facebook Page (for your school)
- Admin access to the Facebook Page

## 🚀 Quick Start (5 Minutes)

**The key issue**: You need a **Page Access Token**, NOT a User Access Token!

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app (or create one if needed)
3. Click "Generate Access Token" → Grant permissions: `pages_show_list`, `pages_read_engagement`, `pages_read_user_content`
4. **Important**: Type `me/accounts` in the query box and click Submit
5. Find your page in the results and copy:
   - `access_token` → This is your **VITE_FACEBOOK_ACCESS_TOKEN** ✅
   - `id` → This is your **VITE_FACEBOOK_PAGE_ID** ✅
6. Verify at [Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/) - Type should be "Page"
7. Update your `.env` file and restart dev server

---

## Step-by-Step Guide

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Click **"My Apps"** in the top right corner
3. Click **"Create App"**
4. **Choose the app type**: Select one of these options (in order of preference):
   - **"Other"** (Recommended) - Then select "Business" on the next screen
   - **"Business"** - If "Other" is not available
   - **"Consumer"** - If the above options are not available
   
   > 💡 **Note**: Facebook frequently changes these options. Choose whichever option allows you to access the Graph API and read page content.

5. Click **"Next"**
6. Fill in the app details:
   - **App Name**: DC Modern High School Website (or your school name)
   - **App Contact Email**: Your email address
   - **Business Account** (optional): Can be skipped for now
7. Click **"Create App"**
8. You may need to complete a security check (CAPTCHA)

### Step 2: Add Your Facebook Page

1. In your app dashboard, go to **"App Settings"** → **"Basic"**
2. Scroll down and click **"Add Platform"**
3. Choose **"Website"**
4. Enter your website URL (or use `http://localhost:3000` for development)
5. Click **"Save Changes"**

### Step 3: Get Your Facebook Page ID

There are multiple ways to get your Page ID:

#### Method 1: From Facebook Page Settings
1. Go to your Facebook Page
2. Click **"Settings"** in the left menu
3. Click **"Page Info"** 
4. Look for **"Page ID"** - it's a numeric value (e.g., `123456789012345`)

#### Method 2: From Page URL
1. Go to your Facebook Page
2. Look at the URL. If it's:
   - `facebook.com/YourPageName` - you need to use Method 1
   - `facebook.com/profile.php?id=123456789` - the number after `id=` is your Page ID

#### Method 3: Using Graph API Explorer
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. In the query box, type: `me?fields=id,name`
3. Click **"Submit"**
4. The response will show your Page ID

### Step 4: Generate a Page Access Token

#### Option A: Using Graph API Explorer (Recommended - Get Page Token Directly)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)

2. **Select your app** from the dropdown in the top right

3. **Get User Access Token**:
   - Click **"Generate Access Token"**
   - In the permissions dialog, check:
     - ✅ **"pages_show_list"**
     - ✅ **"pages_read_engagement"**
     - ✅ **"pages_read_user_content"**
   - Click **"Generate Access Token"**
   - Authorize and copy this token temporarily

4. **Get Page Access Token** (IMPORTANT):
   - In the Graph API Explorer query box, type: `me/accounts`
   - Click **"Submit"**
   - You'll see a list of pages you manage
   - Find your school's page in the results
   - Copy the **`access_token`** value for your page (this is the PAGE token you need)
   - Also copy the **`id`** value (this is your Page ID)

5. **Verify it's a Page Token**:
   - Go to [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
   - Paste your token
   - Under "Type" it should say **"Page"** (not "User")
   
**Note**: Page tokens from this method expire in 60 days. Use Option B for never-expiring tokens.

#### Option B: Get Long-Lived Page Access Token (Recommended)

1. **Get a User Access Token** (from Option A above)

2. **Convert to Long-Lived User Token**:
   - Open your browser and visit this URL (replace the values):
   ```
   https://graph.facebook.com/v18.0/oauth/access_token?
   grant_type=fb_exchange_token&
   client_id={YOUR_APP_ID}&
   client_secret={YOUR_APP_SECRET}&
   fb_exchange_token={SHORT_LIVED_TOKEN}
   ```
   
   Where:
   - `YOUR_APP_ID`: Found in App Dashboard → Settings → Basic
   - `YOUR_APP_SECRET`: Found in App Dashboard → Settings → Basic (Click "Show")
   - `SHORT_LIVED_TOKEN`: The token from Step 1

3. **Get Your Page ID and Page Access Token**:
   - Visit this URL (replace with your long-lived user token):
   ```
   https://graph.facebook.com/v18.0/me/accounts?access_token={LONG_LIVED_USER_TOKEN}
   ```
   
   - This will return a list of pages you manage
   - Find your page in the list and copy:
     - `id` - This is your **Page ID**
     - `access_token` - This is your **Long-Lived Page Access Token**

### Step 5: Test Your Credentials

Test if your token works by visiting this URL in your browser:
```
https://graph.facebook.com/v18.0/{YOUR_PAGE_ID}/feed?access_token={YOUR_ACCESS_TOKEN}&limit=5
```

You should see a JSON response with your recent Facebook posts.

### Step 6: Update Your .env File

1. Open `/Users/rajeevkumar/Desktop/workspace/DCMHS/.env`
2. Replace the placeholder values:

```env
VITE_FACEBOOK_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FACEBOOK_PAGE_ID=123456789012345
```

3. Save the file
4. Restart your development server:
```bash
npm run dev
```

## Important Notes

### Token Expiration
- **Short-lived tokens**: Expire in 1-2 hours
- **Long-lived user tokens**: Expire in 60 days
- **Long-lived page tokens**: Never expire (unless you change your password or app permissions)

### Security Best Practices

1. **Never commit .env to Git**
   - The `.env` file is already in `.gitignore`
   - Never share your access tokens publicly

2. **Use Environment Variables in Production**
   - Store tokens in your hosting platform's environment variables
   - Don't hardcode tokens in your code

3. **Regenerate Tokens If Compromised**
   - If you accidentally expose a token, regenerate it immediately
   - Go to Graph API Explorer and generate a new token

### Required Permissions

Your access token needs these permissions:
- `pages_read_engagement` - Read posts and engagement data
- `pages_show_list` - List pages you manage

### Token Validation

To check if your token is valid and see when it expires:
1. Go to [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
2. Paste your access token
3. Click **"Debug"**
4. You'll see:
   - Token validity
   - Expiration date
   - Permissions granted
   - Associated app and user

## Troubleshooting

### Error: "Invalid OAuth access token"
- Your token has expired or is invalid
- Generate a new token following the steps above

### Error: "Unsupported get request"
- Your Page ID is incorrect
- Verify your Page ID using Method 3 in Step 3

### Error: "Missing permissions"
- Your token doesn't have the required permissions
- Regenerate the token and ensure you select `pages_read_engagement`

### No posts showing up
- Check if your Facebook Page has public posts
- Verify the token and Page ID are correct
- Check browser console for error messages
- Use the test URL in Step 5 to verify the API is working

## Alternative: Using Facebook Page Plugin

If you prefer a simpler solution without API tokens:

1. Go to [Facebook Page Plugin](https://developers.facebook.com/docs/plugins/page-plugin)
2. Enter your Facebook Page URL
3. Customize the settings (show timeline, events, messages)
4. Copy the generated code
5. Embed it in your website

This doesn't require access tokens but has limited customization options.

## Resources

- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Facebook Page Access Tokens](https://developers.facebook.com/docs/pages/access-tokens)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
- [Facebook for Developers](https://developers.facebook.com)

## Need Help?

If you encounter issues:
1. Check the [Facebook Developer Community](https://developers.facebook.com/community/)
2. Review the error messages in your browser console
3. Use the Access Token Debugger to verify your token
4. Ensure your Facebook Page has public posts
