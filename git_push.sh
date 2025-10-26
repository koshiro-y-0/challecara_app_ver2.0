#!/bin/bash

# Script to push to Github

echo "=== Pushing Challenge Cara App Ver 2.0 to Github ==="
echo ""

# 1. Initialize Git repository
echo "1. Initializing Git repository..."
git init

# 2. Add all files
echo "2. Staging files..."
git add .

# 3. Initial commit
echo "3. Creating commit..."
git commit -m "feat: Django project Ver 2.0 initial setup" -m "- Add Django project structure" -m "- Enable server startup with npm scripts" -m "- Organize templates and static files" -m "- Add README and setup scripts"

# 4. Add remote repository
echo "4. Setting up remote repository..."
git remote add origin https://github.com/koshiro-y-0/challecara_app_ver2.0.git

# 5. Create main branch and push
echo "5. Pushing to Github..."
git branch -M main
git push -u origin main

echo ""
echo "=== Completed! ==="
echo ""
echo "Repository URL: https://github.com/koshiro-y-0/challecara_app_ver2.0"
