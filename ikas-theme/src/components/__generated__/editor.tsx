import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../start"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../hero-banner"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "28626d46-97f8-45e7-9c25-dcb16d618676": Component0,"8b5d6278-a490-4f0a-8308-00bf888b79b0": Component1,"ae2074dc-577e-40a1-a9aa-6104aaacdb40": Component2
};

export default Components;