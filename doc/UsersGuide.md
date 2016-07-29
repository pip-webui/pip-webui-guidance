# Pip.WebUI.Guidance User's Guide

## <a name="contents"></a> Contents
- [Installing](#install)
- [pipGuidance service](#guidance_service)
- [pipGuidanceDialog](#guidance_dialog)
- [pipTipPopup](#tip_popup)
- [pipQuotePopup](#quote_popup)
- [Questions and bugs](#issues)


## <a name="install"></a> Installing

Add dependency to **pip-webui** into your **bower.json** or **package.json** file depending what you use.
```javascript
"dependencies": {
  ...
  "pip-webui": "*"
  ...
}
```

Alternatively you can install **pip-webui** manually using **bower**:
```bash
bower install pip-webui
```

or install it using **npm**:
```bash
npm install pip-webui
```

Include **pip-webui** files into your web application.
```html
<link rel="stylesheet" href=".../pip-webui-lib.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui-test.min.js"></script>
```

Register **pipGuidance** module in angular module dependencies.
```javascript
angular.module('myApp',[..., 'pipGuidance']);
```


## <a name="guidance_service"></a> pipGuidance service

**pipGuidance** service presents guidance information to user using data retrieved from the server
and filtered based on the current page or context. It allows to show introductory or release guidance,
tips and inspirational quotes. 

The service requires presence of **guides**, **tips** and **quotes** REST API.
Todo: Add link to pip-webui-rest module with protocol definition

### Usage
Todo: Add here code snippet that shows how to open different types of guidance

### Methods

* **showIntroGuidance(filter: any): void** - shows introductory guidance that explains the application is its features to a new user.
  - Params:
    + filter - filter to retrieve particular introductory guide from the server for specific application

* **shortReleaseGuidance(filter: any): void** - shows release guidance that explains changes in the current product release.
  - Params:
    + filter - filter to retrieve particular release guide from the server for specific application
  
* **shortIntroOrReleaseGuidance(filter: any): void** - method that automatically detects type of guidance to present to user. 
For first time users it shows introductory guidance, for others it shows release guidance, but only once.
  - Params:
    + filter - filter to retrieve particular release guide from the server for specific application

* **showTipPopup(filter: any): void** - shows tip popup for the current context
  - Params:
    + filter - filter to select tip for specific topic or context

* **showQuotePopup(filter: any): void** - shows popup with inspirational quote for the current context
  - Params:
    + filter - filter to select quote for specific topic or context

* **showTipOrQuotePopup(filter: any): void** - shows popup with randomly selected tip or quote for the current context.
This method is smart enough to present guidance with specific frequency to avoid annoying users.
  - Params:
    + filter - filter to select guidance for specific topic or context


## <a name="guidance_dialog"></a> pipGuidanceDialog

**pipGuidanceDialog** shows dialog with introductory or release guidance.

### Usage
Todo: Add here code snippet that shows how to open guidance

Todo: Add screenshot with realistic intro dialog

### Methods

* **show(params: any, successCallback, errorCallback): void** - shows guidance dialog
  - Params:
    + params - guidance data to present on the dialog


## <a name="tip_popup"></a> pipTipPopup

**pipTipPopup** shows popup with a tip.

### Usage
Todo: Add here code snippet that shows how to open popup

Todo: Add screenshot with realistic tip

### Methods

* **show(params: any, successCallback, errorCallback): void** - shows tip popup
  - Params:
    + params - tip data to present on the dialog


## <a name="quote_popup"></a> pipQuotePopup

**pipQuotePopup** shows popup with inspirational quote.

### Usage
Todo: Add here code snippet that shows how to open popup

Todo: Add screenshot with realistic inspirational quote

### Methods

* **show(params: any, successCallback, errorCallback): void** - shows quote popup
  - Params:
    + params - quote data to present on the dialog


## <a name="issues"></a> Questions and bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-guidance/issues).
