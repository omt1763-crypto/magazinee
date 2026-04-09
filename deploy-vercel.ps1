#!/bin/bash
# Vercel deployment script
cd "c:\Users\omt91\Downloads\ai-luminary-magazine-main\ai-luminary-magazine-main"

echo "========================================"
echo "🚀 Deploying to Vercel"
echo "========================================"
echo ""
echo "Follow these steps when prompted:"
echo "1. Sign in to your Vercel account (or create one)"
echo "2. Choose your scope (personal account)"
echo "3. Link to existing project? → No"
echo "4. Project name → ai-luminary-magazine (or your choice)"
echo "5. Output directory → dist"
echo "6. Ready to proceed? → Yes"
echo ""
echo "========================================"
echo ""

vercel --prod
