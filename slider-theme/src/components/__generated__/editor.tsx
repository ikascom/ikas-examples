import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../start"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../slider"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "28626d46-97f8-45e7-9c25-dcb16d618676": Component0,"056cfd20-f6a3-4b70-9b68-17b3b3bca719": Component1
};

export default Components;