import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import { normalizeHeadingStyles } from './utils';

export default class HeadingStyleUI extends Plugin {
    static get pluginName() {
        return 'HeadingStyleUI';
    }

    get localizedDefaultStylesTitles() {
        const t = this.editor.t;
        return {
            'Large': t( 'Large' ),
            'Medium': t( 'Medium' ),
            'Small': t( 'Small' ),
        };
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const configuredStyles = editor.config.get( 'heading.styles' );

        const translatedStyles = translateStyles( normalizeHeadingStyles( configuredStyles ), this.localizedDefaultStylesTitles );

        for ( const style of translatedStyles ) {
            this._createButton( style );
        }
    }

    _createButton( style ) {
        const editor = this.editor;

        const componentName = `headingStyle:${ style.name }`;

        editor.ui.componentFactory.add( componentName, locale => {
            const command = editor.commands.get( 'headingStyle' );
            const view = new ButtonView( locale );

            view.set( {
                label: style.title,
                icon: style.icon,
                tooltip: true,
                isToggleable: true
            } );

            view.bind( 'isEnabled' ).to( command, 'isEnabled' );
            view.bind( 'isOn' ).to( command, 'value', value => value === style.name );

            this.listenTo( view, 'execute', () => {
                editor.execute( 'headingStyle', { value: style.name } );
                editor.editing.view.focus();
            } );

            return view;
        } );
    }
}

function translateStyles( styles, titles ) {
    for ( const style of styles ) {
        if ( titles[ style.title ] ) {
            style.title = titles[ style.title ];
        }
    }
    return styles;
}