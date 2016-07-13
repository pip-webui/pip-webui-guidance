# Pip.WebUI Guidance Components

Guidance Web UI components is a sub-module for Pip.Services platform and can be used in applications
based on the platform.

This module provides next functionality:

* Intro guidance
* Useful tips
* Inspirational quotes

UI components are all-sufficient and improves application usability. Showing introduction quick guidance
with fun images and clear text description make this process effective and fascinating. Tips lets briefly familiar user
with main app features.

In the version 1.0.0 the implementation was cleaned up and covered with unit tests.
Implementation became fully portable across browser and devices.


### The complete library

 * https://github.com/pip-webui/pip-webui

## Demos

[Examples Online](http://webui.pipdevs.com/pip-webui-guidance/index.html)


## Quick links

* [Module dependencies](#dependencies)
* [Components](#components)
  - ['Intro Guidance' component](#guidance)
  - ['Tips' component](#tips)
* [Browsers compatibility](#compatibility)
* [Community](#community)
* [Contributing](#contributing)
* [Build](#build)
* [License](#license)


## <a name="dependencies"></a>Module dependencies

* <a href="https://github.com/pip-webui/pip-webui-core">pip-webui-core</a> - Core platform module

Another ones needed for examples running:

* <a href="https://github.com/pip-webui/pip-webui-tasks">pip-webui-tasks</a> - Helpful tasks for development
* <a href="https://github.com/pip-webui/pip-webui-lib">pip-webui-lib</a> - Vendor libraries
* <a href="https://github.com/pip-webui/pip-webui-css">pip-webui-css</a> - CSS Framework
* <a href="https://github.com/pip-webui/pip-webui-rest">pip-webui-rest</a> - REST API module
* <a href="https://github.com/pip-webui/pip-webui-controls">pip-webui-controls</a> - Assets of control components
* <a href="https://github.com/pip-webui/pip-webui-layouts">pip-webui-layouts</a> - Document layouts
* <a href="https://github.com/pip-webui/pip-webui-nav">pip-webui-nav</a> - All-sufficient UI navigation components
* <a href="https://github.com/pip-webui/pip-webui-locations">pip-webui-locations</a> - UI components to define and show users location
* <a href="https://github.com/pip-webui/pip-webui-pictures">pip-webui-pictures</a> - UI picture components
* <a href="https://github.com/pip-webui/pip-webui-entry">pip-webui-entry</a> - All-sufficient UI component for any authenticate states
* <a href="https://github.com/pip-webui/pip-webui-errors">pip-webui-errors</a> - UI components for handling app pages and connection errors
* <a href="https://github.com/pip-webui/pip-webui-test">pip-webui-test</a> - Provides mocked data needed for unit testing


## <a name="components"></a>Module components

### <a name="guidance"></a>'Intro Guidance' service
<a href="docs/images/img-guidance.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="docs/images/img-guidance.png"/>
</a>

It provides a service to manage show guidance or hide.

'Intro guidance' component [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-guidance/index.html#/guidance)

<br/>

### <a name="tips"></a>'Tips' service
<a href="docs/images/img-tips.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="docs/images/img-tips.png"/>
</a>

It provides a service for manage visibility of this one.

'Intro guidance' component [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-guidance/index.html#/guidance)

<br/>

## <a name="compatibility"></a>Compatibility

PIP.WEBUI has been thoroughly tested against all major browsers and supports:

 * IE11+,
 * Edge
 * Chrome 47+,
 * Firefox 43
 * Opera 35

## <a name="community"></a>Community

* Follow [@pip.webui on Twitter](http://link.com)
* Subscribe to the [PIP.WebUI Newsletter](http://link.com)
* Have a question that's not a feature request or bug report? Discuss on the [PIP Forum](https://groups.google.com/forum/#!forum/pipdevs)
* Have a feature request or find a bug? [Submit an issue](http://link.com)
* Join our Community Slack Group! [PIP Worldwide](http://link.com)

## <a name="contributing"></a>Contributing

Developers interested in contributing should read the following guidelines:

* [Issue Guidelines](http://somelink.com)
* [Contributing Guidelines](http://somelink.com)
* [Coding guidelines](http://somelink.com)

> Please do **not** ask general questions in an issue. Issues are only to report bugs, request
  enhancements, or request new features. For general questions and discussions, use the
  [Pip Devs Forum](https://groups.google.com/forum/#!forum/pipdevs).

It is important to note that for each release, the [ChangeLog](CHANGELOG.md) is a resource that will
itemize all:

- Bug Fixes
- New Features
- Breaking Changes

## <a name="build"></a>Build

Projects environment deploy is occurred using npm and gulp.

First install or update your local project's **npm** tools:

```bash
# First install all the NPM tools:
npm install

# Or update
npm update
```

Then run the **gulp** tasks:

```bash
# To clean '/build' and '/dist' directories
gulp clean

# To build distribution files in the `/dist` directory
gulp build

# To launch samples (build will open samples/index page in web browser)
gulp launch
```

For more details on how the build process works and additional commands (available for testing and
debugging) developers should read the [Build Instructions](docs/guides/BUILD.md).

## <a name="ng-docs"> ngDocs

``` bash
# Generate '/docs'
gulp generate-docs

# Note: It you delete it, task generate new folder '/docs' with all dependencies

```


## <a name="license"></a>License

PIP.WebUI is under [MIT licensed](LICENSE).

