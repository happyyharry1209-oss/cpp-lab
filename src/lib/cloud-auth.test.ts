import { describe, expect, it } from "vitest";
import { isOwnerEmail } from "./cloud-auth";

describe("owner access", () => {
  it("matches the configured GitHub email case-insensitively", () => {
    expect(isOwnerEmail("Owner@Example.com", "owner@example.com")).toBe(true);
  });

  it("rejects a missing or different email", () => {
    expect(isOwnerEmail(undefined, "owner@example.com")).toBe(false);
    expect(isOwnerEmail("guest@example.com", "owner@example.com")).toBe(false);
    expect(isOwnerEmail("owner@example.com", undefined)).toBe(false);
  });
});
