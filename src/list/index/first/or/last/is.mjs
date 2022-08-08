import {list_index_last} from "./../../../../../../node_modules/mykro/src/list/index/last.mjs";
import {m_js_number_is} from "./../../../../../../node_modules/mykro/src/m/js/number/is.mjs";
import {list_is} from "./../../../../../../node_modules/mykro/src/list/is.mjs";
import {m_js_arguments_assert} from "./../../../../../../node_modules/mykro/src/m/js/arguments/assert.mjs";
export async function list_index_first_or_last_is(list, index) {
  await m_js_arguments_assert(list_is, m_js_number_is)(arguments);
  if (index === 0) {
    return true;
  }
  if (index === await list_index_last(list)) {
    return true;
  }
  return false;
}
