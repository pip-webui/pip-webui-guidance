## How to use guide

### Use it with bower
```bash

    bower install pip-webui-guidance
```
### Use it with npm
```bash

    npm install pip-webui-guidance
```
and in project add following code

Add 'pipGuidance' module
Add pipGuidance in controller
For Intro Guide dialog needs data:
```javascript
    var guide = {
        id: '1',
        pages: [
            {
                title: {en: "Title for first page", ru: "Заголовок для первой страницы"},
                content: {en: "Content for 1 page", ru: "Текст для первой страницы"},
                color: "cyan" // name class for background color
            },
            {
                title: {en: "Title for second page", ru: "Заголовок для второй страницы"},
                content: {en: "Content for 2 page", ru: "Текст для второй страницы"},
                color: "cyan",
                pic_id: '56eaeea387639bd2182fbac6' // you can add picture id in pipLife
            }
        ],
        pictures: [
            'http://rjnzhfvfnthjdbx.gorod.tomsk.ru/posts-files/74/223/i/25.jpg'
        ] // array pictures for pages
    };
```
For show dialogs:
```javascript
    pipGuidance.showIntroReleaseGuide(guide, settings, visual, language, $party, $user);
```
Options:
guide - object for display
settings - object for settings
visual = true if you want save display this guide (если вы хотите сохранять просмотры данного guide)
language - display language (for example language = 'en' or language = 'ru')
