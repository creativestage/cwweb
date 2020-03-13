
import {getUUId, getFactory} from '../../Tools/common';

const getInitState = () => {
  return {
    module: {
      key: getUUId(),
      name: '',
      desc: '',
      html: '',
      css: '',
      js: '',
      config: '[]',
    },
    configurationValue: {},
    previewUrl: ''
  };
}

const state = getInitState();

const mutations = {
  setter(state, module) {
    state.module = module;
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