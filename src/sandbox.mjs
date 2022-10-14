import {list_add} from "./../node_modules/mykro/src/list/add.mjs";
import {list_index_first_or_last_is} from "./list/index/first/or/last/is.mjs";
import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
export async function sandbox() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1, 1], [1, 2]], [[1, 1], [2, 1]], [[2, 1], [2, 2]], [[2, 1], [2, 2]]];
  let actual = await to_segments(simple);
  console.log(actual)
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
      let vertical = ['up', 'down'];
      let horizontal = ['left', 'right'];
      for (let neighbor in neighbors) {
        let n = neighbors[neighbor];
        if (grid[n.row][n.col] === 0) {   
          let m = midpoint(n.col, n.row, col_index, row_index);    
          if (vertical.includes(neighbor)) {
            await list_add(result, [point_translate(m, 1, 0.5), point_translate(m, 1, -0.5)]);
          }   
          if (horizontal.includes(neighbor)) {
            await list_add(result, [point_translate(m, 0.5, 1), point_translate(m, -0.5, 1)]);
          }
        }
      }
    });
  });
  return result;
}
function point_translate(p, x, y) {
  return [p[0] + y, p[1] + x];
}
function midpoint(x1, y1, x2, y2) {
  return [(y1 + y2) / 2, (x1 + x2) / 2];
}
