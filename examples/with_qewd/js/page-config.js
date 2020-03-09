export function getConfigs(QEWD, webComponents) {

  let hooks = {};

  //          **** login modal ****

  let login_modal = {
    componentName: 'adminui-modal-root',
    state: {
      name: 'modal-login',
      static: true
    },
    children: [
      {
        componentName: 'adminui-modal-header',
        state: {
          title: 'Login'
        }
      },
      {
        componentName: 'adminui-modal-body',
        children: [
          {
            componentName: 'adminui-form',
            state: {
              name: 'loginForm',
              cls: 'user'
            },
            children: [
              {
                componentName: 'adminui-form-field',
                state: {
                  label: 'Username:',
                  placeholder: 'Enter username...',
                  name: 'username',
                  focus: true
                }
              },
              {
                componentName: 'adminui-form-field',
                state: {
                  type: 'password',
                  label: 'Password:',
                  placeholder: false,
                  name: 'password'
                }
              }
            ]
          }
        ]
      },
      {
        componentName: 'adminui-modal-footer',
        children: [
          {
            componentName: 'adminui-button',
            state: {
              text: 'Login',
              colour: 'success',
              cls: 'btn-block'
            },
            hooks: ['login']
          }
        ]
      }
    ]
  };

  hooks['adminui-button'] = {
    login: function() {
      let modal = this.getParentComponent({match: 'adminui-modal-root'});
      let _this = this;

      let kpfn =  function(e){
        if(e.which == 13) {
          // click the button to submit the form
          _this.rootElement.focus();
          _this.rootElement.click();
        }
      };

      modal.addHandler(kpfn, 'keypress');

      let fn = function() {
        let form = webComponents.getComponentByName('adminui-form', 'loginForm');
        QEWD.send({
          type: 'login',
          params: form.fieldValues
        }, function(responseObj) {
          if (responseObj.message.error) {
            toastr.error('Invalid login attempt');
          }
          else {
            let modal = webComponents.getComponentByName('adminui-modal-root', 'modal-login');
            modal.hide();
            modal.remove();
            let root = webComponents.getComponentByName('adminui-root', 'root');
            webComponents.loadGroup(configs.sidebar, root.sidebarTarget, root.context);
            webComponents.loadGroup(configs.topbar, root.topbarTarget, root.context);
            webComponents.loadGroup(configs.contentPages.dashboard, root.contentTarget, root.context);
          }
        });
      };
      this.addHandler(fn);
    }
  };

  let initial_sidebar = {
    componentName: 'adminui-sidebar-brand',
    state: {
      title: 'DOM Editor',
      icon: 'bezier-curve',
      contentPage: 'dashboard',
    }
  };


  //          **** sidebar ****

  let sidebar = [
    /*
    {
      componentName: 'adminui-sidebar-brand',
      state: {
        title: 'DOM Editor',
        icon: 'bezier-curve',
        contentPage: 'dashboard',
      }
    },
    */
    {
      componentName: 'adminui-sidebar-divider',
      state: {
        isTop: true
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Dashboard',
        icon: 'tachometer-alt',
        contentPage: 'dashboard',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-heading',
      state: {
        title: 'Interface'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-collapse-menu',
      state: {
        heading: 'Components',
        icon: 'cog'
      },
      children: [
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Custom Components'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Buttons',
                contentPage: 'buttons'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Cards',
                contentPage: 'cards'
              }
            }
          ]
        }
      ]
    },
    {
      componentName: 'adminui-sidebar-nav-collapse-menu',
      state: {
        heading: 'Custom Utilities',
        icon: 'wrench'
      },
      children: [
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Custom Utilities'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Colours',
                contentPage: 'colours'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Borders',
                contentPage: 'borders'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Animations',
                contentPage: 'animations'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Other',
                contentPage: 'other'
              }
            }
          ]
        }
      ]
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-heading',
      state: {
        title: 'Addons'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-collapse-menu',
      state: {
        heading: 'Pages',
        icon: 'folder'
      },
      children: [
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Login Screens'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Login',
                contentPage: 'login'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Register',
                contentPage: 'register'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Forgot Password',
                contentPage: 'forgot_password'
              }
            }
          ]
        },
        {
          componentName: 'adminui-sidebar-nav-menu-popup',
          state: {
            title: 'Other Pages'
          },
          children: [
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: '404 Page',
                contentPage: 'page404'
              }
            },
            {
              componentName: 'adminui-sidebar-nav-menu-popup-option',
              state: {
                text: 'Blank Page',
                contentPage: 'blank'
              }
            }
          ]
        }
      ]
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Charts',
        icon: 'chart-area',
        contentPage: 'charts'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Tables',
        icon: 'table',
        contentPage: 'tables'
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-toggler',
    }
  ];

  //          **** topbar ****

  let topbar = [
    {
      componentName: 'adminui-topbar-toggler'
    },
    {
      componentName: 'adminui-topbar-search',
      state: {
        placeholder: 'enter search..'
      },
      hooks: ['search']
    },
    {
      componentName: 'adminui-topbar-navbar',
      children: [
        {
          componentName: 'adminui-topbar-navbar-dropdown',
          state: {
            ref: 'alerts',
            icon: 'bell',
            title: 'Your Alerts'
          },
          hooks: ['getMessages']
        },
        {
          componentName: 'adminui-topbar-navbar-dropdown',
          state: {
            ref: 'messages',
            icon: 'envelope',
            title: 'Your Messages'
          },
          hooks: ['getMessages']
        },
        {
          componentName: 'adminui-topbar-divider'
        },
        {
          componentName: 'adminui-topbar-navbar-menu',
          state: {
            ref: 'topmenu',
            title: 'Your Options'
          },
          hooks: ['getOptions']
        },
        {
          componentName: 'adminui-topbar-divider'
        },
        {
          componentName: 'adminui-topbar-text',
          state: {
            text: 'My Application',
            colour: 'warning'
          }
        },
        {
          componentName: 'adminui-topbar-divider'
        }
      ]
    }
  ];

  hooks['adminui-topbar-search'] = {
    search: function() {
      let _this = this;
      let fn = function() {
        QEWD.send({
          type: 'search',
          value: _this.searchField.value
        }, function(responseObj) {
          console.log(responseObj);
        });
      };
      this.addHandler(fn, this.searchBtn);
    }
  };

  hooks['adminui-topbar-navbar-dropdown'] = {
    getMessages: function() {
      let _this = this;
      let fn = function(responseObj) {
        _this.handleItemsUpdate(responseObj.message);
      };
      QEWD.on('getDropdownItems', fn);
      this.onUnload = function() {
        QEWD.off('getDropdownItems', fn);
      }
      QEWD.send({
        type: 'getDropdownItems',
        ref: _this.ref
      });
    }
  };

  hooks['adminui-topbar-navbar-menu'] = {
    getOptions: function() {
      let _this = this;
      var fn = function(responseObj) {
        _this.handleItemsUpdate(responseObj.message);
      };
      QEWD.on('getMenuItems', fn);
      this.onUnload = function() {
        QEWD.off('getMenuItems', fn);
      }
      QEWD.send({
        type: 'getMenuItems',
        ref: _this.ref
      });
    }
  };


  hooks['adminui-topbar-navbar-menu-item'] = {
    getMenuDetail: function(state) {
      let _this = this;
      let fn = function() {
        QEWD.send({
          type: 'getMenuDetail',
          ref: state.ref,
          itemId: state.itemId
        }, function(responseObj) {
        });
      };
      this.addHandler(fn, this.aTag);
    }
  };

  //          **** footer ****

  let footer = {
    componentName: 'adminui-footer-copyright',
    state: {
      copyright_text: 'M/Gateway Developments Ltd'
    }
  };


  //          **** content pages ****


  // create a custom page template component


  let contentPageComponent = {
    componentName: 'adminui-content-page',
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: '__title'
        }
      },
      {
        componentName: 'adminui-row',
        children: [
          {
            componentName: 'adminui-content-card',
            state: {
              title: '__cardTitle',
              title_colour: '__cardTitleColour',
              name: '__cardName',
              text: '__text'
            },
            children: '__children'
          }
        ]
      }
    ]
  };

  webComponents.createCustomComponent('contentPage', contentPageComponent);


  //Now define the content pages as instances of this custom component

  let dashboard = {
    componentName: 'contentPage',
    state: {
      name: 'dashboard',
      show: true,
      title: 'Dashboard',
      cardTitle: 'Dashboard Card',
      cardTitleColour: 'danger',
      cardName: 'dashboard-card'
    },
    children: [
      {
        componentName: 'adminui-span',
        state: {
          fragmentName: 'myTestContent.html'
        },
        hooks: ['getFragment']
      }
    ]
  };


  hooks['adminui-span'] = {
    getFragment: function(state) {
      let _this = this;
      QEWD.getFragment({
        name: state.fragmentName,
        targetElement: _this.childrenTarget
      }, function(file) {
      });
    }
  };


  let charts = {
    componentName: 'adminui-content-page',
    state: {
      name: 'charts'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Charts'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          title: 'Charts Card',
          title_colour: 'warning',
          name: 'charts-card'
        },
        children: [
          {
            componentName: 'adminui-chart',
            hooks: ['getChartData']
          }
        ]
      }
    ]
  };

  hooks['adminui-chart'] = {
    getChartData: function() {
      let config = {
        type: 'doughnut',
        data: {
          labels: ["Direct", "Referral", "Social"],
          datasets: [{
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      };

      this.draw(config);
    }
  }


  let tables = {
    componentName: 'adminui-content-page',
    state: {
      name: 'tables'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Tables'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          title: 'Tables Card',
          title_colour: 'warning',
          name: 'tables-card'
        },
        children: [
          {
            componentName: 'adminui-datatables',
            hooks: ['getTableData']
          }
        ]
      }
    ]
  };

  hooks['adminui-datatables'] = {
    getTableData: function() {
      let _this = this;
      QEWD.send({
        type: 'getTableData',
        ref: this.name
      }, function(responseObj) {
        let obj = responseObj.message.data;
        _this.render(obj);

        /*
        setTimeout(function() {
          console.log('xxxxx');
          console.log(_this.datatable);
          //_this.datatable.clear().draw();
          //_this.remove();
        }, 4000);
        */

        _this.onCellClicked = function(cell) {
          console.log('clicked cell with value ' + cell.data());
          console.log(this);
          console.log(cell);
          console.log(cell.index());
          //cell.data('New Value');
          //cell.draw();
        };

      });
    }
  };

  let buttons = {
    componentName: 'contentPage',
    state: {
      name: 'buttons',
      title: 'Buttons',
      cardTitle: 'Buttons Card',
      cardTitleColour: 'primary',
      cardName: 'buttons-card',
      text: 'This is the Buttons Page content....'
    }
  };

  let cards = {
    componentName: 'contentPage',
    state: {
      name: 'cards',
      title: 'Cards',
      cardTitle: 'Cards!',
      cardTitleColour: 'success',
      cardName: 'cards-card',
      text: 'This is the Cards Page content....'
    }
  };

  let colours = {
    componentName: 'contentPage',
    state: {
      name: 'colours',
      title: 'Colours',
      cardTitle: 'Colours Card',
      cardTitleColour: 'warning',
      cardName: 'colours-card',
      text: 'This is the Colours Page content....'
    }
  };

  let borders = {
    componentName: 'contentPage',
    state: {
      name: 'borders',
      title: 'Borders',
      cardTitle: 'Borders Card',
      cardTitleColour: 'danger',
      cardName: 'borders-card',
      text: 'This is the Borders Page content....'
    }
  };

  let animations = {
    componentName: 'contentPage',
    state: {
      name: 'animations',
      title: 'Animations',
      cardTitle: 'Animations Card',
      cardTitleColour: 'info',
      cardName: 'animations-card',
      text: 'This is the Animations Page content....'
    }
  };

  let other = {
    componentName: 'contentPage',
    state: {
      name: 'other',
      title: 'Other',
      cardTitle: 'Other Card',
      cardTitleColour: 'info',
      cardName: 'other-card',
      text: 'This is the Other Page content....'
    }
  };

  let login = {
    componentName: 'contentPage',
    state: {
      name: 'login',
      title: 'Login',
      cardTitle: 'Login Card',
      cardTitleColour: 'success',
      cardName: 'login-card',
      text: 'This is the Login Page content....'
    }
  };

  let register = {
    componentName: 'contentPage',
    state: {
      name: 'register',
      title: 'Register',
      cardTitle: 'Register Card',
      cardTitleColour: 'warning',
      cardName: 'register-card',
      text: 'This is the Register Page content....'
    }
  };

  let forgot_password = {
    componentName: 'contentPage',
    state: {
      name: 'forgot_password',
      title: 'Forgot Password',
      cardTitle: 'Forgot Password Card',
      cardTitleColour: 'danger',
      cardName: 'forgot-password-card',
      text: 'This is the Forgot Password Page content....'
    }
  };

  let page404 = {
    componentName: 'contentPage',
    state: {
      name: 'page404',
      title: 'Page 404',
      cardTitle: 'Page 404 Card',
      cardTitleColour: 'danger',
      cardName: 'page404-card',
      text: 'This is the Page404 content....'
    }
  };

  let blank = {
    componentName: 'contentPage',
    state: {
      name: 'blank',
      title: 'Blank',
      cardTitle: 'Blank Card',
      cardTitleColour: 'info',
      cardName: 'blank-card',
      text: 'This is the Blank Page content....'
    }
  };

  let modal_page = {
    componentName: 'adminui-modal-root',
    state: {
      name: 'modal-login'
    },
    children: [
      {
        componentName: 'adminui-modal-header',
        state: {
          title: 'Login'
        },
        children: [
          {
            componentName: 'adminui-modal-close-button',
          }
        ]
      },
      {
        componentName: 'adminui-modal-body',
        children: [
          {
            componentName: 'adminui-form',
            state: {
              name: 'loginForm',
              cls: 'user'
            },
            children: [
              {
                componentName: 'adminui-form-field',
                state: {
                  label: 'Username:',
                  placeholder: 'Enter username...',
                  name: 'username'
                }
              },
              {
                componentName: 'adminui-form-field',
                state: {
                  type: 'password',
                  label: 'Password:',
                  placeholder: false,
                  name: 'password'
                }
              }
            ]
          }
        ]
      },
      {
        componentName: 'adminui-modal-footer',
        children: [
          {
            componentName: 'adminui-modal-cancel-button',
          },
          {
            componentName: 'adminui-button',
            state: {
              text: 'Login',
              colour: 'success',
              cls: 'btn-block'
            },
            hooks: ['login']
          }
        ]
      }
    ]
  };


  let configs = {
    login_modal: login_modal,
    initial_sidebar,
    sidebar: sidebar,
    topbar: topbar,
    footer: footer,
    contentPages: {
      dashboard, dashboard,
      charts: charts,
      tables: tables,
      buttons: buttons,
      cards: cards,
      colours: colours,
      borders: borders,
      animations: animations,
      other: other,
      login: login,
      register: register,
      forgot_password: forgot_password,
      page404: page404,
      blank: blank
    },
    hooks: hooks
  };

  return configs;
}
