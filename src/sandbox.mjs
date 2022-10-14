import {list_index_first_or_last_is} from "./list/index/first/or/last/is.mjs";
import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
export async function sandbox() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1, 1], [1, 2]], [[1, 1], [2, 1]], [[2, 1], [2, 2]], [[2, 1], [2, 2]]];
  let actual = await to_segments(simple);
}
async function to_segments(grid) {
  await m_js_for_each(grid, async (row, row_index) => {
    if (await list_index_first_or_last_is(grid, row_index)) {
      return;
    }
    await m_js_for_each(row, async (col, col_index) => {
      if (await list_index_first_or_last_is(row, col_index)) {
        return;
      }
      let neighbors = {
        up: grid[row_index-1][col_index],
        down: grid[row_index+1][col_index],
        left: grid[row_index][col_index-1],
        right: grid[row_index][col_index+1],
      }
      let value = grid[row_index][col_index];
      console.log({
        row_index,
        col_index,
        value,
        neighbors
      });
    });
  });
}
