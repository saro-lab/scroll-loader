# Scroll-Loader
- A library that automatically calls loading when scrolling down
- compatible with typescript, vuejs, reactjs, svelte, etc.
- must use es6 or higher javascript.

## Package
```
"scroll-loader": "^1.0.3"
```

## Options
| name      | desc            | default value            |
|-----------|-----------------|--------------------------|
| target    | watching target | document.documentElement |
| sparePage | spare page      | 0.8                      |

#### sparePage
- ex) scroll areas height 1000px
  - sparePage: 0.2 = spare size is 200px
  - sparePage: 0.8 = spare size is 800px
  - sparePage: 1 = spare size is 1000px

## Methods
| name           | desc                                         |
|----------------|----------------------------------------------|
| watch          | watching and call (just once call and pause) |
| onNeedNextPage | register watching callback                   |
| destroy        | destroy event and deactivate the instance    |

## Example
``` js
// import
import scrollLoader from "scroll-Loader";

// create instance
const sl = scrollLoader({
    sparePage: 1.8
});

// page
let page = 0;
let list = [];

// load list example
function loadList() {
    fetch(`/my/api/page/${page}`).then(pageData => {
        list = [...list, ...pageData.list];
        if (!pageData.isLastPage) {
            // resume the paused scroll event.
            sl.watch();
        }
    });
}

// callback for need to next page
sl.onNeedNextPage(() => {
  // if scrolling is performed as much as the reload condition, 
  // it is called only once and the event is paused.
  page++;
  loadList();
});

// destroy instance
onDestroyCallbackExampleInYourframework(() => {
    // remove the scroll event.
    // this instance is no longer available.
    sl.destroy();
});
```

## Code applied to the site
- https://github.com/anissia-net/anissia-web/blob/master/src/page/site/captionRecent.vue