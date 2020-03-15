<template>
  <div class="code-edit-container">
    <div class="code-container" v-if="mokuai">
      <a-tabs class="code-base-info" v-model="activeKey">
        <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.tab">
          <div class="editor-wrapper">
            <codemirror
              class="code-edit"
              :value="mokuai[item.key]"
              :options="item.cmOptions"
              @input="onChange"
            ></codemirror>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="基础信息" key="base">
          <div class="code-base-info">
            <div class="line-box">
              <div class="line-label">模块名</div>
              <div class="line-control">
                <a-input :value="mokuai.name" @input="handleInputChange('name', $event)" placeholder="请输入模块名" />
              </div>
            </div>
            <div class="line-box">
              <div class="line-label">海报贴图</div>
              <div class="line-control">
                <a-input  :value="mokuai.poster" @input="handleInputChange('poster', $event)" placeholder="请输入图片链接" />
              </div>
            </div>
            <div class="line-box">
              <div class="line-label">模块描述</div>
              <div class="line-control">
                <a-textarea  :value="mokuai.desc" @input="handleInputChange('desc', $event)" placeholder="请输入描述信息" />
              </div>
            </div>
            <div class="line-box">
              <div class="line-label"></div>
              <div class="line-control">
                 <a-button class="save-btn" @click="onSaveCode" type="primary">保存</a-button>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style lang="less">
.code-container {
  position: relative;
  width: 600px;
  height: 100%;
  display: flex;
}
.code-base-info {
  width: 100%;
  height: 100%;
}
.editor-wrapper {
  position: relative;
}
.code-edit {
  width: 100%;
  height: 100%;
  margin-left: 10px;
}
.render-btn {
  margin-top: 4px;
  margin-left: 12px;
  float: left;
}
.edit-title {
  text-align: center;
}
.CodeMirror {
  height: 540px;
}

.code-base-info {
  padding: 12px;
  .line-box {
    margin-bottom: 12px;
  }
}
</style>
 
<script>
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/vue/vue");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/show-hint.css");
require("codemirror/addon/hint/javascript-hint.js");
require("codemirror/mode/python/python.js")
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')

const codemirrorTabsConfig = [
  {
    tab: '模板',
    key: 'html',
    cmOptions: {
      tabSize: 4,
      mode: "text/html",
      theme: "darcula",
      lineNumbers: true,
      line: true
    }
  },
  {
    tab: '样式',
    key: 'css',
    cmOptions: {
      tabSize: 4,
      mode: "text/css",
      theme: "darcula",
      lineNumbers: true,
      line: true
    }
  },
  {
    tab: '脚本',
    key: 'js',
    cmOptions: {
      tabSize: 4,
      mode: "text/javascript",
      theme: "darcula",
      lineNumbers: true,
      line: true
    }
  },
  {
    tab: '配置',
    key: 'config',
    cmOptions: {
      tabSize: 4,
      mode: "text/javascript",
      theme: "darcula",
      lineNumbers: true,
      line: true
    }
  }
];

export default {
  props: {
    mokuai: Object,
    handleChange: Function
  },
  data() {
    return {
      tabs: codemirrorTabsConfig,
      activeKey: "html",
    };
  },
  methods: {
    onChange(newCode) {
      this.handleChange(this.activeKey, newCode)
    },
    handleInputChange(field, e) {
      const value = e.target.value;
      this.handleChange(field, value);
    },
    onSaveCode() {
      this.$emit("save");
    }
  }
};
</script>
