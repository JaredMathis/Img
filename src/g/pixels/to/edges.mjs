import {m_js_for_each} from "./../../../../node_modules/mykro/src/m/js/for/each.mjs";
import {list_is} from "./../../../../node_modules/mykro/src/list/is.mjs";
import {m_js_arguments_assert} from "./../../../../node_modules/mykro/src/m/js/arguments/assert.mjs";
export async function g_pixels_to_edges(pixels) {
  await m_js_arguments_assert(list_is)(arguments);
  await m_js_for_each(pixels, async (row, row_index) => {
    await m_js_for_each(row, async (col, col_index)  => {
      
    });
  });
}
