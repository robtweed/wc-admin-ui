export function define_initial_sidebar() {

  let component = {
    componentName: 'adminui-sidebar-brand',
    state: {
      title: 'DOM Editor',
      icon: 'bezier-curve',
      contentPage: 'dashboard',
    }
  };

  return {component};
};
