import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
export async function sandbox() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1, 1], [1, 2]], [[1, 1], [2, 1]], [[2, 1], [2, 2]], [[2, 1], [2, 2]]];
  let actual = await to_segments(simple);
}
async function to_segments(grid) {
  await m_js_for_each(grid, async (row, row_index) => {
    await m_js_for_each(row, async (col, col_index) => {
      console.log({
        row_index,
        col_index
      });
    });
  });
}
