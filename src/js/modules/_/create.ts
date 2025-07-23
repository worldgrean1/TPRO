import * as __glob_0 from './../Accordion.js';
import * as __glob_1 from './../AdminPage.js';
import * as __glob_2 from './../Translink.js';
import * as __glob_3 from './../TranslinkDB.js';
import * as __glob_4 from './../AudioToggler.js';
import * as __glob_5 from './../Cursor.js';
import * as __glob_6 from './../Modal.js';
import * as __glob_7 from './../ModalToggler.js';
import * as __glob_8 from './../Outline.js';
import * as __glob_9 from './../Parallax.js';
import * as __glob_10 from './../ScrollController(old).js';
import * as __glob_11 from './../ScrollController.js';
import * as __glob_12 from './../button_old.js';
import * as __glob_13 from './../example.js';
import * as __glob_14 from './../loader.js';
import * as __glob_15 from './../menu.js';
import * as __glob_16 from './../progress.js';
import * as __glob_17 from './../scramble.js';
import * as __glob_18 from './../shapes.js';
import * as __glob_19 from './../splitlines.js';
import * as __glob_20 from './../tags.js';
import * as __glob_21 from './../text.js';
import * as __glob_22 from './../viewport.js';
// @ts-ignore
// const modules = {  };
const modules = { "./../Accordion.js": __glob_0, "./../AdminPage.js": __glob_1, "./../Translink.js": __glob_2, "./../TranslinkDB.js": __glob_3, "./../AudioToggler.js": __glob_4, "./../Cursor.js": __glob_5, "./../Modal.js": __glob_6, "./../ModalToggler.js": __glob_7, "./../Outline.js": __glob_8, "./../Parallax.js": __glob_9, "./../ScrollController(old).js": __glob_10, "./../ScrollController.js": __glob_11, "./../button_old.js": __glob_12, "./../example.js": __glob_13, "./../loader.js": __glob_14, "./../menu.js": __glob_15, "./../progress.js": __glob_16, "./../scramble.js": __glob_17, "./../shapes.js": __glob_18, "./../splitlines.js": __glob_19, "./../tags.js": __glob_20, "./../text.js": __glob_21, "./../viewport.js": __glob_22 };
// console.log("modules -> []", modules);

export function createModules(dataAttribute = "module") {
  return Array.from(document.querySelectorAll(`[data-${dataAttribute}]`))
    .map((element) => {
      const attributeValue = (element as HTMLElement).dataset[dataAttribute];
      // const modulePath = `./../${attributeValue}.ts`;
      const modulePaths = [
        `./../${attributeValue}.ts`,
        `./../${attributeValue}.js`
      ];
      const foundModule = modulePaths.find(path => modules[path]);

      const modulePath = foundModule;
      if (modules[modulePath]) {
        const ModuleClass = Object.values(modules[modulePath])[0];
        // console.log("ModuleClass", ModuleClass);
        try {
          return new ModuleClass(element);
        } catch (error) {
          console.warn(
            `Failed to instantiate ${dataAttribute} ${attributeValue}:`,
            error
          );
          return null;
        }
      } else {
        console.warn(`${dataAttribute} not found: ${attributeValue}`);
        return null;
      }
    })
    .filter((item) => item !== null);
}
