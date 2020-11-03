
export const leftTreeData = [
  {
    title: '首页',
    icon: 'home',
    code: 'Home',
    route: '/Home'
  },
  {
    title: '模块中心',
    icon: 'appstore',
    code: 'ModuleCenter',
    children: [
      {
        title: '模块市场',
        route: '/Market',
        code: 'Market'
      },
      {
        title: '我的模块',
        code: 'MyModule',
        route: '/MyModule'
      }
    ]
  },
  {
    title: '创作中心',
    code: 'StageCenter',
    icon: 'desktop',
    children: [
      {
        title: '创作台',
        route: '/Stage',
        code: 'Stage'
      },
      {
        title: '我的页面',
        route: '/MyPages',
        code: 'MyPages'
      }
    ]
  },
  {
    title: '指南',
    code: 'Guide',
    icon: 'eye',
    children: [
      {
        title: '模块开发',
        route: '/DevelopGuide',
        code: 'DevelopGuide'
      },
      {
        title: '页面搭建',
        route: '/StageGuide',
        code: 'StageGuide'
      },
      {
        title: '配置项文档',
        route: '/ConfigurationGuide',
        code: 'ConfigurationGuide'
      }
    ]
  }
]

const hiddenTreeData = [
  {
    title: '编辑模块',
    route: '/ModuleEdit',
    code: 'ModuleEdit',
    hidden: true
  }
];

export const allTreeData = leftTreeData.concat(hiddenTreeData);