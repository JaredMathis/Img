import {list_add} from "./../../../../node_modules/mykro/src/list/add.mjs";
import {m_js_for_each} from "./../../../../node_modules/mykro/src/m/js/for/each.mjs";
import {list_is} from "./../../../../node_modules/mykro/src/list/is.mjs";
import {m_js_arguments_assert} from "./../../../../node_modules/mykro/src/m/js/arguments/assert.mjs";
import {list_index_first_or_last_is} from "./../../../list/index/first/or/last/is.mjs";
export async function g_pixels_to_edges(pixels) {
  await m_js_arguments_assert(list_is)(arguments);
  let result = [];
  await m_js_for_each(pixels, async (row, row_index) => {
    if (await list_index_first_or_last_is(pixels, row_index)) {
      return;
    }
    await m_js_for_each(row, async (col, col_index) => {
      if (await list_index_first_or_last_is(row, col_index)) {
        return;
      }
      if (col !== 1) {
        return;
      }
      let up = await g_pixel_get(pixels, row_index - 1, col_index);
      let down = await g_pixel_get(pixels, row_index + 1, col_index);
      let left = await g_pixel_get(pixels, row_index, col_index - 1);
      let right = await g_pixel_get(pixels, row_index, col_index + 1);
      let neighbors = [up, down, left, right];
      await m_js_for_each(neighbors, async n => {
        if (n.value === 0) {
          await list_add(result, n.point);
        }
      });
    });
  });
  return result;
}
async function g_pixel_get(pixels, r, c) {
  let value = pixels[r][c];
  let result = {
    value,
    point: [r, c],
    row: r,
    column: c
  };
  return result;
}
