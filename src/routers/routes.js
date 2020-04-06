const Home = () => import('../pages/Home');
const Guide = () => import('../pages/Guide');
const Stage = () => import('../pages/StageCenter/Stage');
const Market = () => import('../pages/ModuleCenter/Market');
const MyModule = () => import('../pages/ModuleCenter/MyModule');
const ModuleEdit = () => import('../pages/ModuleCenter/ModuleEdit');
const StageGuide = () => import('../pages/Guide/StageGuide');
const DevelopGuide = () => import('../pages/Guide/DevelopGuide');
const MyPages = () => import('../pages/StageCenter/MyPages');
const Login = () => import('../components/Login/index');

const routes = [
  {path: '/Login', component: Login},
  {path: '/', redirect: '/Home'},
  {path: '/Home', component: Home, meta: {auth: true}},
  {path: '/Guide', component: Guide, meta: {auth: true}},
  {path: '/Stage', component: Stage, meta: {auth: true}},
  {path: '/Market', component: Market, meta: {auth: true}},
  {path: '/MyModule', component: MyModule, meta: {auth: true}},
  {path: '/ModuleEdit', component: ModuleEdit, meta: {auth: true}},
  {path: '/StageGuide', component: StageGuide, meta: {auth: true}},
  {path: '/DevelopGuide', component: DevelopGuide, meta: {auth: true}},
  {path: '/MyPages', component: MyPages, meta: {auth: true}},
];

export default routes;