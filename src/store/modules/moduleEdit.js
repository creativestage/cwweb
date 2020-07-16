
import {getUUId, getFactory} from '../../Tools/common';

const getInitModule = () => ({
  key: 'module-' +getUUId(),
  name: '',
  desc: '',
  html: '',
  css: '',
  js: '',
  config: '[]',
});

const state = {
  configurationValue: {},
  previewUrl: '',
  module: null
}

const mutations = {
  init(state) {
    state.module = getInitModule();
    state.previewUrl = '';
    state.configurationValue = {};
  },
  setter(state, module) {
    state.module = module;
    state.previewUrl = '';
    state.configurationValue = {};
  },
  modify(state, options) {
    state.module = {
      ...state.module,
      ...options
    }
  },
  modifyConfiguration(state, options) {
    state.configurationValue = {
      ...state.configurationValue,
      ...options
    }
  },
  setPreviewUrl(state, previewUrl) {
    state.previewUrl = previewUrl
  }
}

const actions = {
  setModule(context, module) {
    context.commit('setter', module);
  },
  initModule(context) {
    context.commit('init');
  },
  modifyModuleInfo(context, options) {
    context.commit('modify', options);
  },
  editConfiguration(context, options) {
    context.commit('modifyConfiguration', options);
  },
  setPreviewUrl(context, previewUrl) {
    context.commit('setPreviewUrl', previewUrl);
  }
}

const getters = {
  configuration: state => {
    const {module: {config}, configurationValue} = state;
    try {
      let func = getFactory(config);
      let configuration = func() || [];
      configuration.forEach(item => {
        item.value = configurationValue[item.key]
      });
      return configuration;
    } catch(e) {
      return [];
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}