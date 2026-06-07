# Admin Panel - Separate Deployment Setup

This directory contains files you need to create a **separate admin panel deployment**.

---

## 🎯 Goal

Deploy the admin panel as a completely independent application at `admin.sowwanpay.com` (or similar), separate from the main client website.

---

## 📁 Files in This Directory

1. **AdminApp.tsx** - The App.tsx for your admin project (with updated routes)
2. **package.json** - Dependencies for admin project
3. **README.md** - This file

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Admin Project Directory

```bash
# Go to parent directory
cd ..

# Create new admin project
mkdir sowwanpay-admin
cd sowwanpay-admin
```

### Step 2: Copy Package.json

```bash
# Copy the package.json from admin-project-setup
cp ../code/admin-project-setup/package.json .

# Install dependencies
pnpm install
```

### Step 3: Create Project Structure

```bash
# Create directory structure
mkdir -p src/app/pages
mkdir -p src/app/components
mkdir -p src/styles

# Create entry point
cat > src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SowwanPay Admin Panel</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Create tsconfig.node.json
cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
```

### Step 4: Copy Admin Files from Main Project

```bash
# Copy App.tsx (use the one from admin-project-setup)
cp ../code/admin-project-setup/AdminApp.tsx src/app/App.tsx

# Copy admin pages
cp ../code/src/app/pages/AdminLogin.tsx src/app/pages/
cp ../code/src/app/pages/AdminDashboard.tsx src/app/pages/
cp ../code/src/app/pages/ClientManagement.tsx src/app/pages/
cp ../code/src/app/pages/SubscriptionManagement.tsx src/app/pages/

# Copy admin nav component
cp ../code/src/app/components/AdminNav.tsx src/app/components/

# Copy styles
cp ../code/src/styles/globals.css src/styles/
cp ../code/src/styles/theme.css src/styles/ 2>/dev/null || true
```

### Step 5: Update Route References

**Important**: Update these files to use new routes without `/admin` prefix:

**In `src/app/pages/AdminLogin.tsx`:**
```typescript
// Change line where it navigates after login:
// FROM:
navigate('/admin/dashboard');

// TO:
navigate('/dashboard');
```

**In `src/app/pages/AdminDashboard.tsx`:**
```typescript
// Change the auth check redirect:
// FROM:
navigate('/admin');

// TO:
navigate('/login');
```

**In `src/app/pages/ClientManagement.tsx`:**
```typescript
// Change the auth check redirect:
// FROM:
navigate('/admin');

// TO:
navigate('/login');
```

**In `src/app/pages/SubscriptionManagement.tsx`:**
```typescript
// Change the auth check redirect:
// FROM:
navigate('/admin');

// TO:
navigate('/login');
```

**In `src/app/components/AdminNav.tsx`:**
```typescript
// Update menu items paths:
const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/clients', icon: Users, label: 'Clients' },
  { path: '/subscriptions', icon: CreditCard, label: 'Subscriptions' }
];

// Update logout function:
const handleLogout = () => {
  localStorage.removeItem('adminAuth');
  navigate('/login'); // Changed from '/admin'
};
```

---

## 🧪 Test Locally

```bash
# Start dev server
pnpm dev

# Open browser to http://localhost:5173
# You should see admin login page
```

---

## 🚀 Deploy to Vercel

### Step 1: Initialize Git

```bash
git init
git add .
git commit -m "Admin panel initial setup"
```

### Step 2: Create GitHub Repository

```bash
# Create new repo on GitHub: sowwanpay-admin
git remote add origin https://github.com/YOUR_USERNAME/sowwanpay-admin.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import `sowwanpay-admin` repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `pnpm build`
   - Output Directory: `dist`
5. Click "Deploy"

### Step 4: Configure Custom Domain

In Vercel project settings:
1. Go to "Domains"
2. Add domain: `admin.sowwanpay.com`
3. Configure DNS according to Vercel instructions

---

## 🔗 Connect to Same Backend

Both main site and admin use the same Supabase backend.

Create `.env` file:

```bash
VITE_API_URL=https://YOUR_PROJECT.supabase.co/functions/v1/make-server-cb704a1c
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Add these in Vercel project settings under "Environment Variables".

---

## 🔐 Security

Since admin is separate:

1. **Don't link from main site** - Keep admin URL private
2. **Use strong password** - Change from demo `admin123`
3. **Enable Vercel password protection** - Extra layer of security
4. **IP whitelist** (Vercel Pro) - Restrict access by IP
5. **HTTPS only** - Always use secure connection

---

## 📊 Final URLs

After deployment:

```
Main Site:   https://sowwanpay.com
             https://www.sowwanpay.com

Admin Site:  https://admin.sowwanpay.com

Backend API: https://YOUR_PROJECT.supabase.co/functions/v1/make-server-cb704a1c
```

---

## ✅ Checklist

- [ ] Created `sowwanpay-admin` directory
- [ ] Copied `package.json` and installed dependencies
- [ ] Created project structure (src, vite.config, etc.)
- [ ] Copied admin files from main project
- [ ] Updated routes (removed `/admin` prefix)
- [ ] Tested locally (`pnpm dev`)
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Configured custom domain
- [ ] Added environment variables
- [ ] Tested admin login
- [ ] Changed admin password

---

## 🆘 Troubleshooting

**Issue**: "Cannot find module"
- Make sure you copied all files correctly
- Run `pnpm install` again

**Issue**: Routes not working
- Check that you updated all `/admin` prefixes to `/`
- Verify AdminNav.tsx has correct paths

**Issue**: Styles not loading
- Make sure `globals.css` is in `src/styles/`
- Check import in `src/main.tsx`

---

## 📝 Notes

- This creates a **completely separate** admin application
- Main site has NO admin links (clean and secure)
- Both share the same Supabase backend
- Admin is only accessible via `admin.sowwanpay.com`

---

**You're ready to deploy a separate admin panel!** 🚀
