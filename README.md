# wc-admin-ui: Library of WebComponents for Constructing SB Admin 2 Themed Applications
 
Rob Tweed <rtweed@mgateway.com>  
29 November 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


# About this Repository

This library contains WebComponents that can be used to dynamically assemble
applications that conform to the [SB Admin 2 Theme](https://startbootstrap.com/themes/sb-admin-2/)

This library is designed for use with the 
[*mg-webComponents*](https://github.com/robtweed/mg-webComponents) module.

# Setting up your project

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


The *js* and *css* sub-folders contain all the JavaScript and CSS resources respectively
for Bootstrap 4 etc.  These are loaded automatically by the *adminui* root component.

The *examples* sub-folder contains some worked examples showing how to build out applications
with the WebComponents library.





        |- myProject
        |  |
        |  |- js
        |  |
        |  |- css
        |  |
        |  |- index.html
        |
        |
        |- components
        |  |
        |  |- adminui
        |



- Copy the contents of the the *js* and *css* folders in this repository into your project's *js* and *css* 
directories

- Copy the library of WebComponents into the *js* directory
- See the *mg-webComponents* repo for how to create the index.html file




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
