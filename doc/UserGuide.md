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

- Add 'pipGuidance' module

For Intro Guide dialog needs data:
- Add pipGuidance in controller
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
        ], // array pictures for pages
        topic: 'goal' // topic for filter guides
    };
```
* For show dialogs:
```javascript
    pipGuidance.showIntroReleaseGuide(guide, settings, visual, language, $party, $user);
```

Options:

- guide - data set what must be viewed
- settings - object for settings
- visual - save views of this guide
- language // ru, en etc..

For show tips:

### Add _$pipPopover_ in controller
```javascript
   $pipPopover.show({
       class: 'pip-tip', // class name for pip-popover
       cancelCallback: function () {
          //backdrop clicked
       },
       locals:{ // options
         title: 'Some title',
         content: 'Text content'
         image: ''
         link: 'some link'
       },
       controller: function ($scope) { // function for logic

           $scope.title = $scope.locals.title;
           $scope.content = $scope.locals.content;
           $scope.image   = $scope.locals.image;
           $scope.link    = $scope.locals.link;

       },
       templateUrl: 'tips/tip.template.html' // html template
   });
```

**Can use tips service for filter and display tips:**
Add _**pipTips**_ in controller.

Service have functions:

- filterTips(data, topic) - filtering tips by topic field or data and status == 'completed'
- data - tips array
- topic - string for filtering
_or_
- showTips(tips, ln, $event) - show tips
- tips - tips array
- ln - language
