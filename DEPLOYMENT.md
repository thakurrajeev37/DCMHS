# Deployment Guide for DCMHS Portal

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account for production database
- Environment variables ready

## Environment Variables

You need to set up the following environment variables in Vercel:

### Required Variables:
1. `MONGODB_URI` - Your MongoDB connection string
2. `JWT_SECRET` - Secret key for JWT token generation
3. `VITE_INSTAGRAM_ACCESS_TOKEN` - Instagram API access token
4. `VITE_INSTAGRAM_USER_ID` - Instagram user ID
5. `VITE_FACEBOOK_ACCESS_TOKEN` - Facebook API access token
6. `VITE_FACEBOOK_PAGE_ID` - Facebook page ID
7. `NODE_ENV=production`

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel:**
   ```bash
   npx vercel login
   ```

2. **Deploy to Vercel:**
   ```bash
   npx vercel
   ```
   - Follow the prompts to link your project
   - Answer the setup questions:
     - Set up and deploy? **Yes**
     - Which scope? Select your account
     - Link to existing project? **No**
     - Project name? **dcmhs-portal** (or your preferred name)
     - Directory? **./** (press Enter)
     - Override settings? **No**

3. **Add Environment Variables:**
   ```bash
   npx vercel env add MONGODB_URI
   npx vercel env add JWT_SECRET
   npx vercel env add VITE_INSTAGRAM_ACCESS_TOKEN
   npx vercel env add VITE_INSTAGRAM_USER_ID
   npx vercel env add VITE_FACEBOOK_ACCESS_TOKEN
   npx vercel env add VITE_FACEBOOK_PAGE_ID
   npx vercel env add NODE_ENV
   ```
   
   Or add them via Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add each variable for Production, Preview, and Development

4. **Deploy to Production:**
   ```bash
   npx vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Connect Repository:**
   - Go to https://vercel.com/new
   - Import your Git repository (GitHub, GitLab, or Bitbucket)
   - Select your DCMHS repository

2. **Configure Project:**
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist/client`
   - Install Command: `npm install`

3. **Add Environment Variables:**
   - In the "Environment Variables" section, add all required variables
   - Make sure to select "Production", "Preview", and "Development" environments

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

## Post-Deployment

### Verify Deployment:
1. Check if the site is accessible at the Vercel URL
2. Test the following:
   - Homepage loads correctly
   - Authentication (login/register)
   - Admin dashboard (if you're an admin)
   - Events page
   - Social media feeds (Instagram/Facebook)

### Common Issues:

**Issue: MongoDB Connection Failed**
- Solution: Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` for Vercel's dynamic IPs
- Or use MongoDB Atlas's "Allow access from anywhere" option

**Issue: Environment Variables Not Working**
- Solution: Redeploy after adding environment variables
- Run: `npx vercel --prod` to trigger a new deployment

**Issue: Build Fails**
- Solution: Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`

## MongoDB Atlas Setup

If you haven't set up MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Go to "Database Access" and create a database user
4. Go to "Network Access" and add `0.0.0.0/0` to IP whitelist
5. Get your connection string from "Connect" → "Connect your application"
6. Replace `<password>` with your database user password
7. Use this as your `MONGODB_URI` environment variable

## Continuous Deployment

Once connected to Git:
- Every push to your main/master branch will trigger a production deployment
- Pull requests will create preview deployments
- You can configure branch deployments in Vercel settings

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Monitoring

- View deployment logs in Vercel Dashboard
- Check function logs for API errors
- Use Vercel Analytics for performance monitoring

## Support

For issues:
- Check Vercel documentation: https://vercel.com/docs
- MongoDB Atlas support: https://www.mongodb.com/docs/atlas/
- GitHub Issues: Create an issue in your repository
