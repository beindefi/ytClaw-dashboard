<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ytClawDB</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
:root {
  --bg: #0D0D0D;
  --surface: #161616;
  --surface2: #1E1E1E;
  --surface3: #252525;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text1: #F2F0E8;
  --text2: #8A8880;
  --text3: #4A4845;
  --red: #FF3B30;
  --yt: #FF0000;
  --tt-pink: #FE2C55;
  --tt-cyan: #25F4EE;
  --green: #34C759;
  --amber: #FF9F0A;
  --blue: #0A84FF;
  --claw: #FF6B35;
  --mono: 'DM Mono', monospace;
  --display: 'Bebas Neue', cursive;
  --body: 'DM Sans', sans-serif;
}
[data-theme="light"] {
  --bg: #F5F3EE;
  --surface: #FFFFFF;
  --surface2: #EEECE8;
  --surface3: #E5E3DE;
  --border: rgba(0,0,0,0.07);
  --border2: rgba(0,0,0,0.12);
  --text1: #1A1916;
  --text2: #6B6960;
  --text3: #B0AEA8;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-family: var(--body); background: var(--bg); color: var(--text1); }
body { min-height: 100vh; transition: background 0.3s, color 0.3s; }

/* ─── LAYOUT ─── */
.app { display: flex; min-height: 100vh; }
.sidebar {
  width: 230px; flex-shrink: 0; background: var(--surface);
  border-right: 0.5px solid var(--border2); display: flex;
  flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100;
  overflow-y: auto;
}
.main { margin-left: 230px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

/* ─── SIDEBAR ─── */
.logo-wrap { padding: 20px 18px 16px; border-bottom: 0.5px solid var(--border); }
.logo-top { display: flex; align-items: center; gap: 8px; }
.logo-claw { font-size: 20px; }
.logo-text { font-family: var(--display); font-size: 22px; letter-spacing: 1px; color: var(--text1); }
.logo-text span { color: var(--claw); }
.logo-sub { font-size: 10px; color: var(--text3); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; font-family: var(--mono); }

.nav { padding: 10px 10px; flex: 1; }
.nav-group { margin-bottom: 20px; }
.nav-group-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text3); font-family: var(--mono); padding: 0 8px 6px; }
.nav-btn {
  display: flex; align-items: center; gap: 9px; width: 100%;
  padding: 8px 10px; border-radius: 7px; border: none; background: none;
  color: var(--text2); font-size: 13px; font-family: var(--body);
  cursor: pointer; text-align: left; transition: all 0.15s;
  font-weight: 400; margin-bottom: 1px;
}
.nav-btn:hover { background: var(--surface2); color: var(--text1); }
.nav-btn.active { background: var(--claw); color: #fff; font-weight: 500; }
.nav-btn .ico { width: 15px; height: 15px; opacity: 0.6; flex-shrink: 0; }
.nav-btn.active .ico { opacity: 1; }
.nav-badge { margin-left: auto; background: var(--surface3); color: var(--text2); font-size: 10px; font-family: var(--mono); padding: 1px 6px; border-radius: 20px; }
.nav-btn.active .nav-badge { background: rgba(255,255,255,0.2); color: white; }

.sidebar-footer { padding: 12px 10px 16px; border-top: 0.5px solid var(--border); }
.api-status-wrap { padding: 10px 12px; background: var(--surface2); border-radius: 8px; border: 0.5px solid var(--border2); margin-bottom: 8px; }
.api-status-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
.api-label { color: var(--text2); font-family: var(--mono); font-size: 11px; }
.api-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.dot-live { background: var(--green); box-shadow: 0 0 6px rgba(52,199,89,0.6); }
.dot-off { background: var(--text3); }
.theme-btn {
  width: 100%; padding: 8px 10px; background: var(--surface2); border: 0.5px solid var(--border);
  border-radius: 7px; color: var(--text2); font-family: var(--body); font-size: 12.5px;
  cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.15s;
}
.theme-btn:hover { border-color: var(--border2); color: var(--text1); }

/* ─── TOP BAR ─── */
.topbar {
  padding: 14px 28px; display: flex; align-items: center; gap: 12px;
  border-bottom: 0.5px solid var(--border); background: var(--surface);
  position: sticky; top: 0; z-index: 50;
}
.topbar-title { font-family: var(--display); font-size: 18px; letter-spacing: 0.5px; white-space: nowrap; }
.search-wrap { flex: 1; max-width: 520px; position: relative; }
.search-input {
  width: 100%; padding: 9px 14px 9px 38px; background: var(--surface2);
  border: 0.5px solid var(--border2); border-radius: 8px; color: var(--text1);
  font-family: var(--body); font-size: 13.5px; outline: none; transition: border-color 0.2s;
}
.search-input:focus { border-color: var(--claw); }
.search-input::placeholder { color: var(--text3); }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text3); }
.search-btn {
  padding: 9px 18px; background: var(--claw); color: white; border: none;
  border-radius: 8px; font-family: var(--body); font-size: 13px; font-weight: 500;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.search-btn:hover { opacity: 0.88; }
.search-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ─── CONTENT ─── */
.content { padding: 24px 28px; flex: 1; }
.panel { display: none; }
.panel.active { display: block; }

/* ─── API KEY GATE ─── */
.gate-wrap { max-width: 560px; margin: 60px auto; text-align: center; }
.gate-icon { font-size: 48px; margin-bottom: 16px; }
.gate-title { font-family: var(--display); font-size: 32px; letter-spacing: 1px; margin-bottom: 8px; }
.gate-sub { font-size: 14px; color: var(--text2); line-height: 1.7; margin-bottom: 28px; }
.gate-card { background: var(--surface); border: 0.5px solid var(--border2); border-radius: 12px; padding: 24px; text-align: left; margin-bottom: 16px; }
.gate-card-title { font-size: 13px; font-weight: 600; color: var(--text1); margin-bottom: 12px; display: flex; align-items: center; gap: 7px; }
.gate-step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; font-size: 12.5px; color: var(--text2); line-height: 1.6; }
.gate-step-num { width: 20px; height: 20px; border-radius: 50%; background: var(--surface3); color: var(--text2); font-size: 11px; font-family: var(--mono); font-weight: 500; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.gate-step a { color: var(--claw); text-decoration: none; }
.gate-step a:hover { text-decoration: underline; }
.api-input-row { display: flex; gap: 8px; margin-top: 14px; }
.api-input {
  flex: 1; padding: 9px 12px; background: var(--surface2); border: 0.5px solid var(--border2);
  border-radius: 7px; color: var(--text1); font-family: var(--mono); font-size: 12px; outline: none;
  transition: border-color 0.2s;
}
.api-input:focus { border-color: var(--claw); }
.api-input::placeholder { color: var(--text3); }
.save-btn {
  padding: 9px 16px; background: var(--claw); color: white; border: none;
  border-radius: 7px; font-family: var(--body); font-size: 13px; font-weight: 500;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.save-btn:hover { opacity: 0.88; }
.err-msg { font-size: 12px; color: var(--red); margin-top: 8px; display: none; font-family: var(--mono); }

/* ─── CHANNEL PROFILE ─── */
.channel-hero { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 24px; background: var(--surface); border: 0.5px solid var(--border); border-radius: 12px; padding: 22px 24px; }
.channel-avatar { width: 76px; height: 76px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--surface2); }
.channel-info { flex: 1; min-width: 0; }
.channel-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.channel-name { font-family: var(--display); font-size: 26px; letter-spacing: 0.5px; }
.verified-badge { background: var(--blue); color: white; font-size: 10px; padding: 2px 7px; border-radius: 10px; font-family: var(--mono); font-weight: 500; }
.channel-handle { font-size: 12px; color: var(--text2); font-family: var(--mono); margin-bottom: 8px; }
.channel-desc { font-size: 13px; color: var(--text2); line-height: 1.6; max-width: 580px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.channel-meta { display: flex; gap: 20px; margin-top: 12px; flex-wrap: wrap; }
.channel-meta-item { font-size: 12px; color: var(--text3); font-family: var(--mono); }
.channel-meta-item strong { color: var(--text1); font-weight: 600; font-size: 13px; }
.channel-actions { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; flex-shrink: 0; }
.platform-pill { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: var(--mono); }
.pill-yt { background: rgba(255,0,0,0.12); color: #FF4444; border: 0.5px solid rgba(255,0,0,0.2); }
.pill-tt { background: rgba(254,44,85,0.12); color: var(--tt-pink); border: 0.5px solid rgba(254,44,85,0.2); }

/* ─── STAT GRID ─── */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.stat-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 10px; padding: 16px 18px; position: relative; overflow: hidden; }
.stat-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--card-color, var(--claw)); }
.stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); font-family: var(--mono); margin-bottom: 8px; }
.stat-value { font-family: var(--display); font-size: 28px; letter-spacing: 0.5px; color: var(--text1); line-height: 1; }
.stat-sub { font-size: 11.5px; color: var(--text2); margin-top: 5px; }
.stat-change { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; font-family: var(--mono); }
.up { color: var(--green); }
.down { color: var(--red); }

/* ─── CHART CARDS ─── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.grid-6040 { display: grid; grid-template-columns: 3fr 2fr; gap: 14px; margin-bottom: 20px; }
.card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 12px; padding: 18px 20px; }
.card-title { font-size: 13px; font-weight: 600; color: var(--text1); margin-bottom: 3px; }
.card-sub { font-size: 11.5px; color: var(--text2); margin-bottom: 16px; }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }

/* ─── VIDEO TABLE ─── */
.vtable { width: 100%; border-collapse: collapse; }
.vtable th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); font-family: var(--mono); font-weight: 500; text-align: left; padding: 0 10px 10px 0; border-bottom: 0.5px solid var(--border); }
.vtable td { padding: 12px 10px 12px 0; border-bottom: 0.5px solid var(--border); font-size: 13px; vertical-align: middle; }
.vtable tr:last-child td { border-bottom: none; }
.vtable tr:hover td { background: var(--surface2); }
.v-thumb { width: 56px; height: 36px; border-radius: 5px; object-fit: cover; background: var(--surface2); flex-shrink: 0; }
.v-title { font-size: 13px; color: var(--text1); max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.v-date { font-size: 11px; color: var(--text3); margin-top: 2px; font-family: var(--mono); }
.viral-bar { display: flex; align-items: center; gap: 8px; }
.vb-track { height: 4px; border-radius: 2px; background: var(--surface3); flex: 1; min-width: 50px; }
.vb-fill { height: 100%; border-radius: 2px; }
.num { font-family: var(--mono); font-size: 12.5px; }

/* ─── INSIGHT CARDS ─── */
.insight-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
.insight-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 10px; padding: 16px; }
.insight-icon { font-size: 18px; margin-bottom: 8px; }
.insight-title { font-size: 13px; font-weight: 600; color: var(--text1); margin-bottom: 4px; }
.insight-body { font-size: 12.5px; color: var(--text2); line-height: 1.6; }
.insight-card.highlight { border-color: var(--claw); background: linear-gradient(135deg, rgba(255,107,53,0.06), transparent); }

/* ─── SEARCH RESULTS ─── */
.results-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.result-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--surface); border: 0.5px solid var(--border); border-radius: 10px; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
.result-item:hover { border-color: var(--border2); background: var(--surface2); }
.r-thumb { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: var(--surface2); flex-shrink: 0; }
.r-name { font-size: 14px; font-weight: 500; color: var(--text1); }
.r-handle { font-size: 11.5px; color: var(--text3); font-family: var(--mono); margin-top: 1px; }
.r-desc { font-size: 12px; color: var(--text2); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px; }
.r-subs { font-family: var(--display); font-size: 18px; letter-spacing: 0.5px; margin-left: auto; color: var(--claw); flex-shrink: 0; }
.r-subs-label { font-size: 10px; color: var(--text3); font-family: var(--mono); text-align: right; margin-top: 1px; }
.select-btn { padding: 6px 14px; background: var(--claw); color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: var(--body); flex-shrink: 0; }

/* ─── LOADING / ERROR ─── */
.loading-wrap { text-align: center; padding: 60px 20px; color: var(--text2); }
.spinner { width: 32px; height: 32px; border: 2px solid var(--surface3); border-top-color: var(--claw); border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto 12px; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-state { text-align: center; padding: 80px 20px; }
.empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.5; }
.empty-title { font-family: var(--display); font-size: 22px; letter-spacing: 0.5px; color: var(--text2); margin-bottom: 6px; }
.empty-sub { font-size: 13px; color: var(--text3); }

/* ─── TABS ─── */
.tab-row { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 0.5px solid var(--border); padding-bottom: 0; }
.tab-btn { padding: 8px 16px; background: none; border: none; color: var(--text2); font-family: var(--body); font-size: 13px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -0.5px; transition: all 0.15s; }
.tab-btn:hover { color: var(--text1); }
.tab-btn.active { color: var(--claw); border-bottom-color: var(--claw); font-weight: 500; }

/* ─── TT NOTICE ─── */
.tt-notice { background: var(--surface); border: 0.5px solid var(--border2); border-left: 3px solid var(--tt-pink); border-radius: 10px; padding: 16px 18px; margin-bottom: 20px; }
.tt-notice-title { font-size: 13px; font-weight: 600; color: var(--text1); margin-bottom: 4px; display: flex; align-items: center; gap: 7px; }
.tt-notice-body { font-size: 12.5px; color: var(--text2); line-height: 1.6; }
.tt-notice-body a { color: var(--tt-pink); text-decoration: none; }
.tt-notice-body a:hover { text-decoration: underline; }

/* ─── COMPARISON ─── */
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.compare-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 12px; padding: 18px 20px; }
.compare-vs { display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 36px; color: var(--text3); margin: 0 8px; }
.compare-header { text-align: center; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 0.5px solid var(--border); }
.compare-avatar { width: 52px; height: 52px; border-radius: 50%; margin: 0 auto 8px; display: block; background: var(--surface2); }
.compare-name { font-size: 14px; font-weight: 600; }
.compare-subs { font-family: var(--mono); font-size: 12px; color: var(--text2); margin-top: 2px; }
.compare-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 0.5px solid var(--border); font-size: 13px; }
.compare-row:last-child { border-bottom: none; }
.compare-row-label { color: var(--text2); font-size: 12px; }
.compare-win { color: var(--green); font-weight: 600; font-family: var(--mono); }
.compare-lose { color: var(--text2); font-family: var(--mono); }

/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 4px; }

/* ─── MISC ─── */
.mono { font-family: var(--mono); }
.tag { display: inline-block; padding: 2px 8px; background: var(--surface2); border-radius: 5px; font-size: 11px; color: var(--text2); font-family: var(--mono); }
</style>
</head>
<body>
<div class="app">

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="logo-wrap">
    <div class="logo-top">
      <span class="logo-claw">🦞</span>
      <span class="logo-text">Viral<span>Claw</span>DB</span>
    </div>
    <div class="logo-sub">Creator Intelligence</div>
  </div>
  <nav class="nav">
    <div class="nav-group">
      <div class="nav-group-label">Discover</div>
      <button class="nav-btn active" onclick="showPanel('search',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3.5 3.5" stroke-linecap="round"/></svg>
        Channel Search
      </button>
      <button class="nav-btn" onclick="showPanel('compare',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="6" height="10" rx="1.5"/><rect x="9" y="3" width="6" height="10" rx="1.5"/></svg>
        Compare Channels
      </button>
    </div>
    <div class="nav-group">
      <div class="nav-group-label">Channel View</div>
      <button class="nav-btn" id="nav-overview" onclick="showChannelTab('overview',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5" opacity=".7"/><rect x="9" y="1" width="6" height="6" rx="1.5" opacity=".7"/><rect x="1" y="9" width="6" height="6" rx="1.5" opacity=".7"/><rect x="9" y="9" width="6" height="6" rx="1.5" opacity=".7"/></svg>
        Overview
      </button>
      <button class="nav-btn" id="nav-videos" onclick="showChannelTab('videos',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="2"/><polygon points="6,7 11,8.5 6,10" fill="currentColor" stroke="none"/></svg>
        Top Videos
      </button>
      <button class="nav-btn" id="nav-insights" onclick="showChannelTab('insights',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12l4-5 3 3 3-5 2-1" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Insights & AI
      </button>
    </div>
    <div class="nav-group">
      <div class="nav-group-label">Platform</div>
      <button class="nav-btn" onclick="showPanel('tiktok',this)">
        <svg class="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M11 2a3.5 3.5 0 003.5 3.5V8A7 7 0 018 1.5V11a3 3 0 11-3-3v2.5a.5.5 0 101 0V2h2z" opacity=".8"/></svg>
        TikTok
        <span class="nav-badge">info</span>
      </button>
    </div>
  </nav>
  <div class="sidebar-footer">
    <div class="api-status-wrap">
      <div class="api-status-row">
        <span class="api-label">YouTube API</span>
        <div style="display:flex;align-items:center;gap:5px">
          <div class="api-dot" id="yt-dot"></div>
          <span style="font-size:11px;color:var(--text2)" id="yt-status-text">Not set</span>
        </div>
      </div>
      <div class="api-status-row" style="margin-bottom:0">
        <span class="api-label">TikTok API</span>
        <div style="display:flex;align-items:center;gap:5px">
          <div class="api-dot dot-off"></div>
          <span style="font-size:11px;color:var(--text2)">N/A</span>
        </div>
      </div>
    </div>
    <button class="theme-btn" onclick="toggleTheme()">
      <span id="theme-icon">☀️</span>
      <span id="theme-label">Light mode</span>
    </button>
  </div>
</aside>

<!-- MAIN -->
<div class="main">
  <header class="topbar">
    <span class="topbar-title">VIRALCLAW<span style="color:var(--claw)">DB</span></span>
    <div class="search-wrap">
      <span class="search-icon">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3.5 3.5" stroke-linecap="round"/></svg>
      </span>
      <input class="search-input" id="mainSearch" type="text" placeholder="Search any YouTube channel — e.g. MrBeast, Marques Brownlee..." onkeydown="if(event.key==='Enter') doSearch()"/>
    </div>
    <button class="search-btn" id="searchBtn" onclick="doSearch()">Search</button>
  </header>

  <div class="content">

    <!-- SEARCH PANEL -->
    <div class="panel active" id="panel-search">
      <div id="search-body">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">SEARCH ANY CHANNEL</div>
          <div class="empty-sub">Type a channel name above to pull live stats, top videos, and creator insights</div>
        </div>
      </div>
    </div>

    <!-- CHANNEL OVERVIEW TAB -->
    <div class="panel" id="panel-overview">
      <div id="channel-overview-body">
        <div class="empty-state"><div class="empty-icon">📊</div><div class="empty-title">NO CHANNEL LOADED</div><div class="empty-sub">Search for a channel first</div></div>
      </div>
    </div>

    <!-- CHANNEL VIDEOS TAB -->
    <div class="panel" id="panel-videos">
      <div id="channel-videos-body">
        <div class="empty-state"><div class="empty-icon">🎬</div><div class="empty-title">NO CHANNEL LOADED</div><div class="empty-sub">Search for a channel first</div></div>
      </div>
    </div>

    <!-- CHANNEL INSIGHTS TAB -->
    <div class="panel" id="panel-insights">
      <div id="channel-insights-body">
        <div class="empty-state"><div class="empty-icon">💡</div><div class="empty-title">NO CHANNEL LOADED</div><div class="empty-sub">Search for a channel first</div></div>
      </div>
    </div>

    <!-- COMPARE PANEL -->
    <div class="panel" id="panel-compare">
      <div style="max-width:700px">
        <div style="font-family:var(--display);font-size:26px;letter-spacing:0.5px;margin-bottom:6px">COMPARE CHANNELS</div>
        <div style="font-size:13px;color:var(--text2);margin-bottom:24px">Search two channels to compare their stats head-to-head</div>
        <div class="grid-2" style="margin-bottom:16px">
          <div>
            <div style="font-size:11px;color:var(--text3);font-family:var(--mono);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Channel A</div>
            <div style="display:flex;gap:8px">
              <input class="api-input" style="flex:1;font-family:var(--body)" id="compareA" placeholder="e.g. MrBeast" onkeydown="if(event.key==='Enter') loadCompare()"/>
            </div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--text3);font-family:var(--mono);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Channel B</div>
            <div style="display:flex;gap:8px">
              <input class="api-input" style="flex:1;font-family:var(--body)" id="compareB" placeholder="e.g. PewDiePie" onkeydown="if(event.key==='Enter') loadCompare()"/>
            </div>
          </div>
        </div>
        <button class="save-btn" onclick="loadCompare()" style="margin-bottom:24px">Compare Now →</button>
        <div id="compare-body">
          <div class="empty-state" style="padding:40px 0"><div class="empty-icon">⚡</div><div class="empty-title" style="font-size:20px">ENTER TWO CHANNELS</div></div>
        </div>
      </div>
    </div>

    <!-- TIKTOK PANEL -->
    <div class="panel" id="panel-tiktok">
      <div style="max-width:600px">
        <div style="font-family:var(--display);font-size:26px;margin-bottom:16px">TIKTOK <span style="color:var(--tt-pink)">ANALYTICS</span></div>
        <div class="tt-notice">
          <div class="tt-notice-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z"/></svg>
            TikTok API requires approval
          </div>
          <div class="tt-notice-body">
            Unlike YouTube, TikTok's public data API requires developer registration and approval.<br><br>
            <strong>Your options:</strong><br>
            1. <a href="https://developers.tiktok.com/" target="_blank">TikTok for Developers</a> — Apply for Display API (shows public creator data) or Research API (academic/non-profit only)<br>
            2. <a href="https://tikapi.io/" target="_blank">TikAPI</a> — Paid unofficial TikTok API with a free trial, no TikTok approval needed<br>
            3. <a href="https://sociavault.com/" target="_blank">SociaVault</a> — Scraping API for public TikTok data<br><br>
            Once you have a TikAPI key (or similar), enter it below to enable TikTok channel search in ytClawDB.
          </div>
        </div>
        <div class="gate-card">
          <div class="gate-card-title">Enter TikAPI Key</div>
          <div class="api-input-row">
            <input class="api-input" id="ttApiInput" placeholder="your-tikapi-key-here" type="password"/>
            <button class="save-btn" onclick="saveTTKey()">Save Key</button>
          </div>
          <div class="err-msg" id="tt-err">Invalid key or API error. Please check and try again.</div>
        </div>
      </div>
    </div>

    <!-- API SETUP PANEL -->
    <div class="panel" id="panel-setup">
      <div class="gate-wrap">
        <div class="gate-icon">🔑</div>
        <div class="gate-title">ADD YOUR YOUTUBE API KEY</div>
        <div class="gate-sub">ytClawDB needs a YouTube Data API v3 key to fetch live channel data. It's completely free and takes about 5 minutes to get.</div>
        <div class="gate-card">
          <div class="gate-card-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1z" opacity=".15"/><text x="5.5" y="12" font-size="9" font-weight="700" fill="currentColor">yt</text></svg>
            How to get a free YouTube API key
          </div>
          <div class="gate-step"><div class="gate-step-num">1</div><div>Go to <a href="https://console.cloud.google.com/" target="_blank">console.cloud.google.com</a> and sign in with your Google account</div></div>
          <div class="gate-step"><div class="gate-step-num">2</div><div>Click <strong>Create Project</strong> → name it anything → click Create</div></div>
          <div class="gate-step"><div class="gate-step-num">3</div><div>In the sidebar, go to <strong>APIs & Services → Library</strong> → search "YouTube Data API v3" → Enable it</div></div>
          <div class="gate-step"><div class="gate-step-num">4</div><div>Go to <strong>APIs & Services → Credentials</strong> → click <strong>+ Create Credentials → API Key</strong></div></div>
          <div class="gate-step"><div class="gate-step-num">5</div><div>Copy the API key and paste it below. You get 10,000 free units/day (plenty for hundreds of channel lookups)</div></div>
          <div class="api-input-row">
            <input class="api-input" id="ytApiInput" placeholder="AIza..." type="password"/>
            <button class="save-btn" id="saveApiBtn" onclick="saveYTKey()">Save & Connect</button>
          </div>
          <div class="err-msg" id="api-err">Key is invalid or quota exceeded. Please check and try again.</div>
        </div>
        <div style="font-size:12px;color:var(--text3);font-family:var(--mono)">Your key is stored locally in your browser only. Never sent anywhere except directly to YouTube's API.</div>
      </div>
    </div>

  </div>
</div>
</div>

<script>
/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
let YT_KEY = localStorage.getItem('vc_yt_key') || '';
let TT_KEY = localStorage.getItem('vc_tt_key') || '';
let currentChannel = null;
let compareChannels = [null, null];
let chartInstances = {};
let activePanel = 'search';
let activeTheme = 'dark';

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
window.addEventListener('load', () => {
  if (!YT_KEY) {
    showPanel('setup', null);
    updateApiStatus(false);
  } else {
    updateApiStatus(true);
    showPanel('search', document.querySelector('.nav-btn.active'));
  }
});

/* ═══════════════════════════════════════════
   API KEY
═══════════════════════════════════════════ */
async function saveYTKey() {
  const key = document.getElementById('ytApiInput').value.trim();
  if (!key) return;
  document.getElementById('saveApiBtn').textContent = 'Testing...';
  document.getElementById('saveApiBtn').disabled = true;
  document.getElementById('api-err').style.display = 'none';
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&maxResults=1&key=${key}`);
    if (res.ok) {
      YT_KEY = key;
      localStorage.setItem('vc_yt_key', key);
      updateApiStatus(true);
      showPanel('search', null);
      document.getElementById('mainSearch').focus();
    } else {
      throw new Error('invalid');
    }
  } catch(e) {
    document.getElementById('api-err').style.display = 'block';
  }
  document.getElementById('saveApiBtn').textContent = 'Save & Connect';
  document.getElementById('saveApiBtn').disabled = false;
}

function saveTTKey() {
  const key = document.getElementById('ttApiInput').value.trim();
  if (!key) return;
  TT_KEY = key;
  localStorage.setItem('vc_tt_key', key);
  alert('TikTok API key saved! TikTok channel search will be available once the integration is configured.');
}

function updateApiStatus(connected) {
  const dot = document.getElementById('yt-dot');
  const txt = document.getElementById('yt-status-text');
  if (connected) {
    dot.className = 'api-dot dot-live';
    txt.textContent = 'Live';
  } else {
    dot.className = 'api-dot dot-off';
    txt.textContent = 'Not set';
  }
}

/* ═══════════════════════════════════════════
   PANEL NAVIGATION
═══════════════════════════════════════════ */
function showPanel(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
  activePanel = id;
}

function showChannelTab(tab, btn) {
  showPanel(tab, btn);
  if (!currentChannel) return;
  if (tab === 'overview') renderOverview(currentChannel);
  if (tab === 'videos') renderVideos(currentChannel);
  if (tab === 'insights') renderInsights(currentChannel);
}

/* ═══════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════ */
async function doSearch() {
  const q = document.getElementById('mainSearch').value.trim();
  if (!q) return;
  if (!YT_KEY) { showPanel('setup', null); return; }

  const btn = document.getElementById('searchBtn');
  btn.textContent = 'Searching...';
  btn.disabled = true;
  showPanel('search', document.querySelector('.nav-btn.active'));

  const body = document.getElementById('search-body');
  body.innerHTML = `<div class="loading-wrap"><div class="spinner"></div><div>Searching YouTube...</div></div>`;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=channel&maxResults=8&key=${YT_KEY}`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    if (!data.items || data.items.length === 0) {
      body.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">NO RESULTS</div><div class="empty-sub">Try a different channel name</div></div>`;
      return;
    }
    renderSearchResults(data.items, body);
  } catch(e) {
    body.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">ERROR</div><div class="empty-sub" style="color:var(--red)">${e.message}</div></div>`;
  }
  btn.textContent = 'Search';
  btn.disabled = false;
}

function renderSearchResults(items, container) {
  const html = `
    <div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.08em">${items.length} channels found — click to load analytics</div>
    <div class="results-list">
      ${items.map(item => {
        const s = item.snippet;
        const channelId = item.id.channelId;
        const thumb = s.thumbnails?.high?.url || s.thumbnails?.default?.url || '';
        const desc = s.description ? s.description.substring(0, 120) + (s.description.length > 120 ? '...' : '') : '';
        return `
          <div class="result-item" onclick="loadChannel('${channelId}')">
            <img class="r-thumb" src="${thumb}" onerror="this.style.display='none'" alt=""/>
            <div style="flex:1;min-width:0">
              <div class="r-name">${escHtml(s.title)}</div>
              <div class="r-handle">@${escHtml(s.customUrl || channelId)}</div>
              ${desc ? `<div class="r-desc">${escHtml(desc)}</div>` : ''}
            </div>
            <div style="text-align:right;flex-shrink:0">
              <button class="select-btn">Load Channel →</button>
            </div>
          </div>`;
      }).join('')}
    </div>`;
  container.innerHTML = html;
}

/* ═══════════════════════════════════════════
   LOAD CHANNEL
═══════════════════════════════════════════ */
async function loadChannel(channelId) {
  const body = document.getElementById('search-body');
  body.innerHTML = `<div class="loading-wrap"><div class="spinner"></div><div>Fetching channel data...</div></div>`;

  try {
    // Channel stats + snippet
    const chanRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings,contentDetails&id=${channelId}&key=${YT_KEY}`
    );
    const chanData = await chanRes.json();
    if (!chanData.items || chanData.items.length === 0) throw new Error('Channel not found');
    const channel = chanData.items[0];

    // Latest videos
    const uploadsId = channel.contentDetails?.relatedPlaylists?.uploads;
    let videos = [];
    if (uploadsId) {
      const vidRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=20&key=${YT_KEY}`
      );
      const vidData = await vidRes.json();
      if (vidData.items) {
        const videoIds = vidData.items.map(v => v.contentDetails.videoId).filter(Boolean);
        if (videoIds.length > 0) {
          const statsRes = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds.join(',')}&key=${YT_KEY}`
          );
          const statsData = await statsRes.json();
          videos = statsData.items || [];
        }
      }
    }

    currentChannel = { channel, videos };

    // Go to overview
    showPanel('overview', document.getElementById('nav-overview'));
    renderOverview(currentChannel);
    body.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-title">CHANNEL LOADED</div><div class="empty-sub">Navigate using the sidebar</div></div>`;

  } catch(e) {
    body.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">ERROR</div><div class="empty-sub" style="color:var(--red)">${e.message}</div></div>`;
  }
}

/* ═══════════════════════════════════════════
   RENDER OVERVIEW
═══════════════════════════════════════════ */
function renderOverview(data) {
  const { channel, videos } = data;
  const sn = channel.snippet;
  const st = channel.statistics;
  const thumb = sn.thumbnails?.high?.url || sn.thumbnails?.default?.url || '';
  const subs = fmtNum(st.subscriberCount);
  const totalViews = fmtNum(st.viewCount);
  const videoCount = fmtNum(st.videoCount);
  const avgViews = videos.length > 0 ? Math.round(videos.reduce((s, v) => s + parseInt(v.statistics?.viewCount || 0), 0) / videos.length) : 0;
  const avgLikes = videos.length > 0 ? Math.round(videos.reduce((s, v) => s + parseInt(v.statistics?.likeCount || 0), 0) / videos.length) : 0;
  const engRate = avgViews > 0 ? ((avgLikes / avgViews) * 100).toFixed(2) : '—';
  const joined = new Date(sn.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Sort videos by views for top performer
  const sortedByViews = [...videos].sort((a, b) => parseInt(b.statistics?.viewCount || 0) - parseInt(a.statistics?.viewCount || 0));
  const topVideo = sortedByViews[0];

  const html = `
    <div class="channel-hero">
      <img class="channel-avatar" src="${thumb}" onerror="this.src=''" alt="${escHtml(sn.title)}"/>
      <div class="channel-info">
        <div class="channel-name-row">
          <div class="channel-name">${escHtml(sn.title)}</div>
          ${st.hiddenSubscriberCount === false ? `<span class="platform-pill pill-yt">YouTube</span>` : ''}
        </div>
        <div class="channel-handle">youtube.com/channel/${channel.id}</div>
        <div class="channel-desc">${escHtml(sn.description || 'No description available.')}</div>
        <div class="channel-meta">
          <div class="channel-meta-item">Joined <strong>${joined}</strong></div>
          <div class="channel-meta-item">Country: <strong>${sn.country || '—'}</strong></div>
          <div class="channel-meta-item">Category: <strong>${sn.defaultLanguage || 'General'}</strong></div>
        </div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card" style="--card-color:var(--yt)">
        <div class="stat-label">Subscribers</div>
        <div class="stat-value">${subs}</div>
        <div class="stat-sub" style="color:var(--text3);font-family:var(--mono);font-size:11px">${st.hiddenSubscriberCount ? 'Hidden by channel' : 'Public count'}</div>
      </div>
      <div class="stat-card" style="--card-color:var(--blue)">
        <div class="stat-label">Total Views</div>
        <div class="stat-value">${totalViews}</div>
        <div class="stat-sub mono" style="font-size:11px;color:var(--text3)">${videoCount} videos published</div>
      </div>
      <div class="stat-card" style="--card-color:var(--green)">
        <div class="stat-label">Avg Views / Video</div>
        <div class="stat-value">${fmtNum(avgViews)}</div>
        <div class="stat-sub mono" style="font-size:11px;color:var(--text3)">Last ${videos.length} videos</div>
      </div>
      <div class="stat-card" style="--card-color:var(--amber)">
        <div class="stat-label">Avg Eng. Rate</div>
        <div class="stat-value">${engRate}%</div>
        <div class="stat-sub mono" style="font-size:11px;color:var(--text3)">Likes / Views est.</div>
      </div>
    </div>

    ${videos.length > 0 ? `
    <div class="grid-6040">
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Recent Upload Performance</div><div class="card-sub">Views per video — latest ${Math.min(videos.length,12)} uploads</div></div>
        </div>
        <div style="position:relative;height:220px"><canvas id="recentViewsChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Engagement Ratio</div><div class="card-sub">Likes + comments vs views</div></div>
        </div>
        <div style="position:relative;height:220px"><canvas id="engagementDonut"></canvas></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Like Rate Trend</div><div class="card-sub">Likes per 1,000 views per video</div></div>
        </div>
        <div style="position:relative;height:180px"><canvas id="likeRateChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Top Performing Video</div><div class="card-sub">Most viewed recent upload</div></div>
        </div>
        ${topVideo ? `
          <div style="display:flex;gap:12px;align-items:flex-start">
            <img src="${topVideo.snippet?.thumbnails?.medium?.url || ''}" style="width:120px;height:68px;border-radius:6px;object-fit:cover;flex-shrink:0;background:var(--surface2)" onerror="this.style.opacity=0" alt=""/>
            <div>
              <div style="font-size:13px;font-weight:500;margin-bottom:6px;line-height:1.5">${escHtml((topVideo.snippet?.title || '').substring(0, 80))}${topVideo.snippet?.title?.length > 80 ? '...' : ''}</div>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <span class="tag">${fmtNum(topVideo.statistics?.viewCount)} views</span>
                <span class="tag">${fmtNum(topVideo.statistics?.likeCount)} likes</span>
                <span class="tag">${fmtNum(topVideo.statistics?.commentCount)} comments</span>
              </div>
              <div style="margin-top:8px;font-size:11.5px;color:var(--text3);font-family:var(--mono)">${timeAgo(topVideo.snippet?.publishedAt)}</div>
            </div>
          </div>` : '<div style="color:var(--text3)">No video data</div>'}
      </div>
    </div>
    ` : ''}
  `;

  document.getElementById('channel-overview-body').innerHTML = html;

  // Build charts
  if (videos.length > 0) {
    const recent = [...videos].reverse().slice(-12);
    const labels = recent.map(v => (v.snippet?.title || '').substring(0, 18) + '…');
    const viewData = recent.map(v => parseInt(v.statistics?.viewCount || 0));
    const likeData = recent.map(v => parseInt(v.statistics?.likeCount || 0));
    const commentData = recent.map(v => parseInt(v.statistics?.commentCount || 0));
    const likeRate = recent.map(v => {
      const views = parseInt(v.statistics?.viewCount || 0);
      const likes = parseInt(v.statistics?.likeCount || 0);
      return views > 0 ? parseFloat(((likes / views) * 1000).toFixed(2)) : 0;
    });

    destroyChart('recentViews');
    destroyChart('engDonut');
    destroyChart('likeRate');

    chartInstances.recentViews = new Chart(document.getElementById('recentViewsChart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{ data: viewData, backgroundColor: viewData.map((v, i) => i === viewData.indexOf(Math.max(...viewData)) ? '#FF3B30' : 'rgba(255,107,53,0.5)'), borderRadius: 4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: chartAxis(),
          y: { ...chartAxis(), ticks: { ...chartAxis().ticks, callback: v => fmtNumShort(v) } }
        }
      }
    });

    const totalLikes = likeData.reduce((a,b) => a+b, 0);
    const totalComments = commentData.reduce((a,b) => a+b, 0);
    const totalViews2 = viewData.reduce((a,b) => a+b, 0);
    const passive = Math.max(0, totalViews2 - totalLikes - totalComments);

    chartInstances.engDonut = new Chart(document.getElementById('engagementDonut'), {
      type: 'doughnut',
      data: {
        labels: ['Likes', 'Comments', 'Passive views'],
        datasets: [{ data: [totalLikes, totalComments, passive], backgroundColor: ['#FF3B30', '#FF9F0A', 'rgba(255,255,255,0.06)'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: { legend: { display: true, position: 'bottom', labels: { color: '#8A8880', font: {size:11}, boxWidth: 8, padding: 12 } } }
      }
    });

    chartInstances.likeRate = new Chart(document.getElementById('likeRateChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{ data: likeRate, borderColor: '#34C759', backgroundColor: 'rgba(52,199,89,0.08)', fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#34C759', borderWidth: 2 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ...chartAxis(), ticks: { ...chartAxis().ticks, maxTicksLimit: 5, maxRotation: 0 } },
          y: { ...chartAxis(), ticks: { ...chartAxis().ticks, callback: v => v + '/K' } }
        }
      }
    });
  }
}

/* ═══════════════════════════════════════════
   RENDER TOP VIDEOS
═══════════════════════════════════════════ */
function renderVideos(data) {
  const { videos } = data;
  if (!videos.length) {
    document.getElementById('channel-videos-body').innerHTML = `<div class="empty-state"><div class="empty-icon">🎬</div><div class="empty-title">NO VIDEO DATA</div></div>`;
    return;
  }
  const sorted = [...videos].sort((a, b) => parseInt(b.statistics?.viewCount || 0) - parseInt(a.statistics?.viewCount || 0));
  const maxViews = parseInt(sorted[0].statistics?.viewCount || 1);

  const rows = sorted.map((v, i) => {
    const views = parseInt(v.statistics?.viewCount || 0);
    const likes = parseInt(v.statistics?.likeCount || 0);
    const comments = parseInt(v.statistics?.commentCount || 0);
    const engRate = views > 0 ? ((likes / views) * 100).toFixed(2) : '0';
    const score = Math.round((views / maxViews) * 100);
    const thumb = v.snippet?.thumbnails?.medium?.url || v.snippet?.thumbnails?.default?.url || '';
    const color = score >= 80 ? '#34C759' : score >= 50 ? '#FF9F0A' : '#8A8880';
    return `
      <tr>
        <td style="color:var(--text3);font-family:var(--mono);font-size:12px">${i+1}</td>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <img class="v-thumb" src="${thumb}" onerror="this.style.opacity=0" alt=""/>
            <div>
              <div class="v-title">${escHtml((v.snippet?.title || '').substring(0, 70))}${v.snippet?.title?.length > 70 ? '…' : ''}</div>
              <div class="v-date">${timeAgo(v.snippet?.publishedAt)}</div>
            </div>
          </div>
        </td>
        <td class="num">${fmtNum(views)}</td>
        <td class="num">${fmtNum(likes)}</td>
        <td class="num">${fmtNum(comments)}</td>
        <td class="num" style="color:${parseFloat(engRate) > 3 ? 'var(--green)' : 'var(--text2)'}">${engRate}%</td>
        <td>
          <div class="viral-bar">
            <div class="vb-track"><div class="vb-fill" style="width:${score}%;background:${color}"></div></div>
            <span style="font-family:var(--mono);font-size:13px;font-weight:600;color:${color};min-width:26px">${score}</span>
          </div>
        </td>
        <td><a href="https://youtube.com/watch?v=${v.id}" target="_blank" style="color:var(--claw);font-size:11.5px;text-decoration:none;font-family:var(--mono)">Open ↗</a></td>
      </tr>`;
  }).join('');

  document.getElementById('channel-videos-body').innerHTML = `
    <div class="card" style="overflow-x:auto">
      <div class="card-header">
        <div><div class="card-title">Top Videos — ${sorted.length} recent uploads</div><div class="card-sub">Sorted by view count · Viral Score = relative to this channel's best</div></div>
      </div>
      <table class="vtable">
        <thead><tr>
          <th>#</th><th>Video</th><th>Views</th><th>Likes</th><th>Comments</th><th>Eng. Rate</th><th>Viral Score</th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

/* ═══════════════════════════════════════════
   RENDER INSIGHTS
═══════════════════════════════════════════ */
function renderInsights(data) {
  const { channel, videos } = data;
  const st = channel.statistics;
  const sn = channel.snippet;
  const subs = parseInt(st.subscriberCount || 0);
  const totalViews = parseInt(st.viewCount || 0);
  const videoCount = parseInt(st.videoCount || 1);
  const avgViewsPerVideo = videoCount > 0 ? Math.round(totalViews / videoCount) : 0;
  const recentViews = videos.map(v => parseInt(v.statistics?.viewCount || 0));
  const recentLikes = videos.map(v => parseInt(v.statistics?.likeCount || 0));
  const avgRecent = recentViews.length > 0 ? Math.round(recentViews.reduce((a,b)=>a+b,0)/recentViews.length) : 0;
  const avgLikeRate = recentViews.length > 0 ? parseFloat(((recentLikes.reduce((a,b)=>a+b,0) / Math.max(1, recentViews.reduce((a,b)=>a+b,0))) * 100).toFixed(2)) : 0;
  const viewsPerSub = subs > 0 ? (totalViews / subs).toFixed(1) : '—';
  const channelAge = sn.publishedAt ? Math.floor((Date.now() - new Date(sn.publishedAt)) / (1000*60*60*24*365)) : 0;
  const videosPerYear = channelAge > 0 ? Math.round(videoCount / Math.max(1, channelAge)) : 0;

  // Benchmarks
  const subTier = subs >= 10e6 ? 'Mega Creator' : subs >= 1e6 ? 'Top Creator' : subs >= 100000 ? 'Growing Channel' : subs >= 10000 ? 'Micro Creator' : 'Emerging';
  const engBenchmark = avgLikeRate >= 5 ? 'Excellent (top 10%)' : avgLikeRate >= 2 ? 'Above average' : avgLikeRate >= 1 ? 'Average' : 'Below average';

  // RPM estimation (rough)
  const estMonthlyViews = avgRecent * videosPerYear / 12;
  const estRPM = subs > 1e6 ? 4.5 : subs > 100000 ? 3.2 : 2.1;
  const estMonthlyRevenue = Math.round((estMonthlyViews / 1000) * estRPM);

  document.getElementById('channel-insights-body').innerHTML = `
    <div style="font-family:var(--display);font-size:22px;letter-spacing:0.5px;margin-bottom:16px">AI INSIGHTS — ${escHtml(sn.title).toUpperCase()}</div>

    <div class="insight-grid">
      <div class="insight-card highlight">
        <div class="insight-icon">🏆</div>
        <div class="insight-title">Creator Tier</div>
        <div class="insight-body"><strong style="color:var(--claw)">${subTier}</strong> — ${fmtNum(subs)} subscribers. ${subs >= 1e6 ? 'This channel qualifies for YouTube monetisation programs and likely earns significant ad revenue.' : subs >= 100000 ? 'Eligible for YouTube Partner Program. Strong growth indicates monetisation potential.' : 'Growing channel. Focus on consistency to reach YouTube Partner thresholds.'}</div>
      </div>
      <div class="insight-card">
        <div class="insight-icon">📈</div>
        <div class="insight-title">Engagement Health</div>
        <div class="insight-body"><strong>${engBenchmark}</strong> with ${avgLikeRate}% like rate. ${avgLikeRate >= 3 ? 'Audience is highly engaged — this is a strong signal for algorithmic promotion.' : 'Room to improve engagement. Consider stronger CTAs and community interaction.'}</div>
      </div>
      <div class="insight-card">
        <div class="insight-icon">💰</div>
        <div class="insight-title">Est. Monthly Revenue</div>
        <div class="insight-body">Ad revenue estimate: <strong style="color:var(--green)">$${fmtNum(estMonthlyRevenue)}/month</strong> based on ~${fmtNum(Math.round(estMonthlyViews))} monthly views and ${estRPM} RPM estimate. Add sponsorships, memberships, and merchandise for full picture.</div>
      </div>
      <div class="insight-card">
        <div class="insight-icon">⏱️</div>
        <div class="insight-title">Upload Cadence</div>
        <div class="insight-body">Approx. <strong>${videosPerYear} videos/year</strong> (${channelAge} year${channelAge !== 1 ? 's' : ''} active). ${videosPerYear >= 52 ? 'Weekly+ uploads — excellent for algorithmic visibility.' : videosPerYear >= 24 ? 'Bi-weekly cadence is solid. Consistency drives long-term growth.' : 'Less frequent uploads. Increasing cadence could improve discoverability.'}</div>
      </div>
      <div class="insight-card">
        <div class="insight-icon">👁️</div>
        <div class="insight-title">Views Per Subscriber</div>
        <div class="insight-body"><strong>${viewsPerSub}×</strong> average views per subscriber overall. ${parseFloat(viewsPerSub) > 50 ? 'Very high — loyal audience that keeps coming back.' : parseFloat(viewsPerSub) > 10 ? 'Healthy ratio. Subscribers are engaged with content.' : 'Growing subscriber base. Building loyalty takes time.'}</div>
      </div>
      <div class="insight-card">
        <div class="insight-icon">🎯</div>
        <div class="insight-title">Content Consistency</div>
        <div class="insight-body">${recentViews.length > 0 ? (() => {
          const max = Math.max(...recentViews); const min = Math.min(...recentViews);
          const ratio = max > 0 ? (min/max*100).toFixed(0) : 0;
          return `Recent video range: ${fmtNum(min)} – ${fmtNum(max)} views. ${ratio > 50 ? 'Consistent performance across videos — great sign.' : ratio > 20 ? 'Some variance between videos. Experiment with formats that hit higher numbers.' : 'High variance. A few viral hits and some quieter videos — study what separates the two.'}`;
        })() : 'No recent video data available.'}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div><div class="card-title">Channel Scorecard</div><div class="card-sub">Estimated benchmarks vs. creators of similar scale</div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        ${[
          ['Subscribers', fmtNum(subs), subTier, 70],
          ['Avg Engagement', avgLikeRate + '%', engBenchmark, Math.min(100, avgLikeRate * 20)],
          ['Lifetime Views', fmtNum(totalViews), 'Total reach', Math.min(100, (totalViews / 1e9) * 100)],
          ['Est. Monthly $', '$' + fmtNum(estMonthlyRevenue), 'Ad revenue only', Math.min(100, (estMonthlyRevenue / 10000) * 100)],
        ].map(([label, val, note, score]) => `
          <div style="background:var(--surface2);border-radius:8px;padding:14px">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text3);font-family:var(--mono);margin-bottom:8px">${label}</div>
            <div style="font-family:var(--display);font-size:22px;letter-spacing:0.3px;color:var(--text1)">${val}</div>
            <div style="font-size:11px;color:var(--text2);margin-top:4px;margin-bottom:10px">${note}</div>
            <div style="height:3px;background:var(--surface3);border-radius:2px">
              <div style="height:100%;border-radius:2px;background:var(--claw);width:${score}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════
   COMPARE CHANNELS
═══════════════════════════════════════════ */
async function loadCompare() {
  const qA = document.getElementById('compareA').value.trim();
  const qB = document.getElementById('compareB').value.trim();
  if (!qA || !qB) return;
  if (!YT_KEY) { showPanel('setup', null); return; }

  const body = document.getElementById('compare-body');
  body.innerHTML = `<div class="loading-wrap"><div class="spinner"></div><div>Fetching both channels...</div></div>`;

  try {
    const [dataA, dataB] = await Promise.all([fetchChannelByQuery(qA), fetchChannelByQuery(qB)]);
    if (!dataA || !dataB) throw new Error('Could not find one or both channels');
    renderCompare(dataA, dataB, body);
  } catch(e) {
    body.innerHTML = `<div class="empty-state" style="padding:40px 0"><div class="empty-icon">⚠️</div><div class="empty-title" style="font-size:18px">ERROR</div><div class="empty-sub" style="color:var(--red)">${e.message}</div></div>`;
  }
}

async function fetchChannelByQuery(q) {
  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=channel&maxResults=1&key=${YT_KEY}`);
  const data = await res.json();
  if (!data.items || data.items.length === 0) return null;
  const channelId = data.items[0].id.channelId;
  const res2 = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YT_KEY}`);
  const data2 = await res2.json();
  return data2.items?.[0] || null;
}

function renderCompare(a, b, body) {
  const fields = [
    ['Subscribers', v => parseInt(v.statistics?.subscriberCount || 0), fmtNum, 'higher'],
    ['Total Views', v => parseInt(v.statistics?.viewCount || 0), fmtNum, 'higher'],
    ['Videos Published', v => parseInt(v.statistics?.videoCount || 0), fmtNum, 'higher'],
    ['Views Per Video', v => parseInt(v.statistics?.viewCount || 0) / Math.max(1, parseInt(v.statistics?.videoCount || 1)), v => fmtNum(Math.round(v)), 'higher'],
    ['Channel Age', v => {
      const d = new Date(v.snippet.publishedAt);
      return Math.floor((Date.now() - d) / (1000*60*60*24));
    }, v => Math.floor(v/365) + ' yrs', 'ignore'],
  ];

  const mkCard = (ch) => {
    const sn = ch.snippet;
    const st = ch.statistics;
    const thumb = sn.thumbnails?.high?.url || sn.thumbnails?.default?.url || '';
    return { name: sn.title, thumb, sn, st };
  };

  const cA = mkCard(a); const cB = mkCard(b);

  const rows = fields.map(([label, getter, fmt, prefer]) => {
    const vA = getter(a); const vB = getter(b);
    const winA = prefer === 'higher' ? vA > vB : prefer === 'lower' ? vA < vB : null;
    return `
      <tr style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;padding:8px 0;border-bottom:0.5px solid var(--border);align-items:center">
        <td style="text-align:right;padding-right:8px" class="${winA===true?'compare-win':'compare-lose'}">${fmt(vA)}</td>
        <td style="font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:var(--text3);white-space:nowrap;text-align:center;font-family:var(--mono)">${label}</td>
        <td style="padding-left:8px" class="${winA===false?'compare-win':'compare-lose'}">${fmt(vB)}</td>
      </tr>`;
  }).join('');

  body.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:start">
      <div class="compare-card">
        <div class="compare-header">
          <img class="compare-avatar" src="${cA.thumb}" onerror="this.style.opacity=0" alt=""/>
          <div class="compare-name">${escHtml(cA.name)}</div>
          <div class="compare-subs">${fmtNum(a.statistics?.subscriberCount)} subscribers</div>
        </div>
      </div>
      <div class="compare-vs">VS</div>
      <div class="compare-card">
        <div class="compare-header">
          <img class="compare-avatar" src="${cB.thumb}" onerror="this.style.opacity=0" alt=""/>
          <div class="compare-name">${escHtml(cB.name)}</div>
          <div class="compare-subs">${fmtNum(b.statistics?.subscriberCount)} subscribers</div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:14px">
      <table style="width:100%;border-collapse:collapse"><tbody>${rows}</tbody></table>
      <div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-top:10px;text-align:center">Green = leading metric</div>
    </div>
    <div class="card" style="margin-top:14px">
      <div class="card-title" style="margin-bottom:14px">Stats Overview</div>
      <div style="position:relative;height:220px"><canvas id="compareChart"></canvas></div>
    </div>
  `;

  // Compare bar chart
  destroyChart('compare');
  chartInstances.compare = new Chart(document.getElementById('compareChart'), {
    type: 'bar',
    data: {
      labels: ['Subscribers', 'Total Views', 'Videos'],
      datasets: [
        { label: cA.name.substring(0,20), data: [
          parseInt(a.statistics?.subscriberCount||0),
          parseInt(a.statistics?.viewCount||0),
          parseInt(a.statistics?.videoCount||0)*100000,
        ], backgroundColor: '#FF3B30', borderRadius: 5 },
        { label: cB.name.substring(0,20), data: [
          parseInt(b.statistics?.subscriberCount||0),
          parseInt(b.statistics?.viewCount||0),
          parseInt(b.statistics?.videoCount||0)*100000,
        ], backgroundColor: '#0A84FF', borderRadius: 5 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, labels: { color: '#8A8880', font:{size:11}, boxWidth:10, padding:12 } } },
      scales: {
        x: chartAxis(),
        y: { ...chartAxis(), ticks: { ...chartAxis().ticks, callback: v => fmtNumShort(v) } }
      }
    }
  });
}

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function chartAxis() {
  const dark = activeTheme === 'dark';
  return {
    grid: { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' },
    ticks: { color: dark ? '#4A4845' : '#B0AEA8', font: { family: "'DM Mono', monospace", size: 10 } }
  };
}

function destroyChart(key) {
  if (chartInstances[key]) { try { chartInstances[key].destroy(); } catch(e) {} delete chartInstances[key]; }
}

function fmtNum(n) {
  n = parseInt(n) || 0;
  if (n >= 1e9) return (n/1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
  return n.toLocaleString();
}

function fmtNumShort(n) {
  n = parseInt(n) || 0;
  if (n >= 1e9) return (n/1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
  return n;
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 864e5);
  if (days < 1) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months>1?'s':''} ago`;
  return `${Math.floor(months/12)} year${Math.floor(months/12)>1?'s':''} ago`;
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function toggleTheme() {
  activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = activeTheme === 'light' ? 'light' : '';
  document.getElementById('theme-icon').textContent = activeTheme === 'light' ? '🌙' : '☀️';
  document.getElementById('theme-label').textContent = activeTheme === 'light' ? 'Dark mode' : 'Light mode';
  // Re-render current view
  if (currentChannel) {
    if (activePanel === 'overview') renderOverview(currentChannel);
    if (activePanel === 'videos') renderVideos(currentChannel);
    if (activePanel === 'insights') renderInsights(currentChannel);
    if (activePanel === 'compare') {}
  }
}

// Enter key in main search
document.getElementById('mainSearch').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
</script>
</body>
</html>
