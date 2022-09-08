import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../hero-banner"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../footer"), { loading: () => <IkasEditorComponentLoader /> });
const Component3 = dynamic(() => import("../product-detail"), { loading: () => <IkasEditorComponentLoader /> });
const Component4 = dynamic(() => import("../login"), { loading: () => <IkasEditorComponentLoader /> });
const Component5 = dynamic(() => import("../register"), { loading: () => <IkasEditorComponentLoader /> });
const Component6 = dynamic(() => import("../forgot-password"), { loading: () => <IkasEditorComponentLoader /> });
const Component7 = dynamic(() => import("../recover-password"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "8b5d6278-a490-4f0a-8308-00bf888b79b0": Component0,"ae2074dc-577e-40a1-a9aa-6104aaacdb40": Component1,"a1ea193f-50da-48a3-baa7-5fa8b9ec5b41": Component2,"4fd7e253-29f0-41d7-924f-cbfa1c85c74f": Component3,"58251b96-18ee-42bc-bf7a-75532385f30d": Component4,"2b6b4787-34f6-482e-a7ba-ba1401644295": Component5,"b382e9ea-6d5f-4e16-91de-1c5ba47bec02": Component6,"4018269a-2cae-44fb-8747-978ee92e1bdb": Component7
};

export default Components;