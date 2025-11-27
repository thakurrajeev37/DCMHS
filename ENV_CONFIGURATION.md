# Environment Configuration Guide

This project uses different environment files for different stages of development.

## Environment Files

### `.env` (Default/Local Development)
- Used when no specific environment is set
- Default configuration for local development
- **Not committed to git**

### `.env.development` (Development)
- Used when `NODE_ENV=development`
- Contains development-specific configuration
- Uses development database (`school-db-dev`)
- Debug mode enabled
- **Not committed to git**

### `.env.test` (Testing)
- Used when `NODE_ENV=test`
- Contains test-specific configuration
- Uses separate test database (`school-db-test`)
- Runs on port 3001 to avoid conflicts
- **Not committed to git**

### `.env.production` (Production)
- Used when `NODE_ENV=production`
- Contains production configuration
- Uses production database (`school-db`)
- Debug mode disabled
- **Not committed to git**

### `.env.example` (Template)
- Template file showing all required environment variables
- **Committed to git** for reference
- Copy this to create your own `.env` files

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development`, `test`, `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `MONGO_URI` | Alternative MongoDB URI | Same as MONGODB_URI |
| `JWT_SECRET` | Secret key for JWT tokens | Random secure string |
| `PORT` | Server port | `3000` |

### Optional Variables (Social Media)

| Variable | Description |
|----------|-------------|
| `VITE_INSTAGRAM_ACCESS_TOKEN` | Instagram API access token |
| `VITE_INSTAGRAM_USER_ID` | Instagram user ID |
| `VITE_FACEBOOK_ACCESS_TOKEN` | Facebook Page access token |
| `VITE_FACEBOOK_PAGE_ID` | Facebook page ID |

### Debug Variables

| Variable | Description | Values |
|----------|-------------|--------|
| `DEBUG` | Enable debug mode | `true`, `false` |
| `LOG_LEVEL` | Logging level | `debug`, `info`, `warn`, `error` |

## Usage

### Running in Different Environments

```bash
# Development
NODE_ENV=development npm run dev

# Test
NODE_ENV=test npm run dev

# Production
NODE_ENV=production npm start
```

### NPM Scripts

The package.json already includes scripts for different environments:

```bash
# Development (uses .env.development)
npm run dev

# Production (uses .env.production)
npm start

# Build for production
npm run build
```

## Setup Instructions

### 1. First Time Setup

```bash
# Copy the example file
cp .env.example .env

# Or create environment-specific files
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

### 2. Configure Variables

Edit each `.env.*` file and set your specific values:

**Development (.env.development):**
- Use development database
- Use test/development API tokens
- Enable debug mode

**Test (.env.test):**
- Use separate test database
- Use test API tokens
- Different port to avoid conflicts

**Production (.env.production):**
- Use production database
- Use long-lived API tokens
- Disable debug mode
- **IMPORTANT:** Use strong, unique JWT_SECRET

### 3. Vercel Deployment

For Vercel (production), set environment variables in the dashboard:

```bash
# Or use Vercel CLI
npx vercel env add MONGODB_URI production
npx vercel env add JWT_SECRET production
npx vercel env add MONGO_URI production
npx vercel env add VITE_INSTAGRAM_ACCESS_TOKEN production
npx vercel env add VITE_INSTAGRAM_USER_ID production
npx vercel env add VITE_FACEBOOK_ACCESS_TOKEN production
npx vercel env add VITE_FACEBOOK_PAGE_ID production
```

## Database Configuration

### Development
Database: `school-db-dev`
- Use for development and testing locally
- Can be reset/cleared without affecting production

### Test
Database: `school-db-test`
- Use for automated testing
- Separate from development to avoid data conflicts

### Production
Database: `school-db`
- Production data
- **Never use in development**
- Ensure proper backups

## Security Best Practices

1. **Never commit `.env` files to git**
   - All environment files are in `.gitignore`
   - Only `.env.example` should be committed

2. **Use strong secrets in production**
   - Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Use different secrets for each environment

3. **Rotate API tokens regularly**
   - Instagram tokens expire after 60 days
   - Facebook tokens should be refreshed
   - Use long-lived tokens in production

4. **Separate databases per environment**
   - Prevents accidental data corruption
   - Allows safe testing and development

5. **MongoDB Atlas Security**
   - Whitelist IPs appropriately
   - Use strong passwords
   - Enable auditing for production

## Troubleshooting

### Environment variables not loading
- Make sure `dotenv` is installed: `npm install dotenv`
- Check file naming: `.env.development` not `.env-development`
- Verify NODE_ENV is set correctly

### Wrong database being used
- Check which `.env.*` file is being loaded
- Verify MONGODB_URI is correct
- Check console logs: `[Env] Loaded environment config from .env.{env}`

### API tokens not working
- Verify tokens haven't expired
- Check token format (no extra spaces)
- Test tokens with `node test-tokens.js`

## Files Structure

```
project/
├── .env                    # Default/local (not in git)
├── .env.development        # Development config (not in git)
├── .env.test              # Test config (not in git)
├── .env.production        # Production config (not in git)
├── .env.example           # Template (in git)
└── .gitignore             # Excludes all .env files except .env.example
```

## Additional Resources

- [MongoDB Atlas Setup](./DEPLOYMENT.md#mongodb-atlas-setup)
- [Instagram API Setup](./INSTAGRAM_API_SETUP.md)
- [Facebook API Setup](./FACEBOOK_API_SETUP.md)
- [Vercel Deployment](./DEPLOYMENT.md)
