<template>
  <div class="stage-container">
    <div class="module-list-wrap">
      <div class="search_bar">
        <a-input placeholder="模糊查询：模块名/模块详情/模块key" />
      </div>
      <div class="module-list" ref="modules">
        <div class="module-item" v-for="item in moduleList" :key="item._id">
          <ModuleCard :showAction="false" :item="item" />
          <div class="add-mask" @click="handleAdd(item)">
            <div class="add-mask-inner">
              <a-icon type="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-view">
      <Preview title="搭建页面" :handleClose="handleClosePreview">
        <div class="page-stage" slot="main" ref="stage" v-if="!previewUrl">
          <div class="page-module" v-for="(item, index) in pageModules" :key="item.id">
            <div class="page-module-info">
              <img :src="item.poster"/>
              <div class="page-module-config">
                  <div class="page-module-config-title clearfix">
                    模块名：{{item.name}}
                    <a-tag v-if="!item.isDirty" class="right" color="gray">未配置</a-tag>
                    <a-tag v-else class="right" color="green">已配置</a-tag>
                  </div>
                  <div class="page-module-config-actions">
                    <a-button @click="handleModuleSetting(item)" type="primary" size="large" shape="circle" icon="setting" />
                    <a-button @click="handleModuleMove(index, true)" :disabled="index === 0" type="warning" size="large" shape="circle" icon="arrow-up" />
                    <a-button @click="handleModuleMove(index)" :disabled="index === pageModules.length-1" type="warning" size="large" shape="circle" icon="arrow-down" />
                    <a-button @click="handleModuleRemove(item)" type="danger" size="large" shape="circle" icon="delete" />
                  </div>
              </div>
              <div class="page-module-setting" v-if="item.showSetting">
                <ConfigForm :configuration="item.configuration" v-on:onChange="handleConfigurationChange(item, arguments)">
                  <template slot="footer">
                    <a-button @click="handleSettingClose(item)">关闭</a-button>
                  </template>
                </ConfigForm>
              </div>
            </div>
          </div>
        </div>
        <iframe class="preview-box" v-else slot="main" :src="previewUrl"></iframe>
        <div class="page-stage-footer button_group" slot="footer">
          <a-button @click="handlePreviewPage">预览</a-button>
          <a-button @click="handleSave" type="primary">保存</a-button>
        </div>
      </Preview>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>

<script>
import {getFactory, createPageUrl, getUUId} from '../../../Tools/common';
import {transformConfig} from '../../../Tools/formatConversion';
import ModuleCard from '../../../components/Common/ModuleCard';
import Preview from '../../../components/Common/Preview';
import ConfigForm from '../../../components/Common/ConfigForm';
import Utils from 'mem-utils';
import qrcode from 'qrcode';
export default {
  data: () => ({
    msg: 'stage',
    moduleList: [],
    pageModules: [],
    previewUrl: ''
  }),
  created() {
    this.fetchModuleList();
  },
  methods: {
    fetchModuleList() {
      this.$get('/api/mokuai/search').then(res => {
        this.moduleList = res.data;
      })
    },
    handleClosePreview() {
      if (this.previewUrl) {
        this.previewUrl = '';
      } else {
        this.pageModules = [];
      }
    },
    handleModuleSetting(item) {
      this.pageModules = this.pageModules.map(local => {
        return {
          ...local,
          ...(item.id === local.id ? {showSetting: true} : {})
        }
      })
    },
    handleSettingClose(item) {
      this.pageModules = this.pageModules.map(local => {
        return {
          ...local,
          ...(item.id === local.id ? {showSetting: false} : {})
        }
      })
    },
    handleConfigurationChange(item, [field, value]) {
      this.pageModules = this.pageModules.map(local => {
        if (local.id === item.id) {
          // 给配置赋值
          local.configuration.forEach(conf => {
            if (conf.key === field) {
              conf.value = value;
            }
          })
          item.isDirty = true;
        }
        return {
          ...local
        }
      })
    },
    handleModuleRemove(item) {
      this.pageModules = this.pageModules.filter(mod => mod.id !== item.id);
    },
    handleModuleMove(currentIndex, isUp) {
      let nextPageModules = [...this.pageModules];
      const currentItem = nextPageModules[currentIndex];
      const targetIndex = currentIndex + (isUp ? -1 : 1);
      const targetItem = nextPageModules[targetIndex];
      nextPageModules[currentIndex] = targetItem;
      nextPageModules[targetIndex] = currentItem;
      this.pageModules = nextPageModules;
    },
    handleAdd(item) {
      let ret = Utils.extend(true, {} , item);
      ret.configuration = this.getConfiguration(item.config);
      ret.id = item.key + '-' + getUUId();
      this.pageModules = [...this.pageModules, ret];
    },
    getConfiguration(configString) {
      try {
        let func = getFactory(configString);
        let configuration = func() || [];
        configuration.forEach(item => {
          item.value = item.defaultValue;
        });
        return configuration;
      } catch(e) {
        return [];
      }
    },

    handlePreviewPage() {
      const {pageModules} = this;
      const postData = {
        mokuais: pageModules.map(item => ({
          ...item,
          configuration: transformConfig(item.configuration)
        }))
      }
      this.$post('/api/page/preview', postData).then(res => {
        const htmlString = res.data;
        let previewUrl = createPageUrl(htmlString);
        this.previewUrl = previewUrl;
      })
    },
    handleSave() {
      const {pageModules} = this;
      const postData = {
        mokuais: pageModules.map(item => ({
          ...item,
          configuration: transformConfig(item.configuration)
        }))
      }
      this.$post('/api/page/create', postData).then(res => {
        let {url} = res.data;
        qrcode.toDataURL(url, (err, qrcodeUrl) => {
            this.$nextTick(() => {
                this.$preview.show(qrcodeUrl, url);
            })
        })
      })
    }
  },
  components: {
    ModuleCard,
    Preview,
    ConfigForm
  },
}
</script>