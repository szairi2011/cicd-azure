import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export const StoreDevModules = [
  StoreDevtoolsModule.instrument({
    name: "Admin portal"
  })
];
