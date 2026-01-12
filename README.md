# Personal Website - Deployment Guide

Your minimal personal website with draggable folders, now ready to deploy with a backend for content management!

## 🚀 Quick Start (Free Hosting)

### Option 1: GitHub Pages (Recommended - 100% Free)

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com/signup

2. **Create a new repository**
   - Click the "+" in the top right → "New repository"
   - Name it: `your-username.github.io` (replace "your-username" with your GitHub username)
   - Make it public
   - Don't initialize with README

3. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop ALL files from this folder
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/ (root)`
   - Click Save

5. **Your site is live!**
   - Visit: `https://your-username.github.io`
   - It may take 2-3 minutes to deploy

### Option 2: Cloudflare Pages (Also Free)

1. Sign up at https://pages.cloudflare.com
2. Connect your GitHub account
3. Select your repository
4. Deploy settings:
   - Build command: (leave empty)
   - Build output directory: `/`
5. Click "Save and Deploy"

## 📝 How to Update Content

### Using the Admin Panel (Easiest)

1. Open `admin.html` in your browser
2. Edit the content in JSON format
3. Click "Download JSON" for each section
4. Upload the downloaded files to GitHub:
   - Go to your repo → `content` folder
   - Click "Upload files"
   - Drag the downloaded JSON files
   - Commit changes

### Manual Editing

Edit the JSON files directly in the `content/` folder:

- `musings.json` - Blog posts/thoughts
- `inspiration.json` - Books, movies, music
- `photos.json` - Photo gallery items
- `projects.json` - Project showcase

## 🖼️ Adding Images

1. Create an `images/` folder in your repository
2. Upload images there
3. Reference them in JSON:
   ```json
   "thumbnail": "images/photo1.jpg"
   ```

### Image Hosting Options (Free)
- **GitHub** (in your repo's `images/` folder) - Recommended
- **Imgur** - Upload and get direct links
- **Cloudinary** - Free tier with 25GB bandwidth

## 📁 Project Structure

```
your-website/
├── index.html          # Main website
├── app.js             # Website functionality
├── admin.html         # Content editor
├── content/           # Your content (JSON files)
│   ├── musings.json
│   ├── inspiration.json
│   ├── photos.json
│   └── projects.json
└── images/            # Your images (create this folder)
```

## ✏️ Content Format Examples

### Musings (Blog Posts)
```json
[
  {
    "title": "Post Title",
    "date": "January 11, 2025",
    "excerpt": "Short preview of the post...",
    "tags": ["tag1", "tag2"]
  }
]
```

### Inspiration
```json
{
  "books": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "status": "reading",
      "notes": "Your thoughts..."
    }
  ],
  "movies": [...],
  "music": [...]
}
```

### Photos
```json
[
  {
    "title": "Photo Title",
    "date": "January 1, 2025",
    "thumbnail": "images/thumb.jpg",
    "fullImage": "images/full.jpg",
    "location": "City, Country"
  }
]
```

### Projects
```json
[
  {
    "title": "Project Name",
    "date": "January 1, 2025",
    "description": "What this project does...",
    "link": "https://project-url.com",
    "tags": ["web", "tools"]
  }
]
```

## 🔧 Advanced: GitHub API Updates

For automatic content updates without manual uploads, you can:

1. Use GitHub's web interface to edit files directly
2. Set up GitHub Actions for automated deployments
3. Use the GitHub API with a personal access token

## 💡 Tips

- **Keep JSON valid**: Use the admin panel or a JSON validator
- **Optimize images**: Compress before uploading (use tinypng.com)
- **Test locally**: Open `index.html` in your browser before deploying
- **Backup**: GitHub automatically versions all your changes

## 🆘 Troubleshooting

**Site not loading?**
- Check GitHub Pages is enabled in Settings
- Wait 2-3 minutes after uploading
- Clear your browser cache

**Content not updating?**
- Check JSON syntax is valid
- Refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
- Check browser console for errors (F12)

**Images not showing?**
- Verify image paths match your folder structure
- Use relative paths: `images/photo.jpg` not `/images/photo.jpg`
- Check image files are uploaded to GitHub

## 🎨 Customization

Want to change colors, fonts, or layout? Edit the `<style>` section in `index.html`.

## 📱 Mobile Friendly

Your site automatically adapts to mobile devices with responsive design.

---

**Questions?** Open an issue on GitHub or search for GitHub Pages documentation.

Enjoy your new website! 🎉
