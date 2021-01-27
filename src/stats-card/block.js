/**
 * BLOCK: vocabulary-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.blockEditor; // Import RichText blocks from wp.edito

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
registerBlockType("cgb/block-vocabulary-card-stats", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Stats Card"), // Block title.
	icon: "index-card", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("card"), __("stats"), __("content")],
	attributes: {
		contentNumber: {
			type: "string",
		},
		contentText: {
			type: "string",
		},
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
	edit: (props) => {
		const contentNumber = props.attributes.contentNumber;
		const contentText = props.attributes.contentText;
		const { attributes: className, setAttributes } = props;

		const onChangeContentNumber = (contentNumber) => {
			setAttributes({ contentNumber });
		};
		const onChangeContentText = (contentText) => {
			setAttributes({ contentText });
		};

		return [
			<div key="2">
				<div className={`card stats-card`}>
					<div className={`number`}>
						<div className="cc-cgb-richtext-input">
							<RichText
								className={className}
								placeholder={__("Number", "CreativeCommons")}
								keepPlaceholderOnFocus={true}
								onChange={onChangeContentNumber}
								value={contentNumber}
							/>
						</div>
					</div>
					<div className={`caption`}>
						<div className="cc-cgb-richtext-input">
							<RichText
								className={className}
								placeholder={__("Caption", "CreativeCommons")}
								keepPlaceholderOnFocus={true}
								onChange={onChangeContentText}
								value={contentText}
							/>
						</div>
					</div>
				</div>
			</div>,
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
	save: (props) => {
		const contentNumber = props.attributes.contentNumber;
		const contentText = props.attributes.contentText;
		const classes = ["card", "stats-card"].join(" ");
		return (
			<div className={props.className}>
				<div className={classes}>
					<div className={`number`}>{contentNumber}</div>
					{contentText && <div className={`caption`}>{contentText}</div>}
				</div>
			</div>
		);
	},
});
