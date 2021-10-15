import { registerBlockType } from "@wordpress/blocks";
import * as UsersList from "./users-list/index";

const blocks = [ UsersList ];

function registerBlock( block ) {
	const { name, settings } = block;
	registerBlockType( `common/${ name }`, settings );
}

blocks.forEach( registerBlock );
