# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> User guidance

![](https://img.shields.io/badge/license-MIT-blue.svg)

Active guidance is becoming increasingly important to deliver delightful user experience in modern applications.
Pip.WebUI.Guidance module allows to make introductions to new users, notify about new releases or provide useful tips
and quotes with just few lines of code.

The module requires **guides**, **tips** and **quotes** standard REST API to be available on the server.

### pipGuidanceDialog

**pipGuidanceDialog** shows to new user introductory guidance that tells the story about the application, or shows release guidance that explain changes in the new product version.

Todo: Replace the guidance dialog with the real one
<a href="doc/images/img-guidance.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-guidance.png"/>
</a>

### pipTipQuotePopup

**pipTipQuotePopup** shows to users random tips and inspirational quotes that can be filtered for the current context or page.

Todo: Replace that with two images: one with real tip and another one with real quote on the **entire** application screen
<a href="doc/images/img-tips.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-tips.png"/>
</a>

## Learn more about the module

- [User's guide](doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-guidance/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-guidance/index.html)
- [Developer's guide](doc/DevelopersGuide.md)
- [Changelog](CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles and web components
* [pip-webui-core](https://github.com/pip-webui/pip-webui-core): localization and other core services
* [pip-webui-rest](https://github.com/pip-webui/pip-webui-rest): REST resources for guides, tips and quotes
* [pip-webui-layouts](https://github.com/pip-webui/pip-webui-layouts): dialog layout
* [pip-webui-pictures](https://github.com/pip-webui/pip-webui-pictures): picture control

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
