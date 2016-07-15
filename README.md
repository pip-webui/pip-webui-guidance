# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Guidance module

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

### How to use it

```javascript
$scope.guide = {
    app: "notes",
    pages: [
        {
            title: {en: "Eng Title", ru: "Русский заголовок"},
            content: {en: "Eng content", ru: "Русское содержание"},
            more_url: "",
            color: "cyan"
        },
        {
            title: {en: "Title 2", ru: "Aa"},
            content: {en: "Text 2", ru: "Conveniently transition optimal e-commerce rather than B2B partnerships."},
            more_url: "", 
            color: "cyan",
            pic_id: '56eaeea387639bd2182fbac6' //Get imeges with id from database
        }
    ],
    pictures: [
        'http://rjnzhfvfnthjdbx.gorod.tomsk.ru/posts-files/74/223/i/25.jpg'
    ],
    status: "new",
    topic: "ffff444",
    type: "intro"
};

```

## Learn more about the module

- [API Reference]()
- [Online Samples](http://webui.pipdevs.com/pip-webui-guidance/index.html#/guidance)
- [Developer Guide](https://github.com/pip-webui/pip-webui/blob/master/doc/DeveloperGuide.md)
- [User Guide](doc/UserGuide.md)
- [Forum](https://pip-webui.blogspot.com/)
- [Pip.WebUI Framework](https://github.com/pip-webui/pip-webui)
- [Pip.WebUI Official Website](http://www.pipwebui.org)

### <a name="dependencies"></a>Module dependencies

* <a href="https://github.com/pip-webui/pip-webui-core">pip-webui-core</a>
* <a href="https://github.com/pip-webui/pip-webui-css">pip-webui-css</a>
* <a href="https://github.com/pip-webui/pip-webui-lib">pip-webui-lib</a>
* <a href="https://github.com/pip-webui/pip-webui-rest">pip-webui-rest</a>
* <a href="https://github.com/pip-webui/pip-webui-controls">pip-webui-controls</a>

### Bower components

```bash
    bower install
```


## <a name="license"></a>License

PIP.WebUI is under [MIT licensed](LICENSE).

