import { Plugin } from '@ckeditor/ckeditor5-core';
import HeadingStyleEditing from './src/headingstyleediting';
import HeadingStyleUI from './src/headingstyleui';

export default class ImageStyle extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [ HeadingStyleEditing, HeadingStyleUI ];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'HeadingStyle';
  }
}
