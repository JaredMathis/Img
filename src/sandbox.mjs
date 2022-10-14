import {list_add} from "./../node_modules/mykro/src/list/add.mjs";
import {list_index_first_or_last_is} from "./list/index/first/or/last/is.mjs";
import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
export async function sandbox() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1, 1], [1, 2]], [[1, 1], [2, 1]], [[2, 1], [2, 2]], [[2, 1], [2, 2]]];
  let actual = await to_segments(simple);
}
async function to_segments(grid) {
  let result = [];
  await m_js_for_each(grid, async (row, row_index) => {
    if (await list_index_first_or_last_is(grid, row_index)) {
      return;
    }
    await m_js_for_each(row, async (col, col_index) => {
      if (await list_index_first_or_last_is(row, col_index)) {
        return;
      }
      let value = grid[row_index][col_index];
      if (value !== 1) {
        return;
      }
      let neighbors = {
        up: {
          row: row_index - 1,
          col: col_index
        },
        down: {
          row: row_index + 1,
          col: col_index
        },
        left: {
          row: row_index,
          col: col_index - 1
        },
        right: {
          row: row_index,
          col: col_index + 1
        }
      };
      for (let neighbor in neighbors) {
        let n = neighbors[neighbor];
        if (grid[n.row][n.col] === 0) {
          await list_add(result, midpoint(n.col, n.row, row_index, col_index));
        }
      }
      console.log({
        row_index,
        col_index,
        value,
        neighbors
      });
    });
  });
}
function midpoint(x1, y1, x2, y2) {
  return [(y1 + y2) / 2, (x1 + x2) / 2];
}
