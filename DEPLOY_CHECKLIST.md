# Quick Deployment Checklist ✅

## Step-by-Step Deployment (Recommended for Beginners)

### Phase 1: Prepare Your Code (5 minutes)

- [x] ✅ Code updated for production (already done!)
- [x] ✅ MongoDB Atlas ready with connection string
- [x] ✅ `.gitignore` protecting sensitive files

### Phase 2: Deploy Backend on Render (10 minutes)

1. **Go to Render**: https://render.com/
2. **Sign up/Login** with GitHub
3. Click **"New +"** → **"Web Service"**
4. **Connect Repository**: `Mayank-5362/task-manager`
5. **Configure**:
   - Name: `task-manager-backend`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   
6. **Add Environment Variables** (click "Advanced"):
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://mynkverma4896_db_user:FEBHjuICGIM0MOH3@taskmanager-cluster.treduou.mongodb.net/taskmanager?retryWrites=true&w=majority
   JWT_SECRET=7988920526f297fb286fc94fc2411a68e6d7a815dc7b41e918c188be62942b12ae954f8d4a1c991bf72edd2684f5b76bc5e7588526fe30a50945c8bdddb4c9e4
   NODE_ENV=production
   ```

7. Click **"Create Web Service"**
8. **Wait 2-3 minutes** for deployment
9. **Copy your backend URL**: `https://task-manager-backend-xxxx.onrender.com`

### Phase 3: Deploy Frontend on Vercel (5 minutes)

1. **Go to Vercel**: https://vercel.com/
2. **Login** with GitHub
3. Click **"Add New..."** → **"Project"**
4. **Import** `Mayank-5362/task-manager`
5. **Configure**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)

6. **Environment Variables**:
   ```
   VITE_API_URL=https://task-manager-backend-xxxx.onrender.com
   ```
   (Use your actual backend URL from Step 2)

7. Click **"Deploy"**
8. **Wait 1-2 minutes**
9. **Visit your live app**: `https://task-manager-xxx.vercel.app`

### Phase 4: Final Configuration (2 minutes)

1. **Update Backend CORS**:
   - Go to Render → Your backend service → Environment
   - Add new variable:
     ```
     FRONTEND_URL=https://task-manager-xxx.vercel.app
     ```
   - Save and redeploy

2. **Test Your Deployed App**:
   - ✅ Visit your Vercel URL
   - ✅ Sign up with a new account
   - ✅ Create a task
   - ✅ Create a team
   - ✅ Check MongoDB Atlas to verify data is saving

---

## Alternative: Deploy Everything on Render (15 minutes)

### Backend (Same as above)

### Frontend on Render:

1. Click **"New +"** → **"Static Site"**
2. Connect `Mayank-5362/task-manager`
3. Configure:
   - Name: `task-manager-frontend`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. Environment Variable:
   ```
   VITE_API_URL=https://task-manager-backend-xxxx.onrender.com
   ```

5. Deploy!

---

## Cost Breakdown

| Service | What | Cost |
|---------|------|------|
| **Render (Backend)** | Node.js API | **FREE** (750 hrs/month) |
| **Vercel (Frontend)** | React App | **FREE** (unlimited) |
| **MongoDB Atlas** | Database | **FREE** (512 MB) |
| **TOTAL** | Full Stack App | **$0/month** |

---

## Important Notes

⚠️ **Render Free Tier**: Spins down after 15 minutes of inactivity. First request after inactivity takes ~30 seconds to wake up.

💡 **Pro Tip**: After deployment, enable **Auto-Deploy** on both platforms. Every time you push to GitHub, your app auto-updates!

🔒 **Security**: Your `.env` file is NOT uploaded to GitHub (protected by `.gitignore`). You manually add environment variables on hosting platforms.

---

## Need Help?

**Issue**: Backend deployment fails  
**Solution**: Check Render logs, ensure `package.json` has `"start": "node server.js"`

**Issue**: Frontend shows blank page  
**Solution**: Check browser console, ensure `VITE_API_URL` is set correctly

**Issue**: CORS errors  
**Solution**: Add your Vercel URL to backend CORS configuration

---

## After Deployment

1. **Share your app**: `https://your-app.vercel.app`
2. **Update GitHub README** with live demo link
3. **Monitor**: Check Render and Vercel dashboards for errors
4. **Scale**: Upgrade to paid plans when you get more users

---

**Ready to deploy?** Start with Phase 1! 🚀
