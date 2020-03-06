//Change the paths below as needed

import {webComponents} from '../../mg-webComponents.js';
import {getConfigs} from './page-config.js';

document.addEventListener('DOMContentLoaded', function() {

    let page_configs = getConfigs(webComponents);

    let options = {
      path: './exampleApp/js/'
    };

    webComponents.setLog(true);

    // register the content page configurations, ready for lazy loading on demand

    for (let name in page_configs.contentPages) {
      webComponents.register(name, page_configs.contentPages[name]);
    }

    // load up the admin ui

    let body = document.getElementsByTagName('body')[0];

    webComponents.load('adminui-root', body, options, function(root) {

      webComponents.loadGroup(page_configs.sidebar, root.sidebarTarget, options);
      webComponents.loadGroup(page_configs.topbar, root.topbarTarget, options);
      webComponents.loadGroup(page_configs.contentPages.dashboard, root.contentTarget, options);
      webComponents.loadGroup(page_configs.footer, root.footerTarget, options);
      webComponents.loadGroup(page_configs.login_modal, body, options);
    });

});
