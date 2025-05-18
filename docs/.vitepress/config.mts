import { defineConfig } from "vitepress";

export default defineConfig({
  base:'/codery.github.io/',
  title: "Codery's 的开发文档",
  description: "Codery's Blog Site",
  // header标签里面插入的内容
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    // 网站的logo
    logo: "/logo.svg",
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 主题
    darkModeSwitchLabel: "深浅模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    // 搜索
    search: {
      provider: "local",
    },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present China Codery",
    },
    // 文档的最后更新时间
    // lastUpdated: {
    // text: "Updated at",
    // formatOptions: {
    //     dateStyle: "full",
    //     timeStyle: "medium",
    //   },
    // },
    nav: [
      { text: "首页", link: "/" },
      { text: "前端开发文档",items:[
        {
          text: '前端面经',
          link: '/interview/h5css-skill',
        },{
          text: 'Vue3.0精读文档',
          link: '/refinedVue3/index',
        },{
          text: 'TS精读文档',
          link: '/refinedTS/index',
        },{
          text: 'React开发文档',
          link: '/react/reactFiles',
        },{
          text: 'Flutter开发文档',
          link: '/flutter/flutterFiles',
        },{
          text: '前端开发规范',
          link: '/devGuide/index',
        }] },
        { text: "后端开发文档",items:[
          {
            text: 'Docker文档',
            link: '/endFront/dockerStudy/dockerIndex',
          },
          {
            text: 'K8S文档',
            link: '/endFront/k8s-study/k8sIndex',
          }] },
      { text: "工作笔记",items:[
        {
          text: '2025年4月',
          link: '/workNote/2025年4月',
        },{
          text: '2025年3月',
          link: '/workNote/2025年3月',
        },{
          text: '2025年2月',
          link: '/workNote/2025年2月',
        },{
          text: '2025年1月',
          link: '/workNote/2025年1月',
        },
        
        {
          text: '2024年12月',
          link: '/workNote/2024年12月',
        },] },
      { text: "工具导航栏", link: "/toolsFiles/tools-list" },
      { text: "工作项目集", link: "/projectFiles/project-list" }
    ],

    sidebar: {
      '/interview/': [{
        text: '前端面经',
          items: [
              { text: 'H5/CSS3知识积累', link: '/interview/h5css-skill' },
              { text: 'JS/TS知识积累', link: '/interview/js-skill' },
              { text: 'ES6知识积累', link: '/interview/ES6-skill' },
              { text: 'Vue知识积累', link: '/interview/vue-skill' },
              { text: 'Hybrid知识积累', link: '/interview/hybrid-skill' },
              { text: '常用面试积累', link: '/interview/interview-skill' },
              { text: '实践知识积累', link: '/interview/practice-skill' }
          ]
      }],
      '/refinedVue3/': [{
        text: 'Vue3.0精读',
          items: [
              { text: '入门基础', link: '/refinedVue3/index' },
              { text: '深入组件', link: '/refinedVue3/vueComponent' },
              { text: '逻辑复用', link: '/refinedVue3/logicReuse' },
              { text: '内置组件', link: '/refinedVue3/introComponemt' },
              { text: '应用模块化', link: '/refinedVue3/applyMoudel' },
              { text: '最佳实践', link: '/refinedVue3/bestPractice' },
              { text: 'Vue3结合TS', link: '/refinedVue3/Vue3TS' },
              { text: 'Vue进阶主题', link: '/refinedVue3/vueAdvance' }
              
          ]
      }],
      '/workNote/': [{
        text: '工作笔记',
          items: [
            { text: '2025年4月', link: '/workNote/2025年4月' },
            { text: '2025年3月', link: '/workNote/2025年3月' },
            { text: '2025年2月', link: '/workNote/2025年2月' },
            { text: '2025年1月', link: '/workNote/2025年1月' },
            { text: '2024年12月', link: '/workNote/2024年12月'}
          ]
      }]
      
    },
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],
    // 部署的时候需要注意该参数避免样式丢失
    // base: "/vitepress-blog-template/",
  }
});
