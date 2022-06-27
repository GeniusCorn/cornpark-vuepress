const interviews = require('./interviews.sidebar');
const deploy = require('./deploy.sidebar');
const leetcode = require('./leetcode.sidebar');
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
        text: '前端面试💻',
        link: '/interviews',
      },
      { text: '前端部署⚙️', link: '/deploy' },
      { text: 'LeetCode🖊️', link: '/leetcode' },
      { text: '读书笔记🔖', link: '/reading' },
      { text: '课程设计🎒', link: '/school' },
    ],
    sidebar: {
      '/interviews': interviews,
      '/deploy': deploy,
      '/leetcode': leetcode,
      '/reading': reading,
      '/school': school,
    },
    lastUpdated: false,
    contributors: false,
    editLink: false,
  }),
};
