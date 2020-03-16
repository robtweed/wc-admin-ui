export function define_users_page(QEWD, webComponents) {

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'users'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Users'
        }
      },
      {
        componentName: 'adminui-row',
        children: [
          {
            componentName: 'adminui-content-card',
            state: {
              name: 'users-card'
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                children: [
                  {
                    componentName: 'adminui-content-card-button-title',
                    state: {
                      title: 'Current Users',
                      title_colour: 'info',
                      icon: 'user-plus',
                      buttonColour: 'success',
                      tooltip: 'Add a new User'
                    },
                    hooks: ['addUser']
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-body',
                children: [
                  {
                    componentName: 'adminui-table',
                    state: {
                      headers: ['User Id', 'Name', 'Select'],
                    },
                    hooks: ['getUsers']
                  }
                ]
              }
            ]
          },
          {
            componentName: 'adminui-content-card',
            state: {
              name: 'user-details-card',
              hide: true
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                children: [
                  {
                    componentName: 'adminui-content-card-button-title',
                    state: {
                      title: 'User Details',
                      title_colour: 'info',
                      icon: 'user-cog',
                      buttonColour: 'success',
                      tooltip: 'Edit User Details'
                    },
                    hooks: ['editUser']
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-body',
                state: {
                  name: 'user-data'
                },
                children: [
                  {
                    componentName: 'adminui-form',
                    state: {
                      name: 'user-details'
                    },
                    children: [
                      {
                        componentName: 'adminui-form-field',
                        state: {
                          name: 'name',
                          type: 'text',
                          label: 'Name',
                          readonly: true,
                          row: 4
                        }
                      },
                      {
                        componentName: 'adminui-form-field',
                        state: {
                          name: 'username',
                          type: 'text',
                          label: 'Username',
                          readonly: true,
                          row: 4
                        }
                      },
                      {
                        componentName: 'adminui-form-field',
                        state: {
                          name: 'email',
                          type: 'email',
                          label: 'Email',
                          readonly: true,
                          row: 4
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  let showUserBtn = {
    componentName: 'adminui-button',
    state: {
      icon: 'user-edit',
      colour: 'info'
    },
    hooks: ['getUserInfo']
  };

  let hooks = {
    'adminui-table': {
      getUsers: function() {
        let table = this;
        QEWD.send({
          type: 'getUsers'
        }, function(responseObj) {
          if (!responseObj.message.error) {
            let data = [];
            responseObj.message.users.forEach(function(user) {
              let row = [
                {value: user.id},
                {value: user.name},
                {value: ''}
 
              ];
              data.push(row);
            });
            table.setState({data: data});
            table.cell.forEach(function(row, index) {
              let td = row[2];
              td.id = 'user-' + responseObj.message.users[index].id;
              webComponents.loadGroup(showUserBtn, td, table.context);
            });
          }
        });
      }
    },
    'adminui-button': {
      getUserInfo: function() {
        let _this = this;
        let id = this.parentNode.id.split('user-')[1];
        let card = this.getComponentByName('adminui-content-card', 'user-details-card');
        let form = this.getComponentByName('adminui-form', 'user-details');
        let fn = function() {
          QEWD.send({
            type: 'getUserInfo',
            params: {
              id: id
            }
          }, function(responseObj) {
            if (!responseObj.message.error) {
              card.show();
              let user = responseObj.message.user;

              let title = card.querySelector('adminui-content-card-button-title');
              title.setState({title: user.name});

              for (let name in user) {
                if (form.field[name]) {
                  form.field[name].setState({
                    value: user[name],
                    readonly: true
                  });
                }
              }
            }
          });
        };
        this.addHandler(fn, this.rootElement);
      }
    },
    'adminui-content-card-button-title': {
      editUser: function() {
        let _this = this;
        let form = this.getComponentByName('adminui-form', 'user-details');
        let fn = function() {
          let field;
          for (let name in form.field) {
            field = form.field[name];
            field.setState({readonly: false});
          }
        };
        this.addHandler(fn, this.button);
      }
    }
  };

  return {component, hooks};
};

