import ServerSideRender from '@wordpress/server-side-render';
import { useEffect } from 'react';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	useEffect( () => {
		const readyStateCheckInterval = setInterval( function() {
			if ( document.querySelector( '#terms' ) ) {
				clearInterval( readyStateCheckInterval );
				const terms = document.querySelector( '#terms' );
				terms.addEventListener( 'blur', ( e ) => {
					setAttributes( { selectedValue: e.target.value } );
				} );
			}
		}, 10 );
	} );
	return ( <div { ...blockProps }>
		<ServerSideRender
			key={ attributes.selectedValue }
			block="common/users-list"
			attributes={ attributes }
		/>
	</div> );
}
