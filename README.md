# CreativeCommons.org website WordPress plugin

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This WordPress plugin provides custom functionality for the creativecommons.org website.

# Setup
After cloning the repository, install nodee modules using `npm i`.

## To add a new block
Create a new folder under the `src` foder. Lets say, the new block called `My Block`.
- Create the folder with the name my-block.
- It should have an `index.js` file. The file exports the block settings and name. The edit and save methods of block is the content you display in edit and display mode respectively.
- There should be an edit.js and a save.js in the folder. It can just be a single file if display and edit modes are the same.
- For any other components, create a components folder under the `my-block` folder and add more js files inside it.
```
export const name = 'my-block';

export const settings = {
    title: 'My Block',
    description: 'A brief description of the block',
    category: '<tab>',
    icon: '<icon>',
    edit:Edit,
    save:Save
};
```
- Import the file in main `index.js` and, add an element inside the blocks array.
```import * as MyBlock from './my-block/index'


const blocks = [
    ...otherBlocks,
    MyBlock
];
```
- Register the component inside using the following in the `wp-plugin-cc-gutenberg-blocks.php` file.
`register_block_type('common/users-list');`

There you go, it is a ready to use component.

---

## Running the scripts
Below you will find some information on how to run scripts.

### 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run build`
- Use to build production code for your block inside `build` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://davidhuertas.dev"><img src="https://avatars.githubusercontent.com/u/77805983?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Huertas</b></sub></a><br /><a href="#maintenance-ikurotime" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://hugo.solar"><img src="https://avatars.githubusercontent.com/u/894708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hugo Solar</b></sub></a><br /><a href="https://github.com/creativecommons/wp-plugin-cc-gutenberg-blocks/commits?author=hugosolar" title="Code">💻</a></td>
    <td align="center"><a href="http://kritigodey.com"><img src="https://avatars.githubusercontent.com/u/287034?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kriti Godey</b></sub></a><br /><a href="https://github.com/creativecommons/wp-plugin-cc-gutenberg-blocks/pulls?q=is%3Apr+reviewed-by%3Akgodey" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
