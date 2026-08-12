import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/deploy.md
var __pageData = JSON.parse("{\"title\":\"Deploy\",\"description\":\"How uuidna is deployed and how to run your own — Cloudflare Workers Assets behind an edge worker that self-licenses uuidna.com and redirects every other unlicensed domain to the license. Fork, wrangler deploy, verify by recomputation.\",\"frontmatter\":{\"title\":\"Deploy\",\"description\":\"How uuidna is deployed and how to run your own — Cloudflare Workers Assets behind an edge worker that self-licenses uuidna.com and redirects every other unlicensed domain to the license. Fork, wrangler deploy, verify by recomputation.\",\"prev\":{\"text\":\"chat\",\"link\":\"/chat\"},\"next\":{\"text\":\"games\",\"link\":\"/games\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/deploy\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/deploy\"}]]},\"headers\":[],\"relativePath\":\"deploy.md\",\"filePath\":\"deploy.md\",\"lastUpdated\":1786476731000}");
var _sfc_main = { name: "deploy.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="deploy" tabindex="-1">Deploy `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "Cloudflare"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#deploy" aria-label="Permalink to “Deploy”">​</a></h1><blockquote><p>The site is static assets behind one edge worker — reproducible, and it verifies itself.</p></blockquote><h2 id="how-uuidna-com-runs" tabindex="-1">How uuidna.com runs <a class="header-anchor" href="#how-uuidna-com-runs" aria-label="Permalink to “How uuidna.com runs”">​</a></h2><p>The canonical site is <strong>Cloudflare Workers Assets</strong>: <code>npm run docs:build</code> produces <code>./site</code> (VitePress), and <a href="https://github.com/uuidna/uuidna/blob/main/worker.js" target="_blank" rel="noreferrer"><code>worker.js</code></a> runs in front of it (<code>run_worker_first</code>). The worker does two things — self-license the first-party wildcard and redirect everything else to the <a href="/license">license</a>, and serve the <a href="/trials">trial CRUD</a> at <code>/trials</code> (opt-in, encrypted storage). One command:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">wrangler</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> deploy</span></span></code></pre></div><p>The deploy runs the build, uploads the assets, and publishes the worker. That is exactly how this page reached you.</p><h2 id="run-your-own" tabindex="-1">Run your own <a class="header-anchor" href="#run-your-own" aria-label="Permalink to “Run your own”">​</a></h2><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">git</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> clone</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> https://github.com/uuidna/uuidna</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">cd</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> uuidna</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> install</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> docs:build</span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">      # produces ./site</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">wrangler</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> deploy</span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">         # your Cloudflare account</span></span></code></pre></div><p>A deployment on any domain that is <strong>not</strong> <code>*.uuidna.{com,net,org}</code> and holds no license is <strong>redirected to uuidna.com/license</strong> — that is the worker&#39;s rule, not a suggestion. To run licensed, the terms trace back to the <a href="/license">canonical license</a>: non-commercial reuse is free with attribution; commercial deployments CNAME their own domain to a <code>[contract-uuid].uuidna.org</code> subdomain. The domain <em>is</em> the contract&#39;s address.</p><h2 id="the-gate-before-the-publish" tabindex="-1">The gate before the publish <a class="header-anchor" href="#the-gate-before-the-publish" aria-label="Permalink to “The gate before the publish”">​</a></h2><p>The npm package ships only behind the <a href="/tests">seven-dimension audit</a>: <code>npm run audit</code> (build · Lean re-verified sorry-free · provenance · tests · determinism) — and, in CI, the version guards and npm&#39;s signed provenance attestation. A failing audit fails the publish, never production.</p><h2 id="verify-don-t-trust" tabindex="-1">Verify, don&#39;t trust <a class="header-anchor" href="#verify-don-t-trust" aria-label="Permalink to “Verify, don&#39;t trust”">​</a></h2><p>Whatever is deployed, you can recompute it:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> lean</span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">        # re-verify every theorem \`by decide\`, sorry-free</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> audit</span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">       # the whole release gate</span></span></code></pre></div><p>Same source in, same receipts out. See the <a href="/guides">Guides</a> for the rest. Integrity, not truth.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("deploy.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var deploy_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, deploy_default as default };
