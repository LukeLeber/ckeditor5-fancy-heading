import { Command } from '@ckeditor/ckeditor5-core';
import { isHeading } from './utils';

export default class HeadingStyleCommand extends Command {

    constructor( editor, styles ) {
        super( editor );
        this.defaultStyle = false;
        this.styles = styles.reduce( ( styles, style ) => {
            styles[ style.name ] = style;
            if ( style.isDefault ) {
                this.defaultStyle = style.name;
            }
            return styles;
        }, {} );
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const element = this.editor.model.document.selection.getSelectedElement();

        this.isEnabled = isHeading( element );

        if ( !element ) {
            this.value = false;
        } else if ( element.hasAttribute( 'headingStyle' ) ) {
            const attributeValue = element.getAttribute( 'headingStyle' );
            this.value = this.styles[ attributeValue ] ? attributeValue : false;
        } else {
            this.value = this.defaultStyle;
        }
    }

    execute( options ) {
        const styleName = options.value;

        const model = this.editor.model;
        const imageElement = model.document.selection.getSelectedElement();

        model.change( writer => {
            // Default style means that there is no `imageStyle` attribute in the model.
            // https://github.com/ckeditor/ckeditor5-image/issues/147
            if ( this.styles[ styleName ].isDefault ) {
                writer.removeAttribute( 'headingStyle', imageElement );
            } else {
                writer.setAttribute( 'headingStyle', styleName, imageElement );
            }
        } );
    }
}