// Token validation utility
import axios from 'axios';

const INSTAGRAM_TOKEN = process.env.VITE_INSTAGRAM_ACCESS_TOKEN || 'IGAAdhjwJB8s5BZAFROU1F5d2tkQkxZARUNsX1N1Tk4yb3JXR254ZA2Q1RXg4NkxHUkVTNmNaOVhlUHNRT0dJRy03b2dSdkJabU1Tb2ZAXZAXdCeUl5MFVRbGpXcHZAsZA2xJUFdkWjYyMlAzSHl6bmpSQnZAPZA09JRk5wdU5zeFNDVjRNNAZDZD';
const INSTAGRAM_USER_ID = process.env.VITE_INSTAGRAM_USER_ID || '17841473300901917';
const FACEBOOK_TOKEN = process.env.VITE_FACEBOOK_ACCESS_TOKEN || 'EAAQrZCUhkbm0BQFNWZAPmAxbPLrDw4iYOJ3JReEg5ojLSgmGNEkCsNfVDslEByqdJ35ZAWX3TuympaJvIDeJX3e5NrBN4ek7fH65vwvWGMQhMaMAJYYzV2eZBs38ZAkilCrmYF4soZAh3FgtWZAOn7irJuikiZBmpaPGpASHdQBA906tZAgUrQLJwOt6J3yIDNQKE3j0PsuWE';
const FACEBOOK_PAGE_ID = process.env.VITE_FACEBOOK_PAGE_ID || '905193089573280';

console.log('\n🔍 Testing API Tokens...\n');

async function testInstagramToken() {
  console.log('📸 Testing Instagram Token...');
  try {
    const response = await axios.get(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media`,
      {
        params: {
          fields: 'id,caption,media_type,media_url,permalink',
          access_token: INSTAGRAM_TOKEN,
          limit: 1
        }
      }
    );
    
    console.log('✅ Instagram Token is VALID');
    console.log(`   Found ${response.data.data.length} posts`);
    return true;
  } catch (error) {
    console.error('❌ Instagram Token is INVALID');
    console.error('   Error:', error.response?.data?.error?.message || error.message);
    console.error('   Error Code:', error.response?.data?.error?.code);
    console.error('   Error Type:', error.response?.data?.error?.type);
    
    if (error.response?.data?.error?.code === 190) {
      console.error('\n📖 TOKEN EXPIRED! Follow these steps to get a new token:');
      console.error('   1. Go to: https://developers.facebook.com/apps/');
      console.error('   2. Select your app');
      console.error('   3. Go to Instagram Basic Display → Basic Display');
      console.error('   4. Scroll to "User Token Generator"');
      console.error('   5. Click "Generate Token" for your Instagram account');
      console.error('   6. Copy the token and run this to exchange for long-lived token:');
      console.error('      curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=SHORT_LIVED_TOKEN"');
      console.error('   7. Update VITE_INSTAGRAM_ACCESS_TOKEN in .env and Vercel');
    }
    return false;
  }
}

async function testFacebookToken() {
  console.log('\n📘 Testing Facebook Token...');
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}/posts`,
      {
        params: {
          fields: 'id,message,created_time',
          access_token: FACEBOOK_TOKEN,
          limit: 1
        }
      }
    );
    
    console.log('✅ Facebook Token is VALID');
    console.log(`   Found ${response.data.data.length} posts`);
    return true;
  } catch (error) {
    console.error('❌ Facebook Token is INVALID');
    console.error('   Error:', error.response?.data?.error?.message || error.message);
    console.error('   Error Code:', error.response?.data?.error?.code);
    console.error('   Error Type:', error.response?.data?.error?.type);
    
    if (error.response?.data?.error?.code === 190) {
      console.error('\n📖 TOKEN EXPIRED! Follow these steps to get a new token:');
      console.error('   1. Go to: https://developers.facebook.com/tools/explorer/');
      console.error('   2. Select your app from dropdown');
      console.error('   3. Click "Generate Access Token"');
      console.error('   4. Select permissions: pages_show_list, pages_read_engagement, pages_read_user_content');
      console.error('   5. In the query box, type: me/accounts');
      console.error('   6. Click Submit');
      console.error('   7. Find your page in the response and copy its "access_token"');
      console.error('   8. Update VITE_FACEBOOK_ACCESS_TOKEN in .env and Vercel');
    }
    return false;
  }
}

async function checkTokenExpiry() {
  console.log('\n⏰ Checking Token Expiration...');
  
  // Check Instagram token
  try {
    const igDebug = await axios.get(
      `https://graph.facebook.com/v21.0/debug_token`,
      {
        params: {
          input_token: INSTAGRAM_TOKEN,
          access_token: INSTAGRAM_TOKEN
        }
      }
    );
    
    const expiresAt = igDebug.data.data.expires_at;
    if (expiresAt === 0) {
      console.log('✅ Instagram Token: Never expires');
    } else {
      const expiryDate = new Date(expiresAt * 1000);
      console.log(`📅 Instagram Token expires: ${expiryDate.toLocaleString()}`);
    }
  } catch (error) {
    console.error('⚠️  Could not check Instagram token expiry');
  }
}

async function runTests() {
  const instagramValid = await testInstagramToken();
  const facebookValid = await testFacebookToken();
  await checkTokenExpiry();
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`Instagram: ${instagramValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`Facebook:  ${facebookValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log('='.repeat(60) + '\n');
  
  if (!instagramValid || !facebookValid) {
    console.log('🔧 ACTION REQUIRED:');
    console.log('   1. Generate new tokens following the instructions above');
    console.log('   2. Update .env file with new tokens');
    console.log('   3. Test locally: npm run dev');
    console.log('   4. Update Vercel environment variables:');
    console.log('      npx vercel env rm VITE_INSTAGRAM_ACCESS_TOKEN production');
    console.log('      npx vercel env add VITE_INSTAGRAM_ACCESS_TOKEN production');
    console.log('      npx vercel env rm VITE_FACEBOOK_ACCESS_TOKEN production');
    console.log('      npx vercel env add VITE_FACEBOOK_ACCESS_TOKEN production');
    console.log('   5. Redeploy: npx vercel --prod\n');
  } else {
    console.log('✅ All tokens are valid! If feeds still not showing:');
    console.log('   1. Clear browser cache and hard refresh (Ctrl+Shift+R)');
    console.log('   2. Check browser console for errors');
    console.log('   3. Verify environment variables in Vercel dashboard\n');
  }
}

runTests();
