// import original module declarations
import {} from "styled-components";
import { Theme } from "src/styles/styled";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
