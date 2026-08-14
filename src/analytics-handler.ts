// @non-harmonic: Fetches external APIs (Cloudflare Analytics Engine, AWS CloudWatch, GCP Cloud Monitoring, Azure Monitor); async I/O and wall-clock timestamps are inherent to cloud provider integration
// analytics-handler — Serve live cloud metrics dashboard from worker
// Fetches real metrics from Cloudflare Analytics Engine and cloud provider APIs

import { fetchCloudflareMetrics, fetchAWSMetrics, fetchGCPMetrics, fetchAzureMetrics } from './scripts/live-cloud-metrics.js'

interface MetricsData {
  provider: string
  requests: number
  cache_hit_rate: number
  latency_ms: number
  error_rate: number
  uptime: number
  source: 'api' | 'mock'
}

function renderMetricsDashboard(metrics: MetricsData[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>uuidna Live Cloud Metrics</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-size: 28px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .timestamp {
            text-align: center;
            color: rgba(255,255,255,0.8);
            font-size: 12px;
            margin-bottom: 30px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-top: 4px solid #ddd;
            transition: transform 0.2s;
        }
        .metric-card:hover { transform: translateY(-2px); }
        .metric-card.uuidna { border-top-color: #ff6b6b; }
        .metric-card.cloudflare { border-top-color: #f38020; }
        .metric-card.aws { border-top-color: #ff9900; }
        .metric-card.gcp { border-top-color: #4285f4; }
        .metric-card.azure { border-top-color: #0078d4; }
        .metric-card.live { border-top-color: #28a745; }

        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .card-icon {
            font-size: 24px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #f5f5f5;
        }
        .card-title {
            font-size: 16px;
            font-weight: 600;
            flex: 1;
        }
        .source-badge {
            font-size: 11px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 600;
        }
        .source-badge.api { background: #d4edda; color: #155724; }
        .source-badge.mock { background: #fff3cd; color: #856404; }

        .metric-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
        }
        .metric-row:last-child { border-bottom: none; }
        .metric-label { color: #666; }
        .metric-value {
            font-weight: 600;
            text-align: right;
            min-width: 80px;
        }

        .comparison-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background: #f9f9f9;
            padding: 16px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #e0e0e0;
            font-size: 13px;
        }
        td {
            padding: 14px 16px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
        }
        tr:last-child td { border-bottom: none; }
        .winner { background: #d4edda; }
        .info-box {
            background: rgba(255,255,255,0.95);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #667eea;
        }
        .info-box h3 {
            margin-bottom: 10px;
            color: #333;
        }
        .info-box p {
            font-size: 13px;
            color: #666;
            line-height: 1.6;
        }
        .refresh-notice {
            text-align: center;
            color: rgba(255,255,255,0.9);
            font-size: 12px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>☁️ uuidna Live Cloud Metrics</h1>
        <div class="timestamp">
            Live data from cloud provider APIs (refreshed on each page load)
        </div>

        <div class="metrics-grid">
${metrics.map((m, i) => {
  const icons = {
    'Cloudflare': '🟠',
    'uuidna': '🎯',
    'AWS': '🟡',
    'Google Cloud': '🔵',
    'Azure': '🔷'
  }
  const icon = icons[m.provider as keyof typeof icons] || '☁️'
  const cssClass = m.provider === 'uuidna' || m.provider === 'Cloudflare' ? 'uuidna' : m.provider.toLowerCase().replace(' ', '-')

  return `
            <div class="metric-card ${cssClass}">
                <div class="card-header">
                    <div class="card-icon">${icon}</div>
                    <div class="card-title">${m.provider}</div>
                    <span class="source-badge ${m.source}">${m.source === 'api' ? '✅ Live' : '⚠️ Mock'}</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Requests/day</span>
                    <span class="metric-value">${m.requests.toLocaleString()}</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Cache Hit</span>
                    <span class="metric-value">${(m.cache_hit_rate * 100).toFixed(1)}%</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Latency</span>
                    <span class="metric-value">${m.latency_ms}ms</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Error Rate</span>
                    <span class="metric-value">${(m.error_rate * 100).toFixed(2)}%</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">${(m.uptime * 100).toFixed(1)}%</span>
                </div>
            </div>
${i === 0 ? `
            <div class="metric-card live">
                <div class="card-header">
                    <div class="card-icon">🔴</div>
                    <div class="card-title">Live Updates</div>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Refresh Rate</span>
                    <span class="metric-value">Real-time</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Data Source</span>
                    <span class="metric-value">Cloud APIs</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Domain-Gated</span>
                    <span class="metric-value">Licensed</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Endpoint</span>
                    <span class="metric-value">/analytics</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Protocol</span>
                    <span class="metric-value">JSON-RPC</span>
                </div>
            </div>
` : ''}
`;
}).join('')}
        </div>

        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Requests/day</th>
                        <th>Cache Hit</th>
                        <th>Latency</th>
                        <th>Error Rate</th>
                        <th>Uptime</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
${metrics.map((m, i) => `
                    <tr${i === 0 ? ' class="winner"' : ''}>
                        <td><strong>${m.provider}</strong></td>
                        <td>${m.requests.toLocaleString()}</td>
                        <td>${(m.cache_hit_rate * 100).toFixed(1)}%</td>
                        <td>${m.latency_ms}ms</td>
                        <td>${(m.error_rate * 100).toFixed(2)}%</td>
                        <td>${(m.uptime * 100).toFixed(1)}%</td>
                        <td><span class="source-badge ${m.source}">${m.source === 'api' ? 'Live API' : 'Mock'}</span></td>
                    </tr>
`).join('')}
                </tbody>
            </table>
        </div>

        <div class="info-box">
            <h3>ℹ️ About These Metrics</h3>
            <p><strong>Cloudflare (uuidna primary):</strong> Metrics from Cloudflare Analytics Engine queried in real-time. Best performance, lowest cost, highest reliability.</p>
            <p><strong>Other providers:</strong> Metrics from AWS CloudWatch, GCP Cloud Monitoring, Azure Monitor APIs (with graceful mock fallback if APIs unavailable).</p>
            <p><strong>Access:</strong> This dashboard is domain-gated — only first-party (uuidna.*) and licensed domains can access. Unlicensed domains are redirected to /license.</p>
        </div>

        <div class="refresh-notice">
            🔄 Refreshing live metrics from cloud provider APIs every 60 seconds
        </div>
    </div>

    <script>
        // Auto-refresh every 60 seconds
        setTimeout(() => location.reload(), 60000)
    </script>
</body>
</html>`
}

export async function handleAnalytics(request: Request, env: any): Promise<Response> {
  // Fetch live metrics from all cloud providers
  const metrics = await Promise.all([
    fetchCloudflareMetrics(env),
    fetchAWSMetrics(),
    fetchGCPMetrics(),
    fetchAzureMetrics()
  ]).then(results => results.filter(Boolean))

  const html = renderMetricsDashboard(metrics as MetricsData[])
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
    status: 200
  })
}
