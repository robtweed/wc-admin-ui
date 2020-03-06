export function getConfigs(webComponents) {

  //          **** sidebar ****

  let sidebar = [
    {
      componentName: 'adminui-sidebar-brand',
      state: {
        title: 'DOM Editor',
        icon: 'bezier-curve',
        contentPage: 'dashboard',
      }
    },
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
      }
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
          text: 'This is the Dashboard Page'
        }
      }
    ]
  };

  let charts = {
    componentName: 'contentPage',
    state: {
      name: 'charts',
      title: 'Charts',
      cardTitle: 'Charts Card',
      cardTitleColour: 'success',
      cardName: 'charts-card',
      text: 'This is the Charts Page content....'
    }
  };

  let tables = {
    componentName: 'contentPage',
    state: {
      name: 'tables',
      title: 'Tables',
      cardTitle: 'Tables Card',
      cardTitleColour: 'warning',
      cardName: 'tables-card',
      text: 'This is the Tables Page content....'
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


  let configs = {
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
    }
  };

  return configs;
}
