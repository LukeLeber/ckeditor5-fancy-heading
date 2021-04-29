import { logWarning } from '@ckeditor/ckeditor5-utils';
import { icons } from '@ckeditor/ckeditor5-core';
import {isWidget} from "@ckeditor/ckeditor5-widget";

const defaultStyles = {
    // This option is equal to the situation when no style is applied.
    l: {
        name: 'l',
        title: 'Extra large',
        icon: icons.objectSizeLarge,
        isDefault: false
    },
    m: {
        name: 'm',
        title: 'Medium',
        icon: icons.objectSizeMedium,
        isDefault: true
    },
    s: {
        name: 's',
        title: 'Small',
        icon: icons.objectSizeSmall,
        isDefault: false
    },
};

const defaultIcons = {
    l: icons.objectSizeLarge,
    m: icons.objectSizeMedium,
    s: icons.objectSizeSmall,
};

export function normalizeHeadingStyles( configuredStyles = [] ) {
    return configuredStyles.map( _normalizeStyle );
}

function _normalizeStyle( style ) {
    if ( typeof style == 'string' ) {
        const styleName = style;
        if ( defaultStyles[ styleName ] ) {
            style = Object.assign( {}, defaultStyles[ styleName ] );
        }
        else {
            logWarning( 'heading-style-not-found', { name: styleName } );
            style = {
                name: styleName
            };
        }
    }
    else if ( defaultStyles[ style.name ] ) {
        const defaultStyle = defaultStyles[ style.name ];
        const extendedStyle = Object.assign( {}, style );

        for ( const prop in defaultStyle ) {
            if ( !Object.prototype.hasOwnProperty.call( style, prop ) ) {
                extendedStyle[ prop ] = defaultStyle[ prop ];
            }
        }

        style = extendedStyle;
    }
    if ( typeof style.icon == 'string' && defaultIcons[ style.icon ] ) {
        style.icon = defaultIcons[ style.icon ];
    }
    return style;
}

export function isHeading( modelElement ) {
    return !!modelElement && (modelElement.is( 'element', 'heading1' ) || modelElement.is( 'element', 'heading2' ) || modelElement.is( 'element', 'heading3' ) || modelElement.is( 'element', 'heading4' ) || modelElement.is( 'element', 'heading5' ) || modelElement.is( 'element', 'heading6' ) );
}

export function getSelectedHeadingWidget( selection ) {
    const viewElement = selection.getFirstPosition().parent;
    if ( viewElement && isHeadingWidget( viewElement ) ) {
        return viewElement;
    }
    return null;
}

export function isHeadingWidget( viewElement ) {
    return (
        viewElement.parent.name === 'h2' ||
        viewElement.parent.name === 'h3' ||
        viewElement.parent.name === 'h4' ||
        viewElement.parent.name === 'h5' ||
        viewElement.parent.name === 'h6') && isWidget( viewElement );
}