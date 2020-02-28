import {webComponents} from '../../mg-webComponents.js';

/*

 mg-webComponents installed in /opt/qewd/mapped/www

  This index.js file is in /opt/qewd/mapped/www/exampleApp

  The wc-admin-ui components should have been copied from
  the repo's /components folder into:

    /opt/qewd/mapped/www/exampleApp/js

  This folder should also contain the contents of this repo's js
  folder, ie:

    /opt/qewd/mapped/www/exampleApp/js/bootstrap
    /opt/qewd/mapped/www/exampleApp/js/jquery-easing
    /opt/qewd/mapped/www/exampleApp/js/jquery
    /opt/qewd/mapped/www/exampleApp/js/sb-admin

  The /opt/qewd/mapped/www/exampleApp/css folder should contain
  the contents of this repo's css folder, ie:

    /opt/qewd/mapped/www/exampleApp/css/fontawesome-free
    /opt/qewd/mapped/www/exampleApp/css/sb-admin
    /opt/qewd/mapped/www/exampleApp/css/webfonts

  Note the options object towards the end of this file
  This tells mg-webComponents where to find the web components for
  this example application

*/


document.addEventListener('DOMContentLoaded', function() {

  webComponents.setLog(true);

  var menuOptions = [
    {
      componentName: 'component-topbar-navbar-menu-item',
      state: {
        title: 'Option 1',
        icon: 'user',
        itemId: 1
      }
    },
    {
      componentName: 'component-topbar-navbar-menu-item',
      state: {
        title: 'Option 2',
        icon: 'cogs',
        itemId: 2
      }
    },
    {
      componentName: 'component-topbar-navbar-menu-divider'
    },
    {
      componentName: 'component-topbar-navbar-menu-item',
      state: {
        title: 'Option 3',
        icon: 'sign-out-alt',
        use_modal: 'logout',
        itemId: 3
      }
    }
  ];

  var config = {
    sidebar: [
      {
        componentName: 'component-sidebar-brand',
        state: {
          title: 'DOM Editor',
          icon: 'bezier-curve',
          contentPage: 'dashboard',
        }
      },
      {
        componentName: 'component-sidebar-divider',
        state: {
          isTop: true
        }
      },
      {
        componentName: 'component-sidebar-nav-item',
        state: {
          title: 'Dashboard',
          icon: 'tachometer-alt',
          contentPage: 'dashboard',
          active: true
        }
      },
      {
        componentName: 'component-sidebar-divider',
      },
      {
        componentName: 'component-sidebar-heading',
        state: {
          title: 'Interface'
        }
      },
      {
        componentName: 'component-sidebar-nav-collapse-menu',
        state: {
          heading: 'Components',
          icon: 'cog',
          children: [
            {
              componentName: 'component-sidebar-nav-menu-popup',
              state: {
                title: 'Custom Components',
                children: [
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Buttons',
                      contentPage: 'buttons'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Cards',
                      contentPage: 'cards'
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        componentName: 'component-sidebar-nav-collapse-menu',
        state: {
          heading: 'Custom Utilities',
          icon: 'wrench',
          children: [
            {
              componentName: 'component-sidebar-nav-menu-popup',
              state: {
                title: 'Custom Utilities',
                children: [
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Colours',
                      contentPage: 'colours'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Borders',
                      contentPage: 'borders'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Animations',
                      contentPage: 'animations'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Other',
                      contentPage: 'other'
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        componentName: 'component-sidebar-divider',
      },
      {
        componentName: 'component-sidebar-heading',
        state: {
          title: 'Addons'
        }
      },
      {
        componentName: 'component-sidebar-nav-collapse-menu',
        state: {
          heading: 'Pages',
          icon: 'folder',
          children: [
            {
              componentName: 'component-sidebar-nav-menu-popup',
              state: {
                title: 'Login Screens',
                children: [
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Login',
                      contentPage: 'login'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Register',
                      contentPage: 'register'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Forgot Password',
                      contentPage: 'forgot_password'
                    }
                  }
                ]
              }
            },
            {
              componentName: 'component-sidebar-nav-menu-popup',
              state: {
                title: 'Other Pages',
                children: [
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: '404 Page',
                      contentPage: 'page404'
                    }
                  },
                  {
                    componentName: 'component-sidebar-nav-menu-popup-option',
                    state: {
                      text: 'Blank Page',
                      contentPage: 'blank'
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        componentName: 'component-sidebar-nav-item',
        state: {
          title: 'Charts',
          icon: 'chart-area',
          contentPage: 'charts'
        }
      },
      {
        componentName: 'component-sidebar-nav-item',
        state: {
          title: 'Tables',
          icon: 'table',
          contentPage: 'tables'
        }
      },
      {
        componentName: 'component-sidebar-divider',
      },
      {
        componentName: 'component-sidebar-toggler',
      }
    ],
    topbar: [
      {
        componentName: 'component-topbar-toggler'
      },
      {
        componentName: 'component-topbar-search',
        state: {
          placeholder: 'enter search..'
        }
      },
      {
        componentName: 'component-topbar-navbar',
        state: {
          children: [
            {
              componentName: 'component-topbar-navbar-dropdown',
              state: {
                ref: 'alerts',
                icon: 'bell',
                title: 'Your Alerts'
              }
            },
            {
              componentName: 'component-topbar-navbar-dropdown',
              state: {
                ref: 'messages',
                icon: 'envelope',
                title: 'Your Messages'
              }
            },
            {
              componentName: 'component-topbar-divider'
            },
            {
              componentName: 'component-topbar-navbar-menu',
              state: {
                ref: 'topmenu',
                title: 'Your Options',
                getMenuItems: function() {
                  let response = {
                    ref: 'topmenu',
                    items: menuOptions
                  };
                  this.handleItemsUpdate(response);
                }
              }
            },
            {
              componentName: 'component-topbar-divider'
            },
            {
              componentName: 'component-topbar-text',
              state: {
                text: 'My Application',
                colour: 'warning'
              }
            },
            {
              componentName: 'component-topbar-divider'
            }
          ]
        }
      }
    ],
    footer: [
      {
        componentName: 'component-footer-copyright',
        state: {
          copyright_text: 'M/Gateway Developments Ltd'
        }
      }
    ],
    contentPages: {
      dashboard: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'dashboard',
            show: true,
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Dashboard'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'My Card',
                        title_colour: 'warning',
                        name: 'my_card',
                        children: [
                          {
                            fragmentName: 'myTestContent.html'
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      charts: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'charts',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Charts'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Chart Card',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      tables: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'tables',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Tables'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Table Card',
                        title_colour: 'danger'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      buttons: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'buttons',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Buttons'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Button Card',
                        title_colour: 'danger'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      cards: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'cards',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Cards'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Card Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      colours: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'colours',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Colours'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Colour Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      borders: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'borders',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Borders'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Border Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      animations: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'animations',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Animations'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Animations Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      other: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'other',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Other'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Other Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      login: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'login',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Login'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Login Page Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      register: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'register',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Register'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'register Page Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      forgot_password: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'forgot_password',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Forgot Password'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Forgot Password Page Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      page404: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'page404',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: '404 Page'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: '404 Page Page Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      blank: [
        {
          componentName: 'component-content-page',
          state: {
            name: 'blank',
            children: [
              {
                componentName: 'component-content-page-header',
                state: {
                  title: 'Blank'
                }
              },
              {
                componentName: 'component-content-page-row',
                state: {
                  children: [
                    {
                      componentName: 'component-content-card',
                      state: {
                        title: 'Blank Page Information',
                        title_colour: 'success'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }

  };

  let options = {
    path: './exampleApp/js/'
  };
  webComponents.load('component-root', document.getElementsByTagName('body')[0], options, function(root) {

    for (var name in config.contentPages) {
      webComponents.register(name, config.contentPages[name]);
    }
    webComponents.loadGroup(config.sidebar, root.sidebarTarget, options);
    webComponents.loadGroup(config.topbar, root.topbarTarget, options);
    webComponents.loadGroup(config.contentPages.dashboard, root.contentTarget, options);
    webComponents.loadGroup(config.footer, root.footerTarget, options);
  });

});
