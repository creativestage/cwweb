const getInitState = () => {
  const {hash} = window.location;
  const activeRoute = hash.slice(2);
  const openRoutes = [];
  if (activeRoute) {
    openRoutes.push(activeRoute);
  }
  return {
    activeRoute,
    openRoutes
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
  }
}

export default {
  state,
  mutations,
  actions
}