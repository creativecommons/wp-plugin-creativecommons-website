import { registerBlockType } from '@wordpress/blocks';
/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */
console.log("loadeddddd 2222")



registerBlockType('common/my-plugin', {
    apiVersion: 2,
    title: 'my-plugin',
    icon: 'list-alt',
    category: 'common',
    example: {},
    edit: (props) => (<div> <Edit attributes={props.attributes} /></div>)

});
