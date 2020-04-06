import {getCurrentRoute, travelTree} from '../../Tools/common';
import {allTreeData} from '../../const/treeData';

const getInitState = () => {
  const activeRoute = getCurrentRoute();
  const openRoutes = [];
  if (activeRoute && activeRoute !== 'Login') {
    openRoutes.push(activeRoute);
  }
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      userInfo = JSON.parse(userInfo);
    } catch(e){
      console.log(e)
    }
  }
  return {
    activeRoute,
    openRoutes,
    isLogin: true,
    userInfo
  }
}

const state = getInitState();

const mutations = {
  openRoute(state, currentRoute) {
    state.openRoutes = [
      ...new Set(state.openRoutes).add(state.activeRoute = currentRoute)
    ];
  },
  changeActiveRoute(state, nextRoute) {
    state.activeRoute = nextRoute;
  },
  updateRouteState(state, payload) {
    state.openRoutes = [
      ...new Set(state.openRoutes.filter(code => code !== payload.removeRoute)).add(payload.activeRoute)
    ];
    state.activeRoute = payload.activeRoute;
  },
  logined(state, userInfo) {
    state.isLogin = true;
    state.userInfo = userInfo;
  },
  logout(state) {
    state.userInfo = null;
  }
}

const actions = {
  openRoute(context, currentRoute) {
    context.commit('openRoute', currentRoute);
  },
  changeActiveRoute(context, {route, success}) {
    context.commit('changeActiveRoute', route);
    success();
  },
  closeRoute(context, {route, success}) {
    const {openRoutes, activeRoute} = context.state;
    let nextActiveRoute;
    if (route !== activeRoute) {
      nextActiveRoute = activeRoute;
    } else {
      let currentActiveIndex = openRoutes.indexOf(activeRoute);
      nextActiveRoute = currentActiveIndex ? openRoutes[currentActiveIndex - 1] : (openRoutes[1] || 'Home');
    }
    context.commit('updateRouteState', {
      removeRoute: route,
      activeRoute: nextActiveRoute
    });
    success(nextActiveRoute);
  },
  login(context, {token, userInfo, success}) {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    context.commit('logined', userInfo);
    success();
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    context.commit('logout');
  }
}

const getters = {
  openNavList: state => {
    return state.openRoutes
    .sort((code1) => {
      if (code1 === 'Home') return -1;
      return 0;
    })
    .filter(code => code !== 'Login')
    .map(code => {
      const result = {code};
      travelTree(allTreeData, (node) => {
        if (node.code === code) {
          result.title = node.title;
          return true;
        }
      });
      return result;
    });
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}