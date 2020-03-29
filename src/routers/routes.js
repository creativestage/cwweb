const Home = () => import('../pages/Home');
const Guide = () => import('../pages/Guide');
const Stage = () => import('../pages/StageCenter/Stage');
const Market = () => import('../pages/ModuleCenter/Market');
const MyModule = () => import('../pages/ModuleCenter/MyModule');
const ModuleEdit = () => import('../pages/ModuleCenter/ModuleEdit');
const StageGuide = () => import('../pages/Guide/StageGuide');
const DevelopGuide = () => import('../pages/Guide/DevelopGuide');
const MyPages = () => import('../pages/StageCenter/MyPages');

const routes = [
  {path: '/', redirect: '/Home'},
  {path: '/Home', component: Home},
  {path: '/Guide', component: Guide},
  {path: '/Stage', component: Stage},
  {path: '/Market', component: Market},
  {path: '/MyModule', component: MyModule},
  {path: '/ModuleEdit', component: ModuleEdit},
  {path: '/StageGuide', component: StageGuide},
  {path: '/DevelopGuide', component: DevelopGuide},
  {path: '/MyPages', component: MyPages}
];

export default routes;