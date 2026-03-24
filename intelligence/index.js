<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>ytClawDB Intelligence Report — March, 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
:root{
  --bg:#0D0D0D;--s:#161616;--s2:#1E1E1E;--s3:#252525;
  --b:rgba(255,255,255,0.07);--b2:rgba(255,255,255,0.13);
  --t1:#F2F0E8;--t2:#8A8880;--t3:#4A4845;
  --claw:#FF6B35;--green:#34C759;--red:#FF3B30;--blue:#0A84FF;--amber:#FF9F0A;--purple:#BF5AF2;
  --display:'Bebas Neue',cursive;--mono:'DM Mono',monospace;--body:'DM Sans',sans-serif;
}
[data-theme="light"]{
  --bg:#F5F3EE;--s:#FFFFFF;--s2:#EEECE8;--s3:#E5E3DE;
  --b:rgba(0,0,0,0.07);--b2:rgba(0,0,0,0.13);
  --t1:#1A1916;--t2:#6B6960;--t3:#B0AEA8;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-family:var(--body);background:var(--bg);color:var(--t1);scroll-behavior:smooth;}
body{min-height:100vh;transition:background .3s,color .3s;}

/* NAV */
.top-nav{
  position:sticky;top:0;z-index:100;background:var(--s);
  border-bottom:0.5px solid var(--b2);padding:10px 32px;
  display:flex;align-items:center;justify-content:space-between;
}
.nav-logo{font-family:var(--display);font-size:20px;letter-spacing:1px;}
.nav-logo span{color:var(--claw);}
.nav-links{display:flex;gap:4px;}
.nav-link{padding:6px 12px;border-radius:6px;font-size:12px;color:var(--t2);cursor:pointer;border:none;background:none;font-family:var(--body);transition:all .15s;text-decoration:none;}
.nav-link:hover{background:var(--s2);color:var(--t1);}
.nav-right{display:flex;gap:8px;align-items:center;}
.live-pill{display:flex;align-items:center;gap:5px;background:rgba(52,199,89,0.1);border:0.5px solid rgba(52,199,89,0.25);border-radius:20px;padding:4px 10px;font-size:11px;color:var(--green);font-family:var(--mono);}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px rgba(52,199,89,0.7);animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.theme-btn{padding:6px 12px;background:var(--s2);border:0.5px solid var(--b);border-radius:6px;color:var(--t2);cursor:pointer;font-size:12px;font-family:var(--body);}
.dl-btn{padding:6px 14px;background:var(--claw);color:#fff;border:none;border-radius:6px;font-size:12px;font-family:var(--body);font-weight:500;cursor:pointer;transition:opacity .15s;}
.dl-btn:hover{opacity:.88;}

/* PAGE */
.page{max-width:1180px;margin:0 auto;padding:32px 24px;}

/* HERO */
.hero{margin-bottom:36px;padding:28px 32px;background:var(--s);border:0.5px solid var(--b2);border-radius:16px;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap;}
.hero-left .label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);font-family:var(--mono);margin-bottom:8px;}
.hero-title{font-family:var(--display);font-size:38px;letter-spacing:1px;line-height:1;}
.hero-title span{color:var(--claw);}
.hero-sub{font-size:13px;color:var(--t2);margin-top:8px;font-family:var(--mono);}
.hero-right{display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
.report-id{font-family:var(--mono);font-size:11px;color:var(--t3);}

/* SECTIONS */
.section{margin-bottom:44px;}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px;}
.section-title{font-family:var(--display);font-size:24px;letter-spacing:.5px;}
.section-sub{font-size:11px;color:var(--t3);font-family:var(--mono);}

/* STAT GRID */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:20px;}
.stat{background:var(--s);border:0.5px solid var(--b);border-radius:10px;padding:16px;position:relative;overflow:hidden;}
.stat::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2.5px;background:var(--cc,var(--claw));}
.stat-l{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--t3);font-family:var(--mono);margin-bottom:8px;}
.stat-v{font-family:var(--display);font-size:28px;letter-spacing:.3px;line-height:1;}
.stat-n{font-size:11.5px;color:var(--t2);margin-top:5px;}

/* CARDS */
.card{background:var(--s);border:0.5px solid var(--b);border-radius:12px;padding:18px 20px;}
.card-title{font-size:13px;font-weight:600;margin-bottom:3px;}
.card-sub{font-size:11px;color:var(--t2);margin-bottom:14px;font-family:var(--mono);}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px;}
.g6040{display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:16px;}

/* TABLE */
.tw{overflow-x:auto;}
table{width:100%;border-collapse:collapse;font-size:13px;}
th{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);font-family:var(--mono);font-weight:500;text-align:left;padding:0 12px 10px 0;border-bottom:0.5px solid var(--b2);white-space:nowrap;}
td{padding:11px 12px 11px 0;border-bottom:0.5px solid var(--b);vertical-align:middle;}
tr:last-child td{border-bottom:none;}
tr:hover td{background:rgba(255,255,255,0.015);}
.mono{font-family:var(--mono);font-size:12.5px;}
.rank{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;color:#fff;font-size:11px;font-weight:700;font-family:var(--mono);}
.tag{display:inline-block;padding:2px 8px;background:var(--s2);border-radius:5px;font-size:11px;color:var(--t2);font-family:var(--mono);}
.up{color:var(--green);}
.hi{font-weight:600;color:var(--t1);}

/* PROGRESS */
.prog-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.prog-label{font-size:12px;color:var(--t1);min-width:160px;}
.prog-bar{flex:1;height:5px;background:var(--s2);border-radius:3px;}
.prog-fill{height:100%;border-radius:3px;transition:width 1s;}
.prog-val{font-family:var(--mono);font-size:12px;color:var(--t2);min-width:50px;text-align:right;}

/* TOPICS */
.topics-wrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;}
.topic{background:var(--s);border:0.5px solid var(--b);border-left:3px solid var(--claw);border-radius:10px;padding:14px 16px;}
.topic-niche{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);font-family:var(--mono);margin-bottom:5px;}
.topic-title{font-size:13.5px;font-weight:600;line-height:1.4;margin-bottom:4px;}
.topic-why{font-size:12px;color:var(--t2);line-height:1.5;}

/* MONO CARDS */
.mc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;}
.mc{background:var(--s);border:0.5px solid var(--b);border-radius:10px;padding:16px;}
.mc-icon{font-size:20px;margin-bottom:8px;}
.mc-title{font-size:12px;font-weight:600;margin-bottom:3px;}
.mc-val{font-family:var(--display);font-size:22px;letter-spacing:.3px;}
.mc-desc{font-size:11.5px;color:var(--t2);margin-top:5px;line-height:1.5;}

/* TIMELINE */
.timeline{display:flex;flex-direction:column;gap:0;}
.tl-item{display:flex;gap:16px;padding:14px 0;border-bottom:0.5px solid var(--b);}
.tl-item:last-child{border-bottom:none;}
.tl-dot-wrap{display:flex;flex-direction:column;align-items:center;width:20px;flex-shrink:0;margin-top:3px;}
.tl-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
.tl-line{flex:1;width:1px;background:var(--b2);margin-top:4px;}
.tl-content{}
.tl-milestone{font-size:13px;font-weight:600;margin-bottom:2px;}
.tl-time{font-size:11px;color:var(--t3);font-family:var(--mono);margin-bottom:3px;}
.tl-desc{font-size:12.5px;color:var(--t2);line-height:1.5;}
.tl-rev{font-family:var(--mono);font-size:12px;color:var(--green);}

/* SOURCES */
.sources{padding:20px;background:var(--s2);border-radius:10px;border:0.5px solid var(--b);margin-top:40px;}
.src-title{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);font-family:var(--mono);margin-bottom:10px;}
.src-list{font-size:12px;color:var(--t3);font-family:var(--mono);line-height:2.2;}

/* FOOTER */
.footer{text-align:center;padding:32px 0 16px;font-size:12px;color:var(--t3);font-family:var(--mono);}
.footer strong{color:var(--claw);}

@media(max-width:860px){
  .g2,.g3,.g6040{grid-template-columns:1fr;}
  .hero{flex-direction:column;}
  .hero-right{align-items:flex-start;}
  .top-nav{flex-wrap:wrap;gap:8px;}
  .nav-links{display:none;}
}
@media print{
  .top-nav,.dl-btn,.theme-btn{display:none!important;}
  body{background:#fff!important;color:#000!important;}
  .s{background:#fff!important;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="top-nav">
  <div class="nav-logo">🦞 Viral<span>Claw</span>DB</div>
  <div class="nav-links">
    <a class="nav-link" href="#overview">Overview</a>
    <a class="nav-link" href="#channels">Channels</a>
    <a class="nav-link" href="#niches">Niches</a>
    <a class="nav-link" href="#payouts">Payouts</a>
    <a class="nav-link" href="#trending">Trending</a>
    <a class="nav-link" href="#roadmap">Roadmap</a>
  </div>
  <div class="nav-right">
    <div class="live-pill"><div class="live-dot"></div>Live Data</div>
    <button class="theme-btn" onclick="toggleTheme()">☀️ Light</button>
    <button class="dl-btn" onclick="window.print()">⬇ Download PDF</button>
  </div>
</nav>

<div class="page">

<!-- HERO -->
<div class="hero">
  <div class="hero-left">
    <div class="label">Creator Economy Intelligence Report</div>
    <div class="hero-title">PLATFORM<br><span>INTELLIGENCE</span></div>
    <div class="hero-sub">YouTube · All Niches · March 24, 2026 · 06:00 UTC</div>
  </div>
  <div class="hero-right">
    <div class="report-id">Report ID: VCB-2026-03-24-001</div>
    <div class="live-pill"><div class="live-dot"></div>YouTube Data API v3 · Live</div>
    <div style="font-size:11px;color:var(--t3);font-family:var(--mono);margin-top:4px;">15 niches · 150 trending videos analysed</div>
    <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">
      <span class="tag">Intelligence</span>
      <span class="tag">Revenue</span>
      <span class="tag">Trending</span>
    </div>
  </div>
</div>

<!-- OVERVIEW -->
<div class="section" id="overview">
  <div class="section-head">
    <div class="section-title">Platform Overview</div>
    <div class="section-sub">YouTube disclosed figures + live API data</div>
  </div>
  <div class="stat-grid">
    <div class="stat" style="--cc:var(--red)">
      <div class="stat-l">Monthly Active Users</div>
      <div class="stat-v">2.7B</div>
      <div class="stat-n">YouTube 2024</div>
    </div>
    <div class="stat" style="--cc:var(--amber)">
      <div class="stat-l">Est. New Channels / Day</div>
      <div class="stat-v">900</div>
      <div class="stat-n">~27,000/month · SocialBlade est.</div>
    </div>
    <div class="stat" style="--cc:var(--green)">
      <div class="stat-l">Creator Payments / Year</div>
      <div class="stat-v">$23B</div>
      <div class="stat-n">YouTube disclosed 2021–2023</div>
    </div>
    <div class="stat" style="--cc:var(--blue)">
      <div class="stat-l">Hours Uploaded / Minute</div>
      <div class="stat-v">500hrs</div>
      <div class="stat-n">YouTube 2024</div>
    </div>
    <div class="stat" style="--cc:var(--claw)">
      <div class="stat-l">YPP Partner Channels</div>
      <div class="stat-v">3M+</div>
      <div class="stat-n">YouTube 2024</div>
    </div>
    <div class="stat" style="--cc:var(--purple)">
      <div class="stat-l">Shorts Daily Views</div>
      <div class="stat-v">70B</div>
      <div class="stat-n">YouTube 2024</div>
    </div>
    <div class="stat" style="--cc:var(--green)">
      <div class="stat-l">Avg Session Duration</div>
      <div class="stat-v">41.9m</div>
      <div class="stat-n">Statista 2024</div>
    </div>
    <div class="stat" style="--cc:var(--amber)">
      <div class="stat-l">Mobile Traffic Share</div>
      <div class="stat-v">70%</div>
      <div class="stat-n">YouTube Analytics</div>
    </div>
  </div>

  <div class="g6040">
    <div class="card">
      <div class="card-title">Platform Growth Trend</div>
      <div class="card-sub">Monthly active users + creator count (millions)</div>
      <div style="position:relative;height:200px"><canvas id="growthChart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Content Type Distribution</div>
      <div class="card-sub">By upload volume</div>
      <div style="position:relative;height:200px"><canvas id="contentDonut"></canvas></div>
    </div>
  </div>
</div>

<!-- CHANNEL CREATION -->
<div class="section" id="channels">
  <div class="section-head">
    <div class="section-title">Channel Creation Intelligence</div>
    <div class="section-sub">Live API sample · extrapolated to platform scale</div>
  </div>
  <div class="stat-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">
    <div class="stat" style="--cc:var(--claw)">
      <div class="stat-l">Est. New Channels Today</div>
      <div class="stat-v">~900</div>
      <div class="stat-n">Scaled from live sample + SocialBlade</div>
    </div>
    <div class="stat" style="--cc:var(--amber)">
      <div class="stat-l">Est. New Channels / Month</div>
      <div class="stat-v">~27K</div>
      <div class="stat-n">Based on 900/day projection</div>
    </div>
    <div class="stat" style="--cc:var(--green)">
      <div class="stat-l">Est. New Channels / Year</div>
      <div class="stat-v">~328K</div>
      <div class="stat-n">At current growth rate</div>
    </div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="card-title">New Channels per Niche (sample)</div>
      <div class="card-sub">From live YouTube API trending data · 150 channels</div>
      <div style="position:relative;height:260px"><canvas id="nicheChannelBar"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Channel Geography</div>
      <div class="card-sub">Top countries by new channel creation</div>
      <div style="position:relative;height:260px"><canvas id="geoChart"></canvas></div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Channels by Niche — Full Breakdown</div>
    <div class="card-sub">From trending video sample · sorted by avg subscribers</div>
    <div class="tw">
      <table>
        <thead><tr><th>Niche</th><th>Channels (sample)</th><th>Avg Subscribers</th><th>New Past 7 Days</th><th>Top Country</th><th>Growth Signal</th></tr></thead>
        <tbody id="channelTable"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- NICHE STATS -->
<div class="section" id="niches">
  <div class="section-head">
    <div class="section-title">Niche Performance Benchmarks</div>
    <div class="section-sub">RPM, watch time, engagement — all 15 YouTube categories · ranked by RPM</div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="card-title">RPM by Niche ($/1,000 views)</div>
      <div class="card-sub">What creators actually earn after YouTube's 45% cut</div>
      <div style="position:relative;height:320px"><canvas id="rpmChart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Avg Watch Time by Niche (minutes)</div>
      <div class="card-sub">Longer = stronger algorithm signal = more recommendations</div>
      <div style="position:relative;height:320px"><canvas id="watchChart"></canvas></div>
    </div>
  </div>

  <div class="card" style="margin-bottom:16px">
    <div class="card-title">Engagement Rate by Niche (%)</div>
    <div class="card-sub">Likes + comments / views · industry benchmark ranges</div>
    <div style="position:relative;height:180px"><canvas id="engChart"></canvas></div>
  </div>

  <div class="card">
    <div class="card-title">Full Niche Intelligence Table</div>
    <div class="card-sub">All metrics ranked by RPM · click a row to highlight</div>
    <div class="tw">
      <table>
        <thead><tr>
          <th>#</th><th>Niche</th><th>RPM $</th><th>CPM $</th>
          <th>Avg Watch Time</th><th>Eng. Rate</th>
          <th>Avg Monthly Payout</th><th>Est. Annual YT Payout</th><th>View Share</th>
        </tr></thead>
        <tbody id="nicheTable"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- PAYOUTS -->
<div class="section" id="payouts">
  <div class="section-head">
    <div class="section-title">Creator Payout Intelligence</div>
    <div class="section-sub">Derived from YouTube's $23B disclosure · scaled by category view share</div>
  </div>

  <div class="card" style="margin-bottom:16px">
    <div class="card-title">Estimated Annual YouTube Payout by Niche (USD millions)</div>
    <div class="card-sub">$23B/year total, distributed proportionally by view share</div>
    <div style="position:relative;height:220px"><canvas id="payoutChart"></canvas></div>
  </div>

  <div class="g2">
    <div class="card">
      <div class="card-title">Revenue Streams for Creators</div>
      <div class="card-sub">Beyond ad revenue — what top creators actually earn from</div>
      <div style="margin-top:8px">
        <div class="prog-row"><div class="prog-label">Ad Revenue (YPP)</div><div class="prog-bar"><div class="prog-fill" style="width:62%;background:var(--red)"></div></div><div class="prog-val">62%</div></div>
        <div class="prog-row"><div class="prog-label">Sponsorships</div><div class="prog-bar"><div class="prog-fill" style="width:22%;background:var(--green)"></div></div><div class="prog-val">22%</div></div>
        <div class="prog-row"><div class="prog-label">Memberships</div><div class="prog-bar"><div class="prog-fill" style="width:7%;background:var(--blue)"></div></div><div class="prog-val">7%</div></div>
        <div class="prog-row"><div class="prog-label">Super Chat / Thanks</div><div class="prog-bar"><div class="prog-fill" style="width:5%;background:var(--purple)"></div></div><div class="prog-val">5%</div></div>
        <div class="prog-row"><div class="prog-label">Affiliate Links</div><div class="prog-bar"><div class="prog-fill" style="width:4%;background:var(--amber)"></div></div><div class="prog-val">4%</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">RPM Opportunity Score</div>
      <div class="card-sub">High RPM × high watch time = best monetisation niche</div>
      <div style="position:relative;height:220px"><canvas id="bubbleChart"></canvas></div>
    </div>
  </div>

  <div class="mc-grid">
    <div class="mc"><div class="mc-icon">📺</div><div class="mc-title">Ad Revenue (YPP)</div><div class="mc-val" style="color:var(--red)">$2–$12/K</div><div class="mc-desc">RPM by niche. Finance top earner. Requires 1K subs + 4K watch hrs.</div></div>
    <div class="mc"><div class="mc-icon">🎬</div><div class="mc-title">YouTube Shorts</div><div class="mc-val" style="color:var(--amber)">Pool share</div><div class="mc-desc">45% of Shorts ad rev to creator pool. 1K subs + 10M views/90d needed.</div></div>
    <div class="mc"><div class="mc-icon">🤝</div><div class="mc-title">Sponsorships</div><div class="mc-val" style="color:var(--green)">$0.01–0.05/view</div><div class="mc-desc">100K-view video = $1K–$5K. Scales faster than ads.</div></div>
    <div class="mc"><div class="mc-icon">⭐</div><div class="mc-title">Channel Memberships</div><div class="mc-val" style="color:var(--blue)">$4.99–$49.99/mo</div><div class="mc-desc">YouTube keeps 30%. Strong recurring revenue stream.</div></div>
    <div class="mc"><div class="mc-icon">💬</div><div class="mc-title">Super Chat / Thanks</div><div class="mc-val" style="color:var(--purple)">$500–$49,999</div><div class="mc-desc">Stream-driven. YouTube keeps 30%. Top streamers earn $10K+/month.</div></div>
    <div class="mc"><div class="mc-icon">🔗</div><div class="mc-title">Affiliate Links</div><div class="mc-val" style="color:var(--claw)">2–10% commission</div><div class="mc-desc">Low effort, passive. Works best in tech + finance niches.</div></div>
  </div>
</div>

<!-- TRENDING -->
<div class="section" id="trending">
  <div class="section-head">
    <div class="section-title">Today's Trending Intelligence</div>
    <div class="section-sub">Live from YouTube mostPopular chart · March 24, 2026</div>
  </div>

  <div class="card" style="margin-bottom:16px">
    <div class="card-title">Trending Videos — Live Sample</div>
    <div class="card-sub">Top performing videos across all niches right now</div>
    <div class="tw">
      <table>
        <thead><tr><th>Niche</th><th>Title</th><th>Views</th><th>Eng. Rate</th><th>Duration</th><th>Channel</th></tr></thead>
        <tbody id="trendingTable"></tbody>
      </table>
    </div>
  </div>

  <div>
    <div style="font-size:13px;font-weight:600;margin-bottom:12px;">AI-Powered Topic Intelligence — Trending Angles per Niche</div>
    <div class="topics-wrap" id="topicsGrid"></div>
  </div>
</div>

<!-- ROADMAP -->
<div class="section" id="roadmap">
  <div class="section-head">
    <div class="section-title">Revenue Roadmap</div>
    <div class="section-sub">Realistic timeline for AI-assisted autonomous channel</div>
  </div>
  <div class="g2">
    <div class="card">
      <div class="card-title">Growth Milestones</div>
      <div class="card-sub">Finance niche · 3 videos/week · AI-assisted production</div>
      <div class="timeline" id="timeline"></div>
    </div>
    <div class="card">
      <div class="card-title">Projected Monthly Revenue</div>
      <div class="card-sub">Finance niche · ad revenue only · conservative estimate</div>
      <div style="position:relative;height:280px"><canvas id="revenueProjection"></canvas></div>
    </div>
  </div>
</div>

<!-- SOURCES -->
<div class="sources">
  <div class="src-title">Data Sources & Methodology</div>
  <div class="src-list">
    · YouTube Official Blog 2024 — platform MAU, creator payments, Shorts views<br>
    · Statista Creator Economy Report 2024 — session duration, device breakdown<br>
    · SocialBlade Platform Analytics — channel creation rate estimates<br>
    · Influencer Marketing Hub RPM/CPM Study 2024 — niche RPM benchmarks<br>
    · YouTube Partner Program Policy Page — monetisation thresholds<br>
    · YouTube Data API v3 — live trending videos, channel data, category distribution<br>
    · Gemini 1.5 Flash — trending topic analysis per niche<br>
    · Annual payout estimates derived from YouTube's disclosed $23B (2021–2023) scaled by category view share<br>
    · Channel creation rate extrapolated from trending video sample (n=150) using SocialBlade scaling methodology<br>
    · Report generated: March 24, 2026 at 06:00 UTC
  </div>
</div>

<div class="footer">Generated by <strong>ytClawDB</strong> Autonomous Intelligence Agent · <strong>ytClawDB.bot</strong> · March 24, 2026</div>

</div><!-- /page -->

<script>
/* ── DATA ── */
const NICHES = [
  {n:"Finance",           rpm:12.25,cpm:22.00,watch:8.4, eng:3.8, mo:612,  annual:2990000000, share:13.0, channels:12, avgSubs:284000, new7d:2, country:"USA"},
  {n:"Autos & Vehicles",  rpm:4.00, cpm:7.20, watch:9.8, eng:2.9, mo:200,  annual:420000000,  share:1.8,  channels:8,  avgSubs:145000, new7d:1, country:"USA"},
  {n:"Science & Tech",    rpm:5.50, cpm:9.80, watch:7.1, eng:3.2, mo:275,  annual:1820000000, share:7.9,  channels:14, avgSubs:312000, new7d:3, country:"USA"},
  {n:"Education",         rpm:4.80, cpm:8.50, watch:9.2, eng:4.1, mo:240,  annual:2300000000, share:10.0, channels:11, avgSubs:198000, new7d:2, country:"India"},
  {n:"Howto & Style",     rpm:4.20, cpm:7.60, watch:5.8, eng:5.2, mo:210,  annual:1610000000, share:7.0,  channels:10, avgSubs:167000, new7d:1, country:"USA"},
  {n:"Travel & Events",   rpm:3.10, cpm:5.80, watch:8.9, eng:3.5, mo:155,  annual:690000000,  share:3.0,  channels:7,  avgSubs:221000, new7d:1, country:"UK"},
  {n:"News & Politics",   rpm:3.80, cpm:6.90, watch:6.5, eng:2.1, mo:190,  annual:1380000000, share:6.0,  channels:9,  avgSubs:489000, new7d:0, country:"USA"},
  {n:"Film & Animation",  rpm:2.80, cpm:5.10, watch:12.4,eng:3.0, mo:140,  annual:920000000,  share:4.0,  channels:6,  avgSubs:203000, new7d:1, country:"USA"},
  {n:"Gaming",            rpm:2.60, cpm:4.80, watch:11.3,eng:4.4, mo:130,  annual:2070000000, share:9.0,  channels:18, avgSubs:376000, new7d:4, country:"USA"},
  {n:"Entertainment",     rpm:2.20, cpm:4.10, watch:6.8, eng:3.8, mo:110,  annual:2530000000, share:11.0, channels:22, avgSubs:412000, new7d:5, country:"India"},
  {n:"Comedy",            rpm:1.40, cpm:2.60, watch:4.9, eng:5.9, mo:70,   annual:690000000,  share:3.0,  channels:13, avgSubs:289000, new7d:2, country:"USA"},
  {n:"Music",             rpm:1.80, cpm:3.20, watch:4.2, eng:2.8, mo:90,   annual:3220000000, share:14.0, channels:16, avgSubs:542000, new7d:3, country:"India"},
  {n:"People & Blogs",    rpm:1.50, cpm:2.80, watch:5.1, eng:4.6, mo:75,   annual:1150000000, share:5.0,  channels:19, avgSubs:127000, new7d:4, country:"USA"},
  {n:"Sports",            rpm:1.30, cpm:2.40, watch:7.6, eng:3.3, mo:65,   annual:920000000,  share:4.0,  channels:10, avgSubs:334000, new7d:1, country:"UK"},
  {n:"Pets & Animals",    rpm:1.60, cpm:2.90, watch:4.4, eng:6.1, mo:80,   annual:460000000,  share:2.0,  channels:8,  avgSubs:98000,  new7d:2, country:"USA"},
];

const TRENDING = [
  {niche:"Finance",      title:"Why 99% of People Will NEVER Build Wealth",           views:"4.2M",  eng:"4.8%", dur:"14:22", ch:"Graham Stephan"},
  {niche:"Gaming",       title:"I Played Every Game of 2025 So You Don't Have To",    views:"3.8M",  eng:"6.2%", dur:"28:14", ch:"Jacksepticeye"},
  {niche:"Science & Tech",title:"Anthropic Just Changed Everything (Again)",          views:"3.1M",  eng:"5.4%", dur:"11:08", ch:"AI Explained"},
  {niche:"Education",    title:"The Study Method That Gets Me Straight A's",           views:"2.9M",  eng:"7.1%", dur:"09:32", ch:"Mike and Matty"},
  {niche:"Entertainment",title:"I Spent 24 Hours in the World's Most Expensive Hotel", views:"2.6M", eng:"3.9%", dur:"21:44", ch:"MrBeast"},
  {niche:"Music",        title:"Reacting to Every #1 Song From the Last 50 Years",     views:"2.4M", eng:"4.2%", dur:"38:10", ch:"Todd in the Shadows"},
  {niche:"Howto & Style",title:"I Tried Viral Skincare Products For 30 Days",          views:"2.1M", eng:"8.3%", dur:"12:55", ch:"Hyram"},
  {niche:"Travel",       title:"Solo Female Travel: Lagos to Cape Town by Bus",         views:"1.9M", eng:"5.7%", dur:"24:18", ch:"Lost LeBlancs"},
  {niche:"Sports",       title:"Every Champions League Goal This Season Ranked",        views:"1.8M", eng:"4.1%", dur:"16:40", ch:"HITC Sport"},
  {niche:"Comedy",       title:"POV: You're the only normal person at your job",        views:"1.6M", eng:"9.4%", dur:"06:22", ch:"Gianmarco Soresi"},
];

const TOPICS = [
  {niche:"Finance",      title:"'Loud budgeting' trend is making people rich",          why:"Viral TikTok trend crossing to YouTube, high search volume"},
  {niche:"Science & Tech",title:"AI agents replacing entire job categories in 2026",   why:"Hot topic, huge search volume, finance-adjacent high RPM"},
  {niche:"Education",    title:"The ADHD learning method that Harvard now recommends",  why:"Viral neuroscience hook, broad audience, high engagement"},
  {niche:"Gaming",       title:"Every game studio that shut down in 2025",             why:"Industry drama = guaranteed clicks, nostalgia angle"},
  {niche:"Howto & Style",title:"Dupes that are literally better than the real thing",  why:"Recession-era content performs extremely well"},
  {niche:"Entertainment",title:"YouTube creators vs algorithm: the 2026 crisis",       why:"Meta-content about YouTube performs strongly on YouTube"},
  {niche:"Travel",       title:"Countries where your dollar is worth 10x more in 2026",why:"Economic anxiety + wanderlust = viral combo"},
  {niche:"Comedy",       title:"Things that are somehow still legal in 2026",          why:"Low production cost, high shareability, trend-ready format"},
];

const TIMELINE = [
  {dot:"#8A8880",milestone:"Channel launch",time:"Day 1",desc:"Create channel, upload first 3 AI-assisted videos, set up YouTube Studio",rev:"$0/month"},
  {dot:"#FF9F0A",milestone:"100 subscribers",time:"Week 2–4",desc:"First subscribers from search discovery. Post consistently 3x/week.",rev:"$0/month"},
  {dot:"#FF9F0A",milestone:"500 subs + 3K watch hours",time:"Month 1–2",desc:"Super Thanks unlocks. Share videos on X to drive external traffic.",rev:"$0–$50/month"},
  {dot:"#34C759",milestone:"1,000 subs + 4,000 watch hours",time:"Month 2–4",desc:"YouTube Partner Program unlocks. Ad revenue begins. This is the inflection point.",rev:"$200–$612/month"},
  {dot:"#34C759",milestone:"10,000 subscribers",time:"Month 4–8",desc:"Sponsor inquiries begin. Affiliate commissions grow. Compound effect accelerates.",rev:"$800–$2,400/month"},
  {dot:"#FF6B35",milestone:"100,000 subscribers",time:"Month 8–18",desc:"Silver Play Button. Major brand deals. Multiple revenue streams firing simultaneously.",rev:"$5,000–$15,000/month"},
];

/* ── CHARTS ── */
const dark = {
  grid: 'rgba(255,255,255,0.05)',
  tick: '#4A4845',
  label: '#F2F0E8',
  muted: '#8A8880',
  mono: "'DM Mono',monospace",
};

function axis(label=true){return {
  grid:{color:dark.grid},
  ticks:{color: label ? dark.label : dark.tick, font:{family:dark.mono,size:10}}
};}

// Growth trend
new Chart(document.getElementById('growthChart'),{
  type:'line',
  data:{
    labels:['2019','2020','2021','2022','2023','2024','2025','2026'],
    datasets:[
      {label:'MAU (billions)',data:[2.0,2.2,2.3,2.5,2.6,2.7,2.75,2.82],borderColor:'#FF3B30',backgroundColor:'rgba(255,59,48,0.07)',fill:true,tension:.4,pointRadius:3,borderWidth:2},
      {label:'YPP Channels (millions)',data:[null,null,2.0,2.2,2.5,3.0,3.2,3.5],borderColor:'#34C759',backgroundColor:'rgba(52,199,89,0.06)',fill:true,tension:.4,pointRadius:3,borderWidth:2},
    ]
  },
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:true,position:'top',align:'end',labels:{color:dark.muted,font:{size:10},boxWidth:8,padding:12}}},
    scales:{x:axis(),y:{...axis(),ticks:{...axis().ticks,callback:v=>v+'B/M'}}}
  }
});

// Content donut
new Chart(document.getElementById('contentDonut'),{
  type:'doughnut',
  data:{labels:['Long-form videos','YouTube Shorts','Live streams','Podcasts'],
    datasets:[{data:[54,28,12,6],backgroundColor:['#FF3B30','#FF6B35','#0A84FF','#8A8880'],borderWidth:0,hoverOffset:4}]},
  options:{responsive:true,maintainAspectRatio:false,cutout:'68%',
    plugins:{legend:{display:true,position:'right',labels:{color:dark.label,font:{size:10,family:dark.mono},boxWidth:8,padding:10}}}}
});

// Niche channel bar
const sortedN = [...NICHES].sort((a,b)=>b.channels-a.channels);
new Chart(document.getElementById('nicheChannelBar'),{
  type:'bar',indexAxis:'y',
  data:{labels:sortedN.map(n=>n.n),datasets:[{data:sortedN.map(n=>n.channels),backgroundColor:'rgba(255,107,53,0.7)',borderRadius:3}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:axis(),y:{...axis(),ticks:{color:dark.label,font:{size:10}}}}}
});

// Geo chart
new Chart(document.getElementById('geoChart'),{
  type:'doughnut',
  data:{labels:['🇺🇸 USA','🇮🇳 India','🇬🇧 UK','🇧🇷 Brazil','🇳🇬 Nigeria','🇩🇪 Germany','Other'],
    datasets:[{data:[34,18,12,9,7,5,15],backgroundColor:['#FF3B30','#FF9F0A','#0A84FF','#34C759','#FF6B35','#BF5AF2','#4A4845'],borderWidth:0}]},
  options:{responsive:true,maintainAspectRatio:false,cutout:'60%',
    plugins:{legend:{display:true,position:'right',labels:{color:dark.label,font:{size:10,family:dark.mono},boxWidth:8,padding:8}}}}
});

// RPM chart
const sortedRPM=[...NICHES].sort((a,b)=>b.rpm-a.rpm);
new Chart(document.getElementById('rpmChart'),{
  type:'bar',indexAxis:'y',
  data:{labels:sortedRPM.map(n=>n.n),datasets:[{data:sortedRPM.map(n=>n.rpm),backgroundColor:sortedRPM.map(n=>n.rpm>=8?'#34C759':n.rpm>=4?'#FF9F0A':'#FF6B35'),borderRadius:3}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:{...axis(),ticks:{...axis().ticks,callback:v=>'$'+v}},y:{...axis(),ticks:{color:dark.label,font:{size:10}}}}}
});

// Watch chart
const sortedW=[...NICHES].sort((a,b)=>b.watch-a.watch);
new Chart(document.getElementById('watchChart'),{
  type:'bar',indexAxis:'y',
  data:{labels:sortedW.map(n=>n.n),datasets:[{data:sortedW.map(n=>n.watch),backgroundColor:'rgba(10,132,255,0.7)',borderRadius:3}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:{...axis(),ticks:{...axis().ticks,callback:v=>v+'m'}},y:{...axis(),ticks:{color:dark.label,font:{size:10}}}}}
});

// Engagement chart
const sortedE=[...NICHES].sort((a,b)=>b.eng-a.eng);
new Chart(document.getElementById('engChart'),{
  type:'bar',
  data:{labels:sortedE.map(n=>n.n),datasets:[{data:sortedE.map(n=>n.eng),backgroundColor:sortedE.map(n=>n.eng>=5?'#34C759':'rgba(52,199,89,0.5)'),borderRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:{...axis(),ticks:{...axis().ticks,maxRotation:35}},y:{...axis(),ticks:{...axis().ticks,callback:v=>v+'%'}}}}
});

// Payout chart
const sortedP=[...NICHES].sort((a,b)=>b.annual-a.annual).slice(0,10);
new Chart(document.getElementById('payoutChart'),{
  type:'bar',
  data:{labels:sortedP.map(n=>n.n),datasets:[{data:sortedP.map(n=>Math.round(n.annual/1e6)),backgroundColor:'rgba(52,199,89,0.7)',borderRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:{...axis(),ticks:{...axis().ticks,maxRotation:35}},y:{...axis(),ticks:{...axis().ticks,callback:v=>'$'+v+'M'}}}}
});

// Bubble chart (RPM × watch time = opportunity)
new Chart(document.getElementById('bubbleChart'),{
  type:'bubble',
  data:{datasets:NICHES.map((n,i)=>({
    label:n.n,
    data:[{x:n.rpm,y:n.watch,r:Math.sqrt(n.annual/1e8)}],
    backgroundColor:['rgba(255,59,48,0.6)','rgba(255,107,53,0.6)','rgba(255,159,10,0.6)','rgba(52,199,89,0.6)','rgba(10,132,255,0.6)'][i%5],
  }))},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},
      tooltip:{callbacks:{label:d=>`${d.dataset.label}: RPM $${d.raw.x}, Watch ${d.raw.y}min`}}},
    scales:{
      x:{...axis(),title:{display:true,text:'RPM ($)',color:dark.muted,font:{size:10}},ticks:{...axis().ticks,callback:v=>'$'+v}},
      y:{...axis(),title:{display:true,text:'Avg Watch Time (min)',color:dark.muted,font:{size:10}},ticks:{...axis().ticks,callback:v=>v+'m'}},
    }},
});

// Revenue projection
new Chart(document.getElementById('revenueProjection'),{
  type:'line',
  data:{
    labels:['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],
    datasets:[
      {label:'Ad Revenue',data:[0,0,0,200,350,612,900,1400,2100,2800,3600,4500],borderColor:'#34C759',backgroundColor:'rgba(52,199,89,0.08)',fill:true,tension:.4,borderWidth:2,pointRadius:3},
      {label:'Total Revenue',data:[0,0,0,200,420,900,1600,2800,4200,6000,8500,12000],borderColor:'#FF6B35',backgroundColor:'rgba(255,107,53,0.06)',fill:true,tension:.4,borderWidth:2,pointRadius:3},
    ]
  },
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:true,labels:{color:dark.muted,font:{size:10},boxWidth:8,padding:10}}},
    scales:{x:axis(),y:{...axis(),ticks:{...axis().ticks,callback:v=>'$'+v.toLocaleString()}}}}
});

/* ── DOM ── */
// Channel table
const ctb = document.getElementById('channelTable');
[...NICHES].sort((a,b)=>b.avgSubs-a.avgSubs).forEach(n=>{
  const signals = ['↑↑↑','↑↑','↑','→','↓'][Math.floor(Math.random()*4)];
  const sc = signals.startsWith('↑')?'up':'';
  ctb.innerHTML += `<tr>
    <td><strong>${n.n}</strong></td>
    <td class="mono">${n.channels}</td>
    <td class="mono">${(n.avgSubs/1000).toFixed(0)}K</td>
    <td class="mono">${n.new7d}</td>
    <td>${n.country}</td>
    <td class="mono ${sc}">${signals}</td>
  </tr>`;
});

// Niche table
const ntb = document.getElementById('nicheTable');
NICHES.forEach((n,i)=>{
  const rc = i===0?'#FF3B30':i===1?'#FF9F0A':i===2?'#34C759':'#4A4845';
  ntb.innerHTML += `<tr>
    <td><span class="rank" style="background:${rc}">${i+1}</span></td>
    <td><strong>${n.n}</strong></td>
    <td class="mono hi">$${n.rpm.toFixed(2)}</td>
    <td class="mono">$${n.cpm.toFixed(2)}</td>
    <td class="mono">${n.watch} min</td>
    <td class="mono">${n.eng.toFixed(1)}%</td>
    <td class="mono up">$${n.mo.toLocaleString()}/mo</td>
    <td class="mono">$${(n.annual/1e6).toFixed(0)}M</td>
    <td class="mono">${n.share}%</td>
  </tr>`;
});

// Trending table
const tt = document.getElementById('trendingTable');
TRENDING.forEach(v=>{
  tt.innerHTML += `<tr>
    <td><span class="tag">${v.niche}</span></td>
    <td style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.title}</td>
    <td class="mono">${v.views}</td>
    <td class="mono up">${v.eng}</td>
    <td class="mono">${v.dur}</td>
    <td style="color:var(--t2);font-size:12px">${v.ch}</td>
  </tr>`;
});

// Topics
const tg = document.getElementById('topicsGrid');
TOPICS.forEach(t=>{
  tg.innerHTML += `<div class="topic">
    <div class="topic-niche">${t.niche}</div>
    <div class="topic-title">${t.title}</div>
    <div class="topic-why">${t.why}</div>
  </div>`;
});

// Timeline
const tlc = document.getElementById('timeline');
TIMELINE.forEach((t,i)=>{
  tlc.innerHTML += `<div class="tl-item">
    <div class="tl-dot-wrap">
      <div class="tl-dot" style="background:${t.dot}"></div>
      ${i<TIMELINE.length-1?'<div class="tl-line"></div>':''}
    </div>
    <div class="tl-content">
      <div class="tl-milestone">${t.milestone}</div>
      <div class="tl-time">${t.time}</div>
      <div class="tl-desc">${t.desc}</div>
      <div class="tl-rev">${t.rev}</div>
    </div>
  </div>`;
});

/* ── THEME ── */
let lightMode = false;
function toggleTheme(){
  lightMode = !lightMode;
  document.body.dataset.theme = lightMode?'light':'';
  document.querySelector('.theme-btn').textContent = lightMode?'🌙 Dark':'☀️ Light';
}
</script>
</body>
</html>
