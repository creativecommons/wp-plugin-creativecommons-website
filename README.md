# Common Blocks
This project is built using @wordpress/scripts. It is used to create custom blocks. Please following the steps given below to modify or create blocks.

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

Below you will find some information on how to run scripts.

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `build` folder.
- Runs once and reports back the gzip file sizes of the produced code.
