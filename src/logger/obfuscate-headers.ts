import { mapValues } from "lodash";

export const obfuscateHeaders = (
  headers: Record<string, string | string[] | undefined>
) => {
  return mapValues(headers, (value, key) =>
    typeof value === "string" && key.toLowerCase().includes("authorization")
      ? `${value.slice(0, 3)}...${value.slice(-3)}`
      : value
  );
};
