# Task Manager - MERN Stack

Full-stack task management app with authentication, teams, and private/public tasks.

## Tech Stack

React + Vite + Tailwind | Node.js + Express | MongoDB

## Setup & Run

### 1. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Setup MongoDB

**MongoDB Atlas (Cloud - Recommended):**
1. Create account: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster → Create user → Allow IP 0.0.0.0/0
3. Get connection string

**Local MongoDB:**
1. Download: https://www.mongodb.com/try/download/community
2. Install and run: `net start MongoDB`

### 3. Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=run_command_below_and_paste_result
NODE_ENV=development
```

**For Atlas:** Use your connection string in `MONGODB_URI`  
**Generate JWT_SECRET:** `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### 4. Start App

**Terminal 1:** `cd server && npm run dev`  
**Terminal 2:** `cd client && npm run dev`

Open: **http://localhost:3000**

## Features

✅ Signup/Login with JWT  
✅ Create tasks (Private or Team)  
✅ Set priority & status  
✅ Join teams & collaborate  
✅ Admin dashboard  

## Troubleshooting

**Port 5000 in use:** `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force`  
**MongoDB error:** Check connection string and credentials  
**Frontend error:** Ensure backend is running on port 5000

---

Built with ❤️ using MERN Stack

## 🎨 Features Walkthrough

### 1. Authentication Flow
- Users sign up with name, email, and password (min 6 characters)
- Login provides JWT token stored in localStorage
- Protected routes check authentication status
- Automatic redirect to login if not authenticated

### 2. Task Management
- **Dashboard**: View all your tasks with filter options
- **Create Task**: Add tasks with title, description, due date, and priority
- **Private Tasks**: Toggle "Make this task private" to hide from team members
- **Edit Task**: Update task details, status, and privacy settings
- **Delete Task**: Remove tasks with confirmation
- **Priority Colors**:
  - 🟢 Low - Green
  - 🟡 Medium - Yellow
  - 🔴 High - Red
- **Task Status**: Pending → In Progress → Completed
- **Privacy Badge**: 🔒 Private badge shown on private tasks

### 3. Team Features
- **Create Team**: Become admin of a new team
- **Join Team**: Browse and join existing teams
- **View Members**: See all team members and admin
- **Leave Team**: Regular members can leave
- **Delete Team**: Only admin can delete team

### 4. Admin Dashboard
- View all **non-private** team tasks
- Edit any team member's task (except private tasks)
- Delete any team member's task (except private tasks)
- See team statistics (total, in-progress, completed)
- **Privacy Protection**: Admins cannot see other members' private tasks

## 🔐 Security Features

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens for stateless authentication
- Protected routes on both frontend and backend
- Role-based access control (Admin/User)
- Input validation on all forms
- Mongoose schema validation

## 🎯 User Permissions

### Regular User
- Create, read, update, delete **own tasks**
- Create **private tasks** (only visible to creator)
- Create **team tasks** (visible to all team members)
- Join/leave teams
- View team members
- View other members' **non-private** team tasks

### Team Admin
- All regular user permissions
- View all team members' **non-private** tasks
- Edit any team member's **non-private** task
- Delete any team member's **non-private** task
- Delete team
- **Cannot access** other members' private tasks (privacy protection)

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError: Could not connect"**

Solutions:
- **Local MongoDB**: Make sure MongoDB service is running
  ```bash
  # Windows
  net start MongoDB
  
  # Or start manually
  mongod --dbpath C:\data\db
  ```
- **MongoDB Atlas**: 
  - Check internet connection
  - Verify IP address is whitelisted (Network Access → 0.0.0.0/0)
  - Confirm username and password are correct
  - Ensure database name is included in connection string (`/taskmanager`)

### Port Already in Use

**Error: "EADDRINUSE: address already in use :::5000"**

Solutions:
```bash
# Find process using port 5000 (Windows PowerShell)
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess

# Stop the process (replace XXXX with process ID)
Stop-Process -Id XXXX -Force

# Or change PORT in server/.env
PORT=8000
```

Then update `client/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',  // Match your new port
    changeOrigin: true
  }
}
```

### CORS Errors
- Ensure backend is running on port 5000 (or your configured port)
- Check proxy configuration in `client/vite.config.js`
- Verify CORS is enabled in `server/server.js`

### Authentication Issues

**Error: "Invalid token" or "Authentication failed"**

Solutions:
- Clear browser localStorage: `localStorage.clear()`
- Logout and login again
- Check if JWT_SECRET matches between .env and running server
- Restart backend server after changing .env

### Frontend Not Loading

**Error: "Command 'vite' not found"**

Solutions:
```bash
cd client
npm install
npm run dev
```

### Database Shows No Collections

**Collections not appearing in MongoDB Compass/Atlas**

Solutions:
- Collections are created automatically when first document is added
- Create a user account in the app (Sign Up)
- Refresh MongoDB Compass or Atlas dashboard
- Check you're looking at the correct database name: `taskmanager`

### Special Characters in MongoDB Password

If your MongoDB Atlas password contains special characters, URL-encode them:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `!` → `%21`

Example:
```
Password: MyPass@123!
Encoded:  MyPass%40123%21
URI: mongodb+srv://user:MyPass%40123%21@cluster.mongodb.net/taskmanager
```
