import {m_js_for_each} from "./../node_modules/mykro/src/m/js/for/each.mjs";
import {g_pixels_to_edges} from "./g/pixels/to/edges.mjs";
import {m_js_assert} from "mykro/src/m/js/assert.mjs";
import {m_js_equals} from "mykro/src/m/js/equals.mjs";
import {m_js_arguments_assert} from "./../node_modules/mykro/src/m/js/arguments/assert.mjs";
export async function sandbox() {
  await m_js_arguments_assert()(arguments);
  let pixels;
  pixels = [[0, 0, 0], [0, 1, 0], [0, 1, 0], [0, 0, 0]];
  let edges = await g_pixels_to_edges(pixels);
  console.log(edges);
  return;
  let e1 = [[1, 1], [2, 1]];
  let e2 = [[1, 1], [1, 3]];
  let e3 = [[1, 3], [2, 3]];
  let e4 = [[2, 1], [2, 3]];
  let f = e1;
  let contains = false;
  await m_js_for_each(edges, async e => {
    let matches = e[0] === f[0] && e[1] === f[1] || e[0] === f[1] && e[1] === f[0];
    if (matches) {
      contains = true;
      return true;
    }
  });
}
