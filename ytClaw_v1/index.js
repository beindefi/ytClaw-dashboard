<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ytClawDB</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
:root {
  --yt: #FF0000;
  --tt: #010101;
  --tt-pink: #FE2C55;
  --tt-cyan: #25F4EE;
  --bg: #F7F6F2;
  --surface: #FFFFFF;
  --surface2: #F0EFE9;
  --border: rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.14);
  --text-1: #1A1916;
  --text-2: #6B6A63;
  --text-3: #A09F98;
  --accent-1: #E85D24;
  --accent-2: #1A56FF;
  --green: #22A06B;
  --red-neg: #E2444A;
  --amber: #BA7517;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --r: 12px;
  --r-sm: 8px;
  font-family: 'DM Sans', sans-serif;
}
[data-theme="dark"] {
  --bg: #111110;
  --surface: #1C1C1A;
  --surface2: #252523;
  --border: rgba(255,255,255,0.07);
  --border-strong: rgba(255,255,255,0.12);
  --text-1: #ECEAE3;
  --text-2: #9A9890;
  --text-3: #5E5D58;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text-1); min-height: 100vh; }

/* ── Sidebar ── */
.sidebar {
  position: fixed; left: 0; top: 0; bottom: 0; width: 220px;
  background: var(--surface); border-right: 0.5px solid var(--border-strong);
  display: flex; flex-direction: column; z-index: 100; padding: 0 0 16px;
  box-shadow: var(--shadow-sm);
}
.logo {
  padding: 20px 20px 16px;
  border-bottom: 0.5px solid var(--border);
  margin-bottom: 8px;
}
.logo-wordmark { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: var(--text-1); letter-spacing: -0.5px; }
.logo-sub { font-size: 11px; color: var(--text-3); letter-spacing: 0.04em; text-transform: uppercase; margin-top: 2px; }
.logo-claw { display: inline-block; margin-right: 4px; }

.nav-section { padding: 0 12px; margin-top: 4px; }
.nav-label { font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 8px 4px; font-weight: 500; }
.nav-item {
  display: flex; align-items: center; gap: 9px; padding: 8px 10px;
  border-radius: var(--r-sm); cursor: pointer; font-size: 13.5px; color: var(--text-2);
  font-weight: 400; transition: background 0.15s, color 0.15s; margin-bottom: 1px;
  border: none; background: none; width: 100%; text-align: left;
}
.nav-item:hover { background: var(--surface2); color: var(--text-1); }
.nav-item.active { background: var(--text-1); color: var(--bg); font-weight: 500; }
.nav-item.active .nav-icon { opacity: 1; }
.nav-icon { width: 16px; height: 16px; opacity: 0.6; flex-shrink: 0; }
.nav-badge { margin-left: auto; font-size: 10px; background: var(--accent-1); color: white; padding: 1px 6px; border-radius: 10px; font-weight: 500; }

.platform-toggle {
  display: flex; gap: 6px; padding: 12px 12px 0;
  margin-top: auto;
}
.pt-btn {
  flex: 1; padding: 7px 0; border-radius: var(--r-sm); border: 0.5px solid var(--border-strong);
  font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  background: var(--surface2); color: var(--text-2);
  font-family: 'DM Sans', sans-serif;
}
.pt-btn.yt-active { background: var(--yt); color: white; border-color: var(--yt); }
.pt-btn.tt-active { background: var(--tt-pink); color: white; border-color: var(--tt-pink); }

.theme-toggle {
  margin: 8px 12px 0;
  padding: 8px 10px; border-radius: var(--r-sm); border: 0.5px solid var(--border);
  background: var(--surface2); color: var(--text-2); font-size: 12.5px;
  cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif;
  transition: all 0.15s;
}
.theme-toggle:hover { border-color: var(--border-strong); color: var(--text-1); }

/* ── Main ── */
.main { margin-left: 220px; min-height: 100vh; }
.topbar {
  padding: 16px 28px; display: flex; align-items: center; justify-content: space-between;
  border-bottom: 0.5px solid var(--border); background: var(--surface);
  position: sticky; top: 0; z-index: 50;
}
.page-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -0.3px; }
.page-sub { font-size: 13px; color: var(--text-2); margin-top: 1px; }
.topbar-right { display: flex; align-items: center; gap: 10px; }
.date-range {
  display: flex; background: var(--surface2); border: 0.5px solid var(--border);
  border-radius: var(--r-sm); overflow: hidden;
}
.dr-btn {
  padding: 6px 12px; font-size: 12px; color: var(--text-2); cursor: pointer;
  border: none; background: none; font-family: 'DM Sans', sans-serif;
  transition: background 0.15s, color 0.15s;
}
.dr-btn.active { background: var(--text-1); color: var(--bg); font-weight: 500; }

.upload-btn {
  display: flex; align-items: center; gap: 6px; padding: 7px 14px;
  background: var(--accent-1); color: white; border: none; border-radius: var(--r-sm);
  font-size: 12.5px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif;
  transition: opacity 0.15s;
}
.upload-btn:hover { opacity: 0.88; }

/* ── Content ── */
.content { padding: 24px 28px; }

/* ── Panels ── */
.panel { display: none; }
.panel.active { display: block; }

/* ── Metric Grid ── */
.metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
.metric-card {
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: var(--r); padding: 16px 18px; box-shadow: var(--shadow-sm);
  position: relative; overflow: hidden;
}
.metric-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--card-accent, var(--accent-1));
}
.metric-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); font-weight: 500; margin-bottom: 8px; }
.metric-value { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-1); }
.metric-change { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 12px; }
.metric-change.up { color: var(--green); }
.metric-change.down { color: var(--red-neg); }
.metric-change.neutral { color: var(--text-3); }
.metric-badge { font-size: 10px; padding: 2px 7px; border-radius: 10px; background: var(--surface2); color: var(--text-3); margin-left: auto; }

/* ── Chart Cards ── */
.chart-row { display: grid; gap: 14px; margin-bottom: 20px; }
.chart-row.split-3-1 { grid-template-columns: 3fr 1fr; }
.chart-row.split-2-2 { grid-template-columns: 1fr 1fr; }
.chart-row.full { grid-template-columns: 1fr; }
.chart-card {
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: var(--r); padding: 18px 20px; box-shadow: var(--shadow-sm);
}
.chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
.chart-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: -0.2px; }
.chart-sub { font-size: 12px; color: var(--text-2); margin-top: 2px; }
.chart-actions { display: flex; gap: 6px; }
.chart-action {
  padding: 4px 10px; font-size: 11px; border: 0.5px solid var(--border);
  border-radius: 6px; cursor: pointer; background: var(--surface2); color: var(--text-2);
  font-family: 'DM Sans', sans-serif; transition: all 0.15s;
}
.chart-action:hover, .chart-action.active { background: var(--text-1); color: var(--bg); border-color: var(--text-1); }

/* ── Top Videos Table ── */
.video-table { width: 100%; border-collapse: collapse; }
.video-table th {
  text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-3); font-weight: 500; padding: 0 12px 10px 0; border-bottom: 0.5px solid var(--border);
}
.video-table td { padding: 12px 12px 12px 0; border-bottom: 0.5px solid var(--border); font-size: 13px; vertical-align: middle; }
.video-table tr:last-child td { border-bottom: none; }
.video-thumb { width: 52px; height: 34px; background: var(--surface2); border-radius: 5px; object-fit: cover; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.video-info { display: flex; align-items: center; gap: 10px; }
.video-title-text { font-size: 13px; color: var(--text-1); font-weight: 400; max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.video-meta { font-size: 11px; color: var(--text-3); margin-top: 2px; }
.platform-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 500;
}
.chip-yt { background: rgba(255,0,0,0.08); color: #CC0000; }
.chip-tt { background: rgba(254,44,85,0.08); color: #C01040; }
.trend-bar-wrap { display: flex; align-items: center; gap: 8px; }
.trend-bar { height: 4px; border-radius: 2px; background: var(--surface2); flex: 1; min-width: 60px; }
.trend-bar-fill { height: 100%; border-radius: 2px; background: var(--accent-1); transition: width 0.6s; }
.viral-score { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; }

/* ── Hashtag Grid ── */
.hashtag-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.hashtag-item {
  background: var(--surface2); border-radius: var(--r-sm); padding: 12px 14px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  border: 0.5px solid var(--border); cursor: pointer; transition: border-color 0.15s;
}
.hashtag-item:hover { border-color: var(--border-strong); }
.hashtag-name { font-size: 13px; color: var(--text-1); font-weight: 500; }
.hashtag-count { font-size: 11px; color: var(--text-2); margin-top: 2px; }
.hashtag-rank { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-3); }
.trend-arrow { font-size: 13px; }
.trend-up { color: var(--green); }
.trend-down { color: var(--red-neg); }

/* ── Donut legend ── */
.donut-legend { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
.dl-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.dl-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
.dl-label { color: var(--text-1); flex: 1; }
.dl-val { color: var(--text-2); font-size: 12px; }

/* ── Monetisation ── */
.mono-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; }
.mono-card {
  background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--r);
  padding: 18px 20px; box-shadow: var(--shadow-sm);
}
.mono-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-bottom: 12px; }
.mono-title { font-size: 13px; font-weight: 500; color: var(--text-1); margin-bottom: 4px; }
.mono-value { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.4px; }
.mono-desc { font-size: 11.5px; color: var(--text-2); margin-top: 6px; line-height: 1.5; }
.progress-bar { height: 5px; background: var(--surface2); border-radius: 3px; margin-top: 10px; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.8s; }

/* ── Audience ── */
.aud-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 20px; }

/* ── Upload modal ── */
.modal-bg {
  display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.45);
  z-index: 200; align-items: center; justify-content: center;
}
.modal-bg.open { display: flex; }
.modal {
  background: var(--surface); border-radius: 16px; padding: 28px 32px; width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25); position: relative;
}
.modal-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.modal-sub { font-size: 13px; color: var(--text-2); margin-bottom: 20px; }
.drop-zone {
  border: 1.5px dashed var(--border-strong); border-radius: var(--r); padding: 32px;
  text-align: center; cursor: pointer; transition: border-color 0.15s, background 0.15s;
}
.drop-zone:hover { border-color: var(--accent-1); background: rgba(232,93,36,0.04); }
.drop-icon { font-size: 28px; margin-bottom: 8px; }
.drop-text { font-size: 14px; color: var(--text-1); font-weight: 500; }
.drop-sub { font-size: 12px; color: var(--text-3); margin-top: 4px; }
.modal-close {
  position: absolute; top: 16px; right: 18px; background: var(--surface2);
  border: none; cursor: pointer; font-size: 16px; color: var(--text-2);
  width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .metric-grid { grid-template-columns: repeat(2, 1fr); }
  .chart-row.split-3-1 { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="logo">
    <div class="logo-wordmark"><span class="logo-claw">🦞</span>ytClawDB</div>
    <div class="logo-sub">Creator Analytics</div>
  </div>

  <nav class="nav-section">
    <div class="nav-label">Analytics</div>
    <button class="nav-item active" onclick="showPanel('overview',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
      Overview
    </button>
    <button class="nav-item" onclick="showPanel('performance',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1,12 5,7 8,9 12,4 15,6"/></svg>
      Performance
    </button>
    <button class="nav-item" onclick="showPanel('audience',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="6" cy="5" r="2.5"/><circle cx="11" cy="4" r="2"/><path d="M1 13c0-2.8 2.2-5 5-5s5 2.2 5 5" opacity=".6"/><path d="M10.5 9.5c1.8.5 3 2 3 3.5" opacity=".6"/></svg>
      Audience
    </button>
    <button class="nav-item" onclick="showPanel('trending',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 14l4-4 3 2 4-5 3-2"/><circle cx="15" cy="5" r="0" fill="currentColor"/></svg>
      Trending
      <span class="nav-badge">12</span>
    </button>
    <button class="nav-item" onclick="showPanel('monetisation',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" opacity=".15"/><text x="5.5" y="12" font-size="10" font-weight="700">$</text></svg>
      Monetisation
    </button>
    <button class="nav-item" onclick="showPanel('topvideos',this)">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="3" width="14" height="10" rx="2" opacity=".15"/><polygon points="6,6 11,8 6,10"/><rect x="1" y="3" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
      Top Videos
    </button>
  </nav>

  <nav class="nav-section" style="margin-top:12px">
    <div class="nav-label">Tools</div>
    <button class="nav-item" onclick="openUpload()">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v8M5 5l3-3 3 3M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2"/></svg>
      Import CSV
    </button>
    <button class="nav-item">
      <svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v4l2.5 1.5"/></svg>
      Scheduled Reports
    </button>
  </nav>

  <div class="platform-toggle">
    <button class="pt-btn yt-active" id="ytBtn" onclick="setPlatform('yt')">▶ YouTube</button>
    <button class="pt-btn" id="ttBtn" onclick="setPlatform('tt')">♪ TikTok</button>
  </div>
  <button class="theme-toggle" onclick="toggleTheme()">
    <span id="theme-icon">🌙</span> <span id="theme-label">Dark mode</span>
  </button>
</aside>

<!-- MAIN -->
<main class="main">
  <header class="topbar">
    <div>
      <div class="page-title" id="pageTitle">Overview</div>
      <div class="page-sub" id="pageSub">All platforms · Last 28 days</div>
    </div>
    <div class="topbar-right">
      <div class="date-range">
        <button class="dr-btn" onclick="setRange(this,'7d')">7D</button>
        <button class="dr-btn active" onclick="setRange(this,'28d')">28D</button>
        <button class="dr-btn" onclick="setRange(this,'90d')">90D</button>
        <button class="dr-btn" onclick="setRange(this,'1y')">1Y</button>
      </div>
      <button class="upload-btn" onclick="openUpload()">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v7M3.5 4l3-3 3 3M1 10v1.5A.5.5 0 001.5 12h10a.5.5 0 00.5-.5V10" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
        Import Data
      </button>
    </div>
  </header>

  <div class="content">

    <!-- OVERVIEW PANEL -->
    <div class="panel active" id="panel-overview">
      <div class="metric-grid">
        <div class="metric-card" style="--card-accent: #FF0000">
          <div class="metric-label">Total Views</div>
          <div class="metric-value">48.3M</div>
          <div class="metric-change up">↑ 12.4% <span class="metric-badge">vs prev period</span></div>
        </div>
        <div class="metric-card" style="--card-accent: var(--tt-pink)">
          <div class="metric-label">Followers Gained</div>
          <div class="metric-value">+84.7K</div>
          <div class="metric-change up">↑ 8.9%</div>
        </div>
        <div class="metric-card" style="--card-accent: var(--green)">
          <div class="metric-label">Avg. Engagement</div>
          <div class="metric-value">6.2%</div>
          <div class="metric-change down">↓ 0.3% <span class="metric-badge">bench: 5.8%</span></div>
        </div>
        <div class="metric-card" style="--card-accent: var(--accent-2)">
          <div class="metric-label">Est. Revenue</div>
          <div class="metric-value">$12,840</div>
          <div class="metric-change up">↑ 21.6%</div>
        </div>
      </div>

      <div class="chart-row split-3-1">
        <div class="chart-card">
          <div class="chart-header">
            <div><div class="chart-title">Views Over Time</div><div class="chart-sub">YouTube + TikTok combined</div></div>
            <div class="chart-actions">
              <button class="chart-action active">Views</button>
              <button class="chart-action">Reach</button>
              <button class="chart-action">Impressions</button>
            </div>
          </div>
          <div style="position:relative;height:220px"><canvas id="viewsChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Platform Split</div><div class="chart-sub">By views</div></div></div>
          <div style="position:relative;height:160px;margin-top:4px"><canvas id="platformDonut"></canvas></div>
          <div class="donut-legend">
            <div class="dl-item"><div class="dl-dot" style="background:#FF0000"></div><div class="dl-label">YouTube</div><div class="dl-val">62% · 29.9M</div></div>
            <div class="dl-item"><div class="dl-dot" style="background:#FE2C55"></div><div class="dl-label">TikTok</div><div class="dl-val">38% · 18.4M</div></div>
          </div>
        </div>
      </div>

      <div class="chart-row split-2-2">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Engagement Breakdown</div><div class="chart-sub">Likes, comments, shares, saves</div></div></div>
          <div style="position:relative;height:200px"><canvas id="engagementBar"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Subscriber Growth</div><div class="chart-sub">Net new followers by week</div></div></div>
          <div style="position:relative;height:200px"><canvas id="subGrowth"></canvas></div>
        </div>
      </div>
    </div>

    <!-- PERFORMANCE PANEL -->
    <div class="panel" id="panel-performance">
      <div class="metric-grid">
        <div class="metric-card" style="--card-accent:#FF0000">
          <div class="metric-label">Watch Time (hrs)</div>
          <div class="metric-value">312K</div>
          <div class="metric-change up">↑ 9.1%</div>
        </div>
        <div class="metric-card" style="--card-accent:var(--amber)">
          <div class="metric-label">Avg. View Duration</div>
          <div class="metric-value">3:24</div>
          <div class="metric-change up">↑ 0:18</div>
        </div>
        <div class="metric-card" style="--card-accent:var(--green)">
          <div class="metric-label">Click-Through Rate</div>
          <div class="metric-value">4.8%</div>
          <div class="metric-change neutral">→ stable</div>
        </div>
        <div class="metric-card" style="--card-accent:var(--accent-2)">
          <div class="metric-label">Retention (50% mark)</div>
          <div class="metric-value">58%</div>
          <div class="metric-change up">↑ 3.2%</div>
        </div>
      </div>
      <div class="chart-row full">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Audience Retention Curve</div><div class="chart-sub">Average % of video watched — all content</div></div></div>
          <div style="position:relative;height:260px"><canvas id="retentionCurve"></canvas></div>
        </div>
      </div>
      <div class="chart-row split-2-2">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Impressions vs Clicks</div><div class="chart-sub">Last 28 days by week</div></div></div>
          <div style="position:relative;height:200px"><canvas id="impVsClick"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Traffic Sources</div><div class="chart-sub">Where views come from</div></div></div>
          <div style="position:relative;height:200px"><canvas id="trafficSources"></canvas></div>
        </div>
      </div>
    </div>

    <!-- AUDIENCE PANEL -->
    <div class="panel" id="panel-audience">
      <div class="aud-grid">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Age Groups</div><div class="chart-sub">Combined platforms</div></div></div>
          <div style="position:relative;height:200px"><canvas id="ageChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Gender Split</div></div></div>
          <div style="position:relative;height:200px"><canvas id="genderChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Top Countries</div><div class="chart-sub">By viewer %</div></div></div>
          <div style="position:relative;height:200px"><canvas id="geoChart"></canvas></div>
        </div>
      </div>
      <div class="chart-row split-2-2">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Best Time to Post</div><div class="chart-sub">Avg. engagement by hour (local time)</div></div></div>
          <div style="position:relative;height:220px"><canvas id="heatmapChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Device Breakdown</div></div></div>
          <div style="position:relative;height:220px"><canvas id="deviceChart"></canvas></div>
        </div>
      </div>
    </div>

    <!-- TRENDING PANEL -->
    <div class="panel" id="panel-trending">
      <div class="chart-row split-2-2" style="margin-bottom:0">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Trending Hashtags</div><div class="chart-sub">Your niche · last 24 hours</div></div></div>
          <div class="hashtag-grid" id="hashtagGrid"></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Viral Score Tracker</div><div class="chart-sub">Your last 10 videos</div></div></div>
          <div style="position:relative;height:260px"><canvas id="viralScoreChart"></canvas></div>
        </div>
      </div>
      <div class="chart-row full" style="margin-top:14px">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Trending Topics Momentum</div><div class="chart-sub">Interest score over 7 days — topics relevant to your channel</div></div></div>
          <div style="position:relative;height:220px"><canvas id="topicMomentum"></canvas></div>
        </div>
      </div>
    </div>

    <!-- MONETISATION PANEL -->
    <div class="panel" id="panel-monetisation">
      <div class="mono-grid">
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(255,193,7,0.12)">💰</div>
          <div class="mono-title">Ad Revenue</div>
          <div class="mono-value" style="color:var(--amber)">$8,240</div>
          <div class="mono-desc">CPM avg $4.12 · 2M monetised views this month</div>
          <div class="progress-bar"><div class="progress-fill" style="width:68%;background:var(--amber)"></div></div>
        </div>
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(34,160,107,0.12)">🤝</div>
          <div class="mono-title">Sponsorships</div>
          <div class="mono-value" style="color:var(--green)">$3,500</div>
          <div class="mono-desc">2 active deals · 1 proposal pending review</div>
          <div class="progress-bar"><div class="progress-fill" style="width:35%;background:var(--green)"></div></div>
        </div>
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(26,86,255,0.1)">🎁</div>
          <div class="mono-title">Super Chats & Gifts</div>
          <div class="mono-value" style="color:var(--accent-2)">$1,100</div>
          <div class="mono-desc">TikTok Gifts: $820 · YouTube SuperChat: $280</div>
          <div class="progress-bar"><div class="progress-fill" style="width:18%;background:var(--accent-2)"></div></div>
        </div>
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(232,93,36,0.1)">🔗</div>
          <div class="mono-title">Affiliate Links</div>
          <div class="mono-value" style="color:var(--accent-1)">$620</div>
          <div class="mono-desc">48 conversions this period · 3.1% conv. rate</div>
          <div class="progress-bar"><div class="progress-fill" style="width:12%;background:var(--accent-1)"></div></div>
        </div>
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(140,60,180,0.1)">⭐</div>
          <div class="mono-title">Memberships</div>
          <div class="mono-value" style="color:#8C3CB4">$380</div>
          <div class="mono-desc">38 active members · $10/mo avg tier</div>
          <div class="progress-bar"><div class="progress-fill" style="width:8%;background:#8C3CB4"></div></div>
        </div>
        <div class="mono-card">
          <div class="mono-icon" style="background:rgba(0,0,0,0.06)">📊</div>
          <div class="mono-title">RPM (Revenue/1K views)</div>
          <div class="mono-value">$4.38</div>
          <div class="mono-desc">↑ 14% vs last period · industry avg $3.20</div>
          <div class="progress-bar"><div class="progress-fill" style="width:55%;background:var(--text-2)"></div></div>
        </div>
      </div>
      <div class="chart-row split-2-2">
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Revenue by Stream</div><div class="chart-sub">Monthly breakdown</div></div></div>
          <div style="position:relative;height:220px"><canvas id="revenueStream"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header"><div><div class="chart-title">Revenue Trend</div><div class="chart-sub">Last 6 months</div></div></div>
          <div style="position:relative;height:220px"><canvas id="revenueTrend"></canvas></div>
        </div>
      </div>
    </div>

    <!-- TOP VIDEOS PANEL -->
    <div class="panel" id="panel-topvideos">
      <div class="chart-card">
        <div class="chart-header">
          <div><div class="chart-title">Top Performing Videos</div><div class="chart-sub">Ranked by Viral Score — last 90 days</div></div>
          <div class="chart-actions">
            <button class="chart-action active">All</button>
            <button class="chart-action">YouTube</button>
            <button class="chart-action">TikTok</button>
          </div>
        </div>
        <table class="video-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Video</th>
              <th>Platform</th>
              <th>Views</th>
              <th>Eng. Rate</th>
              <th>Viral Score</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody id="videoTableBody"></tbody>
        </table>
      </div>
    </div>

  </div>
</div>

<!-- UPLOAD MODAL -->
<div class="modal-bg" id="uploadModal">
  <div class="modal">
    <button class="modal-close" onclick="closeUpload()">×</button>
    <div class="modal-title">Import Analytics Data</div>
    <div class="modal-sub">Upload a CSV export from YouTube Studio or TikTok Analytics</div>
    <div class="drop-zone" onclick="document.getElementById('csvInput').click()" ondragover="event.preventDefault()" ondrop="handleDrop(event)">
      <div class="drop-icon">📂</div>
      <div class="drop-text">Drop your CSV here, or click to browse</div>
      <div class="drop-sub">Supports YouTube Studio Export · TikTok Analytics CSV · up to 10MB</div>
    </div>
    <input type="file" id="csvInput" accept=".csv" style="display:none" onchange="handleFile(event)"/>
    <div style="margin-top:16px;padding:12px 14px;background:var(--surface2);border-radius:var(--r-sm);font-size:12.5px;color:var(--text-2);line-height:1.6">
      <strong style="color:var(--text-1);font-weight:500">How to export:</strong><br>
      YouTube: YouTube Studio → Analytics → Export → CSV<br>
      TikTok: Creator Center → Analytics → Export Data
    </div>
  </div>
</div>

<script>
/* ── State ── */
let activePlatform = 'yt';
let activeTheme = 'light';
let charts = {};

/* ── Data ── */
const labels28 = ['Mar 1','Mar 4','Mar 7','Mar 10','Mar 13','Mar 16','Mar 19','Mar 22','Mar 25','Mar 28'];

const DATA = {
  views: {
    yt:  [1.2,1.5,1.8,1.4,2.1,2.6,2.3,2.8,3.1,3.5].map(v=>v*1e6),
    tt:  [0.8,1.0,1.2,0.9,1.4,1.7,1.5,1.9,2.0,2.4].map(v=>v*1e6),
    all: [2.0,2.5,3.0,2.3,3.5,4.3,3.8,4.7,5.1,5.9].map(v=>v*1e6),
  },
  engagement: ['Likes','Comments','Shares','Saves'],
  engData: [[120000,85000,95000,42000,62000], [18000,14000,16000,8000,11000], [31000,22000,28000,12000,19000], [9000,6500,7800,3200,5100]],
  subGrowth: [8200,12400,9800,14200,10500,16800,13200,18900,15600,21000],
  retention: Array.from({length:20},(_,i)=>Math.max(20,100-i*2.5-Math.random()*8)),
  trafficLabels: ['Search','Suggested','Browse','External','Direct'],
  trafficData: [38,27,18,10,7],
  age: ['13-17','18-24','25-34','35-44','45+'],
  ageData: [8,32,29,18,13],
  countries: ['🇺🇸 USA','🇬🇧 UK','🇨🇦 Canada','🇦🇺 Australia','🇳🇬 Nigeria','🇩🇪 Germany'],
  countryData: [34,16,12,8,7,6],
  revTrend: [6200,7100,8400,9200,10800,12840],
  revLabels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
};

/* ── Colors ── */
const C = {
  yt: '#FF0000', tt: '#FE2C55', ttc: '#25F4EE',
  blue: '#1A56FF', green: '#22A06B', amber: '#BA7517', orange: '#E85D24',
  purple: '#8C3CB4', gray: '#73726C',
};
const getThemeColor = () => activeTheme === 'dark';

/* ── Chart defaults ── */
function chartDefaults() {
  const dark = activeTheme === 'dark';
  return {
    color: dark ? '#9A9890' : '#6B6A63',
    gridColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    tickColor: dark ? '#5E5D58' : '#A09F98',
  };
}

function sharedAxisOpts() {
  const {color, gridColor, tickColor} = chartDefaults();
  return {
    grid: { color: gridColor },
    ticks: { color: tickColor, font: {family:"'DM Sans', sans-serif", size:11} },
  };
}

/* ── Build all charts ── */
function buildCharts() {
  const dark = activeTheme === 'dark';
  const {color} = chartDefaults();
  destroyAll();

  // Views
  charts.views = new Chart(document.getElementById('viewsChart'), {
    type: 'line',
    data: {
      labels: labels28,
      datasets: [
        { label: 'YouTube', data: DATA.views.yt, borderColor: C.yt, backgroundColor: 'rgba(255,0,0,0.07)', fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.yt, borderWidth: 2 },
        { label: 'TikTok', data: DATA.views.tt, borderColor: C.tt, backgroundColor: 'rgba(254,44,85,0.07)', fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.tt, borderWidth: 2 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, maxRotation: 0, maxTicksLimit: 6 } },
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => (v/1e6).toFixed(1)+'M' } }
      }
    }
  });

  // Platform donut
  charts.donut = new Chart(document.getElementById('platformDonut'), {
    type: 'doughnut',
    data: { labels: ['YouTube','TikTok'], datasets: [{ data: [62,38], backgroundColor: [C.yt, C.tt], borderWidth: 0, hoverOffset: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
  });

  // Engagement bar
  charts.engagement = new Chart(document.getElementById('engagementBar'), {
    type: 'bar',
    data: {
      labels: labels28.slice(-5),
      datasets: [
        { label: 'Likes', data: DATA.engData[0], backgroundColor: C.yt, borderRadius: 4, borderSkipped: false },
        { label: 'Comments', data: DATA.engData[1], backgroundColor: C.blue, borderRadius: 4, borderSkipped: false },
        { label: 'Shares', data: DATA.engData[2], backgroundColor: C.tt, borderRadius: 4, borderSkipped: false },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => (v/1000).toFixed(0)+'K' } }
      }
    }
  });

  // Sub growth
  charts.sub = new Chart(document.getElementById('subGrowth'), {
    type: 'bar',
    data: {
      labels: labels28,
      datasets: [{ label: 'New Followers', data: DATA.subGrowth, backgroundColor: DATA.subGrowth.map(v => v > 15000 ? C.green : C.amber), borderRadius: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, maxRotation: 0, maxTicksLimit: 5 } },
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => (v/1000).toFixed(0)+'K' } }
      }
    }
  });

  // Retention curve
  charts.retention = new Chart(document.getElementById('retentionCurve'), {
    type: 'line',
    data: {
      labels: Array.from({length:20}, (_,i) => Math.round(i * 100/19) + '%'),
      datasets: [{ data: DATA.retention, borderColor: C.blue, backgroundColor: 'rgba(26,86,255,0.08)', fill: true, tension: 0.5, pointRadius: 0, borderWidth: 2.5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...sharedAxisOpts(), title: { display: true, text: 'Video Progress', color: chartDefaults().tickColor, font: {size:11} } },
        y: { ...sharedAxisOpts(), min: 0, max: 100, ticks: { ...sharedAxisOpts().ticks, callback: v => v + '%' } }
      }
    }
  });

  // Impressions vs Clicks
  charts.impVsClick = new Chart(document.getElementById('impVsClick'), {
    type: 'bar',
    data: {
      labels: ['Wk 1','Wk 2','Wk 3','Wk 4'],
      datasets: [
        { label: 'Impressions', data: [420000,512000,487000,638000], backgroundColor: 'rgba(26,86,255,0.2)', borderColor: C.blue, borderWidth: 1.5, borderRadius: 4 },
        { label: 'Clicks', data: [18200,24600,22800,31200], backgroundColor: C.orange, borderRadius: 4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => v >= 1000 ? (v/1000).toFixed(0)+'K' : v } }
      }
    }
  });

  // Traffic sources
  charts.traffic = new Chart(document.getElementById('trafficSources'), {
    type: 'bar', indexAxis: 'y',
    data: {
      labels: DATA.trafficLabels,
      datasets: [{ data: DATA.trafficData, backgroundColor: [C.yt, C.blue, C.orange, C.green, C.gray], borderRadius: 4, borderSkipped: false }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => v+'%' } },
        y: sharedAxisOpts()
      }
    }
  });

  // Age
  charts.age = new Chart(document.getElementById('ageChart'), {
    type: 'bar',
    data: {
      labels: DATA.age,
      datasets: [{ data: DATA.ageData, backgroundColor: [C.purple,'rgba(26,86,255,0.8)',C.blue,'rgba(26,86,255,0.5)','rgba(26,86,255,0.3)'], borderRadius: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => v + '%' } }
      }
    }
  });

  // Gender
  charts.gender = new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: ['Male','Female','Other'],
      datasets: [{ data: [58,38,4], backgroundColor: [C.blue, C.tt, C.gray], borderWidth: 0, hoverOffset: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { display: true, position: 'bottom', labels: { color: chartDefaults().color, font:{size:11}, boxWidth: 10, padding: 12 } } }
    }
  });

  // Geo
  charts.geo = new Chart(document.getElementById('geoChart'), {
    type: 'bar', indexAxis: 'y',
    data: {
      labels: DATA.countries,
      datasets: [{ data: DATA.countryData, backgroundColor: [C.yt,'rgba(255,0,0,0.75)','rgba(255,0,0,0.58)','rgba(255,0,0,0.44)','rgba(255,0,0,0.32)','rgba(255,0,0,0.22)'], borderRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => v + '%' } },
        y: sharedAxisOpts()
      }
    }
  });

  // Best time (heatmap via bar)
  const hours = ['6am','8am','10am','12pm','2pm','4pm','6pm','8pm','10pm'];
  const engByHour = [2.1,3.4,4.8,5.2,6.1,7.4,8.2,7.8,5.9];
  charts.heatmap = new Chart(document.getElementById('heatmapChart'), {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [{ data: engByHour, backgroundColor: engByHour.map(v => `rgba(232,93,36,${(v/10).toFixed(2)})`), borderRadius: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => v+'%' } }
      }
    }
  });

  // Device
  charts.device = new Chart(document.getElementById('deviceChart'), {
    type: 'doughnut',
    data: {
      labels: ['Mobile','Desktop','Tablet','TV'],
      datasets: [{ data: [72,18,6,4], backgroundColor: [C.tt, C.blue, C.amber, C.green], borderWidth: 0 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: { legend: { display: true, position: 'bottom', labels: { color: chartDefaults().color, font:{size:11}, boxWidth:10, padding:12 } } }
    }
  });

  // Viral score
  const videoLabels = ['Vid 1','Vid 2','Vid 3','Vid 4','Vid 5','Vid 6','Vid 7','Vid 8','Vid 9','Vid 10'];
  const viralScores = [42,67,53,88,72,35,91,64,78,55];
  charts.viral = new Chart(document.getElementById('viralScoreChart'), {
    type: 'bar',
    data: {
      labels: videoLabels,
      datasets: [{ data: viralScores, backgroundColor: viralScores.map(v => v>=80?C.green:v>=60?C.orange:C.amber), borderRadius: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), min: 0, max: 100 }
      }
    }
  });

  // Topic momentum
  charts.topic = new Chart(document.getElementById('topicMomentum'), {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: '#AItools', data: [42,58,71,68,82,79,90], borderColor: C.orange, tension: 0.4, pointRadius: 3, borderWidth: 2 },
        { label: '#ProductivityHacks', data: [55,60,58,72,68,74,71], borderColor: C.blue, tension: 0.4, pointRadius: 3, borderWidth: 2 },
        { label: '#DailyVlog', data: [30,28,34,32,40,55,62], borderColor: C.tt, tension: 0.4, pointRadius: 3, borderWidth: 2 },
        { label: '#TechReview', data: [70,68,72,74,70,65,68], borderColor: C.green, tension: 0.4, pointRadius: 3, borderWidth: 2 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top', align: 'end', labels: { color: chartDefaults().color, font:{size:11}, boxWidth:10, usePointStyle: true, pointStyle:'circle', padding:16 } } },
      scales: { x: sharedAxisOpts(), y: sharedAxisOpts() }
    }
  });

  // Revenue stream (stacked)
  charts.revStream = new Chart(document.getElementById('revenueStream'), {
    type: 'bar',
    data: {
      labels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
      datasets: [
        { label: 'Ad Rev', data: [3200,3800,4600,5100,6400,8240], backgroundColor: C.amber, borderRadius: 3, stack: 'a' },
        { label: 'Sponsorship', data: [1000,1500,2000,2200,2800,3500], backgroundColor: C.green, borderRadius: 3, stack: 'a' },
        { label: 'Gifts', data: [200,300,400,500,800,1100], backgroundColor: C.blue, borderRadius: 3, stack: 'a' },
        { label: 'Affiliate', data: [100,200,300,350,500,620], backgroundColor: C.orange, borderRadius: 3, stack: 'a' },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top', align: 'end', labels: { color: chartDefaults().color, font:{size:10}, boxWidth:8, padding:12 } } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), stacked: true, ticks: { ...sharedAxisOpts().ticks, callback: v => '$'+(v/1000).toFixed(0)+'K' } }
      }
    }
  });

  // Revenue trend
  charts.revTrend = new Chart(document.getElementById('revenueTrend'), {
    type: 'line',
    data: {
      labels: DATA.revLabels,
      datasets: [{ label: 'Revenue', data: DATA.revTrend, borderColor: C.green, backgroundColor: 'rgba(34,160,107,0.08)', fill: true, tension: 0.45, pointRadius: 4, pointBackgroundColor: C.green, borderWidth: 2.5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: sharedAxisOpts(),
        y: { ...sharedAxisOpts(), ticks: { ...sharedAxisOpts().ticks, callback: v => '$'+(v/1000).toFixed(1)+'K' } }
      }
    }
  });

  buildHashtags();
  buildVideoTable();
}

function destroyAll() {
  Object.values(charts).forEach(c => { try { c.destroy(); } catch(e){} });
  charts = {};
}

/* ── Hashtags ── */
function buildHashtags() {
  const hashtags = [
    { tag: '#AItools', count: '2.4B views', rank: 1, trend: 'up' },
    { tag: '#ProductivityHacks', count: '1.1B views', rank: 2, trend: 'up' },
    { tag: '#DailyVlog', count: '890M views', rank: 3, trend: 'down' },
    { tag: '#TechReview2025', count: '740M views', rank: 4, trend: 'up' },
    { tag: '#Storytime', count: '620M views', rank: 5, trend: 'up' },
    { tag: '#GRWM', count: '450M views', rank: 6, trend: 'neutral' },
  ];
  const grid = document.getElementById('hashtagGrid');
  grid.innerHTML = hashtags.map(h => `
    <div class="hashtag-item">
      <div>
        <div class="hashtag-name">${h.tag}</div>
        <div class="hashtag-count">${h.count}</div>
      </div>
      <div style="text-align:right">
        <div class="hashtag-rank">${h.rank}</div>
        <div class="trend-arrow ${h.trend === 'up' ? 'trend-up' : h.trend === 'down' ? 'trend-down' : ''}">${h.trend === 'up' ? '↑' : h.trend === 'down' ? '↓' : '→'}</div>
      </div>
    </div>`).join('');
}

/* ── Video Table ── */
function buildVideoTable() {
  const videos = [
    { title: 'I tried AI tools for 30 days (SHOCKING results)', platform: 'yt', views: '3.2M', eng: '8.4%', score: 94, rev: '$1,240' },
    { title: 'The productivity system that 10x\'d my output', platform: 'tt', views: '2.8M', eng: '11.2%', score: 91, rev: '$680' },
    { title: 'Honest review: Is this camera worth $2000?', platform: 'yt', views: '1.9M', eng: '6.8%', score: 82, rev: '$940' },
    { title: 'A day in my life as a full-time creator', platform: 'tt', views: '1.6M', eng: '9.1%', score: 78, rev: '$310' },
    { title: 'My editing workflow revealed (for beginners)', platform: 'yt', views: '1.2M', eng: '7.3%', score: 74, rev: '$580' },
    { title: '5 TikTok trends that blew up this week', platform: 'tt', views: '980K', eng: '14.2%', score: 70, rev: '$190' },
    { title: 'Why I almost quit YouTube (storytime)', platform: 'yt', views: '870K', eng: '12.6%', score: 68, rev: '$420' },
    { title: 'Trying viral food hacks so you don\'t have to', platform: 'tt', views: '740K', eng: '10.8%', score: 62, rev: '$150' },
  ];
  const body = document.getElementById('videoTableBody');
  body.innerHTML = videos.map((v,i) => `
    <tr>
      <td style="color:var(--text-3);font-size:12px;font-weight:600;font-family:'Syne',sans-serif">${i+1}</td>
      <td>
        <div class="video-info">
          <div class="video-thumb" style="background:${v.platform==='yt'?'rgba(255,0,0,0.1)':'rgba(254,44,85,0.1)'}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="${v.platform==='yt'?'#FF0000':'#FE2C55'}"><polygon points="4,2 12,7 4,12"/></svg>
          </div>
          <div>
            <div class="video-title-text">${v.title}</div>
            <div class="video-meta">Published 14 days ago</div>
          </div>
        </div>
      </td>
      <td><span class="platform-chip ${v.platform==='yt'?'chip-yt':'chip-tt'}">${v.platform==='yt'?'YouTube':'TikTok'}</span></td>
      <td style="font-size:13px;font-weight:500">${v.views}</td>
      <td style="color:${parseFloat(v.eng)>8?'var(--green)':'var(--text-1)'};font-weight:500">${v.eng}</td>
      <td>
        <div class="trend-bar-wrap">
          <div class="trend-bar"><div class="trend-bar-fill" style="width:${v.score}%"></div></div>
          <span class="viral-score" style="color:${v.score>=80?'var(--green)':v.score>=65?'var(--amber)':'var(--text-2)'}">${v.score}</span>
        </div>
      </td>
      <td style="font-size:13px;color:var(--green);font-weight:500">${v.rev}</td>
    </tr>`).join('');
}

/* ── UI Interactions ── */
function showPanel(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  btn.classList.add('active');
  const titles = { overview:'Overview', performance:'Performance', audience:'Audience', trending:'Trending', monetisation:'Monetisation', topvideos:'Top Videos' };
  document.getElementById('pageTitle').textContent = titles[id];
}

function setRange(btn, range) {
  document.querySelectorAll('.dr-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const sub = { '7d':'Last 7 days','28d':'Last 28 days','90d':'Last 90 days','1y':'Last 12 months' };
  document.getElementById('pageSub').textContent = 'All platforms · ' + sub[range];
}

function setPlatform(p) {
  activePlatform = p;
  document.getElementById('ytBtn').className = 'pt-btn' + (p==='yt'?' yt-active':'');
  document.getElementById('ttBtn').className = 'pt-btn' + (p==='tt'?' tt-active':'');
}

function toggleTheme() {
  activeTheme = activeTheme === 'light' ? 'dark' : 'light';
  document.body.dataset.theme = activeTheme === 'dark' ? 'dark' : '';
  document.getElementById('theme-icon').textContent = activeTheme === 'dark' ? '☀️' : '🌙';
  document.getElementById('theme-label').textContent = activeTheme === 'dark' ? 'Light mode' : 'Dark mode';
  buildCharts();
}

function openUpload() { document.getElementById('uploadModal').classList.add('open'); }
function closeUpload() { document.getElementById('uploadModal').classList.remove('open'); }
document.getElementById('uploadModal').addEventListener('click', e => { if(e.target===e.currentTarget) closeUpload(); });

function handleDrop(e) {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if(f) processFile(f);
}
function handleFile(e) { processFile(e.target.files[0]); }
function processFile(f) {
  alert(`File "${f.name}" uploaded successfully! In a live integration, this would parse your ${f.name.includes('yt')||f.name.toLowerCase().includes('youtube')?'YouTube':'TikTok'} CSV and refresh all charts.`);
  closeUpload();
}

/* ── Init ── */
window.addEventListener('load', buildCharts);
</script>
</body>
</html>
