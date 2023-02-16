# Scroll-Loader
- A library that automatically calls loading when scrolling down

## Support
- typescript
- npm, yarn
- ES6

## Package
```
"scroll-loader": "^1.0.2"
```

## Example
```
import scrollLoader from "scroll-Loader";
const sl = scrollLoader();

function loadPage() {
    fetch(`~~`).then(data => {
        ... code ...
        if (data.moreData) {
            sl.next();
        }
    });
}

sl.callback(() => {
  // more page load
  loadPage();
});
```
