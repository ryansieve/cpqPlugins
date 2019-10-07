# CPQ Plugins

This project template can be used to build the QCP and PSP from modularized code. Additionally, you may include npm packages (i.e. moment, underscore, etc) by defining your own rollup.config.js as described in the RollupJS documentation.

#### Getting Started 
* Ensure you have Node and npm installed
    * _node --version_
    * _npm --version_
* Install RollupJS
    * _npm install --global rollup_
    
#### Automation

###### To deploy the Plugin directly from your local machine using Salesforce DX:

Production Code

_gulp deploy -u myorgalias_

Development and Debugging

_gulp deployDev -u myorgalias_

###### To deploy the Plugin directly from your local machine using Salesforce credentials:

Please update your credentials in the sfCredentials.json file.

Production Code

_gulp deploy_

Development and Debugging

_gulp deployDev_

#### Manual
    
###### Bundle your modularized code

Production Code

_gulp build_

Development and Debugging

_gulp buildDev_

Open the bundle.js file in the dist folder, copy and paste your code in to the Custom Script record's "Code" field

#### Test
    
###### Test your code using JEST

_npm run test_

Code coverage results will be displayed in the terminal and stored in the "coverage" directory.
    