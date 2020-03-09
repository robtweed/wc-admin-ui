export function define_tables_page(QEWD) {

  let component = {
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

  let hooks = {
    'adminui-datatables': {
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
    }
  };

  return {component, hooks};
};
