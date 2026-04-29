# Next Session Priorities — Growth Engine OS
**Saved:** April 30, 2026  
**Context:** After Phase 0 completion (11 live AI agents, OpenRouter connected, site deployed)

---

## 🔥 Priority Queue (Pick One to Start)

### 1. Fix Website Conversion Issues (P0)
**Impact:** Turns visitors into leads  
**Time:** 4-6 hours

**Tasks:**
- [ ] Add hero illustration / product mockup image
- [ ] Add 11 agent avatar portraits (consistent style)
- [ ] Add lead capture form (Name, Email, Company, Message)
- [ ] Add Calendly/booking link to all CTAs
- [ ] Add OpenGraph + Twitter Card meta tags
- [ ] Add Google Analytics 4
- [ ] Fix "Your agentsare running" typo → "Your agents are running"
- [ ] Add testimonials / social proof section
- [ ] Add FAQ section

---

### 2. Build Suzanne — Deep Market Intelligence Agent (P0)
**Impact:** First agent with real external data  
**Time:** 3-4 hours

**Tasks:**
- [ ] Add real-time market research capabilities
- [ ] Connect to SimilarWeb / Ahrefs / SerpAPI
- [ ] Build competitor tracking dashboard
- [ ] Create automated competitor alert system
- [ ] Generate weekly intelligence briefs

---

### 3. Connect External APIs — Real Data (P0)
**Impact:** Dashboard shows live metrics, not placeholders  
**Time:** 6-8 hours

**Tasks:**
- [ ] Google Ads API connection
- [ ] Meta Marketing API connection
- [ ] Google Analytics 4 data pull
- [ ] Build real KPI dashboard (actual spend, CPA, ROAS)
- [ ] Automated reporting pipeline

**API Keys needed:**
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CLIENT_ID/SECRET`
- `META_APP_ID/SECRET/ACCESS_TOKEN`
- `GA_PROPERTY_ID`

---

### 4. Generate Agent Avatars (P1)
**Impact:** Visual credibility for the team section  
**Time:** 2-3 hours

**Tasks:**
- [ ] Create 11 consistent AI-generated portraits
- [ ] Style: Professional, diverse, on-brand (orange/pink/purple accents)
- [ ] Replace colored-circle initials with real avatars
- [ ] Update both dashboard and landing page

---

### 5. Connect Obsidian via MCP (P1)
**Impact:** Knowledge base integration for agents  
**Time:** 2-3 hours

**Tasks:**
- [ ] Set up Obsidian MCP server or filesystem access
- [ ] Create `TopK-Growth-OS/` vault folder
- [ ] Sync project docs, agent specs, roadmaps as markdown
- [ ] Allow agents to read/write from Obsidian

---

### 6. Add Blog + SEO Foundation (P1)
**Impact:** Organic traffic and authority  
**Time:** 4-5 hours

**Tasks:**
- [ ] Create `/blog` route with article listing
- [ ] Write 3 pillar articles targeting SEO keywords
- [ ] Add JSON-LD structured data
- [ ] Create `robots.txt` + `sitemap.xml`
- [ ] Add canonical URLs

**Target keywords:**
- "AI marketing agency for clinics"
- "automated lead generation system"
- "growth operating system for service businesses"

---

## 🎯 Recommended First Task Tomorrow

**Start with #1 (Fix Website) OR #2 (Build Suzanne).**

- **#1** if you want more leads coming in first
- **#2** if you want to demo a "real" agent to prospects

Both are high-impact and build on what's already deployed.

---

## 📂 Where to Find Everything After Compaction

| File | Location |
|------|----------|
| This priorities list | `06-docs/next-session-priorities.md` |
| Full progress report | `06-docs/project-progress-report.md` |
| Website evaluation | `06-docs/website-evaluation-report.md` |
| Source code | `03-dashboard/` |
| Live site | https://growth-engine-os.vercel.app |
| GitHub repo | github.com/activecx/growth-engine-os |

---

## 🔑 API Keys Status

| Key | Status | Source |
|-----|--------|--------|
| `OPENROUTER_API_KEY` | ✅ Connected | User provided |
| `GEMINI_API_KEY` | ❌ Empty | Add when needed |
| `META_ACCESS_TOKEN` | ❌ Empty | Facebook Developer Console |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | ❌ Empty | Google Ads API |
| `SERPAPI_KEY` | ❌ Empty | serpapi.com |
| `GA_PROPERTY_ID` | ❌ Empty | Google Analytics |

---

## 🚀 Quick Restart Commands (After Compaction)

```powershell
# Start dev server
cd "C:\Users\USER\.topk-dev\dashboard"
npm run dev

# Sync changes back to Google Drive
& "C:\Users\USER\.topk-dev\dashboard\sync-to-gdrive.ps1"

# Deploy to production
vercel --prod --yes

# Check OpenRouter status
Invoke-WebRequest -Uri "https://growth-engine-os.vercel.app/api/agents/chat" -Method POST -ContentType "application/json" -Body '{"agentId":"karim-chief-of-staff","message":"status","history":[]}'
```

---

*Saved for tomorrow's session. Pick a priority and let's build.*
