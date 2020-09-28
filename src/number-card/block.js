/**
 * BLOCK: vocabulary-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import { useCallback, useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
//import { useSelect } from '@wordpress/data';
import {
	getColorClassName,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';

import './editor.scss';
import './style.scss';
import globals from 'cgbGlobal';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings } = wp.blockEditor; // Import color settings from wp.editor
const { RichText } = wp.blockEditor; // Import RichText blocks from wp.editor
const { useDispatch, useSelect } = wp.data;

	
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-vocabulary-number-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Number Card' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'link' ),
		__( 'content' ),
	],
	attributes: {
		bgColor: {
			type: 'string',
			default: 'white',
		},
		bgColorSlug: {
			type: 'string',
		},
		txtColor: {
			type: 'string',
			default: 'black',
		},
		txtColorSlug: {
			type: 'string',
		},
		contentTitle: {
			type: 'string',
			default: 'title'
		},
		contentNumber: {
			type: 'string',
		},
		contentLink: {
			type: 'string',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const bgColor = props.attributes.bgColor;
		const bgColorSlug = props.attributes.bgColorSlug;
		const txtColor = props.attributes.txtColor;
		const txtColorSlug = props.attributes.txtColorSlug;
		const contentTitle = props.attributes.contentTitle;
		const contentNumber = props.attributes.contentNumber;
		const contentLink = props.attributes.contentLink;
		const { attributes: className, setAttributes } = props;
		const colors = wp.data.select( "core/editor" ).getEditorSettings().colors;

		const onChangeContentTitle = contentTitle => {
			setAttributes({ contentTitle });
		};
		const onChangeContentNumber = contentNumber => {
			setAttributes({ contentNumber });
		};
		const onChangeContentLink = contentLink => {
			setAttributes({ contentLink });
		};

		return [
			<InspectorControls key="3">
				<PanelColorSettings
					title={__('Color Settings', 'creativecommons')}
					colorSettings={[
						{
							label: __('Background Color'),
							value: bgColor,
							onChange: colorValue => { 
								let colorClass = getColorObjectByColorValue(colors, colorValue);
								props.setAttributes({ bgColor: colorValue, bgColorSlug : colorClass.slug })
							} ,
						},
						{
							label: __('Text Color'),
							value: txtColor,
							onChange: colorValue => {
								let colorClass = getColorObjectByColorValue(colors, colorValue);
								props.setAttributes({ txtColor: colorValue, txtColorSlug : colorClass.slug })
							}
						},
					]}
				/>
			</InspectorControls>,
			<div key="2" >
				<div class="card number-card" style={{ backgroundColor: bgColor, color: txtColor }}>
					<span className="number">
						<div className="cc-cgb-richtext-input">
							<RichText
								className={className}
								placeholder={__('Number', 'CreativeCommons')}
								keepPlaceholderOnFocus={true}
								onChange={onChangeContentNumber}
								value={contentNumber}
							/>
						</div>
					</span>
					<h5>
						<div className="cc-cgb-richtext-input">
							<RichText
								className={className}
								placeholder={__('This content', 'CreativeCommons')}
								keepPlaceholderOnFocus={true}
								onChange={onChangeContentTitle}
								value={contentTitle}
							/>
						</div>		
					</h5>
				</div>
				<span>
					Card link :
				</span>
				<div className="cc-cgb-richtext-input">
					<RichText
						className={className}
						placeholder={__('Card link ', 'CreativeCommons')}
						keepPlaceholderOnFocus={true}
						onChange={onChangeContentLink}
						value={contentLink}
					/>
				</div>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const bgColor = props.attributes.bgColor;
		const bgColorSlug = props.attributes.bgColorSlug;
		const txtColor = props.attributes.txtColor;
		const txtColorSlug = props.attributes.txtColorSlug;
		const contentTitle = props.attributes.contentTitle;
		const contentNumber = props.attributes.contentNumber;
		const contentLink = props.attributes.contentLink;
		const classes_with_link = ['card', 'number-card', 'no-border', 'background-'+bgColorSlug, 'text-'+txtColorSlug].join(' ');
		const classes_without_link = ['card', 'number-card', 'no-border', 'no-link'].join(' ');
		if (contentLink != undefined) {
			return (
			<div className={ props.className }>
				<a href={contentLink} className={classes_with_link}>
					<span className="number">{contentNumber}.</span>
					<h5>{contentTitle}</h5>
				</a>
			</div>
		);
		} else {
			return (
			<div className={ props.className }>
				<div className={classes_without_link}>
					<span className="number">{contentNumber}.</span>
					<h5>{contentTitle}</h5>
				</div>
			</div>
		);
		}
		
	},
} );
