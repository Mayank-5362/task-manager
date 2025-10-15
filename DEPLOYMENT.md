# Deployment Guide - Task Manager

## Quick Deployment Options

### Option 1: Render (Recommended - Free & Easy)

**Deploy Backend & Frontend on Render**

#### Backend Deployment:

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Mayank-5362/task-manager`
4. Configure:
   - **Name**: `task-manager-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_from_local_env
   NODE_ENV=production
   ```

6. Click **"Create Web Service"**
7. Copy your backend URL (e.g., `https://task-manager-api.onrender.com`)

#### Frontend Deployment:

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `task-manager-app`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://task-manager-api.onrender.com
   ```

5. Update `client/src/utils/api.js` to use `VITE_API_URL`

---

### Option 2: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel (Best for React apps):**

1. Go to https://vercel.com and login with GitHub
2. Click **"Add New Project"**
3. Import `Mayank-5362/task-manager`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=your_backend_url
   ```

6. Deploy!

**Backend on Render:** (Follow steps from Option 1)

---

### Option 3: Railway (Full Stack - Easiest)

1. Go to https://railway.app and login with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `Mayank-5362/task-manager`

**Backend Service:**
- Railway auto-detects Node.js
- Set Root Directory: `server`
- Add environment variables (same as above)

**Frontend Service:**
- Add new service from same repo
- Set Root Directory: `client`
- Add build command: `npm run build`

---

## Pre-Deployment Checklist

### 1. Update Backend for Production

**File: `server/server.js`** - Add CORS for your frontend:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app',
    'https://your-frontend-domain.onrender.com'
  ],
  credentials: true
}));
```

### 2. Update Frontend API URL

**File: `client/src/utils/api.js`** - Use environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  // ... rest of config
});
```

### 3. Ensure MongoDB Atlas is Production-Ready

- ✅ Whitelist IP: `0.0.0.0/0` (allow all)
- ✅ Create production database user
- ✅ Use connection string with `retryWrites=true&w=majority`

### 4. Update package.json Scripts

**File: `server/package.json`** - Add production start:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

**File: `client/package.json`** - Ensure build script exists:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Environment Variables Needed

### Backend (.env on hosting platform):
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_long_secret_key_minimum_64_characters
NODE_ENV=production
```

### Frontend (on hosting platform):
```env
VITE_API_URL=https://your-backend-url.com
```

---

## After Deployment

1. **Test Authentication**: Sign up and login
2. **Test Task Creation**: Create private and team tasks
3. **Test Team Features**: Create/join teams
4. **Check Database**: Verify data is being saved to MongoDB Atlas

---

## Common Deployment Issues

### Issue 1: CORS Error
**Solution**: Add your frontend URL to backend CORS configuration

### Issue 2: API calls fail
**Solution**: Check `VITE_API_URL` is set correctly and backend is running

### Issue 3: MongoDB Connection Failed
**Solution**: 
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string has correct username/password
- Ensure database name is included in URI

### Issue 4: Environment variables not working
**Solution**: Restart the service after adding/updating env vars

---

## Quick Deployment (Recommended Path)

**For beginners, use this simple approach:**

1. **Backend**: Deploy on Render (Free tier, auto-deploy from GitHub)
2. **Frontend**: Deploy on Vercel (Free tier, optimized for React/Vite)
3. **Database**: Already on MongoDB Atlas ✅

**Total cost**: $0 (all free tiers)

**Deployment time**: ~15 minutes

---

## Free Tier Limits

| Platform | Backend | Frontend | Database |
|----------|---------|----------|----------|
| **Render** | 750 hrs/month | Unlimited | - |
| **Vercel** | - | Unlimited builds | - |
| **Railway** | $5 free credit/month | $5 free credit/month | - |
| **MongoDB Atlas** | - | - | 512 MB (M0 Free) |

---

## Need Help?

**Render Docs**: https://render.com/docs  
**Vercel Docs**: https://vercel.com/docs  
**Railway Docs**: https://docs.railway.app  

---

**Pro Tip**: After first deployment, enable auto-deploy from GitHub. Every time you push to `main` branch, your app will automatically redeploy! 🚀
