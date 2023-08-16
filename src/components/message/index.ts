import XtxMessage from "./index.vue";
import {h, render} from "vue";
// 创建message组件的虚拟dom，在渲染真实dom
type MsgType = "success" | "error" | "warning";
export default function message(type: MsgType, content: string) {
  const VNode = h(XtxMessage, { type, content });
  render(VNode, document.body);
}
