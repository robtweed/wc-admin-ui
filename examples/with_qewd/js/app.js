// Change the paths below if needed

import {webComponents} from '../../mg-webComponents.js';
import {QEWD} from '../../qewd-client.js';
import {getConfigs} from './page-config.js';

document.addEventListener('DOMContentLoaded', function() {

  QEWD.on('ewd-registered', function() {

    QEWD.log = true;

    let page_configs = getConfigs(QEWD, webComponents);

    let options = {
      path: './components/adminui/components/',
      resourcePath: '/components/adminui/',
      hooks: page_configs.hooks,
      readyEvent: new Event('ready')
    };

    webComponents.setLog(true);

    // register the content page configurations, ready for lazy loading on demand

    for (let name in page_configs.contentPages) {
      webComponents.register(name, page_configs.contentPages[name]);
    }

    // initial display during login

    let body = document.getElementsByTagName('body')[0];

    // The handler below is needed to ensure that all the JS resources are loaded before attempting
    // to show the modal, since this depends on jQuery being ready

    // The ready event is dispatched by the admin-root component
    //  It is available to the admin-root component via the options object which
    //  includes the ready event object

    document.addEventListener('ready', function() {
      let modal = webComponents.getComponentByName('adminui-modal-root', 'modal-login');
      modal.show();
    });
    
    // now load up the initial view

    webComponents.load('adminui-root', body, options, function(root) {
      webComponents.loadGroup(page_configs.initial_sidebar, root.sidebarTarget, options);
      webComponents.loadGroup(page_configs.login_modal, body, options);
      webComponents.loadGroup(page_configs.footer, root.footerTarget, options);
    });

  });

  QEWD.start({
    application: 'adminui-demo'
  });

});
