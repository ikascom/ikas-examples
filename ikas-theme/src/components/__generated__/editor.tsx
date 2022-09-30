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
const Component8 = dynamic(() => import("../page-brand"), { loading: () => <IkasEditorComponentLoader /> });
const Component9 = dynamic(() => import("../page-category"), { loading: () => <IkasEditorComponentLoader /> });
const Component10 = dynamic(() => import("../page-search"), { loading: () => <IkasEditorComponentLoader /> });
const Component11 = dynamic(() => import("../account"), { loading: () => <IkasEditorComponentLoader /> });
const Component12 = dynamic(() => import("../cart"), { loading: () => <IkasEditorComponentLoader /> });
const Component13 = dynamic(() => import("../page-404"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "8b5d6278-a490-4f0a-8308-00bf888b79b0": Component0,"ae2074dc-577e-40a1-a9aa-6104aaacdb40": Component1,"a1ea193f-50da-48a3-baa7-5fa8b9ec5b41": Component2,"4fd7e253-29f0-41d7-924f-cbfa1c85c74f": Component3,"58251b96-18ee-42bc-bf7a-75532385f30d": Component4,"2b6b4787-34f6-482e-a7ba-ba1401644295": Component5,"b382e9ea-6d5f-4e16-91de-1c5ba47bec02": Component6,"4018269a-2cae-44fb-8747-978ee92e1bdb": Component7,"c8853ae6-208e-4937-93a5-36a025cb44e3": Component8,"5dfdb8fe-de7b-4413-a00a-ad3af9f887ad": Component9,"9b971632-face-4723-bbdf-e3db79974eb2": Component10,"f2e59aaa-6e1c-4dba-9ae0-3d62d08ee2c0": Component11,"d1d2ba23-1e0d-4708-926b-bc3210bca6b1": Component12,"db6ef045-291c-4e06-92a8-61f6644d8f2c": Component13
};

export default Components;