import { Plugin } from '@ckeditor/ckeditor5-core';
import HeadingStyleCommand from './headingstylecommand';

import { modelToViewStyleAttribute } from './converters';
import { normalizeHeadingStyles } from './utils';

export default class HeadingStyleEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'HeadingStyleEditing';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const data = editor.data;
        const editing = editor.editing;

        // Define default configuration.
        editor.config.define( 'heading.styles', [ 'l', 'm', 's' ] );

        // Get configuration.
        const styles = normalizeHeadingStyles( editor.config.get( 'heading.styles' ) );

        schema.extend( 'heading1', { allowAttributes: 'headingStyle' } );
        schema.extend( 'heading2', { allowAttributes: 'headingStyle' } );
        schema.extend( 'heading3', { allowAttributes: 'headingStyle' } );
        schema.extend( 'heading4', { allowAttributes: 'headingStyle' } );
        schema.extend( 'heading5', { allowAttributes: 'headingStyle' } );
        schema.extend( 'heading6', { allowAttributes: 'headingStyle' } );

        const modelToViewConverter = modelToViewStyleAttribute( styles );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading1', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading1', modelToViewConverter );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading2', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading2', modelToViewConverter );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading3', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading3', modelToViewConverter );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading4', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading4', modelToViewConverter );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading5', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading5', modelToViewConverter );
        editing.downcastDispatcher.on( 'attribute:headingStyle:heading6', modelToViewConverter );
        data.downcastDispatcher.on( 'attribute:headingStyle:heading6', modelToViewConverter );

        // Register imageStyle command.
        editor.commands.add( 'headingStyle', new HeadingStyleCommand( editor, styles ) );
    }
}
