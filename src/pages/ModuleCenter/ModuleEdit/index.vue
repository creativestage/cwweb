<template>
  <div class="flex-container">
    <CodeEditor :mokuai="$store.state.moduleEdit.module" :handleChange="handleChange"></CodeEditor>
    <div class="config-setting">
      <ConfigForm :configuration="configuration" v-on:onChange="handleConfigurationChange">
        <div slot="footer">
          <a-button @click="handlePreview">预览</a-button>
        </div>
      </ConfigForm>
    </div>
    <Preview>
      <iframe class="preview-box" v-if="$store.state.moduleEdit.previewUrl" slot="main" :src="$store.state.moduleEdit.previewUrl"></iframe>
    </Preview>
  </div>
</template>

<style scoped>
.config-setting {
  margin: 0 16px;
  width: 320px;
  /* padding-top: 72px; */
  height: 600px;
  box-sizing: border-box;
}
.preview-box {
  border: none;
  outline: none;
  height: 100%;
}
</style>

<script>
import { mapGetters } from 'vuex'
import {getUUId, createPageUrl} from '../../../Tools/common';
import {transformConfig} from '../../../Tools/formatConversion';
import CodeEditor from '../../../components/Common/CodeEditor';
import ConfigForm from '../../../components/Common/ConfigForm';
import Preview from '../../../components/Common/Preview';
export default {
  data: () => ({
    previewUrl: '',
    mokuai: {
      title: '',
      key: getUUId(),
      html: '',
      js: '',
      css: '',
      config: '[]'
    }
  }),
  components: {
    CodeEditor,
    Preview,
    ConfigForm
  },
  computed: {
    ...mapGetters([
      'configuration',
    ])
  },
  watch: {
    '$route.query.id': function (newId) {
      this.fetchDetail(newId);
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.fetchDetail(this.$route.query.id);
    }
  },
  methods: {
    handleChange(field, value) {
      this.$store.dispatch('modifyModuleInfo', {
        [field]: value
      })
    },
    handleConfigurationChange(field, value) {
      this.$store.dispatch('editConfiguration', {
        [field]: value
      })
    },
    fetchDetail(id) {
      this.$get('/api/mokuai/find', {id}).then(res => {
        this.mokuai = res.data;
      });
    },
    handleSave() {
      const {mokuai} = this;
      this.$post('/api/mokuai/create', mokuai).then(res => {
        console.log(res);
      })
    },
    handlePreview() {
      const {moduleEdit} = this.$store.state;
      const postData = {
        title: moduleEdit.module.name,
        mokuais: [{
          ...moduleEdit.module,
          config: transformConfig(this.configuration)
        }]
      }
      this.$post('/api/page/preview', postData).then(res => {
        const htmlString = res.data;
        let previewUrl = createPageUrl(htmlString);
        console.log(previewUrl)
        this.$store.dispatch('setPreviewUrl', previewUrl);
      })
    }
  }
}
</script>