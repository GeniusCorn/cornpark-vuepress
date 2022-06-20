const js = require('./js.sidebar');
const css = require('./css.sidebar');
const vue = require('./vue.sidebar');
const deploy = require('./deploy.sidebar');
const school = require('./school.sidebar');
const reading = require('./reading.sidebar');

const { defaultTheme } = require('vuepress');

module.exports = {
  title: 'Corn Park',
  lang: 'zh-CN',
  description: '玉之米的自留地',
  head: [['link', { rel: 'icon', href: '/images/av.png' }]],

  theme: defaultTheme({
    logo: '/images/av.png',
    repo: 'geniuscorn/cornpark-vuepress',
    navbar: [
      { text: '主页🏠', link: '/' },
      {
        text: '前端基础💻',
        children: [
          { text: 'JavaScript', link: '/frontend/js' },
          { text: 'CSS', link: '/frontend/css' },
          { text: 'Vue', link: '/frontend/vue' },
        ],
      },
      { text: '前端部署⚙️', link: '/frontend/deploy' },
      { text: '读书笔记🔖', link: '/reading' },
      { text: '课程设计🎒', link: '/school' },
    ],
    sidebar: {
      '/frontend/js': js,
      '/frontend/css': css,
      '/frontend/vue': vue,
      '/frontend/deploy': deploy,
      '/reading': reading,
      '/school': school,
    },
    lastUpdated: false,
    contributors: false,
    editLink: false,
  }),
};
