import {h, render} from "vue";
import XtxConfirm from "./index.vue"; // export default function Confirm(
// 方法1
// export default function Confirm(
//   title: string,
//   content: string,
//   {
//     onCancel,
//     onConfirm,
//   }: {
//     onCancel: () => void;
//     onConfirm: () => void;
//   },
// ) {
//   const VNode = h(XtxConfirm, {
//     title,
//     content,
//     onCancel,
//     onConfirm,
//   });
//   render(VNode, document.body);
// }
export default function Confirm(title: string, content: string) {
  return new Promise((resolve, reject) => {
    const onConfirm = () => {
      resolve("点击确定");
      render(null, document.body);
    };
    const onCancel = () => {
      reject();
      render(null, document.body);
    };

    const VNode = h(XtxConfirm, {
      title,
      content,
      onCancel,
      onConfirm,
    });
    render(VNode, document.body);
  });
}
