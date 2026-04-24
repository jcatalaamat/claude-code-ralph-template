import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { log } from "../src/logger.js";

const lastWrite = (stream: NodeJS.WriteStream): string => {
  const spy = vi.mocked(stream.write);
  const call = spy.mock.calls.at(-1);
  return String(call?.[0] ?? "");
};

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    vi.spyOn(process.stderr, "write").mockImplementation(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes info to stdout as json with iso timestamp and meta", () => {
    log.info("hello", { foo: "bar" });
    const parsed = JSON.parse(lastWrite(process.stdout).trim()) as Record<string, unknown>;
    expect(parsed.level).toBe("info");
    expect(parsed.msg).toBe("hello");
    expect(parsed.foo).toBe("bar");
    expect(parsed.ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("writes error to stderr", () => {
    log.error("boom");
    expect(vi.mocked(process.stderr.write)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(process.stdout.write)).not.toHaveBeenCalled();
  });

  it("writes warn to stderr", () => {
    log.warn("careful");
    expect(vi.mocked(process.stderr.write)).toHaveBeenCalledTimes(1);
  });

  it("writes debug to stdout", () => {
    log.debug("trace");
    expect(vi.mocked(process.stdout.write)).toHaveBeenCalledTimes(1);
  });

  it("omits meta when not provided", () => {
    log.info("bare");
    const parsed = JSON.parse(lastWrite(process.stdout).trim()) as Record<string, unknown>;
    expect(Object.keys(parsed).sort()).toEqual(["level", "msg", "ts"]);
  });
});
