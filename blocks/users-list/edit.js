import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';

export default function Edit( { attributes, setAttributes } ) {
	const userGroups = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'group' );
	}, [] );

	/* Display all group names */
	const changeGroupName = ( role ) => {
		if ( ! role ) {
			setAttributes( { selectedValue: null } );
			return;
		}
		const selectedValue = parseInt( role.target.value );
		setAttributes( { selectedValue } );
	};

	return ( <div>
		<label htmlFor="terms">Choose a role: </label>
		<select name="terms" onBlur={ ( r )=>changeGroupName( r ) } id="terms">
			<option value="">All</option>

			{ userGroups && userGroups.map( function( taxo, i ) {
				return <option key={ i } value={ taxo.id }>{ taxo.name }</option>;
			} ) }

		</select>
		<ServerSideRender
			key={ attributes.selectedValue }
			block="common/users-list"
			attributes={ attributes }
		/>
	</div> );
}
