import { Plugin } from '@ckeditor/ckeditor5-core';
import { WidgetToolbarRepository } from '@ckeditor/ckeditor5-widget';

import {getSelectedHeadingWidget} from './utils';

export default class HeadingStyleToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [ WidgetToolbarRepository ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'HeadingStyleToolbar';
    }

    /**
     * @inheritDoc
     */
    afterInit() {
        console.log('init..');
        const editor = this.editor;
        const t = editor.t;
        const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

        widgetToolbarRepository.register( 'headingstyle', {
            ariaLabel: t( 'Heading toolbar' ),
            items: editor.config.get( 'headingstyle.toolbar' ) || [],
            getRelatedElement: getSelectedHeadingWidget
        } );
    }
}