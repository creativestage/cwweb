<template>
  <div class="flex-container module-edit-contianer">
      <CodeEditor
        :mokuai="$store.state.moduleEdit.module" :handleChange="handleChange"
        v-on:save="handleSave">
      </CodeEditor>
    
    <div class="config-setting">
      <ConfigForm :configuration="configuration" v-on:onChange="handleConfigurationChange">
        <div slot="footer">
          <a-button class="text-primary" @click="handlePreview">预览</a-button>
        </div>
      </ConfigForm>
    </div>
    <div class="preview-wrap">
      <Preview :handleClose="handleClosePreview" :title="'页面预览'">
       <iframe class="preview-box" v-if="$store.state.moduleEdit.previewUrl" slot="main" :src="$store.state.moduleEdit.previewUrl"></iframe>
      </Preview>
    </div>
  </div>
</template>

<style scoped>
.module-edit-contianer {
  height: 100%;
  display: grid;
  grid-template-columns: 600px 1fr 1fr;
  grid-template-rows: auto-fill;
  grid-column-gap: 8px;
}
.config-setting {
  margin: 0 16px;
  padding-top: 72px;
  height: 600px;
  box-sizing: border-box;
}
.preview-box {
  border: none;
  outline: none;
  height: 100%;
}
.preview-wrap {
  padding-top: 72px;
  height: 600px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import {createPageUrl} from '../../../Tools/common';
import {transformConfig} from '../../../Tools/formatConversion';
import CodeEditor from '../../../components/Common/CodeEditor';
import ConfigForm from '../../../components/Common/ConfigForm';
import Preview from '../../../components/Common/Preview';
export default {
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
  mounted() {
    if (this.$route.query.id) {
      this.fetchDetail(this.$route.query.id);
    } else {
      this.$store.dispatch('initModule')
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
        this.$store.dispatch('setModule', res.data)
      });
    },
    handleSave() {
      const {module} = this.$store.state.moduleEdit;
      const path = module._id ? '/api/mokuai/update' : '/api/mokuai/create'
      this.$post(path, module).then(res => {
        if (res.success) {
          this.$notification.success({message: '保存成功'});
          // this.$store.dispatch('initModule')
        }
      })
    },
    handlePreview() {
      const {moduleEdit} = this.$store.state;
      const postData = {
        mokuais: [{
          ...moduleEdit.module,
          id: moduleEdit.module.key,
          configuration: transformConfig(this.configuration)
        }]
      }
      this.$post('/api/page/preview', postData).then(res => {
        const htmlString = res.data;
        let previewUrl = createPageUrl(htmlString);
        this.$store.dispatch('setPreviewUrl', previewUrl);
      })
    },
    handleClosePreview() {
      this.$store.dispatch('setPreviewUrl', '');
    }
  }
}
</script>