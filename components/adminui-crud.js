/*

 ----------------------------------------------------------------------------
 | admin-ui: SB2-Admin UI Theme WebComponents Library                        |
 |                                                                           |
 | Copyright (c) 2020 M/Gateway Developments Ltd,                            |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | http://www.mgateway.com                                                   |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 14 August 2020

*/

export function crud_assembly(QEWD, state) {

  state = state || {};
  state.name = state.name || 'crud-' + Date.now();
  //state.assemblyName = state.assemblyName || state.name;
  state.title = state.title || 'Record Maintenance Page';
  state.summary = state.summary || {};
  state.detail = state.detail || {};
  state.update = state.update || {};

  state.summary.headers = state.summary.headers || ['Name'];
  state.summary.data_properties = state.summary.data_properties || ['name'];
  if (state.summary.headers.length === state.summary.data_properties.length) {
      state.summary.headers.push('Select');
  };
  state.summary.qewd = state.summary.qewd || {};
  state.update.qewd = state.update.qewd || {};
  
  let formFields = {};
  let formFieldPropertyNames = {};
  if (state.detail.fields) {
    state.detail.fields.forEach(function(field, index) {
      if (field.name && !field.data_property) field.data_property = field.name;
      if (!field.name && field.data_property) field.name = field.data_property;
      formFields[field.data_property] = state.detail.fields[index];
      formFieldPropertyNames[field.name] = field.data_property;
    });
  }

  let component = {
    componentName: 'adminui-content-page',
    assemblyName: state.assemblyName,
    state: {
      name: state.name
    },
    hooks: ['loadModal'],
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: state.title
        }
      },
      {
        componentName: 'adminui-row',
        children: [
          {
            componentName: 'adminui-content-card',
            state: {
              name: state.name + '-summary-card'
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                children: [
                  {
                    componentName: 'adminui-content-card-button-title',
                    state: {
                      title: state.summary.title || 'Summary of Records',
                      title_colour: state.summary.titleColour || 'info',
                      icon: state.summary.btnIcon || 'plus',
                      buttonColour: state.summary.btnColour || 'success',
                      tooltip: state.summary.btnTooltip || 'Add a new Record',
                      hideButton: state.summary.disableAdd
                    },
                    hooks: ['createNewRecord']
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-body',
                children: [
                  {
                    componentName: 'adminui-datatables',
                    state: {
                      name: state.name
                    },
                    hooks: ['retrieveRecordSummary']
                  }
                ]
              }
            ]
          },
          {
            componentName: 'adminui-content-card',
            state: {
              name: state.name + '-details-card',
              hide: true,
              width: state.detail.cardWidth || '400px'
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                children: [
                  {
                    componentName: 'adminui-content-card-button-title',
                    state: {
                      title: state.detail.title,
                      title_colour: state.detail.titleColour || 'info',
                      icon: state.detail.btnIcon || 'cog',
                      buttonColour: state.detail.btnColour || 'info',
                      tooltip: state.detail.btnTooltip || 'Edit record',
                      disableButton: state.detail.disableEdit
                    },
                    hooks: ['updateRecord']
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-body',
                state: {
                  name: state.name + '-details-card-body'
                },
                children: [
                  {
                    componentName: 'adminui-form',
                    state: {
                      name: state.name
                    },
                    hooks: ['addFormFields']
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-footer',
                state: {
                  hidden: true
                },
                children: [
                  {
                    componentName: 'adminui-button',
                    state: {
                      text: state.update.btnText || 'Save',
                      colour: state.update.btnColour || 'success',
                      cls: 'btn-block'
                    },
                    hooks: ['save']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  let showRecordBtn = {
    componentName: 'adminui-button',
    assemblyName: state.assemblyName,
    state: {
      icon: state.summary.rowBtnIcon || 'edit',
      colour: state.summary.rowBtnColour || 'info'
    },
    hooks: ['getDetail']
  };

  let deleteBtn = {
    assemblyName: state.assemblyName,
    componentName: 'adminui-button',
    state: {
      icon: 'trash-alt',
      colour: 'danger'
    },
    hooks: ['confirmDelete']
  };
  
  let selectBtn = {
    assemblyName: state.assemblyName,
    componentName: 'adminui-button',
    state: {
      icon: 'check-square',
      colour: 'info',
      tooltip: 'Select Record'
    },
    hooks: ['selectRecord']
  };

  let confirmDeleteModal = {
    componentName: 'adminui-modal-root',
    assemblyName: state.assemblyName,
    state: {
      name: 'confirm-delete-' + state.name
    },
    children: [
      {
        componentName: 'adminui-modal-header',
        state: {
          name: state.name + '-delete',
          title: 'Delete Record'
        },
        children: [
          {
            componentName: 'adminui-modal-close-button',
          }
        ]
      },
      {
        componentName: 'adminui-modal-body',
        state: {
          text: 'Are you sure you want to delete this record?'
        }
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
              name: 'deleteRecord-' + state.name,
              text: 'Yes',
              colour: 'danger',
              cls: 'btn-block'
            },
            hooks: ['delete']
          }
        ]
      }
    ]
  };



  let hooks = {

    'adminui-content-page': {

      loadModal: function() {
        let modal = this.getComponentByName('adminui-modal-root', 'confirm-delete-' + state.name);
        if (!modal) {
          // add modal for confirming record deletions
          this.loadGroup(confirmDeleteModal, document.getElementsByTagName('body')[0], this.context);
        }
      }
    },

    'adminui-form': {

      addFormFields: function() {
        let form = this;
        let fields = state.detail.fields;
        let noOfFields = fields.length;

        function addFormField(no) {
          if (no === noOfFields) return;

          var field = fields[no];
          let componentName = 'adminui-form-field';
          var assembly;

          if (field.type === 'radios') {
            assembly = {
              componentName: 'adminui-form-radio-group',
              state: {
                name: field.name,
                label: field.label,
                radios: field.radios
              }
            };
            form.loadGroup(assembly, form, form.context, function() {
              addFormField(no + 1);
            });
            return;
          }

          if (field.type === 'checkboxes') {
            let checkboxes = [];
            field.checkboxes.forEach(function(checkbox) {
              if (typeof checkbox.if === 'function') {
                if (!checkbox.if.call(form)) {
                  return;
                }
              }
              checkboxes.push({
                text: checkbox.text,
                value: checkbox.value
              });
            });
            assembly = {
              componentName: 'adminui-form-checkbox-group',
              state: {
                name: field.name,
                label: field.label,
                checkboxes: checkboxes
              }
            };
            form.loadGroup(assembly, form, form.context, function() {
              addFormField(no + 1);
            });
            return;
          }

          if (field.type === 'range') componentName = 'adminui-form-range';
          if (field.type === 'select') componentName = 'adminui-form-select';
          if (field.type === 'multiselect') componentName = 'adminui-form-select-multiple';
          if (field.type === 'textarea') componentName = 'adminui-form-textarea';
          assembly = {
            componentName: componentName,
            state: {
              name: field.name,
              type: field.type,
              label: field.label,
              placeholder: field.placeholder,
              readonly: true,
              row: field.labelWidth
            }
          };
          if (field.type === 'select' || field.type === 'multiselect') {
            assembly.hooks = ['displayOptions'];
            assembly.state.options = field.options;
          }

          if (field.type === 'range') {
            assembly.state.min = field.min;
            assembly.state.max = field.max;
            assembly.state.step = field.step;
            assembly.state.marker = field.marker;
          }

          if (field.type === 'textarea') {
            assembly.state.height = field.height;
            assembly.state.rows = field.rows;
          }

          form.loadGroup(assembly, form, form.context, function() {
            addFormField(no + 1);
          });
        }
        addFormField(0);
      }
    },

    'adminui-form-select': {
      displayOptions: function(state) {
        this.setState({options: state.options});
      }
    },

    'adminui-form-select-multiple': {
      displayOptions: function(state) {
        this.setState({options: state.options});
      }
    },

    'adminui-datatables': {

      retrieveRecordSummary: async function() {
        let table = this;
        let contentPage = this.getParentComponent('adminui-content-page');
        
        let responseObj = await QEWD.reply({
          type: state.summary.qewd.getSummary || 'getSummary',
          params: {
            properties: state.summary.data_properties,
            selectedRecordId: table.context.selectedRecordId
          }
        });
        if (!responseObj.message.error) {
          table.data = {};
          let data = [];
          responseObj.message.summary.forEach(function(record) {
            table.data[record.id] = record;
            let row = [];
            state.summary.data_properties.forEach(function(property) {
              row.push(record[property]);
            });
            row.push(record.id);
            if (state.summary.enableDelete) {
              row.push('');
            }
            data.push(row);
          });
          let columns = [];
          let noOfCols = state.summary.headers.length;
          
          state.summary.headers.forEach(function(header) {
            columns.push({title: header});
          });
          if (state.summary.enableDelete) {
            columns.push({title: 'Delete'});
          }
          let obj = {
            data: data,
            columns: columns
          };
          table.render(obj);

          table.datatable.rows().every(function(index, element) {
            let row = $(this.node());
            let td = row.find('td').eq(noOfCols - 1)[0];
            let id = td.textContent;
            table.row = table.data[id];
            td.id = state.name + '-record-' + id;
            td.textContent = '';
            if (state.summary.enableDelete) {
              td = row.find('td').eq(noOfCols)[0];
              td.id = state.name + '-delete-' + id;
              let confirmTextFn = state.summary.deleteConfirmText;
              let confirmText;
              if (typeof confirmTextFn === 'function') {
                let fields = [];
                for (let i = 0; i < (noOfCols - 1); i++) {
                  fields.push(row.find('td').eq(i)[0].textContent);
                }
                confirmText = confirmTextFn(fields);
              }
              else {
                let name_td = row.find('td').eq(0)[0];
                confirmText = name_td.textContent;
              }
              td.setAttribute('data-confirm', confirmText);
            }
          });

          table.datatable.rows({page: 'current'}).every(function(index, element) {
            let row = $(this.node());
            let td = row.find('td').eq(noOfCols - 1)[0];
            table.loadGroup(showRecordBtn, td, table.context);
            if (state.summary.enableDelete) {
              td = row.find('td').eq(noOfCols)[0];
              table.loadGroup(deleteBtn, td, table.context);
            }
          });

          table.datatable.on('draw', function() {
            table.datatable.rows({page: 'current'}).every(function(index, element) {
              let row = $(this.node());
              let td = row.find('td').eq(2)[0];
              let btn = td.querySelector('adminui-button');
              if (btn) {
                td.removeChild(btn);
              }
              table.loadGroup(showRecordBtn, td, table.context);
              if (state.summary.enableDelete) {
                td = row.find('td').eq(3)[0];
                btn = td.querySelector('adminui-button');
                if (btn) {
                  td.removeChild(btn);
                }
                table.loadGroup(deleteBtn, td, table.context);
              }
            });
          });
          contentPage.rendered = true;
        }
        
        contentPage.onSelected = function() {
          if (contentPage.rendered && state.summary.refetchSummaryOnSelected) {
            let target = table.getParentComponent('adminui-content-card-body');
            table.datatable.destroy();
            table.remove();
            let assembly = {
              componentName: 'adminui-datatables',
              assemblyName: state.assemblyName,
              state: {
                name: state.name
              },
              hooks: ['retrieveRecordSummary']
            };
            table.loadGroup(assembly, target, table.context);
          }
        };
      }
    },

    'adminui-button': {

      confirmDelete: function() {
        let _this = this;
        this.rootElement.setAttribute('data-toggle', 'modal');
        let modalRoot = this.getComponentByName('adminui-modal-root', 'confirm-delete-' + state.name); 
        if (modalRoot) {
          this.rootElement.setAttribute('data-target', '#' + modalRoot.rootElement.id);
        }
        let fn = function() {
          let card = _this.getComponentByName('adminui-content-card', state.name + '-details-card');
          card.hide();
          let id = _this.parentNode.id.split('delete-')[1];
          let display = _this.parentNode.getAttribute('data-confirm');
          let header = modalRoot.querySelector('adminui-modal-header');
          header.setState({
            title: 'Deleting ' + display
          });
          let button = _this.getComponentByName('adminui-button', 'deleteRecord-' + state.name);
          button.recordId = id;
        }
        this.addHandler(fn);
      },

      delete: function() {
        let _this = this;
        let fn = async function() {
          let id = _this.parentNode.id.split('delete-')[1];
          let responseObj = await QEWD.reply({
            type: state.summary.qewd.delete || 'deleteRecord',
            params: {
              id: _this.recordId
            }
           });
            let modalRoot = _this.getParentComponent('adminui-modal-root');
            modalRoot.hide();
            if (!responseObj.message.error) {
              toastr.info('Record deleted');
              let table = _this.getComponentByName('adminui-datatables', state.name);
              let target = table.getParentComponent('adminui-content-card-body');
              table.datatable.destroy();
              table.remove();
              let assembly = {
                componentName: 'adminui-datatables',
                assemblyName: state.assemblyName,
                state: {
                  name: state.name
                },
                hooks: ['retrieveRecordSummary']
              };
              _this.loadGroup(assembly, target, _this.context);
            }
          //});
        };
        this.addHandler(fn);
      },

      save: function() {
        let _this = this;
        let fn = async function() {
          let form = _this.getComponentByName('adminui-form', state.name);
          let field;
          let value;
          let params = {
            id: form.recordId
          };
          for (let name in form.field) {
            let value = form.fieldValues[name];
            if (typeof value === 'object') {
              let arr = [];
              for (let xname in value) {
                if (value[xname]) arr.push(xname);
              }
              params[formFieldPropertyNames[name]] = arr;
            }
            else {
              params[formFieldPropertyNames[name]] = value;
            }
          }
          let responseObj = await QEWD.reply({
            type: state.update.qewd.save || 'saveRecord',
            params: params
          });
          if (!responseObj.message.error) {
            toastr.info('Record updated successfully');
            let table = _this.getComponentByName('adminui-datatables', state.name);
            let target = table.getParentComponent('adminui-content-card-body');
            if (table) {
              table.datatable.destroy();
              table.remove();
            }
            let assembly = {
              componentName: 'adminui-datatables',
              assemblyName: state.assemblyName,
              state: {
                name: state.name
              },
              hooks: ['retrieveRecordSummary']
            };
            //console.log(target);
            //console.log(assembly);
            _this.loadGroup(assembly, target, _this.context);
            let card = _this.getComponentByName('adminui-content-card', state.name + '-details-card');
            card.hide();
          }
        };
        this.addHandler(fn);
      },

      getDetail: function() {
        let _this = this;
        let id = this.parentNode.id.split('record-')[1];
        let card = this.getComponentByName('adminui-content-card', state.name + '-details-card');
        let title = card.querySelector('adminui-content-card-button-title');
        title.selectedRecordId = id;
        let form = this.getComponentByName('adminui-form', state.name);
        let fn = async function() {
          form.recordId = id;
          let responseObj = await QEWD.reply({
            type: state.summary.qewd.getDetail || 'getRecordDetail',
            params: {
              id: id
            }
          });
          if (!responseObj.message.error) {
            card.show();
            card.footer.hide();
            title.record = responseObj.message.record;
            let title_value;
            if (typeof state.detail.title_data_property === 'function') {
              title_value = state.detail.title_data_property.call(title);
            }
            else if (!state.detail.title_data_property) {
              title_value = 'Edit Record';
            }
            else {
              title_value = title.record[state.detail.title_data_property];
            }
            title.setState({title: title_value});
            title.showButton();

            for (let fname in formFields) {
                let name = formFields[fname].name;
                let field = form.field[name];

                if (field.type === 'radio-group') {
                  field.setState({
                    selectedValue: title.record[name],
                    readonly: true
                  });
                }
                else if (field.type === 'checkbox-group') {
                  field.setState({
                    selectedValues: title.record[name],
                    readonly: true
                  });
                }
                else if (field.type === 'select-multiple') {
                  field.setState({
                    selectedValues: title.record[name],
                    readonly: true
                  });
                }
                else {
                  if (field.type === 'range' && !title.record[name]) {
                    title.record[name] = field.min;
                  }
                  field.setState({
                    value: title.record[name],
                    readonly: true
                  });
                }
            }
          }
        };
        this.addHandler(fn, this.rootElement);
      },
      
      selectRecord() {
        let _this = this;
        let title = this.getParentComponent('adminui-content-card-button-title');
        let fn = function() {
          _this.context.selectedRecordId = title.selectedRecordId;
          _this.context.selectedRecord = title.record;
        };
        this.addHandler(fn, this.rootElement);
      }
    },

    'adminui-content-card-button-title': {

      updateRecord: function() {
        let title = this;
        let fn = function() {
          title.hideButton();
          let form = title.getComponentByName('adminui-form', state.name);
          let card = title.getComponentByName('adminui-content-card', state.name + '-details-card');
          card.footer.show();
          let field;
          for (let name in form.field) {
            field = form.field[name];
            field.setState({readonly: false});
          }
        };
        this.addHandler(fn, this.button);
        
        if (state.detail.enableSelect) {
          let div = document.createElement('div');
          div.classList.add('col');
          title.rootElement.appendChild(div);
          title.loadGroup(selectBtn, div, title.context);
        } 
      },

      createNewRecord: function() {
        let _this = this;
        let fn = function() {
          let card = _this.getComponentByName('adminui-content-card', state.name + '-details-card');
          let title = card.querySelector('adminui-content-card-button-title');
          title.setState({title: state.detail.newRecordTitle || 'New Record'});
          title.hideButton();
          let form = _this.getComponentByName('adminui-form', state.name);
          form.recordId = 'new-record';
          card.show();
          card.footer.show();
          let field;
          for (let name in form.field) {
            field = form.field[name];
            if (field.type === 'radio-group') {
              field.setState({
                selectedValue: '',
                readonly: false
              });
            }
            if (field.type === 'checkbox-group') {
              field.setState({
                selectedValues: [],
                readonly: false
              });
            }
            else {
              field.setState({
                value: '',
                readonly: false
              });
            }
          }
        };
        this.addHandler(fn, this.button);
      }
    }
  };


  return {component, hooks};

};
