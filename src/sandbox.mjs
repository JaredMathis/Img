import {m_js_arguments_assert} from "./../node_modules/mykro/src/m/js/arguments/assert.mjs";
export async function sandbox() {
  await m_js_arguments_assert()(arguments);
}
