#!/bin/bash

# 🚀 Ritchi Platform - Auto Deploy Script
# This script packages everything and pushes to GitHub

set -e  # Exit on error

echo "🎯 Starting Ritchi Platform deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USER
if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ GitHub username is required${NC}"
    exit 1
fi

# Repository name
REPO_NAME="ritchi-platform"

echo ""
echo -e "${BLUE}📦 Initializing Git repository...${NC}"
cd /home/user/ritchi-platform

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git already initialized${NC}"
fi

# Add all files
echo ""
echo -e "${BLUE}📝 Adding files to Git...${NC}"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
else
    # Commit
    echo ""
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "Initial commit: Ritchi Platform - Full-stack SaaS

- Multi-language support (EN, AR, VI, ZH)
- LemonSqueezy payment integration
- Regional pricing (SGD, AED, VND, USD)
- NextAuth authentication
- Supabase PostgreSQL
- Responsive design
- SEO optimized
- Production ready

Built with Next.js 15 + TypeScript + Tailwind CSS"
    
    echo -e "${GREEN}✅ Changes committed${NC}"
fi

# Set main branch
git branch -M main

# Ask if user wants to create remote
echo ""
read -p "Do you want to push to GitHub now? (y/n): " PUSH_NOW

if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
    # Check if remote exists
    if git remote | grep -q "origin"; then
        echo -e "${GREEN}✅ Remote 'origin' already exists${NC}"
    else
        # Add remote
        echo ""
        echo -e "${BLUE}🔗 Adding remote repository...${NC}"
        git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
        echo -e "${GREEN}✅ Remote added${NC}"
    fi

    # Push to GitHub
    echo ""
    echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
    echo ""
    echo -e "${RED}⚠️  You may need to authenticate with GitHub${NC}"
    echo -e "${RED}⚠️  If the repository doesn't exist, create it first at:${NC}"
    echo -e "${RED}    https://github.com/new${NC}"
    echo ""
    read -p "Press Enter to continue..."

    if git push -u origin main; then
        echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    else
        echo -e "${RED}❌ Push failed. Please check:${NC}"
        echo -e "${RED}   1. Repository exists: https://github.com/$GITHUB_USER/$REPO_NAME${NC}"
        echo -e "${RED}   2. You're authenticated with GitHub${NC}"
        echo -e "${RED}   3. Run: gh auth login (if using GitHub CLI)${NC}"
        exit 1
    fi
else
    echo ""
    echo -e "${BLUE}ℹ️  Skipping push to GitHub${NC}"
    echo -e "${BLUE}   You can push later with:${NC}"
    echo -e "${BLUE}   git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git${NC}"
    echo -e "${BLUE}   git push -u origin main${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                        ║${NC}"
echo -e "${GREEN}║   ✅ RITCHI PLATFORM READY!            ║${NC}"
echo -e "${GREEN}║                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📂 Repository:${NC} https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo -e "${BLUE}🎯 Next Steps:${NC}"
echo -e "   1. Go to https://vercel.com/lucas-projects-a3111d98"
echo -e "   2. Click 'Add New' → 'Project'"
echo -e "   3. Import: $REPO_NAME"
echo -e "   4. Add environment variables (see .env.example)"
echo -e "   5. Deploy!"
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo -e "   - README.md - Project overview"
echo -e "   - DEPLOYMENT.md - Deployment guide"
echo -e "   - PROJECT_SUMMARY.md - Complete summary"
echo ""
echo -e "${GREEN}🚀 Good luck with your launch!${NC}"
echo ""
