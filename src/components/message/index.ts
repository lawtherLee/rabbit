import XtxMessage from "./index.vue";
import {h, render} from "vue";
// 创建message组件的虚拟dom，在渲染真实dom
type MsgType = "success" | "error" | "warning";
export default function Message(
  type: MsgType,
  content: string,
  duration?: number,
) {
  const VNode = h(XtxMessage, { type, content });
  render(VNode, document.body);
  setTimeout(() => {
    render(null, document.body);
  }, duration || 2000);
}

Message.success = function (content: string, duration?: number) {
  Message("success", content, duration);
};
Message.error = function (content: string, duration?: number) {
  Message("error", content, duration);
};
Message.warning = function (content: string, duration?: number) {
  Message("warning", content, duration);
};
