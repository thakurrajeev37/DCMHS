// Test Facebook API Connection
// Run this in browser console or as a Node.js script

const FACEBOOK_TOKEN = "EAAQrZCUhkbm0BQDjj1bquA9hPlumXjc2vVchKjihmp60pRWCZCl4w3e5pte3NgamanveayNu0dYKcoLnUcutCdU39NfDONhcOJFyzon9QDLeNQG9bHwyyDxCU2lFbQVmk27N2wnIqTKjDiIa1db4cNxId1zqZBZAtAkSQxZBcBByhn8g11WHH2nkbymtOE3N2XjrVzRPxxcGZBZCsk6VVH0Qb4vOWe11GnLpGUjmiZCZB7UmhneD8XmcgvsOwp097czyS6wRVZAGokXLXVULEZD";
const FACEBOOK_PAGE_ID = "905193089573280";

// Test URL
const testUrl = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/feed?access_token=${FACEBOOK_TOKEN}&fields=id,message,created_time,full_picture,permalink_url&limit=5`;

console.log("Testing Facebook API...");
console.log("Test URL:", testUrl);

fetch(testUrl)
  .then(response => response.json())
  .then(data => {
    console.log("Success! Response:", data);
    if (data.data && data.data.length > 0) {
      console.log(`Found ${data.data.length} posts`);
      console.log("First post:", data.data[0]);
    } else {
      console.log("No posts found in response");
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });

// You can also paste this URL directly in your browser:
console.log("\nOr paste this URL in your browser:");
console.log(testUrl);
