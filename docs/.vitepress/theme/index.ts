// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { inBrowser } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import confetti from "./components/confetti.vue";
import busuanzi from "busuanzi.pure.js";
import VisitorPanel from "./components/VisitorPanel.vue";
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp(ctx) {
    const { app, router, siteData } = ctx;
    app.component("confetti", confetti);
    app.component("VisitorPanel", VisitorPanel);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
} satisfies Theme
