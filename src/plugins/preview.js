import Vue from 'vue';

const PreviewPlugin = {
    install(Vue) {
        let previewDom;
        Vue.prototype.$preview = {
            show(qrcode, url) {
                const tmpl = `<img src="${qrcode}"/>
                <p class="preview-url">${url}</p>
                <p class="preview-box-btn">取消预览</p>
                <style>
                    .preview-view {
                        position: fixed;
                        left: 0;
                        top: 0;
                        z-index: 999;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: rgba(200, 200, 200, 0.7);
                    }
                    .preview-view img {
                        width: 200px;
                        height:200px;
                    }
                    .preview-url {
                        text-align: center;
                        color: #f00;
                    }
                    .preview-box-btn {
                        display: inline-block;
                        padding: 12px 20px;
                        border-radius: 4px;
                        background: #fff;
                        cursor: pointer;
                    }
                </style>`;

                const div = document.createElement('div');
                div.innerHTML = tmpl;
                div.className = 'preview-view';
                previewDom = div;
                previewDom.addEventListener('click', (ev) => {
                    if (ev.target.className.indexOf('preview-box-btn') > -1) {
                        document.body.removeChild(previewDom);
                    }
                }, false);
                
                document.body.appendChild(div);
            },
            hide() {
                document.body.removeChild(previewDom);
            }
        }
    }
};

Vue.use(PreviewPlugin);