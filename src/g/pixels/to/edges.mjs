import {list_index_last} from "./../../../../node_modules/mykro/src/list/index/last.mjs";
import {m_js_for_each} from "./../../../../node_modules/mykro/src/m/js/for/each.mjs";
import {list_is} from "./../../../../node_modules/mykro/src/list/is.mjs";
import {m_js_arguments_assert} from "./../../../../node_modules/mykro/src/m/js/arguments/assert.mjs";
export async function g_pixels_to_edges(pixels) {
  await m_js_arguments_assert(list_is)(arguments);
  await m_js_for_each(pixels, async (row, row_index) => {
    if (row_index === 0) {
      return;
    }
    if (row_index === await list_index_last(pixels)) {
      return;
    }
    await m_js_for_each(row, async (col, col_index) => {
      if (col !== 1) {
        return;
      }
      let up = pixels[row_index - 1];
    });
  });
}
