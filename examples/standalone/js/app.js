//Change the paths below as needed

import {webComponents} from '../../mg-webComponents.js';
import {getConfigs} from './page-config.js';

document.addEventListener('DOMContentLoaded', function() {

    let page_configs = getConfigs(webComponents);

    let context = {
      paths: {
        adminui: './components/adminui/components/'
      },
      resourcePath: '/components/adminui/',
    };

    webComponents.setLog(true);

    // register the content page configurations, ready for lazy loading on demand

    for (let name in page_configs.contentPages) {
      webComponents.register(name, page_configs.contentPages[name]);
    }

    // load up the admin ui

    let body = document.getElementsByTagName('body')[0];

    webComponents.loadWebComponent('adminui-root', body, context, function(root) {
      webComponents.loadGroup(page_configs.sidebar, root.sidebarTarget, context);
      webComponents.loadGroup(page_configs.topbar, root.topbarTarget, context);
      webComponents.loadGroup(page_configs.contentPages.dashboard, root.contentTarget, context);
      webComponents.loadGroup(page_configs.footer, root.footerTarget, context);
      webComponents.loadGroup(page_configs.login_modal, body, context);
    });

});
