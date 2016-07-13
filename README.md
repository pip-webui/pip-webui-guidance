# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Guidance page module

Guidance module is part of [Pip.WebUI framework](https://github.com/pip-webui/pip-webui)

This module provides next functionality:

* Intro guidance
* Useful tips
* Inspirational quotes

## <a name="components"></a>Example:

### <a name="guidance"></a>'Intro Guidance' service
<a href="doc/images/img-guidance.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-guidance.png"/>
</a>

[Online Example](http://webui.pipdevs.com/pip-webui-guidance/index.html#/guidance)

### <a name="tips"></a>'Tips' service
<a href="doc/images/img-tips.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-tips.png"/>
</a>

### <a name="dependencies"></a>Module dependencies

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

###<a name="contributing"></a>Contributing
Read more [here](link.com)

### <a name="build"></a>Build

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


## <a name="ng-docs"> ngDocs

``` bash
# Generate '/docs'
gulp generate-docs

# Note: It you delete it, task generate new folder '/docs' with all dependencies

```


## <a name="license"></a>License

PIP.WebUI is under [MIT licensed](LICENSE).

