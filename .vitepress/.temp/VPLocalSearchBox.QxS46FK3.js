import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { a as escapeRegExp, i as dataSymbol, n as useRouter, o as inBrowser, r as pathToFile, t as useData } from "./app.js";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
import { computed, createApp, defineComponent, markRaw, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, unref, useSSRContext, watch, watchEffect } from "vue";
import { computedAsync, onKeyStroke, useEventListener, useLocalStorage, useScrollLock, useSessionStorage, watchDebounced } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import Mark from "mark.js/src/vanilla.js";
import MiniSearch from "minisearch";
//#region ../../../../../@localSearchIndex
var _localSearchIndex_default = { "root": () => import("./@localSearchIndexroot.D2-eFD_d.js") };
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/lru.js
var LRUCache = class {
	max;
	cache;
	constructor(max = 10) {
		this.max = max;
		this.cache = /* @__PURE__ */ new Map();
	}
	get(key) {
		let item = this.cache.get(key);
		if (item !== void 0) {
			this.cache.delete(key);
			this.cache.set(key, item);
		}
		return item;
	}
	set(key, val) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size === this.max) this.cache.delete(this.first());
		this.cache.set(key, val);
	}
	first() {
		return this.cache.keys().next().value;
	}
	clear() {
		this.cache.clear();
	}
};
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/support/translation.js
/**
* @param themeObject Can be an object with `translations` and `locales` properties
*/
function createSearchTranslate(defaultTranslations) {
	const { localeIndex, theme } = useData();
	function translate(key) {
		const keyPath = key.split(".");
		const themeObject = theme.value.search?.options;
		const isObject = themeObject && typeof themeObject === "object";
		const locales = isObject && themeObject.locales?.[localeIndex.value]?.translations || null;
		const translations = isObject && themeObject.translations || null;
		let localeResult = locales;
		let translationResult = translations;
		let defaultResult = defaultTranslations;
		const lastKey = keyPath.pop();
		for (const k of keyPath) {
			let fallbackResult = null;
			const foundInFallback = defaultResult?.[k];
			if (foundInFallback) fallbackResult = defaultResult = foundInFallback;
			const foundInTranslation = translationResult?.[k];
			if (foundInTranslation) fallbackResult = translationResult = foundInTranslation;
			const foundInLocale = localeResult?.[k];
			if (foundInLocale) fallbackResult = localeResult = foundInLocale;
			if (!foundInFallback) defaultResult = fallbackResult;
			if (!foundInTranslation) translationResult = fallbackResult;
			if (!foundInLocale) localeResult = fallbackResult;
		}
		return localeResult?.[lastKey] ?? translationResult?.[lastKey] ?? defaultResult?.[lastKey] ?? "";
	}
	return translate;
}
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue?vue&type=script&setup=true&lang.ts
var VPLocalSearchBox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPLocalSearchBox",
	__ssrInlineRender: true,
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const el = shallowRef();
		const resultsEl = shallowRef();
		const searchIndexData = shallowRef(_localSearchIndex_default);
		const vitePressData = useData();
		const { activate } = useFocusTrap(el, {
			immediate: true,
			allowOutsideClick: true,
			clickOutsideDeactivates: true,
			escapeDeactivates: true
		});
		const { localeIndex, theme } = vitePressData;
		const isSearchIndexLoading = ref(false);
		const isSearching = ref(false);
		const showSearchSpinner = computed(() => {
			return isSearchIndexLoading.value || isSearching.value;
		});
		const searchIndex = computedAsync(async () => markRaw(MiniSearch.loadJSON((await searchIndexData.value[localeIndex.value]?.())?.default, {
			fields: [
				"title",
				"titles",
				"text"
			],
			storeFields: ["title", "titles"],
			searchOptions: {
				fuzzy: .2,
				prefix: true,
				boost: {
					title: 4,
					text: 2,
					titles: 1
				},
				...theme.value.search?.provider === "local" && theme.value.search.options?.miniSearch?.searchOptions
			},
			...theme.value.search?.provider === "local" && theme.value.search.options?.miniSearch?.options
		})), void 0, isSearchIndexLoading);
		const filterText = computed(() => {
			return theme.value.search?.provider === "local" && theme.value.search.options?.disableQueryPersistence === true;
		}).value ? ref("") : useSessionStorage("vitepress:local-search-filter", "");
		const showDetailedList = useLocalStorage("vitepress:local-search-detailed-list", theme.value.search?.provider === "local" && theme.value.search.options?.detailedView === true);
		const disableDetailedView = computed(() => {
			return theme.value.search?.provider === "local" && theme.value.search.options?.detailedView === false;
		});
		watchEffect(() => {
			if (disableDetailedView.value) showDetailedList.value = false;
		});
		const results = shallowRef([]);
		const enableNoResults = ref(false);
		watch(filterText, () => {
			enableNoResults.value = false;
		});
		const mark = computedAsync(async () => {
			if (!resultsEl.value) return;
			return markRaw(new Mark(resultsEl.value));
		}, null);
		const cache = new LRUCache(16);
		watchDebounced(() => [
			searchIndex.value,
			filterText.value,
			showDetailedList.value
		], async ([index, filterTextValue, showDetailedListValue], old, onCleanup) => {
			if (old?.[0] !== index) cache.clear();
			let canceled = false;
			onCleanup(() => {
				canceled = true;
				isSearching.value = false;
			});
			if (!index) {
				results.value = [];
				return;
			}
			isSearching.value = true;
			results.value = index.search(filterTextValue).slice(0, 16);
			enableNoResults.value = true;
			const mods = showDetailedListValue ? await Promise.all(results.value.map((r) => fetchExcerpt(r.id))) : [];
			if (canceled) return;
			for (const { id, mod } of mods) {
				const mapId = id.slice(0, id.indexOf("#"));
				let map = cache.get(mapId);
				if (map) continue;
				map = /* @__PURE__ */ new Map();
				cache.set(mapId, map);
				const comp = mod.default ?? mod;
				if (comp?.render || comp?.setup) {
					const app = createApp(comp);
					app.config.warnHandler = () => {};
					app.provide(dataSymbol, vitePressData);
					Object.defineProperties(app.config.globalProperties, {
						$frontmatter: { get() {
							return vitePressData.frontmatter.value;
						} },
						$params: { get() {
							return vitePressData.page.value.params;
						} }
					});
					const div = document.createElement("div");
					app.mount(div);
					div.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
						const href = el.querySelector("a")?.getAttribute("href");
						const anchor = href?.startsWith("#") && href.slice(1);
						if (!anchor) return;
						let html = "";
						while ((el = el.nextElementSibling) && !/^h[1-6]$/i.test(el.tagName)) html += el.outerHTML;
						map.set(anchor, html);
					});
					app.unmount();
				}
				if (canceled) return;
			}
			const terms = /* @__PURE__ */ new Set();
			results.value = results.value.map((r) => {
				const [id, anchor] = r.id.split("#");
				const text = cache.get(id)?.get(anchor) ?? "";
				for (const term in r.match) terms.add(term);
				return {
					...r,
					text
				};
			});
			await nextTick();
			if (canceled) return;
			await new Promise((r) => {
				mark.value?.unmark({ done: () => {
					mark.value?.markRegExp(formMarkRegex(terms), { done: r });
				} });
			});
			const excerpts = el.value?.querySelectorAll(".result .excerpt") ?? [];
			for (const excerpt of excerpts) excerpt.querySelector("mark[data-markjs=\"true\"]")?.scrollIntoView({ block: "center" });
			resultsEl.value?.firstElementChild?.scrollIntoView({ block: "start" });
			isSearching.value = false;
		}, {
			debounce: 200,
			immediate: true
		});
		async function fetchExcerpt(id) {
			const file = pathToFile(id.slice(0, id.indexOf("#")));
			try {
				if (!file) throw new Error(`Cannot find file for id: ${id}`);
				return {
					id,
					mod: await import(
						/*@vite-ignore*/
						file
)
				};
			} catch (e) {
				console.error(e);
				return {
					id,
					mod: {}
				};
			}
		}
		const searchInput = ref();
		const disableReset = computed(() => {
			return filterText.value?.length <= 0;
		});
		function focusSearchInput(select = true) {
			searchInput.value?.focus();
			select && searchInput.value?.select();
		}
		onMounted(() => {
			focusSearchInput();
		});
		const selectedIndex = ref(-1);
		const disableMouseOver = ref(true);
		watch(results, (r) => {
			selectedIndex.value = r.length ? 0 : -1;
			scrollToSelectedResult();
		});
		function scrollToSelectedResult() {
			nextTick(() => {
				document.querySelector(".result.selected")?.scrollIntoView({ block: "nearest" });
			});
		}
		function selectPreviousResult(event) {
			event.preventDefault();
			selectedIndex.value--;
			if (selectedIndex.value < 0) selectedIndex.value = results.value.length - 1;
			disableMouseOver.value = true;
			scrollToSelectedResult();
		}
		function selectNextResult(event) {
			event.preventDefault();
			selectedIndex.value++;
			if (selectedIndex.value >= results.value.length) selectedIndex.value = 0;
			disableMouseOver.value = true;
			scrollToSelectedResult();
		}
		function isMacCtrlShortcut(event) {
			return event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && document.documentElement.classList.contains("mac");
		}
		onKeyStroke("ArrowUp", selectPreviousResult);
		onKeyStroke("ArrowDown", selectNextResult);
		onKeyStroke(["p", "P"], (event) => {
			if (isMacCtrlShortcut(event)) selectPreviousResult(event);
		});
		onKeyStroke(["n", "N"], (event) => {
			if (isMacCtrlShortcut(event)) selectNextResult(event);
		});
		const router = useRouter();
		onKeyStroke("Enter", (e) => {
			if (e.isComposing) return;
			if (e.target instanceof HTMLButtonElement && e.target.type !== "submit") return;
			const selectedPackage = results.value[selectedIndex.value];
			if (e.target instanceof HTMLInputElement && !selectedPackage) {
				e.preventDefault();
				return;
			}
			if (selectedPackage) {
				router.go(selectedPackage.id);
				emit("close");
			}
		});
		onKeyStroke("Escape", () => {
			emit("close");
		});
		const translate = createSearchTranslate({
			button: { buttonText: "Search" },
			modal: {
				displayDetails: "Display detailed list",
				resetButtonTitle: "Reset search",
				backButtonTitle: "Close search",
				noResultsText: "No results for",
				footer: {
					selectText: "to select",
					selectKeyAriaLabel: "enter",
					navigateText: "to navigate",
					navigateUpKeyAriaLabel: "up arrow",
					navigateDownKeyAriaLabel: "down arrow",
					closeText: "to close",
					closeKeyAriaLabel: "escape"
				}
			}
		});
		onMounted(() => {
			window.history.pushState(null, "", null);
		});
		useEventListener("popstate", (event) => {
			event.preventDefault();
			emit("close");
		});
		/** Lock body */
		const isLocked = useScrollLock(inBrowser ? document.body : null);
		onMounted(() => {
			nextTick(() => {
				isLocked.value = true;
				nextTick().then(() => activate());
			});
		});
		onBeforeUnmount(() => {
			isLocked.value = false;
		});
		function formMarkRegex(terms) {
			return new RegExp([...terms].sort((a, b) => b.length - a.length).map((term) => `(${escapeRegExp(term)})`).join("|"), "gi");
		}
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				_push(`<div role="button"${ssrRenderAttr("aria-owns", results.value?.length ? "localsearch-list" : void 0)} aria-expanded="true" aria-haspopup="listbox" aria-labelledby="localsearch-label" class="VPLocalSearchBox" data-v-edd28599><div class="backdrop" data-v-edd28599></div><div class="shell" data-v-edd28599><form class="search-bar" data-v-edd28599><label${ssrRenderAttr("title", unref(translate)("button.buttonText"))} id="localsearch-label" for="localsearch-input" data-v-edd28599><span aria-hidden="true" class="vpi-search search-icon local-search-icon" data-v-edd28599></span></label><div class="search-actions before" data-v-edd28599><button class="back-button"${ssrRenderAttr("title", unref(translate)("modal.backButtonTitle"))} data-v-edd28599><span class="vpi-arrow-left local-search-icon" data-v-edd28599></span></button></div><input${ssrRenderAttr("value", unref(filterText))}${ssrRenderAttr("aria-activedescendant", selectedIndex.value > -1 ? "localsearch-item-" + selectedIndex.value : void 0)} aria-autocomplete="both"${ssrRenderAttr("aria-controls", results.value?.length ? "localsearch-list" : void 0)} aria-labelledby="localsearch-label" autocapitalize="off" autocomplete="off" autocorrect="off" class="search-input" id="localsearch-input" enterkeyhint="go" maxlength="64"${ssrRenderAttr("placeholder", unref(translate)("button.buttonText"))} spellcheck="false" type="search" data-v-edd28599><div class="search-actions" data-v-edd28599><span class="${ssrRenderClass([{ active: showSearchSpinner.value }, "search-loading"])}"${ssrRenderAttr("role", showSearchSpinner.value ? "status" : void 0)} aria-live="polite"${ssrRenderAttr("aria-label", showSearchSpinner.value ? "Loading search results" : void 0)} data-v-edd28599></span>`);
				if (!disableDetailedView.value) _push(`<button type="button" class="${ssrRenderClass([{ "detailed-list": unref(showDetailedList) }, "toggle-layout-button"])}"${ssrRenderAttr("title", unref(translate)("modal.displayDetails"))} data-v-edd28599><span class="vpi-layout-list local-search-icon" data-v-edd28599></span></button>`);
				else _push(`<!---->`);
				_push(`<button class="clear-button" type="reset"${ssrIncludeBooleanAttr(disableReset.value) ? " disabled" : ""}${ssrRenderAttr("title", unref(translate)("modal.resetButtonTitle"))} data-v-edd28599><span class="vpi-delete local-search-icon" data-v-edd28599></span></button></div></form><ul${ssrRenderAttr("id", results.value?.length ? "localsearch-list" : void 0)}${ssrRenderAttr("role", results.value?.length ? "listbox" : void 0)}${ssrRenderAttr("aria-busy", showSearchSpinner.value ? "true" : "false")}${ssrRenderAttr("aria-labelledby", results.value?.length ? "localsearch-label" : void 0)} class="results" data-v-edd28599><!--[-->`);
				ssrRenderList(results.value, (p, index) => {
					_push(`<li${ssrRenderAttr("id", "localsearch-item-" + index)}${ssrRenderAttr("aria-selected", selectedIndex.value === index ? "true" : "false")} role="option" data-v-edd28599><a${ssrRenderAttr("href", p.id)} class="${ssrRenderClass([{ selected: selectedIndex.value === index }, "result"])}"${ssrRenderAttr("aria-label", [...p.titles, p.title].join(" > "))}${ssrRenderAttr("data-index", index)} data-v-edd28599><div data-v-edd28599><div class="titles" data-v-edd28599><span class="title-icon" data-v-edd28599>#</span><!--[-->`);
					ssrRenderList(p.titles, (t, index) => {
						_push(`<span class="title" data-v-edd28599><span class="text" data-v-edd28599>${t ?? ""}</span><span class="vpi-chevron-right local-search-icon" data-v-edd28599></span></span>`);
					});
					_push(`<!--]--><span class="title main" data-v-edd28599><span class="text" data-v-edd28599>${p.title ?? ""}</span></span></div>`);
					if (unref(showDetailedList)) {
						_push(`<div class="excerpt-wrapper" data-v-edd28599>`);
						if (p.text) _push(`<div class="excerpt" inert data-v-edd28599><div class="vp-doc" data-v-edd28599>${p.text ?? ""}</div></div>`);
						else _push(`<!---->`);
						_push(`<div class="excerpt-gradient-bottom" data-v-edd28599></div><div class="excerpt-gradient-top" data-v-edd28599></div></div>`);
					} else _push(`<!---->`);
					_push(`</div></a></li>`);
				});
				_push(`<!--]-->`);
				if (unref(filterText) && !results.value.length && enableNoResults.value) _push(`<li class="no-results" data-v-edd28599>${ssrInterpolate(unref(translate)("modal.noResultsText"))} &quot;<strong data-v-edd28599>${ssrInterpolate(unref(filterText))}</strong>&quot; </li>`);
				else _push(`<!---->`);
				_push(`</ul><div class="search-keyboard-shortcuts" data-v-edd28599><span data-v-edd28599><kbd${ssrRenderAttr("aria-label", unref(translate)("modal.footer.navigateUpKeyAriaLabel"))} data-v-edd28599><span class="vpi-arrow-up navigate-icon" data-v-edd28599></span></kbd><kbd${ssrRenderAttr("aria-label", unref(translate)("modal.footer.navigateDownKeyAriaLabel"))} data-v-edd28599><span class="vpi-arrow-down navigate-icon" data-v-edd28599></span></kbd> ${ssrInterpolate(unref(translate)("modal.footer.navigateText"))}</span><span data-v-edd28599><kbd${ssrRenderAttr("aria-label", unref(translate)("modal.footer.selectKeyAriaLabel"))} data-v-edd28599><span class="vpi-corner-down-left navigate-icon" data-v-edd28599></span></kbd> ${ssrInterpolate(unref(translate)("modal.footer.selectText"))}</span><span data-v-edd28599><kbd${ssrRenderAttr("aria-label", unref(translate)("modal.footer.closeKeyAriaLabel"))} data-v-edd28599>esc</kbd> ${ssrInterpolate(unref(translate)("modal.footer.closeText"))}</span></div></div></div>`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region node_modules/vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue
var _sfc_setup = VPLocalSearchBox_vue_vue_type_script_setup_true_lang_default.setup;
VPLocalSearchBox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var VPLocalSearchBox_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPLocalSearchBox_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-edd28599"]]);
//#endregion
export { VPLocalSearchBox_default as default };
