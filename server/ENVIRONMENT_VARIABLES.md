# Environment Variables Required for Deployment

## Database
- `MONGODB_URI` - Your MongoDB connection string (required)

## Frontend URL
- `FRONTEND_URL` - Your frontend domain (e.g., https://your-app.vercel.app)

## JWT Tokens
- `SECRET_KEY_ACCESS_TOKEN` - Secret key for access tokens
- `SECRET_KEY_REFRESH_TOKEN` - Secret key for refresh tokens

## Cloudinary (for image uploads)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET_KEY` - Your Cloudinary API secret

## Email (Resend)
- `RESEND_API` - Your Resend API key

## Stripe (for payments)
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_ENPOINT_WEBHOOK_SECRET_KEY` - Your Stripe webhook secret

## Optional
- `PORT` - Server port (defaults to 8080)
- `NODE_ENV` - Environment (production/development)

## How to set in Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with its corresponding value
5. Redeploy your application

## Testing your deployment:
1. Visit `https://your-domain.vercel.app/health` to check if the server is running
2. Check the Vercel function logs for any errors
3. Ensure all environment variables are properly set 