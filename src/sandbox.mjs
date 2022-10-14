import {list_add} from "./../node_modules/mykro/src/list/add.mjs";
import {list_index_first_or_last_is} from "./list/index/first/or/last/is.mjs";
import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
import { m_js_assert } from "mykro/src/m/js/assert.mjs";
import { m_js_equals } from "mykro/src/m/js/equals.mjs";
export async function sandbox() {
  await simple_1();
  await simple_2();
  await simple_3();
}  
async function simple_3() {
  let actual = await glue_segments([[1, 2], [1, 3]], [[1, 3], [1, 4]]);
  let expected = [[1, 4], [1, 2]];
  await m_js_assert(json_equals)(actual, expected);
}

async function simple_2() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [[[1,2],[1,1]],[[2,1],[1,1]],[[2,2],[1,2]],[[3,2],[3,1]],[[3,1],[2,1]],[[3,2],[2,2]]];
  let actual = await to_segments(simple);
  await m_js_assert(json_equals)(actual, expected);
}
async function simple_1() {
  let simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  let expected = [
    [[1, 2], [1, 1]],
    [[2, 2], [2, 1]],
    [[2, 1], [1, 1]],
    [[2, 2], [1, 2]]
  ];
  let actual = await to_segments(simple);
  await m_js_assert(json_equals)(actual, expected);
  let actual2 = await glue_segments_all(actual);
}
function json_equals(a,b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
async function glue_segments_all(segments) {
  let result = segments.slice();
  while (true) {
    let changed = false;
    await m_js_for_each(result, async (s1, index) => {
      if (changed) {
        return;
      }
      await m_js_for_each(result, async (s2, index2) => {
        if (changed) {
          return;
        }
        if (index2 >= index) {
          return;
        }
        let glued;
        if (glued = await glue_segments(s1, s2)) {
          result.splice(result.indexOf(s1), 1);
          result.splice(result.indexOf(s2), 1);
          result.push(glued);
          changed = true;
        }
      });
    });
    if (!changed) {
      break;
    }
  }
  return result;
}
async function glue_segments(s1, s2) {
  if (!await segments_adjacent(s1, s2)) {
    return false;
  }
  if (!await segments_parallel(s1, s2)) {
    return false;
  }
  let c = s1.concat(s2);
  let cx_min = Math.min(...c.map(d => d[1]));
  let cy_min = Math.min(...c.map(d => d[0]));
  let cx_max = Math.max(...c.map(d => d[1]));
  let cy_max = Math.max(...c.map(d => d[0]));
  return [[cy_max, cx_max], [cy_min, cx_min]];
}
async function segments_parallel(s1, s2) {
  let result = false;
  await m_js_for_each(s1, async p1 => {
    await m_js_for_each(s2, async p2 => {
      if (p1[0] == p2[0] || p1[1] == p2[1]) {
        result = true;
      }
    })
  })
  return result;
}
async function segments_adjacent(s1, s2) {
  let result = false;
  await m_js_for_each(s1, async p1 => {
    await m_js_for_each(s2, async p2 => {
      if (json_equals(p1, p2)) {
        result = true;
      }
    })
  })
  return result;
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
          let h_offset = 0;
          let v_offset = 0;  
          if (vertical.includes(neighbor)) {
            h_offset = 0.5;
          }   
          if (horizontal.includes(neighbor)) {
            v_offset = 0.5;
          }
          await list_add(result, [point_translate(m, h_offset + 0.5, v_offset + 0.5), point_translate(m, -h_offset + 0.5, -v_offset + 0.5)]);
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
