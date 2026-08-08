# Advanced Search Ultimate
A webpage/extension that adds easier advanced searching for DuckDuckGo, StartPage, and other alternative search engines.

![image of web page with several prompts for advanced searching](screenshots/Screenshot_20260808_171628.png)

## [Try It](https://ethancubes.github.io/advcanced-search-ultimate/)

## Quickstart
- Firefox browser extension: (not yet added sry)
- Chromium browser extension: (not yet added sry)
- Just visit the [web page]() to test out all the features of the extension without having to download anything

## How to run locally
1. Clone the git repo
2. Open the index.html to get the non-extension version of the extension.
3. Depending on which browser you use, Chromium-based or Firefox-based, rename the corresponding file to manifest.json. For example, I use LibreWolf, which is based on Firefox, so I would rename `manifest.firefox.json` to `manifest.json`. Manifest.json is required for the extension to work.
4. Upload the extension (temporarily) to your browser.
### For Firefox, WaterFox, LibreWolf, etc: 
1. Go to `about:debugging`, and select "This Firefox". Or "This" whatever browser you use.
2. Select `Load Temporary Addon`, navigate to the git repo, and select the manifest.json (which you should've renamed from manifest.firefox.json)
### For Chrome, Edge, Opera, Brave, and other Chromium browsers: 
1. Go to `chrome://extensions` (or whatever browser you user :// extensions)
2. Enable developer mode, select "load unpacked extension", navigate to the git repo, and select the manifest.json (which you should've renamed from manifest.chrome.json)

## Features
- Generates an advanced search query from user prompts, no memorization required.
- Brings the user to the search engine page with the prompt entered in.
- Saves time by searching from the browser extension without having to open a new tab to search

## How it works
Essentially, the user inputs search terms that they want to search in the specified fields. The terms are seperated by space (except for the "specific word or phrase" and the website) and sorted into an object containing arrays. The specified modifiers are added to the elements in the array, and the elements all get converted into a single string. It used to be a query that the user could just copy into any search engine, but the query didn't work well in URLs, so the program now uses percentage encoding.

A prefix is added to the string according to which search engine is selected, and the user is directed to a search page of the selected search engine with the query entered.

This improves on effiency by allowing not requiring users to have to memorize the advanced search operators, with the bonus of being able to search from every site.

## Credits
- Favicon icon from [Google Fonts Material Symbols and Icons](https://fonts.google.com/icons), converted from .png to .ico with [CloudConvert](https://cloudconvert.com/png-to-ico).
- [Wikipedia](https://en.wikipedia.org/wiki/Percent-encoding) and [arenasbob2024-cell on Dev.to](https://dev.to/arenasbob2024cell/url-encoding-explained-what-20-3a-and-2f-actually-mean-8nh) helped with researching how URLs work.
- [Google's Advanced Search](https://www.google.com/advanced_search) was a good reference. 
- [Stack Overflow](https://stackoverflow.com/questions/16503879/chrome-extension-how-to-open-a-link-in-new-tab)
