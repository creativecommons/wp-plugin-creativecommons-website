import { registerBlockType } from '@wordpress/blocks';
import Edit from './components/edit';
/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */
console.log("loadeddddd")



registerBlockType('common/users-list', {
    apiVersion: 2,
    title: 'Users List',
    icon: 'list-alt',
    category: 'common',
    example: {},
    edit: (props) => (<div> <Edit attributes={props.attributes} /></div>)

});
