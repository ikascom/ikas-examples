import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../hero-banner"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../footer"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "8b5d6278-a490-4f0a-8308-00bf888b79b0": Component0,"ae2074dc-577e-40a1-a9aa-6104aaacdb40": Component1,"a1ea193f-50da-48a3-baa7-5fa8b9ec5b41": Component2
};

export default Components;