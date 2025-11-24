# 🔄 Git Commands Reference - FlowMaster AI

## Repository Information
- **GitHub URL**: https://github.com/aanthonytomas/FlowMaster-AI
- **Branch**: main
- **Remote**: origin

---

## 📝 Common Git Workflow

### Check Status
```bash
git status
```

### Add Changes
```bash
# Add all changes
git add .

# Add specific file
git add path/to/file.js

# Add specific folder
git add src/components/
```

### Commit Changes
```bash
# Commit with message
git commit -m "Your commit message here"

# Commit with detailed message
git commit -m "Title of change" -m "Detailed description of what changed and why"
```

### Push to GitHub
```bash
# Push to main branch
git push origin main

# Force push (use with caution!)
git push -f origin main
```

### Pull Latest Changes
```bash
# Pull from main
git pull origin main

# Pull and rebase
git pull --rebase origin main
```

---

## 🌿 Branch Management

### Create New Branch
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Or using newer syntax
git switch -c feature/new-feature
```

### Switch Branches
```bash
# Switch to existing branch
git checkout main
git checkout feature/new-feature

# Or using newer syntax
git switch main
```

### List Branches
```bash
# List local branches
git branch

# List all branches (local and remote)
git branch -a
```

### Delete Branch
```bash
# Delete local branch
git branch -d feature/old-feature

# Force delete
git branch -D feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

---

## 📦 Quick Commit Templates

### Feature Addition
```bash
git add .
git commit -m "feat: Add new workflow builder component

- Implemented drag-and-drop functionality
- Added step configuration panel
- Updated UI components"
git push origin main
```

### Bug Fix
```bash
git add .
git commit -m "fix: Resolve import path issues in Routes.jsx

- Fixed case-sensitivity in file paths
- Updated relative path depths
- Tested all route navigation"
git push origin main
```

### Documentation
```bash
git add .
git commit -m "docs: Update README with installation instructions

- Added quick start guide
- Updated environment variables section
- Added troubleshooting tips"
git push origin main
```

### Style/Refactor
```bash
git add .
git commit -m "refactor: Improve code organization in utils folder

- Reorganized utility functions
- Added JSDoc comments
- Improved naming conventions"
git push origin main
```

---

## 🔍 View History

### View Commit Log
```bash
# Simple log
git log

# One line per commit
git log --oneline

# Last 10 commits
git log -10

# With graph
git log --graph --oneline --all
```

### View Changes
```bash
# See unstaged changes
git diff

# See staged changes
git diff --staged

# See changes in specific file
git diff path/to/file.js
```

---

## ↩️ Undo Changes

### Undo Unstaged Changes
```bash
# Discard changes in specific file
git checkout -- path/to/file.js

# Discard all unstaged changes
git checkout -- .
```

### Undo Staged Changes
```bash
# Unstage specific file
git reset HEAD path/to/file.js

# Unstage all files
git reset HEAD .
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

---

## 🏷️ Tags (Releases)

### Create Tag
```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"
```

### Push Tags
```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### List Tags
```bash
git tag
```

---

## 🔧 Configuration

### Set User Info
```bash
git config user.name "aanthonytomas"
git config user.email "markanthony.garciatomas@gmail.com"
```

### Set Global User Info
```bash
git config --global user.name "aanthonytomas"
git config --global user.email "markanthony.garciatomas@gmail.com"
```

### View Configuration
```bash
# View all config
git config --list

# View specific config
git config user.name
git config user.email
```

---

## 🚀 Quick Commands for FlowMaster AI

### Daily Workflow
```bash
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with message
git commit -m "feat: Your feature description"

# 4. Push to GitHub
git push origin main
```

### Update from GitHub
```bash
# Pull latest changes
git pull origin main
```

### Create Feature Branch
```bash
# Create new feature branch
git checkout -b feature/awesome-feature

# Make changes, commit
git add .
git commit -m "feat: Add awesome feature"

# Push feature branch
git push origin feature/awesome-feature

# Merge to main (after testing)
git checkout main
git merge feature/awesome-feature
git push origin main
```

---

## 📊 Useful Aliases

Add these to your `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --oneline --all
    amend = commit --amend --no-edit
```

Then use:
```bash
git st      # instead of git status
git co main # instead of git checkout main
git br      # instead of git branch
```

---

## 🆘 Emergency Commands

### Accidentally Committed to Wrong Branch
```bash
# On wrong branch
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch

# Commit again
git commit -m "Your message"
```

### Need to Sync with Remote (Force)
```bash
# ⚠️ WARNING: This will overwrite local changes
git fetch origin
git reset --hard origin/main
```

### Stash Changes Temporarily
```bash
# Save changes without committing
git stash

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

---

## 📞 Getting Help

```bash
# General help
git help

# Help for specific command
git help commit
git help push
git help branch
```

---

## 🎯 Current Repository Status

✅ **Initialized**: Yes
✅ **Remote Added**: origin → https://github.com/aanthonytomas/FlowMaster-AI.git
✅ **Branch**: main
✅ **First Commit**: Pushed successfully
✅ **Files Committed**: 98 files

---

**Happy Coding! 🚀**
