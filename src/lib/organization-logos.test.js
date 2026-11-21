import { expect, test } from "bun:test";
import { ORGANIZATION_LOGOS } from "./organization-logos";

test("organization sequence keeps the six requested organizations in order", () => {
  expect(ORGANIZATION_LOGOS.map((logo) => logo.name)).toEqual([
    "Enactus", "KIIT E-Cell", "GeeksforGeeks", "Protrainy", "USC KIIT", "KIIT",
  ]);
});