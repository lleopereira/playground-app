# 🔄 How to Update Your Local Project

## Before You Start
Make sure you have no unsaved work in VS Code and that your terminal is in the project folder.

## Method 1: Pull Latest Changes (Recommended)

### Step 1: Check Current Status
```bash
git status
```

### Step 2: If you have uncommitted changes, save them first
```bash
git add .
git commit -m "Save my local work"
```

### Step 3: Pull the latest updates
```bash
git pull origin main
```

### Step 4: Install any new dependencies (if needed)
```bash
cd frontend/playground-frontend
npm install
```

### Step 5: Start the development server
```bash
npm start
```

---

## Method 2: Reset to Match Teacher's Version Exactly

⚠️ **WARNING**: This will delete any changes you made locally!

```bash
git fetch origin
git reset --hard origin/main
cd frontend/playground-frontend
npm install
npm start
```

---

## Method 3: Using VS Code (Visual Method)

1. **Open VS Code** in your project folder
2. **Press Ctrl+Shift+G** to open Source Control
3. **Click the "..." menu** in Source Control panel
4. **Select "Pull"**
5. **If conflicts appear**, VS Code will help you resolve them
6. **Open terminal** (Ctrl+`) and run:
   ```bash
   cd frontend/playground-frontend
   npm start
   ```

---

## ❗ If You Get Errors

### Error: "Your local changes would be overwritten"
```bash
git stash
git pull origin main
git stash pop
```

### Error: "Cannot pull with rebase: You have unstaged changes"
```bash
git add .
git commit -m "Save work before update"
git pull origin main
```

### Error: npm/package issues
```bash
cd frontend/playground-frontend
rm -rf node_modules
rm package-lock.json
npm install
npm start
```

---

## ✅ How to Verify Update Worked

1. **Check that buttons are smaller** on mobile/tablet views
2. **Verify all pages work**: Input Fields, Text Area, Checkboxes
3. **Test the FormSubmitOverlay** shows data correctly
4. **Check responsive design** works on different screen sizes

---

## 🆘 If Nothing Works

**Complete fresh start** (nuclear option):
1. **Backup any personal work** you want to keep
2. **Delete the entire project folder**
3. **Clone fresh from GitHub**:
   ```bash
   git clone https://github.com/lleopereira/playground-app.git
   cd playground-app/frontend/playground-frontend
   npm install
   npm start
   ```

---

## 📞 Need Help?

- Check that you're in the right folder: `pwd` (should show the playground-app path)
- Make sure Git is working: `git --version`
- Verify you can see the remote: `git remote -v`
- Ask your teacher if you're still stuck!
