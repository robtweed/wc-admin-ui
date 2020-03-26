# wc-admin-ui: Library of WebComponents for Constructing SB Admin 2 Themed Applications
 
Rob Tweed <rtweed@mgateway.com>  
29 November 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


# About this Repository

This repository contains a library of WebComponents that can be used to dynamically assemble
applications that conform to the [SB Admin 2 Theme](https://startbootstrap.com/themes/sb-admin-2/)

This library is designed for use with the 
[*mg-webComponents*](https://github.com/robtweed/mg-webComponents) module.

It is recommended that you understand the basic principles behind the *mg-webComponents* framework before
using the *SB Admin 2 WebComponents in this repository.  Take the 
[comprehensive tutorial](https://github.com/robtweed/mg-webComponents).


# Setting up the Environment

## Users of the QEWD Docker Container

If you are using the latest versions of the QEWD Docker Container
[for Linux](https://hub.docker.com/repository/docker/rtweed/qewd-server) or for the
[Raspberry Pi](https://hub.docker.com/repository/docker/rtweed/qewd-server-rpi),
then everything you need is already installed under its Web Server's root
directory (*/opt/qewd/mapped/www).


You'll find this repository's WebComponent Module Library here:

        /opt/qewd/mapped/www
            |
            |- components
            |  |
            |  |- adminui
            |  |   |
            |  |   |- examples
            |  |   |
            |  |   |- js
            |  |   |
            |  |   |- css
            |  |   |
            |  |   |- components


The *mg-webComponents* module required for the WebComponent Module library is already installed here:

        /opt/qewd/mapped/www
            |
            |- mg-webComponents.js

Even if you are using the Dockerised QEWD Container, it is worth reading the following
instructions below for manually setting up the environment, as they will help your understanding
of what has already been installed within the Container and why.

Otherwise, you should now skip forwards [to here](#setting-up-a-project)


## Setting Up Your Own System Manually

If you're using your own platform, or a non-Dockerised version of QEWD, you'll need to set up
the environment manually.  Follow the steps below.

### Install the *mg-webComponents* Module

The *wc-admin-ui* Library of WebComponent Modules is dependent on the *mg-webComponents* Module
being available on your Web Server.

You can fetch the *mg-webComponents* module using either:

        git clone https://github.com/robtweed/mg-webComponents

or:

        npm install mg-webcomponents

This tutorial assumes that you put the repository's *mg-webComponents.js* file in your Web Server's root path.
If you place in another Web Server path, you will need to modify the Tutorial examples accordingly.

So, for example, if your Web Server's root path is at /opt/nginx/www:

        /opt/nginx/www
            |
            |- mg-webComponents.js



### Install the Admin UI Components from this Repository

- Clone the repository to a folder path named "components/adminui" under your Web Server root directory (eg *~/qewd/www*), eg:

        cd ~/qewd/www
        mkdir components
        cd components
        mkdir adminui
        cd ~
        git clone https://github.com/robtweed/qewd-jsdb ~/qewd/www/components/adminui

Under your Web Server's root directory you should therefore now have:

        |- components
        |  |
        |  |- adminui
        |  |   |
        |  |   |- examples
        |  |   |
        |  |   |- js
        |  |   |
        |  |   |- css
        |  |   |
        |  |   |- components


### Sub-Folders under */components/adminui*

The *js* and *css* sub-folders contain all the JavaScript and CSS resources respectively
for Bootstrap 4 etc.  These are loaded automatically by the *adminui* root component.

The *examples* sub-folder contains some worked examples showing how to build out applications
with the WebComponents library.

The *components* sub-folder contains the SB Admin 2 UI WebComponent Library.  if you inspect its contents,
you'll see that all the files are prefixed *adminui-*.  *adminui* is therefore the *namespace* for these
WebComponent Modules.


# Setting Up A Project

## Folder Structure

If you want to create an application using the SB Admin 2 UI WebComponent Library, you should
first create the appropriate folders.

Under your Web Server's root directory, create the following folder and file structure.

        |
        |- {{project_name}}
        |    |
        |    |- js
        |    |   |
        |    |   |- app.js
        |    |
        |    |- index.html


Initially just create empty versions of the *app.js* and *index.html* files.

For example, if your application is *myTestApp*, you'll create:

        |
        |- myTestApp
        |    |
        |    |- js
        |    |   |
        |    |   |- app.js
        |    |
        |    |- index.html



## The *mg-webComponents* Stack

Before using this repository's library of SB Admin 2 Themed WebComponent Modules, it is recommended
that you take the basic 
[*mg-webComponents* tutorial](https://github.com/robtweed/mg-webComponents/blob/master/TUTORIAL.md).

In that *mg-webComponents* tutorial,
 you'll have learnt that there are four layers to an application:

- the bottom-level library of WebComponent Modules.  This is what you've installed from this repository
- your WebComponent Assembly Module(s);  We'll create some examples in this tutorial.
- your Load/Render Module.  This will be the *app.js* file
- your HTML page.  This will be the *index.html* file.

## *index.html*

As described in the *mg-webComponents* tutorial, your *index.html* is simply:

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>{{You Title}}</title>
          </head>
          <body>
            <script type="module" src="js/app.js"></script>
          </body>
        </html>

Just change the *title* text as you wish.


## The *app.js* and *Assembly* Modules

The contents of these two files will depend on what we're wanting to actually do in our application(s).

Let's start with a very basic application and we'll progressively build it out using the SB Admin 2 UI WebComponents.


# The SB Admin 2 Theme SuperStructure.

As you'll have seen from the [SB Admin 2 Theme](https://startbootstrap.com/themes/sb-admin-2/) examples, it uses
Bootstrap 4, and provides a UI with the following basic superstructure:

- a left-hand menu panel (with branding at the top)
- a top bar in which you can put drop-down menus and other information and navigation widgets
- a footer, usually just for branding/copyright purposes
- a main work/content area into which are placed Bootstrap 4 Card components

The WebComponents in this repository have been designed and built by dissecting this UI structure into low-level, re-usable
WebComponents that represent all the various building blocks of the SB Admin 2 Theme.

At the heart of this WebComponent Module library is the *adminui-root* WebComponent.  This defines the core
skeleton of the UI design and should always be the starting point for any SB Admin 2 Themed applications you build


# A Raw Application Containing Just the SuperStructure

Let's start by just creating an application that renders the basic skeleton structure and nothing else.

I'll assume you've created a set of project folders as described earlier. It's up to you what you name
your project/application, but I'll assume it's named *myTestApp*.

## Create your *app.js* file

Paste the following contents into your *app.js* file:


        import {webComponents} from '../../mg-webComponents.js';
        
        document.addEventListener('DOMContentLoaded', function() {
        
          // create the context for running the web components
        
          let context = {
            path: './components/adminui/components/',
            resourcePath: '/components/adminui/'
          };
        
          let body = document.getElementsByTagName('body')[0];
          webComponents.loadWebComponent('adminui-root', body, context);
        });


## Try it Out

All we're doing is loading the *adminui-root* component and appending it to your HTML file's *body* tag.
We won't define any WebComponent Assembly file just yet, so try loading your *index.html* file into a browser, eg:

        http://192.168.1.100:8080/myTestApp


Change the IP address, port and path as appropriate for your setup.

You should see the empty panels of the SB Admin 2 UI displayed, albeit without any other content in the 4 areas it draws.

## The Boostrap 4 JavaScript and CSS Resources

Try opening up the browser's JavaScript Console / Developer Tools panel and click the Network tab, then reload the
web page.  You'll see that it downloadeds all the JavaScript and CSS files needed for Bootstrap 4, jQuery etc.
That has been handled as part of the logic within the
 [*adminui-root* WebComponent](https://github.com/robtweed/wc-admin-ui/blob/master/components/adminui-root.js).
See its *onLoaded()* method.

So, by using the *adminui-root* WebComponent, all the necessary resources are loaded ready for use by all the
other *adminui* WebComponents in the Library.

Note that all the other *adminui* WebComponents rely on the Bootstrap 4 stylesheets, so none of them use *ShadowDOM*,
allowing those styles to "leak through" automatically.


## The *adminui-root* WebComponent Properties

The *adminui-root* WebComponent defines a set of properties that provide access to the target tags onto which you
will attach other components.  The key properties you'll use for this purpose are:

- this.sidebarTarget: the attachment point for items you want to display in the left-hand side bar
- this.topbarTarget:  the attachment point for items you want to display in the top bar
- this.footerTarget:  the attachment point for items you want to display in the footer
- this.contentTarget:  the attachment point for items you want to display in the main content area

The *adminui-root* WebComponent has one available *state* setting:

- state.sidebar_colour: Allows you to change the Sidebar colour from its default blue to any of the available colours
provided by Bootstrap 4:

- primary: blue
- secondary: grey
- success: green
- danger: red
- warning: yellow
- info: cyan
- light: white
- dark: black


# Extend the Application by Adding a Brand

So far, our application doesn't do anything or even display anything useful, so let's begin building it out into
a proper, functioning application.

The first thing to try is to add a brand to the top of the sidebar.

## Create an Assembly File

In your *js* sub-folder (ie where your *app.js* file resides), create a file named *sidebar.js* containing:

        export function sidebar_assembly() {
          let component = {
            componentName: 'adminui-sidebar-brand',
            state: {
              title: 'Tutorial',
              icon: 'bezier-curve'
            }
          };
          return {component};
        };

So this Assembly will just use a single WebComponent from the library: *adminui-sidebar-brand*, and
set its state properties to define the branding text and icon.  The icon name is from the
pre-loaded *fontawesome* library.  You can [see the available icons here](https://fontawesome.com/icons?d=gallery).
Note that you are limited to the free ones, but you'll find there are stil a very large number to choose from.



## Edit your *app.js* File

Now we need to edit the *app.js* file to make use of this Assembly File.  The trick is to
make use of a callback provided by the *webComponents.loadWebComponent()* method, which will
fire when the *adminui-root* WebComponent is rendered and ready.

So, edit your *app.js* file to contain this instead:

        import {webComponents} from '../../mg-webComponents.js';
        import {sidebar_assembly} from './sidebar.js';
        
        document.addEventListener('DOMContentLoaded', function() {
        
          let context = {
            path: './components/adminui/components/',
            resourcePath: '/components/adminui/'
          };
        
          webComponents.addComponent('sidebar', sidebar_assembly());
          let body = document.getElementsByTagName('body')[0];
          webComponents.loadWebComponent('adminui-root', body, context, function(root) {
            webComponents.loadGroup(webComponents.components.sidebar, root.sidebarTarget, context);
          });

        });

So what we've added here is:

- loading the Assembly module:

        import {sidebar_assembly} from './sidebar.js';

- invoking the Assembly Module's exported method and adding the result to the *webComponents* object:

          webComponents.addComponent('sidebar', sidebar_assembly());

- adding the callback function to the *webComponents.loadWebComponent()* method, which provides the
*adminui-root* WebComponent as its argument (we're refering to it as *root*):


          webComponents.loadWebComponent('adminui-root', body, context, function(root) {

- within the callback function, attaching the sidebar Assembly of WebComponents to the *root*'s sidebar target property:

            webComponents.loadGroup(webComponents.components.sidebar, root.sidebarTarget, context);

## Try it out

Reload your *index.html* file in your browser


This time you should see the brand at the top of the sidebar!

Notice that you didn't need to compile or bundle anything.  With *mg-webComponents* you just edit your JavaScript files
and reload the HTML Page in your browser.  All the newly-changed JavaScript files are picked up directly from your
Web Server.


# Changing the Sidebar Colour

To change the sidebar colour, we can invoke the *adminui-root*'s *setState()* method from within the callback
function.  Just edit this part of the *app.js* file as follows:

          webComponents.loadWebComponent('adminui-root', body, context, function(root) {
            root.setState({sidebar_colour: 'success'});
            webComponents.loadGroup(webComponents.components.sidebar, root.sidebarTarget, context);
          });

Reload the page in the browser, and now the sidebar should be green!


# Add a Footer

## Create the Assembly Module

Create a second Assembly file named *footer.js* alongside your *sidebar.js* and *app.js* files.  Paste the 
following contents into it:

        export function footer_assembly() {
          let component = {
            componentName: 'adminui-footer-copyright',
            state: {
              copyright_text: 'My Company'
            }
          };
          return {component};
        };

Once again, we're just creatng a simple Assembly from a single WebComponent named *adminui-footer-copyright*.


## Edit the *app.js* File

        import {webComponents} from '../../mg-webComponents.js';
        import {sidebar_assembly} from './sidebar.js';
        import {footer_assembly} from './sidebar.js'; // <======= ****
        
        document.addEventListener('DOMContentLoaded', function() {
        
          let context = {
            path: './components/adminui/components/',
            resourcePath: '/components/adminui/'
          };
        
          webComponents.addComponent('sidebar', sidebar_assembly());
          webComponents.addComponent('footer', footer_assembly()); // <======= ****
          let body = document.getElementsByTagName('body')[0];
          webComponents.loadWebComponent('adminui-root', body, context, function(root) {
            root.setState({sidebar_colour: 'success'});
            webComponents.loadGroup(webComponents.components.sidebar, root.sidebarTarget, context);
            webComponents.loadGroup(webComponents.components.footer, root.footerTarget, context); // <======= ****
          });

        });

You'll see that we've added the following steps:

- loading the *footer.js* Assembly Module;
- invoking its exported method and adding it to the *webComponents* object
- appending the footer Assembly to the *adminui-root* WebComponent's *footerTarget*.


## Try it out

Reload your *index.html* file in your browser

This time you should see the footer appear!



# The Built-in Examples

When you installed the *wc-adminui-ui* repository, you'll have seen that it also included a sub-folder named
*examples*.

Take a look at the *with_qewd* example.  Based on the tutorial examples so far, hopefully you can see
how and why it works.

## License

 Copyright (c) 2020 M/Gateway Developments Ltd,                           
 Redhill, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.      
