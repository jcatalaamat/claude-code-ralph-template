type Level = "debug" | "info" | "warn" | "error";

type Meta = Record<string, unknown>;

const emit = (level: Level, msg: string, meta: Meta | undefined): void => {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    ...(meta ?? {}),
  });
  if (level === "error" || level === "warn") {
    process.stderr.write(`${line}\n`);
  } else {
    process.stdout.write(`${line}\n`);
  }
};

export const log = {
  debug: (msg: string, meta?: Meta): void => emit("debug", msg, meta),
  info: (msg: string, meta?: Meta): void => emit("info", msg, meta),
  warn: (msg: string, meta?: Meta): void => emit("warn", msg, meta),
  error: (msg: string, meta?: Meta): void => emit("error", msg, meta),
};
