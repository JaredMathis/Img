import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
export async function sandbox() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1, 1], [1, 2]], [[1, 1], [2, 1]], [[2, 1], [2, 2]], [[2, 1], [2, 2]]];
}
async function to_segments(grid) {
  await m_js_for_each(grid, row => {});
}
