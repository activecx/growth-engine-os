import { NextRequest, NextResponse } from "next/server";
import { getAgentPrompt } from "@/lib/prompts/agents";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface ChatRequest {
  agentId: string;
  message: string;
  history?: ChatMessage[];
}

type LLMProvider = "openrouter" | "gemini" | "mock";

// Detect which provider to use
function getProvider(): LLMProvider {
  if (OPENROUTER_API_KEY && OPENROUTER_API_KEY.length > 10) return "openrouter";
  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 10) return "gemini";
  return "mock";
}

// Mock responses for when no API key is configured
function generateMockResponse(agentId: string, message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return `👋 Welcome! I'm ready to help. What would you like to work on today?`;
  }

  if (lowerMsg.includes("status") || lowerMsg.includes("how are we doing")) {
    return `📊 **System Status: Operational**

All agents are active and within normal parameters. Here's the quick pulse:

- **Market Intelligence:** Layla has identified 3 new competitor ad angles this week
- **Campaigns:** Tarek is running 4 active ad sets across Meta and Google
- **Content:** Salim produced 12 pieces this week (2 blog posts, 6 social posts, 4 ad variants)
- **Leads:** Nour has 47 prospects in nurture, 8 meetings booked for next week
- **Performance:** Samer reports overall CPA is down 12% vs. last month

**🟢 Everything is on track.** No escalations needed.

Would you like a deeper dive into any department?`;
  }

  if (lowerMsg.includes("seo") || lowerMsg.includes("ranking")) {
    return `🔍 **SEO Update — Faris Reporting**

Current snapshot:
- **Tracked keywords:** 84
- **Page 1 rankings:** 23 (↑ 4 from last month)
- **Featured snippets:** 3
- **Organic traffic:** +18% MoM

**Top priorities this week:**
1. **Quick win:** Add FAQ schema to 5 high-traffic service pages (est. +15% CTR)
2. **Content gap:** Competitor ranks for "dental marketing AI" — we have zero content there
3. **Technical:** Fix 12 orphan pages discovered in last crawl

**Recommended action:** Approve the content brief for "AI dental marketing" — I can have Salim draft it by Thursday.

Confidence: **High** | Timeline: 2 weeks to see ranking movement`;
  }

  if (lowerMsg.includes("ad") || lowerMsg.includes("campaign") || lowerMsg.includes("meta") || lowerMsg.includes("google")) {
    return `📢 **Paid Media Update — Tarek Reporting**

Current spend: **$4,200 / $6,000** this month

| Channel | Spend | CPA | ROAS | Status |
|---------|-------|-----|------|--------|
| Meta Ads | $2,800 | $42 | 3.2x | 🟢 Scaling |
| Google Search | $1,200 | $68 | 2.8x | 🟢 Stable |
| TikTok | $200 | $89 | 1.9x | 🟡 Testing |

**Today's optimizations:**
- Killed 2 underperforming Meta ad sets (CPA > $80)
- Increased budget on winner by 30% (CPA $28, ROAS 4.1x)
- New TikTok creative going live tomorrow

**⚠️ Watch:** Google Search CPC is up 15% this week. Layla is investigating if competitors increased bids.

Want me to adjust the budget allocation?`;
  }

  if (lowerMsg.includes("lead") || lowerMsg.includes("prospect") || lowerMsg.includes("meeting")) {
    return `🎯 **Lead Generation Update — Nour Reporting**

**Pipeline this week:**
- **New prospects identified:** 156
- **Enriched & qualified:** 47 (BANT score 7+)
- **In nurture sequence:** 38
- **Meetings booked:** 8
- **No-shows:** 1

**Top performing segment:** Aesthetic clinic owners in Dubai, aged 35-50, who engaged with our "AI marketing" content

**Sequence performance:**
- Email 1 (intro): 42% open, 8% reply
- Email 2 (case study): 38% open, 12% reply
- WhatsApp follow-up: 67% read, 15% response

**🟡 One concern:** Reply rates dropped 3% this week. Salim is A/B testing a more personal subject line.

Want me to add a new prospect segment or adjust the sequence?`;
  }

  if (lowerMsg.includes("content") || lowerMsg.includes("copy") || lowerMsg.includes("blog") || lowerMsg.includes("write")) {
    return `✍️ **Content Update — Salim Reporting**

**This week's production:**
- 2 blog posts (2,500 words each)
- 6 social media posts (LinkedIn + Instagram)
- 4 ad creative variants
- 1 landing page rewrite

**Next week's queue (pending your approval):**
1. "How AI Cut Our Client Acquisition Cost by 60%" — blog post targeting "AI marketing agency"
2. Instagram carousel: "5 Signs Your Marketing Needs AI"
3. Meta ad: Video script for clinic owner testimonial

**🔴 Needs your input:** Yasmin flagged that the new landing page CTA doesn't match our brand voice. I can revise in 30 minutes once you confirm the direction.

Want to see a draft of any piece?`;
  }

  if (lowerMsg.includes("design") || lowerMsg.includes("visual") || lowerMsg.includes("creative") || lowerMsg.includes("brand")) {
    return `🎨 **Creative Update — Yasmin + Omar Reporting**

**Approvals this week:**
- ✅ Meta ad creative set (4 static, 2 video)
- ✅ Instagram story templates (3 variants)
- ✅ Email header redesign
- ❌ Landing page hero section — **rejected** (off-brand color usage)

**In review:**
- LinkedIn company page banner
- New agent avatar set (Omar is generating consistent portraits)

**Brand compliance score:** 94% (↑ 6% from last month)

**🟡 Issue:** One ad set used a slightly wrong purple shade (#7C3AED instead of #8B5CF6). I've flagged it to Tarek. All future creatives will go through stricter color validation.

Want to review the rejected landing page or approve the pending items?`;
  }

  if (lowerMsg.includes("report") || lowerMsg.includes("analytics") || lowerMsg.includes("dashboard") || lowerMsg.includes("numbers")) {
    return `📈 **Weekly Report — Salma + Samer Reporting**

**Headline:** Revenue per lead up 22% — the new nurture sequence is working.

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Total Leads | 156 | 134 | ↗️ +16% |
| Cost Per Lead | $42 | $48 | ↗️ -12% |
| Meeting Booked Rate | 17% | 14% | ↗️ +21% |
| Show Rate | 88% | 82% | ↗️ +7% |
| Pipeline Value | $127K | $98K | ↗️ +30% |

**🟢 Wins:**
- Meta ad CPA dropped below $40 for first time
- WhatsApp nurture sequence driving 2x reply rate vs. email-only

**🟡 Watch:**
- Google Search CPC trending up (competitor activity)
- One client segment (legal firms) showing lower engagement

**🔴 Risk:**
- TikTok spend is 3x over initial test budget with below-target ROAS

**3 Recommendations:**
1. **Approve** scaling Meta budget by 25% this week
2. **Pause** TikTok test, reallocate to Meta winners
3. **Request:** Legal firm messaging audit from Salim

Full dashboard: [View in Command Center](/dashboard)`;
  }

  // Default response
  return `I've received your message. Let me think through this as your ${agentId.split("-")[0].charAt(0).toUpperCase() + agentId.split("-")[0].slice(1)}.

Based on the current system state, here's what I recommend:

1. **Assess:** The request relates to our ongoing growth operations
2. **Analyze:** I'll need to coordinate with the relevant department agents
3. **Action:** Let me route this to the right specialist and get you a detailed response

**Next step:** Would you like me to:
- Bring this up in today's standup?
- Generate a specific deliverable (report, copy, design spec)?
- Escalate to Karim for cross-agent coordination?

*(Note: To get real AI-powered responses, add your GEMINI_API_KEY or OPENROUTER_API_KEY to .env.local)*`;
}

async function callOpenRouter(
  systemPrompt: string,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://growth-engine-os.vercel.app",
      "X-Title": "TopK Agent OS",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages,
      temperature: 0.4,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}

async function callGemini(
  systemPrompt: string,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const contents = [
    {
      role: "user",
      parts: [{ text: `SYSTEM INSTRUCTION (stay in character):\n${systemPrompt}\n\nAcknowledge you understand your role with a brief "Ready."` }],
    },
    {
      role: "model",
      parts: [{ text: "Ready." }],
    },
    ...history.flatMap((msg) => [
      {
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      },
    ]),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { agentId, message, history = [] } = body;

    if (!agentId || !message) {
      return NextResponse.json(
        { error: "agentId and message are required" },
        { status: 400 }
      );
    }

    const prompt = getAgentPrompt(agentId);
    if (!prompt) {
      return NextResponse.json(
        { error: `Agent "${agentId}" not found` },
        { status: 404 }
      );
    }

    const provider = getProvider();
    let responseText: string;
    let source: LLMProvider = "mock";

    if (provider === "openrouter") {
      try {
        responseText = await callOpenRouter(prompt.systemPrompt, message, history);
        source = "openrouter";
      } catch (err) {
        console.warn("OpenRouter call failed, trying Gemini:", err);
        if (GEMINI_API_KEY) {
          try {
            responseText = await callGemini(prompt.systemPrompt, message, history);
            source = "gemini";
          } catch (geminiErr) {
            console.warn("Gemini fallback also failed:", geminiErr);
            responseText = generateMockResponse(agentId, message);
          }
        } else {
          responseText = generateMockResponse(agentId, message);
        }
      }
    } else if (provider === "gemini") {
      try {
        responseText = await callGemini(prompt.systemPrompt, message, history);
        source = "gemini";
      } catch (err) {
        console.warn("Gemini call failed, using mock:", err);
        responseText = generateMockResponse(agentId, message);
      }
    } else {
      responseText = generateMockResponse(agentId, message);
    }

    return NextResponse.json({
      response: responseText,
      source,
      agent: {
        id: prompt.id,
        name: agentId.split("-")[0].charAt(0).toUpperCase() + agentId.split("-")[0].slice(1),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
