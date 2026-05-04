import { enStrings } from "./app.en.strings";

export const appStrings = { ...enStrings };

type AllPartial<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? AllPartial<K[attr]>
    : K[attr] extends object | null
      ? AllPartial<K[attr]> | null
      : K[attr] extends object | null | undefined
        ? AllPartial<K[attr]> | null | undefined
        : K[attr];
};

export type StringsType = AllPartial<typeof enStrings>;
