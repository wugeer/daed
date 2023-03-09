import { defaultNS, resources } from "~/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: (typeof resources)["zh-Hans"][typeof defaultNS];
    };
  }
}

declare type SortableList = Array<{ id: UniqueIdentifier } & Record<string, unknown>>;

declare type SimpleDisplayable = number | string;

declare type Displayable =
  | null
  | boolean
  | SimpleDisplayable
  | Array<SimpleDisplayable>
  | Array<{ [key: string]: unknown; key: string; val: string }>;
