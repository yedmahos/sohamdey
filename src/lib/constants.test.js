import { describe, expect, test } from "bun:test";
import { CONTACT_URL, RESUME_URL } from "./constants";

describe("portfolio contact destination", () => {
  test("opens WhatsApp for the supplied Indian phone number", () => {
    expect(CONTACT_URL).toBe("https://wa.me/919475565982");
  });

  test("opens the supplied Google Drive folder for the resume", () => {
    expect(RESUME_URL).toBe("https://drive.google.com/file/d/11anu0Yz9Cm-w0WeUE0I-u_nqJqrpC4jA/view");
  });
});