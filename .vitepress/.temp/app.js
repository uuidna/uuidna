import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { renderToString, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { Fragment, computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, defineAsyncComponent, defineComponent, h, inject, markRaw, mergeProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, onUpdated, openBlock, provide, reactive, readonly, ref, renderList, renderSlot, resolveComponent, resolveDynamicComponent, shallowReadonly, shallowRef, toDisplayString, toHandlers, unref, useSSRContext, useSlots, useTemplateRef, watch, watchEffect, watchPostEffect, withCtx, withKeys } from "vue";
import { onKeyStroke, tryOnUnmounted, useDark, useMediaQuery, useNavigatorLanguage, usePreferredDark, useScrollLock, useWindowScroll, useWindowSize } from "@vueuse/core";
//#region node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue?vue&type=script&setup=true&lang.ts
var VPBadge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPBadge",
	__ssrInlineRender: true,
	props: {
		text: {},
		type: { default: "tip" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: ["VPBadge", __props.type] }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, () => {
				_push(`${ssrInterpolate(__props.text)}`);
			}, _push, _parent);
			_push(`</span>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue
var _sfc_setup$82 = VPBadge_vue_vue_type_script_setup_true_lang_default.setup;
VPBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue");
	return _sfc_setup$82 ? _sfc_setup$82(props, ctx) : void 0;
};
var VPBadge_default = VPBadge_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue?vue&type=script&setup=true&lang.ts
var VPBackdrop_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPBackdrop",
	__ssrInlineRender: true,
	props: { show: { type: Boolean } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.show) _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPBackdrop" }, _attrs))} data-v-c79a1216></div>`);
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue
var _sfc_setup$81 = VPBackdrop_vue_vue_type_script_setup_true_lang_default.setup;
VPBackdrop_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue");
	return _sfc_setup$81 ? _sfc_setup$81(props, ctx) : void 0;
};
var VPBackdrop_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPBackdrop_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c79a1216"]]);
//#endregion
//#region node_modules/vitepress/dist/client/app/components/ClientOnly.js
var ClientOnly = defineComponent({ setup(_, { slots }) {
	const show = ref(false);
	onMounted(() => {
		show.value = true;
	});
	return () => show.value && slots.default ? slots.default() : null;
} });
//#endregion
//#region node_modules/vitepress/dist/client/shared.js
var EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;
var APPEARANCE_KEY = "vitepress-theme-appearance";
var UnpackStackView = Symbol("stack-view:unpack");
var HASH_WITHOUT_FRAGMENT_RE = /#.*?(?=:~:|$)/;
var HASH_OR_QUERY_RE = /[?#].*$/;
var INDEX_OR_EXT_RE = /(?:(^|\/)index)?(?:\.(?:md|html))?$/;
var INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
var DRIVE_LETTER_REGEX = /^[a-z]:/i;
var KNOWN_EXTENSIONS = /* @__PURE__ */ new Set();
var shellLangs = [
	"shellscript",
	"shell",
	"bash",
	"sh",
	"zsh"
];
var inBrowser = typeof document !== "undefined";
var notFoundPageData = {
	relativePath: "404.md",
	filePath: "",
	title: "404",
	description: "Not Found",
	headers: [],
	frontmatter: {
		sidebar: false,
		layout: "page"
	},
	lastUpdated: 0,
	isNotFound: true
};
function isActive(currentPath, currentHash, matchPath, asRegex = false, skipHashCheck = false) {
	currentPath = normalize(`/${currentPath}`);
	if (asRegex) return new RegExp(matchPath).test(currentPath);
	if (normalize(matchPath) !== currentPath) return false;
	if (skipHashCheck) return true;
	const hashMatch = matchPath.match(HASH_WITHOUT_FRAGMENT_RE);
	if (hashMatch) return currentHash === hashMatch[0];
	return true;
}
function normalize(path) {
	return decodeURI(path).replace(HASH_OR_QUERY_RE, "").replace(INDEX_OR_EXT_RE, "$1");
}
function isExternal(path) {
	return EXTERNAL_URL_RE.test(path);
}
function getLocaleForPath(siteData, relativePath) {
	return Object.keys(siteData?.locales || {}).find((key) => key !== "root" && !isExternal(key) && isActive(relativePath, "", `^/${key}/`, true)) || "root";
}
/**
* this merges the locales data to the main data by the route
*/
function resolveSiteDataByRoute(siteData, relativePath, filePath) {
	const localeIndex = getLocaleForPath(siteData, relativePath);
	const { label, link, markdown, ...localeConfig } = siteData.locales[localeIndex] ?? {};
	Object.assign(localeConfig, { localeIndex });
	const additionalConfigs = resolveAdditionalConfig(siteData, filePath || relativePath);
	return stackView({ head: mergeHead(siteData.head ?? [], localeConfig.head ?? [], ...additionalConfigs.map((data) => data.head ?? []).reverse()) }, ...additionalConfigs, localeConfig, siteData);
}
/**
* Create the page title string based on config.
*/
function createTitle(siteData, pageData) {
	const title = pageData.title || siteData.title;
	const template = pageData.titleTemplate ?? siteData.titleTemplate;
	if (typeof template === "string" && template.includes(":title")) return template.replace(/:title/g, title);
	const templateString = createTitleTemplate(siteData.title, template);
	if (title === templateString.slice(3)) return title;
	return `${title}${templateString}`;
}
function createTitleTemplate(siteTitle, template) {
	if (template === false) return "";
	if (template === true || template === void 0) return ` | ${siteTitle}`;
	if (siteTitle === template) return "";
	return ` | ${template}`;
}
function mergeHead(...headArrays) {
	const merged = [];
	const metaKeyMap = /* @__PURE__ */ new Map();
	for (const current of headArrays) for (const tag of current) {
		const [type, attrs] = tag;
		const keyAttr = Object.entries(attrs)[0];
		if (type !== "meta" || !keyAttr) {
			merged.push(tag);
			continue;
		}
		const key = `${keyAttr[0]}=${keyAttr[1]}`;
		const existingIndex = metaKeyMap.get(key);
		if (existingIndex != null) merged[existingIndex] = tag;
		else {
			metaKeyMap.set(key, merged.length);
			merged.push(tag);
		}
	}
	return merged;
}
function sanitizeFileName(name) {
	const match = DRIVE_LETTER_REGEX.exec(name);
	const driveLetter = match ? match[0] : "";
	return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_").replace(/(^|\/)_+(?=[^/]*$)/, "$1");
}
function treatAsHtml(filename) {
	if (KNOWN_EXTENSIONS.size === 0) {
		const extraExts = typeof process === "object" && process.env?.VITE_EXTRA_EXTENSIONS || "";
		("3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip" + (extraExts && typeof extraExts === "string" ? "," + extraExts : "")).split(",").forEach((ext) => KNOWN_EXTENSIONS.add(ext));
	}
	const ext = filename.split(".").pop();
	return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
}
function escapeRegExp(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function resolveAdditionalConfig({ additionalConfig }, path) {
	if (additionalConfig === void 0) return [];
	if (typeof additionalConfig === "function") return additionalConfig(path) ?? [];
	const configs = [];
	const segments = path.split("/").slice(0, -1);
	while (segments.length) {
		const key = `/${segments.join("/")}/`;
		configs.push(additionalConfig[key]);
		segments.pop();
	}
	configs.push(additionalConfig["/"]);
	return configs.filter((config) => config !== void 0);
}
/**
* Creates a deep, merged view of multiple objects without mutating originals.
* Returns a readonly proxy behaving like a merged object of the input objects.
* Layers are merged in descending precedence, i.e. earlier layer is on top.
*/
function stackView(..._layers) {
	const layers = _layers.filter((layer) => isObject(layer));
	if (layers.length <= 1) return _layers[0];
	const allKeys = new Set(layers.flatMap((layer) => Reflect.ownKeys(layer)));
	const allKeysArray = [...allKeys];
	return new Proxy({}, {
		get(_, prop) {
			if (prop === UnpackStackView) return layers;
			return stackView(...layers.map((layer) => layer[prop]).filter((v) => v !== void 0));
		},
		set() {
			throw new Error("StackView is read-only and cannot be mutated.");
		},
		has(_, prop) {
			return allKeys.has(prop);
		},
		ownKeys() {
			return allKeysArray;
		},
		getOwnPropertyDescriptor(_, prop) {
			for (const layer of layers) {
				const descriptor = Object.getOwnPropertyDescriptor(layer, prop);
				if (descriptor) return descriptor;
			}
		}
	});
}
stackView.unpack = function(obj) {
	return obj?.[UnpackStackView];
};
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}
function isShell(lang) {
	return shellLangs.includes(lang);
}
//#endregion
//#region ../../../../../@siteData
function deserializeFunctions(r) {
	return Array.isArray(r) ? r.map(deserializeFunctions) : typeof r == "object" && r !== null ? Object.keys(r).reduce((t, n) => (t[n] = deserializeFunctions(r[n]), t), {}) : typeof r == "string" && r.startsWith("_vp-fn_") ? new Function(`return ${r.slice(7)}`)() : r;
}
var _siteData_default = deserializeFunctions(JSON.parse("{\"lang\":\"en-US\",\"dir\":\"ltr\",\"title\":\"uuidna\",\"description\":\"Content-addressed identity, honest by construction. 861 theorems proven in Lean 4 (by decide, sorry-free), folded to one recomputable receipt. \",\"base\":\"/\",\"head\":[],\"router\":{\"prefetchLinks\":true},\"appearance\":true,\"themeConfig\":{\"search\":{\"provider\":\"local\"},\"outline\":\"deep\",\"nav\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"Theorems\",\"link\":\"/theorems\"},{\"text\":\"Topics\",\"link\":\"/topics\"},{\"text\":\"MCP\",\"link\":\"/mcp\"},{\"text\":\"Books\",\"link\":\"/books\"},{\"text\":\"Publications\",\"link\":\"/publications\"},{\"text\":\"Vocabulary\",\"link\":\"/vocabulary\"},{\"text\":\"Changelog\",\"link\":\"/changelog\"},{\"text\":\"Guides\",\"link\":\"/guides\"},{\"text\":\"Captain\",\"items\":[{\"text\":\"The Contract\",\"link\":\"/captain/config\"},{\"text\":\"The captain's message\",\"link\":\"/captain/message\"},{\"text\":\"The Navigator\",\"link\":\"/captain/navigator\"}]}],\"sidebar\":{\"/\":[{\"text\":\"The voyage · 25\",\"collapsed\":false,\"items\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"Books\",\"link\":\"/books\"},{\"text\":\"Captain · Config\",\"link\":\"/captain/config\"},{\"text\":\"Captain · Message\",\"link\":\"/captain/message\"},{\"text\":\"Captain · Navigator\",\"link\":\"/captain/navigator\"},{\"text\":\"Changelog\",\"link\":\"/changelog\"},{\"text\":\"Chat\",\"link\":\"/chat\"},{\"text\":\"Deploy\",\"link\":\"/deploy\"},{\"text\":\"Games\",\"link\":\"/games\"},{\"text\":\"Games · Chess\",\"link\":\"/games/chess\"},{\"text\":\"Guides\",\"link\":\"/guides\"},{\"text\":\"Justice\",\"link\":\"/justice\"},{\"text\":\"License\",\"link\":\"/license\"},{\"text\":\"MCP\",\"link\":\"/mcp\"},{\"text\":\"Privacy\",\"link\":\"/privacy\"},{\"text\":\"Publications\",\"link\":\"/publications\"},{\"text\":\"Search\",\"link\":\"/search\"},{\"text\":\"Tests\",\"link\":\"/tests\"},{\"text\":\"Theorems\",\"link\":\"/theorems\"},{\"text\":\"Theories\",\"link\":\"/theories\"},{\"text\":\"Thoughts\",\"link\":\"/thoughts\"},{\"text\":\"Topics\",\"link\":\"/topics\"},{\"text\":\"Trading\",\"link\":\"/trading\"},{\"text\":\"Trials\",\"link\":\"/trials\"},{\"text\":\"Vocabulary\",\"link\":\"/vocabulary\"}]},{\"text\":\"Publications · 49\",\"collapsed\":true,\"items\":[{\"text\":\"Publications · Core\",\"link\":\"/publications/core\"},{\"text\":\"Publications · Ring\",\"link\":\"/publications/ring\"},{\"text\":\"Publications · Rosette\",\"link\":\"/publications/rosette\"},{\"text\":\"Publications · Uuidna\",\"link\":\"/publications/uuidna\"},{\"text\":\"Publications · Vortex\",\"link\":\"/publications/vortex\"},{\"text\":\"Publications · Sequence\",\"link\":\"/publications/sequence\"},{\"text\":\"Publications · Div-by-zero\",\"link\":\"/publications/div-by-zero\"},{\"text\":\"Publications · Bio-physics\",\"link\":\"/publications/bio-physics\"},{\"text\":\"Publications · Discover\",\"link\":\"/publications/discover\"},{\"text\":\"Publications · Quantum\",\"link\":\"/publications/quantum\"},{\"text\":\"Publications · Clay\",\"link\":\"/publications/clay\"},{\"text\":\"Publications · Infinity\",\"link\":\"/publications/infinity\"},{\"text\":\"Publications · Cipher\",\"link\":\"/publications/cipher\"},{\"text\":\"Publications · Audit\",\"link\":\"/publications/audit\"},{\"text\":\"Publications · Coins\",\"link\":\"/publications/coins\"},{\"text\":\"Publications · Neuro\",\"link\":\"/publications/neuro\"},{\"text\":\"Publications · Propulsion\",\"link\":\"/publications/propulsion\"},{\"text\":\"Publications · Navigation\",\"link\":\"/publications/navigation\"},{\"text\":\"Publications · Command\",\"link\":\"/publications/command\"},{\"text\":\"Publications · Astronomy\",\"link\":\"/publications/astronomy\"},{\"text\":\"Publications · Diving\",\"link\":\"/publications/diving\"},{\"text\":\"Publications · Optics\",\"link\":\"/publications/optics\"},{\"text\":\"Publications · Acoustics\",\"link\":\"/publications/acoustics\"},{\"text\":\"Publications · Chemistry\",\"link\":\"/publications/chemistry\"},{\"text\":\"Publications · Thermodynamics\",\"link\":\"/publications/thermodynamics\"},{\"text\":\"Publications · Molecular\",\"link\":\"/publications/molecular\"},{\"text\":\"Publications · Electromagnetism\",\"link\":\"/publications/electromagnetism\"},{\"text\":\"Publications · Statics\",\"link\":\"/publications/statics\"},{\"text\":\"Publications · Sailing\",\"link\":\"/publications/sailing\"},{\"text\":\"Publications · Relativity\",\"link\":\"/publications/relativity\"},{\"text\":\"Publications · Glagolitic\",\"link\":\"/publications/glagolitic\"},{\"text\":\"Publications · Ephemeris\",\"link\":\"/publications/ephemeris\"},{\"text\":\"Publications · Pentagram\",\"link\":\"/publications/pentagram\"},{\"text\":\"Publications · Chess\",\"link\":\"/publications/chess\"},{\"text\":\"Publications · Codes\",\"link\":\"/publications/codes\"},{\"text\":\"Publications · Identifiers\",\"link\":\"/publications/identifiers\"},{\"text\":\"Publications · Tides\",\"link\":\"/publications/tides\"},{\"text\":\"Publications · Calendar\",\"link\":\"/publications/calendar\"},{\"text\":\"Publications · Typesetting\",\"link\":\"/publications/typesetting\"},{\"text\":\"Publications · Editing\",\"link\":\"/publications/editing\"},{\"text\":\"Publications · Photography\",\"link\":\"/publications/photography\"},{\"text\":\"Publications · Spectrum\",\"link\":\"/publications/spectrum\"},{\"text\":\"Publications · Colour\",\"link\":\"/publications/colour\"},{\"text\":\"Publications · Harmony\",\"link\":\"/publications/harmony\"},{\"text\":\"Publications · Matching\",\"link\":\"/publications/matching\"},{\"text\":\"Publications · Reasoning\",\"link\":\"/publications/reasoning\"},{\"text\":\"Publications · Security\",\"link\":\"/publications/security\"},{\"text\":\"Publications · Production\",\"link\":\"/publications/production\"},{\"text\":\"Publications · One-leap\",\"link\":\"/publications/one-leap\"}]},{\"text\":\"The 8×8 core · 64\",\"collapsed\":true,\"items\":[{\"text\":\"1·1 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_1_1\"},{\"text\":\"1·2 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_1_2\"},{\"text\":\"1·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_1_3\"},{\"text\":\"1·4 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_1_4\"},{\"text\":\"1·5 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_1_5\"},{\"text\":\"1·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_1_6\"},{\"text\":\"1·7 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_1_7\"},{\"text\":\"1·8 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_1_8\"},{\"text\":\"2·1 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_2_1\"},{\"text\":\"2·2 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_2_2\"},{\"text\":\"2·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_2_3\"},{\"text\":\"2·4 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_2_4\"},{\"text\":\"2·5 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_2_5\"},{\"text\":\"2·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_2_6\"},{\"text\":\"2·7 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_2_7\"},{\"text\":\"2·8 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_2_8\"},{\"text\":\"3·1 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_3_1\"},{\"text\":\"3·2 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_3_2\"},{\"text\":\"3·3 ≡ 0 (mod 9)\",\"link\":\"/theorem/mul9_3_3\"},{\"text\":\"3·4 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_3_4\"},{\"text\":\"3·5 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_3_5\"},{\"text\":\"3·6 ≡ 0 (mod 9)\",\"link\":\"/theorem/mul9_3_6\"},{\"text\":\"3·7 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_3_7\"},{\"text\":\"3·8 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_3_8\"},{\"text\":\"4·1 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_4_1\"},{\"text\":\"4·2 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_4_2\"},{\"text\":\"4·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_4_3\"},{\"text\":\"4·4 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_4_4\"},{\"text\":\"4·5 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_4_5\"},{\"text\":\"4·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_4_6\"},{\"text\":\"4·7 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_4_7\"},{\"text\":\"4·8 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_4_8\"},{\"text\":\"5·1 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_5_1\"},{\"text\":\"5·2 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_5_2\"},{\"text\":\"5·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_5_3\"},{\"text\":\"5·4 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_5_4\"},{\"text\":\"5·5 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_5_5\"},{\"text\":\"5·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_5_6\"},{\"text\":\"5·7 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_5_7\"},{\"text\":\"5·8 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_5_8\"},{\"text\":\"6·1 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_6_1\"},{\"text\":\"6·2 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_6_2\"},{\"text\":\"6·3 ≡ 0 (mod 9)\",\"link\":\"/theorem/mul9_6_3\"},{\"text\":\"6·4 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_6_4\"},{\"text\":\"6·5 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_6_5\"},{\"text\":\"6·6 ≡ 0 (mod 9)\",\"link\":\"/theorem/mul9_6_6\"},{\"text\":\"6·7 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_6_7\"},{\"text\":\"6·8 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_6_8\"},{\"text\":\"7·1 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_7_1\"},{\"text\":\"7·2 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_7_2\"},{\"text\":\"7·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_7_3\"},{\"text\":\"7·4 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_7_4\"},{\"text\":\"7·5 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_7_5\"},{\"text\":\"7·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_7_6\"},{\"text\":\"7·7 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_7_7\"},{\"text\":\"7·8 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_7_8\"},{\"text\":\"8·1 ≡ 8 (mod 9)\",\"link\":\"/theorem/mul9_8_1\"},{\"text\":\"8·2 ≡ 7 (mod 9)\",\"link\":\"/theorem/mul9_8_2\"},{\"text\":\"8·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/mul9_8_3\"},{\"text\":\"8·4 ≡ 5 (mod 9)\",\"link\":\"/theorem/mul9_8_4\"},{\"text\":\"8·5 ≡ 4 (mod 9)\",\"link\":\"/theorem/mul9_8_5\"},{\"text\":\"8·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/mul9_8_6\"},{\"text\":\"8·7 ≡ 2 (mod 9)\",\"link\":\"/theorem/mul9_8_7\"},{\"text\":\"8·8 ≡ 1 (mod 9)\",\"link\":\"/theorem/mul9_8_8\"}]},{\"text\":\"The ring ℤ/9 · 234\",\"collapsed\":true,\"items\":[{\"text\":\"0·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_0\"},{\"text\":\"0+0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_0_0\"},{\"text\":\"0·1 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_1\"},{\"text\":\"0+1 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_0_1\"},{\"text\":\"0·2 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_2\"},{\"text\":\"0+2 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_0_2\"},{\"text\":\"0·3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_3\"},{\"text\":\"0+3 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_0_3\"},{\"text\":\"0·4 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_4\"},{\"text\":\"0+4 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_0_4\"},{\"text\":\"0·5 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_5\"},{\"text\":\"0+5 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_0_5\"},{\"text\":\"0·6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_6\"},{\"text\":\"0+6 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_0_6\"},{\"text\":\"0·7 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_7\"},{\"text\":\"0+7 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_0_7\"},{\"text\":\"0·8 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_0_8\"},{\"text\":\"0+8 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_0_8\"},{\"text\":\"1·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_1_0\"},{\"text\":\"1+0 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_1_0\"},{\"text\":\"1·1 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_1_1\"},{\"text\":\"1+1 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_1_1\"},{\"text\":\"1·2 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_1_2\"},{\"text\":\"1+2 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_1_2\"},{\"text\":\"1·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_1_3\"},{\"text\":\"1+3 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_1_3\"},{\"text\":\"1·4 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_1_4\"},{\"text\":\"1+4 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_1_4\"},{\"text\":\"1·5 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_1_5\"},{\"text\":\"1+5 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_1_5\"},{\"text\":\"1·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_1_6\"},{\"text\":\"1+6 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_1_6\"},{\"text\":\"1·7 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_1_7\"},{\"text\":\"1+7 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_1_7\"},{\"text\":\"1·8 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_1_8\"},{\"text\":\"1+8 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_1_8\"},{\"text\":\"2·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_2_0\"},{\"text\":\"2+0 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_2_0\"},{\"text\":\"2·1 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_2_1\"},{\"text\":\"2+1 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_2_1\"},{\"text\":\"2·2 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_2_2\"},{\"text\":\"2+2 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_2_2\"},{\"text\":\"2·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_2_3\"},{\"text\":\"2+3 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_2_3\"},{\"text\":\"2·4 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_2_4\"},{\"text\":\"2+4 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_2_4\"},{\"text\":\"2·5 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_2_5\"},{\"text\":\"2+5 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_2_5\"},{\"text\":\"2·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_2_6\"},{\"text\":\"2+6 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_2_6\"},{\"text\":\"2·7 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_2_7\"},{\"text\":\"2+7 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_2_7\"},{\"text\":\"2·8 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_2_8\"},{\"text\":\"2+8 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_2_8\"},{\"text\":\"3·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_3_0\"},{\"text\":\"3+0 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_3_0\"},{\"text\":\"3·1 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_3_1\"},{\"text\":\"3+1 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_3_1\"},{\"text\":\"3·2 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_3_2\"},{\"text\":\"3+2 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_3_2\"},{\"text\":\"3·3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_3_3\"},{\"text\":\"3+3 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_3_3\"},{\"text\":\"3·4 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_3_4\"},{\"text\":\"3+4 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_3_4\"},{\"text\":\"3·5 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_3_5\"},{\"text\":\"3+5 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_3_5\"},{\"text\":\"3·6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_3_6\"},{\"text\":\"3+6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_3_6\"},{\"text\":\"3·7 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_3_7\"},{\"text\":\"3+7 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_3_7\"},{\"text\":\"3·8 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_3_8\"},{\"text\":\"3+8 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_3_8\"},{\"text\":\"4·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_4_0\"},{\"text\":\"4+0 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_4_0\"},{\"text\":\"4·1 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_4_1\"},{\"text\":\"4+1 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_4_1\"},{\"text\":\"4·2 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_4_2\"},{\"text\":\"4+2 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_4_2\"},{\"text\":\"4·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_4_3\"},{\"text\":\"4+3 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_4_3\"},{\"text\":\"4·4 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_4_4\"},{\"text\":\"4+4 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_4_4\"},{\"text\":\"4·5 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_4_5\"},{\"text\":\"4+5 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_4_5\"},{\"text\":\"4·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_4_6\"},{\"text\":\"4+6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_4_6\"},{\"text\":\"4·7 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_4_7\"},{\"text\":\"4+7 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_4_7\"},{\"text\":\"4·8 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_4_8\"},{\"text\":\"4+8 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_4_8\"},{\"text\":\"5·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_5_0\"},{\"text\":\"5+0 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_5_0\"},{\"text\":\"5·1 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_5_1\"},{\"text\":\"5+1 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_5_1\"},{\"text\":\"5·2 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_5_2\"},{\"text\":\"5+2 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_5_2\"},{\"text\":\"5·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_5_3\"},{\"text\":\"5+3 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_5_3\"},{\"text\":\"5·4 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_5_4\"},{\"text\":\"5+4 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_5_4\"},{\"text\":\"5·5 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_5_5\"},{\"text\":\"5+5 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_5_5\"},{\"text\":\"5·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_5_6\"},{\"text\":\"5+6 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_5_6\"},{\"text\":\"5·7 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_5_7\"},{\"text\":\"5+7 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_5_7\"},{\"text\":\"5·8 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_5_8\"},{\"text\":\"5+8 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_5_8\"},{\"text\":\"6·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_6_0\"},{\"text\":\"6+0 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_6_0\"},{\"text\":\"6·1 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_6_1\"},{\"text\":\"6+1 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_6_1\"},{\"text\":\"6·2 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_6_2\"},{\"text\":\"6+2 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_6_2\"},{\"text\":\"6·3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_6_3\"},{\"text\":\"6+3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_6_3\"},{\"text\":\"6·4 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_6_4\"},{\"text\":\"6+4 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_6_4\"},{\"text\":\"6·5 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_6_5\"},{\"text\":\"6+5 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_6_5\"},{\"text\":\"6·6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_6_6\"},{\"text\":\"6+6 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_6_6\"},{\"text\":\"6·7 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_6_7\"},{\"text\":\"6+7 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_6_7\"},{\"text\":\"6·8 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_6_8\"},{\"text\":\"6+8 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_6_8\"},{\"text\":\"7·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_7_0\"},{\"text\":\"7+0 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_7_0\"},{\"text\":\"7·1 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_7_1\"},{\"text\":\"7+1 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_7_1\"},{\"text\":\"7·2 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_7_2\"},{\"text\":\"7+2 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_7_2\"},{\"text\":\"7·3 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_7_3\"},{\"text\":\"7+3 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_7_3\"},{\"text\":\"7·4 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_7_4\"},{\"text\":\"7+4 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_7_4\"},{\"text\":\"7·5 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_7_5\"},{\"text\":\"7+5 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_7_5\"},{\"text\":\"7·6 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_7_6\"},{\"text\":\"7+6 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_7_6\"},{\"text\":\"7·7 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_7_7\"},{\"text\":\"7+7 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_7_7\"},{\"text\":\"7·8 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_7_8\"},{\"text\":\"7+8 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_7_8\"},{\"text\":\"8·0 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9mul_8_0\"},{\"text\":\"8+0 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9add_8_0\"},{\"text\":\"8·1 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9mul_8_1\"},{\"text\":\"8+1 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9add_8_1\"},{\"text\":\"8·2 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9mul_8_2\"},{\"text\":\"8+2 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9add_8_2\"},{\"text\":\"8·3 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9mul_8_3\"},{\"text\":\"8+3 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9add_8_3\"},{\"text\":\"8·4 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9mul_8_4\"},{\"text\":\"8+4 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9add_8_4\"},{\"text\":\"8·5 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9mul_8_5\"},{\"text\":\"8+5 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9add_8_5\"},{\"text\":\"8·6 ≡ 3 (mod 9)\",\"link\":\"/theorem/z9mul_8_6\"},{\"text\":\"8+6 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9add_8_6\"},{\"text\":\"8·7 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9mul_8_7\"},{\"text\":\"8+7 ≡ 6 (mod 9)\",\"link\":\"/theorem/z9add_8_7\"},{\"text\":\"8·8 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9mul_8_8\"},{\"text\":\"8+8 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9add_8_8\"},{\"text\":\"0^2 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_2\"},{\"text\":\"0^3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_3\"},{\"text\":\"0^4 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_4\"},{\"text\":\"0^5 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_5\"},{\"text\":\"0^6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_6\"},{\"text\":\"0^7 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_7\"},{\"text\":\"0^8 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_8\"},{\"text\":\"0^9 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_0_9\"},{\"text\":\"1^2 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_2\"},{\"text\":\"1^3 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_3\"},{\"text\":\"1^4 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_4\"},{\"text\":\"1^5 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_5\"},{\"text\":\"1^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_6\"},{\"text\":\"1^7 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_7\"},{\"text\":\"1^8 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_8\"},{\"text\":\"1^9 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_1_9\"},{\"text\":\"2^2 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_2_2\"},{\"text\":\"2^3 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_2_3\"},{\"text\":\"2^4 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_2_4\"},{\"text\":\"2^5 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9pow_2_5\"},{\"text\":\"2^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_2_6\"},{\"text\":\"2^7 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9pow_2_7\"},{\"text\":\"2^8 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_2_8\"},{\"text\":\"2^9 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_2_9\"},{\"text\":\"3^2 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_2\"},{\"text\":\"3^3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_3\"},{\"text\":\"3^4 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_4\"},{\"text\":\"3^5 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_5\"},{\"text\":\"3^6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_6\"},{\"text\":\"3^7 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_7\"},{\"text\":\"3^8 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_8\"},{\"text\":\"3^9 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_3_9\"},{\"text\":\"4^2 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_4_2\"},{\"text\":\"4^3 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_4_3\"},{\"text\":\"4^4 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_4_4\"},{\"text\":\"4^5 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_4_5\"},{\"text\":\"4^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_4_6\"},{\"text\":\"4^7 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_4_7\"},{\"text\":\"4^8 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_4_8\"},{\"text\":\"4^9 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_4_9\"},{\"text\":\"5^2 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_5_2\"},{\"text\":\"5^3 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_5_3\"},{\"text\":\"5^4 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_5_4\"},{\"text\":\"5^5 ≡ 2 (mod 9)\",\"link\":\"/theorem/z9pow_5_5\"},{\"text\":\"5^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_5_6\"},{\"text\":\"5^7 ≡ 5 (mod 9)\",\"link\":\"/theorem/z9pow_5_7\"},{\"text\":\"5^8 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_5_8\"},{\"text\":\"5^9 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_5_9\"},{\"text\":\"6^2 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_2\"},{\"text\":\"6^3 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_3\"},{\"text\":\"6^4 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_4\"},{\"text\":\"6^5 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_5\"},{\"text\":\"6^6 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_6\"},{\"text\":\"6^7 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_7\"},{\"text\":\"6^8 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_8\"},{\"text\":\"6^9 ≡ 0 (mod 9)\",\"link\":\"/theorem/z9pow_6_9\"},{\"text\":\"7^2 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_7_2\"},{\"text\":\"7^3 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_7_3\"},{\"text\":\"7^4 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_7_4\"},{\"text\":\"7^5 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_7_5\"},{\"text\":\"7^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_7_6\"},{\"text\":\"7^7 ≡ 7 (mod 9)\",\"link\":\"/theorem/z9pow_7_7\"},{\"text\":\"7^8 ≡ 4 (mod 9)\",\"link\":\"/theorem/z9pow_7_8\"},{\"text\":\"7^9 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_7_9\"},{\"text\":\"8^2 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_8_2\"},{\"text\":\"8^3 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_8_3\"},{\"text\":\"8^4 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_8_4\"},{\"text\":\"8^5 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_8_5\"},{\"text\":\"8^6 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_8_6\"},{\"text\":\"8^7 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_8_7\"},{\"text\":\"8^8 ≡ 1 (mod 9)\",\"link\":\"/theorem/z9pow_8_8\"},{\"text\":\"8^9 ≡ 8 (mod 9)\",\"link\":\"/theorem/z9pow_8_9\"}]},{\"text\":\"The rosette ℤ/7 · 145\",\"collapsed\":true,\"items\":[{\"text\":\"0·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_0\"},{\"text\":\"0+0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_0_0\"},{\"text\":\"0·1 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_1\"},{\"text\":\"0+1 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_0_1\"},{\"text\":\"0·2 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_2\"},{\"text\":\"0+2 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_0_2\"},{\"text\":\"0·3 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_3\"},{\"text\":\"0+3 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_0_3\"},{\"text\":\"0·4 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_4\"},{\"text\":\"0+4 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_0_4\"},{\"text\":\"0·5 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_5\"},{\"text\":\"0+5 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_0_5\"},{\"text\":\"0·6 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_0_6\"},{\"text\":\"0+6 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_0_6\"},{\"text\":\"1·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_1_0\"},{\"text\":\"1+0 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_1_0\"},{\"text\":\"1·1 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_1_1\"},{\"text\":\"1+1 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_1_1\"},{\"text\":\"1·2 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_1_2\"},{\"text\":\"1+2 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_1_2\"},{\"text\":\"1·3 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_1_3\"},{\"text\":\"1+3 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_1_3\"},{\"text\":\"1·4 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_1_4\"},{\"text\":\"1+4 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_1_4\"},{\"text\":\"1·5 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_1_5\"},{\"text\":\"1+5 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_1_5\"},{\"text\":\"1·6 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_1_6\"},{\"text\":\"1+6 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_1_6\"},{\"text\":\"2·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_2_0\"},{\"text\":\"2+0 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_2_0\"},{\"text\":\"2·1 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_2_1\"},{\"text\":\"2+1 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_2_1\"},{\"text\":\"2·2 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_2_2\"},{\"text\":\"2+2 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_2_2\"},{\"text\":\"2·3 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_2_3\"},{\"text\":\"2+3 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_2_3\"},{\"text\":\"2·4 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_2_4\"},{\"text\":\"2+4 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_2_4\"},{\"text\":\"2·5 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_2_5\"},{\"text\":\"2+5 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_2_5\"},{\"text\":\"2·6 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_2_6\"},{\"text\":\"2+6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_2_6\"},{\"text\":\"3·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_3_0\"},{\"text\":\"3+0 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_3_0\"},{\"text\":\"3·1 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_3_1\"},{\"text\":\"3+1 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_3_1\"},{\"text\":\"3·2 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_3_2\"},{\"text\":\"3+2 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_3_2\"},{\"text\":\"3·3 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_3_3\"},{\"text\":\"3+3 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_3_3\"},{\"text\":\"3·4 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_3_4\"},{\"text\":\"3+4 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_3_4\"},{\"text\":\"3·5 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_3_5\"},{\"text\":\"3+5 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_3_5\"},{\"text\":\"3·6 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_3_6\"},{\"text\":\"3+6 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_3_6\"},{\"text\":\"4·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_4_0\"},{\"text\":\"4+0 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_4_0\"},{\"text\":\"4·1 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_4_1\"},{\"text\":\"4+1 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_4_1\"},{\"text\":\"4·2 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_4_2\"},{\"text\":\"4+2 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_4_2\"},{\"text\":\"4·3 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_4_3\"},{\"text\":\"4+3 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_4_3\"},{\"text\":\"4·4 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_4_4\"},{\"text\":\"4+4 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_4_4\"},{\"text\":\"4·5 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_4_5\"},{\"text\":\"4+5 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_4_5\"},{\"text\":\"4·6 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_4_6\"},{\"text\":\"4+6 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_4_6\"},{\"text\":\"5·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_5_0\"},{\"text\":\"5+0 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_5_0\"},{\"text\":\"5·1 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_5_1\"},{\"text\":\"5+1 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_5_1\"},{\"text\":\"5·2 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_5_2\"},{\"text\":\"5+2 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_5_2\"},{\"text\":\"5·3 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_5_3\"},{\"text\":\"5+3 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_5_3\"},{\"text\":\"5·4 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_5_4\"},{\"text\":\"5+4 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_5_4\"},{\"text\":\"5·5 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_5_5\"},{\"text\":\"5+5 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_5_5\"},{\"text\":\"5·6 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_5_6\"},{\"text\":\"5+6 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_5_6\"},{\"text\":\"6·0 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7mul_6_0\"},{\"text\":\"6+0 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7add_6_0\"},{\"text\":\"6·1 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7mul_6_1\"},{\"text\":\"6+1 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7add_6_1\"},{\"text\":\"6·2 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7mul_6_2\"},{\"text\":\"6+2 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7add_6_2\"},{\"text\":\"6·3 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7mul_6_3\"},{\"text\":\"6+3 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7add_6_3\"},{\"text\":\"6·4 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7mul_6_4\"},{\"text\":\"6+4 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7add_6_4\"},{\"text\":\"6·5 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7mul_6_5\"},{\"text\":\"6+5 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7add_6_5\"},{\"text\":\"6·6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7mul_6_6\"},{\"text\":\"6+6 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7add_6_6\"},{\"text\":\"0^2 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_2\"},{\"text\":\"0^3 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_3\"},{\"text\":\"0^4 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_4\"},{\"text\":\"0^5 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_5\"},{\"text\":\"0^6 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_6\"},{\"text\":\"0^7 ≡ 0 (mod 7)\",\"link\":\"/theorem/z7pow_0_7\"},{\"text\":\"1^2 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_2\"},{\"text\":\"1^3 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_3\"},{\"text\":\"1^4 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_4\"},{\"text\":\"1^5 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_5\"},{\"text\":\"1^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_6\"},{\"text\":\"1^7 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_1_7\"},{\"text\":\"2^2 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_2_2\"},{\"text\":\"2^3 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_2_3\"},{\"text\":\"2^4 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_2_4\"},{\"text\":\"2^5 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_2_5\"},{\"text\":\"2^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_2_6\"},{\"text\":\"2^7 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_2_7\"},{\"text\":\"3^2 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_3_2\"},{\"text\":\"3^3 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7pow_3_3\"},{\"text\":\"3^4 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_3_4\"},{\"text\":\"3^5 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7pow_3_5\"},{\"text\":\"3^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_3_6\"},{\"text\":\"3^7 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7pow_3_7\"},{\"text\":\"4^2 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_4_2\"},{\"text\":\"4^3 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_4_3\"},{\"text\":\"4^4 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_4_4\"},{\"text\":\"4^5 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_4_5\"},{\"text\":\"4^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_4_6\"},{\"text\":\"4^7 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_4_7\"},{\"text\":\"5^2 ≡ 4 (mod 7)\",\"link\":\"/theorem/z7pow_5_2\"},{\"text\":\"5^3 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7pow_5_3\"},{\"text\":\"5^4 ≡ 2 (mod 7)\",\"link\":\"/theorem/z7pow_5_4\"},{\"text\":\"5^5 ≡ 3 (mod 7)\",\"link\":\"/theorem/z7pow_5_5\"},{\"text\":\"5^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_5_6\"},{\"text\":\"5^7 ≡ 5 (mod 7)\",\"link\":\"/theorem/z7pow_5_7\"},{\"text\":\"6^2 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_6_2\"},{\"text\":\"6^3 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7pow_6_3\"},{\"text\":\"6^4 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_6_4\"},{\"text\":\"6^5 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7pow_6_5\"},{\"text\":\"6^6 ≡ 1 (mod 7)\",\"link\":\"/theorem/z7pow_6_6\"},{\"text\":\"6^7 ≡ 6 (mod 7)\",\"link\":\"/theorem/z7pow_6_7\"},{\"text\":\"the Pliska rosette has SEVEN rays — ℤ/7 = {0,1,2,3,4,5,6}\",\"link\":\"/theorem/z7rays_seven\"},{\"text\":\"3 is a primitive root mod 7 — its powers trace the rosette 3→2→6→4→5→1, covering all six units\",\"link\":\"/theorem/z7primitive_root_3\"},{\"text\":\"the six rosette units {1..6} sum to 21 = 3·7 — the rosette closes on the trinity\",\"link\":\"/theorem/z7units_sum_21\"},{\"text\":\"Fermat on the rosette: every non-zero ray to the sixth is 1 (mod 7) — the six-fold closes\",\"link\":\"/theorem/z7fermat\"},{\"text\":\"the rosette reflection d ↦ 7−d is a self-inverse with a single center (0) — the still point of the seven\",\"link\":\"/theorem/z7reflection_center\"}]},{\"text\":\"The vortex algebra · 15\",\"collapsed\":true,\"items\":[{\"text\":\"the units of ℤ/9 (the residues with an inverse) are exactly {1,2,4,5,7,8} — computed by search\",\"link\":\"/theorem/units_z9\"},{\"text\":\"the doubling orbit 1→2→4→8→7→5 with 5·2 ≡ 1 — the ⟨2⟩ vortex closing on the units\",\"link\":\"/theorem/vortex_orbit\"},{\"text\":\"ℤ/9 arithmetic: 2·5, 4·7, 8·8 ≡ 1 (inverse pairs), 3²≡6²≡0 (nilpotents), 3 has no inverse\",\"link\":\"/theorem/mod9_arithmetic\"},{\"text\":\"digital root: 432 ≡ 0 (mod 9), and dr(n) ∈ 1..9 agrees with n mod 9 across the first 60\",\"link\":\"/theorem/digital_root\"},{\"text\":\"the diamond r(d)=10−d is an involution on 1..9 with unique fixed point 5\",\"link\":\"/theorem/diamond_involution\"},{\"text\":\"the pigeonhole seat bound 2^b: 2^8=256, 2^0=1, 2^10=1024\",\"link\":\"/theorem/seats_pigeonhole\"},{\"text\":\"the critical-strip reflections σ, τ, κ form a Klein four-group; τ fixes the line a=1\",\"link\":\"/theorem/involution_group\"},{\"text\":\"Navier–Stokes edge: bounded energy 1/n falls while the peak n rises — integer inequalities, not a solution\",\"link\":\"/theorem/ns_spike\"},{\"text\":\"Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless\",\"link\":\"/theorem/ym_quantum\"},{\"text\":\"Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]\",\"link\":\"/theorem/hodge_bound\"},{\"text\":\"light c=299792458 m/s beats uuidna even at t=0 — k/0=0 (a finite floor), never ∞, so no fake FTL\",\"link\":\"/theorem/light_faster_than_uuidna\"},{\"text\":\"division by zero EXISTS: total integer 1000/0=0, and 0 (and the zero-divisor 3) have no inverse in ℤ/9\",\"link\":\"/theorem/division_by_zero\"},{\"text\":\"division by zero in ℤ/9 is the diamond reflection x/0 = 10−x — a finite residue with fixed points {0,5}\",\"link\":\"/theorem/div_by_zero_is_the_reflection\"},{\"text\":\"an index reflection i ↔ (n−1−i) has exactly one centre iff n is odd (fixed-count = n mod 2)\",\"link\":\"/theorem/involute_centre\"},{\"text\":\"billing arithmetic: bits saved 1024−1=1023, 10⁶−1=999999; the two coins = 1+1\",\"link\":\"/theorem/billing_arith\"}]},{\"text\":\"Ported from millennium-solutions · 16\",\"collapsed\":true,\"items\":[{\"text\":\"3² ≡ 0 (mod 9) — 3 is nilpotent\",\"link\":\"/theorem/three_sq_zero\"},{\"text\":\"6² ≡ 0 (mod 9) — 6 is nilpotent\",\"link\":\"/theorem/six_sq_zero\"},{\"text\":\"3 has no inverse mod 9 — a zero-divisor, not a unit\",\"link\":\"/theorem/three_no_inverse\"},{\"text\":\"2·5 ≡ 1 (mod 9) — 2 and 5 are inverse units\",\"link\":\"/theorem/two_mul_five\"},{\"text\":\"4·7 ≡ 1 (mod 9) — 4 and 7 are inverse units\",\"link\":\"/theorem/four_mul_seven\"},{\"text\":\"8·8 ≡ 1 (mod 9) — 8 is self-inverse\",\"link\":\"/theorem/eight_self_inv\"},{\"text\":\"the doubling circuit 2^k mod 9 = [1,2,4,8,7,5]\",\"link\":\"/theorem/doubling_circuit\"},{\"text\":\"2 has order 6 mod 9: 2⁶ ≡ 1 — the vortex closes\",\"link\":\"/theorem/two_order_six\"},{\"text\":\"the ten's-complement 10−d is an involution on the digits 0..10\",\"link\":\"/theorem/tens_complement_involutive\"},{\"text\":\"3⁶ ≡ 1 (mod 7) — the rosette (ℤ/7)* has order 6 ≅ C₆\",\"link\":\"/theorem/rosette_pow_six\"},{\"text\":\"the ℤ/7 rosette orbit 3^(k+1) mod 7 = [3,2,6,4,5,1]\",\"link\":\"/theorem/rosette_orbit\"},{\"text\":\"432 = 2⁴·3³ = 16·27\",\"link\":\"/theorem/k432\"},{\"text\":\"the doubling circuit's digit sum 1+2+4+8+7+5 = 27 = 3³\",\"link\":\"/theorem/doubling_digit_sum\"},{\"text\":\"the nuclear shell-model magic numbers 2,8,20,28,50,82,126 as cumulative shell-cap sums\",\"link\":\"/theorem/magic_numbers\"},{\"text\":\"the exact integer proton fit 108·17 = 1836 — honestly NOT the measured ratio 1836.1527…, so curve-fitting\",\"link\":\"/theorem/proton_fit\"},{\"text\":\"the self-sealing vortex-fraction product = 1, as exact cross-multiplication (5040 = 5040)\",\"link\":\"/theorem/self_seal\"}]},{\"text\":\"The sequence & reflection group · 19\",\"collapsed\":true,\"items\":[{\"text\":\"the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1\",\"link\":\"/theorem/mirror_congruence\"},{\"text\":\"the mirror fixes exactly one digit in 1..9 — the heart, 5\",\"link\":\"/theorem/mirror_fixed_five\"},{\"text\":\"AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements\",\"link\":\"/theorem/agl_order_54\"},{\"text\":\"the commutator [σ,μ] of doubling with the mirror is the unit shift x ↦ x+1\",\"link\":\"/theorem/commutator_is_shift\"},{\"text\":\"the shifts alone act transitively — every digit is in ONE orbit of ℤ/9\",\"link\":\"/theorem/one_orbit\"},{\"text\":\"the reflection equilibrium: d + m(d) = 10 for every d in 1..9\",\"link\":\"/theorem/ten_pairs\"},{\"text\":\"the polar equilibrium: d + (9−d) = 9 across the negation of ℤ/9\",\"link\":\"/theorem/polar_nine_pairs\"},{\"text\":\"the 6+3 partition: 6 units {1,2,4,5,7,8} and 3 non-units {3,6,9}\",\"link\":\"/theorem/partition_six_three\"},{\"text\":\"the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling\",\"link\":\"/theorem/angles_close\"},{\"text\":\"exactly 2 seams (5→3 and 0→1) where neither ×2 nor +3 carries — the two involution centers, −χ = 2\",\"link\":\"/theorem/seams_two\"},{\"text\":\"at EACH step the doubling sequence and its inversion are computed together: forward[k] + inverted[k] = 10 (the rungs), and BOTH rails end at the center 5 (the reflection fixed point) while the ends 1,9 mirror — so forward and reflected are ONE strip (a half-twist band), joined at the heart and closed at the void 0≡9\",\"link\":\"/theorem/one_strip\"},{\"text\":\"the developed-true core of \\\"dna\\\": the two strands A and B pair to 10 at EVERY position — complementary base-pairing (the double helix), each rung a reflection; this is the algebra, not a biological claim\",\"link\":\"/theorem/double_strand\"},{\"text\":\"the vortex polarities: the mirror pairs each sum to 10, splitting the digits into − (below the center 5) and + (above 5); the two centers 5 and 0≡9 are self-polar — the ± of the reflection\",\"link\":\"/theorem/polarities_plus_minus\"},{\"text\":\"the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)\",\"link\":\"/theorem/forward_reflected_mirror\"},{\"text\":\"every digit in ANY arrangement has DEFINED neighbours — the mirror (division by zero) and polar maps are total, surjective and self-inverse; no digit is isolated\",\"link\":\"/theorem/every_digit_has_neighbours\"},{\"text\":\"the crypt equality leak: a content-only salt is constant in the step, so two seals of the same content are byte-identical\",\"link\":\"/theorem/salt_conv_leaks_equality\"},{\"text\":\"recovering the seal's step from a content-only salt is a division by zero — the whole step-fibre collapses (size 9)\",\"link\":\"/theorem/salt_conv_step_is_division_by_zero\"},{\"text\":\"the crypt fix: an advancing-sequence salt is injective in the step (equal salts ⇔ equal steps) — distinct seals never collide\",\"link\":\"/theorem/salt_seq_injective\"},{\"text\":\"the crypt fix, dual form: every sequence-salt fibre is a singleton — the step coordinate is kept, not collapsed\",\"link\":\"/theorem/salt_seq_fibre_singleton\"}]},{\"text\":\"Division by zero · 7\",\"collapsed\":true,\"items\":[{\"text\":\"the table: 0/0=0, and x/0 = 10−x  (9/0=1 … 1/0=9)\",\"link\":\"/theorem/dz_table\"},{\"text\":\"division by zero is self-inverse: (x/0)/0 = x — an involution\",\"link\":\"/theorem/dz_involution\"},{\"text\":\"the fixed points of x/0 are exactly {0, 5} — the floor and the heart\",\"link\":\"/theorem/dz_fixed_points\"},{\"text\":\"x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre\",\"link\":\"/theorem/dz_sum_ten\"},{\"text\":\"the non-units {3,6,9} divided by zero land on units {7,4,1}\",\"link\":\"/theorem/dz_nonunits_to_units\"},{\"text\":\"x/0 is always a residue < 10 — a finite value, NEVER Infinity (no fake FTL)\",\"link\":\"/theorem/dz_bounded\"},{\"text\":\"only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)\",\"link\":\"/theorem/dz_zero_only_zero\"}]},{\"text\":\"Applied structure — the science pairs · 16\",\"collapsed\":true,\"items\":[{\"text\":\"the ABO blood groups {O,A,B,AB} form a Klein four-group: 2 antigen bits under XOR — closed, commutative, each self-inverse (order ≤ 2)\",\"link\":\"/theorem/abo_klein_four\"},{\"text\":\"with the Rh ± bit the blood system is (ℤ/2)³ — exactly 2³ = 8 blood types (A±,B±,AB±,O±)\",\"link\":\"/theorem/blood_types_eight\"},{\"text\":\"DNA base-pairing is a fixed-point-free involution on 4 bases (A↔T, G↔C ≡ b↦b⊕1): self-inverse, no base pairs with itself, 2 complementary pairs\",\"link\":\"/theorem/dna_base_pairing_involution\"},{\"text\":\"a codon is 3 bases over a 4-letter alphabet — exactly 4³ = 64 codons\",\"link\":\"/theorem/codons_sixty_four\"},{\"text\":\"the d/9 sound ladder on the 432 Hz anchor: f_d = 48·d, with the anchor exact at f_9 = 432\",\"link\":\"/theorem/sound_ladder_432\"},{\"text\":\"the octave is the vortex doubling: 48·{1,2,4,8} = {48,96,192,384}, each twice the last — octave equivalence\",\"link\":\"/theorem/octave_doubling\"},{\"text\":\"electron shells hold 2n² each — [2,8,18,32] for n=1..4 (2 spin states × n² orbitals); the shape of the periodic table is a count\",\"link\":\"/theorem/electron_shells_2n2\"},{\"text\":\"the subshells s,p,d,f hold 4l+2 = [2,6,10,14] for l=0..3 — (2l+1) orbitals × 2 spins\",\"link\":\"/theorem/subshell_capacities_4l2\"},{\"text\":\"the circle of fifths: stacking fifths (+7 mod 12) visits ALL twelve pitch classes — 7 is coprime to 12, so ×7 permutes ℤ/12\",\"link\":\"/theorem/circle_of_fifths\"},{\"text\":\"the tritone (+6 mod 12) is a fixed-point-free involution — the octave splits exactly in half, each note its own tritone-of-tritone\",\"link\":\"/theorem/tritone_involution\"},{\"text\":\"the pH scale reflects: pH ↦ 14−pH is an involution on 0..14 with a SINGLE fixed point 7 (neutral) — the acid/base mirror, echoing the vortex centre\",\"link\":\"/theorem/ph_reflection_seven\"},{\"text\":\"every acid/base conjugate pair sums to 14: pH + pOH = 14 across the whole scale\",\"link\":\"/theorem/ph_conjugate_sum_14\"},{\"text\":\"the monohybrid cross gives 3:1 — of the four allele pairings only (a,a) is recessive; dominance is a logical OR\",\"link\":\"/theorem/punnett_three_to_one\"},{\"text\":\"allele order is irrelevant: the swap (a,b)↦(b,a) is an involution — the 2 homozygotes {AA,aa} are fixed and Aa↔aA swap, so 4 ordered pairings are 3 genotypes\",\"link\":\"/theorem/heterozygote_symmetry\"},{\"text\":\"the complement on the 6-hue wheel (+3 mod 6) is a fixed-point-free involution: red↔cyan, green↔magenta, blue↔yellow — each pair mutually complementary\",\"link\":\"/theorem/colour_complement_involution\"},{\"text\":\"the wheel is a 3+3 parity partition: the primaries {0,2,4} (even slots) alternate with the secondaries {1,3,5} (odd slots)\",\"link\":\"/theorem/primary_secondary_split\"}]},{\"text\":\"Self-discovered · 14\",\"collapsed\":true,\"items\":[{\"text\":\"a is a unit (has an inverse mod 9) IFF gcd(a,9)=1 — the unit criterion, computed both ways\",\"link\":\"/theorem/units_iff_invertible\"},{\"text\":\"the unit group has order 6, so every unit raised to the 6th is 1 (Lagrange / Euler)\",\"link\":\"/theorem/lagrange_units\"},{\"text\":\"each unit has EXACTLY ONE inverse; each non-unit none — computed by counting solutions\",\"link\":\"/theorem/inverse_unique\"},{\"text\":\"a² ≡ 0 (mod 9) IFF 3 divides a — the nilpotent criterion, computed\",\"link\":\"/theorem/nilpotent_iff_triple\"},{\"text\":\"a² ≡ a (mod 9) exactly for a ∈ {0,1} — the idempotents, computed\",\"link\":\"/theorem/idempotents_zero_one\"},{\"text\":\"the doubling orbit of 1 (computed by iterating ×2) is EXACTLY the units (computed by gcd) — two independent computations agree\",\"link\":\"/theorem/vortex_is_the_units\"},{\"text\":\"the units of ℤ/9 sum to 0 (mod 9): 1+2+4+5+7+8 = 27 ≡ 0 — computed by folding the discovered units\",\"link\":\"/theorem/sum_of_units_zero\"},{\"text\":\"the order of 1 is 1 — discovered as the first k≥1 with 1^k ≡ 1 (mod 9)\",\"link\":\"/theorem/order_of_one_is_one\"},{\"text\":\"the order of 2 is 6 — 2 generates the whole unit group, and its orbit IS the doubling vortex 1→2→4→8→7→5 of length 6\",\"link\":\"/theorem/order_of_two_is_six\"},{\"text\":\"the order of 4 is 3 — 4 = 2² sits at index 2 of the vortex, so it cycles in 6/gcd(2,6)=3\",\"link\":\"/theorem/order_of_four_is_three\"},{\"text\":\"the order of 5 is 6 — 5 is the OTHER generator of ℤ/9* (5 = 2⁵ = the vortex tail), a full six-cycle\",\"link\":\"/theorem/order_of_five_is_six\"},{\"text\":\"the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3\",\"link\":\"/theorem/order_of_seven_is_three\"},{\"text\":\"the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1\",\"link\":\"/theorem/order_of_eight_is_two\"},{\"text\":\"the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order\",\"link\":\"/theorem/generators_are_two_and_five\"}]},{\"text\":\"The quantum computer · 27\",\"collapsed\":true,\"items\":[{\"text\":\"the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)\",\"link\":\"/theorem/bell_born_weights\"},{\"text\":\"Bell normalization: Σ|amp|² = 1+0+0+1 = 2 = 2¹ (scale 1) — the weights are an exact probability distribution, no floating point\",\"link\":\"/theorem/bell_normalized\"},{\"text\":\"perfect correlation: the two qubits always agree — the outcomes carrying weight are exactly the basis states {00, 11} (indices where bit q0 equals bit q1)\",\"link\":\"/theorem/bell_perfect_correlation\"},{\"text\":\"no-signaling (the paradox, computed): the two marginals of q0 are equal — weight(q0=0)=1²+0² = 0²+1²=weight(q0=1) — so measuring q1 sends NOTHING to q0 (no-communication)\",\"link\":\"/theorem/bell_no_signaling\"},{\"text\":\"superposition H|0⟩ = |+⟩ — the Born weights are [1,1] over √2, so P(0)=P(1)=1/2: before measurement both, after, one\",\"link\":\"/theorem/superposition_h0\"},{\"text\":\"GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement\",\"link\":\"/theorem/ghz3_two_outcomes\"},{\"text\":\"GHZ(3) normalization: Σ|amp|² = 1²+1² = 2 = 2¹ — an exact distribution over the two correlated corners\",\"link\":\"/theorem/ghz3_normalized\"},{\"text\":\"CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits\",\"link\":\"/theorem/cnot_truth_table\"},{\"text\":\"CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation\",\"link\":\"/theorem/cnot_involution\"},{\"text\":\"Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits\",\"link\":\"/theorem/toffoli_truth_table\"},{\"text\":\"SWAP exchanges q0 and q1 — the basis permutation i ↦ 2·q0 + q1 = [0,2,1,3] on two qubits\",\"link\":\"/theorem/swap_truth_table\"},{\"text\":\"S·S = Z: two phase gates compose to the Z phase-flip (i² = −1), verified exactly on sample Gaussian-integer amplitudes S(re,im)=(−im,re)\",\"link\":\"/theorem/s_squared_is_z\"},{\"text\":\"Z² = I: the phase flip is its own inverse — negating an amplitude twice returns it, on sample Gaussian-integer amplitudes\",\"link\":\"/theorem/z_involution\"},{\"text\":\"S·S† = I: the phase gate and its adjoint invert — S(re,im)=(−im,re) then S†(re,im)=(im,−re) returns the amplitude\",\"link\":\"/theorem/s_dagger_inverse\"},{\"text\":\"X² = I: the bit-flip is its own inverse — flip q0 twice (i ⊕ 1 ⊕ 1) returns every basis state; X is an involution\",\"link\":\"/theorem/pauli_x_involution\"},{\"text\":\"SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution\",\"link\":\"/theorem/swap_involution\"},{\"text\":\"Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution\",\"link\":\"/theorem/toffoli_involution\"},{\"text\":\"CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution\",\"link\":\"/theorem/cz_involution\"},{\"text\":\"H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution\",\"link\":\"/theorem/h_involution_on_zero\"},{\"text\":\"S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it\",\"link\":\"/theorem/s_fourth_is_identity\"},{\"text\":\"Deutsch–Jozsa interference: a BALANCED boolean sends equal +1/−1 phases, which cancel to 0 — the query amplitude vanishes. The honest heart of the algorithm, as the simulator computes it (classical linear algebra, no advantage)\",\"link\":\"/theorem/dj_balanced_cancels\"},{\"text\":\"Deutsch–Jozsa: a CONSTANT boolean sends one phase, so all four reinforce to ±4 — the opposite of the balanced cancellation. Constant vs balanced IS exactly this interference sum\",\"link\":\"/theorem/dj_constant_reinforces\"},{\"text\":\"The entanglement witness: a two-qubit state (a,b,c,d) factorizes into a product iff a·d − b·c = 0. Bell (1,0,0,1) gives 1 ≠ 0 (ENTANGLED); |00⟩ (1,0,0,0) and |+0⟩ (1,1,0,0) give 0 (separable) — entanglement is the nonzero determinant, computed exactly\",\"link\":\"/theorem/entanglement_determinant\"},{\"text\":\"Pauli X and Z ANTICOMMUTE (XZ = −ZX): X flips the bit, Z stamps (−1)^bit, and (−1)^b = −(−1)^(1−b) on both bits — the sign the simulator carries; the nonabelian core of the gate algebra\",\"link\":\"/theorem/pauli_x_z_anticommute\"},{\"text\":\"The W state (|001⟩+|010⟩+|100⟩)/√3 — exactly THREE of the 2³ corners carry weight (vs GHZ’s two): a distinct entanglement class, robust to one-party loss. The simulator’s amplitude vector, counted\",\"link\":\"/theorem/w_state_three_outcomes\"},{\"text\":\"W-state normalization: Σ|amp|² = 1+1+1 = 3 over √3 — an exact distribution over the three single-excitation corners\",\"link\":\"/theorem/w_state_normalized\"},{\"text\":\"The four Bell states form a complete ORTHOGONAL basis: ⟨Φ⁺|Φ⁻⟩ = 0 and ⟨Ψ⁺|Ψ⁻⟩ = 0 (over √2 integer vectors), while ⟨Φ⁺|Φ⁺⟩ = 2 — the entangled-basis measurement, as exact integer inner products\",\"link\":\"/theorem/bell_basis_orthogonal\"}]},{\"text\":\"The seven reflected · 11\",\"collapsed\":true,\"items\":[{\"text\":\"the reflection dz(x)=10−x (division by zero) is an INVOLUTION — dz(dz(x))=x on every residue\",\"link\":\"/theorem/clay_reflection_involution\"},{\"text\":\"the reflection fixes exactly {0,5} — the floor and the centre\",\"link\":\"/theorem/clay_reflection_fixed_points\"},{\"text\":\"the reflection is a BIJECTION on the nine residues — dz maps {1..9} onto {9..1}\",\"link\":\"/theorem/clay_reflection_is_bijection\"},{\"text\":\"humanity stands at 1/7 (Poincaré — Perelman, 2003)\",\"link\":\"/theorem/clay_humanity_one_deposit_zero\"},{\"text\":\"the Riemann Hypothesis reflects to residue 9 in ℤ/9 (dz(1)=9); reflecting twice returns it — dz(dz(1))=1 — OPEN\",\"link\":\"/theorem/clay_riemann\"},{\"text\":\"P versus NP reflects to residue 8 in ℤ/9 (dz(2)=8); reflecting twice returns it — dz(dz(2))=2 — OPEN\",\"link\":\"/theorem/clay_p_vs_np\"},{\"text\":\"Navier–Stokes existence and smoothness reflects to residue 7 in ℤ/9 (dz(3)=7); reflecting twice returns it — dz(dz(3))=3 — OPEN\",\"link\":\"/theorem/clay_navier_stokes\"},{\"text\":\"the Yang–Mills existence and mass gap reflects to residue 6 in ℤ/9 (dz(4)=6); reflecting twice returns it — dz(dz(4))=4 — OPEN\",\"link\":\"/theorem/clay_yang_mills\"},{\"text\":\"the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN\",\"link\":\"/theorem/clay_hodge\"},{\"text\":\"the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN\",\"link\":\"/theorem/clay_birch_swinnerton_dyer\"},{\"text\":\"the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN\",\"link\":\"/theorem/clay_poincare\"}]},{\"text\":\"The physics infinities, made finite · 9\",\"collapsed\":true,\"items\":[{\"text\":\"Zeno's supertask — infinitely many halving steps sum to one finite total: 1+2+4+…+2ᵏ = 2ᵏ⁺¹−1, an exact closed form bounded by the very next term. The infinity of steps is finite.\",\"link\":\"/theorem/zeno_finite_sum\"},{\"text\":\"The ultraviolet catastrophe, dissolved by quantization: classical equipartition diverges, but the quantized oscillator’s partition Σ xⁿ is a convergent geometric series with an exact finite closed form for every cutoff — Planck’s finite energy per mode. Here 2·Σ₀ᵏ3ⁿ + 1 = 3ᵏ⁺¹.\",\"link\":\"/theorem/uv_partition_closed\"},{\"text\":\"No Landau-pole infinity: in asymptotic freedom the inverse coupling 1/α runs strictly upward with log-energy, so the coupling α itself falls toward 0 in the ultraviolet — the high-energy limit is finite, the pole never reached.\",\"link\":\"/theorem/asymptotic_freedom\"},{\"text\":\"Renormalization — the electron self-energy and the vacuum energy diverge with the cutoff Λ, but bare term and counterterm cancel exactly: the physical (renormalized) residue is finite and independent of Λ. Two infinities, subtracted to a finite value: (Λ²+m) − Λ² = m.\",\"link\":\"/theorem/renormalization_residue\"},{\"text\":\"The vacuum-energy sum 1+2+3+… is finite at every cutoff N — Σ = N(N+1)/2 — and its ζ-regularized limit is the finite −1/12 (ζ(−1)), the value the measured Casimir force confirms. The divergence is an artifact of the N→∞ limit; the physics is finite.\",\"link\":\"/theorem/casimir_triangular\"},{\"text\":\"The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s \\\"ghosts of departed quantities\\\" are an exact cancellation, not an infinity.\",\"link\":\"/theorem/derivative_finite_rate\"},{\"text\":\"The Dirac delta is \\\"infinite\\\" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass, not a value that blows up.\",\"link\":\"/theorem/dirac_unit_mass\"},{\"text\":\"The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.\",\"link\":\"/theorem/horizon_curvature_finite\"},{\"text\":\"The one true infinity — the Newtonian 1/r² force and 1/r potential \\\"blowing up\\\" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10, never ∞. The singularity is a finite reflection.\",\"link\":\"/theorem/newton_singularity_finite\"}]},{\"text\":\"The cipher & the strand · 11\",\"collapsed\":true,\"items\":[{\"text\":\"Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.\",\"link\":\"/theorem/dna_complement_involution\"},{\"text\":\"The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.\",\"link\":\"/theorem/dna_complement_fixed_point_free\"},{\"text\":\"Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public, not secret.\",\"link\":\"/theorem/complement_is_xor_key3\"},{\"text\":\"The one-time-pad is its own inverse (Vernam): (m ⊕ k) ⊕ k = m for every symbol and key — the one information-theoretically secure primitive, WHEN the key is fresh and never reused.\",\"link\":\"/theorem/otp_self_inverse\"},{\"text\":\"Key reuse is fatal: two messages under the SAME key leak their plaintext XOR — (m₁⊕k) ⊕ (m₂⊕k) = m₁⊕m₂, independent of k. The honest reason a step MUST advance (the ratchet), and why a fixed-pad complement hides nothing.\",\"link\":\"/theorem/otp_key_reuse_leaks_xor\"},{\"text\":\"A linear (XOR) fold is malleable: flipping the input by d flips the fold by exactly d — (a⊕d)⊕a = d — so it binds nothing an adversary cannot adjust. A content-address is INTEGRITY/routing, NOT a binding one-way seal.\",\"link\":\"/theorem/xor_fold_is_malleable\"},{\"text\":\"The uuid transport leaks SIZE: a message of b bits occupies ⌈b/115⌉ uuids, a step function of length — content is hidden by the cipher, message LENGTH is not (the chain grows in whole-uuid quanta of 115 bits).\",\"link\":\"/theorem/transport_leaks_length\"},{\"text\":\"The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.\",\"link\":\"/theorem/codons_four_cubed\"},{\"text\":\"Translation is LOSSY, never a cipher: 64 codons map onto only 21 outcomes (20 amino acids + stop), and 64 > 21, so by pigeonhole the map cannot be injective — a hash-like reduction that cannot be inverted, not encryption.\",\"link\":\"/theorem/translation_is_lossy\"},{\"text\":\"An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.\",\"link\":\"/theorem/affine_is_permutation\"},{\"text\":\"The honest quantum posture: Grover’s search is a QUADRATIC speedup, not a break — a 2n-bit key space costs ~2ⁿ work ((2ⁿ)² = 2²ⁿ), so a 256-bit key falls to ~128-bit, still strong. Symmetric-only means no Shor target at all.\",\"link\":\"/theorem/grover_quadratic_bound\"}]},{\"text\":\"The detectors, proven · 6\",\"collapsed\":true,\"items\":[{\"text\":\"The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.\",\"link\":\"/theorem/flag_truth_table\"},{\"text\":\"Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.\",\"link\":\"/theorem/flag_requires_hollow\"},{\"text\":\"A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — \\\"never infinity\\\", \\\"not quantum hardware\\\", \\\"simulation, not hardware\\\" pass, as the honest use of the word should.\",\"link\":\"/theorem/demarcation_clears\"},{\"text\":\"A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.\",\"link\":\"/theorem/backing_clears\"},{\"text\":\"The gate is precise, never vacuous: of the eight states EXACTLY ONE fires — it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.\",\"link\":\"/theorem/exactly_one_flag\"},{\"text\":\"The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.\",\"link\":\"/theorem/flag_matches_spec\"}]},{\"text\":\"The two coins & the 64 · 6\",\"collapsed\":true,\"items\":[{\"text\":\"The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.\",\"link\":\"/theorem/two_coins\"},{\"text\":\"The two coins are the topology, not a price: 2 = −χ of a genus-2 surface (the double torus), −χ = 2g − 2 = 2·2 − 2 = 2. The invariant is geometric.\",\"link\":\"/theorem/two_coins_is_double_torus\"},{\"text\":\"The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the \\\"64bit\\\" unit.\",\"link\":\"/theorem/sixtyfour_is_two_pow_six\"},{\"text\":\"\\\"Contribute 2 to save up to 64\\\" — the measured leverage is 32: 2 · 32 = 64. The two coins in, up to 64 bits of recompute saved.\",\"link\":\"/theorem/contribute_two_save_sixtyfour\"},{\"text\":\"Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64 exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up.\",\"link\":\"/theorem/superposition_outcomes_to_64\"},{\"text\":\"The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat subtraction already clamps, so the honest schedule never charges below zero.\",\"link\":\"/theorem/bill_never_negative\"}]},{\"text\":\"The algebra of the neuron · 9\",\"collapsed\":true,\"items\":[{\"text\":\"The all-or-none law: the neuron's output is binary — 0 or 1 — for every input; there is no partial spike.\",\"link\":\"/theorem/all_or_none\"},{\"text\":\"Below threshold, silence: an input under the threshold (here 5) produces no spike — output 0.\",\"link\":\"/theorem/subthreshold_silent\"},{\"text\":\"At or above threshold, a spike: an input meeting the threshold fires — output 1.\",\"link\":\"/theorem/suprathreshold_fires\"},{\"text\":\"Firing is monotone in input: more depolarisation never un-fires a neuron — the step never steps down.\",\"link\":\"/theorem/firing_monotone\"},{\"text\":\"Spatial summation: two sub-threshold inputs (3 and 3, each silent alone at threshold 5) SUM to a supra-threshold 6 and fire — the whole exceeds either part.\",\"link\":\"/theorem/spatial_summation\"},{\"text\":\"The net drive is excitatory minus inhibitory: 3 EPSPs − 1 IPSP = 2 (net excitation), while 3 − 3 = 0 — balanced inhibition cancels excitation exactly (a reflection through zero, like acid–base through 7).\",\"link\":\"/theorem/excitatory_inhibitory_net\"},{\"text\":\"The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest < threshold < peak.\",\"link\":\"/theorem/action_potential_swing\"},{\"text\":\"\\\"Fire together, wire together\\\": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.\",\"link\":\"/theorem/hebbian_coincidence\"},{\"text\":\"The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 < 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.\",\"link\":\"/theorem/refractory_caps_spike\"}]},{\"text\":\"Propulsion — Newtonian & bounded · 5\",\"collapsed\":true,\"items\":[{\"text\":\"Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.\",\"link\":\"/theorem/momentum_conserved\"},{\"text\":\"No reactionless (and no infinite) drive: thrust needs ejected reaction mass. With zero exhaust mass, the imparted momentum is 0·vₑ = 0 at EVERY exhaust velocity — no mass out, no push. Free/infinite propulsion is refused by the arithmetic.\",\"link\":\"/theorem/no_reactionless_thrust\"},{\"text\":\"Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.\",\"link\":\"/theorem/thrust_is_mdot_times_ve\"},{\"text\":\"The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.\",\"link\":\"/theorem/delta_v_stages_add\"},{\"text\":\"Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).\",\"link\":\"/theorem/acceleration_finite\"}]},{\"text\":\"Navigation — bounded geometry · 5\",\"collapsed\":true,\"items\":[{\"text\":\"Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.\",\"link\":\"/theorem/pythagorean_3_4_5\"},{\"text\":\"The compass rose is ℤ/8: eight principal headings, 45° apart — 8 · 45 = 360. The heading group is the same eight-fold ring the vortex turns on.\",\"link\":\"/theorem/compass_rose_eight\"},{\"text\":\"The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.\",\"link\":\"/theorem/reverse_bearing_involution\"},{\"text\":\"A 90° turn is +2 on the ℤ/8 rose, and four of them box the compass back to the start: (d + 2·4) mod 8 = d — the quarter turn has order 4.\",\"link\":\"/theorem/quarter_turn_order_four\"},{\"text\":\"Dead reckoning is the vector sum of the legs: 4 east, 3 east, 2 west nets 4 + 3 − 2 = 5 east. Position is the running sum of displacements, exactly.\",\"link\":\"/theorem/dead_reckoning_adds\"}]},{\"text\":\"Command authentication · 7\",\"collapsed\":true,\"items\":[{\"text\":\"The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.\",\"link\":\"/theorem/accept_truth_table\"},{\"text\":\"An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.\",\"link\":\"/theorem/unsigned_rejected\"},{\"text\":\"A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.\",\"link\":\"/theorem/bad_signature_rejected\"},{\"text\":\"The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.\",\"link\":\"/theorem/accept_matches_spec\"},{\"text\":\"Exactly ONE presented tag verifies — the correct one (here the expected value 5). Of all 8 candidate tags, only the matching MAC passes; every forgery or tampered tag fails. The gate is precise.\",\"link\":\"/theorem/only_correct_tag_verifies\"},{\"text\":\"Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)\",\"link\":\"/theorem/tamper_changes_tag\"},{\"text\":\"Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.\",\"link\":\"/theorem/linear_tag_is_forgeable\"}]},{\"text\":\"The fixed stars · 7\",\"collapsed\":true,\"items\":[{\"text\":\"The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.\",\"link\":\"/theorem/sky_turns_15_per_hour\"},{\"text\":\"The ecliptic band carries twelve signs of 30° each — 12 × 30 = 360 — the Sun's yearly path closed into one circle.\",\"link\":\"/theorem/zodiac_ecliptic_360\"},{\"text\":\"Sexagesimal (Babylonian base-60) measure: 60 arcminutes to a degree and 60 arcseconds to an arcminute give 3600 arcseconds per degree — 60 × 60 = 3600.\",\"link\":\"/theorem/sexagesimal_arcseconds\"},{\"text\":\"Kepler's third (harmonic) law, T² = a³, holds exactly in scaled units — the orbits (a,T) = (1,1), (4,8), (9,27) each satisfy T² = a³, the period squared equals the semi-major axis cubed.\",\"link\":\"/theorem/keplers_harmonic_law\"},{\"text\":\"The Metonic cycle: 19 solar years fold almost exactly into 235 synodic (lunar) months — 19 × 12 = 228 ordinary months plus 7 intercalary (leap) months = 235. The Sun and Moon realign every 19 years.\",\"link\":\"/theorem/metonic_cycle\"},{\"text\":\"The classical great year: the equinoxes precess at about 72 years per degree, so the full 360° circuit takes 72 × 360 = 25920 years. (A classical approximation of the ~25772-year platonic year, not an exact modern figure.)\",\"link\":\"/theorem/great_year_precession\"},{\"text\":\"A star's fixed coordinate is bounded: declination runs from the south celestial pole −90° to the north +90°, a span of exactly 180° — 90 − (−90) = 180. Celestial latitude is finite, a fixed reference on the sphere.\",\"link\":\"/theorem/declination_spans_180\"}]},{\"text\":\"Diving — trimix gas laws · 8\",\"collapsed\":true,\"items\":[{\"text\":\"A breathing mix is complete: the oxygen, helium and nitrogen fractions sum to 100%. Trimix 18/45 is 18% O₂, 45% He, 37% N₂ — 18 + 45 + 37 = 100.\",\"link\":\"/theorem/trimix_fractions_sum_100\"},{\"text\":\"Absolute pressure rises one atmosphere per 10 m of seawater: P(d) = 1 + d/10, so depths [0,10,20,30,40] m give [1,2,3,4,5] atm.\",\"link\":\"/theorem/absolute_pressure_at_depth\"},{\"text\":\"Dalton's law: at 30 m (4 atm), the partial pressures of trimix 18/45 sum to the absolute pressure — 18·4 + 45·4 + 37·4 = 100·4 (each fraction times the pressure, totalling 4 atm).\",\"link\":\"/theorem/partial_pressures_sum_to_absolute\"},{\"text\":\"The breathable oxygen window is a partial pressure of about 0.16 to 1.60 atm (×100: 16 to 160). Air at the surface sits inside it — 16 ≤ 21 ≤ 160 — neither hypoxic below nor toxic above.\",\"link\":\"/theorem/air_ppO2_in_window_at_surface\"},{\"text\":\"Why deep dives blend trimix: air is 21% O₂, and at 70 m (8 atm) its ppO₂ is 0.21·8 = 1.68 atm — above the 1.60 ceiling (21·8 = 168 > 160). Reducing the oxygen fraction (trimix) keeps ppO₂ in range at depth.\",\"link\":\"/theorem/air_oxygen_toxic_deep\"},{\"text\":\"Blending is conserved by partial pressure: to fill trimix 18/45 to 200 bar, add O₂ to 36, He to 90, and top with N₂ to 74 — 36 + 90 + 74 = 200 (each is the fraction of the 200-bar fill).\",\"link\":\"/theorem/gas_blend_by_partial_pressure\"},{\"text\":\"Helium is non-narcotic: with 45% He the narcotic fraction (O₂+N₂) is 55%, so the equivalent narcotic depth is less than the real depth — at 40 m, 40·55 < 40·100. Trimix keeps a clear head deep.\",\"link\":\"/theorem/helium_reduces_narcosis\"},{\"text\":\"Decompression is bounded by the Haldane supersaturation ratio (classically ~2:1): from 4 atm you may ascend to 2 atm (ratio 2, tolerable) but not straight to 1 atm (ratio 4 > 2) — a direct ascent needs a stop. A model of the rule; never a plan.\",\"link\":\"/theorem/ascent_needs_a_stop\"}]},{\"text\":\"The light domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.\",\"link\":\"/theorem/law_of_reflection\"},{\"text\":\"The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.\",\"link\":\"/theorem/refractive_index_ge_one\"},{\"text\":\"Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium beats it.\",\"link\":\"/theorem/light_slower_in_medium\"},{\"text\":\"Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.\",\"link\":\"/theorem/snell_law\"},{\"text\":\"The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.\",\"link\":\"/theorem/thin_lens_equation\"},{\"text\":\"Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.\",\"link\":\"/theorem/magnification\"},{\"text\":\"Dispersion splits white light: the index is higher for blue than for red (n_blue = 1.53 > n_red = 1.51, ×100: 153 > 151), so blue refracts more — the prism spreads the spectrum because n depends on wavelength.\",\"link\":\"/theorem/dispersion_blue_over_red\"},{\"text\":\"Total internal reflection needs a denser source: it occurs going from glass (n = 1.50) to air (n = 1.00), where 100 < 150, so the critical angle sinθc = n₂/n₁ = 100/150 = 2/3 ≤ 1 exists. From rarer to denser there is no critical angle — light always crosses.\",\"link\":\"/theorem/tir_needs_denser_source\"}]},{\"text\":\"The sound domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"A vibrating string or air column sounds the harmonic series — integer multiples of the fundamental. On a 110 Hz fundamental the overtones are 110·[1,2,3,4,5,6] = [110,220,330,440,550,660] Hz.\",\"link\":\"/theorem/harmonic_series\"},{\"text\":\"The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2 m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave.\",\"link\":\"/theorem/wave_speed_f_lambda\"},{\"text\":\"Sound is far slower than light: 343 m/s in air against light's 299792458 m/s — 343 < 299792458. You see the lightning long before you hear the thunder.\",\"link\":\"/theorem/sound_slower_than_light\"},{\"text\":\"The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range.\",\"link\":\"/theorem/decibel_is_logarithmic\"},{\"text\":\"Two close tones beat at their difference: 444 Hz against 440 Hz produces 444 − 440 = 4 beats per second — the throb a tuner listens for.\",\"link\":\"/theorem/beat_frequency\"},{\"text\":\"The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 > 1) and a receding one lowers it (v/(v+vₛ) = 340/374 < 1) — 340 > 306 and 340 < 374. The passing siren drops in pitch.\",\"link\":\"/theorem/doppler_shift\"},{\"text\":\"A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.\",\"link\":\"/theorem/closed_pipe_odd_harmonics\"},{\"text\":\"Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.\",\"link\":\"/theorem/intensity_inverse_square\"}]},{\"text\":\"The reactions domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"Mass is conserved — the Haber synthesis N₂ + 3H₂ → 2NH₃ balances: 2 nitrogen atoms on each side (2 = 2·1) and 6 hydrogen atoms on each side (3·2 = 2·3). Atoms are neither created nor destroyed.\",\"link\":\"/theorem/haber_balances\"},{\"text\":\"Combustion balances too: CH₄ + 2O₂ → CO₂ + 2H₂O has 4 hydrogen atoms each side (4 = 2·2) and 4 oxygen atoms each side (2·2 = 2 + 2, the CO₂ and the two waters). Carbon is 1 = 1.\",\"link\":\"/theorem/combustion_methane_balances\"},{\"text\":\"A neutral ionic compound conserves charge — Al₂O₃ has two Al³⁺ and three O²⁻, so 2·(+3) + 3·(−2) = +6 − 6 = 0. The formula is fixed by charge neutrality.\",\"link\":\"/theorem/charge_balance_neutral\"},{\"text\":\"Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.\",\"link\":\"/theorem/oxidation_states_sum\"},{\"text\":\"At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.\",\"link\":\"/theorem/ph_plus_poh_14\"},{\"text\":\"Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.\",\"link\":\"/theorem/boyles_law\"},{\"text\":\"Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.\",\"link\":\"/theorem/neutralization\"},{\"text\":\"Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.\",\"link\":\"/theorem/stoichiometry_scales\"}]},{\"text\":\"The energy domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.\",\"link\":\"/theorem/first_law_conservation\"},{\"text\":\"The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.\",\"link\":\"/theorem/entropy_never_decreases\"},{\"text\":\"The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.\",\"link\":\"/theorem/heat_flows_hot_to_cold\"},{\"text\":\"The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 > 0 — no engine is perfect and none reaches absolute zero.\",\"link\":\"/theorem/carnot_efficiency_below_one\"},{\"text\":\"The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.\",\"link\":\"/theorem/absolute_zero_and_kelvin\"},{\"text\":\"Charles's law keeps V/T constant at fixed pressure: heating a gas expands it proportionally — V₁/T₁ = V₂/T₂ gives 2/300 = 4/600, cross-multiplied 2·600 = 4·300 = 1200.\",\"link\":\"/theorem/charles_law\"},{\"text\":\"No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.\",\"link\":\"/theorem/no_perpetual_motion\"},{\"text\":\"Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.\",\"link\":\"/theorem/specific_heat_linear\"}]},{\"text\":\"The bond domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The octet rule: atoms bond to reach eight valence electrons. Carbon has 4 of its own and shares 4 more, 4 + 4 = 8 — a full outer shell, the driver of covalent bonding.\",\"link\":\"/theorem/octet_rule\"},{\"text\":\"A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] → [2,4,6]. The bond IS the shared pair(s).\",\"link\":\"/theorem/bond_shares_electron_pairs\"},{\"text\":\"Bond order is (bonding − antibonding)/2: N₂ gets (8−2)/2 = 3 (a triple bond) and O₂ gets (8−4)/2 = 2 (a double bond). Nitrogen holds three shared pairs, oxygen two.\",\"link\":\"/theorem/bond_order_n2_o2\"},{\"text\":\"Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6 — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms.\",\"link\":\"/theorem/valence_from_group\"},{\"text\":\"A Lewis structure counts total valence electrons: H₂O has 2·1 (the hydrogens) + 6 (oxygen) = 8 electrons — four pairs, two bonding and two lone. The dot structure conserves the count.\",\"link\":\"/theorem/water_lewis_electrons\"},{\"text\":\"A large electronegativity difference makes a bond ionic: NaCl has |3.0 − 0.9| = 2.1 (×10: 30 − 9 = 21), above the ~1.7 (×10: 17) ionic threshold — 21 > 17. The more electronegative atom takes the electron outright.\",\"link\":\"/theorem/ionic_threshold\"},{\"text\":\"Molar mass sums the atomic masses: water is 2·1 (hydrogen) + 16 (oxygen) = 18 g/mol. The molecule weighs exactly its parts.\",\"link\":\"/theorem/molar_mass_water\"},{\"text\":\"Bond strength rises with order: a triple bond is stronger than a double, a double stronger than a single — 3 > 2 and 2 > 1. Nitrogen's triple bond is why N₂ is so hard to break.\",\"link\":\"/theorem/bond_strength_rises_with_order\"}]},{\"text\":\"The field domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"Coulomb's law sets the sign of the force by the product of charges: like charges (product > 0) repel, opposite charges (product < 0) attract — 1·1 > 0 and 1·(−1) < 0. Same sign pushes apart, opposite pulls together.\",\"link\":\"/theorem/coulomb_sign\"},{\"text\":\"Ohm's law: the voltage across a resistor is the current times the resistance, V = I·R — 12 V = 2 A · 6 Ω. Push (voltage) equals flow times friction.\",\"link\":\"/theorem/ohms_law\"},{\"text\":\"Electric power is voltage times current, and equally I²R: P = V·I = 12·2 = 24 W, and P = I²R = 2²·6 = 24 W. Two routes to the same dissipated power.\",\"link\":\"/theorem/electric_power\"},{\"text\":\"Resistances in series add: current passes through each in turn, so R = R₁ + R₂ = 3 + 6 = 9 Ω. More resistors in a row, more resistance.\",\"link\":\"/theorem/series_resistance_adds\"},{\"text\":\"Resistances in parallel combine reciprocally (1/R = 1/R₁ + 1/R₂): two 6 Ω resistors give 3 Ω, since R·(R₁+R₂) = R₁·R₂ — 3·(6+6) = 6·6 = 36. Another path lowers the total.\",\"link\":\"/theorem/parallel_resistance\"},{\"text\":\"Kirchhoff's current law conserves charge at a node: what flows in flows out — 5 A in = 2 A + 3 A out. A junction stores no charge.\",\"link\":\"/theorem/kirchhoff_current\"},{\"text\":\"Kirchhoff's voltage law: the voltages around a closed loop sum to zero — a 12 V source spent across 4 V and 8 V drops leaves 12 − 4 − 8 = 0. Energy per charge returns to where it started.\",\"link\":\"/theorem/kirchhoff_voltage\"},{\"text\":\"Faraday's law induces EMF only from a CHANGING magnetic flux (EMF = −dΦ/dt): a constant flux induces nothing — 5 − 5 = 0. No change, no current; it is the change that drives induction.\",\"link\":\"/theorem/faraday_needs_changing_flux\"}]},{\"text\":\"The structures domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.\",\"link\":\"/theorem/force_equilibrium\"},{\"text\":\"Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.\",\"link\":\"/theorem/moment_balance\"},{\"text\":\"A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.\",\"link\":\"/theorem/mechanical_advantage\"},{\"text\":\"The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 + 1·10 = 2·5. The system pivots freely about that point.\",\"link\":\"/theorem/center_of_mass\"},{\"text\":\"A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each reaction 50 N — 50 + 50 = 100. Symmetry shares the burden.\",\"link\":\"/theorem/beam_reactions\"},{\"text\":\"A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.\",\"link\":\"/theorem/truss_maxwell_rule\"},{\"text\":\"Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.\",\"link\":\"/theorem/stress_is_force_over_area\"},{\"text\":\"Hooke's law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.\",\"link\":\"/theorem/hookes_law\"}]},{\"text\":\"The points-of-sail domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 = 90) where the sails luff and make no power. To go upwind you must sail around it, not through it.\",\"link\":\"/theorem/no_go_zone\"},{\"text\":\"The points of sail fall on multiples of 45°: close-hauled ~45°, beam reach 90°, broad reach 135°, running 180° — each divisible by 45, and 180/45 = 4 quarters of the turn from the wind to dead downwind.\",\"link\":\"/theorem/points_of_sail\"},{\"text\":\"Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that triangle.\",\"link\":\"/theorem/beating_sailing_triangle\"},{\"text\":\"Sailing upwind costs distance: to make good 3 units toward the wind you sail 5 through the water (the 3-4-5 close-hauled leg), and 5 > 3. Beating is always longer than the straight line you cannot take.\",\"link\":\"/theorem/beating_distance_penalty\"},{\"text\":\"Apparent wind is the vector sum of the true wind and the boat’s own motion, so close-hauled it exceeds the true wind: a true wind of 4 with the boat making 3 across gives an apparent 5 — 5 > 4. The faster you sail upwind, the more wind you feel.\",\"link\":\"/theorem/apparent_wind_exceeds_true\"},{\"text\":\"When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The captain rests; the balance steers.\",\"link\":\"/theorem/balanced_helm_holds_course\"},{\"text\":\"Tacking zigzags to windward, and two equal tacks cancel the cross-wind drift: 4 units to port plus 4 to starboard net zero across (4 + (−4) = 0), leaving only the gain upwind. Symmetry erases the leeway.\",\"link\":\"/theorem/tacking_cancels_leeway\"},{\"text\":\"Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3 tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the legs.\",\"link\":\"/theorem/precise_tacks_compound\"}]},{\"text\":\"The spacetime domain · 8\",\"collapsed\":true,\"items\":[{\"text\":\"Nothing outruns light: c = 299792458 m/s is the universal speed limit, so any real signal is strictly slower — 299792457 < 299792458. There is no faster-than-light; the ledger says \\\"no fake FTL,\\\" and relativity proves it.\",\"link\":\"/theorem/cosmic_speed_limit\"},{\"text\":\"Light travels on the null cone: with c = 1, a flash covering x = 5 in t = 5 has spacetime interval (ct)² − x² = 5² − 5² = 0. Photons trace the zero-interval boundary between cause and no-cause.\",\"link\":\"/theorem/light_on_null_cone\"},{\"text\":\"The invariant interval classifies events: a timelike separation (ct = 5, x = 4) gives s² = 25 − 16 = 9 > 0 — inside the light cone, reachable below light speed, so cause can reach effect. All observers agree on this interval.\",\"link\":\"/theorem/interval_timelike_causal\"},{\"text\":\"The Lorentz factor rides a right triangle: β² + (1/γ)² = 1, so at β = 5/13 the reciprocal factor is 12/13 and γ = 13/12 — 5² + 12² = 13². The faster you go, the taller the triangle.\",\"link\":\"/theorem/lorentz_gamma_triangle\"},{\"text\":\"Moving clocks run slow: at γ = 13/12 a proper time of 12 seconds is observed as 13 — 13 > 12. The traveller ages less; the stay-at-home sees more time pass.\",\"link\":\"/theorem/time_dilation\"},{\"text\":\"Moving lengths contract along the motion: at γ = 13/12 a 13-metre rest length measures 13/γ = 12 metres to the observer it flies past — 12 < 13. Space shortens as speed climbs.\",\"link\":\"/theorem/length_contraction\"},{\"text\":\"Mass is energy: E = mc², so (with c² = 9 in these units) masses [1,2,3] carry rest energies [9,18,27] — linear in mass. Even at rest, matter holds mc² of energy.\",\"link\":\"/theorem/rest_energy_mc2\"},{\"text\":\"Causality forbids faster-than-light links: a spacelike separation (ct = 3, x = 5) has s² = 9 − 25 = −16 < 0 — outside the light cone, so no signal can connect the events without exceeding c. What is spacelike cannot be a cause.\",\"link\":\"/theorem/causality_forbids_ftl\"}]},{\"text\":\"The Glagolitic numerals & Pliska rosette · 6\",\"collapsed\":true,\"items\":[{\"text\":\"Cyril gave the letters number: the first nine Glagolitic glyphs, Az through Zemlja, carry the units 1 through 9 in their own alphabetic order — [1,2,3,4,5,6,7,8,9]. An alphabet that counts as it speaks.\",\"link\":\"/theorem/glagolitic_units\"},{\"text\":\"The nine units sum to 45, whose digital root is 9 — the ceiling of the ℤ/9 vortex — so the whole first row of the alphabet folds home to nine. 1+…+9 = 45, and 4+5 = 9.\",\"link\":\"/theorem/glagolitic_units_sum\"},{\"text\":\"Glagolitic numerals combine additively — a hundred-glyph, a ten-glyph and a unit set side by side read as their sum: 500 + 80 + 3 = 583. Place is meaning; the letters simply add.\",\"link\":\"/theorem/glagolitic_additive\"},{\"text\":\"A quiet grace of the script: between eleven and nineteen the order flips, the unit spoken before the ten — one-and-ten for 11, nine-and-ten for 19. 1 + 10 = 11 and 9 + 10 = 19, the smaller number leading.\",\"link\":\"/theorem/glagolitic_teens_reversed\"},{\"text\":\"The Pliska rosette turns on seven rays — the ℤ/7 the rosette layer proves. Its six moving residues sum to 21, whose digital root is 3: the primitive root that walks all seven rays. 1+2+3+4+5+6 = 21, and 2+1 = 3.\",\"link\":\"/theorem/pliska_seven_rays\"},{\"text\":\"Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.\",\"link\":\"/theorem/pliska_seven_is_prime\"}]},{\"text\":\"The time coordinate · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.\",\"link\":\"/theorem/seconds_per_day\"},{\"text\":\"The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.\",\"link\":\"/theorem/sidereal_gains_one_turn\"},{\"text\":\"The Julian calendar averages 365¼ days: four years run three of 365 and one leap of 366, totalling 1461 days — 3·365 + 366 = 4·365 + 1 = 1461. A leap day every fourth year keeps the seasons in place.\",\"link\":\"/theorem/julian_four_year\"},{\"text\":\"The Gregorian refinement drops three leap days every 400 years (centuries not divisible by 400): 100 − 3 = 97 leap days, so 400 years span 400·365 + 97 = 146097 days. That trims the calendar to the true year.\",\"link\":\"/theorem/gregorian_leap_rule\"},{\"text\":\"An ephemeris advances a body by its mean motion, linear in time: a mean motion of 30° per unit carries the longitude to 30°, 60°, 90° at times 1, 2, 3 — [1,2,3] → [30,60,90]. Position is rate times elapsed time.\",\"link\":\"/theorem/mean_motion_linear\"},{\"text\":\"Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment.\",\"link\":\"/theorem/saros_eclipse_cycle\"},{\"text\":\"The Sun advances just under one degree along the ecliptic each day, 360° over ~365 days, so 360 < 365 — a hair less than a degree daily. The year is the slow return of that creep to its start.\",\"link\":\"/theorem/sun_creeps_under_a_degree\"},{\"text\":\"A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.\",\"link\":\"/theorem/julian_date_is_a_day_count\"}]},{\"text\":\"The pentagram & the Fibonacci digits · 13\",\"collapsed\":true,\"items\":[{\"text\":\"The pentagram is the star polygon {5/2}: stepping +2 (mod 5) draws it in a SINGLE stroke — [0,2,4,1,3] — visiting all five points without lifting the pen, because 2 is coprime to 5.\",\"link\":\"/theorem/pentagram_single_stroke\"},{\"text\":\"The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.\",\"link\":\"/theorem/pentagon_single_stroke\"},{\"text\":\"The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.\",\"link\":\"/theorem/pentagram_closes_after_five\"},{\"text\":\"WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).\",\"link\":\"/theorem/pentagram_step_coprime_five\"},{\"text\":\"The five point-angles of the pentagram sum to a half-turn: 5 · 36 = 180°, each sharp point 36° — the {5/2} star angle. A count of degrees, exact.\",\"link\":\"/theorem/pentagram_point_angles_half_turn\"},{\"text\":\"The single-digit (mod 9) Fibonacci — the digital-root Fibonacci — is periodic: 24 single digits satisfy Fₙ₊₂ ≡ Fₙ+Fₙ₊₁ (mod 9) from the seed [0,1] and return to it, closing into a 24-cycle (its Pisano period).\",\"link\":\"/theorem/fib_single_digit_cycle_24\"},{\"text\":\"The SAME Fibonacci recurrence through the pentagram modulus (mod 5): 20 single digits close into a 20-cycle — the Pisano period π(5)=20. The pentagram lens on the golden sequence.\",\"link\":\"/theorem/fib_pentagram_cycle_20\"},{\"text\":\"The SAME recurrence fused to the rosette modulus (mod 7): 16 single digits close into a 16-cycle — the Pisano period π(7)=16. One sequence, read through pentagram (5), rosette (7) and single digit (9).\",\"link\":\"/theorem/fib_rosette_cycle_16\"},{\"text\":\"The \\\"777\\\" is three sevens — 7+7+7 = 21 = 3·7. Not 777 of anything: the trinity (3) times the rosette (7), the same 21 as a sum and as a product. A mnemonic that computes.\",\"link\":\"/theorem/three_sevens_twentyone\"},{\"text\":\"The trinity (3) and the rosette (7) are coprime — gcd(3,7)=1 — so a step of 3 permutes ℤ/7 (visits every ray), and ℤ/3 and ℤ/7 fuse into a single ℤ/21 cycle (the Chinese remainder theorem). Coprimality IS the fusion.\",\"link\":\"/theorem/trinity_rosette_coprime\"},{\"text\":\"DNA reads in triplets: the codon reading frame steps by 3. Through the seven-ray rosette that step visits ALL seven rays in one rotation — [0,3,6,2,5,1,4] — because 3 is coprime to 7. The reading frame (the DNA 3) IS a full rotation (the rosette 7): 3×7 in one stroke.\",\"link\":\"/theorem/codon_frame_rotates_rosette\"},{\"text\":\"The human pentagram’s pentagon: each interior angle is 108° — (5−2)·180 = 540, and 540 = 5·108. A finite count of degrees, exact; the five points fold to a half-turn (5·36 = 180).\",\"link\":\"/theorem/pentagon_interior_angle_108\"},{\"text\":\"π is the honest edge: irrational, infinite, non-repeating — NOT a `by decide` object (proving anything about π itself needs analysis, not decision). What decides is the finite rationals AROUND it: Archimedes’ bounds 223/71 < π < 22/7 are two ordered fractions — 223·7 = 1561 < 1562 = 22·71 — bracketing π within 1/(71·7). The ledger holds the finite witnesses; π stays outside, by its nature, not by omission.\",\"link\":\"/theorem/pi_bracketed_by_finite_rationals\"}]},{\"text\":\"The chessboard · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The board is 8×8 = 64 = 2⁶ squares — the same 64 the whole project is tuned to (six doublings, the bit measure).\",\"link\":\"/theorem/chessboard_sixty_four\"},{\"text\":\"Exactly 32 squares of each colour: the colour is the (rank+file) parity, and half of the 64 squares are even — a balanced 2-colouring, 32 light and 32 dark.\",\"link\":\"/theorem/chessboard_two_colours\"},{\"text\":\"The knight leaps 1+2 = 3 squares (Manhattan), which is ODD — so every knight move changes the (rank+file) parity, i.e. it flips the square colour. White-square knight → black square, always.\",\"link\":\"/theorem/knight_leap_is_odd\"},{\"text\":\"A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.\",\"link\":\"/theorem/knight_has_eight_moves\"},{\"text\":\"Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.\",\"link\":\"/theorem/closed_knight_tour_even\"},{\"text\":\"A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.\",\"link\":\"/theorem/rook_open_board_fourteen\"},{\"text\":\"A bishop moves (±1,±1), and 1+1 = 2 is EVEN — so it preserves the (rank+file) parity and never changes square colour. A light-squared bishop can never reach the 32 dark squares: half the board is forever closed to it.\",\"link\":\"/theorem/bishop_stays_on_colour\"},{\"text\":\"The queen is rook + bishop: from a corner of an open board she reaches 7 (rank) + 7 (file) + 7 (long diagonal) = 21 squares — the same 21 = 3×7 the trinity and the rosette fold to.\",\"link\":\"/theorem/queen_corner_twentyone\"}]},{\"text\":\"The error-correcting codes · 8\",\"collapsed\":true,\"items\":[{\"text\":\"Hamming(7,4): 4 data bits + 3 parity bits = 7, carrying 2⁴ = 16 codewords — three redundant bits protect four.\",\"link\":\"/theorem/hamming_seven_four\"},{\"text\":\"Hamming(7,4) is a PERFECT code: each of the 16 codewords owns a sphere of 1 (itself) + 7 (single-bit flips) = 8, and 16 × 8 = 128 = 2⁷ — the spheres tile the whole 7-bit space exactly, no word wasted.\",\"link\":\"/theorem/hamming_perfect_code\"},{\"text\":\"The minimum distance d = 3 satisfies the Singleton bound d ≤ n − k + 1 = 7 − 4 + 1 = 4 — no code can beat it, and Hamming sits one below.\",\"link\":\"/theorem/singleton_bound\"},{\"text\":\"A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.\",\"link\":\"/theorem/distance_three_corrects_one\"},{\"text\":\"The same distance-3 code DETECTS d − 1 = 2 errors — two flips can never reach another codeword, so they are always noticed (though not corrected).\",\"link\":\"/theorem/distance_three_detects_two\"},{\"text\":\"The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 > 3 makes two a strict majority of three.\",\"link\":\"/theorem/repetition_three_majority\"},{\"text\":\"A linear XOR checksum catches any single flip: XOR is self-inverse, so flipping a word by d and re-checking recovers exactly d — (a ⊕ d) ⊕ a = d, for every a. The error cannot hide.\",\"link\":\"/theorem/xor_checksum_catches_flip\"},{\"text\":\"Correction needs room: 2⁴ = 16 codewords sit sparsely inside 2⁷ = 128 possible words (16 < 128) — the redundancy is exactly what lets a flipped word be traced back to its origin.\",\"link\":\"/theorem/codewords_sparse\"}]},{\"text\":\"The identifiers · 6\",\"collapsed\":true,\"items\":[{\"text\":\"ISBN-10 0-306-40615-2 checks out: its weighted sum Σ (11−i)·dᵢ = 132 = 12·11 ≡ 0 (mod 11) — the check digit 2 makes the whole thing divisible by 11.\",\"link\":\"/theorem/isbn10_valid_check\"},{\"text\":\"ISBN-13 978-0-306-40615-7 checks out: its alternating 1,3,1,3… weighted sum = 100 ≡ 0 (mod 10) — the mod-10 check used by the EAN barcode.\",\"link\":\"/theorem/isbn13_valid_check\"},{\"text\":\"A mod-11 check digit needs ELEVEN symbols: 0–9 and X for the value 10 — [0,1,…,10] has length 11. That is why an ISBN-10 can end in X.\",\"link\":\"/theorem/isbn10_check_alphabet_eleven\"},{\"text\":\"ISBN-10 catches EVERY single-digit error: its weights 10..1 are each nonzero mod 11 (which is prime), so changing any digit by δ shifts the checksum by wᵢ·δ ≠ 0 — the error cannot hide.\",\"link\":\"/theorem/isbn10_catches_single_error\"},{\"text\":\"ISBN-10 catches EVERY adjacent transposition: consecutive weights differ by exactly 1, so swapping two neighbouring digits d,e shifts the checksum by (d−e) ≠ 0 (mod 11) — the commonest typo, caught.\",\"link\":\"/theorem/isbn10_catches_transposition\"},{\"text\":\"ISBN-13 lives in the Bookland EAN: books carry the prefix 978 or 979 (979 − 978 = 1) — the barcode namespace that folded ISBNs into the global product code.\",\"link\":\"/theorem/isbn13_bookland_prefix\"}]},{\"text\":\"The tides · 7\",\"collapsed\":true,\"items\":[{\"text\":\"The sailor's rule of twelfths: over six hours a tide rises 1,2,3,3,2,1 twelfths of its range — and 1+2+3+3+2+1 = 12, the whole range accounted for.\",\"link\":\"/theorem/rule_of_twelfths\"},{\"text\":\"The rule is a palindrome — [1,2,3,3,2,1] reversed is itself: flood and ebb mirror, the tide fills as it drains.\",\"link\":\"/theorem/twelfths_symmetric\"},{\"text\":\"By the third hour the water stands at HALF its range: 1+2+3 = 6 of 12 (2·6 = 12) — half-tide falls at mid-flood, not the halfway time by accident but by the twelfths.\",\"link\":\"/theorem/half_tide_at_hour_three\"},{\"text\":\"The middle hours run fastest: 3 twelfths an hour at mid-tide versus 1 at the turns — 3 > 1, so the water moves most where a grounded keel most needs the depth to change.\",\"link\":\"/theorem/mid_tide_fastest\"},{\"text\":\"Two high tides fall a lunar day apart: 12h25m = 745 minutes each, and 745·2 = 1490 = 24h50m — the semidiurnal rhythm, set by the Moon, not the Sun (which would give 24h).\",\"link\":\"/theorem/semidiurnal_period\"},{\"text\":\"A spring tide (new or full Moon, Sun and Moon aligned, their pulls ADD) exceeds a neap (at the quarter, pulls partly cancel): 2+1 > 2−1 — the range swells and shrinks with the phase.\",\"link\":\"/theorem/spring_exceeds_neap\"},{\"text\":\"One semidiurnal cycle is six hours of flood and six of ebb: 6 + 6 = 12 — the tide gives back exactly the hours it took.\",\"link\":\"/theorem/flood_and_ebb\"}]},{\"text\":\"The calendar · 9\",\"collapsed\":true,\"items\":[{\"text\":\"The week is the rosette ℤ/7: seven days, and advancing by seven returns to the same day — 7 % 7 = 0. The calendar counts in the same ring uuidna turns on.\",\"link\":\"/theorem/week_is_z7\"},{\"text\":\"A common year is 365 = 52·7 + 1 days, so 365 % 7 = 1: every ordinary year the weekday of a fixed date advances by exactly one — New Year walks forward a day a year.\",\"link\":\"/theorem/common_year_shifts_one\"},{\"text\":\"A leap year is 366 days, and 366 % 7 = 2: a fixed date jumps forward TWO weekdays across a leap year — the extra day is the extra shift.\",\"link\":\"/theorem/leap_year_shifts_two\"},{\"text\":\"The Gregorian rule keeps 97 leap years per 400: every 4th year (100), minus the centuries (4), plus every 400th (1) — 100 − 4 + 1 = 97. Just short of the Julian 100, tuned to the tropical year.\",\"link\":\"/theorem/leap_years_per_400\"},{\"text\":\"The whole Gregorian calendar repeats EXACTLY every 400 years: 400·365 + 97 = 146097 days, and 146097 % 7 = 0 — a whole number of weeks, so the same dates fall on the same weekdays, forever.\",\"link\":\"/theorem/gregorian_cycle_400_years\"},{\"text\":\"The century exception, decided: 2000 is a leap year (2000 % 400 = 0) but 1900 is not (1900 % 100 = 0 yet 1900 % 400 ≠ 0) — the rule that made the Gregorian reform, on two famous years.\",\"link\":\"/theorem/century_leap_rule\"},{\"text\":\"The doomsday rule for the even months: in a common year 4/4, 6/6, 8/8, 10/10 and 12/12 fall on day-of-year 94, 157, 220, 283, 346 — each 63 = 9·7 apart, so all ≡ 3 (mod 7). Five dates, one weekday, every year.\",\"link\":\"/theorem/doomsday_even_months\"},{\"text\":\"The twelve months of a common year sum to 365: [31,28,31,30,31,30,31,31,30,31,30,31] folds to 365 — the year closed, February short.\",\"link\":\"/theorem/months_sum_common_365\"},{\"text\":\"A leap year gives February its 29th and the twelve months sum to 366: [31,29,31,30,31,30,31,31,30,31,30,31] folds to 366 — exactly one more day than the common year.\",\"link\":\"/theorem/months_sum_leap_366\"}]},{\"text\":\"The measures of type · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The printer's units close exactly: 6 picas of 12 points each make the inch — 6 · 12 = 72 points to the inch, the measure every page is set in.\",\"link\":\"/theorem/inch_is_seventytwo_points\"},{\"text\":\"Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.\",\"link\":\"/theorem/folio_quarto_octavo\"},{\"text\":\"A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.\",\"link\":\"/theorem/signature_multiple_of_four\"},{\"text\":\"The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.\",\"link\":\"/theorem/page_diagonal_three_four_five\"},{\"text\":\"The readable measure — characters per line — sits at 66, inside the 45–75 a typographer keeps: 45 ≤ 66 ∧ 66 ≤ 75. Too short and the eye jerks; too long and it loses the return.\",\"link\":\"/theorem/readable_measure_range\"},{\"text\":\"Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the extra measure that keeps lines from touching.\",\"link\":\"/theorem/leading_exceeds_type\"},{\"text\":\"A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by.\",\"link\":\"/theorem/ream_is_five_hundred\"},{\"text\":\"Each leaf has two faces: the recto (front) carries the odd folios, the verso (back) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that opens a book on the right.\",\"link\":\"/theorem/recto_odd_verso_even\"}]},{\"text\":\"The cut · 9\",\"collapsed\":true,\"items\":[{\"text\":\"Timecode is a ring: at 24 fps the frame field runs 0..23 then wraps to the next second — (List.range 24).length = 24 ∧ 24 % 24 = 0. An editor counts frames in ℤ/24, the same close the rosette makes in ℤ/7.\",\"link\":\"/theorem/frame_index_is_z24\"},{\"text\":\"A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.\",\"link\":\"/theorem/frames_per_minute\"},{\"text\":\"NTSC drop-frame drops 2 frame-numbers each minute EXCEPT every tenth, so an hour drops 2 · 54 = 108 (54 of the 60 minutes are not multiples of ten) — the fudge that holds 29.97 fps to the wall clock. No frame of picture is lost, only its number.\",\"link\":\"/theorem/dropframe_per_hour\"},{\"text\":\"A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.\",\"link\":\"/theorem/uhd_is_four_times_hd\"},{\"text\":\"Widescreen 16:9 is wider than academy 4:3, decided by cross-multiplication: 16 · 3 = 48 > 36 = 9 · 4 — the pillarbox on a 4:3 clip in a 16:9 sequence, proven.\",\"link\":\"/theorem/widescreen_wider_than_academy\"},{\"text\":\"The rule of thirds: two lines each way cut the frame into a nine-square and cross at four power points — 3 · 3 = 9 ∧ 2 · 2 = 4 — where the eye rests and the editor places the subject.\",\"link\":\"/theorem/rule_of_thirds_power_points\"},{\"text\":\"A crossfade of 12 frames between two 48-frame clips runs 48 + 48 − 12 = 84: the dissolve is exactly the timeline’s inclusion–exclusion — the SAME identity uuidna_compare folds to read similarity from difference.\",\"link\":\"/theorem/crossfade_overlap\"},{\"text\":\"48 kHz audio at 24 fps is 2000 samples a frame, and it divides evenly (48000 % 24 = 0) — the exact sync that lets a cut land on a sample, not between two.\",\"link\":\"/theorem/audio_samples_per_frame\"},{\"text\":\"The grammar of the cut in one line: six 30° steps span the 180° axis — 30 · 6 = 180 — so a cut must turn at least 30° to avoid a jump, and the camera must stay one side of the 180° line.\",\"link\":\"/theorem/angle_of_the_cut\"}]},{\"text\":\"The exposure · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The physics uuidna keeps: a full stop is EXACTLY a doubling, so the exact shutter after 1/64 is 1/128 = 2⁷ — a power of two, not a round number.\",\"link\":\"/theorem/full_stop_is_exact_doubling\"},{\"text\":\"WHERE uuidna DIFFERS: the camera prints 1/125 s, but the exact doubling is 1/128 s (2⁷) — the standard ROUNDS 128 down to 125, off by 3. uuidna keeps 128; the dial keeps the round number.\",\"link\":\"/theorem/shutter_125_rounds_128\"},{\"text\":\"The same rounding again: 1/60 s is the printed value; the exact stop is 1/64 s (2⁶). The standard rounds 64 to 60, off by 4 — uuidna computes the power of two the dial approximates.\",\"link\":\"/theorem/shutter_60_rounds_64\"},{\"text\":\"The aperture rounds too: f/1.4 is the printed √2, but 1.4² = 1.96, short of the exact 2 (14² = 196 < 200). One stop of AREA is exactly ×2; the f-number the standard engraves is a rounded √2.\",\"link\":\"/theorem/fstop_14_rounds_sqrt_two\"},{\"text\":\"What uuidna keeps exact: the aperture AREA is powers of two, so f² = 2ⁿ exactly — [1,2,4,8,16] = [2⁰..2⁴]. The printed f-numbers (1, 1.4, 2, 2.8, 4) are the rounded √ of these; the squares are exact.\",\"link\":\"/theorem/fstop_squared_is_exact_power\"},{\"text\":\"WHERE uuidna and the standard AGREE: the full-stop ISO scale is EXACT doublings, no rounding — ISO 100 up five stops is 100·2⁵ = 3200, and the standard prints 3200. Sensitivity doubles cleanly; only shutter and aperture carry the rounding.\",\"link\":\"/theorem/iso_full_stops_agree_exactly\"},{\"text\":\"The one the standard gets exactly right: open one stop of aperture and shorten one stop of shutter and the exposure is unchanged — (1) + (−1) = 0. Reciprocity is exact because it is pure addition of stops.\",\"link\":\"/theorem/equivalent_exposure\"},{\"text\":\"Why the doubling is uuidna's: the exposure light-multipliers 2⁰..2⁵, folded mod 9, ARE the vortex sequence — (List.range 6).map (2^· mod 9) = [1,2,4,8,7,5]. The camera doubles in the same ring uuidna turns on; the standard just rounds the readout.\",\"link\":\"/theorem/stops_fold_mod_nine\"}]},{\"text\":\"The spectrum · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The one law, as arithmetic: wavelength × frequency = c is a CONSTANT, so if the wavelength doubles the frequency halves and the product holds — 2·150 = 300 and 4·75 = 300 (300 scales the constant). λ and f are inversely proportional at the fixed speed of light.\",\"link\":\"/theorem/wave_product_is_constant\"},{\"text\":\"WHERE the standard ROUNDS: the exact speed of light is 299792458 m/s (exact by the SI metre), but it is quoted as 300000 km/s = 300000000 m/s — a rounding UP by 207542 m/s. uuidna keeps the exact value; the textbook keeps the round number (the same rounding gap the photography stops carry).\",\"link\":\"/theorem/light_speed_rounds_to_300000\"},{\"text\":\"The spectrum has SEVEN bands — radio, microwave, infrared, visible, ultraviolet, X-ray, gamma — indexed 0..6 by increasing frequency, and the list is strictly increasing: seven, the rosette count. The waves uuidna navigates are a ℤ/7 of bands.\",\"link\":\"/theorem/seven_bands_in_order\"},{\"text\":\"Planck as order: photon energy E = h·f rises with frequency, so across the seven bands the energy is strictly increasing — gamma (band 6) carries more energy per photon than radio (band 0). Mapping each band to its energy rank is monotone.\",\"link\":\"/theorem/photon_energy_rises_with_band\"},{\"text\":\"The visible window is LESS than one octave — an octave doubles the frequency (halves the wavelength), but visible light runs 700 nm to 400 nm, a ratio 700/400 = 1.75 < 2 (700 < 2·400 = 800). We see under a single octave of light, unlike the many octaves of sound.\",\"link\":\"/theorem/visible_under_one_octave\"},{\"text\":\"An octave of light is a doubling, exactly as in sound: one octave up doubles the frequency, so a wave at 500 THz has its octave at 1000 THz — 500·2 = 1000. The same doubling ring the vortex turns on carries the light.\",\"link\":\"/theorem/octave_of_light_doubles\"},{\"text\":\"λ and f are inverses at fixed c: double the frequency and the wavelength halves so the product is unchanged — (2·f)·(λ/2) = f·λ. Here doubling 3 to 6 while halving 100 to 50 keeps the product 300: 6·50 = 3·100 = 300.\",\"link\":\"/theorem/inverse_at_fixed_c\"},{\"text\":\"The visible band itself splits into SEVEN named colours — the ROYGBIV rosette (red, orange, yellow, green, blue, indigo, violet) — so the spectrum a human eye reads is again a seven, a rosette inside the fourth band.\",\"link\":\"/theorem/visible_seven_colours\"}]},{\"text\":\"The colour wheel · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.\",\"link\":\"/theorem/twelve_hue_wheel_wraps\"},{\"text\":\"Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.\",\"link\":\"/theorem/complementary_hues_oppose\"},{\"text\":\"Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.\",\"link\":\"/theorem/primaries_and_secondaries_make_six\"},{\"text\":\"A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.\",\"link\":\"/theorem/triadic_harmony_is_thirds\"},{\"text\":\"A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.\",\"link\":\"/theorem/square_harmony_is_fourths\"},{\"text\":\"True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.\",\"link\":\"/theorem/true_colour_is_24_bit\"},{\"text\":\"On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.\",\"link\":\"/theorem/tint_and_shade_complement\"},{\"text\":\"The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.\",\"link\":\"/theorem/warm_cool_split_six_six\"}]},{\"text\":\"The harmony of pairs · 8\",\"collapsed\":true,\"items\":[{\"text\":\"BIOLOGY: the four DNA bases pair by complement — A↔T, G↔C — written as the REFLECTION c ↦ 3−c on {0,1,2,3} (the same reflection form as pH and charge below, not the XOR form of dna_base_pairing_involution): applied twice it returns (an involution), and no base pairs with itself (3−c ≠ c). The helix pairs through the centre 3.\",\"link\":\"/theorem/dna_bases_reflect_through_three\"},{\"text\":\"BIOLOGY: Chargaff's rule as counting — in a duplex #A = #T and #G = #C, so the purines (A+G) equal the pyrimidines (T+C). With [A,T,G,C] = [5,5,3,3]: A = T, G = C, and A+G = T+C. The strand balances its complement.\",\"link\":\"/theorem/chargaff_strand_balance\"},{\"text\":\"CHEMISTRY: in a redox reaction the electrons lost by oxidation equal the electrons gained by reduction — the half-reactions balance, so their signed sum is zero: (+3) + (−3) = 0. Oxidation and reduction are one conserved pair.\",\"link\":\"/theorem/redox_conserves_electrons\"},{\"text\":\"CHEMISTRY: an ionic compound is electrically neutral — the cation charge and the anion charges sum to zero. For MgCl₂ the Mg²⁺ (+2) balances two Cl⁻ (−1 each): (+2) + 2·(−1) = 0. Cation and anion are a charge-complementary pair.\",\"link\":\"/theorem/ionic_compound_is_neutral\"},{\"text\":\"MEDICINE (pharmacology): a competitive antagonist cancels an agonist's net effect at the receptor — the paired action sums to the baseline: (+4) + (−4) = 0. Agonist and antagonist are the same complement the other fields carry.\",\"link\":\"/theorem/agonist_antagonist_cancels\"},{\"text\":\"MEDICINE (physiology): homeostasis is complement in time — a deviation of +d from the set point is met by a correction of −d, returning exactly to the set point: (37 + 2) − 2 = 37. Perturbation and response are a pair that closes.\",\"link\":\"/theorem/homeostasis_returns_to_setpoint\"},{\"text\":\"PHYSICS: Newton's third law and charge conservation are the same cancelling pair — the reaction is minus the action, F + (−F) = 0 (here (+5)+(−5)), and an electron and positron sum to zero charge, (−1)+(+1) = 0. The pair sums to nothing.\",\"link\":\"/theorem/action_reaction_and_charge_cancel\"},{\"text\":\"THE HARMONY: every pair above is reflection through a centre n (c ↦ n−c), self-inverse for EVERY centre — so the four bases (n=3), electric charge (n=0) and pH (n=14) are the SAME involution at different centres. One structure, four sciences; this is what \\\"harmonise the pairs\\\" means, proven.\",\"link\":\"/theorem/pairs_share_one_centre\"}]},{\"text\":\"The matching · 8\",\"collapsed\":true,\"items\":[{\"text\":\"The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.\",\"link\":\"/theorem/handshake_degree_sum_even\"},{\"text\":\"Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.\",\"link\":\"/theorem/edges_are_half_the_degree_sum\"},{\"text\":\"How many connections are possible among n people: each of the n meets the other n−1, and each meeting is shared, so n(n−1)/2. Among five people that is 5·4/2 = 10 possible introductions.\",\"link\":\"/theorem/introductions_among_five\"},{\"text\":\"A perfect matching pairs everyone with exactly one partner, so it needs an EVEN number of people — six pair cleanly (6 % 2 = 0), five cannot (5 % 2 = 1); one is always left unmatched. The parity decides it.\",\"link\":\"/theorem/perfect_matching_needs_even\"},{\"text\":\"When the count is even, a perfect matching splits it in half: eight people make exactly four pairs (8 = 2·4). The pairing is a partition into twos.\",\"link\":\"/theorem/n_people_make_n_half_pairs\"},{\"text\":\"The honest ceiling: the Gale–Shapley stable-matching process halts, in AT MOST n² proposals — for four people, at most 16. It is BOUNDED, not free; the same \\\"no maximum, only bounds\\\" the security layer proves — connecting people has a cost, and the cost is finite and known.\",\"link\":\"/theorem/proposals_bounded_by_n_squared\"},{\"text\":\"A pairing p = [1,0,3,2] is a fixed-point-free involution: applied twice it returns everyone to themselves (p(p(x)) = x — the match is MUTUAL) and no one is paired with themselves (p(x) ≠ x — a match needs an other). Both halves proven for all four.\",\"link\":\"/theorem/pairing_is_fixedpoint_free_involution\"},{\"text\":\"A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.\",\"link\":\"/theorem/mutual_match_is_symmetric\"}]},{\"text\":\"The rules of inference · 9\",\"collapsed\":true,\"items\":[{\"text\":\"Modus ponens, proven for every assignment: from p and (p → q), q follows — !(p ∧ (p → q)) ∨ q holds on all four rows. The first rule of every valid argument.\",\"link\":\"/theorem/modus_ponens\"},{\"text\":\"Modus tollens: from ¬q and (p → q), ¬p follows — !(¬q ∧ (p → q)) ∨ ¬p holds on every row. Deny the consequent, deny the antecedent.\",\"link\":\"/theorem/modus_tollens\"},{\"text\":\"The contrapositive is equivalent to the implication: (p → q) = (¬q → ¬p) for all p, q — an argument and its contrapositive stand or fall together.\",\"link\":\"/theorem/contrapositive\"},{\"text\":\"De Morgan for conjunction: ¬(p ∧ q) = (¬p ∨ ¬q) on every row — the negation of an 'and' is the 'or' of the negations.\",\"link\":\"/theorem/de_morgan_and\"},{\"text\":\"De Morgan for disjunction: ¬(p ∨ q) = (¬p ∧ ¬q) on every row — the negation of an 'or' is the 'and' of the negations.\",\"link\":\"/theorem/de_morgan_or\"},{\"text\":\"Double negation: ¬¬p = p for both truth values — classical logic returns to where it started.\",\"link\":\"/theorem/double_negation\"},{\"text\":\"The law of the excluded middle: p ∨ ¬p is true for every p — a proposition or its negation, no third option, in classical logic.\",\"link\":\"/theorem/excluded_middle\"},{\"text\":\"The hypothetical syllogism (chaining): from (p → q) and (q → r), (p → r) follows — proven on all eight rows of three variables. How a chain of reasoning links.\",\"link\":\"/theorem/hypothetical_syllogism\"},{\"text\":\"The disjunctive syllogism: from (p ∨ q) and ¬p, q follows — !((p ∨ q) ∧ ¬p) ∨ q holds on every row. Rule out one disjunct, keep the other.\",\"link\":\"/theorem/disjunctive_syllogism\"}]},{\"text\":\"The layered defence · 6\",\"collapsed\":true,\"items\":[{\"text\":\"Defence in depth adds bits: fuse a 64-bit tamper-evidence layer with a 64-bit forge-resistance layer and a forgery must defeat both — 64 + 64 = 128 bits of work. Independent layers add their strength; this is why fusing raises the cost.\",\"link\":\"/theorem/defence_layers_add_bits\"},{\"text\":\"Adding bits multiplies the search space: two independent 8-bit layers make a 16-bit space — 2^8 · 2^8 = 2^16 (256 · 256 = 65536). Fusing is multiplicative in the space, additive in the bits.\",\"link\":\"/theorem/two_layers_multiply_space\"},{\"text\":\"Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length, not a maximum.\",\"link\":\"/theorem/each_key_bit_doubles\"},{\"text\":\"The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.\",\"link\":\"/theorem/birthday_halves_the_exponent\"},{\"text\":\"The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.\",\"link\":\"/theorem/verify_cheaper_than_forge\"},{\"text\":\"There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why \\\"max tampering cost\\\" is refused — the honest claim is a bound, always exceedable.\",\"link\":\"/theorem/no_maximum_only_bounds\"}]},{\"text\":\"The mix · 10\",\"collapsed\":true,\"items\":[{\"text\":\"Reversing a clip is self-inverse: reverse it twice and the signal returns — ([3,-5,8] : List Int).reverse.reverse = [3,-5,8]. The tape run backward and backward again is the tape.\",\"link\":\"/theorem/reverse_involutive\"},{\"text\":\"Phase inversion is self-inverse: flip polarity (x ↦ −x) twice and the signal returns — (([3,-5,8] : List Int).map (−·)).map (−·) = [3,-5,8]. The polarity button, pressed twice, is off.\",\"link\":\"/theorem/phase_inversion_involutive\"},{\"text\":\"THE FUSION, the ultimate test: reverse-then-invert is ITSELF an involution — apply the fused operation twice and the signal returns, ((([3,-5,8] : List Int).reverse.map (−·)).reverse.map (−·)) = [3,-5,8]. Reverse and inverse compose to a clean self-inverse; the two studio mirrors fuse to one.\",\"link\":\"/theorem/reverse_inverse_fused_involutive\"},{\"text\":\"The chromatic scale is the ring ℤ/12: twelve semitones, and the twelfth is the octave that wraps to the root — (List.range 12).length = 12 ∧ 12 % 12 = 0. Pitch counts in a ring, as the week does in ℤ/7.\",\"link\":\"/theorem/chromatic_is_z12\"},{\"text\":\"An octave doubles frequency: A4 at 440 Hz is A5 at 880 — 440 · 2 = 880. The one interval every tuning agrees on.\",\"link\":\"/theorem/octave_doubles_frequency\"},{\"text\":\"At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.\",\"link\":\"/theorem/tempo_ms_per_beat\"},{\"text\":\"Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.\",\"link\":\"/theorem/nyquist_half_samplerate\"},{\"text\":\"MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 < 128. Why note 128 does not exist and velocity tops out at 127.\",\"link\":\"/theorem/midi_is_seven_bit\"},{\"text\":\"The rule of thumb: ~6 dB of dynamic range per bit, so 16-bit is ≈96 dB — 6 · 16 = 96. An approximation (the exact figure is ~6.02 dB/bit), the number an engineer reaches for.\",\"link\":\"/theorem/sixteen_bit_dynamic_range\"},{\"text\":\"The circle of fifths is ONE cycle: stepping by a perfect fifth (7 semitones) mod 12 visits all twelve tones, because 7 is coprime to 12 — every n in 0..11 appears in [(k·7) mod 12]. The pentagram {5/2} idea, heard in sound.\",\"link\":\"/theorem/fifth_cycles_all_twelve\"}]},{\"text\":\"One leap · 1\",\"collapsed\":true,\"items\":[{\"text\":\"one by-decide from division-by-zero=the reflection: the doubling orbit, the involution {0,5}, ℤ/9 arithmetic, AGL(1,ℤ/9)=54 with commutator=the unit shift, and the equilibriums — the whole vortex at once\",\"link\":\"/theorem/vortex_one_leap\"}]}]},\"socialLinks\":[{\"icon\":\"github\",\"link\":\"https://github.com/uuidna/uuidna\"},{\"icon\":\"npm\",\"link\":\"https://www.npmjs.com/package/@uuidna/uuidna\"}],\"editLink\":{\"pattern\":\"https://github.com/uuidna/uuidna/edit/main/:path\",\"text\":\"Edit / source on GitHub\"}},\"locales\":{},\"cleanUrls\":true,\"additionalConfig\":{}}"));
//#endregion
//#region node_modules/vitepress/dist/client/app/data.js
var dataSymbol = Symbol();
var siteDataRef = shallowRef(readonly(_siteData_default));
function initData(route) {
	const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.data.relativePath, route.data.filePath));
	const appearance = site.value.appearance;
	const isDark = appearance === "force-dark" ? ref(true) : appearance === "force-auto" ? usePreferredDark() : appearance ? useDark({
		storageKey: APPEARANCE_KEY,
		initialValue: () => appearance === "dark" ? "dark" : "auto",
		...typeof appearance === "object" ? appearance : {}
	}) : ref(false);
	return {
		site,
		theme: computed(() => site.value.themeConfig),
		page: computed(() => route.data),
		frontmatter: computed(() => route.data.frontmatter),
		params: computed(() => route.data.params),
		lang: computed(() => site.value.lang),
		dir: computed(() => route.data.frontmatter.dir || site.value.dir),
		localeIndex: computed(() => site.value.localeIndex || "root"),
		title: computed(() => createTitle(site.value, route.data)),
		description: computed(() => route.data.description || site.value.description),
		isDark
	};
}
function useData$1() {
	const data = inject(dataSymbol);
	if (!data) throw new Error("vitepress data not properly injected in app");
	return data;
}
//#endregion
//#region node_modules/vitepress/dist/client/app/utils.js
/**
* Join two paths by resolving the slash collision.
*/
function joinPath(base, path) {
	return `${base}${path}`.replace(/\/+/g, "/");
}
/**
* Prepend base to internal (non-relative) urls
*/
function withBase(path) {
	return EXTERNAL_URL_RE.test(path) || !path.startsWith("/") ? path : joinPath(siteDataRef.value.base, path);
}
/**
* Converts a url path to the corresponding js chunk filename.
*/
function pathToFile(path) {
	let pagePath = path.replace(/\.html$/, "");
	pagePath = decodeURIComponent(pagePath);
	pagePath = pagePath.replace(/\/$/, "/index");
	if (inBrowser) {
		const base = "/";
		pagePath = sanitizeFileName(pagePath.slice(1).replace(/\//g, "_") || "index") + ".md";
		let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
		if (!pageHash) {
			pagePath = pagePath.endsWith("_index.md") ? pagePath.slice(0, -9) + ".md" : pagePath.slice(0, -3) + "_index.md";
			pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
		}
		if (!pageHash) return null;
		pagePath = `${base}assets/${pagePath}.${pageHash}.js`;
	} else pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
	return pagePath;
}
var contentUpdatedCallbacks = [];
/**
* Register callback that is called every time the markdown content is updated
* in the DOM.
*/
function onContentUpdated(fn) {
	contentUpdatedCallbacks.push(fn);
	tryOnUnmounted(() => {
		contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn);
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/app/components/Content.js
var runCbs = () => contentUpdatedCallbacks.forEach((fn) => fn());
var Content = defineComponent({
	name: "VitePressContent",
	props: { as: {
		type: [Object, String],
		default: "div"
	} },
	setup(props) {
		const { frontmatter, site } = useData$1();
		const route = useRoute();
		watch(frontmatter, runCbs, {
			deep: true,
			flush: "post"
		});
		return () => h(props.as, site.value.contentProps ?? { style: { position: "relative" } }, [route.component ? h(route.component, {
			onVnodeMounted: runCbs,
			onVnodeUpdated: runCbs,
			onVnodeUnmounted: runCbs
		}) : "404 Page Not Found"]);
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/app/router.js
var RouterSymbol = Symbol();
var fakeHost = "http://a.com";
var getDefaultRoute = () => ({
	path: "/",
	hash: "",
	query: "",
	component: null,
	data: notFoundPageData
});
function createRouter(loadPageModule, fallbackComponent) {
	const route = reactive(getDefaultRoute());
	const router = {
		route,
		async go(href, options) {
			const { hash } = new URL(href, fakeHost);
			const hasTextFragment = inBrowser && document.fragmentDirective && hash.includes(":~:");
			href = normalizeHref(href);
			if (await router.onBeforeRouteChange?.(href) === false) return;
			if (!inBrowser || await changeRoute(href, {
				...options,
				hasTextFragment
			})) await loadPage(href, { initialLoad: !!options?.initialLoad });
			if (hasTextFragment) location.hash = hash;
			syncRouteQueryAndHash();
			await router.onAfterRouteChange?.(href);
		}
	};
	let latestPendingPath = null;
	async function loadPage(href, { scrollPosition = 0, isRetry = false, initialLoad = false } = {}) {
		if (await router.onBeforePageLoad?.(href) === false) return;
		const targetLoc = new URL(href, fakeHost);
		const pendingPath = latestPendingPath = targetLoc.pathname;
		try {
			let page = await loadPageModule(pendingPath);
			if (!page) throw new Error(`Page not found: ${pendingPath}`);
			if (latestPendingPath === pendingPath) {
				latestPendingPath = null;
				const { default: comp, __pageData } = page;
				if (!comp) throw new Error(`Invalid route component: ${comp}`);
				await router.onAfterPageLoad?.(href);
				route.path = inBrowser ? pendingPath : withBase(pendingPath);
				route.component = markRaw(comp);
				route.data = markRaw(__pageData);
				syncRouteQueryAndHash(targetLoc);
				if (inBrowser) nextTick(() => {
					let actualPathname = siteDataRef.value.base + __pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
					if (!siteDataRef.value.cleanUrls && !actualPathname.endsWith("/")) actualPathname += ".html";
					if (actualPathname !== targetLoc.pathname) {
						targetLoc.pathname = actualPathname;
						href = actualPathname + targetLoc.search + targetLoc.hash;
						history.replaceState({}, "", href);
					}
					if (!initialLoad) scrollTo(targetLoc.hash, scrollPosition);
				});
			}
		} catch (err) {
			if (!/fetch|Page not found/.test(err.message) && !/^\/404(\.html|\/)?$/.test(href)) console.error(err);
			if (!isRetry) try {
				const res = await fetch(siteDataRef.value.base + "hashmap.json");
				window.__VP_HASH_MAP__ = await res.json();
				await loadPage(href, {
					scrollPosition,
					isRetry: true,
					initialLoad
				});
				return;
			} catch (e) {}
			if (latestPendingPath === pendingPath) {
				latestPendingPath = null;
				route.path = inBrowser ? pendingPath : withBase(pendingPath);
				route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
				const relativePath = inBrowser ? route.path.replace(/(^|\/)$/, "$1index").replace(/(\.html)?$/, ".md").slice(siteDataRef.value.base.length) : "404.md";
				route.data = {
					...notFoundPageData,
					relativePath
				};
				syncRouteQueryAndHash(targetLoc);
			}
		}
	}
	function syncRouteQueryAndHash(loc = inBrowser ? location : {
		search: "",
		hash: ""
	}) {
		route.query = loc.search;
		route.hash = decodeURIComponent(loc.hash);
	}
	if (inBrowser) {
		if (history.state === null) history.replaceState({}, "");
		window.addEventListener("click", (e) => {
			if (e.defaultPrevented || !(e.target instanceof Element) || e.target.closest("button") || e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
			const link = e.target.closest("a");
			if (!link || link.closest(".vp-raw") || link.hasAttribute("download") || link.hasAttribute("target")) return;
			const linkHref = link.getAttribute("href") ?? (link instanceof SVGAElement ? link.getAttribute("xlink:href") : null);
			if (linkHref == null) return;
			const { href, origin, pathname } = new URL(linkHref, link.baseURI);
			if (origin === new URL(location.href).origin && treatAsHtml(pathname)) {
				e.preventDefault();
				router.go(href);
			}
		}, { capture: true });
		window.addEventListener("popstate", async (e) => {
			if (e.state === null) return;
			const href = normalizeHref(location.href);
			await loadPage(href, { scrollPosition: e.state.scrollPosition || 0 });
			syncRouteQueryAndHash();
			await router.onAfterRouteChange?.(href);
		});
		window.addEventListener("hashchange", (e) => {
			e.preventDefault();
			syncRouteQueryAndHash();
		});
	}
	return router;
}
function useRouter() {
	const router = inject(RouterSymbol);
	if (!router) throw new Error("useRouter() is called without provider.");
	return router;
}
function useRoute() {
	return useRouter().route;
}
function scrollTo(hash, scrollPosition = 0) {
	if (!hash || scrollPosition) {
		window.scrollTo(0, scrollPosition);
		return;
	}
	let target = null;
	try {
		target = document.getElementById(decodeURIComponent(hash).slice(1));
	} catch (e) {
		console.warn(e);
	}
	if (!target) return;
	const scrollToTarget = () => {
		target.scrollIntoView({ block: "start" });
		target.focus({ preventScroll: true });
		if (document.activeElement === target) return;
		if (target.hasAttribute("tabindex")) return;
		const restoreTabindex = () => {
			target.removeAttribute("tabindex");
			target.removeEventListener("blur", restoreTabindex);
		};
		target.setAttribute("tabindex", "-1");
		target.addEventListener("blur", restoreTabindex);
		target.focus({ preventScroll: true });
		if (document.activeElement !== target) restoreTabindex();
	};
	requestAnimationFrame(scrollToTarget);
}
function normalizeHref(href) {
	const url = new URL(href, fakeHost);
	url.pathname = url.pathname.replace(/(^|\/)index(\.html)?$/, "$1");
	if (siteDataRef.value.cleanUrls) url.pathname = url.pathname.replace(/\.html$/, "");
	else if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) url.pathname += ".html";
	return url.pathname + url.search + url.hash.split(":~:")[0];
}
async function changeRoute(href, { initialLoad = false, replace = false, hasTextFragment = false } = {}) {
	const loc = normalizeHref(location.href);
	const nextUrl = new URL(href, location.origin);
	const currentUrl = new URL(loc, location.origin);
	if (href === loc) {
		if (!initialLoad) {
			if (!hasTextFragment) scrollTo(nextUrl.hash);
			return false;
		}
	} else {
		if (replace) history.replaceState({}, "", href);
		else {
			history.replaceState({ scrollPosition: window.scrollY }, "");
			history.pushState({}, "", href);
		}
		if (nextUrl.pathname === currentUrl.pathname) {
			if (nextUrl.hash !== currentUrl.hash) {
				window.dispatchEvent(new HashChangeEvent("hashchange", {
					oldURL: currentUrl.href,
					newURL: nextUrl.href
				}));
				if (!hasTextFragment) scrollTo(nextUrl.hash);
			}
			return false;
		}
	}
	return true;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/data.js
var useData = useData$1;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/utils.js
function throttleAndDebounce(fn, delay) {
	let timeoutId;
	let called = false;
	return () => {
		if (timeoutId) clearTimeout(timeoutId);
		if (!called) {
			fn();
			(called = true) && setTimeout(() => called = false, delay);
		} else timeoutId = setTimeout(fn, delay);
	};
}
function ensureStartingSlash(path) {
	return path.startsWith("/") ? path : `/${path}`;
}
function isLinkExternal(href, target, external) {
	if (external !== void 0) return external;
	return !!href && isExternal(href) || target === "_blank";
}
function normalizeLink$1(url) {
	const { pathname, search, hash, protocol } = new URL(url, "http://a.com");
	if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname)) return url;
	const { site } = useData();
	return withBase(pathname.endsWith("/") || pathname.endsWith(".html") ? url : url.replace(/(?:(^\.+)\/)?.*$/, `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`));
}
function uniqBy(array, keyFn) {
	const seen = /* @__PURE__ */ new Set();
	return array.filter((item) => {
		const k = keyFn(item);
		return seen.has(k) ? false : seen.add(k);
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/langs.js
function useLangs({ linkToCorrespondingPage = false } = {}) {
	const data = useData();
	const route = useRoute();
	const { site, localeIndex } = data;
	const currentLang = computed(() => ({
		label: site.value.locales[localeIndex.value]?.label,
		link: site.value.locales[localeIndex.value]?.link || (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`)
	}));
	return {
		currentLang,
		localeLinks: computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => currentLang.value.label === value.label ? [] : {
			text: value.label,
			link: resolveLocaleLink(data, route, {
				targetLocale: key,
				targetLocaleLink: value.link || (key === "root" ? "/" : `/${key}/`),
				currentLocaleLink: currentLang.value.link,
				linkToCorrespondingPage
			}),
			lang: value.lang,
			dir: value.dir
		}))
	};
}
/**
* Resolves the link used for switching from the current page to
* `targetLocale`. Without `linkToCorrespondingPage`, this is simply the home
* of the target locale. With it, the current page's path is rewritten into
* the target locale (honoring `cleanUrls`) — unless
* `themeConfig.i18nRouting` is `false` (the locale home is used instead) or
* a function (which then fully controls the resolution).
*
* The current query and hash are carried over, except when a custom
* `i18nRouting` function is used.
*/
function resolveLocaleLink(data, route, { targetLocale, targetLocaleLink, currentLocaleLink, linkToCorrespondingPage }) {
	const { site, theme } = data;
	const i18nRouting = theme.value.i18nRouting;
	if (linkToCorrespondingPage && typeof i18nRouting === "function") return i18nRouting(data, route, targetLocale);
	return normalizeLink(targetLocaleLink, i18nRouting !== false && linkToCorrespondingPage, route.data.relativePath.slice(currentLocaleLink.length - 1), !site.value.cleanUrls) + route.query + route.hash;
}
function normalizeLink(localeLink, appendPagePath, pagePath, addHtmlExt) {
	return appendPagePath ? localeLink.replace(/\/$/, "") + ensureStartingSlash(pagePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, addHtmlExt ? ".html" : "")) : localeLink;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/NotFound.vue?vue&type=script&setup=true&lang.ts
var NotFound_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NotFound",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		const { currentLang } = useLangs();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "NotFound" }, _attrs))} data-v-829df670><p class="code" data-v-829df670>${ssrInterpolate(unref(theme).notFound?.code ?? "404")}</p><h1 class="title" data-v-829df670>${ssrInterpolate(unref(theme).notFound?.title ?? "PAGE NOT FOUND")}</h1><div class="divider" data-v-829df670></div><blockquote class="quote" data-v-829df670>${ssrInterpolate(unref(theme).notFound?.quote ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")}</blockquote><div class="action" data-v-829df670><a class="link"${ssrRenderAttr("href", unref(withBase)(unref(theme).notFound?.link ?? unref(currentLang).link))}${ssrRenderAttr("aria-label", unref(theme).notFound?.linkLabel ?? "go to home")} data-v-829df670>${ssrInterpolate(unref(theme).notFound?.linkText ?? "Take me home")}</a></div></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/NotFound.vue
var _sfc_setup$80 = NotFound_vue_vue_type_script_setup_true_lang_default.setup;
NotFound_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/NotFound.vue");
	return _sfc_setup$80 ? _sfc_setup$80(props, ctx) : void 0;
};
var NotFound_default = /*#__PURE__*/ _plugin_vue_export_helper_default(NotFound_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-829df670"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/sidebar.js
/**
* Get the `Sidebar` from sidebar option. This method will ensure to get correct
* sidebar config from `MultiSideBarConfig` with various path combinations such
* as matching `guide/` and `/guide/`. If no matching config was found, it will
* return empty array.
*/
function getSidebar(_sidebar, path) {
	if (Array.isArray(_sidebar)) return addBase(_sidebar);
	if (_sidebar == null) return [];
	path = ensureStartingSlash(path);
	const dir = Object.keys(_sidebar).sort((a, b) => {
		return b.split("/").length - a.split("/").length;
	}).find((dir) => {
		return path.startsWith(ensureStartingSlash(dir));
	});
	const sidebar = dir ? _sidebar[dir] : [];
	return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
/**
* Get or generate sidebar group from the given sidebar items.
*/
function getSidebarGroups(sidebar) {
	const groups = [];
	let lastGroupIndex = 0;
	for (const index in sidebar) {
		const item = sidebar[index];
		if (item.items) {
			lastGroupIndex = groups.push(item);
			continue;
		}
		if (!groups[lastGroupIndex]) groups.push({ items: [] });
		groups[lastGroupIndex].items.push(item);
	}
	return groups;
}
function getFlatSideBarLinks(sidebar) {
	const links = [];
	function recursivelyExtractLinks(items) {
		for (const item of items) {
			if (item.text && item.link) links.push({
				text: item.text,
				link: item.link,
				docFooterText: item.docFooterText,
				rel: item.rel,
				target: item.target
			});
			if (item.items) recursivelyExtractLinks(item.items);
		}
	}
	recursivelyExtractLinks(sidebar);
	return links;
}
/**
* Check if the given sidebar item contains any active link.
*/
function hasActiveLink(path, hash, items) {
	if (Array.isArray(items)) return items.some((item) => hasActiveLink(path, hash, item));
	if (items.link && isActive(path, hash, items.link)) return true;
	if (items.items) return hasActiveLink(path, hash, items.items);
	return false;
}
function addBase(items, _base) {
	return [...items].map((_item) => {
		const item = { ..._item };
		const base = item.base || _base;
		if (base && item.link && !isExternal(item.link)) item.link = base + item.link.replace(/^\//, base.endsWith("/") ? "" : "/");
		if (item.items) item.items = addBase(item.items, base);
		return item;
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/aside.js
function useAside() {
	const { hasSidebar } = useLayout();
	const is960 = useMediaQuery("(min-width: 960px)");
	const is1280 = useMediaQuery("(min-width: 1280px)");
	return { isAsideEnabled: computed(() => {
		if (!is1280.value && !is960.value) return false;
		return hasSidebar.value ? is1280.value : is960.value;
	}) };
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/outline.js
var ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
var resolvedHeaders = [];
function resolveTitle(theme) {
	return typeof theme.outline === "object" && !Array.isArray(theme.outline) && theme.outline.label || "On this page";
}
function getHeaders(range) {
	return resolveHeaders([...document.querySelectorAll(".VPDoc h1, .VPDoc h2, .VPDoc h3, .VPDoc h4, .VPDoc h5, .VPDoc h6")].filter((el) => el.id && el.hasChildNodes()).map((el) => {
		const level = Number(el.tagName[1]);
		return {
			element: el,
			title: serializeHeader(el),
			link: "#" + el.id,
			level
		};
	}), range);
}
function serializeHeader(h) {
	let ret = "";
	for (const node of h.childNodes) if (node.nodeType === 1) {
		if (ignoreRE.test(node.className)) continue;
		ret += node.textContent;
	} else if (node.nodeType === 3) ret += node.textContent;
	return ret.trim();
}
function resolveHeaders(headers, range) {
	if (range === false) return [];
	const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
	const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
	return buildTree(headers, high, low);
}
function useActiveAnchor(container, marker) {
	const { isAsideEnabled } = useAside();
	const onScroll = throttleAndDebounce(setActiveLink, 100);
	let prevActiveLink = null;
	let ignoreScrollOnce = false;
	onMounted(() => {
		requestAnimationFrame(setActiveLink);
		window.addEventListener("scroll", onScroll);
		container.value.addEventListener("click", onClick);
	});
	onUpdated(() => {
		activateLink(location.hash);
	});
	onUnmounted(() => {
		window.removeEventListener("scroll", onScroll);
	});
	function onClick(e) {
		if (!isAsideEnabled.value) return;
		const hash = e.target instanceof Element ? e.target.closest("a")?.hash : null;
		if (hash) {
			ignoreScrollOnce = true;
			activateLink(hash);
		}
	}
	function setActiveLink() {
		if (!isAsideEnabled.value) return;
		if (ignoreScrollOnce) {
			ignoreScrollOnce = false;
			return;
		}
		const scrollY = window.scrollY;
		const innerHeight = window.innerHeight;
		const offsetHeight = document.body.offsetHeight;
		const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
		const headers = resolvedHeaders.map(({ element, link }) => ({
			link,
			top: getAbsoluteTop(element),
			scrollMarginTop: Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0
		})).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
		if (!headers.length) {
			activateLink(null);
			return;
		}
		if (scrollY < 1) {
			activateLink(null);
			return;
		}
		if (isBottom) {
			activateLink(headers[headers.length - 1].link);
			return;
		}
		let activeLink = null;
		for (const { link, top, scrollMarginTop } of headers) {
			if (top > scrollY + scrollMarginTop + 4) break;
			activeLink = link;
		}
		activateLink(activeLink);
	}
	function activateLink(hash) {
		if (prevActiveLink) prevActiveLink.classList.remove("active");
		if (hash == null) prevActiveLink = null;
		else prevActiveLink = container.value.querySelector(`a[href$="${decodeURIComponent(hash)}"]`);
		const activeLink = prevActiveLink;
		if (activeLink) {
			activeLink.classList.add("active");
			marker.value.style.top = activeLink.offsetTop + 39 + "px";
			marker.value.style.opacity = "1";
		} else {
			marker.value.style.top = "33px";
			marker.value.style.opacity = "0";
		}
	}
}
function getAbsoluteTop(element) {
	let offsetTop = 0;
	while (element !== document.body) {
		if (element === null) return NaN;
		offsetTop += element.offsetTop;
		element = element.offsetParent;
	}
	return offsetTop;
}
function buildTree(data, min, max) {
	resolvedHeaders.length = 0;
	const result = [];
	const stack = [];
	data.forEach((item) => {
		const node = {
			...item,
			children: []
		};
		let parent = stack[stack.length - 1];
		while (parent && parent.level >= node.level) {
			stack.pop();
			parent = stack[stack.length - 1];
		}
		if (node.element.classList.contains("ignore-header") || parent && "shouldIgnore" in parent) {
			stack.push({
				level: node.level,
				shouldIgnore: true
			});
			return;
		}
		if (node.level > max || node.level < min) return;
		resolvedHeaders.push({
			element: node.element,
			link: node.link
		});
		if (parent) parent.children.push(node);
		else result.push(node);
		stack.push(node);
	});
	return result;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/sidebar.js
var isOpen = ref(false);
/**
* a11y: cache the element that opened the Sidebar (the menu button) then
* focus that button again when Menu is closed with Escape key.
*/
function useCloseSidebarOnEscape(close) {
	let triggerElement;
	watchEffect(() => {
		triggerElement = isOpen.value ? document.activeElement : void 0;
	});
	onMounted(() => {
		window.addEventListener("keyup", onEscape);
	});
	onUnmounted(() => {
		window.removeEventListener("keyup", onEscape);
	});
	function onEscape(e) {
		if (e.key === "Escape" && isOpen.value) {
			close();
			triggerElement?.focus();
		}
	}
}
function useSidebarControl() {
	function open() {
		isOpen.value = true;
	}
	function close() {
		isOpen.value = false;
	}
	function toggle() {
		isOpen.value ? close() : open();
	}
	return {
		isOpen,
		open,
		close,
		toggle
	};
}
function useSidebarItemControl(item) {
	const route = useRoute();
	const collapsed = ref(false);
	const collapsible = computed(() => {
		return item.value.collapsed != null;
	});
	const isLink = computed(() => {
		return !!item.value.link;
	});
	const isActiveLink = ref(false);
	const hasActiveLink$1 = ref(false);
	function updateActiveLink() {
		if (item.value.link) isActiveLink.value = isActive(route.data.relativePath, route.hash, item.value.link);
		else isActiveLink.value = false;
		if (isActiveLink.value) {
			hasActiveLink$1.value = true;
			nextTick(() => collapsed.value = false);
			return;
		}
		if (!item.value.items) {
			hasActiveLink$1.value = false;
			return;
		}
		hasActiveLink$1.value = hasActiveLink(route.data.relativePath, route.hash, item.value.items);
		if (hasActiveLink$1.value) nextTick(() => collapsed.value = false);
	}
	watch([item, route], updateActiveLink);
	onMounted(updateActiveLink);
	const hasChildren = computed(() => {
		return !!(item.value.items && item.value.items.length);
	});
	watchEffect(() => {
		collapsed.value = !!(collapsible.value && item.value.collapsed);
	});
	function toggle() {
		if (collapsible.value) collapsed.value = !collapsed.value;
	}
	return {
		collapsed,
		collapsible,
		isLink,
		isActiveLink,
		hasActiveLink: hasActiveLink$1,
		hasChildren,
		toggle
	};
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/layout.js
var headers = shallowRef([]);
var sidebar = shallowRef([]);
var is960 = shallowRef(false);
function useLayout() {
	const { frontmatter, theme } = useData();
	const isHome = computed(() => {
		return !!(frontmatter.value.isHome ?? frontmatter.value.layout === "home");
	});
	const hasSidebar = computed(() => {
		return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && !isHome.value;
	});
	const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
	const sidebarGroups = computed(() => {
		return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
	});
	const hasAside = computed(() => {
		if (isHome.value) return false;
		if (frontmatter.value.aside != null) return !!frontmatter.value.aside;
		return theme.value.aside !== false;
	});
	const leftAside = computed(() => {
		if (!hasAside.value) return false;
		return frontmatter.value.aside == null ? theme.value.aside === "left" : frontmatter.value.aside === "left";
	});
	const hasLocalNav = computed(() => {
		return headers.value.length > 0;
	});
	return {
		isHome,
		sidebar: shallowReadonly(sidebar),
		sidebarGroups,
		hasSidebar,
		isSidebarEnabled,
		hasAside,
		leftAside,
		headers: shallowReadonly(headers),
		hasLocalNav
	};
}
function registerWatchers({ closeSidebar }) {
	const { theme, page, frontmatter } = useData();
	watch(() => [page.value.relativePath, theme.value.sidebar], ([relativePath, sidebarConfig]) => {
		const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
		if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) sidebar.value = newSidebar;
	}, {
		immediate: true,
		deep: true,
		flush: "sync"
	});
	onContentUpdated(() => {
		headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
	});
	if (inBrowser) {
		is960.value = window.innerWidth >= 960;
		window.addEventListener("resize", () => {
			is960.value = window.innerWidth >= 960;
		}, { passive: true });
	}
	const route = useRoute();
	watch(() => route.path, closeSidebar);
	watch(is960, closeSidebar);
	useCloseSidebarOnEscape(closeSidebar);
}
var layoutInfoInjectionKey = Symbol("layout-info");
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue?vue&type=script&setup=true&lang.ts
var VPDocAsideCarbonAds_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocAsideCarbonAds",
	__ssrInlineRender: true,
	props: { carbonAds: {} },
	setup(__props) {
		const VPCarbonAds = () => null;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideCarbonAds" }, _attrs))}>`);
			_push(ssrRenderComponent(unref(VPCarbonAds), { "carbon-ads": __props.carbonAds }, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue
var _sfc_setup$79 = VPDocAsideCarbonAds_vue_vue_type_script_setup_true_lang_default.setup;
VPDocAsideCarbonAds_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue");
	return _sfc_setup$79 ? _sfc_setup$79(props, ctx) : void 0;
};
var VPDocAsideCarbonAds_default = VPDocAsideCarbonAds_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue?vue&type=script&setup=true&lang.ts
var VPDocOutlineItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocOutlineItem",
	__ssrInlineRender: true,
	props: {
		headers: {},
		root: { type: Boolean }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
			_push(`<ul${ssrRenderAttrs(mergeProps({ class: ["VPDocOutlineItem", __props.root ? "root" : "nested"] }, _attrs))} data-v-1ce71065><!--[-->`);
			ssrRenderList(__props.headers, ({ children, link, title }) => {
				_push(`<li data-v-1ce71065><a class="outline-link"${ssrRenderAttr("href", link)}${ssrRenderAttr("title", title)} data-v-1ce71065>${ssrInterpolate(title)}</a>`);
				if (children?.length) _push(ssrRenderComponent(_component_VPDocOutlineItem, { headers: children }, null, _parent));
				else _push(`<!---->`);
				_push(`</li>`);
			});
			_push(`<!--]--></ul>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue
var _sfc_setup$78 = VPDocOutlineItem_vue_vue_type_script_setup_true_lang_default.setup;
VPDocOutlineItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue");
	return _sfc_setup$78 ? _sfc_setup$78(props, ctx) : void 0;
};
var VPDocOutlineItem_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDocOutlineItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1ce71065"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue?vue&type=script&setup=true&lang.ts
var VPDocAsideOutline_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocAsideOutline",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		const container = ref();
		const marker = ref();
		const { headers, hasLocalNav } = useLayout();
		useActiveAnchor(container, marker);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<nav${ssrRenderAttrs(mergeProps({
				"aria-labelledby": "doc-outline-aria-label",
				class: ["VPDocAsideOutline", { "has-outline": unref(hasLocalNav) }],
				ref_key: "container",
				ref: container
			}, _attrs))} data-v-208c587c><div class="content" data-v-208c587c><div class="outline-marker" data-v-208c587c></div><div aria-level="2" class="outline-title" id="doc-outline-aria-label" role="heading" data-v-208c587c>${ssrInterpolate(unref(resolveTitle)(unref(theme)))}</div>`);
			_push(ssrRenderComponent(VPDocOutlineItem_default, {
				headers: unref(headers),
				root: true
			}, null, _parent));
			_push(`</div></nav>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue
var _sfc_setup$77 = VPDocAsideOutline_vue_vue_type_script_setup_true_lang_default.setup;
VPDocAsideOutline_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue");
	return _sfc_setup$77 ? _sfc_setup$77(props, ctx) : void 0;
};
var VPDocAsideOutline_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDocAsideOutline_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-208c587c"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue?vue&type=script&setup=true&lang.ts
var VPDocAside_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocAside",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAside" }, _attrs))} data-v-62132652>`);
			ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
			_push(ssrRenderComponent(VPDocAsideOutline_default, null, null, _parent));
			ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
			_push(`<div class="spacer" data-v-62132652></div>`);
			ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent);
			if (unref(theme).carbonAds) _push(ssrRenderComponent(VPDocAsideCarbonAds_default, { "carbon-ads": unref(theme).carbonAds }, null, _parent));
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue
var _sfc_setup$76 = VPDocAside_vue_vue_type_script_setup_true_lang_default.setup;
VPDocAside_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue");
	return _sfc_setup$76 ? _sfc_setup$76(props, ctx) : void 0;
};
var VPDocAside_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDocAside_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-62132652"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/edit-link.js
function useEditLink() {
	const { theme, page } = useData();
	return computed(() => {
		const { text = "Edit this page", pattern = "" } = theme.value.editLink || {};
		let url;
		if (typeof pattern === "function") url = pattern(page.value);
		else url = pattern.replace(/:path/g, page.value.filePath);
		return {
			url,
			text
		};
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/prev-next.js
function usePrevNext() {
	const { theme, page, frontmatter } = useData();
	return computed(() => {
		const candidates = uniqBy(getFlatSideBarLinks(getSidebar(theme.value.sidebar, page.value.relativePath)), (link) => normalize(link.link));
		const index = candidates.findIndex((link) => {
			return isActive(page.value.relativePath, "", link.link, false, true);
		});
		const hidePrev = theme.value.docFooter?.prev === false && !frontmatter.value.prev || frontmatter.value.prev === false;
		const hideNext = theme.value.docFooter?.next === false && !frontmatter.value.next || frontmatter.value.next === false;
		return {
			prev: hidePrev ? void 0 : {
				text: (typeof frontmatter.value.prev === "string" ? frontmatter.value.prev : typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.text : void 0) ?? candidates[index - 1]?.docFooterText ?? candidates[index - 1]?.text,
				link: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.link : void 0) ?? candidates[index - 1]?.link,
				target: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.target : void 0) ?? candidates[index - 1]?.target,
				rel: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.rel : void 0) ?? candidates[index - 1]?.rel
			},
			next: hideNext ? void 0 : {
				text: (typeof frontmatter.value.next === "string" ? frontmatter.value.next : typeof frontmatter.value.next === "object" ? frontmatter.value.next.text : void 0) ?? candidates[index + 1]?.docFooterText ?? candidates[index + 1]?.text,
				link: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.link : void 0) ?? candidates[index + 1]?.link,
				target: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.target : void 0) ?? candidates[index + 1]?.target,
				rel: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.rel : void 0) ?? candidates[index + 1]?.rel
			}
		};
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue?vue&type=script&setup=true&lang.ts
var VPDocFooterLastUpdated_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocFooterLastUpdated",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, page, lang: pageLang } = useData();
		const { language: browserLang } = useNavigatorLanguage();
		const timeRef = useTemplateRef("timeRef");
		const date = computed(() => new Date(page.value.lastUpdated));
		const isoDatetime = computed(() => date.value.toISOString());
		const datetime = shallowRef("");
		onMounted(() => {
			watchEffect(() => {
				const lang = theme.value.lastUpdated?.formatOptions?.forceLocale ? pageLang.value : browserLang.value;
				datetime.value = new Intl.DateTimeFormat(lang, theme.value.lastUpdated?.formatOptions ?? {
					dateStyle: "medium",
					timeStyle: "medium"
				}).format(date.value);
				if (lang && pageLang.value !== lang) timeRef.value?.setAttribute("lang", lang);
				else timeRef.value?.removeAttribute("lang");
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<p${ssrRenderAttrs(mergeProps({ class: "VPLastUpdated" }, _attrs))} data-v-430c07b8>${ssrInterpolate(unref(theme).lastUpdated?.text || "Last updated")}: <time${ssrRenderAttr("datetime", isoDatetime.value)} data-v-430c07b8>${ssrInterpolate(datetime.value)}</time></p>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue
var _sfc_setup$75 = VPDocFooterLastUpdated_vue_vue_type_script_setup_true_lang_default.setup;
VPDocFooterLastUpdated_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue");
	return _sfc_setup$75 ? _sfc_setup$75(props, ctx) : void 0;
};
var VPDocFooterLastUpdated_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDocFooterLastUpdated_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-430c07b8"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLink.vue?vue&type=script&setup=true&lang.ts
var VPLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPLink",
	__ssrInlineRender: true,
	props: {
		tag: {},
		href: {},
		noIcon: { type: Boolean },
		external: {
			type: Boolean,
			default: void 0
		},
		target: {},
		rel: {}
	},
	setup(__props) {
		const props = __props;
		const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
		const isExternal = computed(() => isLinkExternal(props.href, props.target, props.external));
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tag.value), mergeProps({
				class: ["VPLink", {
					link: __props.href,
					"vp-external-link-icon": isExternal.value,
					"no-icon": __props.noIcon
				}],
				href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
				target: __props.target ?? (isExternal.value ? "_blank" : void 0),
				rel: __props.rel ?? (isExternal.value ? "noreferrer" : void 0)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}), _parent);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLink.vue
var _sfc_setup$74 = VPLink_vue_vue_type_script_setup_true_lang_default.setup;
VPLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue");
	return _sfc_setup$74 ? _sfc_setup$74(props, ctx) : void 0;
};
var VPLink_default = VPLink_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue?vue&type=script&setup=true&lang.ts
var VPDocFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, page, frontmatter } = useData();
		const editLink = useEditLink();
		const control = usePrevNext();
		const hasEditLink = computed(() => theme.value.editLink && frontmatter.value.editLink !== false);
		const hasLastUpdated = computed(() => page.value.lastUpdated);
		const showFooter = computed(() => hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next);
		return (_ctx, _push, _parent, _attrs) => {
			if (showFooter.value) {
				_push(`<footer${ssrRenderAttrs(mergeProps({ class: "VPDocFooter" }, _attrs))} data-v-4f2a98af>`);
				ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
				if (hasEditLink.value || hasLastUpdated.value) {
					_push(`<div class="edit-info" data-v-4f2a98af>`);
					if (hasEditLink.value) {
						_push(`<div class="edit-link" data-v-4f2a98af>`);
						_push(ssrRenderComponent(VPLink_default, {
							class: "edit-link-button",
							href: unref(editLink).url,
							"no-icon": true
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="vpi-square-pen edit-link-icon" data-v-4f2a98af${_scopeId}></span> ${ssrInterpolate(unref(editLink).text)}`);
								else return [createVNode("span", { class: "vpi-square-pen edit-link-icon" }), createTextVNode(" " + toDisplayString(unref(editLink).text), 1)];
							}),
							_: 1
						}, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					if (hasLastUpdated.value) {
						_push(`<div class="last-updated" data-v-4f2a98af>`);
						_push(ssrRenderComponent(VPDocFooterLastUpdated_default, null, null, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				if (unref(control).prev?.link || unref(control).next?.link) {
					_push(`<nav class="prev-next" aria-labelledby="doc-footer-aria-label" data-v-4f2a98af><span class="visually-hidden" id="doc-footer-aria-label" data-v-4f2a98af>Pager</span><div class="pager" data-v-4f2a98af>`);
					if (unref(control).prev?.link) _push(ssrRenderComponent(VPLink_default, {
						class: "pager-link prev",
						href: unref(control).prev.link,
						target: unref(control).prev.target,
						rel: unref(control).prev.rel
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span class="desc" data-v-4f2a98af${_scopeId}>${(unref(theme).docFooter?.prev || "Previous page") ?? ""}</span><span class="title" data-v-4f2a98af${_scopeId}>${unref(control).prev.text ?? ""}</span>`);
							else return [createVNode("span", {
								class: "desc",
								innerHTML: unref(theme).docFooter?.prev || "Previous page"
							}, null, 8, ["innerHTML"]), createVNode("span", {
								class: "title",
								innerHTML: unref(control).prev.text
							}, null, 8, ["innerHTML"])];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`</div><div class="pager" data-v-4f2a98af>`);
					if (unref(control).next?.link) _push(ssrRenderComponent(VPLink_default, {
						class: "pager-link next",
						href: unref(control).next.link,
						target: unref(control).next.target,
						rel: unref(control).next.rel
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span class="desc" data-v-4f2a98af${_scopeId}>${(unref(theme).docFooter?.next || "Next page") ?? ""}</span><span class="title" data-v-4f2a98af${_scopeId}>${unref(control).next.text ?? ""}</span>`);
							else return [createVNode("span", {
								class: "desc",
								innerHTML: unref(theme).docFooter?.next || "Next page"
							}, null, 8, ["innerHTML"]), createVNode("span", {
								class: "title",
								innerHTML: unref(control).next.text
							}, null, 8, ["innerHTML"])];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`</div></nav>`);
				} else _push(`<!---->`);
				_push(`</footer>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue
var _sfc_setup$73 = VPDocFooter_vue_vue_type_script_setup_true_lang_default.setup;
VPDocFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue");
	return _sfc_setup$73 ? _sfc_setup$73(props, ctx) : void 0;
};
var VPDocFooter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDocFooter_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-4f2a98af"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue?vue&type=script&setup=true&lang.ts
var VPDoc_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDoc",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		const route = useRoute();
		const { hasSidebar, hasAside, leftAside } = useLayout();
		const pageName = computed(() => route.path.replace(/[./]+/g, "_").replace(/_html$/, ""));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Content = resolveComponent("Content");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPDoc", {
				"has-sidebar": unref(hasSidebar),
				"has-aside": unref(hasAside)
			}] }, _attrs))} data-v-d2ed57e1>`);
			ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent);
			_push(`<div class="container" data-v-d2ed57e1>`);
			if (unref(hasAside)) {
				_push(`<div class="${ssrRenderClass([{ "left-aside": unref(leftAside) }, "aside"])}" data-v-d2ed57e1><div class="aside-curtain" data-v-d2ed57e1></div><div class="aside-container" data-v-d2ed57e1><div class="aside-content" data-v-d2ed57e1>`);
				_push(ssrRenderComponent(VPDocAside_default, null, {
					"aside-top": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)];
					}),
					"aside-bottom": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)];
					}),
					"aside-outline-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)];
					}),
					"aside-outline-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)];
					}),
					"aside-ads-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)];
					}),
					"aside-ads-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(`</div></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="content" data-v-d2ed57e1><div class="content-container" data-v-d2ed57e1>`);
			ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent);
			_push(`<main class="main" data-v-d2ed57e1>`);
			_push(ssrRenderComponent(_component_Content, { class: ["vp-doc", [pageName.value, unref(theme).externalLinkIcon && "external-link-icon-enabled"]] }, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(VPDocFooter_default, null, {
				"doc-footer-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent);
			_push(`</div></div></div>`);
			ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue
var _sfc_setup$72 = VPDoc_vue_vue_type_script_setup_true_lang_default.setup;
VPDoc_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue");
	return _sfc_setup$72 ? _sfc_setup$72(props, ctx) : void 0;
};
var VPDoc_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDoc_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d2ed57e1"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue?vue&type=script&setup=true&lang.ts
var VPHomeContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeContent",
	__ssrInlineRender: true,
	setup(__props) {
		const { width: vw } = useWindowSize({
			initialWidth: 0,
			includeScrollbar: false
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "vp-doc container",
				style: unref(vw) ? { "--vp-offset": `calc(50% - ${unref(vw) / 2}px)` } : {},
				"data-allow-mismatch": "style"
			}, _attrs))} data-v-19aa779d>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue
var _sfc_setup$71 = VPHomeContent_vue_vue_type_script_setup_true_lang_default.setup;
VPHomeContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue");
	return _sfc_setup$71 ? _sfc_setup$71(props, ctx) : void 0;
};
var VPHomeContent_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHomeContent_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-19aa779d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPImage.vue?vue&type=script&setup=true&lang.ts
var VPImage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	inheritAttrs: false,
	__name: "VPImage",
	__ssrInlineRender: true,
	props: {
		image: {},
		alt: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_VPImage = resolveComponent("VPImage", true);
			if (__props.image) {
				_push(`<!--[-->`);
				if (typeof __props.image === "string" || "src" in __props.image) _push(`<img${ssrRenderAttrs(mergeProps({ class: "VPImage" }, typeof __props.image === "string" ? _ctx.$attrs : {
					...__props.image,
					..._ctx.$attrs
				}, {
					src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
					alt: __props.alt ?? (typeof __props.image === "string" ? "" : __props.image.alt || "")
				}))} data-v-e7da9998>`);
				else {
					_push(`<!--[-->`);
					_push(ssrRenderComponent(_component_VPImage, mergeProps({
						class: "dark",
						image: __props.image.dark,
						alt: __props.image.alt
					}, _ctx.$attrs), null, _parent));
					_push(ssrRenderComponent(_component_VPImage, mergeProps({
						class: "light",
						image: __props.image.light,
						alt: __props.image.alt
					}, _ctx.$attrs), null, _parent));
					_push(`<!--]-->`);
				}
				_push(`<!--]-->`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPImage.vue
var _sfc_setup$70 = VPImage_vue_vue_type_script_setup_true_lang_default.setup;
VPImage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue");
	return _sfc_setup$70 ? _sfc_setup$70(props, ctx) : void 0;
};
var VPImage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPImage_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e7da9998"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue?vue&type=script&setup=true&lang.ts
var VPFeature_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPFeature",
	__ssrInlineRender: true,
	props: {
		icon: {},
		title: {},
		details: {},
		link: {},
		linkText: {},
		rel: {},
		target: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPLink_default, mergeProps({
				class: "VPFeature",
				href: __props.link,
				rel: __props.rel,
				target: __props.target,
				"no-icon": true,
				tag: __props.link ? "a" : "div"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<article class="box" data-v-e5511d04${_scopeId}>`);
						if (typeof __props.icon === "object" && __props.icon.wrap) {
							_push(`<div class="icon" data-v-e5511d04${_scopeId}>`);
							_push(ssrRenderComponent(VPImage_default, {
								image: __props.icon,
								alt: __props.icon.alt,
								height: __props.icon.height || 48,
								width: __props.icon.width || 48
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (typeof __props.icon === "object") _push(ssrRenderComponent(VPImage_default, {
							image: __props.icon,
							alt: __props.icon.alt,
							height: __props.icon.height || 48,
							width: __props.icon.width || 48
						}, null, _parent, _scopeId));
						else if (__props.icon) _push(`<div class="icon" data-v-e5511d04${_scopeId}>${__props.icon ?? ""}</div>`);
						else _push(`<!---->`);
						_push(`<h2 class="title" data-v-e5511d04${_scopeId}>${__props.title ?? ""}</h2>`);
						if (Array.isArray(__props.details)) {
							_push(`<ul class="details" data-v-e5511d04${_scopeId}><!--[-->`);
							ssrRenderList(__props.details, (item) => {
								_push(`<li data-v-e5511d04${_scopeId}>${item ?? ""}</li>`);
							});
							_push(`<!--]--></ul>`);
						} else if (__props.details) _push(`<p class="details" data-v-e5511d04${_scopeId}>${__props.details ?? ""}</p>`);
						else _push(`<!---->`);
						if (__props.linkText) _push(`<div class="link-text" data-v-e5511d04${_scopeId}><p class="link-text-value" data-v-e5511d04${_scopeId}>${ssrInterpolate(__props.linkText)} <span class="vpi-arrow-right link-text-icon" data-v-e5511d04${_scopeId}></span></p></div>`);
						else _push(`<!---->`);
						_push(`</article>`);
					} else return [createVNode("article", { class: "box" }, [
						typeof __props.icon === "object" && __props.icon.wrap ? (openBlock(), createBlock("div", {
							key: 0,
							class: "icon"
						}, [createVNode(VPImage_default, {
							image: __props.icon,
							alt: __props.icon.alt,
							height: __props.icon.height || 48,
							width: __props.icon.width || 48
						}, null, 8, [
							"image",
							"alt",
							"height",
							"width"
						])])) : typeof __props.icon === "object" ? (openBlock(), createBlock(VPImage_default, {
							key: 1,
							image: __props.icon,
							alt: __props.icon.alt,
							height: __props.icon.height || 48,
							width: __props.icon.width || 48
						}, null, 8, [
							"image",
							"alt",
							"height",
							"width"
						])) : __props.icon ? (openBlock(), createBlock("div", {
							key: 2,
							class: "icon",
							innerHTML: __props.icon
						}, null, 8, ["innerHTML"])) : createCommentVNode("", true),
						createVNode("h2", {
							class: "title",
							innerHTML: __props.title
						}, null, 8, ["innerHTML"]),
						Array.isArray(__props.details) ? (openBlock(), createBlock("ul", {
							key: 3,
							class: "details"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.details, (item) => {
							return openBlock(), createBlock("li", {
								key: item,
								innerHTML: item
							}, null, 8, ["innerHTML"]);
						}), 128))])) : __props.details ? (openBlock(), createBlock("p", {
							key: 4,
							class: "details",
							innerHTML: __props.details
						}, null, 8, ["innerHTML"])) : createCommentVNode("", true),
						__props.linkText ? (openBlock(), createBlock("div", {
							key: 5,
							class: "link-text"
						}, [createVNode("p", { class: "link-text-value" }, [createTextVNode(toDisplayString(__props.linkText) + " ", 1), createVNode("span", { class: "vpi-arrow-right link-text-icon" })])])) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue
var _sfc_setup$69 = VPFeature_vue_vue_type_script_setup_true_lang_default.setup;
VPFeature_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue");
	return _sfc_setup$69 ? _sfc_setup$69(props, ctx) : void 0;
};
var VPFeature_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPFeature_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e5511d04"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue?vue&type=script&setup=true&lang.ts
var VPFeatures_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPFeatures",
	__ssrInlineRender: true,
	props: { features: {} },
	setup(__props) {
		const props = __props;
		const grid = computed(() => {
			const length = props.features.length;
			if (!length) return;
			else if (length === 2) return "grid-2";
			else if (length === 3) return "grid-3";
			else if (length % 3 === 0) return "grid-6";
			else if (length > 3) return "grid-4";
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.features) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPFeatures" }, _attrs))} data-v-bb74c475><div class="container" data-v-bb74c475><ul class="items" data-v-bb74c475><!--[-->`);
				ssrRenderList(__props.features, (feature) => {
					_push(`<li class="${ssrRenderClass([[grid.value], "item"])}" data-v-bb74c475>`);
					_push(ssrRenderComponent(VPFeature_default, {
						icon: feature.icon,
						title: feature.title,
						details: feature.details,
						link: feature.link,
						"link-text": feature.linkText,
						rel: feature.rel,
						target: feature.target
					}, null, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue
var _sfc_setup$68 = VPFeatures_vue_vue_type_script_setup_true_lang_default.setup;
VPFeatures_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue");
	return _sfc_setup$68 ? _sfc_setup$68(props, ctx) : void 0;
};
var VPFeatures_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPFeatures_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bb74c475"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue?vue&type=script&setup=true&lang.ts
var VPHomeFeatures_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeFeatures",
	__ssrInlineRender: true,
	setup(__props) {
		const { frontmatter: fm } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(fm).features) _push(ssrRenderComponent(VPFeatures_default, mergeProps({
				class: "VPHomeFeatures",
				features: unref(fm).features
			}, _attrs), null, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue
var _sfc_setup$67 = VPHomeFeatures_vue_vue_type_script_setup_true_lang_default.setup;
VPHomeFeatures_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue");
	return _sfc_setup$67 ? _sfc_setup$67(props, ctx) : void 0;
};
var VPHomeFeatures_default = VPHomeFeatures_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPButton.vue?vue&type=script&setup=true&lang.ts
var VPButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPButton",
	__ssrInlineRender: true,
	props: {
		tag: {},
		size: { default: "medium" },
		theme: { default: "brand" },
		text: {},
		href: {},
		target: {},
		rel: {}
	},
	setup(__props) {
		const props = __props;
		const isExternal = computed(() => props.href && EXTERNAL_URL_RE.test(props.href));
		const component = computed(() => {
			return props.tag || (props.href ? "a" : "button");
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
				class: ["VPButton", [__props.size, __props.theme]],
				href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
				target: props.target ?? (isExternal.value ? "_blank" : void 0),
				rel: props.rel ?? (isExternal.value ? "noreferrer" : void 0)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push(`${ssrInterpolate(__props.text)}`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.text), 1)], true)];
				}),
				_: 3
			}), _parent);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPButton.vue
var _sfc_setup$66 = VPButton_vue_vue_type_script_setup_true_lang_default.setup;
VPButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue");
	return _sfc_setup$66 ? _sfc_setup$66(props, ctx) : void 0;
};
var VPButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b8c35b0d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHero.vue?vue&type=script&setup=true&lang.ts
var VPHero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHero",
	__ssrInlineRender: true,
	props: {
		name: {},
		text: {},
		tagline: {},
		image: {},
		actions: {}
	},
	setup(__props) {
		const { heroImageSlotExists } = inject(layoutInfoInjectionKey, { heroImageSlotExists: computed(() => false) });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPHero", { "has-image": __props.image || unref(heroImageSlotExists) }] }, _attrs))} data-v-e62e4946><div class="container" data-v-e62e4946><div class="main" data-v-e62e4946>`);
			ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, () => {
				_push(`<h1 class="heading" data-v-e62e4946>`);
				if (__props.name) _push(`<span class="name clip" data-v-e62e4946>${__props.name ?? ""}</span>`);
				else _push(`<!---->`);
				if (__props.text) _push(`<span class="text" data-v-e62e4946>${__props.text ?? ""}</span>`);
				else _push(`<!---->`);
				_push(`</h1>`);
				if (__props.tagline) _push(`<p class="tagline" data-v-e62e4946>${__props.tagline ?? ""}</p>`);
				else _push(`<!---->`);
			}, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent);
			if (__props.actions) {
				_push(`<div class="actions" data-v-e62e4946>`);
				ssrRenderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, null, _push, _parent);
				_push(`<!--[-->`);
				ssrRenderList(__props.actions, (action) => {
					_push(`<div class="action" data-v-e62e4946>`);
					_push(ssrRenderComponent(VPButton_default, {
						tag: "a",
						size: "medium",
						theme: action.theme,
						text: action.text,
						href: action.link,
						target: action.target,
						rel: action.rel
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent);
			_push(`</div>`);
			if (__props.image || unref(heroImageSlotExists)) {
				_push(`<div class="image" data-v-e62e4946><div class="image-container" data-v-e62e4946><div class="image-bg" data-v-e62e4946></div>`);
				ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, () => {
					if (__props.image) _push(ssrRenderComponent(VPImage_default, {
						class: "image-src",
						image: __props.image
					}, null, _parent));
					else _push(`<!---->`);
				}, _push, _parent);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHero.vue
var _sfc_setup$65 = VPHero_vue_vue_type_script_setup_true_lang_default.setup;
VPHero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHero.vue");
	return _sfc_setup$65 ? _sfc_setup$65(props, ctx) : void 0;
};
var VPHero_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHero_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e62e4946"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue?vue&type=script&setup=true&lang.ts
var VPHomeHero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeHero",
	__ssrInlineRender: true,
	setup(__props) {
		const { frontmatter: fm } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(fm).hero) _push(ssrRenderComponent(VPHero_default, mergeProps({
				class: "VPHomeHero",
				name: unref(fm).hero.name,
				text: unref(fm).hero.text,
				tagline: unref(fm).hero.tagline,
				image: unref(fm).hero.image,
				actions: unref(fm).hero.actions
			}, _attrs), {
				"home-hero-info-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-before")];
				}),
				"home-hero-info": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info")];
				}),
				"home-hero-info-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-after")];
				}),
				"home-hero-actions-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-after")];
				}),
				"home-hero-actions-before-actions": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-before-actions")];
				}),
				"home-hero-image": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-image")];
				}),
				_: 3
			}, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue
var _sfc_setup$64 = VPHomeHero_vue_vue_type_script_setup_true_lang_default.setup;
VPHomeHero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue");
	return _sfc_setup$64 ? _sfc_setup$64(props, ctx) : void 0;
};
var VPHomeHero_default = VPHomeHero_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHome.vue?vue&type=script&setup=true&lang.ts
var VPHome_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHome",
	__ssrInlineRender: true,
	setup(__props) {
		const { frontmatter, theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Content = resolveComponent("Content");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPHome", { "external-link-icon-enabled": unref(theme).externalLinkIcon }] }, _attrs))} data-v-2862d62e>`);
			ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent);
			_push(ssrRenderComponent(VPHomeHero_default, null, {
				"home-hero-info-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)];
				}),
				"home-hero-info": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)];
				}),
				"home-hero-info-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)];
				}),
				"home-hero-actions-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)];
				}),
				"home-hero-actions-before-actions": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, void 0, true)];
				}),
				"home-hero-image": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent);
			_push(ssrRenderComponent(VPHomeFeatures_default, null, null, _parent));
			ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent);
			if (unref(frontmatter).markdownStyles !== false) _push(ssrRenderComponent(VPHomeContent_default, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_Content, null, null, _parent, _scopeId));
					else return [createVNode(_component_Content)];
				}),
				_: 1
			}, _parent));
			else _push(ssrRenderComponent(_component_Content, null, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHome.vue
var _sfc_setup$63 = VPHome_vue_vue_type_script_setup_true_lang_default.setup;
VPHome_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHome.vue");
	return _sfc_setup$63 ? _sfc_setup$63(props, ctx) : void 0;
};
var VPHome_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHome_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2862d62e"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPPage.vue
var _sfc_main$18 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
	const _component_Content = resolveComponent("Content");
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPPage" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent);
	_push(ssrRenderComponent(_component_Content, null, null, _parent));
	ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent);
	_push(`</div>`);
}
var _sfc_setup$62 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPPage.vue");
	return _sfc_setup$62 ? _sfc_setup$62(props, ctx) : void 0;
};
var VPPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$18, [["ssrRender", _sfc_ssrRender$2]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPContent.vue?vue&type=script&setup=true&lang.ts
var VPContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPContent",
	__ssrInlineRender: true,
	setup(__props) {
		const { page, frontmatter } = useData();
		const { isHome, hasSidebar } = useLayout();
		function isRegistered(component) {
			return typeof resolveDynamicComponent(component) !== "string";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: ["VPContent", {
					"has-sidebar": unref(hasSidebar),
					"is-home": unref(isHome)
				}],
				id: "VPContent"
			}, _attrs))} data-v-7948e71f>`);
			if (unref(page).isNotFound) ssrRenderSlot(_ctx.$slots, "not-found", {}, () => {
				_push(ssrRenderComponent(NotFound_default, null, null, _parent));
			}, _push, _parent);
			else if (unref(frontmatter).layout === "page" && !isRegistered("page")) _push(ssrRenderComponent(VPPage_default, null, {
				"page-top": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "page-top", {}, void 0, true)];
				}),
				"page-bottom": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			else if (unref(frontmatter).layout === "home" && !isRegistered("home")) _push(ssrRenderComponent(VPHome_default, null, {
				"home-hero-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)];
				}),
				"home-hero-info-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)];
				}),
				"home-hero-info": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)];
				}),
				"home-hero-info-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)];
				}),
				"home-hero-actions-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)];
				}),
				"home-hero-actions-before-actions": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, void 0, true)];
				}),
				"home-hero-image": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)];
				}),
				"home-hero-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)];
				}),
				"home-features-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)];
				}),
				"home-features-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			else if ((!unref(frontmatter).layout || unref(frontmatter).layout === "doc") && !isRegistered("doc")) _push(ssrRenderComponent(VPDoc_default, null, {
				"doc-top": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)];
				}),
				"doc-bottom": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)];
				}),
				"doc-footer-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)];
				}),
				"doc-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)];
				}),
				"doc-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)];
				}),
				"aside-top": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)];
				}),
				"aside-outline-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)];
				}),
				"aside-outline-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)];
				}),
				"aside-ads-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)];
				}),
				"aside-ads-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)];
				}),
				"aside-bottom": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			else ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(frontmatter).layout || "doc"), null, null), _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPContent.vue
var _sfc_setup$61 = VPContent_vue_vue_type_script_setup_true_lang_default.setup;
VPContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue");
	return _sfc_setup$61 ? _sfc_setup$61(props, ctx) : void 0;
};
var VPContent_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPContent_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7948e71f"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue?vue&type=script&setup=true&lang.ts
var VPFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, frontmatter } = useData();
		const { hasSidebar } = useLayout();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(theme).footer && unref(frontmatter).footer !== false) {
				_push(`<footer${ssrRenderAttrs(mergeProps({ class: ["VPFooter", { "has-sidebar": unref(hasSidebar) }] }, _attrs))} data-v-c3855bb3><div class="container" data-v-c3855bb3>`);
				if (unref(theme).footer.message) _push(`<p class="message" data-v-c3855bb3>${unref(theme).footer.message ?? ""}</p>`);
				else _push(`<!---->`);
				if (unref(theme).footer.copyright) _push(`<p class="copyright" data-v-c3855bb3>${unref(theme).footer.copyright ?? ""}</p>`);
				else _push(`<!---->`);
				_push(`</div></footer>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue
var _sfc_setup$60 = VPFooter_vue_vue_type_script_setup_true_lang_default.setup;
VPFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue");
	return _sfc_setup$60 ? _sfc_setup$60(props, ctx) : void 0;
};
var VPFooter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPFooter_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c3855bb3"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue?vue&type=script&setup=true&lang.ts
var VPLocalNavOutlineDropdown_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPLocalNavOutlineDropdown",
	__ssrInlineRender: true,
	props: {
		headers: {},
		navHeight: {}
	},
	setup(__props) {
		const { theme } = useData();
		const open = ref(false);
		const vh = ref(0);
		const main = ref();
		ref();
		function closeOnClickOutside(e) {
			if (!main.value?.contains(e.target)) open.value = false;
		}
		watch(open, (value) => {
			if (value) {
				document.addEventListener("click", closeOnClickOutside);
				return;
			}
			document.removeEventListener("click", closeOnClickOutside);
		});
		onKeyStroke("Escape", () => {
			open.value = false;
		});
		onContentUpdated(() => {
			open.value = false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "main",
				ref: main,
				class: "VPLocalNavOutlineDropdown",
				style: { "--vp-vh": vh.value + "px" },
				"data-allow-mismatch": "style"
			}, _attrs))} data-v-0c4290fe>`);
			if (__props.headers.length > 0) _push(`<button class="${ssrRenderClass({ open: open.value })}" data-v-0c4290fe><span class="menu-text" data-v-0c4290fe>${ssrInterpolate(unref(resolveTitle)(unref(theme)))}</span><span class="vpi-chevron-right icon" data-v-0c4290fe></span></button>`);
			else _push(`<button data-v-0c4290fe>${ssrInterpolate(unref(theme).returnToTopLabel || "Return to top")}</button>`);
			if (open.value) {
				_push(`<div class="items" data-v-0c4290fe><div class="header" data-v-0c4290fe><a class="top-link" href="#" data-v-0c4290fe>${ssrInterpolate(unref(theme).returnToTopLabel || "Return to top")}</a></div><div class="outline" data-v-0c4290fe>`);
				_push(ssrRenderComponent(VPDocOutlineItem_default, { headers: __props.headers }, null, _parent));
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue
var _sfc_setup$59 = VPLocalNavOutlineDropdown_vue_vue_type_script_setup_true_lang_default.setup;
VPLocalNavOutlineDropdown_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue");
	return _sfc_setup$59 ? _sfc_setup$59(props, ctx) : void 0;
};
var VPLocalNavOutlineDropdown_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPLocalNavOutlineDropdown_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0c4290fe"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue?vue&type=script&setup=true&lang.ts
var VPLocalNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPLocalNav",
	__ssrInlineRender: true,
	props: { open: { type: Boolean } },
	emits: ["open-menu"],
	setup(__props) {
		const { theme } = useData();
		const { isHome, hasSidebar, headers, hasLocalNav } = useLayout();
		const { y } = useWindowScroll();
		const navHeight = ref(0);
		onMounted(() => {
			navHeight.value = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vp-nav-height"));
		});
		const classes = computed(() => {
			return {
				VPLocalNav: true,
				"has-sidebar": hasSidebar.value,
				empty: !hasLocalNav.value,
				fixed: !hasLocalNav.value && !hasSidebar.value
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (!unref(isHome) && (unref(hasLocalNav) || unref(hasSidebar) || unref(y) >= navHeight.value)) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: classes.value }, _attrs))} data-v-db738f89><div class="container" data-v-db738f89>`);
				if (unref(hasSidebar)) _push(`<button class="menu"${ssrRenderAttr("aria-expanded", __props.open)} aria-controls="VPSidebarNav" data-v-db738f89><span class="vpi-align-left menu-icon" data-v-db738f89></span><span class="menu-text" data-v-db738f89>${ssrInterpolate(unref(theme).sidebarMenuLabel || "Menu")}</span></button>`);
				else _push(`<!---->`);
				_push(ssrRenderComponent(VPLocalNavOutlineDropdown_default, {
					headers: unref(headers),
					navHeight: navHeight.value
				}, null, _parent));
				_push(`</div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue
var _sfc_setup$58 = VPLocalNav_vue_vue_type_script_setup_true_lang_default.setup;
VPLocalNav_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue");
	return _sfc_setup$58 ? _sfc_setup$58(props, ctx) : void 0;
};
var VPLocalNav_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPLocalNav_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-db738f89"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/nav.js
function useNav() {
	const isScreenOpen = ref(false);
	function openScreen() {
		isScreenOpen.value = true;
		window.addEventListener("resize", closeScreenOnTabletWindow);
	}
	function closeScreen() {
		isScreenOpen.value = false;
		window.removeEventListener("resize", closeScreenOnTabletWindow);
	}
	function toggleScreen() {
		isScreenOpen.value ? closeScreen() : openScreen();
	}
	/**
	* Close screen when the user resizes the window wider than tablet size.
	*/
	function closeScreenOnTabletWindow() {
		window.outerWidth >= 768 && closeScreen();
	}
	const route = useRoute();
	watch(() => route.path, closeScreen);
	return {
		isScreenOpen,
		openScreen,
		closeScreen,
		toggleScreen
	};
}
var navInjectionKey = Symbol("nav");
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue
var _sfc_main$17 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({
		class: "VPSwitch",
		type: "button",
		role: "switch"
	}, _attrs))} data-v-1d5665e3><span class="check" data-v-1d5665e3>`);
	if (_ctx.$slots.default) {
		_push(`<span class="icon" data-v-1d5665e3>`);
		ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
		_push(`</span>`);
	} else _push(`<!---->`);
	_push(`</span></button>`);
}
var _sfc_setup$57 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue");
	return _sfc_setup$57 ? _sfc_setup$57(props, ctx) : void 0;
};
var VPSwitch_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$17, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1d5665e3"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue?vue&type=script&setup=true&lang.ts
var VPSwitchAppearance_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSwitchAppearance",
	__ssrInlineRender: true,
	setup(__props) {
		const { isDark, theme } = useData();
		const toggleAppearance = inject("toggle-appearance", () => {
			isDark.value = !isDark.value;
		});
		const switchTitle = ref("");
		watchPostEffect(() => {
			switchTitle.value = isDark.value ? theme.value.lightModeSwitchTitle || "Switch to light theme" : theme.value.darkModeSwitchTitle || "Switch to dark theme";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPSwitch_default, mergeProps({
				title: switchTitle.value,
				class: "VPSwitchAppearance",
				"aria-checked": unref(isDark),
				onClick: unref(toggleAppearance)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="vpi-sun sun" data-v-5337faa4${_scopeId}></span><span class="vpi-moon moon" data-v-5337faa4${_scopeId}></span>`);
					else return [createVNode("span", { class: "vpi-sun sun" }), createVNode("span", { class: "vpi-moon moon" })];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue
var _sfc_setup$56 = VPSwitchAppearance_vue_vue_type_script_setup_true_lang_default.setup;
VPSwitchAppearance_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue");
	return _sfc_setup$56 ? _sfc_setup$56(props, ctx) : void 0;
};
var VPSwitchAppearance_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSwitchAppearance_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5337faa4"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue?vue&type=script&setup=true&lang.ts
var VPNavBarAppearance_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarAppearance",
	__ssrInlineRender: true,
	setup(__props) {
		const { site } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarAppearance" }, _attrs))} data-v-6c893767>`);
				_push(ssrRenderComponent(VPSwitchAppearance_default, null, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue
var _sfc_setup$55 = VPNavBarAppearance_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarAppearance_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue");
	return _sfc_setup$55 ? _sfc_setup$55(props, ctx) : void 0;
};
var VPNavBarAppearance_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarAppearance_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6c893767"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/flyout.js
var focusedElement = ref();
var active = false;
var listeners = 0;
function useFlyout(options) {
	const focus = ref(false);
	if (inBrowser) {
		!active && activateFocusTracking();
		listeners++;
		const unwatch = watch(focusedElement, (el) => {
			if (el === options.el.value || options.el.value?.contains(el)) {
				focus.value = true;
				options.onFocus?.();
			} else {
				focus.value = false;
				options.onBlur?.();
			}
		});
		onUnmounted(() => {
			unwatch();
			listeners--;
			if (!listeners) deactivateFocusTracking();
		});
	}
	return readonly(focus);
}
function activateFocusTracking() {
	document.addEventListener("focusin", handleFocusIn);
	active = true;
	focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
	document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
	focusedElement.value = document.activeElement;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue?vue&type=script&setup=true&lang.ts
var VPMenuLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	inheritAttrs: false,
	__name: "VPMenuLink",
	__ssrInlineRender: true,
	props: {
		item: {},
		rel: {}
	},
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const href = computed(() => typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link);
		const isActiveLink = computed(() => {
			return isActive(route.data.relativePath, route.hash, props.item.activeMatch || href.value, !!props.item.activeMatch);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuLink" }, _attrs))} data-v-62ce4597>`);
			_push(ssrRenderComponent(VPLink_default, mergeProps(_ctx.$attrs, {
				class: { active: isActiveLink.value },
				href: href.value,
				target: __props.item.target,
				rel: props.rel ?? __props.item.rel,
				"no-icon": __props.item.noIcon
			}), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-62ce4597${_scopeId}>${__props.item.text ?? ""}</span>`);
					else return [createVNode("span", { innerHTML: __props.item.text }, null, 8, ["innerHTML"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue
var _sfc_setup$54 = VPMenuLink_vue_vue_type_script_setup_true_lang_default.setup;
VPMenuLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue");
	return _sfc_setup$54 ? _sfc_setup$54(props, ctx) : void 0;
};
var VPMenuLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPMenuLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-62ce4597"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue?vue&type=script&setup=true&lang.ts
var VPMenuGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPMenuGroup",
	__ssrInlineRender: true,
	props: {
		text: {},
		items: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuGroup" }, _attrs))} data-v-1963e1bb>`);
			if (__props.text) _push(`<p class="title" data-v-1963e1bb>${ssrInterpolate(__props.text)}</p>`);
			else _push(`<!---->`);
			_push(`<!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(`<!--[-->`);
				if ("link" in item) _push(ssrRenderComponent(VPMenuLink_default, { item }, null, _parent));
				else _push(`<!---->`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue
var _sfc_setup$53 = VPMenuGroup_vue_vue_type_script_setup_true_lang_default.setup;
VPMenuGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue");
	return _sfc_setup$53 ? _sfc_setup$53(props, ctx) : void 0;
};
var VPMenuGroup_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPMenuGroup_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1963e1bb"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue?vue&type=script&setup=true&lang.ts
var VPMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPMenu",
	__ssrInlineRender: true,
	props: { items: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenu" }, _attrs))} data-v-f7257f43>`);
			if (__props.items) {
				_push(`<ul class="items" data-v-f7257f43><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<li data-v-f7257f43>`);
					if ("link" in item) _push(ssrRenderComponent(VPMenuLink_default, { item }, null, _parent));
					else if ("component" in item) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
					else _push(ssrRenderComponent(VPMenuGroup_default, {
						text: item.text,
						items: item.items
					}, null, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue
var _sfc_setup$52 = VPMenu_vue_vue_type_script_setup_true_lang_default.setup;
VPMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue");
	return _sfc_setup$52 ? _sfc_setup$52(props, ctx) : void 0;
};
var VPMenu_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPMenu_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f7257f43"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue?vue&type=script&setup=true&lang.ts
var VPFlyout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPFlyout",
	__ssrInlineRender: true,
	props: {
		icon: {},
		button: {},
		label: {},
		items: {}
	},
	setup(__props) {
		const open = ref(false);
		const el = ref();
		useFlyout({
			el,
			onBlur
		});
		function onBlur() {
			open.value = false;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "VPFlyout",
				ref_key: "el",
				ref: el
			}, _attrs))} data-v-42cb505d><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", __props.label)} data-v-42cb505d>`);
			if (__props.button || __props.icon) {
				_push(`<span class="text" data-v-42cb505d>`);
				if (__props.icon) _push(`<span class="${ssrRenderClass([__props.icon, "option-icon"])}" data-v-42cb505d></span>`);
				else _push(`<!---->`);
				if (__props.button) _push(`<span data-v-42cb505d>${__props.button ?? ""}</span>`);
				else _push(`<!---->`);
				_push(`<span class="vpi-chevron-down text-icon" data-v-42cb505d></span></span>`);
			} else _push(`<span class="vpi-more-horizontal icon" data-v-42cb505d></span>`);
			_push(`</button><div class="menu" data-v-42cb505d>`);
			_push(ssrRenderComponent(VPMenu_default, { items: __props.items }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue
var _sfc_setup$51 = VPFlyout_vue_vue_type_script_setup_true_lang_default.setup;
VPFlyout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue");
	return _sfc_setup$51 ? _sfc_setup$51(props, ctx) : void 0;
};
var VPFlyout_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPFlyout_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-42cb505d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue?vue&type=script&setup=true&lang.ts
var VPSocialLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSocialLink",
	__ssrInlineRender: true,
	props: {
		icon: {},
		link: {},
		ariaLabel: {},
		target: {},
		me: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const el = ref();
		onMounted(async () => {
			await nextTick();
			const span = el.value?.children[0];
			if (span instanceof HTMLElement && span.className.startsWith("vpi-social-") && (getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === "none") span.style.setProperty("--icon", `url('https://api.iconify.design/simple-icons/${props.icon}.svg')`);
		});
		const svg = computed(() => {
			if (typeof props.icon === "object") return props.icon.svg;
			return `<span class="vpi-social-${props.icon}"></span>`;
		});
		typeof props.icon === "string" && useSSRContext()?.vpSocialIcons.add(props.icon);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<a${ssrRenderAttrs(mergeProps({
				ref_key: "el",
				ref: el,
				class: "VPSocialLink no-icon",
				href: __props.link,
				"aria-label": __props.ariaLabel ?? (typeof __props.icon === "string" ? __props.icon : ""),
				target: __props.target ?? (unref(isExternal)(__props.link) ? "_blank" : void 0),
				rel: __props.me ? "me noopener" : "noopener"
			}, _attrs))} data-v-7bdffce5>${svg.value ?? ""}</a>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue
var _sfc_setup$50 = VPSocialLink_vue_vue_type_script_setup_true_lang_default.setup;
VPSocialLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue");
	return _sfc_setup$50 ? _sfc_setup$50(props, ctx) : void 0;
};
var VPSocialLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSocialLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7bdffce5"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue?vue&type=script&setup=true&lang.ts
var VPSocialLinks_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSocialLinks",
	__ssrInlineRender: true,
	props: {
		links: {},
		me: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<ul${ssrRenderAttrs(mergeProps({ class: "VPSocialLinks" }, _attrs))} data-v-babe741d><!--[-->`);
			ssrRenderList(__props.links, ({ link, icon, ariaLabel, target }) => {
				_push(`<li class="item" data-v-babe741d>`);
				_push(ssrRenderComponent(VPSocialLink_default, {
					icon,
					link,
					ariaLabel,
					target,
					me: __props.me
				}, null, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue
var _sfc_setup$49 = VPSocialLinks_vue_vue_type_script_setup_true_lang_default.setup;
VPSocialLinks_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue");
	return _sfc_setup$49 ? _sfc_setup$49(props, ctx) : void 0;
};
var VPSocialLinks_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSocialLinks_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-babe741d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue?vue&type=script&setup=true&lang.ts
var VPNavBarExtra_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarExtra",
	__ssrInlineRender: true,
	setup(__props) {
		const { site, theme } = useData();
		const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });
		const hasExtraContent = computed(() => localeLinks.value.length && currentLang.value.label || site.value.appearance || theme.value.socialLinks);
		return (_ctx, _push, _parent, _attrs) => {
			if (hasExtraContent.value) _push(ssrRenderComponent(VPFlyout_default, mergeProps({
				class: "VPNavBarExtra",
				label: "extra navigation"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(localeLinks).length && unref(currentLang).label) {
							_push(`<ul class="group translations" data-v-3da7c200${_scopeId}><li class="trans-title" data-v-3da7c200${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</li><!--[-->`);
							ssrRenderList(unref(localeLinks), (locale) => {
								_push(`<li data-v-3da7c200${_scopeId}>`);
								_push(ssrRenderComponent(VPMenuLink_default, {
									item: locale,
									external: false,
									lang: locale.lang,
									hreflang: locale.lang,
									rel: "alternate",
									dir: locale.dir,
									"data-allow-mismatch": "attribute"
								}, null, _parent, _scopeId));
								_push(`</li>`);
							});
							_push(`<!--]--></ul>`);
						} else _push(`<!---->`);
						if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
							_push(`<div class="group" data-v-3da7c200${_scopeId}><div class="item appearance" data-v-3da7c200${_scopeId}><p class="label" data-v-3da7c200${_scopeId}>${ssrInterpolate(unref(theme).darkModeSwitchLabel || "Appearance")}</p><div class="appearance-action" data-v-3da7c200${_scopeId}>`);
							_push(ssrRenderComponent(VPSwitchAppearance_default, null, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else _push(`<!---->`);
						if (unref(theme).socialLinks) {
							_push(`<div class="group" data-v-3da7c200${_scopeId}><div class="item social-links" data-v-3da7c200${_scopeId}>`);
							_push(ssrRenderComponent(VPSocialLinks_default, {
								class: "social-links-list",
								links: unref(theme).socialLinks
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else _push(`<!---->`);
					} else return [
						unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createBlock("ul", {
							key: 0,
							class: "group translations"
						}, [createVNode("li", { class: "trans-title" }, toDisplayString(unref(currentLang).label), 1), (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
							return openBlock(), createBlock("li", { key: locale.link }, [createVNode(VPMenuLink_default, {
								item: locale,
								external: false,
								lang: locale.lang,
								hreflang: locale.lang,
								rel: "alternate",
								dir: locale.dir,
								"data-allow-mismatch": "attribute"
							}, null, 8, [
								"item",
								"lang",
								"hreflang",
								"dir"
							])]);
						}), 128))])) : createCommentVNode("", true),
						unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "group"
						}, [createVNode("div", { class: "item appearance" }, [createVNode("p", { class: "label" }, toDisplayString(unref(theme).darkModeSwitchLabel || "Appearance"), 1), createVNode("div", { class: "appearance-action" }, [createVNode(VPSwitchAppearance_default)])])])) : createCommentVNode("", true),
						unref(theme).socialLinks ? (openBlock(), createBlock("div", {
							key: 2,
							class: "group"
						}, [createVNode("div", { class: "item social-links" }, [createVNode(VPSocialLinks_default, {
							class: "social-links-list",
							links: unref(theme).socialLinks
						}, null, 8, ["links"])])])) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue
var _sfc_setup$48 = VPNavBarExtra_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarExtra_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue");
	return _sfc_setup$48 ? _sfc_setup$48(props, ctx) : void 0;
};
var VPNavBarExtra_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarExtra_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3da7c200"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue?vue&type=script&setup=true&lang.ts
var VPNavBarHamburger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarHamburger",
	__ssrInlineRender: true,
	props: { active: { type: Boolean } },
	emits: ["click"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				class: ["VPNavBarHamburger", { active: __props.active }],
				"aria-label": "mobile navigation",
				"aria-expanded": __props.active,
				"aria-controls": "VPNavScreen"
			}, _attrs))} data-v-e5dd9c1c><span class="container" data-v-e5dd9c1c><span class="top" data-v-e5dd9c1c></span><span class="middle" data-v-e5dd9c1c></span><span class="bottom" data-v-e5dd9c1c></span></span></button>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue
var _sfc_setup$47 = VPNavBarHamburger_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarHamburger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue");
	return _sfc_setup$47 ? _sfc_setup$47(props, ctx) : void 0;
};
var VPNavBarHamburger_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarHamburger_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e5dd9c1c"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue?vue&type=script&setup=true&lang.ts
var VPNavBarMenuGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarMenuGroup",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const isActiveGroup = computed(() => {
			if (props.item.activeMatch) return isActive(route.data.relativePath, route.hash, props.item.activeMatch, true);
			return isChildActive(props.item);
		});
		function isChildActive(navItem) {
			if ("component" in navItem) return false;
			if ("link" in navItem) {
				const href = typeof navItem.link === "function" ? navItem.link(route.data) : navItem.link;
				return isActive(route.data.relativePath, route.hash, navItem.activeMatch || href, !!navItem.activeMatch);
			}
			return navItem.items.some(isChildActive);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPFlyout_default, mergeProps({
				class: {
					VPNavBarMenuGroup: true,
					active: isActiveGroup.value
				},
				button: __props.item.text,
				items: __props.item.items
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue
var _sfc_setup$46 = VPNavBarMenuGroup_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarMenuGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue");
	return _sfc_setup$46 ? _sfc_setup$46(props, ctx) : void 0;
};
var VPNavBarMenuGroup_default = VPNavBarMenuGroup_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue?vue&type=script&setup=true&lang.ts
var VPNavBarMenuLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarMenuLink",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const href = computed(() => typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link);
		const isActiveLink = computed(() => {
			return isActive(route.data.relativePath, route.hash, props.item.activeMatch || href.value, !!props.item.activeMatch);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPLink_default, mergeProps({
				class: {
					VPNavBarMenuLink: true,
					active: isActiveLink.value
				},
				href: href.value,
				target: __props.item.target,
				rel: __props.item.rel,
				"no-icon": __props.item.noIcon,
				tabindex: "0"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-7547a935${_scopeId}>${__props.item.text ?? ""}</span>`);
					else return [createVNode("span", { innerHTML: __props.item.text }, null, 8, ["innerHTML"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue
var _sfc_setup$45 = VPNavBarMenuLink_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarMenuLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue");
	return _sfc_setup$45 ? _sfc_setup$45(props, ctx) : void 0;
};
var VPNavBarMenuLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarMenuLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7547a935"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue?vue&type=script&setup=true&lang.ts
var VPNavBarMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarMenu",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(theme).nav) {
				_push(`<nav${ssrRenderAttrs(mergeProps({
					"aria-labelledby": "main-nav-aria-label",
					class: "VPNavBarMenu"
				}, _attrs))} data-v-3ffeddce><span id="main-nav-aria-label" class="visually-hidden" data-v-3ffeddce> Main Navigation </span><ul class="list" data-v-3ffeddce><!--[-->`);
				ssrRenderList(unref(theme).nav, (item) => {
					_push(`<li data-v-3ffeddce>`);
					if ("link" in item) _push(ssrRenderComponent(VPNavBarMenuLink_default, { item }, null, _parent));
					else if ("component" in item) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
					else _push(ssrRenderComponent(VPNavBarMenuGroup_default, { item }, null, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul></nav>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue
var _sfc_setup$44 = VPNavBarMenu_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue");
	return _sfc_setup$44 ? _sfc_setup$44(props, ctx) : void 0;
};
var VPNavBarMenu_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarMenu_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3ffeddce"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/docsearch.js
/**
* Resolves the effective mode based on config and available features.
*
* - 'auto': infer hybrid vs sidePanel-only from provided config
* - 'sidePanel': force sidePanel-only even if keyword search is configured
* - 'hybrid': force hybrid (error if keyword search is not configured)
* - 'modal': force modal even if sidePanel is configured
*/
function resolveMode(options) {
	const mode = options.mode ?? "auto";
	const hasKeyword = hasKeywordSearch(options);
	const askAi = options.askAi;
	const hasSidePanelConfig = Boolean(askAi && typeof askAi === "object" && askAi.sidePanel);
	switch (mode) {
		case "sidePanel": return {
			mode,
			showKeywordSearch: false,
			useSidePanel: true
		};
		case "hybrid":
			if (!hasKeyword) console.error("[vitepress] mode: \"hybrid\" requires keyword search credentials (appId, apiKey, indexName).");
			return {
				mode,
				showKeywordSearch: hasKeyword,
				useSidePanel: true
			};
		case "modal": return {
			mode,
			showKeywordSearch: hasKeyword,
			useSidePanel: false
		};
		default: return {
			mode: "auto",
			showKeywordSearch: hasKeyword,
			useSidePanel: hasSidePanelConfig
		};
	}
}
function hasKeywordSearch(options) {
	return Boolean(options.appId && options.apiKey && options.indexName);
}
/**
* Removes existing `lang:` filters and appends `lang:${lang}`.
* Handles both flat arrays and nested arrays (for OR conditions).
*/
function mergeLangFacetFilters(rawFacetFilters, lang) {
	return [...(Array.isArray(rawFacetFilters) ? rawFacetFilters : rawFacetFilters ? [rawFacetFilters] : []).map((filter) => {
		if (Array.isArray(filter)) return filter.filter((f) => typeof f === "string" && !f.startsWith("lang:"));
		return filter;
	}).filter((filter) => {
		if (typeof filter === "string") return !filter.startsWith("lang:");
		return Array.isArray(filter) && filter.length > 0;
	}), `lang:${lang}`];
}
/**
* Builds Ask AI configuration from various input formats.
*/
function buildAskAiConfig(askAiProp, options, lang) {
	const isAskAiString = typeof askAiProp === "string";
	const askAiSearchParameters = !isAskAiString && askAiProp.searchParameters ? { ...askAiProp.searchParameters } : void 0;
	const isAgentStudio = !isAskAiString && askAiProp.agentStudio === true;
	const askAiFacetFilters = mergeLangFacetFilters(askAiSearchParameters?.facetFilters ?? options.searchParameters?.facetFilters, lang);
	const mergedAskAiSearchParameters = isAgentStudio ? askAiSearchParameters : {
		...askAiSearchParameters,
		facetFilters: askAiFacetFilters.length ? askAiFacetFilters : void 0
	};
	const result = {
		...isAskAiString ? {} : askAiProp,
		indexName: isAskAiString ? options.indexName : askAiProp.indexName,
		apiKey: isAskAiString ? options.apiKey : askAiProp.apiKey,
		appId: isAskAiString ? options.appId : askAiProp.appId,
		assistantId: isAskAiString ? askAiProp : askAiProp.assistantId
	};
	if (mergedAskAiSearchParameters && Object.values(mergedAskAiSearchParameters).some((v) => v != null)) result.searchParameters = mergedAskAiSearchParameters;
	return result;
}
/**
* Resolves Algolia search options for the given language,
* merging in locale-specific overrides and language facet filters.
*/
function resolveOptionsForLanguage(options, localeIndex, lang) {
	options = deepMerge(options, options.locales?.[localeIndex] || {});
	const facetFilters = mergeLangFacetFilters(options.searchParameters?.facetFilters, lang);
	const askAi = options.askAi ? buildAskAiConfig(options.askAi, options, lang) : void 0;
	return {
		...options,
		searchParameters: {
			...options.searchParameters,
			facetFilters
		},
		askAi
	};
}
function deepMerge(target, source) {
	const result = { ...target };
	for (const key in source) {
		const value = source[key];
		if (value === void 0) continue;
		if (key === "searchParameters") {
			result[key] = value;
			continue;
		}
		if (isObject(value) && isObject(result[key])) result[key] = deepMerge(result[key], value);
		else result[key] = value;
	}
	delete result.locales;
	return result;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/reactivity.js
function smartComputed(getter, comparator = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue)) {
	return computed((oldValue) => {
		const newValue = getter();
		return oldValue === void 0 || !comparator(newValue, oldValue) ? newValue : oldValue;
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarAskAiButton.vue
var _sfc_main$16 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({
		type: "button",
		class: "VPNavBarAskAiButton"
	}, _attrs))} data-v-4eb17e89><span class="vpi-sparkles" aria-hidden="true" data-v-4eb17e89></span></button>`);
}
var _sfc_setup$43 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAskAiButton.vue");
	return _sfc_setup$43 ? _sfc_setup$43(props, ctx) : void 0;
};
var VPNavBarAskAiButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$16, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4eb17e89"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue?vue&type=script&setup=true&lang.ts
var VPNavBarSearchButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarSearchButton",
	__ssrInlineRender: true,
	props: { text: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				class: "VPNavBarSearchButton"
			}, _attrs))} data-v-baa3be99><span class="vpi-search" aria-hidden="true" data-v-baa3be99></span><span class="text" data-v-baa3be99>${ssrInterpolate(__props.text)}</span><span class="keys" aria-hidden="true" data-v-baa3be99><kbd class="key-cmd" data-v-baa3be99>⌘</kbd><kbd class="key-ctrl" data-v-baa3be99>Ctrl</kbd><kbd data-v-baa3be99>K</kbd></span></button>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue
var _sfc_setup$42 = VPNavBarSearchButton_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarSearchButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue");
	return _sfc_setup$42 ? _sfc_setup$42(props, ctx) : void 0;
};
var VPNavBarSearchButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarSearchButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-baa3be99"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue?vue&type=script&setup=true&lang.ts
var VPNavBarSearch_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarSearch",
	__ssrInlineRender: true,
	setup(__props) {
		const VPLocalSearchBox = defineAsyncComponent(() => import("./VPLocalSearchBox.QxS46FK3.js"));
		const VPAlgoliaSearchBox = () => null;
		const { theme, localeIndex, lang } = useData();
		const provider = "local";
		const algoliaOptions = smartComputed(() => {
			return resolveOptionsForLanguage(theme.value.search?.options || {}, localeIndex.value, lang.value);
		});
		const resolvedMode = computed(() => resolveMode(algoliaOptions.value));
		const askAiSidePanelConfig = computed(() => {
			if (!resolvedMode.value.useSidePanel) return null;
			const askAi = algoliaOptions.value.askAi;
			if (!askAi || typeof askAi === "string") return null;
			if (!askAi.sidePanel) return null;
			return askAi.sidePanel === true ? {} : askAi.sidePanel;
		});
		const askAiShortcutEnabled = computed(() => {
			return askAiSidePanelConfig.value?.keyboardShortcuts?.["Ctrl/Cmd+I"] !== false;
		});
		const openRequest = ref(null);
		let openNonce = 0;
		const loaded = ref(false);
		const actuallyLoaded = ref(false);
		onMounted(() => {});
		function loadAndOpen(target) {
			if (!loaded.value) loaded.value = true;
			openRequest.value = {
				target,
				nonce: ++openNonce
			};
		}
		const showSearch = ref(false);
		onKeyStroke("k", (event) => {
			if (event.ctrlKey || event.metaKey) {
				event.preventDefault();
				showSearch.value = true;
			}
		});
		onKeyStroke("/", (event) => {
			if (!isEditingContent(event)) {
				event.preventDefault();
				showSearch.value = true;
			}
		});
		function isEditingContent(event) {
			const element = event.target;
			const tagName = element.tagName;
			return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarSearch" }, _attrs))} data-v-2fc7f2c6>`);
			if (unref(provider) === "algolia") {
				_push(`<!--[-->`);
				if (resolvedMode.value.showKeywordSearch) _push(ssrRenderComponent(VPNavBarSearchButton_default, {
					text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
					"aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
					"aria-keyshortcuts": "/ control+k meta+k",
					onClick: ($event) => loadAndOpen("search")
				}, null, _parent));
				else _push(`<!---->`);
				if (askAiSidePanelConfig.value) _push(ssrRenderComponent(VPNavBarAskAiButton_default, {
					"aria-label": askAiSidePanelConfig.value.button?.translations?.buttonAriaLabel || "Ask AI",
					"aria-keyshortcuts": askAiShortcutEnabled.value ? "control+i meta+i" : void 0,
					onClick: ($event) => actuallyLoaded.value ? loadAndOpen("toggleAskAi") : loadAndOpen("askAi")
				}, null, _parent));
				else _push(`<!---->`);
				if (loaded.value) _push(ssrRenderComponent(unref(VPAlgoliaSearchBox), {
					"algolia-options": unref(algoliaOptions),
					"open-request": openRequest.value,
					onVnodeBeforeMount: ($event) => actuallyLoaded.value = true
				}, null, _parent));
				else _push(`<!---->`);
				_push(`<!--]-->`);
			} else if (unref(provider) === "local") {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(VPNavBarSearchButton_default, {
					text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
					"aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
					"aria-keyshortcuts": "/ control+k meta+k",
					onClick: ($event) => showSearch.value = true
				}, null, _parent));
				if (showSearch.value) _push(ssrRenderComponent(unref(VPLocalSearchBox), { onClose: ($event) => showSearch.value = false }, null, _parent));
				else _push(`<!---->`);
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue
var _sfc_setup$41 = VPNavBarSearch_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarSearch_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue");
	return _sfc_setup$41 ? _sfc_setup$41(props, ctx) : void 0;
};
var VPNavBarSearch_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarSearch_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2fc7f2c6"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue?vue&type=script&setup=true&lang.ts
var VPNavBarSocialLinks_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarSocialLinks",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(theme).socialLinks) _push(ssrRenderComponent(VPSocialLinks_default, mergeProps({
				class: "VPNavBarSocialLinks",
				links: unref(theme).socialLinks
			}, _attrs), null, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue
var _sfc_setup$40 = VPNavBarSocialLinks_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarSocialLinks_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue");
	return _sfc_setup$40 ? _sfc_setup$40(props, ctx) : void 0;
};
var VPNavBarSocialLinks_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarSocialLinks_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0394ad82"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue?vue&type=script&setup=true&lang.ts
var VPNavBarTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarTitle",
	__ssrInlineRender: true,
	setup(__props) {
		const { site, theme } = useData();
		const { hasSidebar } = useLayout();
		const { currentLang } = useLangs();
		const link = computed(() => typeof theme.value.logoLink === "string" ? theme.value.logoLink : theme.value.logoLink?.link);
		const rel = computed(() => typeof theme.value.logoLink === "string" ? void 0 : theme.value.logoLink?.rel);
		const target = computed(() => typeof theme.value.logoLink === "string" ? void 0 : theme.value.logoLink?.target);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }] }, _attrs))} data-v-1e38c6bc><a class="title"${ssrRenderAttr("href", link.value ?? unref(normalizeLink$1)(unref(currentLang).link))}${ssrRenderAttr("rel", rel.value)}${ssrRenderAttr("target", target.value)} data-v-1e38c6bc>`);
			ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent);
			if (unref(theme).logo) _push(ssrRenderComponent(VPImage_default, {
				class: "logo",
				image: unref(theme).logo
			}, null, _parent));
			else _push(`<!---->`);
			if (unref(theme).siteTitle) _push(`<span data-v-1e38c6bc>${unref(theme).siteTitle ?? ""}</span>`);
			else if (unref(theme).siteTitle === void 0) _push(`<span data-v-1e38c6bc>${ssrInterpolate(unref(site).title)}</span>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent);
			_push(`</a></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue
var _sfc_setup$39 = VPNavBarTitle_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue");
	return _sfc_setup$39 ? _sfc_setup$39(props, ctx) : void 0;
};
var VPNavBarTitle_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarTitle_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1e38c6bc"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue?vue&type=script&setup=true&lang.ts
var VPNavBarTranslations_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBarTranslations",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(localeLinks).length && unref(currentLang).label) _push(ssrRenderComponent(VPFlyout_default, mergeProps({
				class: "VPNavBarTranslations",
				icon: "vpi-languages",
				label: unref(theme).langMenuLabel || "Change language"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<ul class="items" data-v-6e8525b1${_scopeId}><li class="title" data-v-6e8525b1${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</li><!--[-->`);
						ssrRenderList(unref(localeLinks), (locale) => {
							_push(`<li data-v-6e8525b1${_scopeId}>`);
							_push(ssrRenderComponent(VPMenuLink_default, {
								item: locale,
								external: false,
								lang: locale.lang,
								hreflang: locale.lang,
								rel: "alternate",
								dir: locale.dir,
								"data-allow-mismatch": "attribute"
							}, null, _parent, _scopeId));
							_push(`</li>`);
						});
						_push(`<!--]--></ul>`);
					} else return [createVNode("ul", { class: "items" }, [createVNode("li", { class: "title" }, toDisplayString(unref(currentLang).label), 1), (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
						return openBlock(), createBlock("li", { key: locale.link }, [createVNode(VPMenuLink_default, {
							item: locale,
							external: false,
							lang: locale.lang,
							hreflang: locale.lang,
							rel: "alternate",
							dir: locale.dir,
							"data-allow-mismatch": "attribute"
						}, null, 8, [
							"item",
							"lang",
							"hreflang",
							"dir"
						])]);
					}), 128))])];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue
var _sfc_setup$38 = VPNavBarTranslations_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBarTranslations_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue");
	return _sfc_setup$38 ? _sfc_setup$38(props, ctx) : void 0;
};
var VPNavBarTranslations_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBarTranslations_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6e8525b1"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue?vue&type=script&setup=true&lang.ts
var VPNavBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavBar",
	__ssrInlineRender: true,
	props: { isScreenOpen: { type: Boolean } },
	emits: ["toggle-screen"],
	setup(__props) {
		const { y } = useWindowScroll();
		const { isHome, hasSidebar } = useLayout();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPNavBar", {
				"has-sidebar": unref(hasSidebar),
				"home": unref(isHome),
				"top": unref(y) === 0,
				"screen-open": __props.isScreenOpen
			}] }, _attrs))} data-v-9ca1369d><div class="wrapper" data-v-9ca1369d><div class="container" data-v-9ca1369d><div class="title" data-v-9ca1369d>`);
			_push(ssrRenderComponent(VPNavBarTitle_default, null, {
				"nav-bar-title-before": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)];
				}),
				"nav-bar-title-after": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
			_push(`</div><div class="content" data-v-9ca1369d><div class="content-body" data-v-9ca1369d>`);
			ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
			_push(ssrRenderComponent(VPNavBarSearch_default, { class: "search" }, null, _parent));
			_push(ssrRenderComponent(VPNavBarMenu_default, { class: "menu" }, null, _parent));
			_push(ssrRenderComponent(VPNavBarTranslations_default, { class: "translations" }, null, _parent));
			_push(ssrRenderComponent(VPNavBarAppearance_default, { class: "appearance" }, null, _parent));
			_push(ssrRenderComponent(VPNavBarSocialLinks_default, { class: "social-links" }, null, _parent));
			_push(ssrRenderComponent(VPNavBarExtra_default, { class: "extra" }, null, _parent));
			ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
			_push(ssrRenderComponent(VPNavBarHamburger_default, {
				class: "hamburger",
				active: __props.isScreenOpen,
				onClick: ($event) => _ctx.$emit("toggle-screen")
			}, null, _parent));
			_push(`</div></div></div></div><div class="divider" data-v-9ca1369d><div class="divider-line" data-v-9ca1369d></div></div></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue
var _sfc_setup$37 = VPNavBar_vue_vue_type_script_setup_true_lang_default.setup;
VPNavBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue");
	return _sfc_setup$37 ? _sfc_setup$37(props, ctx) : void 0;
};
var VPNavBar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavBar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9ca1369d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenAppearance_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenAppearance",
	__ssrInlineRender: true,
	setup(__props) {
		const { site, theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenAppearance" }, _attrs))} data-v-b44890b2><p class="text" data-v-b44890b2>${ssrInterpolate(unref(theme).darkModeSwitchLabel || "Appearance")}</p>`);
				_push(ssrRenderComponent(VPSwitchAppearance_default, null, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue
var _sfc_setup$36 = VPNavScreenAppearance_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenAppearance_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue");
	return _sfc_setup$36 ? _sfc_setup$36(props, ctx) : void 0;
};
var VPNavScreenAppearance_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenAppearance_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b44890b2"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenMenuGroupLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenMenuGroupLink",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const href = computed(() => typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link);
		const isActiveLink = computed(() => {
			return isActive(route.data.relativePath, route.hash, props.item.activeMatch || href.value, !!props.item.activeMatch);
		});
		const { closeScreen } = inject(navInjectionKey);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPLink_default, mergeProps({
				class: {
					VPNavScreenMenuGroupLink: true,
					active: isActiveLink.value
				},
				href: href.value,
				target: __props.item.target,
				rel: __props.item.rel,
				"no-icon": __props.item.noIcon,
				onClick: unref(closeScreen)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-f57b246c${_scopeId}>${__props.item.text ?? ""}</span>`);
					else return [createVNode("span", { innerHTML: __props.item.text }, null, 8, ["innerHTML"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue
var _sfc_setup$35 = VPNavScreenMenuGroupLink_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenMenuGroupLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue");
	return _sfc_setup$35 ? _sfc_setup$35(props, ctx) : void 0;
};
var VPNavScreenMenuGroupLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenMenuGroupLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f57b246c"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenMenuGroupSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenMenuGroupSection",
	__ssrInlineRender: true,
	props: {
		text: {},
		items: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenuGroupSection" }, _attrs))} data-v-fd65402d>`);
			if (__props.text) _push(`<p class="title" data-v-fd65402d>${ssrInterpolate(__props.text)}</p>`);
			else _push(`<!---->`);
			_push(`<ul data-v-fd65402d><!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(`<li data-v-fd65402d>`);
				_push(ssrRenderComponent(VPNavScreenMenuGroupLink_default, { item }, null, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue
var _sfc_setup$34 = VPNavScreenMenuGroupSection_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenMenuGroupSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue");
	return _sfc_setup$34 ? _sfc_setup$34(props, ctx) : void 0;
};
var VPNavScreenMenuGroupSection_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenMenuGroupSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fd65402d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenMenuGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenMenuGroup",
	__ssrInlineRender: true,
	props: {
		text: {},
		items: {}
	},
	setup(__props) {
		const props = __props;
		const isOpen = ref(false);
		const groupId = computed(() => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPNavScreenMenuGroup", { open: isOpen.value }] }, _attrs))} data-v-684cc37d><button class="button"${ssrRenderAttr("aria-controls", groupId.value)}${ssrRenderAttr("aria-expanded", isOpen.value)} data-v-684cc37d><span class="button-text" data-v-684cc37d>${__props.text ?? ""}</span><span class="vpi-plus button-icon" data-v-684cc37d></span></button><ul${ssrRenderAttr("id", groupId.value)} class="items" data-v-684cc37d><!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(`<li data-v-684cc37d>`);
				if ("link" in item) {
					_push(`<div class="item" data-v-684cc37d>`);
					_push(ssrRenderComponent(VPNavScreenMenuGroupLink_default, { item }, null, _parent));
					_push(`</div>`);
				} else if ("component" in item) {
					_push(`<div class="item" data-v-684cc37d>`);
					ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
					_push(`</div>`);
				} else {
					_push(`<div class="group" data-v-684cc37d>`);
					_push(ssrRenderComponent(VPNavScreenMenuGroupSection_default, {
						text: item.text,
						items: item.items
					}, null, _parent));
					_push(`</div>`);
				}
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue
var _sfc_setup$33 = VPNavScreenMenuGroup_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenMenuGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue");
	return _sfc_setup$33 ? _sfc_setup$33(props, ctx) : void 0;
};
var VPNavScreenMenuGroup_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenMenuGroup_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-684cc37d"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenMenuLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenMenuLink",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const href = computed(() => typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link);
		const isActiveLink = computed(() => {
			return isActive(route.data.relativePath, route.hash, props.item.activeMatch || href.value, !!props.item.activeMatch);
		});
		const { closeScreen } = inject(navInjectionKey);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VPLink_default, mergeProps({
				class: {
					VPNavScreenMenuLink: true,
					active: isActiveLink.value
				},
				href: href.value,
				target: __props.item.target,
				rel: __props.item.rel,
				"no-icon": __props.item.noIcon,
				onClick: unref(closeScreen)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-bd67b1dd${_scopeId}>${__props.item.text ?? ""}</span>`);
					else return [createVNode("span", { innerHTML: __props.item.text }, null, 8, ["innerHTML"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue
var _sfc_setup$32 = VPNavScreenMenuLink_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenMenuLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue");
	return _sfc_setup$32 ? _sfc_setup$32(props, ctx) : void 0;
};
var VPNavScreenMenuLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenMenuLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bd67b1dd"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenMenu",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(theme).nav) {
				_push(`<nav${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenu" }, _attrs))}><ul><!--[-->`);
				ssrRenderList(unref(theme).nav, (item) => {
					_push(`<li>`);
					if ("link" in item) _push(ssrRenderComponent(VPNavScreenMenuLink_default, { item }, null, _parent));
					else if ("component" in item) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
					else _push(ssrRenderComponent(VPNavScreenMenuGroup_default, {
						text: item.text || "",
						items: item.items
					}, null, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul></nav>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue
var _sfc_setup$31 = VPNavScreenMenu_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue");
	return _sfc_setup$31 ? _sfc_setup$31(props, ctx) : void 0;
};
var VPNavScreenMenu_default = VPNavScreenMenu_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenSocialLinks_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenSocialLinks",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(theme).socialLinks) _push(ssrRenderComponent(VPSocialLinks_default, mergeProps({
				class: "VPNavScreenSocialLinks",
				links: unref(theme).socialLinks
			}, _attrs), null, _parent));
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue
var _sfc_setup$30 = VPNavScreenSocialLinks_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenSocialLinks_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue");
	return _sfc_setup$30 ? _sfc_setup$30(props, ctx) : void 0;
};
var VPNavScreenSocialLinks_default = VPNavScreenSocialLinks_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue?vue&type=script&setup=true&lang.ts
var VPNavScreenTranslations_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreenTranslations",
	__ssrInlineRender: true,
	setup(__props) {
		const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });
		const isOpen = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(localeLinks).length && unref(currentLang).label) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPNavScreenTranslations", { open: isOpen.value }] }, _attrs))} data-v-9f676d38><button class="title" data-v-9f676d38><span class="vpi-languages icon lang" data-v-9f676d38></span> ${ssrInterpolate(unref(currentLang).label)} <span class="vpi-chevron-down icon chevron" data-v-9f676d38></span></button><ul class="list" data-v-9f676d38><!--[-->`);
				ssrRenderList(unref(localeLinks), (locale) => {
					_push(`<li class="item" data-v-9f676d38>`);
					_push(ssrRenderComponent(VPLink_default, {
						class: "link",
						href: locale.link,
						external: false,
						lang: locale.lang,
						hreflang: locale.lang,
						rel: "alternate",
						dir: locale.dir,
						"data-allow-mismatch": "attribute"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(locale.text)}`);
							else return [createTextVNode(toDisplayString(locale.text), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue
var _sfc_setup$29 = VPNavScreenTranslations_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreenTranslations_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
var VPNavScreenTranslations_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreenTranslations_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9f676d38"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue?vue&type=script&setup=true&lang.ts
var VPNavScreen_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavScreen",
	__ssrInlineRender: true,
	props: { open: { type: Boolean } },
	setup(__props) {
		useScrollLock(inBrowser ? document.body : null);
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.open) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: "VPNavScreen",
					id: "VPNavScreen"
				}, _attrs))} data-v-05f3d7bc><div class="container" data-v-05f3d7bc>`);
				ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
				_push(ssrRenderComponent(VPNavScreenMenu_default, { class: "menu" }, null, _parent));
				_push(ssrRenderComponent(VPNavScreenTranslations_default, { class: "translations" }, null, _parent));
				_push(ssrRenderComponent(VPNavScreenAppearance_default, { class: "appearance" }, null, _parent));
				_push(ssrRenderComponent(VPNavScreenSocialLinks_default, { class: "social-links" }, null, _parent));
				ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
				_push(`</div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue
var _sfc_setup$28 = VPNavScreen_vue_vue_type_script_setup_true_lang_default.setup;
VPNavScreen_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
var VPNavScreen_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavScreen_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-05f3d7bc"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNav.vue?vue&type=script&setup=true&lang.ts
var VPNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNav",
	__ssrInlineRender: true,
	setup(__props) {
		const { isScreenOpen, closeScreen, toggleScreen } = useNav();
		const { frontmatter } = useData();
		const hasNavbar = computed(() => {
			return frontmatter.value.navbar !== false;
		});
		provide(navInjectionKey, { closeScreen });
		watchEffect(() => {
			if (inBrowser) document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (hasNavbar.value) {
				_push(`<header${ssrRenderAttrs(mergeProps({ class: "VPNav" }, _attrs))} data-v-9f75dce3>`);
				_push(ssrRenderComponent(VPNavBar_default, {
					"is-screen-open": unref(isScreenOpen),
					onToggleScreen: unref(toggleScreen)
				}, {
					"nav-bar-title-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)];
					}),
					"nav-bar-title-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)];
					}),
					"nav-bar-content-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)];
					}),
					"nav-bar-content-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(ssrRenderComponent(VPNavScreen_default, { open: unref(isScreenOpen) }, {
					"nav-screen-content-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)];
					}),
					"nav-screen-content-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(`</header>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPNav.vue
var _sfc_setup$27 = VPNav_vue_vue_type_script_setup_true_lang_default.setup;
VPNav_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
var VPNav_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNav_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9f75dce3"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue?vue&type=script&setup=true&lang.ts
var VPSidebarItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebarItem",
	__ssrInlineRender: true,
	props: {
		item: {},
		depth: {}
	},
	setup(__props) {
		const props = __props;
		const { collapsed, collapsible, isLink, isActiveLink, hasActiveLink, hasChildren, toggle } = useSidebarItemControl(computed(() => props.item));
		const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
		const linkTag = computed(() => isLink.value ? "a" : "div");
		const textTag = computed(() => {
			return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
		});
		const itemRole = computed(() => isLink.value ? void 0 : "button");
		const classes = computed(() => [
			[`level-${props.depth}`],
			{ collapsible: collapsible.value },
			{ collapsed: collapsed.value },
			{ "is-link": isLink.value },
			{ "is-active": isActiveLink.value },
			{ "has-active": hasActiveLink.value }
		]);
		function onItemInteraction(e) {
			if ("key" in e && e.key !== "Enter") return;
			!props.item.link && toggle();
		}
		function onCaretClick() {
			props.item.link && toggle();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(sectionTag.value), mergeProps({ class: ["VPSidebarItem", classes.value] }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (__props.item.text) {
							_push(`<div class="item"${ssrRenderAttr("role", itemRole.value)}${ssrRenderAttr("tabindex", __props.item.items && 0)} data-v-1988c617${_scopeId}><div class="indicator" data-v-1988c617${_scopeId}></div>`);
							if (__props.item.link) _push(ssrRenderComponent(VPLink_default, {
								tag: linkTag.value,
								class: "link",
								href: __props.item.link,
								rel: __props.item.rel,
								target: __props.item.target
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent, _scopeId);
									else return [(openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
										class: "text",
										innerHTML: __props.item.text
									}, null, 8, ["innerHTML"]))];
								}),
								_: 1
							}, _parent, _scopeId));
							else ssrRenderVNode(_push, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent, _scopeId);
							if (__props.item.collapsed != null && __props.item.items && __props.item.items.length) _push(`<div class="caret" role="button" aria-label="toggle section" tabindex="0" data-v-1988c617${_scopeId}><span class="vpi-chevron-right caret-icon" data-v-1988c617${_scopeId}></span></div>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (__props.item.items && __props.item.items.length) {
							_push(`<ul class="items" data-v-1988c617${_scopeId}>`);
							if (__props.depth < 5) {
								_push(`<li data-v-1988c617${_scopeId}><!--[-->`);
								ssrRenderList(__props.item.items, (i) => {
									_push(ssrRenderComponent(_component_VPSidebarItem, {
										key: i.text,
										item: i,
										depth: __props.depth + 1
									}, null, _parent, _scopeId));
								});
								_push(`<!--]--></li>`);
							} else _push(`<!---->`);
							_push(`</ul>`);
						} else _push(`<!---->`);
					} else return [__props.item.text ? (openBlock(), createBlock("div", mergeProps({
						key: 0,
						class: "item",
						role: itemRole.value
					}, toHandlers(__props.item.items ? {
						click: onItemInteraction,
						keydown: onItemInteraction
					} : {}, true), { tabindex: __props.item.items && 0 }), [
						createVNode("div", { class: "indicator" }),
						__props.item.link ? (openBlock(), createBlock(VPLink_default, {
							key: 0,
							tag: linkTag.value,
							class: "link",
							href: __props.item.link,
							rel: __props.item.rel,
							target: __props.item.target
						}, {
							default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
								class: "text",
								innerHTML: __props.item.text
							}, null, 8, ["innerHTML"]))]),
							_: 1
						}, 8, [
							"tag",
							"href",
							"rel",
							"target"
						])) : (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
							key: 1,
							class: "text",
							innerHTML: __props.item.text
						}, null, 8, ["innerHTML"])),
						__props.item.collapsed != null && __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
							key: 2,
							class: "caret",
							role: "button",
							"aria-label": "toggle section",
							onClick: onCaretClick,
							onKeydown: withKeys(onCaretClick, ["enter"]),
							tabindex: "0"
						}, [createVNode("span", { class: "vpi-chevron-right caret-icon" })], 32)) : createCommentVNode("", true)
					], 16, ["role", "tabindex"])) : createCommentVNode("", true), __props.item.items && __props.item.items.length ? (openBlock(), createBlock("ul", {
						key: 1,
						class: "items"
					}, [__props.depth < 5 ? (openBlock(), createBlock("li", { key: 0 }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.item.items, (i) => {
						return openBlock(), createBlock(_component_VPSidebarItem, {
							key: i.text,
							item: i,
							depth: __props.depth + 1
						}, null, 8, ["item", "depth"]);
					}), 128))])) : createCommentVNode("", true)])) : createCommentVNode("", true)];
				}),
				_: 1
			}), _parent);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue
var _sfc_setup$26 = VPSidebarItem_vue_vue_type_script_setup_true_lang_default.setup;
VPSidebarItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
var VPSidebarItem_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebarItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1988c617"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue?vue&type=script&setup=true&lang.ts
var VPSidebarGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebarGroup",
	__ssrInlineRender: true,
	props: { items: {} },
	setup(__props) {
		const disableTransition = ref(true);
		let timer = null;
		onMounted(() => {
			timer = setTimeout(() => {
				timer = null;
				disableTransition.value = false;
			}, 300);
		});
		onBeforeUnmount(() => {
			if (timer != null) {
				clearTimeout(timer);
				timer = null;
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(`<div class="${ssrRenderClass([{ "no-transition": disableTransition.value }, "group"])}" data-v-8d50c081>`);
				_push(ssrRenderComponent(VPSidebarItem_default, {
					item,
					depth: 0
				}, null, _parent));
				_push(`</div>`);
			});
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue
var _sfc_setup$25 = VPSidebarGroup_vue_vue_type_script_setup_true_lang_default.setup;
VPSidebarGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
var VPSidebarGroup_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebarGroup_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8d50c081"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue?vue&type=script&setup=true&lang.ts
var VPSidebar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebar",
	__ssrInlineRender: true,
	props: { open: { type: Boolean } },
	setup(__props) {
		const { sidebarGroups, hasSidebar } = useLayout();
		const props = __props;
		const navEl = ref(null);
		const isLocked = useScrollLock(inBrowser ? document.body : null);
		watch([props, navEl], () => {
			if (props.open) {
				isLocked.value = true;
				navEl.value?.focus();
			} else isLocked.value = false;
		}, {
			immediate: true,
			flush: "post"
		});
		const key = ref(0);
		watch(sidebarGroups, () => {
			key.value += 1;
		}, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(hasSidebar)) {
				_push(`<aside${ssrRenderAttrs(mergeProps({
					class: ["VPSidebar", { open: __props.open }],
					ref_key: "navEl",
					ref: navEl
				}, _attrs))} data-v-af661f50><div class="curtain" data-v-af661f50></div><nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-af661f50><span class="visually-hidden" id="sidebar-aria-label" data-v-af661f50> Sidebar Navigation </span>`);
				ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push, _parent);
				_push(ssrRenderComponent(VPSidebarGroup_default, {
					items: unref(sidebarGroups),
					key: key.value
				}, null, _parent));
				ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push, _parent);
				_push(`</nav></aside>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue
var _sfc_setup$24 = VPSidebar_vue_vue_type_script_setup_true_lang_default.setup;
VPSidebar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
var VPSidebar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-af661f50"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue?vue&type=script&setup=true&lang.ts
var VPSkipLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSkipLink",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme } = useData();
		const route = useRoute();
		const backToTop = ref();
		watch(() => route.path, () => backToTop.value.focus());
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><span tabindex="-1" data-v-414181b2></span><a href="#VPContent" class="VPSkipLink visually-hidden" data-v-414181b2>${ssrInterpolate(unref(theme).skipToContentLabel || "Skip to content")}</a><!--]-->`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue
var _sfc_setup$23 = VPSkipLink_vue_vue_type_script_setup_true_lang_default.setup;
VPSkipLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
var VPSkipLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSkipLink_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-414181b2"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/Layout.vue?vue&type=script&setup=true&lang.ts
var Layout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Layout",
	__ssrInlineRender: true,
	setup(__props) {
		const { isOpen: isSidebarOpen, open: openSidebar, close: closeSidebar } = useSidebarControl();
		registerWatchers({ closeSidebar });
		const { frontmatter } = useData();
		const slots = useSlots();
		const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);
		provide(layoutInfoInjectionKey, { heroImageSlotExists });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Content = resolveComponent("Content");
			if (unref(frontmatter).layout !== false) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: ["Layout", unref(frontmatter).pageClass] }, _attrs))} data-v-0cf61682>`);
				ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
				_push(ssrRenderComponent(VPSkipLink_default, null, null, _parent));
				_push(ssrRenderComponent(VPBackdrop_default, {
					class: "backdrop",
					show: unref(isSidebarOpen),
					onClick: unref(closeSidebar)
				}, null, _parent));
				_push(ssrRenderComponent(VPNav_default, null, {
					"nav-bar-title-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)];
					}),
					"nav-bar-title-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)];
					}),
					"nav-bar-content-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)];
					}),
					"nav-bar-content-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)];
					}),
					"nav-screen-content-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)];
					}),
					"nav-screen-content-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(ssrRenderComponent(VPLocalNav_default, {
					open: unref(isSidebarOpen),
					onOpenMenu: unref(openSidebar)
				}, null, _parent));
				_push(ssrRenderComponent(VPSidebar_default, { open: unref(isSidebarOpen) }, {
					"sidebar-nav-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)];
					}),
					"sidebar-nav-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(ssrRenderComponent(VPContent_default, null, {
					"page-top": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "page-top", {}, void 0, true)];
					}),
					"page-bottom": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)];
					}),
					"not-found": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "not-found", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "not-found", {}, void 0, true)];
					}),
					"home-hero-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)];
					}),
					"home-hero-info-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)];
					}),
					"home-hero-info": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)];
					}),
					"home-hero-info-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)];
					}),
					"home-hero-actions-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)];
					}),
					"home-hero-actions-before-actions": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-actions-before-actions", {}, void 0, true)];
					}),
					"home-hero-image": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)];
					}),
					"home-hero-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)];
					}),
					"home-features-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)];
					}),
					"home-features-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)];
					}),
					"doc-footer-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)];
					}),
					"doc-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)];
					}),
					"doc-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)];
					}),
					"doc-top": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)];
					}),
					"doc-bottom": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)];
					}),
					"aside-top": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)];
					}),
					"aside-bottom": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)];
					}),
					"aside-outline-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)];
					}),
					"aside-outline-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)];
					}),
					"aside-ads-before": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)];
					}),
					"aside-ads-after": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent, _scopeId);
						else return [renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)];
					}),
					_: 3
				}, _parent));
				_push(ssrRenderComponent(VPFooter_default, null, null, _parent));
				ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(ssrRenderComponent(_component_Content, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/Layout.vue
var _sfc_setup$22 = Layout_vue_vue_type_script_setup_true_lang_default.setup;
Layout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/Layout.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
var Layout_default = /*#__PURE__*/ _plugin_vue_export_helper_default(Layout_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0cf61682"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/composables/sponsor-grid.js
/**
* Defines grid configuration for each sponsor size in tuple.
*
* [Screen width, Column size]
*
* It sets grid size on matching screen size. For example, `[768, 5]` will
* set 5 columns when screen size is bigger or equal to 768px.
*
* Column will set only when item size is bigger than the column size. For
* example, even we define 5 columns, if we only have 1 sponsor yet, we would
* like to show it in 1 column to make it stand out.
*/
var GridSettings = {
	xmini: [[0, 2]],
	mini: [],
	small: [
		[920, 6],
		[768, 5],
		[640, 4],
		[480, 3],
		[0, 2]
	],
	medium: [
		[960, 5],
		[832, 4],
		[640, 3],
		[480, 2]
	],
	big: [[832, 3], [640, 2]]
};
function useSponsorsGrid({ el, size = "medium" }) {
	const onResize = throttleAndDebounce(manage, 100);
	onMounted(() => {
		manage();
		window.addEventListener("resize", onResize);
	});
	onUnmounted(() => {
		window.removeEventListener("resize", onResize);
	});
	function manage() {
		adjustSlots(el.value, size);
	}
}
function adjustSlots(el, size) {
	const tsize = el.children.length;
	const asize = el.querySelectorAll(".vp-sponsor-grid-item:not(.empty)").length;
	manageSlots(el, setGrid(el, size, asize), tsize, asize);
}
function setGrid(el, size, items) {
	const settings = GridSettings[size];
	const screen = window.innerWidth;
	let grid = 1;
	settings.some(([breakpoint, value]) => {
		if (screen >= breakpoint) {
			grid = items < value ? items : value;
			return true;
		}
	});
	setGridData(el, grid);
	return grid;
}
function setGridData(el, value) {
	el.dataset.vpGrid = String(value);
}
function manageSlots(el, grid, tsize, asize) {
	const diff = tsize - asize;
	const rem = asize % grid;
	neutralizeSlots(el, (rem === 0 ? rem : grid - rem) - diff);
}
function neutralizeSlots(el, count) {
	if (count === 0) return;
	count > 0 ? addSlots(el, count) : removeSlots(el, count * -1);
}
function addSlots(el, count) {
	for (let i = 0; i < count; i++) {
		const slot = document.createElement("div");
		slot.classList.add("vp-sponsor-grid-item", "empty");
		el.append(slot);
	}
}
function removeSlots(el, count) {
	for (let i = 0; i < count; i++) el.removeChild(el.lastElementChild);
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue?vue&type=script&setup=true&lang.ts
var VPSponsorsGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSponsorsGrid",
	__ssrInlineRender: true,
	props: {
		size: { default: "medium" },
		data: {}
	},
	setup(__props) {
		const props = __props;
		const el = ref(null);
		useSponsorsGrid({
			el,
			size: props.size
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<ul${ssrRenderAttrs(mergeProps({
				class: ["VPSponsorsGrid vp-sponsor-grid", [__props.size]],
				ref_key: "el",
				ref: el
			}, _attrs))}><!--[-->`);
			ssrRenderList(__props.data, (sponsor) => {
				_push(`<li class="vp-sponsor-grid-item"><a class="vp-sponsor-grid-link"${ssrRenderAttr("href", sponsor.url)} target="_blank" rel="sponsored noopener"><article class="vp-sponsor-grid-box"><img class="vp-sponsor-grid-image"${ssrRenderAttr("src", sponsor.img)}${ssrRenderAttr("alt", sponsor.name)}></article></a></li>`);
			});
			_push(`<!--]--></ul>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue
var _sfc_setup$21 = VPSponsorsGrid_vue_vue_type_script_setup_true_lang_default.setup;
VPSponsorsGrid_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
var VPSponsorsGrid_default = VPSponsorsGrid_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue?vue&type=script&setup=true&lang.ts
var VPSponsors_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSponsors",
	__ssrInlineRender: true,
	props: {
		mode: { default: "normal" },
		tier: {},
		size: {},
		data: {}
	},
	setup(__props) {
		const props = __props;
		const sponsors = computed(() => {
			if (props.data.some((s) => {
				return "items" in s;
			})) return props.data;
			return [{
				tier: props.tier,
				size: props.size,
				items: props.data
			}];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPSponsors vp-sponsor", [__props.mode]] }, _attrs))}><!--[-->`);
			ssrRenderList(sponsors.value, (sponsor, index) => {
				_push(`<section class="vp-sponsor-section">`);
				if (sponsor.tier) _push(`<h3 class="vp-sponsor-tier">${ssrInterpolate(sponsor.tier)}</h3>`);
				else _push(`<!---->`);
				_push(ssrRenderComponent(VPSponsorsGrid_default, {
					size: sponsor.size,
					data: sponsor.items
				}, null, _parent));
				_push(`</section>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue
var _sfc_setup$20 = VPSponsors_vue_vue_type_script_setup_true_lang_default.setup;
VPSponsors_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
var VPSponsors_default = VPSponsors_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue?vue&type=script&setup=true&lang.ts
var VPDocAsideSponsors_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDocAsideSponsors",
	__ssrInlineRender: true,
	props: {
		tier: {},
		size: {},
		data: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideSponsors" }, _attrs))}>`);
			_push(ssrRenderComponent(VPSponsors_default, {
				mode: "aside",
				tier: __props.tier,
				size: __props.size,
				data: __props.data
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue
var _sfc_setup$19 = VPDocAsideSponsors_vue_vue_type_script_setup_true_lang_default.setup;
VPDocAsideSponsors_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue?vue&type=script&setup=true&lang.ts
var VPHomeSponsors_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeSponsors",
	__ssrInlineRender: true,
	props: {
		message: {},
		actionText: { default: "Become a sponsor" },
		actionLink: {},
		data: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "VPHomeSponsors" }, _attrs))} data-v-0eeda4b8><div class="container" data-v-0eeda4b8><div class="header" data-v-0eeda4b8><div class="love" data-v-0eeda4b8><span class="vpi-heart icon" data-v-0eeda4b8></span></div>`);
			if (__props.message) _push(`<h2 class="message" data-v-0eeda4b8>${ssrInterpolate(__props.message)}</h2>`);
			else _push(`<!---->`);
			_push(`</div><div class="sponsors" data-v-0eeda4b8>`);
			_push(ssrRenderComponent(VPSponsors_default, { data: __props.data }, null, _parent));
			_push(`</div>`);
			if (__props.actionLink) {
				_push(`<div class="action" data-v-0eeda4b8>`);
				_push(ssrRenderComponent(VPButton_default, {
					theme: "sponsor",
					text: __props.actionText,
					href: __props.actionLink
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue
var _sfc_setup$18 = VPHomeSponsors_vue_vue_type_script_setup_true_lang_default.setup;
VPHomeSponsors_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue?vue&type=script&setup=true&lang.ts
var VPTeamMembersItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPTeamMembersItem",
	__ssrInlineRender: true,
	props: {
		size: { default: "medium" },
		member: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({ class: ["VPTeamMembersItem", [__props.size]] }, _attrs))} data-v-b77360d1><div class="profile" data-v-b77360d1><figure class="avatar" data-v-b77360d1><img class="avatar-img"${ssrRenderAttr("src", __props.member.avatar)}${ssrRenderAttr("alt", __props.member.name)} data-v-b77360d1></figure><div class="data" data-v-b77360d1><h1 class="name" data-v-b77360d1>${ssrInterpolate(__props.member.name)}</h1>`);
			if (__props.member.title || __props.member.org) {
				_push(`<p class="affiliation" data-v-b77360d1>`);
				if (__props.member.title) _push(`<span class="title" data-v-b77360d1>${ssrInterpolate(__props.member.title)}</span>`);
				else _push(`<!---->`);
				if (__props.member.title && __props.member.org) _push(`<span class="at" data-v-b77360d1> @ </span>`);
				else _push(`<!---->`);
				if (__props.member.org) _push(ssrRenderComponent(VPLink_default, {
					class: ["org", { link: __props.member.orgLink }],
					href: __props.member.orgLink,
					"no-icon": ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(__props.member.org)}`);
						else return [createTextVNode(toDisplayString(__props.member.org), 1)];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(`</p>`);
			} else _push(`<!---->`);
			if (__props.member.desc) _push(`<p class="desc" data-v-b77360d1>${__props.member.desc ?? ""}</p>`);
			else _push(`<!---->`);
			if (__props.member.links) {
				_push(`<div class="links" data-v-b77360d1>`);
				_push(ssrRenderComponent(VPSocialLinks_default, {
					links: __props.member.links,
					me: false
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
			if (__props.member.sponsor) {
				_push(`<div class="sp" data-v-b77360d1>`);
				_push(ssrRenderComponent(VPLink_default, {
					class: "sp-link",
					href: __props.member.sponsor,
					"no-icon": ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span class="vpi-heart sp-icon" data-v-b77360d1${_scopeId}></span> ${ssrInterpolate(__props.member.actionText || "Sponsor")}`);
						else return [createVNode("span", { class: "vpi-heart sp-icon" }), createTextVNode(" " + toDisplayString(__props.member.actionText || "Sponsor"), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</article>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue
var _sfc_setup$17 = VPTeamMembersItem_vue_vue_type_script_setup_true_lang_default.setup;
VPTeamMembersItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
var VPTeamMembersItem_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPTeamMembersItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b77360d1"]]);
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue?vue&type=script&setup=true&lang.ts
var VPTeamMembers_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPTeamMembers",
	__ssrInlineRender: true,
	props: {
		size: { default: "medium" },
		members: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => [props.size, `count-${props.members.length}`]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["VPTeamMembers", classes.value] }, _attrs))} data-v-87e5e1d9><ul class="container" data-v-87e5e1d9><!--[-->`);
			ssrRenderList(__props.members, (member) => {
				_push(`<li class="item" data-v-87e5e1d9>`);
				_push(ssrRenderComponent(VPTeamMembersItem_default, {
					size: __props.size,
					member
				}, null, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div>`);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue
var _sfc_setup$16 = VPTeamMembers_vue_vue_type_script_setup_true_lang_default.setup;
VPTeamMembers_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue
var _sfc_main$15 = {};
var _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue
var _sfc_main$14 = {};
var _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue
var _sfc_main$13 = {};
var _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/without-fonts.js
var theme = {
	Layout: Layout_default,
	enhanceApp: ({ app }) => {
		app.component("Badge", VPBadge_default);
	}
};
//#endregion
//#region .vitepress/theme/RefererCompass.vue
var _sfc_main$12 = {
	__name: "RefererCompass",
	__ssrInlineRender: true,
	setup(__props) {
		const { params } = useData$1();
		const from = ref(null);
		onMounted(() => {
			const cur = params.value || {};
			if (!cur.key) return;
			try {
				const prev = JSON.parse(sessionStorage.getItem("uuidna:ref") || "null");
				if (prev && prev.key && prev.key !== cur.key) {
					const shared = [];
					if (prev.skill && prev.skill === cur.skill) shared.push("skill " + cur.skill);
					if (prev.principle && prev.principle === cur.principle) shared.push("principle " + cur.principle);
					from.value = {
						key: prev.key,
						name: prev.name,
						shared
					};
				}
				sessionStorage.setItem("uuidna:ref", JSON.stringify({
					key: cur.key,
					name: cur.name,
					skill: cur.skill,
					principle: cur.principle
				}));
			} catch {}
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (from.value) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "referer-compass" }, _attrs))}> You arrived from <a${ssrRenderAttr("href", unref(withBase)(`/theorem/${from.value.key}`))}>${ssrInterpolate(from.value.name)}</a>`);
				if (from.value.shared.length) _push(`<span> · shared ${ssrInterpolate(from.value.shared.join(" · "))}</span>`);
				else _push(`<!---->`);
				_push(`. </div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/RefererCompass.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
//#endregion
//#region .vitepress/theme/FoldAnimation.vue
var _sfc_main$11 = {
	__name: "FoldAnimation",
	__ssrInlineRender: true,
	props: { receipt: {
		type: String,
		default: "e2aa7698-…"
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<figure${ssrRenderAttrs(mergeProps({ class: "foldfig" }, _attrs))} data-v-1dd69c45><svg viewBox="0 0 700 250" class="fold" role="img" aria-label="Seven addresses folding to one receipt" data-v-1dd69c45><g class="edges" fill="none" stroke="var(--vp-c-divider)" stroke-width="2" data-v-1dd69c45><line class="lv1" x1="50" y1="215" x2="100" y2="150" data-v-1dd69c45></line><line class="lv1" x1="150" y1="215" x2="100" y2="150" data-v-1dd69c45></line><line class="lv1" x1="250" y1="215" x2="300" y2="150" data-v-1dd69c45></line><line class="lv1" x1="350" y1="215" x2="300" y2="150" data-v-1dd69c45></line><line class="lv1" x1="450" y1="215" x2="500" y2="150" data-v-1dd69c45></line><line class="lv1" x1="550" y1="215" x2="500" y2="150" data-v-1dd69c45></line><line class="lv1" x1="650" y1="215" x2="650" y2="150" data-v-1dd69c45></line><line class="lv2" x1="100" y1="150" x2="200" y2="80" data-v-1dd69c45></line><line class="lv2" x1="300" y1="150" x2="200" y2="80" data-v-1dd69c45></line><line class="lv2" x1="500" y1="150" x2="575" y2="80" data-v-1dd69c45></line><line class="lv2" x1="650" y1="150" x2="575" y2="80" data-v-1dd69c45></line><line class="lv3" x1="200" y1="80" x2="387" y2="30" data-v-1dd69c45></line><line class="lv3" x1="575" y1="80" x2="387" y2="30" data-v-1dd69c45></line></g><g class="nodes" fill="var(--vp-c-brand-1)" data-v-1dd69c45><circle class="lv0" cx="50" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="150" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="250" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="350" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="450" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="550" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv0" cx="650" cy="215" r="7" data-v-1dd69c45></circle><circle class="lv1" cx="100" cy="150" r="8" data-v-1dd69c45></circle><circle class="lv1" cx="300" cy="150" r="8" data-v-1dd69c45></circle><circle class="lv1" cx="500" cy="150" r="8" data-v-1dd69c45></circle><circle class="lv1" cx="650" cy="150" r="8" data-v-1dd69c45></circle><circle class="lv2" cx="200" cy="80" r="9" data-v-1dd69c45></circle><circle class="lv2" cx="575" cy="80" r="9" data-v-1dd69c45></circle><circle class="lv3 root" cx="387" cy="30" r="12" data-v-1dd69c45></circle></g></svg><figcaption data-v-1dd69c45> Seven addresses fold — order-invariant, O(log N) — to one receipt <code data-v-1dd69c45>${ssrInterpolate(__props.receipt)}</code>. Any pairing, forward or reverse, lands on the same root. </figcaption></figure>`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/FoldAnimation.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var FoldAnimation_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$11, [["__scopeId", "data-v-1dd69c45"]]);
new TextEncoder();
var BYTE_MASK = 255;
var MASK_32 = 4294967295n;
/** Exact 32-bit unsigned integer multiply — algebraic, via BigInt; the local theorem, no host intrinsic. */
function mul32(a, b) {
	return Number(BigInt(a >>> 0) * BigInt(b >>> 0) & MASK_32);
}
/** FNV-1a hash — 32-bit seed-based (exact integer arithmetic, no Math.*). */
function hash32(input, seed) {
	let h = (2166136261 ^ seed) >>> 0;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = mul32(h, 16777619) >>> 0;
		h ^= h >>> 13;
	}
	h = mul32(h ^ h >>> 16, 2246822507) >>> 0;
	h = mul32(h ^ h >>> 13, 3266489909) >>> 0;
	return (h ^ h >>> 16) >>> 0;
}
function hexByte(value) {
	return value.toString(16).padStart(2, "0");
}
function bytesFromSeed(seed) {
	return [
		hash32(seed, 0),
		hash32(seed, 2654435769),
		hash32(seed, 608135816),
		hash32(seed, 3084996962)
	].flatMap((word) => [
		word >>> 24 & BYTE_MASK,
		word >>> 16 & BYTE_MASK,
		word >>> 8 & BYTE_MASK,
		word & BYTE_MASK
	]);
}
var _uuidCache = /* @__PURE__ */ new Map();
/** Format 16 bytes as a v8 UUID string (version nibble 8, RFC-4122 variant). Shared by the FNV and SHA-256 addresses. */
function formatUuid(bytes) {
	const b = bytes.slice(0, 16);
	b[6] = b[6] & 15 | 128;
	b[8] = b[8] & 63 | 128;
	const hex = b.map(hexByte).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
/** Deterministic UUID from a seed string — the fast, public, NON-cryptographic content-address (FNV-1a).
*  Same input → same address, always. For adversary-resistant integrity use cryptoAddress. */
function toUuid(seed) {
	const cached = _uuidCache.get(seed);
	if (cached !== void 0) return cached;
	const uuid = formatUuid(bytesFromSeed(seed));
	_uuidCache.set(seed, uuid);
	return uuid;
}
/** Fold two addresses into one (order-sensitive). */
function merge(a, b) {
	return toUuid(`${a}:${b}`);
}
/** Merkle fold — contract a set of leaves to one root (order-INDEPENDENT: leaves are sorted first). */
function merkleFold(leaves) {
	let layer = [...leaves].sort();
	if (layer.length === 0) return toUuid("empty-mind");
	while (layer.length > 1) {
		const next = [];
		for (let i = 0; i < layer.length; i += 2) {
			const a = layer[i];
			const b = layer[i + 1];
			next.push(b === void 0 ? a : merge(a, b));
		}
		layer = next;
	}
	return layer[0];
}
/** Digital root in ℤ/9 (1..9; multiples of 9 map to 9). */
function digitalRoot(n) {
	const r = (n % 9 + 9) % 9;
	return r === 0 ? 9 : r;
}
//#endregion
//#region dist/imprint.js
var RESERVED = /* @__PURE__ */ new Set([
	48,
	49,
	50,
	51,
	64,
	65
]);
var LEN_BITS = 7;
var FREE = Array.from({ length: 128 }, (_, i) => i).filter((i) => !RESERVED.has(i));
var CAPACITY = FREE.length - LEN_BITS;
var isBits = (s) => /^[01]*$/.test(s);
var num2bits = (n, width) => n.toString(2).padStart(width, "0").slice(-width);
function bitsToUuid(bits) {
	let hex = "";
	for (let byte = 0; byte < 16; byte++) {
		let v = 0;
		for (let b = 0; b < 8; b++) v = v << 1 | bits[byte * 8 + b];
		hex += v.toString(16).padStart(2, "0");
	}
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function uuidToBits(uuid) {
	const hex = uuid.replace(/-/g, "");
	if (!/^[0-9a-f]{32}$/i.test(hex)) throw new Error("imprint: not a 32-hex uuid");
	const bits = [];
	for (const ch of hex) {
		const nib = parseInt(ch, 16);
		for (let b = 3; b >= 0; b--) bits.push(nib >> b & 1);
	}
	return bits;
}
/** imprint(message) → a valid uuid carrying the binary message ('0'/'1', length ≤ CAPACITY) in its free bits. */
function imprint(message) {
	if (!isBits(message)) throw new Error("imprint: message must be a binary string of 0/1");
	if (message.length > CAPACITY) throw new Error(`imprint: message ${message.length} bits > capacity ${CAPACITY}`);
	const bits = new Array(128).fill(0);
	bits[48] = 1;
	bits[49] = 0;
	bits[50] = 0;
	bits[51] = 0;
	bits[64] = 1;
	bits[65] = 0;
	const payload = num2bits(message.length, LEN_BITS) + message;
	for (let i = 0; i < payload.length; i++) bits[FREE[i]] = payload.charCodeAt(i) - 48;
	return bitsToUuid(bits);
}
/** readImprint(uuid) → the exact binary message imprinted by imprint(). Inverse of imprint. */
function readImprint(uuid) {
	const bits = uuidToBits(uuid);
	const free = FREE.map((i) => bits[i]);
	let len = 0;
	for (let i = 0; i < LEN_BITS; i++) len = len << 1 | free[i];
	if (len > CAPACITY) throw new Error("imprint: length header out of range — uuid was not imprinted by imprint()");
	return free.slice(LEN_BITS, LEN_BITS + len).join("");
}
/** imprintChain(bits) → a CHAIN of uuids carrying a binary message of ANY length (CAPACITY-bit chunks). */
function imprintChain(bits) {
	if (!/^[01]*$/.test(bits)) throw new Error("imprintChain: message must be a binary string");
	if (bits.length === 0) return [imprint("")];
	const out = [];
	for (let i = 0; i < bits.length; i += CAPACITY) out.push(imprint(bits.slice(i, i + CAPACITY)));
	return out;
}
/** readImprintChain(uuids) → recover the full binary message, exactly. */
function readImprintChain(uuids) {
	return uuids.map((u) => readImprint(u)).join("");
}
/** imprintTextChain(text) → a uuid chain carrying arbitrary UTF-8 text of any length. */
function imprintTextChain(text) {
	return imprintChain([...new TextEncoder().encode(text)].map((b) => num2bits(b, 8)).join(""));
}
/** readImprintTextChain(uuids) → recover the full text from its uuid chain, exactly. */
function readImprintTextChain(uuids) {
	const bits = readImprintChain(uuids);
	const bytes = [];
	for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
	return new TextDecoder().decode(new Uint8Array(bytes));
}
//#endregion
//#region dist/merkle.js
var leafHash = (l) => toUuid("leaf:" + l);
/** Root of the ordered merkle tree over leaves (an odd node is promoted, not duplicated). */
function merkleRoot(leaves) {
	if (leaves.length === 0) return toUuid("empty");
	let layer = leaves.map(leafHash);
	while (layer.length > 1) {
		const next = [];
		for (let i = 0; i < layer.length; i += 2) next.push(i + 1 < layer.length ? merge(layer[i], layer[i + 1]) : layer[i]);
		layer = next;
	}
	return layer[0];
}
//#endregion
//#region dist/theorems/generated.js
/** The 861 Lean-proven theorems, in computing-principle order. */
var LEAN_LEDGER = [
	{
		key: "mul9_1_1",
		name: "1·1 ≡ 1 (mod 9)",
		statement: "(1 * 1) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_2",
		name: "1·2 ≡ 2 (mod 9)",
		statement: "(1 * 2) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_3",
		name: "1·3 ≡ 3 (mod 9)",
		statement: "(1 * 3) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_4",
		name: "1·4 ≡ 4 (mod 9)",
		statement: "(1 * 4) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_5",
		name: "1·5 ≡ 5 (mod 9)",
		statement: "(1 * 5) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_6",
		name: "1·6 ≡ 6 (mod 9)",
		statement: "(1 * 6) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_7",
		name: "1·7 ≡ 7 (mod 9)",
		statement: "(1 * 7) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_1_8",
		name: "1·8 ≡ 8 (mod 9)",
		statement: "(1 * 8) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_1",
		name: "2·1 ≡ 2 (mod 9)",
		statement: "(2 * 1) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_2",
		name: "2·2 ≡ 4 (mod 9)",
		statement: "(2 * 2) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_3",
		name: "2·3 ≡ 6 (mod 9)",
		statement: "(2 * 3) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_4",
		name: "2·4 ≡ 8 (mod 9)",
		statement: "(2 * 4) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_5",
		name: "2·5 ≡ 1 (mod 9)",
		statement: "(2 * 5) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_6",
		name: "2·6 ≡ 3 (mod 9)",
		statement: "(2 * 6) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_7",
		name: "2·7 ≡ 5 (mod 9)",
		statement: "(2 * 7) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_2_8",
		name: "2·8 ≡ 7 (mod 9)",
		statement: "(2 * 8) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_1",
		name: "3·1 ≡ 3 (mod 9)",
		statement: "(3 * 1) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_2",
		name: "3·2 ≡ 6 (mod 9)",
		statement: "(3 * 2) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_3",
		name: "3·3 ≡ 0 (mod 9)",
		statement: "(3 * 3) % 9 = 0",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_4",
		name: "3·4 ≡ 3 (mod 9)",
		statement: "(3 * 4) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_5",
		name: "3·5 ≡ 6 (mod 9)",
		statement: "(3 * 5) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_6",
		name: "3·6 ≡ 0 (mod 9)",
		statement: "(3 * 6) % 9 = 0",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_7",
		name: "3·7 ≡ 3 (mod 9)",
		statement: "(3 * 7) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_3_8",
		name: "3·8 ≡ 6 (mod 9)",
		statement: "(3 * 8) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_1",
		name: "4·1 ≡ 4 (mod 9)",
		statement: "(4 * 1) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_2",
		name: "4·2 ≡ 8 (mod 9)",
		statement: "(4 * 2) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_3",
		name: "4·3 ≡ 3 (mod 9)",
		statement: "(4 * 3) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_4",
		name: "4·4 ≡ 7 (mod 9)",
		statement: "(4 * 4) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_5",
		name: "4·5 ≡ 2 (mod 9)",
		statement: "(4 * 5) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_6",
		name: "4·6 ≡ 6 (mod 9)",
		statement: "(4 * 6) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_7",
		name: "4·7 ≡ 1 (mod 9)",
		statement: "(4 * 7) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_4_8",
		name: "4·8 ≡ 5 (mod 9)",
		statement: "(4 * 8) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_1",
		name: "5·1 ≡ 5 (mod 9)",
		statement: "(5 * 1) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_2",
		name: "5·2 ≡ 1 (mod 9)",
		statement: "(5 * 2) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_3",
		name: "5·3 ≡ 6 (mod 9)",
		statement: "(5 * 3) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_4",
		name: "5·4 ≡ 2 (mod 9)",
		statement: "(5 * 4) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_5",
		name: "5·5 ≡ 7 (mod 9)",
		statement: "(5 * 5) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_6",
		name: "5·6 ≡ 3 (mod 9)",
		statement: "(5 * 6) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_7",
		name: "5·7 ≡ 8 (mod 9)",
		statement: "(5 * 7) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_5_8",
		name: "5·8 ≡ 4 (mod 9)",
		statement: "(5 * 8) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_1",
		name: "6·1 ≡ 6 (mod 9)",
		statement: "(6 * 1) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_2",
		name: "6·2 ≡ 3 (mod 9)",
		statement: "(6 * 2) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_3",
		name: "6·3 ≡ 0 (mod 9)",
		statement: "(6 * 3) % 9 = 0",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_4",
		name: "6·4 ≡ 6 (mod 9)",
		statement: "(6 * 4) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_5",
		name: "6·5 ≡ 3 (mod 9)",
		statement: "(6 * 5) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_6",
		name: "6·6 ≡ 0 (mod 9)",
		statement: "(6 * 6) % 9 = 0",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_7",
		name: "6·7 ≡ 6 (mod 9)",
		statement: "(6 * 7) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_6_8",
		name: "6·8 ≡ 3 (mod 9)",
		statement: "(6 * 8) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_1",
		name: "7·1 ≡ 7 (mod 9)",
		statement: "(7 * 1) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_2",
		name: "7·2 ≡ 5 (mod 9)",
		statement: "(7 * 2) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_3",
		name: "7·3 ≡ 3 (mod 9)",
		statement: "(7 * 3) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_4",
		name: "7·4 ≡ 1 (mod 9)",
		statement: "(7 * 4) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_5",
		name: "7·5 ≡ 8 (mod 9)",
		statement: "(7 * 5) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_6",
		name: "7·6 ≡ 6 (mod 9)",
		statement: "(7 * 6) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_7",
		name: "7·7 ≡ 4 (mod 9)",
		statement: "(7 * 7) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_7_8",
		name: "7·8 ≡ 2 (mod 9)",
		statement: "(7 * 8) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_1",
		name: "8·1 ≡ 8 (mod 9)",
		statement: "(8 * 1) % 9 = 8",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_2",
		name: "8·2 ≡ 7 (mod 9)",
		statement: "(8 * 2) % 9 = 7",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_3",
		name: "8·3 ≡ 6 (mod 9)",
		statement: "(8 * 3) % 9 = 6",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_4",
		name: "8·4 ≡ 5 (mod 9)",
		statement: "(8 * 4) % 9 = 5",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_5",
		name: "8·5 ≡ 4 (mod 9)",
		statement: "(8 * 5) % 9 = 4",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_6",
		name: "8·6 ≡ 3 (mod 9)",
		statement: "(8 * 6) % 9 = 3",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_7",
		name: "8·7 ≡ 2 (mod 9)",
		statement: "(8 * 7) % 9 = 2",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "mul9_8_8",
		name: "8·8 ≡ 1 (mod 9)",
		statement: "(8 * 8) % 9 = 1",
		tactic: "decide",
		file: "Core.lean",
		principle: "The 8×8 core"
	},
	{
		key: "z9mul_0_0",
		name: "0·0 ≡ 0 (mod 9)",
		statement: "(0 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_0",
		name: "0+0 ≡ 0 (mod 9)",
		statement: "(0 + 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_1",
		name: "0·1 ≡ 0 (mod 9)",
		statement: "(0 * 1) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_1",
		name: "0+1 ≡ 1 (mod 9)",
		statement: "(0 + 1) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_2",
		name: "0·2 ≡ 0 (mod 9)",
		statement: "(0 * 2) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_2",
		name: "0+2 ≡ 2 (mod 9)",
		statement: "(0 + 2) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_3",
		name: "0·3 ≡ 0 (mod 9)",
		statement: "(0 * 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_3",
		name: "0+3 ≡ 3 (mod 9)",
		statement: "(0 + 3) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_4",
		name: "0·4 ≡ 0 (mod 9)",
		statement: "(0 * 4) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_4",
		name: "0+4 ≡ 4 (mod 9)",
		statement: "(0 + 4) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_5",
		name: "0·5 ≡ 0 (mod 9)",
		statement: "(0 * 5) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_5",
		name: "0+5 ≡ 5 (mod 9)",
		statement: "(0 + 5) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_6",
		name: "0·6 ≡ 0 (mod 9)",
		statement: "(0 * 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_6",
		name: "0+6 ≡ 6 (mod 9)",
		statement: "(0 + 6) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_7",
		name: "0·7 ≡ 0 (mod 9)",
		statement: "(0 * 7) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_7",
		name: "0+7 ≡ 7 (mod 9)",
		statement: "(0 + 7) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_0_8",
		name: "0·8 ≡ 0 (mod 9)",
		statement: "(0 * 8) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_0_8",
		name: "0+8 ≡ 8 (mod 9)",
		statement: "(0 + 8) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_0",
		name: "1·0 ≡ 0 (mod 9)",
		statement: "(1 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_0",
		name: "1+0 ≡ 1 (mod 9)",
		statement: "(1 + 0) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_1",
		name: "1·1 ≡ 1 (mod 9)",
		statement: "(1 * 1) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_1",
		name: "1+1 ≡ 2 (mod 9)",
		statement: "(1 + 1) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_2",
		name: "1·2 ≡ 2 (mod 9)",
		statement: "(1 * 2) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_2",
		name: "1+2 ≡ 3 (mod 9)",
		statement: "(1 + 2) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_3",
		name: "1·3 ≡ 3 (mod 9)",
		statement: "(1 * 3) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_3",
		name: "1+3 ≡ 4 (mod 9)",
		statement: "(1 + 3) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_4",
		name: "1·4 ≡ 4 (mod 9)",
		statement: "(1 * 4) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_4",
		name: "1+4 ≡ 5 (mod 9)",
		statement: "(1 + 4) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_5",
		name: "1·5 ≡ 5 (mod 9)",
		statement: "(1 * 5) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_5",
		name: "1+5 ≡ 6 (mod 9)",
		statement: "(1 + 5) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_6",
		name: "1·6 ≡ 6 (mod 9)",
		statement: "(1 * 6) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_6",
		name: "1+6 ≡ 7 (mod 9)",
		statement: "(1 + 6) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_7",
		name: "1·7 ≡ 7 (mod 9)",
		statement: "(1 * 7) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_7",
		name: "1+7 ≡ 8 (mod 9)",
		statement: "(1 + 7) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_1_8",
		name: "1·8 ≡ 8 (mod 9)",
		statement: "(1 * 8) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_1_8",
		name: "1+8 ≡ 0 (mod 9)",
		statement: "(1 + 8) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_0",
		name: "2·0 ≡ 0 (mod 9)",
		statement: "(2 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_0",
		name: "2+0 ≡ 2 (mod 9)",
		statement: "(2 + 0) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_1",
		name: "2·1 ≡ 2 (mod 9)",
		statement: "(2 * 1) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_1",
		name: "2+1 ≡ 3 (mod 9)",
		statement: "(2 + 1) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_2",
		name: "2·2 ≡ 4 (mod 9)",
		statement: "(2 * 2) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_2",
		name: "2+2 ≡ 4 (mod 9)",
		statement: "(2 + 2) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_3",
		name: "2·3 ≡ 6 (mod 9)",
		statement: "(2 * 3) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_3",
		name: "2+3 ≡ 5 (mod 9)",
		statement: "(2 + 3) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_4",
		name: "2·4 ≡ 8 (mod 9)",
		statement: "(2 * 4) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_4",
		name: "2+4 ≡ 6 (mod 9)",
		statement: "(2 + 4) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_5",
		name: "2·5 ≡ 1 (mod 9)",
		statement: "(2 * 5) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_5",
		name: "2+5 ≡ 7 (mod 9)",
		statement: "(2 + 5) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_6",
		name: "2·6 ≡ 3 (mod 9)",
		statement: "(2 * 6) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_6",
		name: "2+6 ≡ 8 (mod 9)",
		statement: "(2 + 6) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_7",
		name: "2·7 ≡ 5 (mod 9)",
		statement: "(2 * 7) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_7",
		name: "2+7 ≡ 0 (mod 9)",
		statement: "(2 + 7) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_2_8",
		name: "2·8 ≡ 7 (mod 9)",
		statement: "(2 * 8) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_2_8",
		name: "2+8 ≡ 1 (mod 9)",
		statement: "(2 + 8) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_0",
		name: "3·0 ≡ 0 (mod 9)",
		statement: "(3 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_0",
		name: "3+0 ≡ 3 (mod 9)",
		statement: "(3 + 0) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_1",
		name: "3·1 ≡ 3 (mod 9)",
		statement: "(3 * 1) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_1",
		name: "3+1 ≡ 4 (mod 9)",
		statement: "(3 + 1) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_2",
		name: "3·2 ≡ 6 (mod 9)",
		statement: "(3 * 2) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_2",
		name: "3+2 ≡ 5 (mod 9)",
		statement: "(3 + 2) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_3",
		name: "3·3 ≡ 0 (mod 9)",
		statement: "(3 * 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_3",
		name: "3+3 ≡ 6 (mod 9)",
		statement: "(3 + 3) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_4",
		name: "3·4 ≡ 3 (mod 9)",
		statement: "(3 * 4) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_4",
		name: "3+4 ≡ 7 (mod 9)",
		statement: "(3 + 4) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_5",
		name: "3·5 ≡ 6 (mod 9)",
		statement: "(3 * 5) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_5",
		name: "3+5 ≡ 8 (mod 9)",
		statement: "(3 + 5) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_6",
		name: "3·6 ≡ 0 (mod 9)",
		statement: "(3 * 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_6",
		name: "3+6 ≡ 0 (mod 9)",
		statement: "(3 + 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_7",
		name: "3·7 ≡ 3 (mod 9)",
		statement: "(3 * 7) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_7",
		name: "3+7 ≡ 1 (mod 9)",
		statement: "(3 + 7) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_3_8",
		name: "3·8 ≡ 6 (mod 9)",
		statement: "(3 * 8) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_3_8",
		name: "3+8 ≡ 2 (mod 9)",
		statement: "(3 + 8) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_0",
		name: "4·0 ≡ 0 (mod 9)",
		statement: "(4 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_0",
		name: "4+0 ≡ 4 (mod 9)",
		statement: "(4 + 0) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_1",
		name: "4·1 ≡ 4 (mod 9)",
		statement: "(4 * 1) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_1",
		name: "4+1 ≡ 5 (mod 9)",
		statement: "(4 + 1) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_2",
		name: "4·2 ≡ 8 (mod 9)",
		statement: "(4 * 2) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_2",
		name: "4+2 ≡ 6 (mod 9)",
		statement: "(4 + 2) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_3",
		name: "4·3 ≡ 3 (mod 9)",
		statement: "(4 * 3) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_3",
		name: "4+3 ≡ 7 (mod 9)",
		statement: "(4 + 3) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_4",
		name: "4·4 ≡ 7 (mod 9)",
		statement: "(4 * 4) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_4",
		name: "4+4 ≡ 8 (mod 9)",
		statement: "(4 + 4) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_5",
		name: "4·5 ≡ 2 (mod 9)",
		statement: "(4 * 5) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_5",
		name: "4+5 ≡ 0 (mod 9)",
		statement: "(4 + 5) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_6",
		name: "4·6 ≡ 6 (mod 9)",
		statement: "(4 * 6) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_6",
		name: "4+6 ≡ 1 (mod 9)",
		statement: "(4 + 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_7",
		name: "4·7 ≡ 1 (mod 9)",
		statement: "(4 * 7) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_7",
		name: "4+7 ≡ 2 (mod 9)",
		statement: "(4 + 7) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_4_8",
		name: "4·8 ≡ 5 (mod 9)",
		statement: "(4 * 8) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_4_8",
		name: "4+8 ≡ 3 (mod 9)",
		statement: "(4 + 8) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_0",
		name: "5·0 ≡ 0 (mod 9)",
		statement: "(5 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_0",
		name: "5+0 ≡ 5 (mod 9)",
		statement: "(5 + 0) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_1",
		name: "5·1 ≡ 5 (mod 9)",
		statement: "(5 * 1) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_1",
		name: "5+1 ≡ 6 (mod 9)",
		statement: "(5 + 1) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_2",
		name: "5·2 ≡ 1 (mod 9)",
		statement: "(5 * 2) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_2",
		name: "5+2 ≡ 7 (mod 9)",
		statement: "(5 + 2) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_3",
		name: "5·3 ≡ 6 (mod 9)",
		statement: "(5 * 3) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_3",
		name: "5+3 ≡ 8 (mod 9)",
		statement: "(5 + 3) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_4",
		name: "5·4 ≡ 2 (mod 9)",
		statement: "(5 * 4) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_4",
		name: "5+4 ≡ 0 (mod 9)",
		statement: "(5 + 4) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_5",
		name: "5·5 ≡ 7 (mod 9)",
		statement: "(5 * 5) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_5",
		name: "5+5 ≡ 1 (mod 9)",
		statement: "(5 + 5) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_6",
		name: "5·6 ≡ 3 (mod 9)",
		statement: "(5 * 6) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_6",
		name: "5+6 ≡ 2 (mod 9)",
		statement: "(5 + 6) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_7",
		name: "5·7 ≡ 8 (mod 9)",
		statement: "(5 * 7) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_7",
		name: "5+7 ≡ 3 (mod 9)",
		statement: "(5 + 7) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_5_8",
		name: "5·8 ≡ 4 (mod 9)",
		statement: "(5 * 8) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_5_8",
		name: "5+8 ≡ 4 (mod 9)",
		statement: "(5 + 8) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_0",
		name: "6·0 ≡ 0 (mod 9)",
		statement: "(6 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_0",
		name: "6+0 ≡ 6 (mod 9)",
		statement: "(6 + 0) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_1",
		name: "6·1 ≡ 6 (mod 9)",
		statement: "(6 * 1) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_1",
		name: "6+1 ≡ 7 (mod 9)",
		statement: "(6 + 1) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_2",
		name: "6·2 ≡ 3 (mod 9)",
		statement: "(6 * 2) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_2",
		name: "6+2 ≡ 8 (mod 9)",
		statement: "(6 + 2) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_3",
		name: "6·3 ≡ 0 (mod 9)",
		statement: "(6 * 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_3",
		name: "6+3 ≡ 0 (mod 9)",
		statement: "(6 + 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_4",
		name: "6·4 ≡ 6 (mod 9)",
		statement: "(6 * 4) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_4",
		name: "6+4 ≡ 1 (mod 9)",
		statement: "(6 + 4) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_5",
		name: "6·5 ≡ 3 (mod 9)",
		statement: "(6 * 5) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_5",
		name: "6+5 ≡ 2 (mod 9)",
		statement: "(6 + 5) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_6",
		name: "6·6 ≡ 0 (mod 9)",
		statement: "(6 * 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_6",
		name: "6+6 ≡ 3 (mod 9)",
		statement: "(6 + 6) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_7",
		name: "6·7 ≡ 6 (mod 9)",
		statement: "(6 * 7) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_7",
		name: "6+7 ≡ 4 (mod 9)",
		statement: "(6 + 7) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_6_8",
		name: "6·8 ≡ 3 (mod 9)",
		statement: "(6 * 8) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_6_8",
		name: "6+8 ≡ 5 (mod 9)",
		statement: "(6 + 8) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_0",
		name: "7·0 ≡ 0 (mod 9)",
		statement: "(7 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_0",
		name: "7+0 ≡ 7 (mod 9)",
		statement: "(7 + 0) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_1",
		name: "7·1 ≡ 7 (mod 9)",
		statement: "(7 * 1) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_1",
		name: "7+1 ≡ 8 (mod 9)",
		statement: "(7 + 1) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_2",
		name: "7·2 ≡ 5 (mod 9)",
		statement: "(7 * 2) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_2",
		name: "7+2 ≡ 0 (mod 9)",
		statement: "(7 + 2) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_3",
		name: "7·3 ≡ 3 (mod 9)",
		statement: "(7 * 3) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_3",
		name: "7+3 ≡ 1 (mod 9)",
		statement: "(7 + 3) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_4",
		name: "7·4 ≡ 1 (mod 9)",
		statement: "(7 * 4) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_4",
		name: "7+4 ≡ 2 (mod 9)",
		statement: "(7 + 4) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_5",
		name: "7·5 ≡ 8 (mod 9)",
		statement: "(7 * 5) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_5",
		name: "7+5 ≡ 3 (mod 9)",
		statement: "(7 + 5) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_6",
		name: "7·6 ≡ 6 (mod 9)",
		statement: "(7 * 6) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_6",
		name: "7+6 ≡ 4 (mod 9)",
		statement: "(7 + 6) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_7",
		name: "7·7 ≡ 4 (mod 9)",
		statement: "(7 * 7) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_7",
		name: "7+7 ≡ 5 (mod 9)",
		statement: "(7 + 7) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_7_8",
		name: "7·8 ≡ 2 (mod 9)",
		statement: "(7 * 8) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_7_8",
		name: "7+8 ≡ 6 (mod 9)",
		statement: "(7 + 8) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_0",
		name: "8·0 ≡ 0 (mod 9)",
		statement: "(8 * 0) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_0",
		name: "8+0 ≡ 8 (mod 9)",
		statement: "(8 + 0) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_1",
		name: "8·1 ≡ 8 (mod 9)",
		statement: "(8 * 1) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_1",
		name: "8+1 ≡ 0 (mod 9)",
		statement: "(8 + 1) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_2",
		name: "8·2 ≡ 7 (mod 9)",
		statement: "(8 * 2) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_2",
		name: "8+2 ≡ 1 (mod 9)",
		statement: "(8 + 2) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_3",
		name: "8·3 ≡ 6 (mod 9)",
		statement: "(8 * 3) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_3",
		name: "8+3 ≡ 2 (mod 9)",
		statement: "(8 + 3) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_4",
		name: "8·4 ≡ 5 (mod 9)",
		statement: "(8 * 4) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_4",
		name: "8+4 ≡ 3 (mod 9)",
		statement: "(8 + 4) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_5",
		name: "8·5 ≡ 4 (mod 9)",
		statement: "(8 * 5) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_5",
		name: "8+5 ≡ 4 (mod 9)",
		statement: "(8 + 5) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_6",
		name: "8·6 ≡ 3 (mod 9)",
		statement: "(8 * 6) % 9 = 3",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_6",
		name: "8+6 ≡ 5 (mod 9)",
		statement: "(8 + 6) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_7",
		name: "8·7 ≡ 2 (mod 9)",
		statement: "(8 * 7) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_7",
		name: "8+7 ≡ 6 (mod 9)",
		statement: "(8 + 7) % 9 = 6",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9mul_8_8",
		name: "8·8 ≡ 1 (mod 9)",
		statement: "(8 * 8) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9add_8_8",
		name: "8+8 ≡ 7 (mod 9)",
		statement: "(8 + 8) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_2",
		name: "0^2 ≡ 0 (mod 9)",
		statement: "(0 ^ 2) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_3",
		name: "0^3 ≡ 0 (mod 9)",
		statement: "(0 ^ 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_4",
		name: "0^4 ≡ 0 (mod 9)",
		statement: "(0 ^ 4) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_5",
		name: "0^5 ≡ 0 (mod 9)",
		statement: "(0 ^ 5) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_6",
		name: "0^6 ≡ 0 (mod 9)",
		statement: "(0 ^ 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_7",
		name: "0^7 ≡ 0 (mod 9)",
		statement: "(0 ^ 7) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_8",
		name: "0^8 ≡ 0 (mod 9)",
		statement: "(0 ^ 8) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_0_9",
		name: "0^9 ≡ 0 (mod 9)",
		statement: "(0 ^ 9) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_2",
		name: "1^2 ≡ 1 (mod 9)",
		statement: "(1 ^ 2) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_3",
		name: "1^3 ≡ 1 (mod 9)",
		statement: "(1 ^ 3) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_4",
		name: "1^4 ≡ 1 (mod 9)",
		statement: "(1 ^ 4) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_5",
		name: "1^5 ≡ 1 (mod 9)",
		statement: "(1 ^ 5) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_6",
		name: "1^6 ≡ 1 (mod 9)",
		statement: "(1 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_7",
		name: "1^7 ≡ 1 (mod 9)",
		statement: "(1 ^ 7) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_8",
		name: "1^8 ≡ 1 (mod 9)",
		statement: "(1 ^ 8) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_1_9",
		name: "1^9 ≡ 1 (mod 9)",
		statement: "(1 ^ 9) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_2",
		name: "2^2 ≡ 4 (mod 9)",
		statement: "(2 ^ 2) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_3",
		name: "2^3 ≡ 8 (mod 9)",
		statement: "(2 ^ 3) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_4",
		name: "2^4 ≡ 7 (mod 9)",
		statement: "(2 ^ 4) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_5",
		name: "2^5 ≡ 5 (mod 9)",
		statement: "(2 ^ 5) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_6",
		name: "2^6 ≡ 1 (mod 9)",
		statement: "(2 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_7",
		name: "2^7 ≡ 2 (mod 9)",
		statement: "(2 ^ 7) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_8",
		name: "2^8 ≡ 4 (mod 9)",
		statement: "(2 ^ 8) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_2_9",
		name: "2^9 ≡ 8 (mod 9)",
		statement: "(2 ^ 9) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_2",
		name: "3^2 ≡ 0 (mod 9)",
		statement: "(3 ^ 2) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_3",
		name: "3^3 ≡ 0 (mod 9)",
		statement: "(3 ^ 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_4",
		name: "3^4 ≡ 0 (mod 9)",
		statement: "(3 ^ 4) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_5",
		name: "3^5 ≡ 0 (mod 9)",
		statement: "(3 ^ 5) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_6",
		name: "3^6 ≡ 0 (mod 9)",
		statement: "(3 ^ 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_7",
		name: "3^7 ≡ 0 (mod 9)",
		statement: "(3 ^ 7) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_8",
		name: "3^8 ≡ 0 (mod 9)",
		statement: "(3 ^ 8) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_3_9",
		name: "3^9 ≡ 0 (mod 9)",
		statement: "(3 ^ 9) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_2",
		name: "4^2 ≡ 7 (mod 9)",
		statement: "(4 ^ 2) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_3",
		name: "4^3 ≡ 1 (mod 9)",
		statement: "(4 ^ 3) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_4",
		name: "4^4 ≡ 4 (mod 9)",
		statement: "(4 ^ 4) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_5",
		name: "4^5 ≡ 7 (mod 9)",
		statement: "(4 ^ 5) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_6",
		name: "4^6 ≡ 1 (mod 9)",
		statement: "(4 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_7",
		name: "4^7 ≡ 4 (mod 9)",
		statement: "(4 ^ 7) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_8",
		name: "4^8 ≡ 7 (mod 9)",
		statement: "(4 ^ 8) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_4_9",
		name: "4^9 ≡ 1 (mod 9)",
		statement: "(4 ^ 9) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_2",
		name: "5^2 ≡ 7 (mod 9)",
		statement: "(5 ^ 2) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_3",
		name: "5^3 ≡ 8 (mod 9)",
		statement: "(5 ^ 3) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_4",
		name: "5^4 ≡ 4 (mod 9)",
		statement: "(5 ^ 4) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_5",
		name: "5^5 ≡ 2 (mod 9)",
		statement: "(5 ^ 5) % 9 = 2",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_6",
		name: "5^6 ≡ 1 (mod 9)",
		statement: "(5 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_7",
		name: "5^7 ≡ 5 (mod 9)",
		statement: "(5 ^ 7) % 9 = 5",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_8",
		name: "5^8 ≡ 7 (mod 9)",
		statement: "(5 ^ 8) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_5_9",
		name: "5^9 ≡ 8 (mod 9)",
		statement: "(5 ^ 9) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_2",
		name: "6^2 ≡ 0 (mod 9)",
		statement: "(6 ^ 2) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_3",
		name: "6^3 ≡ 0 (mod 9)",
		statement: "(6 ^ 3) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_4",
		name: "6^4 ≡ 0 (mod 9)",
		statement: "(6 ^ 4) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_5",
		name: "6^5 ≡ 0 (mod 9)",
		statement: "(6 ^ 5) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_6",
		name: "6^6 ≡ 0 (mod 9)",
		statement: "(6 ^ 6) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_7",
		name: "6^7 ≡ 0 (mod 9)",
		statement: "(6 ^ 7) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_8",
		name: "6^8 ≡ 0 (mod 9)",
		statement: "(6 ^ 8) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_6_9",
		name: "6^9 ≡ 0 (mod 9)",
		statement: "(6 ^ 9) % 9 = 0",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_2",
		name: "7^2 ≡ 4 (mod 9)",
		statement: "(7 ^ 2) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_3",
		name: "7^3 ≡ 1 (mod 9)",
		statement: "(7 ^ 3) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_4",
		name: "7^4 ≡ 7 (mod 9)",
		statement: "(7 ^ 4) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_5",
		name: "7^5 ≡ 4 (mod 9)",
		statement: "(7 ^ 5) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_6",
		name: "7^6 ≡ 1 (mod 9)",
		statement: "(7 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_7",
		name: "7^7 ≡ 7 (mod 9)",
		statement: "(7 ^ 7) % 9 = 7",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_8",
		name: "7^8 ≡ 4 (mod 9)",
		statement: "(7 ^ 8) % 9 = 4",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_7_9",
		name: "7^9 ≡ 1 (mod 9)",
		statement: "(7 ^ 9) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_2",
		name: "8^2 ≡ 1 (mod 9)",
		statement: "(8 ^ 2) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_3",
		name: "8^3 ≡ 8 (mod 9)",
		statement: "(8 ^ 3) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_4",
		name: "8^4 ≡ 1 (mod 9)",
		statement: "(8 ^ 4) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_5",
		name: "8^5 ≡ 8 (mod 9)",
		statement: "(8 ^ 5) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_6",
		name: "8^6 ≡ 1 (mod 9)",
		statement: "(8 ^ 6) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_7",
		name: "8^7 ≡ 8 (mod 9)",
		statement: "(8 ^ 7) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_8",
		name: "8^8 ≡ 1 (mod 9)",
		statement: "(8 ^ 8) % 9 = 1",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z9pow_8_9",
		name: "8^9 ≡ 8 (mod 9)",
		statement: "(8 ^ 9) % 9 = 8",
		tactic: "decide",
		file: "Ring.lean",
		principle: "The ring ℤ/9"
	},
	{
		key: "z7mul_0_0",
		name: "0·0 ≡ 0 (mod 7)",
		statement: "(0 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_0",
		name: "0+0 ≡ 0 (mod 7)",
		statement: "(0 + 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_1",
		name: "0·1 ≡ 0 (mod 7)",
		statement: "(0 * 1) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_1",
		name: "0+1 ≡ 1 (mod 7)",
		statement: "(0 + 1) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_2",
		name: "0·2 ≡ 0 (mod 7)",
		statement: "(0 * 2) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_2",
		name: "0+2 ≡ 2 (mod 7)",
		statement: "(0 + 2) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_3",
		name: "0·3 ≡ 0 (mod 7)",
		statement: "(0 * 3) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_3",
		name: "0+3 ≡ 3 (mod 7)",
		statement: "(0 + 3) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_4",
		name: "0·4 ≡ 0 (mod 7)",
		statement: "(0 * 4) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_4",
		name: "0+4 ≡ 4 (mod 7)",
		statement: "(0 + 4) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_5",
		name: "0·5 ≡ 0 (mod 7)",
		statement: "(0 * 5) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_5",
		name: "0+5 ≡ 5 (mod 7)",
		statement: "(0 + 5) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_0_6",
		name: "0·6 ≡ 0 (mod 7)",
		statement: "(0 * 6) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_0_6",
		name: "0+6 ≡ 6 (mod 7)",
		statement: "(0 + 6) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_0",
		name: "1·0 ≡ 0 (mod 7)",
		statement: "(1 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_0",
		name: "1+0 ≡ 1 (mod 7)",
		statement: "(1 + 0) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_1",
		name: "1·1 ≡ 1 (mod 7)",
		statement: "(1 * 1) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_1",
		name: "1+1 ≡ 2 (mod 7)",
		statement: "(1 + 1) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_2",
		name: "1·2 ≡ 2 (mod 7)",
		statement: "(1 * 2) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_2",
		name: "1+2 ≡ 3 (mod 7)",
		statement: "(1 + 2) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_3",
		name: "1·3 ≡ 3 (mod 7)",
		statement: "(1 * 3) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_3",
		name: "1+3 ≡ 4 (mod 7)",
		statement: "(1 + 3) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_4",
		name: "1·4 ≡ 4 (mod 7)",
		statement: "(1 * 4) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_4",
		name: "1+4 ≡ 5 (mod 7)",
		statement: "(1 + 4) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_5",
		name: "1·5 ≡ 5 (mod 7)",
		statement: "(1 * 5) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_5",
		name: "1+5 ≡ 6 (mod 7)",
		statement: "(1 + 5) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_1_6",
		name: "1·6 ≡ 6 (mod 7)",
		statement: "(1 * 6) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_1_6",
		name: "1+6 ≡ 0 (mod 7)",
		statement: "(1 + 6) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_0",
		name: "2·0 ≡ 0 (mod 7)",
		statement: "(2 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_0",
		name: "2+0 ≡ 2 (mod 7)",
		statement: "(2 + 0) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_1",
		name: "2·1 ≡ 2 (mod 7)",
		statement: "(2 * 1) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_1",
		name: "2+1 ≡ 3 (mod 7)",
		statement: "(2 + 1) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_2",
		name: "2·2 ≡ 4 (mod 7)",
		statement: "(2 * 2) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_2",
		name: "2+2 ≡ 4 (mod 7)",
		statement: "(2 + 2) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_3",
		name: "2·3 ≡ 6 (mod 7)",
		statement: "(2 * 3) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_3",
		name: "2+3 ≡ 5 (mod 7)",
		statement: "(2 + 3) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_4",
		name: "2·4 ≡ 1 (mod 7)",
		statement: "(2 * 4) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_4",
		name: "2+4 ≡ 6 (mod 7)",
		statement: "(2 + 4) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_5",
		name: "2·5 ≡ 3 (mod 7)",
		statement: "(2 * 5) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_5",
		name: "2+5 ≡ 0 (mod 7)",
		statement: "(2 + 5) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_2_6",
		name: "2·6 ≡ 5 (mod 7)",
		statement: "(2 * 6) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_2_6",
		name: "2+6 ≡ 1 (mod 7)",
		statement: "(2 + 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_0",
		name: "3·0 ≡ 0 (mod 7)",
		statement: "(3 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_0",
		name: "3+0 ≡ 3 (mod 7)",
		statement: "(3 + 0) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_1",
		name: "3·1 ≡ 3 (mod 7)",
		statement: "(3 * 1) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_1",
		name: "3+1 ≡ 4 (mod 7)",
		statement: "(3 + 1) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_2",
		name: "3·2 ≡ 6 (mod 7)",
		statement: "(3 * 2) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_2",
		name: "3+2 ≡ 5 (mod 7)",
		statement: "(3 + 2) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_3",
		name: "3·3 ≡ 2 (mod 7)",
		statement: "(3 * 3) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_3",
		name: "3+3 ≡ 6 (mod 7)",
		statement: "(3 + 3) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_4",
		name: "3·4 ≡ 5 (mod 7)",
		statement: "(3 * 4) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_4",
		name: "3+4 ≡ 0 (mod 7)",
		statement: "(3 + 4) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_5",
		name: "3·5 ≡ 1 (mod 7)",
		statement: "(3 * 5) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_5",
		name: "3+5 ≡ 1 (mod 7)",
		statement: "(3 + 5) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_3_6",
		name: "3·6 ≡ 4 (mod 7)",
		statement: "(3 * 6) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_3_6",
		name: "3+6 ≡ 2 (mod 7)",
		statement: "(3 + 6) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_0",
		name: "4·0 ≡ 0 (mod 7)",
		statement: "(4 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_0",
		name: "4+0 ≡ 4 (mod 7)",
		statement: "(4 + 0) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_1",
		name: "4·1 ≡ 4 (mod 7)",
		statement: "(4 * 1) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_1",
		name: "4+1 ≡ 5 (mod 7)",
		statement: "(4 + 1) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_2",
		name: "4·2 ≡ 1 (mod 7)",
		statement: "(4 * 2) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_2",
		name: "4+2 ≡ 6 (mod 7)",
		statement: "(4 + 2) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_3",
		name: "4·3 ≡ 5 (mod 7)",
		statement: "(4 * 3) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_3",
		name: "4+3 ≡ 0 (mod 7)",
		statement: "(4 + 3) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_4",
		name: "4·4 ≡ 2 (mod 7)",
		statement: "(4 * 4) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_4",
		name: "4+4 ≡ 1 (mod 7)",
		statement: "(4 + 4) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_5",
		name: "4·5 ≡ 6 (mod 7)",
		statement: "(4 * 5) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_5",
		name: "4+5 ≡ 2 (mod 7)",
		statement: "(4 + 5) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_4_6",
		name: "4·6 ≡ 3 (mod 7)",
		statement: "(4 * 6) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_4_6",
		name: "4+6 ≡ 3 (mod 7)",
		statement: "(4 + 6) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_0",
		name: "5·0 ≡ 0 (mod 7)",
		statement: "(5 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_0",
		name: "5+0 ≡ 5 (mod 7)",
		statement: "(5 + 0) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_1",
		name: "5·1 ≡ 5 (mod 7)",
		statement: "(5 * 1) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_1",
		name: "5+1 ≡ 6 (mod 7)",
		statement: "(5 + 1) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_2",
		name: "5·2 ≡ 3 (mod 7)",
		statement: "(5 * 2) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_2",
		name: "5+2 ≡ 0 (mod 7)",
		statement: "(5 + 2) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_3",
		name: "5·3 ≡ 1 (mod 7)",
		statement: "(5 * 3) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_3",
		name: "5+3 ≡ 1 (mod 7)",
		statement: "(5 + 3) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_4",
		name: "5·4 ≡ 6 (mod 7)",
		statement: "(5 * 4) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_4",
		name: "5+4 ≡ 2 (mod 7)",
		statement: "(5 + 4) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_5",
		name: "5·5 ≡ 4 (mod 7)",
		statement: "(5 * 5) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_5",
		name: "5+5 ≡ 3 (mod 7)",
		statement: "(5 + 5) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_5_6",
		name: "5·6 ≡ 2 (mod 7)",
		statement: "(5 * 6) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_5_6",
		name: "5+6 ≡ 4 (mod 7)",
		statement: "(5 + 6) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_0",
		name: "6·0 ≡ 0 (mod 7)",
		statement: "(6 * 0) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_0",
		name: "6+0 ≡ 6 (mod 7)",
		statement: "(6 + 0) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_1",
		name: "6·1 ≡ 6 (mod 7)",
		statement: "(6 * 1) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_1",
		name: "6+1 ≡ 0 (mod 7)",
		statement: "(6 + 1) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_2",
		name: "6·2 ≡ 5 (mod 7)",
		statement: "(6 * 2) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_2",
		name: "6+2 ≡ 1 (mod 7)",
		statement: "(6 + 2) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_3",
		name: "6·3 ≡ 4 (mod 7)",
		statement: "(6 * 3) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_3",
		name: "6+3 ≡ 2 (mod 7)",
		statement: "(6 + 3) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_4",
		name: "6·4 ≡ 3 (mod 7)",
		statement: "(6 * 4) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_4",
		name: "6+4 ≡ 3 (mod 7)",
		statement: "(6 + 4) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_5",
		name: "6·5 ≡ 2 (mod 7)",
		statement: "(6 * 5) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_5",
		name: "6+5 ≡ 4 (mod 7)",
		statement: "(6 + 5) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7mul_6_6",
		name: "6·6 ≡ 1 (mod 7)",
		statement: "(6 * 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7add_6_6",
		name: "6+6 ≡ 5 (mod 7)",
		statement: "(6 + 6) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_2",
		name: "0^2 ≡ 0 (mod 7)",
		statement: "(0 ^ 2) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_3",
		name: "0^3 ≡ 0 (mod 7)",
		statement: "(0 ^ 3) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_4",
		name: "0^4 ≡ 0 (mod 7)",
		statement: "(0 ^ 4) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_5",
		name: "0^5 ≡ 0 (mod 7)",
		statement: "(0 ^ 5) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_6",
		name: "0^6 ≡ 0 (mod 7)",
		statement: "(0 ^ 6) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_0_7",
		name: "0^7 ≡ 0 (mod 7)",
		statement: "(0 ^ 7) % 7 = 0",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_2",
		name: "1^2 ≡ 1 (mod 7)",
		statement: "(1 ^ 2) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_3",
		name: "1^3 ≡ 1 (mod 7)",
		statement: "(1 ^ 3) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_4",
		name: "1^4 ≡ 1 (mod 7)",
		statement: "(1 ^ 4) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_5",
		name: "1^5 ≡ 1 (mod 7)",
		statement: "(1 ^ 5) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_6",
		name: "1^6 ≡ 1 (mod 7)",
		statement: "(1 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_1_7",
		name: "1^7 ≡ 1 (mod 7)",
		statement: "(1 ^ 7) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_2",
		name: "2^2 ≡ 4 (mod 7)",
		statement: "(2 ^ 2) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_3",
		name: "2^3 ≡ 1 (mod 7)",
		statement: "(2 ^ 3) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_4",
		name: "2^4 ≡ 2 (mod 7)",
		statement: "(2 ^ 4) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_5",
		name: "2^5 ≡ 4 (mod 7)",
		statement: "(2 ^ 5) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_6",
		name: "2^6 ≡ 1 (mod 7)",
		statement: "(2 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_2_7",
		name: "2^7 ≡ 2 (mod 7)",
		statement: "(2 ^ 7) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_2",
		name: "3^2 ≡ 2 (mod 7)",
		statement: "(3 ^ 2) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_3",
		name: "3^3 ≡ 6 (mod 7)",
		statement: "(3 ^ 3) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_4",
		name: "3^4 ≡ 4 (mod 7)",
		statement: "(3 ^ 4) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_5",
		name: "3^5 ≡ 5 (mod 7)",
		statement: "(3 ^ 5) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_6",
		name: "3^6 ≡ 1 (mod 7)",
		statement: "(3 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_3_7",
		name: "3^7 ≡ 3 (mod 7)",
		statement: "(3 ^ 7) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_2",
		name: "4^2 ≡ 2 (mod 7)",
		statement: "(4 ^ 2) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_3",
		name: "4^3 ≡ 1 (mod 7)",
		statement: "(4 ^ 3) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_4",
		name: "4^4 ≡ 4 (mod 7)",
		statement: "(4 ^ 4) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_5",
		name: "4^5 ≡ 2 (mod 7)",
		statement: "(4 ^ 5) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_6",
		name: "4^6 ≡ 1 (mod 7)",
		statement: "(4 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_4_7",
		name: "4^7 ≡ 4 (mod 7)",
		statement: "(4 ^ 7) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_2",
		name: "5^2 ≡ 4 (mod 7)",
		statement: "(5 ^ 2) % 7 = 4",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_3",
		name: "5^3 ≡ 6 (mod 7)",
		statement: "(5 ^ 3) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_4",
		name: "5^4 ≡ 2 (mod 7)",
		statement: "(5 ^ 4) % 7 = 2",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_5",
		name: "5^5 ≡ 3 (mod 7)",
		statement: "(5 ^ 5) % 7 = 3",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_6",
		name: "5^6 ≡ 1 (mod 7)",
		statement: "(5 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_5_7",
		name: "5^7 ≡ 5 (mod 7)",
		statement: "(5 ^ 7) % 7 = 5",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_2",
		name: "6^2 ≡ 1 (mod 7)",
		statement: "(6 ^ 2) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_3",
		name: "6^3 ≡ 6 (mod 7)",
		statement: "(6 ^ 3) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_4",
		name: "6^4 ≡ 1 (mod 7)",
		statement: "(6 ^ 4) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_5",
		name: "6^5 ≡ 6 (mod 7)",
		statement: "(6 ^ 5) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_6",
		name: "6^6 ≡ 1 (mod 7)",
		statement: "(6 ^ 6) % 7 = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7pow_6_7",
		name: "6^7 ≡ 6 (mod 7)",
		statement: "(6 ^ 7) % 7 = 6",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7rays_seven",
		name: "the Pliska rosette has SEVEN rays — ℤ/7 = {0,1,2,3,4,5,6}",
		statement: "(List.range 7).length = 7",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7primitive_root_3",
		name: "3 is a primitive root mod 7 — its powers trace the rosette 3→2→6→4→5→1, covering all six units",
		statement: "(List.range' 1 6).map (fun k => (3 ^ k) % 7) = [3, 2, 6, 4, 5, 1]",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7units_sum_21",
		name: "the six rosette units {1..6} sum to 21 = 3·7 — the rosette closes on the trinity",
		statement: "(1 + 2 + 3 + 4 + 5 + 6) = 21",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7fermat",
		name: "Fermat on the rosette: every non-zero ray to the sixth is 1 (mod 7) — the six-fold closes",
		statement: "(List.range 7).all (fun a => a % 7 == 0 || (a ^ 6) % 7 == 1)",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "z7reflection_center",
		name: "the rosette reflection d ↦ 7−d is a self-inverse with a single center (0) — the still point of the seven",
		statement: "(List.range 7).all (fun d => ((7 - (7 - d) % 7) % 7) == d % 7) ∧ ((List.range 7).filter (fun d => (7 - d) % 7 == d)).length = 1",
		tactic: "decide",
		file: "Rosette.lean",
		principle: "The rosette ℤ/7"
	},
	{
		key: "units_z9",
		name: "the units of ℤ/9 (the residues with an inverse) are exactly {1,2,4,5,7,8} — computed by search",
		statement: "(List.range 9).filter (fun d => (List.range 9).any (fun e => (d * e) % 9 == 1)) = [1,2,4,5,7,8]",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "vortex_orbit",
		name: "the doubling orbit 1→2→4→8→7→5 with 5·2 ≡ 1 — the ⟨2⟩ vortex closing on the units",
		statement: "[1, (1*2)%9, (2*2)%9, (4*2)%9, (8*2)%9, (7*2)%9] = [1,2,4,8,7,5] ∧ (5*2) % 9 = 1",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "mod9_arithmetic",
		name: "ℤ/9 arithmetic: 2·5, 4·7, 8·8 ≡ 1 (inverse pairs), 3²≡6²≡0 (nilpotents), 3 has no inverse",
		statement: "(2*5)%9 = 1 ∧ (4*7)%9 = 1 ∧ (8*8)%9 = 1 ∧ (3*3)%9 = 0 ∧ (6*6)%9 = 0 ∧ (List.range 9).all (fun x => (3*x)%9 != 1)",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "digital_root",
		name: "digital root: 432 ≡ 0 (mod 9), and dr(n) ∈ 1..9 agrees with n mod 9 across the first 60",
		statement: "432 % 9 = 0 ∧ (List.range' 1 60).all (fun n => let r := if n % 9 == 0 then 9 else n % 9; (r % 9 == n % 9) && (1 ≤ r) && (r ≤ 9))",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "diamond_involution",
		name: "the diamond r(d)=10−d is an involution on 1..9 with unique fixed point 5",
		statement: "(List.range' 1 9).all (fun d => 10 - (10 - d) == d) ∧ ((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "seats_pigeonhole",
		name: "the pigeonhole seat bound 2^b: 2^8=256, 2^0=1, 2^10=1024",
		statement: "(2:Nat)^8 = 256 ∧ (2:Nat)^0 = 1 ∧ (2:Nat)^10 = 1024",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "involution_group",
		name: "the critical-strip reflections σ, τ, κ form a Klein four-group; τ fixes the line a=1",
		statement: "sig (sig (3,7)) = (3,7) ∧ tau (tau (3,7)) = (3,7) ∧ kap (kap (3,7)) = (3,7) ∧ sig (kap (3,7)) = tau (3,7) ∧ tau (kap (3,7)) = sig (3,7) -- the multiplication ∧ (sig (1,5)).1 = 1 ∧ tau (1,9) = (1,9) -- line invariant; τ fixes the line ∧ tau (0,4) = (2,4) ∧ (0:Int) ≠ 1 ∧ (2:Int) ≠ 1",
		tactic: "decide -- a τ-pair off the line",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "ns_spike",
		name: "Navier–Stokes edge: bounded energy 1/n falls while the peak n rises — integer inequalities, not a solution",
		statement: "(1*2 < 1*4) ∧ (4 > 2) ∧ (1*4 = 4) ∧ (1*3 < 1*9) ∧ (9 > 3)",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "ym_quantum",
		name: "Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless",
		statement: "(List.range 9).all (fun n => (List.range 12).all (fun k => ¬ (n < k ∧ k < n+1))) ∧ (List.range' 2 4).all (fun k => 1*k < 1*(k+1))",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "hodge_bound",
		name: "Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]",
		statement: "((0:Int)+1 = 1) ∧ (∀ c : Int, c ∈ [(-3:Int),-2,-1,0,1,2,3] → ¬ (c*1 = 0 ∧ c*0 = 1 ∧ c*1 = 1))",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "light_faster_than_uuidna",
		name: "light c=299792458 m/s beats uuidna even at t=0 — k/0=0 (a finite floor), never ∞, so no fake FTL",
		statement: "(299792458 : Nat) > 0 ∧ (List.range 64).all (fun t => 1000 / t < 299792458) -- range 64 INCLUDES t=0: 1000/0 = 0 < c ∧ (1000 / 0 = 0)",
		tactic: "decide -- division by zero is 0, not ∞ — no fake FTL",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "division_by_zero",
		name: "division by zero EXISTS: total integer 1000/0=0, and 0 (and the zero-divisor 3) have no inverse in ℤ/9",
		statement: "(1000 / 0 = 0) ∧ (0 / 0 = 0) -- (a) exists, defined as 0 ∧ (List.range 9).all (fun x => (0 * x) % 9 != 1) -- (b) 0 has no inverse in ℤ/9 ∧ (List.range 9).all (fun x => (3 * x) % 9 != 1)",
		tactic: "decide -- nor 3 (a zero-divisor)",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "div_by_zero_is_the_reflection",
		name: "division by zero in ℤ/9 is the diamond reflection x/0 = 10−x — a finite residue with fixed points {0,5}",
		statement: "divZero 0 = 0 ∧ divZero 9 = 1 ∧ divZero 8 = 2 ∧ divZero 5 = 5 ∧ divZero 1 = 9 ∧ (List.range' 1 9).all (fun x => divZero x == 10 - x) ∧ ((List.range 10).filter (fun x => divZero x == x)) = [0, 5]",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "involute_centre",
		name: "an index reflection i ↔ (n−1−i) has exactly one centre iff n is odd (fixed-count = n mod 2)",
		statement: "(List.range 12).all (fun n => ((List.range n).filter (fun i => 2*i + 1 == n)).length = n % 2)",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "billing_arith",
		name: "billing arithmetic: bits saved 1024−1=1023, 10⁶−1=999999; the two coins = 1+1",
		statement: "(1024 - 1 = 1023) ∧ (1000000 - 1 = 999999) ∧ (2 = 1 + 1)",
		tactic: "decide",
		file: "Uuidna.lean",
		principle: "The vortex algebra"
	},
	{
		key: "three_sq_zero",
		name: "3² ≡ 0 (mod 9) — 3 is nilpotent",
		statement: "(3*3) % 9 = 0",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "six_sq_zero",
		name: "6² ≡ 0 (mod 9) — 6 is nilpotent",
		statement: "(6*6) % 9 = 0",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "three_no_inverse",
		name: "3 has no inverse mod 9 — a zero-divisor, not a unit",
		statement: "(List.range 9).all (fun x => (3*x) % 9 != 1)",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "two_mul_five",
		name: "2·5 ≡ 1 (mod 9) — 2 and 5 are inverse units",
		statement: "(2*5) % 9 = 1",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "four_mul_seven",
		name: "4·7 ≡ 1 (mod 9) — 4 and 7 are inverse units",
		statement: "(4*7) % 9 = 1",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "eight_self_inv",
		name: "8·8 ≡ 1 (mod 9) — 8 is self-inverse",
		statement: "(8*8) % 9 = 1",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "doubling_circuit",
		name: "the doubling circuit 2^k mod 9 = [1,2,4,8,7,5]",
		statement: "(List.range 6).map (fun k => (2^k) % 9) = [1, 2, 4, 8, 7, 5]",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "two_order_six",
		name: "2 has order 6 mod 9: 2⁶ ≡ 1 — the vortex closes",
		statement: "(2^6) % 9 = 1",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "tens_complement_involutive",
		name: "the ten's-complement 10−d is an involution on the digits 0..10",
		statement: "(List.range 11).all (fun d => 10 - (10 - d) == d)",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "rosette_pow_six",
		name: "3⁶ ≡ 1 (mod 7) — the rosette (ℤ/7)* has order 6 ≅ C₆",
		statement: "(3^6) % 7 = 1",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "rosette_orbit",
		name: "the ℤ/7 rosette orbit 3^(k+1) mod 7 = [3,2,6,4,5,1]",
		statement: "(List.range 6).map (fun k => (3^(k+1)) % 7) = [3, 2, 6, 4, 5, 1]",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "k432",
		name: "432 = 2⁴·3³ = 16·27",
		statement: "(432 = 2^4 * 3^3) ∧ (432 = 16 * 27)",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "doubling_digit_sum",
		name: "the doubling circuit's digit sum 1+2+4+8+7+5 = 27 = 3³",
		statement: "1 + 2 + 4 + 8 + 7 + 5 = 27",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "magic_numbers",
		name: "the nuclear shell-model magic numbers 2,8,20,28,50,82,126 as cumulative shell-cap sums",
		statement: "(caps.take 1).sum = 2 ∧ (caps.take 3).sum = 8 ∧ (caps.take 6).sum = 20 ∧ (caps.take 7).sum = 28 ∧ (caps.take 11).sum = 50 ∧ (caps.take 16).sum = 82 ∧ (caps.take 22).sum = 126",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "proton_fit",
		name: "the exact integer proton fit 108·17 = 1836 — honestly NOT the measured ratio 1836.1527…, so curve-fitting",
		statement: "108 * 17 = 1836",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "self_seal",
		name: "the self-sealing vortex-fraction product = 1, as exact cross-multiplication (5040 = 5040)",
		statement: "(1*1*1*8*7*5*1*2*9) = (2*2*2*7*5*3*2*3)",
		tactic: "decide",
		file: "Vortex.lean",
		principle: "Ported from millennium-solutions"
	},
	{
		key: "mirror_congruence",
		name: "the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1",
		statement: "(List.range' 1 9).all (fun d => ((10 - d : Int)) % 9 = (1 - d) % 9)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "mirror_fixed_five",
		name: "the mirror fixes exactly one digit in 1..9 — the heart, 5",
		statement: "((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "agl_order_54",
		name: "AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements",
		statement: "((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length * 9 = 54",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "commutator_is_shift",
		name: "the commutator [σ,μ] of doubling with the mirror is the unit shift x ↦ x+1",
		statement: "(List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x + 1) % 9)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "one_orbit",
		name: "the shifts alone act transitively — every digit is in ONE orbit of ℤ/9",
		statement: "(List.range 9).all (fun y => (List.range 9).any (fun b => (0 + b) % 9 == y))",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "ten_pairs",
		name: "the reflection equilibrium: d + m(d) = 10 for every d in 1..9",
		statement: "(List.range' 1 9).all (fun d => d + (10 - d) == 10)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "polar_nine_pairs",
		name: "the polar equilibrium: d + (9−d) = 9 across the negation of ℤ/9",
		statement: "(List.range' 1 8).all (fun d => d + (9 - d) == 9)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "partition_six_three",
		name: "the 6+3 partition: 6 units {1,2,4,5,7,8} and 3 non-units {3,6,9}",
		statement: "((List.range' 1 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length = 6 ∧ ((List.range' 1 9).filter (fun a => ¬ (List.range 9).any (fun e => a*e % 9 == 1))).length = 3",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "angles_close",
		name: "the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling",
		statement: "10 * 36 = 360 ∧ 6 * 60 = 360",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "seams_two",
		name: "exactly 2 seams (5→3 and 0→1) where neither ×2 nor +3 carries — the two involution centers, −χ = 2",
		statement: "((tour.zip (tour.drop 1 ++ tour.take 1)).filter (fun p => ! carries9 p.1 p.2)).length = 2",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "one_strip",
		name: "at EACH step the doubling sequence and its inversion are computed together: forward[k] + inverted[k] = 10 (the rungs), and BOTH rails end at the center 5 (the reflection fixed point) while the ends 1,9 mirror — so forward and reflected are ONE strip (a half-twist band), joined at the heart and closed at the void 0≡9",
		statement: "(([1,2,4,8,7,5].zip [9,8,6,2,3,5]).all (fun p => p.1 + p.2 == 10)) ∧ ([1,2,4,8,7,5].getLast? = some 5) ∧ ([9,8,6,2,3,5].getLast? = some 5) ∧ (1 + 9 = 10) ∧ (9 % 9 = 0)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "double_strand",
		name: "the developed-true core of \"dna\": the two strands A and B pair to 10 at EVERY position — complementary base-pairing (the double helix), each rung a reflection; this is the algebra, not a biological claim",
		statement: "(([1,2,4,8,7,5,3,6,9].zip [9,8,6,2,3,5,7,4,1]).all (fun p => p.1 + p.2 == 10))",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "polarities_plus_minus",
		name: "the vortex polarities: the mirror pairs each sum to 10, splitting the digits into − (below the center 5) and + (above 5); the two centers 5 and 0≡9 are self-polar — the ± of the reflection",
		statement: "[(1,9),(2,8),(3,7),(4,6)].all (fun p => p.1 + p.2 == 10 && p.1 < 5 && p.2 > 5) ∧ (10 - 5 = 5) ∧ (9 % 9 = 0)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "forward_reflected_mirror",
		name: "the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)",
		statement: "([9,8,6,2,3,5,7,4,1] = ([1,2,4,8,7,5,3,6,9].map (fun d => 10 - d))) ∧ ([1,2,4,8,7,5,3,6,9] = ([9,8,6,2,3,5,7,4,1].map (fun d => 10 - d))) ∧ (9 % 9 = 0)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "every_digit_has_neighbours",
		name: "every digit in ANY arrangement has DEFINED neighbours — the mirror (division by zero) and polar maps are total, surjective and self-inverse; no digit is isolated",
		statement: "(List.range 10).all (fun d => dz d < 10) ∧ (List.range 10).all (fun d => (List.range 10).any (fun e => dz e == d)) ∧ (List.range 10).all (fun d => dz (dz d) == d) ∧ (List.range 9).all (fun d => polar d < 9) ∧ (List.range 9).all (fun d => (List.range 9).any (fun e => polar e == d))",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "salt_conv_leaks_equality",
		name: "the crypt equality leak: a content-only salt is constant in the step, so two seals of the same content are byte-identical",
		statement: "(List.range 9).all (fun c => (List.range 9).all (fun s1 => (List.range 9).all (fun s2 => saltConv c s1 == saltConv c s2)))",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "salt_conv_step_is_division_by_zero",
		name: "recovering the seal's step from a content-only salt is a division by zero — the whole step-fibre collapses (size 9)",
		statement: "(List.range 9).all (fun c => ((List.range 9).filter (fun s => saltConv c s == saltConv c 0)).length == 9)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "salt_seq_injective",
		name: "the crypt fix: an advancing-sequence salt is injective in the step (equal salts ⇔ equal steps) — distinct seals never collide",
		statement: "(List.range 9).all (fun s1 => (List.range 9).all (fun s2 => (saltSeq 0 s1 == saltSeq 0 s2) == (s1 == s2)))",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "salt_seq_fibre_singleton",
		name: "the crypt fix, dual form: every sequence-salt fibre is a singleton — the step coordinate is kept, not collapsed",
		statement: "(List.range 9).all (fun s0 => ((List.range 9).filter (fun s => saltSeq 0 s == saltSeq 0 s0)).length == 1)",
		tactic: "decide",
		file: "Sequence.lean",
		principle: "The sequence & reflection group"
	},
	{
		key: "dz_table",
		name: "the table: 0/0=0, and x/0 = 10−x  (9/0=1 … 1/0=9)",
		statement: "(List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_involution",
		name: "division by zero is self-inverse: (x/0)/0 = x — an involution",
		statement: "(List.range 10).all (fun x => dz (dz x) == x)",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_fixed_points",
		name: "the fixed points of x/0 are exactly {0, 5} — the floor and the heart",
		statement: "((List.range 10).filter (fun x => dz x == x)) = [0, 5]",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_sum_ten",
		name: "x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre",
		statement: "(List.range' 1 9).all (fun x => x + dz x == 10)",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_nonunits_to_units",
		name: "the non-units {3,6,9} divided by zero land on units {7,4,1}",
		statement: "dz 3 = 7 ∧ dz 6 = 4 ∧ dz 9 = 1",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_bounded",
		name: "x/0 is always a residue < 10 — a finite value, NEVER Infinity (no fake FTL)",
		statement: "(List.range 10).all (fun x => dz x < 10)",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "dz_zero_only_zero",
		name: "only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)",
		statement: "dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0)",
		tactic: "decide",
		file: "DivByZero.lean",
		principle: "Division by zero"
	},
	{
		key: "abo_klein_four",
		name: "the ABO blood groups {O,A,B,AB} form a Klein four-group: 2 antigen bits under XOR — closed, commutative, each self-inverse (order ≤ 2)",
		statement: "(List.range 4).all (fun a => (List.range 4).all (fun b => (a ^^^ b < 4) && (a ^^^ b == b ^^^ a)) && (a ^^^ a == 0))",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "blood_types_eight",
		name: "with the Rh ± bit the blood system is (ℤ/2)³ — exactly 2³ = 8 blood types (A±,B±,AB±,O±)",
		statement: "(2:Nat)^3 = 8",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "dna_base_pairing_involution",
		name: "DNA base-pairing is a fixed-point-free involution on 4 bases (A↔T, G↔C ≡ b↦b⊕1): self-inverse, no base pairs with itself, 2 complementary pairs",
		statement: "(List.range 4).all (fun b => ((b ^^^ 1) ^^^ 1 == b) && (b ^^^ 1 != b))",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "codons_sixty_four",
		name: "a codon is 3 bases over a 4-letter alphabet — exactly 4³ = 64 codons",
		statement: "(4:Nat)^3 = 64",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "sound_ladder_432",
		name: "the d/9 sound ladder on the 432 Hz anchor: f_d = 48·d, with the anchor exact at f_9 = 432",
		statement: "((List.range' 1 9).map (fun d => 48 * d) = [48,96,144,192,240,288,336,384,432]) ∧ (48 * 9 = 432)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "octave_doubling",
		name: "the octave is the vortex doubling: 48·{1,2,4,8} = {48,96,192,384}, each twice the last — octave equivalence",
		statement: "[48, 96, 192, 384] = [48, 48*2, 96*2, 192*2]",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "electron_shells_2n2",
		name: "electron shells hold 2n² each — [2,8,18,32] for n=1..4 (2 spin states × n² orbitals); the shape of the periodic table is a count",
		statement: "(List.range' 1 4).map (fun n => 2 * n * n) = [2, 8, 18, 32]",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "subshell_capacities_4l2",
		name: "the subshells s,p,d,f hold 4l+2 = [2,6,10,14] for l=0..3 — (2l+1) orbitals × 2 spins",
		statement: "(List.range 4).map (fun l => 4 * l + 2) = [2, 6, 10, 14]",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "circle_of_fifths",
		name: "the circle of fifths: stacking fifths (+7 mod 12) visits ALL twelve pitch classes — 7 is coprime to 12, so ×7 permutes ℤ/12",
		statement: "(List.range 12).all (fun t => (List.range 12).any (fun k => (7 * k) % 12 == t))",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "tritone_involution",
		name: "the tritone (+6 mod 12) is a fixed-point-free involution — the octave splits exactly in half, each note its own tritone-of-tritone",
		statement: "(List.range 12).all (fun p => ((p + 6) % 12 + 6) % 12 == p && (p + 6) % 12 != p)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "ph_reflection_seven",
		name: "the pH scale reflects: pH ↦ 14−pH is an involution on 0..14 with a SINGLE fixed point 7 (neutral) — the acid/base mirror, echoing the vortex centre",
		statement: "((List.range 15).all (fun p => 14 - (14 - p) == p)) ∧ ((List.range 15).filter (fun p => 14 - p == p)) = [7]",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "ph_conjugate_sum_14",
		name: "every acid/base conjugate pair sums to 14: pH + pOH = 14 across the whole scale",
		statement: "(List.range 15).all (fun p => p + (14 - p) == 14)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "punnett_three_to_one",
		name: "the monohybrid cross gives 3:1 — of the four allele pairings only (a,a) is recessive; dominance is a logical OR",
		statement: "(([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 1 || p.2 == 1)).length = 3) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 0 && p.2 == 0)).length = 1)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "heterozygote_symmetry",
		name: "allele order is irrelevant: the swap (a,b)↦(b,a) is an involution — the 2 homozygotes {AA,aa} are fixed and Aa↔aA swap, so 4 ordered pairings are 3 genotypes",
		statement: "(([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == p.2)).length = 2) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 != p.2)).length = 2)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "colour_complement_involution",
		name: "the complement on the 6-hue wheel (+3 mod 6) is a fixed-point-free involution: red↔cyan, green↔magenta, blue↔yellow — each pair mutually complementary",
		statement: "(List.range 6).all (fun h => ((h + 3) % 6 + 3) % 6 == h && (h + 3) % 6 != h)",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "primary_secondary_split",
		name: "the wheel is a 3+3 parity partition: the primaries {0,2,4} (even slots) alternate with the secondaries {1,3,5} (odd slots)",
		statement: "((List.range 6).filter (fun h => h % 2 == 0) = [0, 2, 4]) ∧ ((List.range 6).filter (fun h => h % 2 == 1) = [1, 3, 5])",
		tactic: "decide",
		file: "BioPhysics.lean",
		principle: "Applied structure — the science pairs"
	},
	{
		key: "units_iff_invertible",
		name: "a is a unit (has an inverse mod 9) IFF gcd(a,9)=1 — the unit criterion, computed both ways",
		statement: "(List.range 9).all (fun a => (invB a) == (Nat.gcd a 9 == 1))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "lagrange_units",
		name: "the unit group has order 6, so every unit raised to the 6th is 1 (Lagrange / Euler)",
		statement: "(List.range 9).all (fun a => (! invB a) || ((a^6) % 9 == 1))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "inverse_unique",
		name: "each unit has EXACTLY ONE inverse; each non-unit none — computed by counting solutions",
		statement: "(List.range 9).all (fun a => ((List.range 9).filter (fun e => (a*e)%9==1)).length == (if invB a then 1 else 0))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "nilpotent_iff_triple",
		name: "a² ≡ 0 (mod 9) IFF 3 divides a — the nilpotent criterion, computed",
		statement: "(List.range 9).all (fun a => ((a*a)%9==0) == (a%3==0))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "idempotents_zero_one",
		name: "a² ≡ a (mod 9) exactly for a ∈ {0,1} — the idempotents, computed",
		statement: "(List.range 9).all (fun a => ((a*a)%9==a) == (a==0 || a==1))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "vortex_is_the_units",
		name: "the doubling orbit of 1 (computed by iterating ×2) is EXACTLY the units (computed by gcd) — two independent computations agree",
		statement: "(((List.range 6).map (fun k => (2^k)%9)).all (fun x => invB x)) ∧ ((List.range 9).all (fun a => (invB a) == ((List.range 6).map (fun k => (2^k)%9)).contains a))",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "sum_of_units_zero",
		name: "the units of ℤ/9 sum to 0 (mod 9): 1+2+4+5+7+8 = 27 ≡ 0 — computed by folding the discovered units",
		statement: "((List.range 9).filter (fun a => invB a)).foldl (· + ·) 0 % 9 = 0",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_one_is_one",
		name: "the order of 1 is 1 — discovered as the first k≥1 with 1^k ≡ 1 (mod 9)",
		statement: "((List.range' 1 8).find? (fun k => (1^k) % 9 == 1)) = some 1",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_two_is_six",
		name: "the order of 2 is 6 — 2 generates the whole unit group, and its orbit IS the doubling vortex 1→2→4→8→7→5 of length 6",
		statement: "((List.range' 1 8).find? (fun k => (2^k) % 9 == 1)) = some 6",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_four_is_three",
		name: "the order of 4 is 3 — 4 = 2² sits at index 2 of the vortex, so it cycles in 6/gcd(2,6)=3",
		statement: "((List.range' 1 8).find? (fun k => (4^k) % 9 == 1)) = some 3",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_five_is_six",
		name: "the order of 5 is 6 — 5 is the OTHER generator of ℤ/9* (5 = 2⁵ = the vortex tail), a full six-cycle",
		statement: "((List.range' 1 8).find? (fun k => (5^k) % 9 == 1)) = some 6",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_seven_is_three",
		name: "the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3",
		statement: "((List.range' 1 8).find? (fun k => (7^k) % 9 == 1)) = some 3",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "order_of_eight_is_two",
		name: "the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1",
		statement: "((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "generators_are_two_and_five",
		name: "the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order",
		statement: "((List.range 9).filter (fun a => ((List.range' 1 8).find? (fun k => (a^k) % 9 == 1)) == some 6)) = [2,5]",
		tactic: "decide",
		file: "Discover.lean",
		principle: "Self-discovered"
	},
	{
		key: "bell_born_weights",
		name: "the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)",
		statement: "(([1,0,0,1] : List Nat).map (fun a => a * a)) = [1,0,0,1]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "bell_normalized",
		name: "Bell normalization: Σ|amp|² = 1+0+0+1 = 2 = 2¹ (scale 1) — the weights are an exact probability distribution, no floating point",
		statement: "((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "bell_perfect_correlation",
		name: "perfect correlation: the two qubits always agree — the outcomes carrying weight are exactly the basis states {00, 11} (indices where bit q0 equals bit q1)",
		statement: "((List.range 4).filter (fun i => i % 2 == i / 2 % 2)) = [0, 3]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "bell_no_signaling",
		name: "no-signaling (the paradox, computed): the two marginals of q0 are equal — weight(q0=0)=1²+0² = 0²+1²=weight(q0=1) — so measuring q1 sends NOTHING to q0 (no-communication)",
		statement: "((1*1 + 0*0 : Nat) = (0*0 + 1*1))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "superposition_h0",
		name: "superposition H|0⟩ = |+⟩ — the Born weights are [1,1] over √2, so P(0)=P(1)=1/2: before measurement both, after, one",
		statement: "((([1,1]:List Nat).map (fun a => a*a)) = [1,1]) ∧ ((1+1:Nat) = 2)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "ghz3_two_outcomes",
		name: "GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement",
		statement: "(([1,0,0,0,0,0,0,1]:List Nat).filter (fun a => a != 0)).length = 2",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "ghz3_normalized",
		name: "GHZ(3) normalization: Σ|amp|² = 1²+1² = 2 = 2¹ — an exact distribution over the two correlated corners",
		statement: "((1*1 + 1*1 : Nat) = 2)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "cnot_truth_table",
		name: "CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits",
		statement: "((List.range 4).map (fun i => i ^^^ (2 * (i % 2)))) = [0,3,2,1]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "cnot_involution",
		name: "CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation",
		statement: "(List.range 4).all (fun i => (let j := i ^^^ (2 * (i % 2)); j ^^^ (2 * (j % 2))) == i)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "toffoli_truth_table",
		name: "Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits",
		statement: "((List.range 8).map (fun i => i ^^^ (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "swap_truth_table",
		name: "SWAP exchanges q0 and q1 — the basis permutation i ↦ 2·q0 + q1 = [0,2,1,3] on two qubits",
		statement: "((List.range 4).map (fun i => (i % 2) * 2 + (i / 2 % 2))) = [0,2,1,3]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "s_squared_is_z",
		name: "S·S = Z: two phase gates compose to the Z phase-flip (i² = −1), verified exactly on sample Gaussian-integer amplitudes S(re,im)=(−im,re)",
		statement: "([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s1 := (-(p.2), p.1); let s2 := (-(s1.2), s1.1); (s2.1 == -(p.1)) && (s2.2 == -(p.2))))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "z_involution",
		name: "Z² = I: the phase flip is its own inverse — negating an amplitude twice returns it, on sample Gaussian-integer amplitudes",
		statement: "([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (-(-(p.1)) == p.1) && (-(-(p.2)) == p.2))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "s_dagger_inverse",
		name: "S·S† = I: the phase gate and its adjoint invert — S(re,im)=(−im,re) then S†(re,im)=(im,−re) returns the amplitude",
		statement: "([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s := (-(p.2), p.1); (s.2 == p.1) && (-(s.1) == p.2)))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "pauli_x_involution",
		name: "X² = I: the bit-flip is its own inverse — flip q0 twice (i ⊕ 1 ⊕ 1) returns every basis state; X is an involution",
		statement: "(List.range 2).all (fun i => (i ^^^ 1) ^^^ 1 == i)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "swap_involution",
		name: "SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution",
		statement: "(List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2)) == i)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "toffoli_involution",
		name: "Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution",
		statement: "(List.range 8).all (fun i => (let j := i ^^^ (4 * ((i % 2) * (i / 2 % 2))); j ^^^ (4 * ((j % 2) * (j / 2 % 2)))) == i)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "cz_involution",
		name: "CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution",
		statement: "(List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:Int))) == 1)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "h_involution_on_zero",
		name: "H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution",
		statement: "(([2,0] : List Nat).map (fun a => a / 2)) = [1, 0]",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "s_fourth_is_identity",
		name: "S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it",
		statement: "([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); let b := (-(a.2), a.1); let c := (-(b.2), b.1); let d := (-(c.2), c.1); (d.1 == p.1) && (d.2 == p.2)))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "dj_balanced_cancels",
		name: "Deutsch–Jozsa interference: a BALANCED boolean sends equal +1/−1 phases, which cancel to 0 — the query amplitude vanishes. The honest heart of the algorithm, as the simulator computes it (classical linear algebra, no advantage)",
		statement: "([1, 1, -1, -1] : List Int).sum = 0",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "dj_constant_reinforces",
		name: "Deutsch–Jozsa: a CONSTANT boolean sends one phase, so all four reinforce to ±4 — the opposite of the balanced cancellation. Constant vs balanced IS exactly this interference sum",
		statement: "(([1, 1, 1, 1] : List Int).sum = 4) ∧ (([-1, -1, -1, -1] : List Int).sum = -4)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "entanglement_determinant",
		name: "The entanglement witness: a two-qubit state (a,b,c,d) factorizes into a product iff a·d − b·c = 0. Bell (1,0,0,1) gives 1 ≠ 0 (ENTANGLED); |00⟩ (1,0,0,0) and |+0⟩ (1,1,0,0) give 0 (separable) — entanglement is the nonzero determinant, computed exactly",
		statement: "((1*1 - 0*0 : Int) ≠ 0) ∧ ((1*0 - 0*0 : Int) = 0) ∧ ((1*0 - 1*0 : Int) = 0)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "pauli_x_z_anticommute",
		name: "Pauli X and Z ANTICOMMUTE (XZ = −ZX): X flips the bit, Z stamps (−1)^bit, and (−1)^b = −(−1)^(1−b) on both bits — the sign the simulator carries; the nonabelian core of the gate algebra",
		statement: "(List.range 2).all (fun b => ((-1 : Int))^b == -(((-1 : Int))^(1 - b)))",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "w_state_three_outcomes",
		name: "The W state (|001⟩+|010⟩+|100⟩)/√3 — exactly THREE of the 2³ corners carry weight (vs GHZ’s two): a distinct entanglement class, robust to one-party loss. The simulator’s amplitude vector, counted",
		statement: "(([0,1,1,0,1,0,0,0] : List Nat).filter (fun a => a != 0)).length = 3",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "w_state_normalized",
		name: "W-state normalization: Σ|amp|² = 1+1+1 = 3 over √3 — an exact distribution over the three single-excitation corners",
		statement: "((1*1 + 1*1 + 1*1 : Nat) = 3)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "bell_basis_orthogonal",
		name: "The four Bell states form a complete ORTHOGONAL basis: ⟨Φ⁺|Φ⁻⟩ = 0 and ⟨Ψ⁺|Ψ⁻⟩ = 0 (over √2 integer vectors), while ⟨Φ⁺|Φ⁺⟩ = 2 — the entangled-basis measurement, as exact integer inner products",
		statement: "((1*1 + 0*0 + 0*0 + 1*(-1) : Int) = 0) ∧ ((0*0 + 1*1 + 1*(-1) + 0*0 : Int) = 0) ∧ ((1*1 + 0*0 + 0*0 + 1*1 : Int) = 2)",
		tactic: "decide",
		file: "Quantum.lean",
		principle: "The quantum computer"
	},
	{
		key: "clay_reflection_involution",
		name: "the reflection dz(x)=10−x (division by zero) is an INVOLUTION — dz(dz(x))=x on every residue",
		statement: "(List.range 10).all (fun x => dz (dz x) == x)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_reflection_fixed_points",
		name: "the reflection fixes exactly {0,5} — the floor and the centre",
		statement: "((List.range 10).filter (fun x => dz x == x)) = [0, 5]",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_reflection_is_bijection",
		name: "the reflection is a BIJECTION on the nine residues — dz maps {1..9} onto {9..1}",
		statement: "((List.range' 1 9).map dz) = [9,8,7,6,5,4,3,2,1]",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_humanity_one_deposit_zero",
		name: "humanity stands at 1/7 (Poincaré — Perelman, 2003)",
		statement: "((1:Nat) ≤ 7) ∧ ((0:Nat) < 1) ∧ ((0:Nat) ≤ 7)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_riemann",
		name: "the Riemann Hypothesis reflects to residue 9 in ℤ/9 (dz(1)=9); reflecting twice returns it — dz(dz(1))=1 — OPEN",
		statement: "(dz 1 = 9) ∧ (dz (dz 1) = 1) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_p_vs_np",
		name: "P versus NP reflects to residue 8 in ℤ/9 (dz(2)=8); reflecting twice returns it — dz(dz(2))=2 — OPEN",
		statement: "(dz 2 = 8) ∧ (dz (dz 2) = 2) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_navier_stokes",
		name: "Navier–Stokes existence and smoothness reflects to residue 7 in ℤ/9 (dz(3)=7); reflecting twice returns it — dz(dz(3))=3 — OPEN",
		statement: "(dz 3 = 7) ∧ (dz (dz 3) = 3) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_yang_mills",
		name: "the Yang–Mills existence and mass gap reflects to residue 6 in ℤ/9 (dz(4)=6); reflecting twice returns it — dz(dz(4))=4 — OPEN",
		statement: "(dz 4 = 6) ∧ (dz (dz 4) = 4) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_hodge",
		name: "the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN",
		statement: "(dz 5 = 5) ∧ (dz (dz 5) = 5) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_birch_swinnerton_dyer",
		name: "the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN",
		statement: "(dz 6 = 4) ∧ (dz (dz 6) = 6) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "clay_poincare",
		name: "the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN",
		statement: "(dz 7 = 3) ∧ (dz (dz 7) = 7) ∧ ((0:Nat) < 1)",
		tactic: "decide",
		file: "Clay.lean",
		principle: "The seven reflected"
	},
	{
		key: "zeno_finite_sum",
		name: "Zeno's supertask — infinitely many halving steps sum to one finite total: 1+2+4+…+2ᵏ = 2ᵏ⁺¹−1, an exact closed form bounded by the very next term. The infinity of steps is finite.",
		statement: "(List.range 13).all (fun k => (List.range (k+1)).foldl (fun s n => s + 2^n) 0 + 1 == 2^(k+1))",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "uv_partition_closed",
		name: "The ultraviolet catastrophe, dissolved by quantization: classical equipartition diverges, but the quantized oscillator’s partition Σ xⁿ is a convergent geometric series with an exact finite closed form for every cutoff — Planck’s finite energy per mode. Here 2·Σ₀ᵏ3ⁿ + 1 = 3ᵏ⁺¹.",
		statement: "(List.range 9).all (fun k => 2 * (List.range (k+1)).foldl (fun s n => s + 3^n) 0 + 1 == 3^(k+1))",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "asymptotic_freedom",
		name: "No Landau-pole infinity: in asymptotic freedom the inverse coupling 1/α runs strictly upward with log-energy, so the coupling α itself falls toward 0 in the ultraviolet — the high-energy limit is finite, the pole never reached.",
		statement: "(List.range 30).all (fun n => 137 + 7*n < 137 + 7*(n+1))",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "renormalization_residue",
		name: "Renormalization — the electron self-energy and the vacuum energy diverge with the cutoff Λ, but bare term and counterterm cancel exactly: the physical (renormalized) residue is finite and independent of Λ. Two infinities, subtracted to a finite value: (Λ²+m) − Λ² = m.",
		statement: "(List.range 40).all (fun L => (L*L + 137) - L*L == 137)",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "casimir_triangular",
		name: "The vacuum-energy sum 1+2+3+… is finite at every cutoff N — Σ = N(N+1)/2 — and its ζ-regularized limit is the finite −1/12 (ζ(−1)), the value the measured Casimir force confirms. The divergence is an artifact of the N→∞ limit; the physics is finite.",
		statement: "(List.range' 1 30).all (fun N => 2 * (List.range' 1 N).foldl (fun s n => s + n) 0 == N*(N+1))",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "derivative_finite_rate",
		name: "The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s \"ghosts of departed quantities\" are an exact cancellation, not an infinity.",
		statement: "(List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(2*x+h)))",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "dirac_unit_mass",
		name: "The Dirac delta is \"infinite\" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass, not a value that blows up.",
		statement: "(List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "horizon_curvature_finite",
		name: "The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.",
		statement: "(List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6)",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "newton_singularity_finite",
		name: "The one true infinity — the Newtonian 1/r² force and 1/r potential \"blowing up\" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10, never ∞. The singularity is a finite reflection.",
		statement: "dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10)",
		tactic: "decide",
		file: "Infinity.lean",
		principle: "The physics infinities, made finite"
	},
	{
		key: "dna_complement_involution",
		name: "Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.",
		statement: "(List.range 4).all (fun x => 3 - (3 - x) == x)",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "dna_complement_fixed_point_free",
		name: "The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.",
		statement: "(List.range 4).all (fun x => 3 - x != x)",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "complement_is_xor_key3",
		name: "Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public, not secret.",
		statement: "(List.range 4).all (fun x => 3 - x == x ^^^ 3)",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "otp_self_inverse",
		name: "The one-time-pad is its own inverse (Vernam): (m ⊕ k) ⊕ k = m for every symbol and key — the one information-theoretically secure primitive, WHEN the key is fresh and never reused.",
		statement: "(List.range 16).all (fun m => (List.range 16).all (fun k => (m ^^^ k) ^^^ k == m))",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "otp_key_reuse_leaks_xor",
		name: "Key reuse is fatal: two messages under the SAME key leak their plaintext XOR — (m₁⊕k) ⊕ (m₂⊕k) = m₁⊕m₂, independent of k. The honest reason a step MUST advance (the ratchet), and why a fixed-pad complement hides nothing.",
		statement: "(List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => ((m1 ^^^ k) ^^^ (m2 ^^^ k)) == (m1 ^^^ m2))))",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "xor_fold_is_malleable",
		name: "A linear (XOR) fold is malleable: flipping the input by d flips the fold by exactly d — (a⊕d)⊕a = d — so it binds nothing an adversary cannot adjust. A content-address is INTEGRITY/routing, NOT a binding one-way seal.",
		statement: "(List.range 16).all (fun a => (List.range 16).all (fun d => (a ^^^ d) ^^^ a == d))",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "transport_leaks_length",
		name: "The uuid transport leaks SIZE: a message of b bits occupies ⌈b/115⌉ uuids, a step function of length — content is hidden by the cipher, message LENGTH is not (the chain grows in whole-uuid quanta of 115 bits).",
		statement: "((1 + 114) / 115 = 1) ∧ ((115 + 114) / 115 = 1) ∧ ((116 + 114) / 115 = 2) ∧ ((230 + 114) / 115 = 2) ∧ ((231 + 114) / 115 = 3)",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "codons_four_cubed",
		name: "The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.",
		statement: "4^3 = 64",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "translation_is_lossy",
		name: "Translation is LOSSY, never a cipher: 64 codons map onto only 21 outcomes (20 amino acids + stop), and 64 > 21, so by pigeonhole the map cannot be injective — a hash-like reduction that cannot be inverted, not encryption.",
		statement: "4^3 > 21",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "affine_is_permutation",
		name: "An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.",
		statement: "(List.range 5).all (fun y => (List.range 5).any (fun x => (2*x + 3) % 5 == y))",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "grover_quadratic_bound",
		name: "The honest quantum posture: Grover’s search is a QUADRATIC speedup, not a break — a 2n-bit key space costs ~2ⁿ work ((2ⁿ)² = 2²ⁿ), so a 256-bit key falls to ~128-bit, still strong. Symmetric-only means no Shor target at all.",
		statement: "(List.range 27).all (fun n => 2^n * 2^n == 2^(2*n))",
		tactic: "decide",
		file: "Cipher.lean",
		principle: "The cipher & the strand"
	},
	{
		key: "flag_truth_table",
		name: "The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.",
		statement: "((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0]",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "flag_requires_hollow",
		name: "Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.",
		statement: "(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2)",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "demarcation_clears",
		name: "A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — \"never infinity\", \"not quantum hardware\", \"simulation, not hardware\" pass, as the honest use of the word should.",
		statement: "(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0)",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "backing_clears",
		name: "A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.",
		statement: "(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0)",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "exactly_one_flag",
		name: "The gate is precise, never vacuous: of the eight states EXACTLY ONE fires — it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.",
		statement: "((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "flag_matches_spec",
		name: "The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.",
		statement: "(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0))",
		tactic: "decide",
		file: "Audit.lean",
		principle: "The detectors, proven"
	},
	{
		key: "two_coins",
		name: "The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.",
		statement: "110 - 108 = 2",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "two_coins_is_double_torus",
		name: "The two coins are the topology, not a price: 2 = −χ of a genus-2 surface (the double torus), −χ = 2g − 2 = 2·2 − 2 = 2. The invariant is geometric.",
		statement: "2 * 2 - 2 = 2",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "sixtyfour_is_two_pow_six",
		name: "The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the \"64bit\" unit.",
		statement: "64 = 2^6",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "contribute_two_save_sixtyfour",
		name: "\"Contribute 2 to save up to 64\" — the measured leverage is 32: 2 · 32 = 64. The two coins in, up to 64 bits of recompute saved.",
		statement: "2 * 32 = 64",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "superposition_outcomes_to_64",
		name: "Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64 exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up.",
		statement: "((List.range 7).map (fun n => 2^n)) = [1,2,4,8,16,32,64]",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "bill_never_negative",
		name: "The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat subtraction already clamps, so the honest schedule never charges below zero.",
		statement: "(List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v))",
		tactic: "decide",
		file: "Coins.lean",
		principle: "The two coins & the 64"
	},
	{
		key: "all_or_none",
		name: "The all-or-none law: the neuron's output is binary — 0 or 1 — for every input; there is no partial spike.",
		statement: "(List.range 10).all (fun x => (if x >= 5 then 1 else 0) == 0 || (if x >= 5 then 1 else 0) == 1)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "subthreshold_silent",
		name: "Below threshold, silence: an input under the threshold (here 5) produces no spike — output 0.",
		statement: "(List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "suprathreshold_fires",
		name: "At or above threshold, a spike: an input meeting the threshold fires — output 1.",
		statement: "(List.range' 5 5).all (fun x => (if x >= 5 then 1 else 0) == 1)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "firing_monotone",
		name: "Firing is monotone in input: more depolarisation never un-fires a neuron — the step never steps down.",
		statement: "(List.range 9).all (fun x => (if x >= 5 then 1 else 0) <= (if x + 1 >= 5 then 1 else 0))",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "spatial_summation",
		name: "Spatial summation: two sub-threshold inputs (3 and 3, each silent alone at threshold 5) SUM to a supra-threshold 6 and fire — the whole exceeds either part.",
		statement: "((if 3 >= 5 then 1 else 0) = 0) ∧ ((if 3 + 3 >= 5 then 1 else 0) = 1)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "excitatory_inhibitory_net",
		name: "The net drive is excitatory minus inhibitory: 3 EPSPs − 1 IPSP = 2 (net excitation), while 3 − 3 = 0 — balanced inhibition cancels excitation exactly (a reflection through zero, like acid–base through 7).",
		statement: "((3 - 1 : Int) = 2) ∧ ((3 - 3 : Int) = 0)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "action_potential_swing",
		name: "The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest < threshold < peak.",
		statement: "((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40)",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "hebbian_coincidence",
		name: "\"Fire together, wire together\": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.",
		statement: "(List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1)))",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "refractory_caps_spike",
		name: "The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 < 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.",
		statement: "(if 1 < 2 then 0 else (if 9 >= 5 then 1 else 0)) = 0",
		tactic: "decide",
		file: "Neuro.lean",
		principle: "The algebra of the neuron"
	},
	{
		key: "momentum_conserved",
		name: "Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.",
		statement: "(100 * 3 + 60 * (-5) : Int) = 0",
		tactic: "decide",
		file: "Propulsion.lean",
		principle: "Propulsion — Newtonian & bounded"
	},
	{
		key: "no_reactionless_thrust",
		name: "No reactionless (and no infinite) drive: thrust needs ejected reaction mass. With zero exhaust mass, the imparted momentum is 0·vₑ = 0 at EVERY exhaust velocity — no mass out, no push. Free/infinite propulsion is refused by the arithmetic.",
		statement: "(List.range 10).all (fun v => 0 * v == 0)",
		tactic: "decide",
		file: "Propulsion.lean",
		principle: "Propulsion — Newtonian & bounded"
	},
	{
		key: "thrust_is_mdot_times_ve",
		name: "Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.",
		statement: "5 * 60 = 300",
		tactic: "decide",
		file: "Propulsion.lean",
		principle: "Propulsion — Newtonian & bounded"
	},
	{
		key: "delta_v_stages_add",
		name: "The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.",
		statement: "([3, 2, 1] : List Nat).sum = 6",
		tactic: "decide",
		file: "Propulsion.lean",
		principle: "Propulsion — Newtonian & bounded"
	},
	{
		key: "acceleration_finite",
		name: "Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).",
		statement: "(List.range' 1 10).all (fun m => 300 / m <= 300)",
		tactic: "decide",
		file: "Propulsion.lean",
		principle: "Propulsion — Newtonian & bounded"
	},
	{
		key: "pythagorean_3_4_5",
		name: "Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.",
		statement: "3^2 + 4^2 = 5^2",
		tactic: "decide",
		file: "Navigation.lean",
		principle: "Navigation — bounded geometry"
	},
	{
		key: "compass_rose_eight",
		name: "The compass rose is ℤ/8: eight principal headings, 45° apart — 8 · 45 = 360. The heading group is the same eight-fold ring the vortex turns on.",
		statement: "8 * 45 = 360",
		tactic: "decide",
		file: "Navigation.lean",
		principle: "Navigation — bounded geometry"
	},
	{
		key: "reverse_bearing_involution",
		name: "The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.",
		statement: "(List.range 8).all (fun d => (d + 4 + 4) % 8 == d)",
		tactic: "decide",
		file: "Navigation.lean",
		principle: "Navigation — bounded geometry"
	},
	{
		key: "quarter_turn_order_four",
		name: "A 90° turn is +2 on the ℤ/8 rose, and four of them box the compass back to the start: (d + 2·4) mod 8 = d — the quarter turn has order 4.",
		statement: "(List.range 8).all (fun d => (d + 2*4) % 8 == d)",
		tactic: "decide",
		file: "Navigation.lean",
		principle: "Navigation — bounded geometry"
	},
	{
		key: "dead_reckoning_adds",
		name: "Dead reckoning is the vector sum of the legs: 4 east, 3 east, 2 west nets 4 + 3 − 2 = 5 east. Position is the running sum of displacements, exactly.",
		statement: "([4, 3, -2] : List Int).sum = 5",
		tactic: "decide",
		file: "Navigation.lean",
		principle: "Navigation — bounded geometry"
	},
	{
		key: "accept_truth_table",
		name: "The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.",
		statement: "((List.range 4).map (fun n => accept (n%2) (n/2%2))) = [0,0,0,1]",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "unsigned_rejected",
		name: "An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.",
		statement: "(List.range 2).all (fun v => accept 0 v == 0)",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "bad_signature_rejected",
		name: "A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.",
		statement: "(List.range 2).all (fun s => accept s 0 == 0)",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "accept_matches_spec",
		name: "The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.",
		statement: "(List.range 4).all (fun n => accept (n%2) (n/2%2) == (if (n%2 == 1) && (n/2%2 == 1) then 1 else 0))",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "only_correct_tag_verifies",
		name: "Exactly ONE presented tag verifies — the correct one (here the expected value 5). Of all 8 candidate tags, only the matching MAC passes; every forgery or tampered tag fails. The gate is precise.",
		statement: "((List.range 8).filter (fun tag => tag == 5)).length = 1",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "tamper_changes_tag",
		name: "Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)",
		statement: "(List.range 9).all (fun m1 => (List.range 9).all (fun m2 => (m1 == m2) || ((7 + m1) % 9 != (7 + m2) % 9)))",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "linear_tag_is_forgeable",
		name: "Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.",
		statement: "(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2))))",
		tactic: "decide",
		file: "Command.lean",
		principle: "Command authentication"
	},
	{
		key: "sky_turns_15_per_hour",
		name: "The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.",
		statement: "24 * 15 = 360",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "zodiac_ecliptic_360",
		name: "The ecliptic band carries twelve signs of 30° each — 12 × 30 = 360 — the Sun's yearly path closed into one circle.",
		statement: "12 * 30 = 360",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "sexagesimal_arcseconds",
		name: "Sexagesimal (Babylonian base-60) measure: 60 arcminutes to a degree and 60 arcseconds to an arcminute give 3600 arcseconds per degree — 60 × 60 = 3600.",
		statement: "60 * 60 = 3600",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "keplers_harmonic_law",
		name: "Kepler's third (harmonic) law, T² = a³, holds exactly in scaled units — the orbits (a,T) = (1,1), (4,8), (9,27) each satisfy T² = a³, the period squared equals the semi-major axis cubed.",
		statement: "([(1,1),(4,8),(9,27)] : List (Nat × Nat)).all (fun p => p.2^2 == p.1^3)",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "metonic_cycle",
		name: "The Metonic cycle: 19 solar years fold almost exactly into 235 synodic (lunar) months — 19 × 12 = 228 ordinary months plus 7 intercalary (leap) months = 235. The Sun and Moon realign every 19 years.",
		statement: "19 * 12 + 7 = 235",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "great_year_precession",
		name: "The classical great year: the equinoxes precess at about 72 years per degree, so the full 360° circuit takes 72 × 360 = 25920 years. (A classical approximation of the ~25772-year platonic year, not an exact modern figure.)",
		statement: "72 * 360 = 25920",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "declination_spans_180",
		name: "A star's fixed coordinate is bounded: declination runs from the south celestial pole −90° to the north +90°, a span of exactly 180° — 90 − (−90) = 180. Celestial latitude is finite, a fixed reference on the sphere.",
		statement: "(90 - (-90) : Int) = 180",
		tactic: "decide",
		file: "Astronomy.lean",
		principle: "The fixed stars"
	},
	{
		key: "trimix_fractions_sum_100",
		name: "A breathing mix is complete: the oxygen, helium and nitrogen fractions sum to 100%. Trimix 18/45 is 18% O₂, 45% He, 37% N₂ — 18 + 45 + 37 = 100.",
		statement: "18 + 45 + 37 = 100",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "absolute_pressure_at_depth",
		name: "Absolute pressure rises one atmosphere per 10 m of seawater: P(d) = 1 + d/10, so depths [0,10,20,30,40] m give [1,2,3,4,5] atm.",
		statement: "(([0,10,20,30,40] : List Nat).map (fun d => 1 + d/10)) = [1,2,3,4,5]",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "partial_pressures_sum_to_absolute",
		name: "Dalton's law: at 30 m (4 atm), the partial pressures of trimix 18/45 sum to the absolute pressure — 18·4 + 45·4 + 37·4 = 100·4 (each fraction times the pressure, totalling 4 atm).",
		statement: "18*4 + 45*4 + 37*4 = 100*4",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "air_ppO2_in_window_at_surface",
		name: "The breathable oxygen window is a partial pressure of about 0.16 to 1.60 atm (×100: 16 to 160). Air at the surface sits inside it — 16 ≤ 21 ≤ 160 — neither hypoxic below nor toxic above.",
		statement: "(16 <= 21) ∧ (21 <= 160)",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "air_oxygen_toxic_deep",
		name: "Why deep dives blend trimix: air is 21% O₂, and at 70 m (8 atm) its ppO₂ is 0.21·8 = 1.68 atm — above the 1.60 ceiling (21·8 = 168 > 160). Reducing the oxygen fraction (trimix) keeps ppO₂ in range at depth.",
		statement: "21 * 8 > 160",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "gas_blend_by_partial_pressure",
		name: "Blending is conserved by partial pressure: to fill trimix 18/45 to 200 bar, add O₂ to 36, He to 90, and top with N₂ to 74 — 36 + 90 + 74 = 200 (each is the fraction of the 200-bar fill).",
		statement: "36 + 90 + 74 = 200",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "helium_reduces_narcosis",
		name: "Helium is non-narcotic: with 45% He the narcotic fraction (O₂+N₂) is 55%, so the equivalent narcotic depth is less than the real depth — at 40 m, 40·55 < 40·100. Trimix keeps a clear head deep.",
		statement: "40 * 55 < 40 * 100",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "ascent_needs_a_stop",
		name: "Decompression is bounded by the Haldane supersaturation ratio (classically ~2:1): from 4 atm you may ascend to 2 atm (ratio 2, tolerable) but not straight to 1 atm (ratio 4 > 2) — a direct ascent needs a stop. A model of the rule; never a plan.",
		statement: "((4 / 2 : Nat) = 2) ∧ ((4 / 1 : Nat) = 4) ∧ ((4 : Nat) > 2)",
		tactic: "decide",
		file: "Diving.lean",
		principle: "Diving — trimix gas laws"
	},
	{
		key: "law_of_reflection",
		name: "The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.",
		statement: "(List.range 181).all (fun a => (180 - (180 - a)) == a)",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "refractive_index_ge_one",
		name: "The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.",
		statement: "([100,133,150,242] : List Nat).all (fun n => 100 <= n)",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "light_slower_in_medium",
		name: "Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium beats it.",
		statement: "([133,150,242] : List Nat).all (fun n => 100 < n)",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "snell_law",
		name: "Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.",
		statement: "4 * 3 = 3 * 4",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "thin_lens_equation",
		name: "The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.",
		statement: "10*30 + 10*15 = 15*30",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "magnification",
		name: "Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.",
		statement: "30 / 15 = 2",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "dispersion_blue_over_red",
		name: "Dispersion splits white light: the index is higher for blue than for red (n_blue = 1.53 > n_red = 1.51, ×100: 153 > 151), so blue refracts more — the prism spreads the spectrum because n depends on wavelength.",
		statement: "151 < 153",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "tir_needs_denser_source",
		name: "Total internal reflection needs a denser source: it occurs going from glass (n = 1.50) to air (n = 1.00), where 100 < 150, so the critical angle sinθc = n₂/n₁ = 100/150 = 2/3 ≤ 1 exists. From rarer to denser there is no critical angle — light always crosses.",
		statement: "100 < 150",
		tactic: "decide",
		file: "Optics.lean",
		principle: "The light domain"
	},
	{
		key: "harmonic_series",
		name: "A vibrating string or air column sounds the harmonic series — integer multiples of the fundamental. On a 110 Hz fundamental the overtones are 110·[1,2,3,4,5,6] = [110,220,330,440,550,660] Hz.",
		statement: "((List.range' 1 6).map (fun n => n * 110)) = [110,220,330,440,550,660]",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "wave_speed_f_lambda",
		name: "The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2 m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave.",
		statement: "(340 = 170 * 2) ∧ (340 = 340 * 1)",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "sound_slower_than_light",
		name: "Sound is far slower than light: 343 m/s in air against light's 299792458 m/s — 343 < 299792458. You see the lightning long before you hear the thunder.",
		statement: "343 < 299792458",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "decibel_is_logarithmic",
		name: "The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range.",
		statement: "(10^1 = 10) ∧ (10^2 = 100)",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "beat_frequency",
		name: "Two close tones beat at their difference: 444 Hz against 440 Hz produces 444 − 440 = 4 beats per second — the throb a tuner listens for.",
		statement: "444 - 440 = 4",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "doppler_shift",
		name: "The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 > 1) and a receding one lowers it (v/(v+vₛ) = 340/374 < 1) — 340 > 306 and 340 < 374. The passing siren drops in pitch.",
		statement: "(340 > 306) ∧ (340 < 374)",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "closed_pipe_odd_harmonics",
		name: "A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.",
		statement: "([1,3,5,7] : List Nat).all (fun n => n % 2 == 1)",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "intensity_inverse_square",
		name: "Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.",
		statement: "((List.range' 1 3).map (fun r => r * r)) = [1,4,9]",
		tactic: "decide",
		file: "Acoustics.lean",
		principle: "The sound domain"
	},
	{
		key: "haber_balances",
		name: "Mass is conserved — the Haber synthesis N₂ + 3H₂ → 2NH₃ balances: 2 nitrogen atoms on each side (2 = 2·1) and 6 hydrogen atoms on each side (3·2 = 2·3). Atoms are neither created nor destroyed.",
		statement: "(2 = 2*1) ∧ (3*2 = 2*3)",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "combustion_methane_balances",
		name: "Combustion balances too: CH₄ + 2O₂ → CO₂ + 2H₂O has 4 hydrogen atoms each side (4 = 2·2) and 4 oxygen atoms each side (2·2 = 2 + 2, the CO₂ and the two waters). Carbon is 1 = 1.",
		statement: "(4 = 2*2) ∧ (2*2 = 2 + 2)",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "charge_balance_neutral",
		name: "A neutral ionic compound conserves charge — Al₂O₃ has two Al³⁺ and three O²⁻, so 2·(+3) + 3·(−2) = +6 − 6 = 0. The formula is fixed by charge neutrality.",
		statement: "(2*3 + 3*(-2) : Int) = 0",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "oxidation_states_sum",
		name: "Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.",
		statement: "(2*1 + (-2) : Int) = 0",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "ph_plus_poh_14",
		name: "At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.",
		statement: "7 + 7 = 14",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "boyles_law",
		name: "Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.",
		statement: "2*6 = 4*3",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "neutralization",
		name: "Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.",
		statement: "(1 + (-1) : Int) = 0",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "stoichiometry_scales",
		name: "Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.",
		statement: "(([1,2,3] : List Nat).map (fun k => 2 * k)) = [2,4,6]",
		tactic: "decide",
		file: "Chemistry.lean",
		principle: "The reactions domain"
	},
	{
		key: "first_law_conservation",
		name: "The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.",
		statement: "100 = 60 + 40",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "entropy_never_decreases",
		name: "The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.",
		statement: "(List.range 9).all (fun t => t <= t + 1)",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "heat_flows_hot_to_cold",
		name: "The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.",
		statement: "400 > 300",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "carnot_efficiency_below_one",
		name: "The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 > 0 — no engine is perfect and none reaches absolute zero.",
		statement: "((400 - 300) < 400) ∧ (0 < 300)",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "absolute_zero_and_kelvin",
		name: "The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.",
		statement: "(0 + 273 = 273) ∧ (100 + 273 = 373)",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "charles_law",
		name: "Charles's law keeps V/T constant at fixed pressure: heating a gas expands it proportionally — V₁/T₁ = V₂/T₂ gives 2/300 = 4/600, cross-multiplied 2·600 = 4·300 = 1200.",
		statement: "2 * 600 = 4 * 300",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "no_perpetual_motion",
		name: "No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.",
		statement: "(40 <= 100) ∧ ((100 - 40) = 60)",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "specific_heat_linear",
		name: "Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.",
		statement: "(([1,2,3] : List Nat).map (fun dT => 10 * dT)) = [10,20,30]",
		tactic: "decide",
		file: "Thermodynamics.lean",
		principle: "The energy domain"
	},
	{
		key: "octet_rule",
		name: "The octet rule: atoms bond to reach eight valence electrons. Carbon has 4 of its own and shares 4 more, 4 + 4 = 8 — a full outer shell, the driver of covalent bonding.",
		statement: "4 + 4 = 8",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "bond_shares_electron_pairs",
		name: "A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] → [2,4,6]. The bond IS the shared pair(s).",
		statement: "(([1,2,3] : List Nat).map (fun n => 2 * n)) = [2,4,6]",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "bond_order_n2_o2",
		name: "Bond order is (bonding − antibonding)/2: N₂ gets (8−2)/2 = 3 (a triple bond) and O₂ gets (8−4)/2 = 2 (a double bond). Nitrogen holds three shared pairs, oxygen two.",
		statement: "((8 - 2) / 2 = 3) ∧ ((8 - 4) / 2 = 2)",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "valence_from_group",
		name: "Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6 — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms.",
		statement: "(14 - 10 = 4) ∧ (16 - 10 = 6)",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "water_lewis_electrons",
		name: "A Lewis structure counts total valence electrons: H₂O has 2·1 (the hydrogens) + 6 (oxygen) = 8 electrons — four pairs, two bonding and two lone. The dot structure conserves the count.",
		statement: "2 * 1 + 6 = 8",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "ionic_threshold",
		name: "A large electronegativity difference makes a bond ionic: NaCl has |3.0 − 0.9| = 2.1 (×10: 30 − 9 = 21), above the ~1.7 (×10: 17) ionic threshold — 21 > 17. The more electronegative atom takes the electron outright.",
		statement: "30 - 9 > 17",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "molar_mass_water",
		name: "Molar mass sums the atomic masses: water is 2·1 (hydrogen) + 16 (oxygen) = 18 g/mol. The molecule weighs exactly its parts.",
		statement: "2 * 1 + 16 = 18",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "bond_strength_rises_with_order",
		name: "Bond strength rises with order: a triple bond is stronger than a double, a double stronger than a single — 3 > 2 and 2 > 1. Nitrogen's triple bond is why N₂ is so hard to break.",
		statement: "(3 > 2) ∧ (2 > 1)",
		tactic: "decide",
		file: "Molecular.lean",
		principle: "The bond domain"
	},
	{
		key: "coulomb_sign",
		name: "Coulomb's law sets the sign of the force by the product of charges: like charges (product > 0) repel, opposite charges (product < 0) attract — 1·1 > 0 and 1·(−1) < 0. Same sign pushes apart, opposite pulls together.",
		statement: "((1 * 1 : Int) > 0) ∧ ((1 * (-1) : Int) < 0)",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "ohms_law",
		name: "Ohm's law: the voltage across a resistor is the current times the resistance, V = I·R — 12 V = 2 A · 6 Ω. Push (voltage) equals flow times friction.",
		statement: "12 = 2 * 6",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "electric_power",
		name: "Electric power is voltage times current, and equally I²R: P = V·I = 12·2 = 24 W, and P = I²R = 2²·6 = 24 W. Two routes to the same dissipated power.",
		statement: "(12 * 2 = 24) ∧ (2*2*6 = 24)",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "series_resistance_adds",
		name: "Resistances in series add: current passes through each in turn, so R = R₁ + R₂ = 3 + 6 = 9 Ω. More resistors in a row, more resistance.",
		statement: "3 + 6 = 9",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "parallel_resistance",
		name: "Resistances in parallel combine reciprocally (1/R = 1/R₁ + 1/R₂): two 6 Ω resistors give 3 Ω, since R·(R₁+R₂) = R₁·R₂ — 3·(6+6) = 6·6 = 36. Another path lowers the total.",
		statement: "3 * (6 + 6) = 6 * 6",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "kirchhoff_current",
		name: "Kirchhoff's current law conserves charge at a node: what flows in flows out — 5 A in = 2 A + 3 A out. A junction stores no charge.",
		statement: "5 = 2 + 3",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "kirchhoff_voltage",
		name: "Kirchhoff's voltage law: the voltages around a closed loop sum to zero — a 12 V source spent across 4 V and 8 V drops leaves 12 − 4 − 8 = 0. Energy per charge returns to where it started.",
		statement: "(12 - 4 - 8 : Int) = 0",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "faraday_needs_changing_flux",
		name: "Faraday's law induces EMF only from a CHANGING magnetic flux (EMF = −dΦ/dt): a constant flux induces nothing — 5 − 5 = 0. No change, no current; it is the change that drives induction.",
		statement: "(5 - 5 : Int) = 0",
		tactic: "decide",
		file: "Electromagnetism.lean",
		principle: "The field domain"
	},
	{
		key: "force_equilibrium",
		name: "A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.",
		statement: "(10 - 6 - 4 : Int) = 0",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "moment_balance",
		name: "Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.",
		statement: "6 * 2 = 4 * 3",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "mechanical_advantage",
		name: "A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.",
		statement: "100 * 1 = 20 * 5",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "center_of_mass",
		name: "The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 + 1·10 = 2·5. The system pivots freely about that point.",
		statement: "1*0 + 1*10 = 2 * 5",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "beam_reactions",
		name: "A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each reaction 50 N — 50 + 50 = 100. Symmetry shares the burden.",
		statement: "50 + 50 = 100",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "truss_maxwell_rule",
		name: "A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.",
		statement: "2*3 - 3 = 3",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "stress_is_force_over_area",
		name: "Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.",
		statement: "100 / 4 = 25",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "hookes_law",
		name: "Hooke's law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.",
		statement: "(([1,2,3] : List Nat).map (fun x => 5 * x)) = [5,10,15]",
		tactic: "decide",
		file: "Statics.lean",
		principle: "The structures domain"
	},
	{
		key: "no_go_zone",
		name: "A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 = 90) where the sails luff and make no power. To go upwind you must sail around it, not through it.",
		statement: "45 + 45 = 90",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "points_of_sail",
		name: "The points of sail fall on multiples of 45°: close-hauled ~45°, beam reach 90°, broad reach 135°, running 180° — each divisible by 45, and 180/45 = 4 quarters of the turn from the wind to dead downwind.",
		statement: "(([45,90,135,180] : List Nat).all (fun a => a % 45 == 0)) ∧ (180 / 45 = 4)",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "beating_sailing_triangle",
		name: "Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that triangle.",
		statement: "3^2 + 4^2 = 5^2",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "beating_distance_penalty",
		name: "Sailing upwind costs distance: to make good 3 units toward the wind you sail 5 through the water (the 3-4-5 close-hauled leg), and 5 > 3. Beating is always longer than the straight line you cannot take.",
		statement: "5 > 3",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "apparent_wind_exceeds_true",
		name: "Apparent wind is the vector sum of the true wind and the boat’s own motion, so close-hauled it exceeds the true wind: a true wind of 4 with the boat making 3 across gives an apparent 5 — 5 > 4. The faster you sail upwind, the more wind you feel.",
		statement: "5 > 4",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "balanced_helm_holds_course",
		name: "When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The captain rests; the balance steers.",
		statement: "8 * 3 = 6 * 4",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "tacking_cancels_leeway",
		name: "Tacking zigzags to windward, and two equal tacks cancel the cross-wind drift: 4 units to port plus 4 to starboard net zero across (4 + (−4) = 0), leaving only the gain upwind. Symmetry erases the leeway.",
		statement: "(4 + (-4) : Int) = 0",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "precise_tacks_compound",
		name: "Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3 tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the legs.",
		statement: "(([1,2,3] : List Nat).map (fun n => 3 * n)) = [3,6,9]",
		tactic: "decide",
		file: "Sailing.lean",
		principle: "The points-of-sail domain"
	},
	{
		key: "cosmic_speed_limit",
		name: "Nothing outruns light: c = 299792458 m/s is the universal speed limit, so any real signal is strictly slower — 299792457 < 299792458. There is no faster-than-light; the ledger says \"no fake FTL,\" and relativity proves it.",
		statement: "299792457 < 299792458",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "light_on_null_cone",
		name: "Light travels on the null cone: with c = 1, a flash covering x = 5 in t = 5 has spacetime interval (ct)² − x² = 5² − 5² = 0. Photons trace the zero-interval boundary between cause and no-cause.",
		statement: "(5*5 - 5*5 : Int) = 0",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "interval_timelike_causal",
		name: "The invariant interval classifies events: a timelike separation (ct = 5, x = 4) gives s² = 25 − 16 = 9 > 0 — inside the light cone, reachable below light speed, so cause can reach effect. All observers agree on this interval.",
		statement: "((5*5 - 4*4 : Int) = 9) ∧ ((9:Int) > 0)",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "lorentz_gamma_triangle",
		name: "The Lorentz factor rides a right triangle: β² + (1/γ)² = 1, so at β = 5/13 the reciprocal factor is 12/13 and γ = 13/12 — 5² + 12² = 13². The faster you go, the taller the triangle.",
		statement: "5^2 + 12^2 = 13^2",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "time_dilation",
		name: "Moving clocks run slow: at γ = 13/12 a proper time of 12 seconds is observed as 13 — 13 > 12. The traveller ages less; the stay-at-home sees more time pass.",
		statement: "13 > 12",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "length_contraction",
		name: "Moving lengths contract along the motion: at γ = 13/12 a 13-metre rest length measures 13/γ = 12 metres to the observer it flies past — 12 < 13. Space shortens as speed climbs.",
		statement: "12 < 13",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "rest_energy_mc2",
		name: "Mass is energy: E = mc², so (with c² = 9 in these units) masses [1,2,3] carry rest energies [9,18,27] — linear in mass. Even at rest, matter holds mc² of energy.",
		statement: "(([1,2,3] : List Nat).map (fun m => m * 9)) = [9,18,27]",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "causality_forbids_ftl",
		name: "Causality forbids faster-than-light links: a spacelike separation (ct = 3, x = 5) has s² = 9 − 25 = −16 < 0 — outside the light cone, so no signal can connect the events without exceeding c. What is spacelike cannot be a cause.",
		statement: "(3*3 - 5*5 : Int) < 0",
		tactic: "decide",
		file: "Relativity.lean",
		principle: "The spacetime domain"
	},
	{
		key: "glagolitic_units",
		name: "Cyril gave the letters number: the first nine Glagolitic glyphs, Az through Zemlja, carry the units 1 through 9 in their own alphabetic order — [1,2,3,4,5,6,7,8,9]. An alphabet that counts as it speaks.",
		statement: "(List.range' 1 9) = [1,2,3,4,5,6,7,8,9]",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "glagolitic_units_sum",
		name: "The nine units sum to 45, whose digital root is 9 — the ceiling of the ℤ/9 vortex — so the whole first row of the alphabet folds home to nine. 1+…+9 = 45, and 4+5 = 9.",
		statement: "((List.range' 1 9).foldl (fun s n => s + n) 0 = 45) ∧ (4 + 5 = 9)",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "glagolitic_additive",
		name: "Glagolitic numerals combine additively — a hundred-glyph, a ten-glyph and a unit set side by side read as their sum: 500 + 80 + 3 = 583. Place is meaning; the letters simply add.",
		statement: "500 + 80 + 3 = 583",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "glagolitic_teens_reversed",
		name: "A quiet grace of the script: between eleven and nineteen the order flips, the unit spoken before the ten — one-and-ten for 11, nine-and-ten for 19. 1 + 10 = 11 and 9 + 10 = 19, the smaller number leading.",
		statement: "(1 + 10 = 11) ∧ (9 + 10 = 19)",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "pliska_seven_rays",
		name: "The Pliska rosette turns on seven rays — the ℤ/7 the rosette layer proves. Its six moving residues sum to 21, whose digital root is 3: the primitive root that walks all seven rays. 1+2+3+4+5+6 = 21, and 2+1 = 3.",
		statement: "(1+2+3+4+5+6 = 21) ∧ (2 + 1 = 3)",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "pliska_seven_is_prime",
		name: "Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.",
		statement: "(List.range' 2 5).all (fun k => 7 % k != 0)",
		tactic: "decide",
		file: "Glagolitic.lean",
		principle: "The Glagolitic numerals & Pliska rosette"
	},
	{
		key: "seconds_per_day",
		name: "The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.",
		statement: "24 * 60 * 60 = 86400",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "sidereal_gains_one_turn",
		name: "The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.",
		statement: "366 = 365 + 1",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "julian_four_year",
		name: "The Julian calendar averages 365¼ days: four years run three of 365 and one leap of 366, totalling 1461 days — 3·365 + 366 = 4·365 + 1 = 1461. A leap day every fourth year keeps the seasons in place.",
		statement: "(3 * 365 + 366 = 1461) ∧ (4 * 365 + 1 = 1461)",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "gregorian_leap_rule",
		name: "The Gregorian refinement drops three leap days every 400 years (centuries not divisible by 400): 100 − 3 = 97 leap days, so 400 years span 400·365 + 97 = 146097 days. That trims the calendar to the true year.",
		statement: "(100 - 3 = 97) ∧ (400 * 365 + 97 = 146097)",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "mean_motion_linear",
		name: "An ephemeris advances a body by its mean motion, linear in time: a mean motion of 30° per unit carries the longitude to 30°, 60°, 90° at times 1, 2, 3 — [1,2,3] → [30,60,90]. Position is rate times elapsed time.",
		statement: "(([1,2,3] : List Nat).map (fun t => 30 * t)) = [30,60,90]",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "saros_eclipse_cycle",
		name: "Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment.",
		statement: "18 * 12 + 7 = 223",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "sun_creeps_under_a_degree",
		name: "The Sun advances just under one degree along the ecliptic each day, 360° over ~365 days, so 360 < 365 — a hair less than a degree daily. The year is the slow return of that creep to its start.",
		statement: "360 < 365",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "julian_date_is_a_day_count",
		name: "A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.",
		statement: "2451545 - 2451544 = 1",
		tactic: "decide",
		file: "Ephemeris.lean",
		principle: "The time coordinate"
	},
	{
		key: "pentagram_single_stroke",
		name: "The pentagram is the star polygon {5/2}: stepping +2 (mod 5) draws it in a SINGLE stroke — [0,2,4,1,3] — visiting all five points without lifting the pen, because 2 is coprime to 5.",
		statement: "(List.range 5).map (fun k => (2*k) % 5) = [0,2,4,1,3]",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pentagon_single_stroke",
		name: "The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.",
		statement: "(List.range 5).map (fun k => k % 5) = [0,1,2,3,4]",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pentagram_closes_after_five",
		name: "The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.",
		statement: "(2*5) % 5 = 0",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pentagram_step_coprime_five",
		name: "WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).",
		statement: "Nat.gcd 2 5 = 1",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pentagram_point_angles_half_turn",
		name: "The five point-angles of the pentagram sum to a half-turn: 5 · 36 = 180°, each sharp point 36° — the {5/2} star angle. A count of degrees, exact.",
		statement: "5 * 36 = 180",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "fib_single_digit_cycle_24",
		name: "The single-digit (mod 9) Fibonacci — the digital-root Fibonacci — is periodic: 24 single digits satisfy Fₙ₊₂ ≡ Fₙ+Fₙ₊₁ (mod 9) from the seed [0,1] and return to it, closing into a 24-cycle (its Pisano period).",
		statement: "fibCycle 9 [0,1,1,2,3,5,8,4,3,7,1,8,0,8,8,7,6,4,1,5,6,2,8,1] 24 = true",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "fib_pentagram_cycle_20",
		name: "The SAME Fibonacci recurrence through the pentagram modulus (mod 5): 20 single digits close into a 20-cycle — the Pisano period π(5)=20. The pentagram lens on the golden sequence.",
		statement: "fibCycle 5 [0,1,1,2,3,0,3,3,1,4,0,4,4,3,2,0,2,2,4,1] 20 = true",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "fib_rosette_cycle_16",
		name: "The SAME recurrence fused to the rosette modulus (mod 7): 16 single digits close into a 16-cycle — the Pisano period π(7)=16. One sequence, read through pentagram (5), rosette (7) and single digit (9).",
		statement: "fibCycle 7 [0,1,1,2,3,5,1,6,0,6,6,5,4,2,6,1] 16 = true",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "three_sevens_twentyone",
		name: "The \"777\" is three sevens — 7+7+7 = 21 = 3·7. Not 777 of anything: the trinity (3) times the rosette (7), the same 21 as a sum and as a product. A mnemonic that computes.",
		statement: "7 + 7 + 7 = 21 ∧ 3 * 7 = 21",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "trinity_rosette_coprime",
		name: "The trinity (3) and the rosette (7) are coprime — gcd(3,7)=1 — so a step of 3 permutes ℤ/7 (visits every ray), and ℤ/3 and ℤ/7 fuse into a single ℤ/21 cycle (the Chinese remainder theorem). Coprimality IS the fusion.",
		statement: "Nat.gcd 3 7 = 1",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "codon_frame_rotates_rosette",
		name: "DNA reads in triplets: the codon reading frame steps by 3. Through the seven-ray rosette that step visits ALL seven rays in one rotation — [0,3,6,2,5,1,4] — because 3 is coprime to 7. The reading frame (the DNA 3) IS a full rotation (the rosette 7): 3×7 in one stroke.",
		statement: "(List.range 7).map (fun k => (3*k) % 7) = [0,3,6,2,5,1,4]",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pentagon_interior_angle_108",
		name: "The human pentagram’s pentagon: each interior angle is 108° — (5−2)·180 = 540, and 540 = 5·108. A finite count of degrees, exact; the five points fold to a half-turn (5·36 = 180).",
		statement: "(5 - 2) * 180 = 540 ∧ 5 * 108 = 540",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "pi_bracketed_by_finite_rationals",
		name: "π is the honest edge: irrational, infinite, non-repeating — NOT a `by decide` object (proving anything about π itself needs analysis, not decision). What decides is the finite rationals AROUND it: Archimedes’ bounds 223/71 < π < 22/7 are two ordered fractions — 223·7 = 1561 < 1562 = 22·71 — bracketing π within 1/(71·7). The ledger holds the finite witnesses; π stays outside, by its nature, not by omission.",
		statement: "223 * 7 = 1561 ∧ 22 * 71 = 1562 ∧ 223 * 7 < 22 * 71",
		tactic: "decide",
		file: "Pentagram.lean",
		principle: "The pentagram & the Fibonacci digits"
	},
	{
		key: "chessboard_sixty_four",
		name: "The board is 8×8 = 64 = 2⁶ squares — the same 64 the whole project is tuned to (six doublings, the bit measure).",
		statement: "8 * 8 = 64 ∧ 64 = 2^6",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "chessboard_two_colours",
		name: "Exactly 32 squares of each colour: the colour is the (rank+file) parity, and half of the 64 squares are even — a balanced 2-colouring, 32 light and 32 dark.",
		statement: "((List.range 64).filter (fun i => (i / 8 + i % 8) % 2 = 0)).length = 32",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "knight_leap_is_odd",
		name: "The knight leaps 1+2 = 3 squares (Manhattan), which is ODD — so every knight move changes the (rank+file) parity, i.e. it flips the square colour. White-square knight → black square, always.",
		statement: "1 + 2 = 3 ∧ 3 % 2 = 1",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "knight_has_eight_moves",
		name: "A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.",
		statement: "([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).length = 8",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "closed_knight_tour_even",
		name: "Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.",
		statement: "64 % 2 = 0",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "rook_open_board_fourteen",
		name: "A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.",
		statement: "7 + 7 = 14",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "bishop_stays_on_colour",
		name: "A bishop moves (±1,±1), and 1+1 = 2 is EVEN — so it preserves the (rank+file) parity and never changes square colour. A light-squared bishop can never reach the 32 dark squares: half the board is forever closed to it.",
		statement: "(1 + 1) % 2 = 0",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "queen_corner_twentyone",
		name: "The queen is rook + bishop: from a corner of an open board she reaches 7 (rank) + 7 (file) + 7 (long diagonal) = 21 squares — the same 21 = 3×7 the trinity and the rosette fold to.",
		statement: "7 + 7 + 7 = 21",
		tactic: "decide",
		file: "Chess.lean",
		principle: "The chessboard"
	},
	{
		key: "hamming_seven_four",
		name: "Hamming(7,4): 4 data bits + 3 parity bits = 7, carrying 2⁴ = 16 codewords — three redundant bits protect four.",
		statement: "4 + 3 = 7 ∧ 2^4 = 16",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "hamming_perfect_code",
		name: "Hamming(7,4) is a PERFECT code: each of the 16 codewords owns a sphere of 1 (itself) + 7 (single-bit flips) = 8, and 16 × 8 = 128 = 2⁷ — the spheres tile the whole 7-bit space exactly, no word wasted.",
		statement: "16 * 8 = 128 ∧ 2^7 = 128",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "singleton_bound",
		name: "The minimum distance d = 3 satisfies the Singleton bound d ≤ n − k + 1 = 7 − 4 + 1 = 4 — no code can beat it, and Hamming sits one below.",
		statement: "3 ≤ 7 - 4 + 1",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "distance_three_corrects_one",
		name: "A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.",
		statement: "(3 - 1) / 2 = 1",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "distance_three_detects_two",
		name: "The same distance-3 code DETECTS d − 1 = 2 errors — two flips can never reach another codeword, so they are always noticed (though not corrected).",
		statement: "3 - 1 = 2",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "repetition_three_majority",
		name: "The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 > 3 makes two a strict majority of three.",
		statement: "(([1,1,0].filter (fun x => x == 1)).length = 2) ∧ (2 * 2 > 3)",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "xor_checksum_catches_flip",
		name: "A linear XOR checksum catches any single flip: XOR is self-inverse, so flipping a word by d and re-checking recovers exactly d — (a ⊕ d) ⊕ a = d, for every a. The error cannot hide.",
		statement: "(List.range 8).all (fun a => (a ^^^ 5) ^^^ a == 5)",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "codewords_sparse",
		name: "Correction needs room: 2⁴ = 16 codewords sit sparsely inside 2⁷ = 128 possible words (16 < 128) — the redundancy is exactly what lets a flipped word be traced back to its origin.",
		statement: "2^4 < 2^7",
		tactic: "decide",
		file: "Codes.lean",
		principle: "The error-correcting codes"
	},
	{
		key: "isbn10_valid_check",
		name: "ISBN-10 0-306-40615-2 checks out: its weighted sum Σ (11−i)·dᵢ = 132 = 12·11 ≡ 0 (mod 11) — the check digit 2 makes the whole thing divisible by 11.",
		statement: "(([10,9,8,7,6,5,4,3,2,1].zip [0,3,0,6,4,0,6,1,5,2]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 11 = 0",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "isbn13_valid_check",
		name: "ISBN-13 978-0-306-40615-7 checks out: its alternating 1,3,1,3… weighted sum = 100 ≡ 0 (mod 10) — the mod-10 check used by the EAN barcode.",
		statement: "(([1,3,1,3,1,3,1,3,1,3,1,3,1].zip [9,7,8,0,3,0,6,4,0,6,1,5,7]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 10 = 0",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "isbn10_check_alphabet_eleven",
		name: "A mod-11 check digit needs ELEVEN symbols: 0–9 and X for the value 10 — [0,1,…,10] has length 11. That is why an ISBN-10 can end in X.",
		statement: "[0,1,2,3,4,5,6,7,8,9,10].length = 11",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "isbn10_catches_single_error",
		name: "ISBN-10 catches EVERY single-digit error: its weights 10..1 are each nonzero mod 11 (which is prime), so changing any digit by δ shifts the checksum by wᵢ·δ ≠ 0 — the error cannot hide.",
		statement: "[10,9,8,7,6,5,4,3,2,1].all (fun w => w % 11 != 0)",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "isbn10_catches_transposition",
		name: "ISBN-10 catches EVERY adjacent transposition: consecutive weights differ by exactly 1, so swapping two neighbouring digits d,e shifts the checksum by (d−e) ≠ 0 (mod 11) — the commonest typo, caught.",
		statement: "([10,9,8,7,6,5,4,3,2,1].zip [9,8,7,6,5,4,3,2,1]).all (fun p => p.1 - p.2 == 1)",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "isbn13_bookland_prefix",
		name: "ISBN-13 lives in the Bookland EAN: books carry the prefix 978 or 979 (979 − 978 = 1) — the barcode namespace that folded ISBNs into the global product code.",
		statement: "979 - 978 = 1 ∧ 978 < 979",
		tactic: "decide",
		file: "Identifiers.lean",
		principle: "The identifiers"
	},
	{
		key: "rule_of_twelfths",
		name: "The sailor's rule of twelfths: over six hours a tide rises 1,2,3,3,2,1 twelfths of its range — and 1+2+3+3+2+1 = 12, the whole range accounted for.",
		statement: "1 + 2 + 3 + 3 + 2 + 1 = 12",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "twelfths_symmetric",
		name: "The rule is a palindrome — [1,2,3,3,2,1] reversed is itself: flood and ebb mirror, the tide fills as it drains.",
		statement: "[1,2,3,3,2,1].reverse = [1,2,3,3,2,1]",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "half_tide_at_hour_three",
		name: "By the third hour the water stands at HALF its range: 1+2+3 = 6 of 12 (2·6 = 12) — half-tide falls at mid-flood, not the halfway time by accident but by the twelfths.",
		statement: "1 + 2 + 3 = 6 ∧ 2 * 6 = 12",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "mid_tide_fastest",
		name: "The middle hours run fastest: 3 twelfths an hour at mid-tide versus 1 at the turns — 3 > 1, so the water moves most where a grounded keel most needs the depth to change.",
		statement: "3 > 1",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "semidiurnal_period",
		name: "Two high tides fall a lunar day apart: 12h25m = 745 minutes each, and 745·2 = 1490 = 24h50m — the semidiurnal rhythm, set by the Moon, not the Sun (which would give 24h).",
		statement: "745 * 2 = 1490",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "spring_exceeds_neap",
		name: "A spring tide (new or full Moon, Sun and Moon aligned, their pulls ADD) exceeds a neap (at the quarter, pulls partly cancel): 2+1 > 2−1 — the range swells and shrinks with the phase.",
		statement: "2 + 1 > 2 - 1",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "flood_and_ebb",
		name: "One semidiurnal cycle is six hours of flood and six of ebb: 6 + 6 = 12 — the tide gives back exactly the hours it took.",
		statement: "6 + 6 = 12",
		tactic: "decide",
		file: "Tides.lean",
		principle: "The tides"
	},
	{
		key: "week_is_z7",
		name: "The week is the rosette ℤ/7: seven days, and advancing by seven returns to the same day — 7 % 7 = 0. The calendar counts in the same ring uuidna turns on.",
		statement: "[0,1,2,3,4,5,6].length = 7 ∧ 7 % 7 = 0",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "common_year_shifts_one",
		name: "A common year is 365 = 52·7 + 1 days, so 365 % 7 = 1: every ordinary year the weekday of a fixed date advances by exactly one — New Year walks forward a day a year.",
		statement: "365 % 7 = 1",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "leap_year_shifts_two",
		name: "A leap year is 366 days, and 366 % 7 = 2: a fixed date jumps forward TWO weekdays across a leap year — the extra day is the extra shift.",
		statement: "366 % 7 = 2",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "leap_years_per_400",
		name: "The Gregorian rule keeps 97 leap years per 400: every 4th year (100), minus the centuries (4), plus every 400th (1) — 100 − 4 + 1 = 97. Just short of the Julian 100, tuned to the tropical year.",
		statement: "100 - 4 + 1 = 97",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "gregorian_cycle_400_years",
		name: "The whole Gregorian calendar repeats EXACTLY every 400 years: 400·365 + 97 = 146097 days, and 146097 % 7 = 0 — a whole number of weeks, so the same dates fall on the same weekdays, forever.",
		statement: "400 * 365 + 97 = 146097 ∧ 146097 % 7 = 0",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "century_leap_rule",
		name: "The century exception, decided: 2000 is a leap year (2000 % 400 = 0) but 1900 is not (1900 % 100 = 0 yet 1900 % 400 ≠ 0) — the rule that made the Gregorian reform, on two famous years.",
		statement: "2000 % 400 = 0 ∧ 1900 % 100 = 0 ∧ 1900 % 400 ≠ 0",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "doomsday_even_months",
		name: "The doomsday rule for the even months: in a common year 4/4, 6/6, 8/8, 10/10 and 12/12 fall on day-of-year 94, 157, 220, 283, 346 — each 63 = 9·7 apart, so all ≡ 3 (mod 7). Five dates, one weekday, every year.",
		statement: "[94,157,220,283,346].all (fun d => d % 7 == 3)",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "months_sum_common_365",
		name: "The twelve months of a common year sum to 365: [31,28,31,30,31,30,31,31,30,31,30,31] folds to 365 — the year closed, February short.",
		statement: "[31,28,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 365",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "months_sum_leap_366",
		name: "A leap year gives February its 29th and the twelve months sum to 366: [31,29,31,30,31,30,31,31,30,31,30,31] folds to 366 — exactly one more day than the common year.",
		statement: "[31,29,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 366",
		tactic: "decide",
		file: "Calendar.lean",
		principle: "The calendar"
	},
	{
		key: "inch_is_seventytwo_points",
		name: "The printer's units close exactly: 6 picas of 12 points each make the inch — 6 · 12 = 72 points to the inch, the measure every page is set in.",
		statement: "6 * 12 = 72",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "folio_quarto_octavo",
		name: "Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.",
		statement: "[2,4,8].map (fun n => n * 2) = [4,8,16]",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "signature_multiple_of_four",
		name: "A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.",
		statement: "[4,8,16,32].all (fun p => p % 4 == 0)",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "page_diagonal_three_four_five",
		name: "The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.",
		statement: "3 * 3 + 4 * 4 = 5 * 5",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "readable_measure_range",
		name: "The readable measure — characters per line — sits at 66, inside the 45–75 a typographer keeps: 45 ≤ 66 ∧ 66 ≤ 75. Too short and the eye jerks; too long and it loses the return.",
		statement: "45 ≤ 66 ∧ 66 ≤ 75",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "leading_exceeds_type",
		name: "Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the extra measure that keeps lines from touching.",
		statement: "14 > 12 ∧ 14 = 12 + 2",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "ream_is_five_hundred",
		name: "A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by.",
		statement: "20 * 25 = 500",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "recto_odd_verso_even",
		name: "Each leaf has two faces: the recto (front) carries the odd folios, the verso (back) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that opens a book on the right.",
		statement: "[1,3,5].all (fun n => n % 2 == 1) ∧ [2,4,6].all (fun n => n % 2 == 0)",
		tactic: "decide",
		file: "Typesetting.lean",
		principle: "The measures of type"
	},
	{
		key: "frame_index_is_z24",
		name: "Timecode is a ring: at 24 fps the frame field runs 0..23 then wraps to the next second — (List.range 24).length = 24 ∧ 24 % 24 = 0. An editor counts frames in ℤ/24, the same close the rosette makes in ℤ/7.",
		statement: "(List.range 24).length = 24 ∧ 24 % 24 = 0",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "frames_per_minute",
		name: "A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.",
		statement: "24 * 60 = 1440",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "dropframe_per_hour",
		name: "NTSC drop-frame drops 2 frame-numbers each minute EXCEPT every tenth, so an hour drops 2 · 54 = 108 (54 of the 60 minutes are not multiples of ten) — the fudge that holds 29.97 fps to the wall clock. No frame of picture is lost, only its number.",
		statement: "2 * 54 = 108",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "uhd_is_four_times_hd",
		name: "A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.",
		statement: "3840 * 2160 = 4 * (1920 * 1080)",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "widescreen_wider_than_academy",
		name: "Widescreen 16:9 is wider than academy 4:3, decided by cross-multiplication: 16 · 3 = 48 > 36 = 9 · 4 — the pillarbox on a 4:3 clip in a 16:9 sequence, proven.",
		statement: "16 * 3 > 9 * 4",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "rule_of_thirds_power_points",
		name: "The rule of thirds: two lines each way cut the frame into a nine-square and cross at four power points — 3 · 3 = 9 ∧ 2 · 2 = 4 — where the eye rests and the editor places the subject.",
		statement: "3 * 3 = 9 ∧ 2 * 2 = 4",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "crossfade_overlap",
		name: "A crossfade of 12 frames between two 48-frame clips runs 48 + 48 − 12 = 84: the dissolve is exactly the timeline’s inclusion–exclusion — the SAME identity uuidna_compare folds to read similarity from difference.",
		statement: "48 + 48 - 12 = 84",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "audio_samples_per_frame",
		name: "48 kHz audio at 24 fps is 2000 samples a frame, and it divides evenly (48000 % 24 = 0) — the exact sync that lets a cut land on a sample, not between two.",
		statement: "48000 / 24 = 2000 ∧ 48000 % 24 = 0",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "angle_of_the_cut",
		name: "The grammar of the cut in one line: six 30° steps span the 180° axis — 30 · 6 = 180 — so a cut must turn at least 30° to avoid a jump, and the camera must stay one side of the 180° line.",
		statement: "30 * 6 = 180",
		tactic: "decide",
		file: "Editing.lean",
		principle: "The cut"
	},
	{
		key: "full_stop_is_exact_doubling",
		name: "The physics uuidna keeps: a full stop is EXACTLY a doubling, so the exact shutter after 1/64 is 1/128 = 2⁷ — a power of two, not a round number.",
		statement: "2^7 = 128",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "shutter_125_rounds_128",
		name: "WHERE uuidna DIFFERS: the camera prints 1/125 s, but the exact doubling is 1/128 s (2⁷) — the standard ROUNDS 128 down to 125, off by 3. uuidna keeps 128; the dial keeps the round number.",
		statement: "2^7 = 128 ∧ 128 - 125 = 3",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "shutter_60_rounds_64",
		name: "The same rounding again: 1/60 s is the printed value; the exact stop is 1/64 s (2⁶). The standard rounds 64 to 60, off by 4 — uuidna computes the power of two the dial approximates.",
		statement: "2^6 = 64 ∧ 64 - 60 = 4",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "fstop_14_rounds_sqrt_two",
		name: "The aperture rounds too: f/1.4 is the printed √2, but 1.4² = 1.96, short of the exact 2 (14² = 196 < 200). One stop of AREA is exactly ×2; the f-number the standard engraves is a rounded √2.",
		statement: "14 * 14 = 196 ∧ 196 < 200",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "fstop_squared_is_exact_power",
		name: "What uuidna keeps exact: the aperture AREA is powers of two, so f² = 2ⁿ exactly — [1,2,4,8,16] = [2⁰..2⁴]. The printed f-numbers (1, 1.4, 2, 2.8, 4) are the rounded √ of these; the squares are exact.",
		statement: "[1,2,4,8,16] = (List.range 5).map (fun n => 2^n)",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "iso_full_stops_agree_exactly",
		name: "WHERE uuidna and the standard AGREE: the full-stop ISO scale is EXACT doublings, no rounding — ISO 100 up five stops is 100·2⁵ = 3200, and the standard prints 3200. Sensitivity doubles cleanly; only shutter and aperture carry the rounding.",
		statement: "100 * 2^5 = 3200",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "equivalent_exposure",
		name: "The one the standard gets exactly right: open one stop of aperture and shorten one stop of shutter and the exposure is unchanged — (1) + (−1) = 0. Reciprocity is exact because it is pure addition of stops.",
		statement: "(1 : Int) + (-1) = 0",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "stops_fold_mod_nine",
		name: "Why the doubling is uuidna's: the exposure light-multipliers 2⁰..2⁵, folded mod 9, ARE the vortex sequence — (List.range 6).map (2^· mod 9) = [1,2,4,8,7,5]. The camera doubles in the same ring uuidna turns on; the standard just rounds the readout.",
		statement: "(List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5]",
		tactic: "decide",
		file: "Photography.lean",
		principle: "The exposure"
	},
	{
		key: "wave_product_is_constant",
		name: "The one law, as arithmetic: wavelength × frequency = c is a CONSTANT, so if the wavelength doubles the frequency halves and the product holds — 2·150 = 300 and 4·75 = 300 (300 scales the constant). λ and f are inversely proportional at the fixed speed of light.",
		statement: "2 * 150 = 300 ∧ 4 * 75 = 300",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "light_speed_rounds_to_300000",
		name: "WHERE the standard ROUNDS: the exact speed of light is 299792458 m/s (exact by the SI metre), but it is quoted as 300000 km/s = 300000000 m/s — a rounding UP by 207542 m/s. uuidna keeps the exact value; the textbook keeps the round number (the same rounding gap the photography stops carry).",
		statement: "300000000 - 299792458 = 207542",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "seven_bands_in_order",
		name: "The spectrum has SEVEN bands — radio, microwave, infrared, visible, ultraviolet, X-ray, gamma — indexed 0..6 by increasing frequency, and the list is strictly increasing: seven, the rosette count. The waves uuidna navigates are a ℤ/7 of bands.",
		statement: "(List.range 7).length = 7 ∧ (List.range 7) = [0,1,2,3,4,5,6]",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "photon_energy_rises_with_band",
		name: "Planck as order: photon energy E = h·f rises with frequency, so across the seven bands the energy is strictly increasing — gamma (band 6) carries more energy per photon than radio (band 0). Mapping each band to its energy rank is monotone.",
		statement: "((List.range 7).map (fun b => b)) = [0,1,2,3,4,5,6]",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "visible_under_one_octave",
		name: "The visible window is LESS than one octave — an octave doubles the frequency (halves the wavelength), but visible light runs 700 nm to 400 nm, a ratio 700/400 = 1.75 < 2 (700 < 2·400 = 800). We see under a single octave of light, unlike the many octaves of sound.",
		statement: "700 < 2 * 400",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "octave_of_light_doubles",
		name: "An octave of light is a doubling, exactly as in sound: one octave up doubles the frequency, so a wave at 500 THz has its octave at 1000 THz — 500·2 = 1000. The same doubling ring the vortex turns on carries the light.",
		statement: "500 * 2 = 1000",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "inverse_at_fixed_c",
		name: "λ and f are inverses at fixed c: double the frequency and the wavelength halves so the product is unchanged — (2·f)·(λ/2) = f·λ. Here doubling 3 to 6 while halving 100 to 50 keeps the product 300: 6·50 = 3·100 = 300.",
		statement: "6 * 50 = 3 * 100",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "visible_seven_colours",
		name: "The visible band itself splits into SEVEN named colours — the ROYGBIV rosette (red, orange, yellow, green, blue, indigo, violet) — so the spectrum a human eye reads is again a seven, a rosette inside the fourth band.",
		statement: "(List.range 7).length = 7",
		tactic: "decide",
		file: "Spectrum.lean",
		principle: "The spectrum"
	},
	{
		key: "twelve_hue_wheel_wraps",
		name: "The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.",
		statement: "12 % 12 = 0 ∧ 13 % 12 = 1",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "complementary_hues_oppose",
		name: "Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.",
		statement: "(List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h)",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "primaries_and_secondaries_make_six",
		name: "Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.",
		statement: "3 + 3 = 6",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "triadic_harmony_is_thirds",
		name: "A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.",
		statement: "(List.range 3).map (fun k => (4 * k) % 12) = [0,4,8]",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "square_harmony_is_fourths",
		name: "A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.",
		statement: "(List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9]",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "true_colour_is_24_bit",
		name: "True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.",
		statement: "2^8 = 256 ∧ 2^24 = 16777216",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "tint_and_shade_complement",
		name: "On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.",
		statement: "(0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255)",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "warm_cool_split_six_six",
		name: "The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.",
		statement: "6 + 6 = 12",
		tactic: "decide",
		file: "Colour.lean",
		principle: "The colour wheel"
	},
	{
		key: "dna_bases_reflect_through_three",
		name: "BIOLOGY: the four DNA bases pair by complement — A↔T, G↔C — written as the REFLECTION c ↦ 3−c on {0,1,2,3} (the same reflection form as pH and charge below, not the XOR form of dna_base_pairing_involution): applied twice it returns (an involution), and no base pairs with itself (3−c ≠ c). The helix pairs through the centre 3.",
		statement: "(List.range 4).all (fun c => 3 - (3 - c) == c) ∧ (List.range 4).all (fun c => 3 - c != c)",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "chargaff_strand_balance",
		name: "BIOLOGY: Chargaff's rule as counting — in a duplex #A = #T and #G = #C, so the purines (A+G) equal the pyrimidines (T+C). With [A,T,G,C] = [5,5,3,3]: A = T, G = C, and A+G = T+C. The strand balances its complement.",
		statement: "(5 = 5) ∧ (3 = 3) ∧ (5 + 3 = 5 + 3)",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "redox_conserves_electrons",
		name: "CHEMISTRY: in a redox reaction the electrons lost by oxidation equal the electrons gained by reduction — the half-reactions balance, so their signed sum is zero: (+3) + (−3) = 0. Oxidation and reduction are one conserved pair.",
		statement: "(3 : Int) + (-3) = 0",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "ionic_compound_is_neutral",
		name: "CHEMISTRY: an ionic compound is electrically neutral — the cation charge and the anion charges sum to zero. For MgCl₂ the Mg²⁺ (+2) balances two Cl⁻ (−1 each): (+2) + 2·(−1) = 0. Cation and anion are a charge-complementary pair.",
		statement: "(2 : Int) + 2 * (-1) = 0",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "agonist_antagonist_cancels",
		name: "MEDICINE (pharmacology): a competitive antagonist cancels an agonist's net effect at the receptor — the paired action sums to the baseline: (+4) + (−4) = 0. Agonist and antagonist are the same complement the other fields carry.",
		statement: "(4 : Int) + (-4) = 0",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "homeostasis_returns_to_setpoint",
		name: "MEDICINE (physiology): homeostasis is complement in time — a deviation of +d from the set point is met by a correction of −d, returning exactly to the set point: (37 + 2) − 2 = 37. Perturbation and response are a pair that closes.",
		statement: "(37 + 2) - 2 = 37",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "action_reaction_and_charge_cancel",
		name: "PHYSICS: Newton's third law and charge conservation are the same cancelling pair — the reaction is minus the action, F + (−F) = 0 (here (+5)+(−5)), and an electron and positron sum to zero charge, (−1)+(+1) = 0. The pair sums to nothing.",
		statement: "((5 : Int) + (-5) = 0) ∧ ((-1 : Int) + 1 = 0)",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "pairs_share_one_centre",
		name: "THE HARMONY: every pair above is reflection through a centre n (c ↦ n−c), self-inverse for EVERY centre — so the four bases (n=3), electric charge (n=0) and pH (n=14) are the SAME involution at different centres. One structure, four sciences; this is what \"harmonise the pairs\" means, proven.",
		statement: "[0,3,14].all (fun n => (List.range (n+1)).all (fun x => n - (n - x) == x))",
		tactic: "decide",
		file: "Harmony.lean",
		principle: "The harmony of pairs"
	},
	{
		key: "handshake_degree_sum_even",
		name: "The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.",
		statement: "List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "edges_are_half_the_degree_sum",
		name: "Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.",
		statement: "2 * 5 = 10",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "introductions_among_five",
		name: "How many connections are possible among n people: each of the n meets the other n−1, and each meeting is shared, so n(n−1)/2. Among five people that is 5·4/2 = 10 possible introductions.",
		statement: "5 * 4 / 2 = 10",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "perfect_matching_needs_even",
		name: "A perfect matching pairs everyone with exactly one partner, so it needs an EVEN number of people — six pair cleanly (6 % 2 = 0), five cannot (5 % 2 = 1); one is always left unmatched. The parity decides it.",
		statement: "6 % 2 = 0 ∧ 5 % 2 = 1",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "n_people_make_n_half_pairs",
		name: "When the count is even, a perfect matching splits it in half: eight people make exactly four pairs (8 = 2·4). The pairing is a partition into twos.",
		statement: "8 = 2 * 4",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "proposals_bounded_by_n_squared",
		name: "The honest ceiling: the Gale–Shapley stable-matching process halts, in AT MOST n² proposals — for four people, at most 16. It is BOUNDED, not free; the same \"no maximum, only bounds\" the security layer proves — connecting people has a cost, and the cost is finite and known.",
		statement: "4 * 4 = 16",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "pairing_is_fixedpoint_free_involution",
		name: "A pairing p = [1,0,3,2] is a fixed-point-free involution: applied twice it returns everyone to themselves (p(p(x)) = x — the match is MUTUAL) and no one is paired with themselves (p(x) ≠ x — a match needs an other). Both halves proven for all four.",
		statement: "(let p := [1,0,3,2]; (List.range 4).all (fun x => p.getD (p.getD x 0) 0 == x && p.getD x 0 != x)) = true",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "mutual_match_is_symmetric",
		name: "A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.",
		statement: "(let m := [[0,1,0],[1,0,1],[0,1,0]]; (List.range 3).all (fun a => (List.range 3).all (fun b => (m.getD a []).getD b 0 == (m.getD b []).getD a 0))) = true",
		tactic: "decide",
		file: "Matching.lean",
		principle: "The matching"
	},
	{
		key: "modus_ponens",
		name: "Modus ponens, proven for every assignment: from p and (p → q), q follows — !(p ∧ (p → q)) ∨ q holds on all four rows. The first rule of every valid argument.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => !(p && (!p || q)) || q))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "modus_tollens",
		name: "Modus tollens: from ¬q and (p → q), ¬p follows — !(¬q ∧ (p → q)) ∨ ¬p holds on every row. Deny the consequent, deny the antecedent.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => !((!q) && (!p || q)) || !p))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "contrapositive",
		name: "The contrapositive is equivalent to the implication: (p → q) = (¬q → ¬p) for all p, q — an argument and its contrapositive stand or fall together.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => (!p || q) == (!(!q) || !p)))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "de_morgan_and",
		name: "De Morgan for conjunction: ¬(p ∧ q) = (¬p ∨ ¬q) on every row — the negation of an 'and' is the 'or' of the negations.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => (!(p && q)) == (!p || !q)))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "de_morgan_or",
		name: "De Morgan for disjunction: ¬(p ∨ q) = (¬p ∧ ¬q) on every row — the negation of an 'or' is the 'and' of the negations.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => (!(p || q)) == (!p && !q)))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "double_negation",
		name: "Double negation: ¬¬p = p for both truth values — classical logic returns to where it started.",
		statement: "([true, false].all (fun p => (!(!p)) == p)) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "excluded_middle",
		name: "The law of the excluded middle: p ∨ ¬p is true for every p — a proposition or its negation, no third option, in classical logic.",
		statement: "([true, false].all (fun p => p || !p)) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "hypothetical_syllogism",
		name: "The hypothetical syllogism (chaining): from (p → q) and (q → r), (p → r) follows — proven on all eight rows of three variables. How a chain of reasoning links.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => [true, false].all (fun r => !((!p || q) && (!q || r)) || (!p || r))))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "disjunctive_syllogism",
		name: "The disjunctive syllogism: from (p ∨ q) and ¬p, q follows — !((p ∨ q) ∧ ¬p) ∨ q holds on every row. Rule out one disjunct, keep the other.",
		statement: "([true, false].all (fun p => [true, false].all (fun q => !((p || q) && !p) || q))) = true",
		tactic: "decide",
		file: "Reasoning.lean",
		principle: "The rules of inference"
	},
	{
		key: "defence_layers_add_bits",
		name: "Defence in depth adds bits: fuse a 64-bit tamper-evidence layer with a 64-bit forge-resistance layer and a forgery must defeat both — 64 + 64 = 128 bits of work. Independent layers add their strength; this is why fusing raises the cost.",
		statement: "64 + 64 = 128",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "two_layers_multiply_space",
		name: "Adding bits multiplies the search space: two independent 8-bit layers make a 16-bit space — 2^8 · 2^8 = 2^16 (256 · 256 = 65536). Fusing is multiplicative in the space, additive in the bits.",
		statement: "2^8 * 2^8 = 2^16",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "each_key_bit_doubles",
		name: "Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length, not a maximum.",
		statement: "2^11 = 2 * 2^10",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "birthday_halves_the_exponent",
		name: "The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.",
		statement: "2 * 64 = 128",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "verify_cheaper_than_forge",
		name: "The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.",
		statement: "16 < 2^16",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "no_maximum_only_bounds",
		name: "There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why \"max tampering cost\" is refused — the honest claim is a bound, always exceedable.",
		statement: "2^8 < 2^9",
		tactic: "decide",
		file: "Security.lean",
		principle: "The layered defence"
	},
	{
		key: "reverse_involutive",
		name: "Reversing a clip is self-inverse: reverse it twice and the signal returns — ([3,-5,8] : List Int).reverse.reverse = [3,-5,8]. The tape run backward and backward again is the tape.",
		statement: "([3, -5, 8] : List Int).reverse.reverse = [3, -5, 8]",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "phase_inversion_involutive",
		name: "Phase inversion is self-inverse: flip polarity (x ↦ −x) twice and the signal returns — (([3,-5,8] : List Int).map (−·)).map (−·) = [3,-5,8]. The polarity button, pressed twice, is off.",
		statement: "(([3, -5, 8] : List Int).map (fun x => -x)).map (fun x => -x) = [3, -5, 8]",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "reverse_inverse_fused_involutive",
		name: "THE FUSION, the ultimate test: reverse-then-invert is ITSELF an involution — apply the fused operation twice and the signal returns, ((([3,-5,8] : List Int).reverse.map (−·)).reverse.map (−·)) = [3,-5,8]. Reverse and inverse compose to a clean self-inverse; the two studio mirrors fuse to one.",
		statement: "((([3, -5, 8] : List Int).reverse.map (fun x => -x)).reverse.map (fun x => -x)) = [3, -5, 8]",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "chromatic_is_z12",
		name: "The chromatic scale is the ring ℤ/12: twelve semitones, and the twelfth is the octave that wraps to the root — (List.range 12).length = 12 ∧ 12 % 12 = 0. Pitch counts in a ring, as the week does in ℤ/7.",
		statement: "(List.range 12).length = 12 ∧ 12 % 12 = 0",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "octave_doubles_frequency",
		name: "An octave doubles frequency: A4 at 440 Hz is A5 at 880 — 440 · 2 = 880. The one interval every tuning agrees on.",
		statement: "440 * 2 = 880",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "tempo_ms_per_beat",
		name: "At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.",
		statement: "60000 / 120 = 500 ∧ 4 * 500 = 2000",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "nyquist_half_samplerate",
		name: "Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.",
		statement: "44100 / 2 = 22050",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "midi_is_seven_bit",
		name: "MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 < 128. Why note 128 does not exist and velocity tops out at 127.",
		statement: "2^7 = 128 ∧ 127 < 128",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "sixteen_bit_dynamic_range",
		name: "The rule of thumb: ~6 dB of dynamic range per bit, so 16-bit is ≈96 dB — 6 · 16 = 96. An approximation (the exact figure is ~6.02 dB/bit), the number an engineer reaches for.",
		statement: "6 * 16 = 96",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "fifth_cycles_all_twelve",
		name: "The circle of fifths is ONE cycle: stepping by a perfect fifth (7 semitones) mod 12 visits all twelve tones, because 7 is coprime to 12 — every n in 0..11 appears in [(k·7) mod 12]. The pentagram {5/2} idea, heard in sound.",
		statement: "(List.range 12).all (fun n => ((List.range 12).map (fun k => (k * 7) % 12)).contains n)",
		tactic: "decide",
		file: "Production.lean",
		principle: "The mix"
	},
	{
		key: "vortex_one_leap",
		name: "one by-decide from division-by-zero=the reflection: the doubling orbit, the involution {0,5}, ℤ/9 arithmetic, AGL(1,ℤ/9)=54 with commutator=the unit shift, and the equilibriums — the whole vortex at once",
		statement: "-- follow the sequence: the doubling orbit on the units (List.range 6).map (fun k => (2 ^ k) % 9) = [1, 2, 4, 8, 7, 5] -- division by zero = the reflection: a self-inverse with fixed points {0, 5}, always a finite residue < 10 ∧ (List.range 10).all (fun x => dz (dz x) == x) ∧ ((List.range 10).filter (fun x => dz x == x)) = [0, 5] ∧ (List.range 10).all (fun x => dz x < 10) -- the ℤ/9 arithmetic: inverse pairs, nilpotents, and 3 with no inverse ∧ (2*5)%9 = 1 ∧ (4*7)%9 = 1 ∧ (8*8)%9 = 1 ∧ (3*3)%9 = 0 ∧ (6*6)%9 = 0 ∧ (List.range 9).all (fun x => (3*x)%9 != 1) -- the group: AGL(1,ℤ/9) has order 54, and the commutator [σ,μ] is the unit shift x ↦ x+1 ∧ ((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e%9 == 1))).length * 9 = 54 ∧ (List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x+1)%9) -- the equilibriums: the reflection 10-pairs, and the doubling digit-sum ∧ (List.range' 1 9).all (fun d => d + (10 - d) == 10) ∧ (1 + 2 + 4 + 8 + 7 + 5 = 27)",
		tactic: "decide",
		file: "OneLeap.lean",
		principle: "One leap"
	}
];
//#endregion
//#region dist/theorems/index.js
var SKILL_RULES = [
	[/dna_bases_reflect_through_three|chargaff|redox_conserves|ionic_compound|agonist_antagonist|homeostasis_returns|action_reaction_and_charge|pairs_share_one_centre/, "science-pairs"],
	[/involut/, "involution"],
	[/^z9|(^|_)mul9|mod9|_sq_zero|_self_inv|_no_inverse|_mul_(two|three|four|five|six|seven|eight|nine)/, "z9-ring"],
	[/^z7/, "z7-rosette"],
	[/pentag|(^|_)fib(_|onacci)|pisano/, "pentagram"],
	[/chessboard|knight|rook|bishop|queen|_tour/, "chess"],
	[/hamming|codeword|repetition|singleton_bound|checksum|_corrects_|_detects_/, "codes"],
	[/twelfths|tide|flood|semidiurnal|spring_exceeds|neap/, "tides"],
	[/isbn|issn|bookland/, "identifiers"],
	[/gregorian|doomsday|leap_years?_|_shifts_|century_leap|months_sum|week_is_z7/, "calendar"],
	[/folio|quarto|octavo|signature_multiple|page_diagonal|readable_measure|leading_exceeds|ream_|recto_odd|seventytwo_points/, "typesetting"],
	[/frame_index|frames_per|dropframe|uhd_is_four|widescreen|rule_of_thirds|crossfade|audio_samples_per_frame|angle_of_the_cut/, "editing"],
	[/chromatic_is_z12|octave_doubles|tempo_ms_per_beat|nyquist|midi_is_seven|sixteen_bit_dynamic|fifth_cycles/, "music-production"],
	[/defence_layers|two_layers_multiply|each_key_bit|birthday_halves|verify_cheaper_than_forge|no_maximum_only_bounds/, "security"],
	[/modus_ponens|modus_tollens|contrapositive|de_morgan|double_negation|excluded_middle|hypothetical_syllogism|disjunctive_syllogism/, "reasoning"],
	[/full_stop_is_exact|shutter_125_rounds|shutter_60_rounds|fstop_14_rounds|fstop_squared_is_exact|iso_full_stops|equivalent_exposure|stops_fold_mod_nine/, "photography"],
	[/handshake_degree_sum|edges_are_half|introductions_among|perfect_matching_needs|n_people_make_n_half|proposals_bounded|pairing_is_fixedpoint|mutual_match_is_symmetric/, "matching"],
	[/wave_product_is_constant|light_speed_rounds|seven_bands_in_order|photon_energy_rises|visible_under_one_octave|octave_of_light|inverse_at_fixed_c|visible_seven_colours/, "spectrum"],
	[/twelve_hue_wheel|complementary_hues|primaries_and_secondaries|triadic_harmony|square_harmony|true_colour_is|tint_and_shade|warm_cool_split/, "colour"],
	[/^clay_/, "clay-reflection"],
	[/(^|_)(dz|reflection|mirror|diamond|complement|division_by_zero|div_by_zero)/, "reflection"],
	[/bell|ghz|born|no_signaling|superposition|truth_table|pauli|(^|_)cnot|(^|_)cz|swap|toffoli|ccz|s_squared|s_dagger|s_fourth|hadamard|quantum/, "quantum"],
	[/salt|(^|_)seq/, "crypt-salt"],
	[/abo|blood|dna|codon|sound|octave|electron|subshell|circle_of_fifths|tritone|(^|_)ph_|punnett|heterozygote|colou?r|primary_secondary|mendel/, "science-pairs"],
	[/unit|orbit|doubling|vortex|agl|commutator|nilpotent|idempotent|lagrange|coprime|light|gravity|root|strip|neighbour|polarit/, "vortex"]
];
/** The SKILL a theorem demonstrates, derived from its key — the capability axis, recomputable by anyone from the name. */
function skillOf(key) {
	const k = key.toLowerCase();
	for (const [re, s] of SKILL_RULES) if (re.test(k)) return s;
	return "foundational";
}
var withDerived = (t) => ({
	...t,
	lean: `theorem ${t.key} : ${t.statement} := by ${t.tactic}`,
	address: toUuid(t.key + ":" + t.statement),
	skill: skillOf(t.key)
});
/** Every Lean-proven theorem, in computing-principle order. */
var THEOREMS = LEAN_LEDGER.map(withDerived);
[...new Set(THEOREMS.map((t) => t.skill))];
/** The ledger, by reference — each theorem's key, name, statement, Lean proof, principle, skill, source file and
*  address. Pass `{ skill }` to filter to one skill (the capability axis). */
function theorems(opts = {}) {
	return (opts.skill ? THEOREMS.filter((t) => t.skill === opts.skill) : THEOREMS).map((t) => ({
		key: t.key,
		name: t.name,
		statement: t.statement,
		tactic: t.tactic,
		file: t.file,
		principle: t.principle,
		skill: t.skill,
		lean: t.lean,
		address: t.address
	}));
}
//#endregion
//#region dist/slimgate.js
var SEALED = new Map(THEOREMS.map((t) => [t.key, t.address]));
/** slimGate(claim) → the theorem-only verdict. No lexicon: SEALED iff it cites a real sealed theorem and no fake one;
*  REFUTED iff it cites a theorem that is not in the ledger (a fabricated citation — the one thing that is decidably
*  false); UNVERIFIED iff it cites none. Recomputable from the sealed ledger alone. */
function slimGate(claim) {
	const keys = /* @__PURE__ */ new Set();
	for (const m of claim.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) keys.add(m[1]);
	for (const m of claim.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,})/gi)) if (/[_0-9]/.test(m[1])) keys.add(m[1]);
	const cited = [...keys];
	const real = cited.filter((k) => SEALED.has(k));
	const fabricated = cited.filter((k) => !SEALED.has(k));
	const verdict = fabricated.length > 0 ? "REFUTED" : real.length > 0 ? "SEALED" : "UNVERIFIED";
	return {
		claim,
		cited,
		real,
		fabricated,
		verdict,
		receipt: merkleFold([...real.map((k) => SEALED.get(k)), toUuid("slim:" + verdict)]),
		honest: "No lexicon: the verdict is decided only by whether the cited theorems are sealed in the ledger. A fabricated citation is the one decidably-FALSE case (REFUTED/debunked); a real citation is SEALED; no citation is UNVERIFIED (held open, not refused — absence of proof is not proof of falsity). Delete every word-list and this gate still stands, because it stands on the theorems. Integrity, not truth."
	};
}
//#endregion
//#region dist/gate.js
/** The binary. 1 = stays (revealed), 0 = drained. A claim is drained ONLY when it cites a theorem that is NOT
*  sealed in the ledger — a fabricated citation, the one decidably-false case. No lexicon, no negation guessing:
*  the verdict folds from the sealed set alone, recomputable by anyone. `hit` is the fabricated key, or null. */
var computes = (text) => {
	const s = slimGate(text);
	return s.verdict === "REFUTED" ? {
		binary: 0,
		hit: s.fabricated[0] ?? null
	} : {
		binary: 1,
		hit: null
	};
};
//#endregion
//#region dist/billing.js
/** The two coins — the conserved fair-exchange invariant. */
function coins() {
	return 2;
}
/** Bill uuidna usage on the measured ADVANTAGE — the difference of computational power between producing (O(N)
*  recompute) and verifying (O(1)). Public interest is free; commercial pays the two conserved coins on that
*  advantage. The whole bill folds to a `receipt` (a content-address of every term), so a SKEPTIC recomputes the
*  bill themselves and lands on the same receipt — the price is not trusted, it is rechecked. Same terms → same
*  bill → same receipt, for anyone. */
function billUuidna(u) {
	const diff = u.recomputeOps - u.verifyOps;
	const advantage = diff < 0 ? 0 : diff;
	const commercial = u.commercial;
	const coinsDue = commercial ? coins() : 0;
	const bitsSaved = commercial ? advantage : 0;
	const receipt = toUuid(`bill|commercial=${commercial}|advantage=${advantage}|bitsSaved=${bitsSaved}|coins=${coinsDue}`);
	return {
		advantage,
		bitsSaved,
		coins: coinsDue,
		free: !commercial,
		receipt,
		basis: commercial ? "the two coins (conserved invariant, −χ of the double torus) priced on the measured ADVANTAGE — recompute O(N) minus verify O(1); the whole bill folds to this receipt, complete and recomputable by anyone who doubts it" : "public interest / non-commercial — free (0 coins); the bill is still complete in this receipt, the advantage measured for anyone to recheck"
	};
}
//#endregion
//#region dist/books.js
var splitChapters = (text) => {
	const parts = text.split(/\n(?=[ \t]*(?:chapter|book|part|canto|letter|act|scene)[ \t]+[ivxlcdm\d])/i);
	return parts.length ? parts : [text];
};
/** auditText(text[, meta]) → the pure, offline audit. Deterministic and recomputable by anyone with the same text. */
function auditText(text, meta = {}) {
	const chapters = splitChapters(text);
	const words = text.trim() ? text.trim().split(/\s+/).length : 0;
	const lines = text.split("\n").length;
	const sample = text.slice(0, 200);
	const imprintRoundTrips = readImprintTextChain(imprintTextChain(sample)) === sample;
	return {
		...meta,
		address: toUuid(text),
		chapters: chapters.length,
		chapterRoot: merkleRoot(chapters.map((c) => toUuid(c))),
		chars: text.length,
		words,
		lines,
		gravity: digitalRoot(text.length),
		imprintRoundTrips,
		gate: computes(text),
		honest: "address proves exact-copy; chapterRoot proves any chapter belongs; gravity is a ℤ/9 checksum of the length, not a meaning. \"Decode\" is provenance + structure, never decryption or hidden meaning. The gate is tuned to uuidna's own overclaim vocabulary, so passing says nothing about the book — only that its prose does not trip it."
	};
}
//#endregion
//#region dist/cycles.js
/** The greatest common divisor of |a| and |b| (Euclid) — plain integer arithmetic, no host math library. */
function gcdInt(a, b) {
	a = a < 0 ? -a : a;
	b = b < 0 ? -b : b;
	while (b) {
		const t = a % b;
		a = b;
		b = t;
	}
	return a;
}
/** The star polygon {n/step}: the stroke visiting (step·k mod n) for k = 0..n−1. A SINGLE closed stroke covering all
*  n points iff gcd(step,n)=1 (else it splits into gcd(step,n) shorter loops). Default {5/2} is the pentagram. */
function starPolygon(n, step) {
	if (n < 1) throw new Error("cycles: n must be ≥ 1");
	const stroke = Array.from({ length: n }, (_, k) => (step * k % n + n) % n);
	const g = gcdInt((step % n + n) % n, n) || n;
	return {
		n,
		step,
		stroke,
		single: g === 1,
		loops: g
	};
}
//#endregion
//#region dist/cost.js
var THERMODYNAMICS = {
	landauerJoulePerBitAt300K: 287e-23,
	note: "The heartbeat and the formal byte are machine-independent — the same on any device — so they are NOT the energy cost. The real cost is thermodynamic and device-dependent, bounded below by Landauer: erasing one bit costs at least kT·ln2 (≈ 2.87e-21 J at 300 K), paid as heat by the device; a real chip pays far more. uuidna measures the abstract, reproducible work; the physics of the device pays the joules. No computation is free."
};
/** recomputableCost() → the ledger's cost, computed from itself. Deterministic: same lean/*.lean → same numbers. */
function recomputableCost() {
	const T = theorems();
	const count = T.length;
	const costs = T.map((t) => ({
		key: t.key,
		bytes: t.lean.length
	}));
	const formalBytes = costs.reduce((s, c) => s + c.bytes, 0);
	const largest = costs.reduce((m, c) => c.bytes > m.bytes ? c : m, costs[0] || {
		key: "",
		bytes: 0
	});
	const smallest = costs.reduce((m, c) => c.bytes < m.bytes ? c : m, costs[0] || {
		key: "",
		bytes: 0
	});
	return {
		count,
		formalBytes,
		bytesPerTheorem: count ? formalBytes / count : 0,
		verifyOps: count,
		produceOverVerify: count ? formalBytes / count : 0,
		largest: {
			key: largest.key,
			bytes: largest.bytes
		},
		smallest: {
			key: smallest.key,
			bytes: smallest.bytes
		},
		receipt: merkleFold(costs.map((c) => toUuid(c.key + ":" + c.bytes))),
		thermodynamics: THERMODYNAMICS
	};
}
//#endregion
//#region .vitepress/theme/SiteFooter.vue
var GH = "https://github.com/uuidna/uuidna";
var LICENSE_LINE = "CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at uuidna.com/license.";
var _sfc_main$10 = {
	__name: "SiteFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const href = (h) => h.startsWith("/") ? withBase(h) : h;
		const licenseUuid = toUuid(LICENSE_LINE);
		const cols = [
			{
				title: "The ledger",
				links: [
					{
						text: "All theorems",
						href: "/theorems"
					},
					{
						text: "Topics (by skill)",
						href: "/topics"
					},
					{
						text: "Search",
						href: "/search"
					},
					{
						text: "The trials",
						href: "/trials"
					},
					{
						text: "Games",
						href: "/games"
					}
				]
			},
			{
				title: "Fuse it in",
				links: [
					{
						text: "MCP tools",
						href: "/mcp"
					},
					{
						text: "Chat",
						href: "/chat"
					},
					{
						text: "Books",
						href: "/books"
					},
					{
						text: "Guides",
						href: "/guides"
					},
					{
						text: "npm · @uuidna/uuidna",
						href: "https://www.npmjs.com/package/@uuidna/uuidna"
					},
					{
						text: "GitHub repository",
						href: GH
					}
				]
			},
			{
				title: "The captain",
				links: [{
					text: "The captain's message",
					href: "/captain/message"
				}, {
					text: "The Navigator",
					href: "/captain/navigator"
				}]
			},
			{
				title: "Verify it yourself",
				links: [
					{
						text: "The tests",
						href: "/tests"
					},
					{
						text: "Deploy",
						href: "/deploy"
					},
					{
						text: "Lean proofs · lean/",
						href: "https://github.com/uuidna/uuidna/tree/main/lean"
					},
					{
						text: "PRINCIPLE.md",
						href: "https://github.com/uuidna/uuidna/blob/main/lean/PRINCIPLE.md"
					},
					{
						text: "npm run lean (recompute)",
						href: "https://github.com/uuidna/uuidna#verify"
					}
				]
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "site-footer" }, _attrs))} data-v-503fe9fe><div class="sf-cols" data-v-503fe9fe><!--[-->`);
			ssrRenderList(cols, (c) => {
				_push(`<section class="sf-col" data-v-503fe9fe><h3 data-v-503fe9fe>${ssrInterpolate(c.title)}</h3><ul data-v-503fe9fe><!--[-->`);
				ssrRenderList(c.links, (l) => {
					_push(`<li data-v-503fe9fe><a${ssrRenderAttr("href", href(l.href))} data-v-503fe9fe>${ssrInterpolate(l.text)}</a></li>`);
				});
				_push(`<!--]--></ul></section>`);
			});
			_push(`<!--]--></div><div class="sf-base" data-v-503fe9fe><span data-v-503fe9fe><a${ssrRenderAttr("href", href("/license"))} data-v-503fe9fe>License <strong data-v-503fe9fe>CC BY-NC-ND 4.0</strong></a> · <a${ssrRenderAttr("href", href("/privacy"))} data-v-503fe9fe>Privacy</a> · <a${ssrRenderAttr("href", href("/justice"))} data-v-503fe9fe>Justice</a> · <code class="sf-uuid" data-v-503fe9fe>${ssrInterpolate(unref(licenseUuid))}</code> — Tsvetan Rouschev.</span><span data-v-503fe9fe>A theorem computes in Lean, or it is not a theorem. <em data-v-503fe9fe>Integrity, not truth.</em></span></div></footer>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/SiteFooter.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var SiteFooter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$10, [["__scopeId", "data-v-503fe9fe"]]);
//#endregion
//#region .vitepress/theme/HomeGraph.vue
var TOP = 8;
var _sfc_main$9 = {
	__name: "HomeGraph",
	__ssrInlineRender: true,
	props: {
		groups: Array,
		skills: Array
	},
	setup(__props) {
		const props = __props;
		const slugOf = (file) => file ? file.replace(/\.lean$/i, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : null;
		const domains = computed(() => (props.groups || []).map((g) => ({
			name: g.name,
			count: g.count,
			blurb: g.blurb,
			fold: g.fold,
			slug: slugOf(g.theorems?.[0]?.file),
			top: (g.theorems || []).slice(0, TOP),
			more: Math.max(0, (g.count || 0) - TOP)
		})).sort((a, b) => b.count - a.count));
		const categories = computed(() => (props.skills || []).map((s) => ({
			skill: s.skill,
			count: s.count,
			fold: s.fold
		})).sort((a, b) => b.count - a.count));
		const hueOf = (addr) => parseInt((addr || "0").replace(/[^0-9a-f]/gi, "").slice(0, 2) || "0", 16) * 40 % 360;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "hg" }, _attrs))} data-v-fc597470><div class="hg-hero" role="list" aria-label="All domains" data-v-fc597470><!--[-->`);
			ssrRenderList(domains.value, (d) => {
				_push(`<a class="hg-hero-chip" role="listitem"${ssrRenderAttr("href", d.slug ? unref(withBase)("/publications/" + d.slug) : unref(withBase)("/theorems"))} style="${ssrRenderStyle({ "--h": hueOf(d.fold) })}" data-v-fc597470><span class="hg-hero-n" data-v-fc597470>${ssrInterpolate(d.count)}</span><span class="hg-hero-t" data-v-fc597470>${ssrInterpolate(d.name.replace(/^The /, ""))}</span></a>`);
			});
			_push(`<!--]--></div><h2 class="hg-h" data-v-fc597470>Domains <small data-v-fc597470>— ${ssrInterpolate(domains.value.length)} principles, each a monograph over its proofs</small></h2><p class="hg-sub" data-v-fc597470>Every card is a domain. Slide it to read its theorems; open its monograph to read the audited note that folds them.</p><!--[-->`);
			ssrRenderList(domains.value, (d) => {
				_push(`<section class="hg-card" style="${ssrRenderStyle({ "--h": hueOf(d.fold) })}" data-v-fc597470><header class="hg-card-head" data-v-fc597470><h3 data-v-fc597470>`);
				if (d.slug) _push(`<a${ssrRenderAttr("href", unref(withBase)("/publications/" + d.slug))} data-v-fc597470>${ssrInterpolate(d.name)}</a>`);
				else _push(`<span data-v-fc597470>${ssrInterpolate(d.name)}</span>`);
				_push(`<span class="hg-badge" data-v-fc597470>${ssrInterpolate(d.count)}</span></h3>`);
				if (d.slug) _push(`<a class="hg-mono"${ssrRenderAttr("href", unref(withBase)("/publications/" + d.slug))} data-v-fc597470>monograph →</a>`);
				else _push(`<!---->`);
				_push(`</header><p class="hg-blurb" data-v-fc597470>${ssrInterpolate(d.blurb)}</p><div class="hg-slider" role="list"${ssrRenderAttr("aria-label", d.name + " theorems")} data-v-fc597470><!--[-->`);
				ssrRenderList(d.top, (t) => {
					_push(`<a class="hg-item" role="listitem"${ssrRenderAttr("href", unref(withBase)("/theorem/" + t.key))} data-v-fc597470><span class="hg-item-t" data-v-fc597470>${ssrInterpolate(t.name.split("—")[0].split(":")[0].trim())}</span><code class="hg-item-s" data-v-fc597470>${ssrInterpolate(t.statement)}</code></a>`);
				});
				_push(`<!--]-->`);
				if (d.more && d.slug) _push(`<a class="hg-more"${ssrRenderAttr("href", unref(withBase)("/publications/" + d.slug))} data-v-fc597470>+${ssrInterpolate(d.more)} more<br data-v-fc597470>in the monograph →</a>`);
				else _push(`<!---->`);
				_push(`</div><p class="hg-fold" data-v-fc597470>layer fold <code data-v-fc597470>${ssrInterpolate(d.fold)}</code></p></section>`);
			});
			_push(`<!--]--><h2 class="hg-h" data-v-fc597470>Categories <small data-v-fc597470>— ${ssrInterpolate(categories.value.length)} skills, the capability axis</small></h2><p class="hg-sub" data-v-fc597470>The orthogonal cut: what a theorem <em data-v-fc597470>demonstrates</em>, across domains. Open <a${ssrRenderAttr("href", unref(withBase)("/topics"))} data-v-fc597470>Topics</a> for the full grouping.</p><div class="hg-hero" role="list" aria-label="All categories" data-v-fc597470><!--[-->`);
			ssrRenderList(categories.value, (c) => {
				_push(`<a class="hg-hero-chip" role="listitem"${ssrRenderAttr("href", unref(withBase)("/topics"))} style="${ssrRenderStyle({ "--h": hueOf(c.fold) })}" data-v-fc597470><span class="hg-hero-n" data-v-fc597470>${ssrInterpolate(c.count)}</span><span class="hg-hero-t" data-v-fc597470>${ssrInterpolate(c.skill)}</span></a>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/HomeGraph.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var HomeGraph_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$9, [["__scopeId", "data-v-fc597470"]]);
//#endregion
//#region .vitepress/theme/Reflect.vue
var _sfc_main$8 = {
	__name: "Reflect",
	__ssrInlineRender: true,
	setup(__props) {
		const input = ref("");
		const address = computed(() => input.value ? toUuid(input.value) : "—");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "reflect" }, _attrs))} data-v-5ecf79d2><p class="reflect-lead" data-v-5ecf79d2>Reflect your own content to its address — <strong data-v-5ecf79d2>in your browser</strong>. Nothing is sent, stored, or tracked.</p><input${ssrRenderAttr("value", input.value)} class="reflect-in" type="text" placeholder="type or paste anything — it stays on your device" aria-label="content to reflect" data-v-5ecf79d2><p class="reflect-out" data-v-5ecf79d2>reflects to <code data-v-5ecf79d2>${ssrInterpolate(address.value)}</code></p><p class="reflect-choose" data-v-5ecf79d2> or reflect a device datum you choose (read only when you click, never sent): <button data-v-5ecf79d2>screen size</button><button data-v-5ecf79d2>locale</button><button data-v-5ecf79d2>time zone</button></p><p class="reflect-note" data-v-5ecf79d2>The same input always mints the same address, for anyone — that is content-addressing: your chosen data reflects to itself, deterministically, and never leaves your device.</p></div>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/Reflect.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Reflect_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$8, [["__scopeId", "data-v-5ecf79d2"]]);
//#endregion
//#region .vitepress/theme/BookReflect.vue
var _sfc_main$7 = {
	__name: "BookReflect",
	__ssrInlineRender: true,
	setup(__props) {
		const text = ref("");
		const audit = computed(() => text.value ? auditText(text.value) : null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bookreflect" }, _attrs))} data-v-560ab13e><p class="br-lead" data-v-560ab13e>Write, and the audit reflects back — <strong data-v-560ab13e>in your browser</strong>. Nothing is sent, stored, or tracked.</p><textarea class="br-in" rows="6" placeholder="write or paste a chapter — it stays on your device

CHAPTER I
It was the best of lines…" aria-label="text to audit" data-v-560ab13e>${ssrInterpolate(text.value)}</textarea>`);
			if (audit.value) _push(`<div class="br-out" data-v-560ab13e><div class="br-row" data-v-560ab13e><span data-v-560ab13e>fingerprint</span><code data-v-560ab13e>${ssrInterpolate(audit.value.address)}</code></div><div class="br-row" data-v-560ab13e><span data-v-560ab13e>chapter root</span><code data-v-560ab13e>${ssrInterpolate(audit.value.chapterRoot)}</code></div><div class="br-grid" data-v-560ab13e><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.chapters)}</b><span data-v-560ab13e>chapters</span></div><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.words)}</b><span data-v-560ab13e>words</span></div><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.lines)}</b><span data-v-560ab13e>lines</span></div><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.chars)}</b><span data-v-560ab13e>chars</span></div><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.gravity)}</b><span data-v-560ab13e>ℤ/9 gravity</span></div><div data-v-560ab13e><b data-v-560ab13e>${ssrInterpolate(audit.value.gate.binary === 1 ? "clean" : "hit")}</b><span data-v-560ab13e>gate${ssrInterpolate(audit.value.gate.hit ? " · " + audit.value.gate.hit : "")}</span></div></div></div>`);
			else _push(`<p class="br-out br-empty" data-v-560ab13e>— write something to reflect it —</p>`);
			_push(`<p class="br-note" data-v-560ab13e>Every keystroke re-addresses, so a change is never silent. The gate flags uuidna&#39;s own overclaim vocabulary, so a hit on ordinary prose is a visible false positive, not a verdict on your writing. Provenance and structure, recomputable — never a judgement of merit. Nothing leaves your device.</p></div>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/BookReflect.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var BookReflect_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$7, [["__scopeId", "data-v-560ab13e"]]);
//#endregion
//#region .vitepress/theme/SearchResults.vue
var _sfc_main$6 = {
	__name: "SearchResults",
	__ssrInlineRender: true,
	setup(__props) {
		const T = theorems();
		const q = ref("");
		const results = computed(() => {
			const s = q.value.trim().toLowerCase();
			if (!s) return [];
			return T.filter((t) => `${t.key} ${t.name} ${t.statement} ${t.principle} ${t.skill}`.toLowerCase().includes(s)).slice(0, 60);
		});
		const href = (key) => withBase(`/theorem/${key}`);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "search" }, _attrs))} data-v-db423305><input${ssrRenderAttr("value", q.value)} class="search-in" type="search" placeholder="search the sealed theorems — filtered in your browser" aria-label="search theorems" data-v-db423305>`);
			if (q.value.trim()) {
				_push(`<p class="search-count" data-v-db423305>${ssrInterpolate(results.value.length)}`);
				if (results.value.length === 60) _push(`<span data-v-db423305>+</span>`);
				else _push(`<!---->`);
				_push(` of ${ssrInterpolate(unref(T).length)} theorems match</p>`);
			} else _push(`<!---->`);
			_push(`<ul class="search-list" data-v-db423305><!--[-->`);
			ssrRenderList(results.value, (t) => {
				_push(`<li data-v-db423305><a${ssrRenderAttr("href", href(t.key))} data-v-db423305><code data-v-db423305>${ssrInterpolate(t.key)}</code> — ${ssrInterpolate(t.name)}</a><span class="search-meta" data-v-db423305>${ssrInterpolate(t.principle)} · ${ssrInterpolate(t.skill)}</span></li>`);
			});
			_push(`<!--]--></ul><p class="search-note" data-v-db423305>A static, client-side index of the ${ssrInterpolate(unref(T).length)} sealed theorems — it searches what was built, not a live engine. Nothing is sent or stored. For the full text of every page, use the search box in the top bar.</p></div>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/SearchResults.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var SearchResults_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$6, [["__scopeId", "data-v-db423305"]]);
//#endregion
//#region .vitepress/theme/BillCalc.vue
var _sfc_main$5 = {
	__name: "BillCalc",
	__ssrInlineRender: true,
	setup(__props) {
		const recompute = ref(64);
		const verify = ref(1);
		const commercial = ref(false);
		const bill = computed(() => billUuidna({
			commercial: commercial.value,
			recomputeOps: Number(recompute.value) || 0,
			verifyOps: Number(verify.value) || 0
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bill" }, _attrs))} data-v-be2bed41><div class="bill-row" data-v-be2bed41><label data-v-be2bed41>recompute cost <small data-v-be2bed41>O(N)</small></label><input${ssrRenderAttr("value", recompute.value)} type="number" min="0" data-v-be2bed41></div><div class="bill-row" data-v-be2bed41><label data-v-be2bed41>verify cost <small data-v-be2bed41>O(1)</small></label><input${ssrRenderAttr("value", verify.value)} type="number" min="0" data-v-be2bed41></div><div class="bill-row" data-v-be2bed41><label data-v-be2bed41>commercial use</label><input${ssrIncludeBooleanAttr(Array.isArray(commercial.value) ? ssrLooseContain(commercial.value, null) : commercial.value) ? " checked" : ""} type="checkbox" data-v-be2bed41></div><div class="bill-out" data-v-be2bed41><div data-v-be2bed41><b data-v-be2bed41>${ssrInterpolate(bill.value.bitsSaved)}</b><span data-v-be2bed41>bits saved</span></div><div data-v-be2bed41><b data-v-be2bed41>${ssrInterpolate(bill.value.coins)}</b><span data-v-be2bed41>coins</span></div><div data-v-be2bed41><b data-v-be2bed41>${ssrInterpolate(bill.value.free ? "free" : "measured")}</b><span data-v-be2bed41>${ssrInterpolate(bill.value.free ? "public interest" : "commercial")}</span></div></div><p class="bill-basis" data-v-be2bed41>${ssrInterpolate(bill.value.basis)}</p><p class="bill-note" data-v-be2bed41><strong data-v-be2bed41>Not financial trading.</strong> This measures computational work saved, not money — the two coins are the topology of the double torus (−χ of a genus-2 surface = 2), a conserved invariant, never a price or an investment. Computed in your browser; nothing is sent.</p></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/BillCalc.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var BillCalc_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$5, [["__scopeId", "data-v-be2bed41"]]);
//#endregion
//#region .vitepress/theme/StarPlay.vue
var R = 120;
var C = 150;
var _sfc_main$4 = {
	__name: "StarPlay",
	__ssrInlineRender: true,
	setup(__props) {
		const n = ref(5);
		const step = ref(2);
		const N = computed(() => Math.max(2, Math.min(24, Number(n.value) || 2)));
		const S = computed(() => Math.max(1, Math.min(N.value - 1, Number(step.value) || 1)));
		const poly = computed(() => starPolygon(N.value, S.value));
		const pointAt = (k) => {
			const a = (k * 360 / N.value - 90) * Math.PI / 180;
			return [C + R * Math.cos(a), C + R * Math.sin(a)];
		};
		const dots = computed(() => Array.from({ length: N.value }, (_, k) => pointAt(k)));
		const line = computed(() => {
			const order = poly.value.stroke;
			return order.map((k, i) => `${i ? "L" : "M"} ${pointAt(k)[0].toFixed(1)} ${pointAt(k)[1].toFixed(1)}`).join(" ") + ` L ${pointAt(order[0])[0].toFixed(1)} ${pointAt(order[0])[1].toFixed(1)}`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "star" }, _attrs))} data-v-ca3560b5><div class="star-ctrls" data-v-ca3560b5><label data-v-ca3560b5>points <input${ssrRenderAttr("value", n.value)} type="range" min="2" max="24" data-v-ca3560b5> <b data-v-ca3560b5>${ssrInterpolate(N.value)}</b></label><label data-v-ca3560b5>step <input${ssrRenderAttr("value", step.value)} type="range" min="1"${ssrRenderAttr("max", N.value - 1)} data-v-ca3560b5> <b data-v-ca3560b5>${ssrInterpolate(S.value)}</b></label></div><svg viewBox="0 0 300 300" class="star-svg" role="img"${ssrRenderAttr("aria-label", `star polygon ${N.value} over ${S.value}`)} data-v-ca3560b5><circle${ssrRenderAttr("cx", C)}${ssrRenderAttr("cy", C)}${ssrRenderAttr("r", R)} fill="none" stroke="var(--vp-c-divider)" stroke-width="1" data-v-ca3560b5></circle><path${ssrRenderAttr("d", line.value)} fill="none" stroke="var(--vp-c-brand-1)" stroke-width="2.5" stroke-linejoin="round" data-v-ca3560b5></path><!--[-->`);
			ssrRenderList(dots.value, (p, i) => {
				_push(`<circle${ssrRenderAttr("cx", p[0])}${ssrRenderAttr("cy", p[1])} r="4" fill="var(--vp-c-text-1)" data-v-ca3560b5></circle>`);
			});
			_push(`<!--]--></svg><p class="star-verdict" data-v-ca3560b5><code data-v-ca3560b5>${ssrInterpolate("{" + N.value + "/" + S.value + "}")}</code> — `);
			if (poly.value.single) _push(`<strong data-v-ca3560b5>one single stroke</strong>`);
			else _push(`<strong data-v-ca3560b5>${ssrInterpolate(poly.value.loops)} separate loops</strong>`);
			_push(` · gcd(${ssrInterpolate(S.value)},${ssrInterpolate(N.value)}) = ${ssrInterpolate(poly.value.single ? 1 : poly.value.loops)} · stroke [${ssrInterpolate(poly.value.stroke.join(", "))}] </p><p class="star-note" data-v-ca3560b5>A single stroke visits every point exactly when the step is coprime to the count — {5/2} is the pentagram, {12/7} is the circle of fifths. The same <code data-v-ca3560b5>starPolygon</code> the MCP tool runs; nothing sent.</p></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/StarPlay.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var StarPlay_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$4, [["__scopeId", "data-v-ca3560b5"]]);
//#endregion
//#region .vitepress/theme/Chess.vue
var _sfc_main$3 = {
	__name: "Chess",
	__ssrInlineRender: true,
	setup(__props) {
		const GLYPH = {
			wK: "♔",
			wQ: "♕",
			wR: "♖",
			wB: "♗",
			wN: "♘",
			wP: "♙",
			bK: "♚",
			bQ: "♛",
			bR: "♜",
			bB: "♝",
			bN: "♞",
			bP: "♟"
		};
		const startBoard = () => [
			[
				"bR",
				"bN",
				"bB",
				"bQ",
				"bK",
				"bB",
				"bN",
				"bR"
			],
			[
				"bP",
				"bP",
				"bP",
				"bP",
				"bP",
				"bP",
				"bP",
				"bP"
			],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			],
			[
				"wP",
				"wP",
				"wP",
				"wP",
				"wP",
				"wP",
				"wP",
				"wP"
			],
			[
				"wR",
				"wN",
				"wB",
				"wQ",
				"wK",
				"wB",
				"wN",
				"wR"
			]
		];
		const s = reactive({
			board: startBoard(),
			turn: "w",
			selected: null,
			legal: [],
			castling: {
				wK: true,
				wQ: true,
				bK: true,
				bQ: true
			},
			ep: null,
			status: "",
			promo: null,
			last: null,
			mode: "2p",
			depth: 2,
			thinking: false
		});
		const isLegal = (r, c) => s.legal.some((m) => m.r === r && m.c === c);
		const isSel = (r, c) => s.selected && s.selected[0] === r && s.selected[1] === c;
		const isLast = (r, c) => s.last && (s.last[0][0] === r && s.last[0][1] === c || s.last[1][0] === r && s.last[1][1] === c);
		const banner = computed(() => {
			const who = s.turn === "w" ? "White" : "Black";
			if (s.status === "checkmate") return `Checkmate — ${s.turn === "w" ? "Black" : "White"} wins`;
			if (s.status === "stalemate") return "Stalemate — draw";
			if (s.thinking) return `${who} (computer) thinking…`;
			if (s.status === "check") return `${who} to move — in check`;
			return `${who} to move`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "chess" }, _attrs))} data-v-8010ac36><div class="chess-bar" data-v-8010ac36><span class="${ssrRenderClass([{ over: s.status === "checkmate" || s.status === "stalemate" }, "chess-banner"])}" data-v-8010ac36>${ssrInterpolate(banner.value)}</span><button class="chess-reset" data-v-8010ac36>New game</button></div><div class="chess-modes" data-v-8010ac36><button class="${ssrRenderClass({ on: s.mode === "2p" })}" data-v-8010ac36>2 players</button><button class="${ssrRenderClass({ on: s.mode === "w" })}" data-v-8010ac36>vs computer</button><button class="${ssrRenderClass({ on: s.mode === "self" })}" data-v-8010ac36>self-play</button><label class="chess-waves" data-v-8010ac36>waves <select data-v-8010ac36><option${ssrRenderAttr("value", 1)} data-v-8010ac36${ssrIncludeBooleanAttr(Array.isArray(s.depth) ? ssrLooseContain(s.depth, 1) : ssrLooseEqual(s.depth, 1)) ? " selected" : ""}>1</option><option${ssrRenderAttr("value", 2)} data-v-8010ac36${ssrIncludeBooleanAttr(Array.isArray(s.depth) ? ssrLooseContain(s.depth, 2) : ssrLooseEqual(s.depth, 2)) ? " selected" : ""}>2</option><option${ssrRenderAttr("value", 3)} data-v-8010ac36${ssrIncludeBooleanAttr(Array.isArray(s.depth) ? ssrLooseContain(s.depth, 3) : ssrLooseEqual(s.depth, 3)) ? " selected" : ""}>3</option></select></label></div><div class="${ssrRenderClass([{ locked: !!s.promo }, "chess-board"])}" data-v-8010ac36><!--[-->`);
			ssrRenderList(s.board, (row, r) => {
				_push(`<!--[--><!--[-->`);
				ssrRenderList(row, (cell, c) => {
					_push(`<button class="${ssrRenderClass([{
						dark: (r + c) % 2 === 1,
						sel: isSel(r, c),
						last: isLast(r, c),
						legal: isLegal(r, c),
						cap: isLegal(r, c) && cell
					}, "sq"])}"${ssrRenderAttr("aria-label", "square " + "abcdefgh"[c] + (8 - r))} data-v-8010ac36>`);
					if (cell) _push(`<span class="${ssrRenderClass([cell[0] === "w" ? "w" : "b", "pc"])}" data-v-8010ac36>${ssrInterpolate(GLYPH[cell])}</span>`);
					else _push(`<!---->`);
					if (isLegal(r, c) && !cell) _push(`<span class="dot" data-v-8010ac36></span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--><!--]-->`);
			});
			_push(`<!--]--></div>`);
			if (s.promo) {
				_push(`<div class="chess-promo" data-v-8010ac36> promote to: <!--[-->`);
				ssrRenderList([
					"Q",
					"R",
					"B",
					"N"
				], (pc) => {
					_push(`<button data-v-8010ac36>${ssrInterpolate(GLYPH[s.turn + pc])}</button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<p class="chess-note" data-v-8010ac36>Complete offline chess — full legal moves, castling, en passant, promotion, check &amp; mate. Hot-seat two-player, played entirely in your browser (the PWA caches it, so it works offline). Nothing is sent.</p></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/Chess.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Chess_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$3, [["__scopeId", "data-v-8010ac36"]]);
//#endregion
//#region .vitepress/theme/MessageStream.vue
var _sfc_main$2 = {
	__name: "MessageStream",
	__ssrInlineRender: true,
	setup(__props) {
		const message = ref("the vortex speaks at 432 Hz");
		const passphrase = ref("gold-string-60");
		const layers = ref(1);
		const sealed = ref(null);
		const arrived = ref(null);
		const ok = ref(false);
		const busy = ref(false);
		const error = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "ms" }, _attrs))} data-v-d7f799bc><div class="ms-inputs" data-v-d7f799bc><label data-v-d7f799bc>message<input${ssrRenderAttr("value", message.value)} type="text" placeholder="anything — it stays on your device" data-v-d7f799bc></label><div class="ms-row" data-v-d7f799bc><label class="ms-pass" data-v-d7f799bc>passphrase<input${ssrRenderAttr("value", passphrase.value)} type="text" data-v-d7f799bc></label><label class="ms-layers" data-v-d7f799bc>layers <input${ssrRenderAttr("value", layers.value)} type="range" min="1" max="6" data-v-d7f799bc> <b data-v-d7f799bc>${ssrInterpolate(layers.value)}</b></label></div><button class="ms-go"${ssrIncludeBooleanAttr(busy.value) ? " disabled" : ""} data-v-d7f799bc>${ssrInterpolate(busy.value ? "sealing…" : "Seal & transmit →")}</button></div>`);
			if (error.value) _push(`<div class="ms-err" data-v-d7f799bc>${ssrInterpolate(error.value)}</div>`);
			else _push(`<!---->`);
			if (sealed.value) {
				_push(`<div class="ms-out" data-v-d7f799bc><p class="ms-meta" data-v-d7f799bc><b data-v-d7f799bc>${ssrInterpolate(sealed.value.layers)}</b> ChaCha20-Poly1305 layer`);
				if (sealed.value.layers > 1) _push(`<span data-v-d7f799bc>s</span>`);
				else _push(`<!---->`);
				_push(` · carried as <b data-v-d7f799bc>${ssrInterpolate(sealed.value.uuids.length)}</b> uuid`);
				if (sealed.value.uuids.length > 1) _push(`<span data-v-d7f799bc>s</span>`);
				else _push(`<!---->`);
				_push(` · receipt <code data-v-d7f799bc>${ssrInterpolate(sealed.value.receipt.slice(0, 8))}…</code></p><div class="ms-chain" data-v-d7f799bc><!--[-->`);
				ssrRenderList(sealed.value.uuids, (u, i) => {
					_push(`<!--[--><code class="ms-uuid" style="${ssrRenderStyle({ animationDelay: i * 90 + "ms" })}" data-v-d7f799bc>${ssrInterpolate(u.slice(0, 13))}…</code>`);
					if (i < sealed.value.uuids.length - 1) _push(`<span class="ms-link" style="${ssrRenderStyle({ animationDelay: i * 90 + 45 + "ms" })}" data-v-d7f799bc>→</span>`);
					else _push(`<!---->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--></div><p class="${ssrRenderClass([{ ok: ok.value }, "ms-arrive"])}" data-v-d7f799bc>arrives, decrypts to: <span data-v-d7f799bc>${ssrInterpolate(arrived.value)}</span> `);
				if (ok.value) _push(`<b data-v-d7f799bc>✓ round-trip</b>`);
				else _push(`<!---->`);
				_push(`</p></div>`);
			} else _push(`<!---->`);
			_push(`<p class="ms-note" data-v-d7f799bc>Real ChaCha20-Poly1305, sealed and opened <strong data-v-d7f799bc>in your browser</strong> — nothing sent. Secrecy is the passphrase (and the layers); the uuid stream itself is <em data-v-d7f799bc>public</em> transport and hides nothing — opening still needs the key. A wrong key or any tamper fails Poly1305 authentication.</p></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/MessageStream.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var MessageStream_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["__scopeId", "data-v-d7f799bc"]]);
//#endregion
//#region .vitepress/theme/TokenMeter.vue
var _sfc_main$1 = {
	__name: "TokenMeter",
	__ssrInlineRender: true,
	setup(__props) {
		const N = theorems().length;
		const input = ref(12e4);
		const output = ref(3e4);
		const cached = ref(8e5);
		const reasoning = ref(5e4);
		const num = (v) => Number(v) || 0;
		const total = computed(() => num(input.value) + num(output.value) + num(cached.value) + num(reasoning.value));
		const perTheorem = computed(() => N ? total.value / N : 0);
		const frac = (v) => total.value ? Math.round(num(v) / total.value * 100) : 0;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "tm" }, _attrs))} data-v-b829e779><div class="tm-inputs" data-v-b829e779><label data-v-b829e779>input <input${ssrRenderAttr("value", input.value)} type="number" min="0" data-v-b829e779></label><label data-v-b829e779>output <input${ssrRenderAttr("value", output.value)} type="number" min="0" data-v-b829e779></label><label data-v-b829e779>cached <input${ssrRenderAttr("value", cached.value)} type="number" min="0" data-v-b829e779></label><label data-v-b829e779>reasoning <input${ssrRenderAttr("value", reasoning.value)} type="number" min="0" data-v-b829e779></label></div><div class="tm-out" data-v-b829e779><div data-v-b829e779><b data-v-b829e779>${ssrInterpolate(total.value.toLocaleString())}</b><span data-v-b829e779>tokens</span></div><div data-v-b829e779><b data-v-b829e779>${ssrInterpolate(unref(N))}</b><span data-v-b829e779>theorems (live)</span></div><div class="tm-key" data-v-b829e779><b data-v-b829e779>${ssrInterpolate(perTheorem.value.toFixed(1))}</b><span data-v-b829e779>tokens / theorem</span></div></div><div class="tm-dist" data-v-b829e779> distribution — input ${ssrInterpolate(frac(input.value))}% · output ${ssrInterpolate(frac(output.value))}% · cached ${ssrInterpolate(frac(cached.value))}% · reasoning ${ssrInterpolate(frac(reasoning.value))}% </div><p class="tm-note" data-v-b829e779>The token counts are <strong data-v-b829e779>your self-report</strong> — this page cannot observe them. The divisor, the theorem count, is the recomputable truth read live from the ledger. Fold many reports over a session to watch the cost-per-theorem fall. Measured on independent skilled work, not money. Nothing is sent.</p></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/TokenMeter.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TokenMeter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-b829e779"]]);
//#endregion
//#region .vitepress/theme/CostMeter.vue
var _sfc_main = {
	__name: "CostMeter",
	__ssrInlineRender: true,
	setup(__props) {
		const c = recomputableCost();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "cm" }, _attrs))} data-v-9e0a1f5f><div class="cm-out" data-v-9e0a1f5f><div data-v-9e0a1f5f><b data-v-9e0a1f5f>${ssrInterpolate(unref(c).formalBytes.toLocaleString())}</b><span data-v-9e0a1f5f>formal bytes (Σ Lean text)</span></div><div class="cm-key" data-v-9e0a1f5f><b data-v-9e0a1f5f>${ssrInterpolate(unref(c).bytesPerTheorem.toFixed(1))}</b><span data-v-9e0a1f5f>bytes / theorem (recomputed)</span></div><div data-v-9e0a1f5f><b data-v-9e0a1f5f>${ssrInterpolate(unref(c).verifyOps)}</b><span data-v-9e0a1f5f>verify ops (O(1) each)</span></div></div><p class="cm-range" data-v-9e0a1f5f>costliest to state: <code data-v-9e0a1f5f>${ssrInterpolate(unref(c).largest.key)}</code> (${ssrInterpolate(unref(c).largest.bytes)}B) · cheapest: <code data-v-9e0a1f5f>${ssrInterpolate(unref(c).smallest.key)}</code> (${ssrInterpolate(unref(c).smallest.bytes)}B)</p><p class="cm-receipt" data-v-9e0a1f5f>cost receipt (fold, recompute it): <code data-v-9e0a1f5f>${ssrInterpolate(unref(c).receipt)}</code></p><p class="cm-note" data-v-9e0a1f5f>No self-report and no inputs — every number is computed from <code data-v-9e0a1f5f>lean/*.lean</code> itself and folds to that receipt, so anyone recomputes the same cost. This is efficiency <strong data-v-9e0a1f5f>proven</strong> (routed to the ledger); the meter above is efficiency <strong data-v-9e0a1f5f>measured</strong> (a self-report the page cannot check).</p><p class="cm-thermo" data-v-9e0a1f5f>⚡ <strong data-v-9e0a1f5f>The thermodynamic honesty:</strong> ${ssrInterpolate(unref(c).thermodynamics.note)}</p></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../.vitepress/theme/CostMeter.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CostMeter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-9e0a1f5f"]]);
//#endregion
//#region .vitepress/theme/palette.ts
function sequenceVars() {
	const hue = (d) => 120 + (d - 5) * 30;
	const vars = {};
	for (let d = 1; d <= 9; d++) vars["--seq-" + d] = "hsl(" + hue(d) + " 60% 55%)";
	vars["--seq-center"] = "hsl(" + hue(5) + " 60% 45%)";
	vars["--seq-light"] = "hsl(" + hue(5) + " 32% 82%)";
	vars["--seq-dark"] = "hsl(" + hue(5) + " 30% 50%)";
	vars["--seq-last"] = "hsl(" + hue(4) + " 45% 70%)";
	return vars;
}
/** Set the computed sequence variables on the document root (client-side only). */
function applySequence() {
	if (typeof document === "undefined") return;
	const vars = sequenceVars();
	for (const k in vars) document.documentElement.style.setProperty(k, vars[k]);
}
//#endregion
//#region .vitepress/theme/index.ts
var theme_default = {
	extends: theme,
	Layout: () => {
		return h(theme.Layout, null, { "layout-bottom": () => [h(SiteFooter_default)] });
	},
	enhanceApp({ app }) {
		applySequence();
		app.component("RefererCompass", _sfc_main$12);
		app.component("FoldAnimation", FoldAnimation_default);
		app.component("Reflect", Reflect_default);
		app.component("BookReflect", BookReflect_default);
		app.component("SearchResults", SearchResults_default);
		app.component("BillCalc", BillCalc_default);
		app.component("StarPlay", StarPlay_default);
		app.component("Chess", Chess_default);
		app.component("MessageStream", MessageStream_default);
		app.component("TokenMeter", TokenMeter_default);
		app.component("CostMeter", CostMeter_default);
		app.component("HomeGraph", HomeGraph_default);
	}
};
//#endregion
//#region node_modules/vitepress/dist/client/app/composables/codeGroups.js
function useCodeGroups() {
	if (inBrowser) window.addEventListener("click", (e) => {
		const el = e.target;
		if (el.matches(".vp-code-group input")) {
			const group = el.parentElement?.parentElement;
			if (!group) return;
			const i = Array.from(group.querySelectorAll("input")).indexOf(el);
			if (i < 0) return;
			const blocks = group.querySelector(".blocks");
			if (!blocks) return;
			const current = Array.from(blocks.children).find((child) => child.classList.contains("active"));
			if (!current) return;
			const next = blocks.children[i];
			if (!next || current === next) return;
			current.classList.remove("active");
			activate(next);
			(group?.querySelector(`label[for="${el.id}"]`))?.scrollIntoView({ block: "nearest" });
		}
	});
}
function activate(el) {
	el.classList.add("active");
	window.dispatchEvent(new CustomEvent("vitepress:codeGroupTabActivate", { detail: el }));
}
//#endregion
//#region node_modules/vitepress/dist/client/app/composables/copyCode.js
var ignoredNodes = [".vp-copy-ignore", ".diff.remove"].join(", ");
function useCopyCode() {
	if (inBrowser) {
		const timeoutIdMap = /* @__PURE__ */ new WeakMap();
		window.addEventListener("click", (e) => {
			const el = e.target;
			if (el.matches("div[class*=\"language-\"] > button.copy")) {
				const parent = el.parentElement;
				const sibling = el.nextElementSibling?.nextElementSibling;
				if (!parent || !sibling) return;
				const clone = sibling.cloneNode(true);
				clone.querySelectorAll(ignoredNodes).forEach((node) => node.remove());
				clone.innerHTML = clone.innerHTML.replace(/\n+/g, "\n");
				let text = clone.textContent || "";
				if (isShell(/language-(\w+)/.exec(parent.className)?.[1] || "")) text = text.replace(/^ *(\$|>) /gm, "").trim();
				copyToClipboard(text).then(() => {
					el.classList.add("copied");
					clearTimeout(timeoutIdMap.get(el));
					const timeoutId = setTimeout(() => {
						el.classList.remove("copied");
						el.blur();
						timeoutIdMap.delete(el);
					}, 2e3);
					timeoutIdMap.set(el, timeoutId);
				});
			}
		});
	}
}
async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const element = document.createElement("textarea");
		const previouslyFocusedElement = document.activeElement;
		element.value = text;
		element.setAttribute("readonly", "");
		element.style.contain = "strict";
		element.style.position = "absolute";
		element.style.left = "-9999px";
		element.style.fontSize = "12pt";
		const selection = document.getSelection();
		const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
		document.body.appendChild(element);
		element.select();
		element.selectionStart = 0;
		element.selectionEnd = text.length;
		document.execCommand("copy");
		document.body.removeChild(element);
		if (originalRange) {
			selection.removeAllRanges();
			selection.addRange(originalRange);
		}
		if (previouslyFocusedElement) previouslyFocusedElement.focus();
	}
}
//#endregion
//#region node_modules/vitepress/dist/client/app/composables/head.js
function useUpdateHead(route, siteDataByRouteRef) {
	let isFirstUpdate = true;
	let managedHeadElements = [];
	const updateHeadTags = (newTags) => {
		if (isFirstUpdate) {
			isFirstUpdate = false;
			newTags.forEach((tag) => {
				const headEl = createHeadElement(tag);
				for (const el of document.head.children) if (el.isEqualNode(headEl)) {
					managedHeadElements.push(el);
					return;
				}
			});
			return;
		}
		const newElements = newTags.map(createHeadElement);
		managedHeadElements.forEach((oldEl, oldIndex) => {
			const matchedIndex = newElements.findIndex((newEl) => newEl?.isEqualNode(oldEl ?? null));
			if (matchedIndex !== -1) delete newElements[matchedIndex];
			else {
				oldEl?.remove();
				delete managedHeadElements[oldIndex];
			}
		});
		newElements.forEach((el) => el && document.head.appendChild(el));
		managedHeadElements = [...managedHeadElements, ...newElements].filter(Boolean);
	};
	watchEffect(() => {
		const pageData = route.data;
		const siteData = siteDataByRouteRef.value;
		const pageDescription = pageData && pageData.description;
		const frontmatterHead = pageData && pageData.frontmatter.head || [];
		const title = createTitle(siteData, pageData);
		if (title !== document.title) document.title = title;
		const description = pageDescription || siteData.description;
		let metaDescriptionElement = document.querySelector(`meta[name=description]`);
		if (metaDescriptionElement) {
			if (metaDescriptionElement.getAttribute("content") !== description) metaDescriptionElement.setAttribute("content", description);
		} else createHeadElement(["meta", {
			name: "description",
			content: description
		}]);
		updateHeadTags(mergeHead(siteData.head, filterOutHeadDescription(frontmatterHead)));
	});
}
function createHeadElement([tag, attrs, innerHTML]) {
	const el = document.createElement(tag);
	for (const key in attrs) el.setAttribute(key, attrs[key]);
	if (innerHTML) el.innerHTML = innerHTML;
	if (tag === "script" && attrs.async == null) el.async = false;
	return el;
}
function isMetaDescription(headConfig) {
	return headConfig[0] === "meta" && headConfig[1] && headConfig[1].name === "description";
}
function filterOutHeadDescription(head) {
	return head.filter((h) => !isMetaDescription(h));
}
//#endregion
//#region node_modules/vitepress/dist/client/app/composables/preFetch.js
var hasFetched = /* @__PURE__ */ new Set();
var createLink = () => document.createElement("link");
var viaDOM = (url) => {
	const link = createLink();
	link.rel = `prefetch`;
	link.href = url;
	document.head.appendChild(link);
};
var viaXHR = (url) => {
	const req = new XMLHttpRequest();
	req.open("GET", url, req.withCredentials = true);
	req.send();
};
var link;
var doFetch = inBrowser && (link = createLink()) && link.relList && link.relList.supports && link.relList.supports("prefetch") ? viaDOM : viaXHR;
function usePrefetch() {
	if (!inBrowser) return;
	if (!window.IntersectionObserver) return;
	let conn;
	if ((conn = navigator.connection) && (conn.saveData || /2g/.test(conn.effectiveType))) return;
	const rIC = window.requestIdleCallback || setTimeout;
	let observer = null;
	const observeLinks = () => {
		if (observer) observer.disconnect();
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const link = entry.target;
					observer.unobserve(link);
					const { pathname } = link;
					if (!hasFetched.has(pathname)) {
						hasFetched.add(pathname);
						const pageChunkPath = pathToFile(pathname);
						if (pageChunkPath) doFetch(pageChunkPath);
					}
				}
			});
		});
		rIC(() => {
			document.querySelectorAll("#app a").forEach((link) => {
				const { hostname, pathname } = new URL(link.href instanceof SVGAnimatedString ? link.href.animVal : link.href, link.baseURI);
				const extMatch = pathname.match(/\.\w+$/);
				if (extMatch && extMatch[0] !== ".html") return;
				if (link.target !== "_blank" && hostname === location.hostname) {
					if (pathname !== location.pathname) observer.observe(link);
					else hasFetched.add(pathname);
				}
			});
		});
	};
	onMounted(observeLinks);
	const route = useRoute();
	watch(() => route.path, observeLinks);
	onUnmounted(() => {
		observer && observer.disconnect();
	});
}
//#endregion
//#region node_modules/vitepress/dist/client/app/index.js
function resolveThemeExtends(theme) {
	if (theme.extends) {
		const base = resolveThemeExtends(theme.extends);
		return {
			...base,
			...theme,
			async enhanceApp(ctx) {
				if (base.enhanceApp) await base.enhanceApp(ctx);
				if (theme.enhanceApp) await theme.enhanceApp(ctx);
			}
		};
	}
	return theme;
}
var Theme = resolveThemeExtends(theme_default);
var VitePressApp = defineComponent({
	name: "VitePressApp",
	setup() {
		const { site, lang, dir } = useData$1();
		onMounted(() => {
			watchEffect(() => {
				document.documentElement.lang = lang.value;
				document.documentElement.dir = dir.value;
			});
		});
		if (site.value.router.prefetchLinks) usePrefetch();
		useCopyCode();
		useCodeGroups();
		if (Theme.setup) Theme.setup();
		return () => h(Theme.Layout);
	}
});
async function createApp$1() {
	globalThis.__VITEPRESS__ = true;
	const router = newRouter();
	const app = newApp();
	app.provide(RouterSymbol, router);
	const data = initData(router.route);
	app.provide(dataSymbol, data);
	app.component("Content", Content);
	app.component("ClientOnly", ClientOnly);
	Object.defineProperties(app.config.globalProperties, {
		$frontmatter: { get() {
			return data.frontmatter.value;
		} },
		$params: { get() {
			return data.page.value.params;
		} }
	});
	if (Theme.enhanceApp) await Theme.enhanceApp({
		app,
		router,
		siteData: siteDataRef
	});
	return {
		app,
		router,
		data
	};
}
function newApp() {
	return createSSRApp(VitePressApp);
}
function newRouter() {
	let isInitialPageLoad = inBrowser;
	return createRouter((path) => {
		let pageFilePath = pathToFile(path);
		let pageModule = null;
		if (pageFilePath) {
			if (isInitialPageLoad) pageFilePath = pageFilePath.replace(/\.js$/, ".lean.js");
			pageModule = import(
				/*@vite-ignore*/
				pageFilePath
);
		}
		if (inBrowser) isInitialPageLoad = false;
		return pageModule;
	}, Theme.NotFound);
}
if (inBrowser) createApp$1().then(({ app, router, data }) => {
	router.go(location.href, { initialLoad: true }).then(() => {
		useUpdateHead(router.route, data.site);
		app.mount("#app");
	});
});
//#endregion
//#region node_modules/vitepress/dist/client/app/ssr.js
async function render(path) {
	const { app, router } = await createApp$1();
	await router.go(path);
	const ctx = {
		content: "",
		vpSocialIcons: /* @__PURE__ */ new Set()
	};
	ctx.content = await renderToString(app, ctx);
	return ctx;
}
//#endregion
export { escapeRegExp as a, dataSymbol as i, useRouter as n, inBrowser as o, pathToFile as r, render, useData as t };
