# 🚀 VetAcademy - Quick Deploy Commands

## Ultra-Fast Deploy (Copy & Paste)

Open your terminal and run these commands:

```bash
# Navigate to project
cd /Users/danielviana/Desktop/VetAcademy/copy-of-vetacademy

# Initialize Railway project (interactive - select workspace and create project)
railway init

# Set your Gemini API key (REQUIRED - replace with your actual key)
railway variables set GEMINI_API_KEY=your_actual_gemini_api_key_here

# Deploy to Railway
railway up

# Open your deployed app
railway open
```

---

## Post-Deployment Commands

```bash
# View deployment logs
railway logs

# Check deployment status
railway status

# View metrics
railway metrics

# Redeploy after changes
npm run build && railway up
```

---

## Files Created for Deployment

✅ **railway.json** - Railway deployment configuration
✅ **nixpacks.toml** - Build configuration
✅ **package.json** - Updated with production scripts
✅ **.railwayignore** - Deployment optimization
✅ **DEPLOYMENT.md** - Complete deployment guide
✅ **DEPLOYMENT_STATUS.md** - Deployment status report

---

## Important Notes

1. **API Key:** Don't forget to replace `your_actual_gemini_api_key_here` with your real Gemini API key
2. **Build Verified:** Project builds successfully in 999ms
3. **Bundle Size:** 313.21 KB (gzipped: 94.80 KB)
4. **Server:** Using `serve` for optimized static file serving

---

## Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

**You're all set! 🎉**
