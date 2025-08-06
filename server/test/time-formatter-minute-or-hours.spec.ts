import { expect, describe, it } from "vitest";
import { TimeFormatterMinuteOrHours } from "./TimeFormatterMinuteOrHours.utils";

describe("Time formatter minute or hours", () => {
  it("Should return correct formats", () => {
    const timeFormatter = new TimeFormatterMinuteOrHours();
    const formattedTimeForEntity = timeFormatter.format("");
    const formattedTimeFor30Seconds = timeFormatter.format("1");
    const formattedTimeFor120Seconds = timeFormatter.format("120s");
    const formattedTimeFor3600Seconds = timeFormatter.format("3600s");
    const formattedTimeFor3660Seconds = timeFormatter.format("3660s");
    const formattedTimeFor21600Seconds = timeFormatter.format("21600s");
    const formattedTimeFor24300Seconds = timeFormatter.format("24300s");

    expect(formattedTimeForEntity).toBe("0 min");
    expect(formattedTimeFor30Seconds).toBe("1 min");
    expect(formattedTimeFor120Seconds).toBe("2 min");
    expect(formattedTimeFor3600Seconds).toBe("1 H");
    expect(formattedTimeFor3660Seconds).toBe("1 H 1 min");
    expect(formattedTimeFor21600Seconds).toBe("6 H");
    expect(formattedTimeFor24300Seconds).toBe("6 H 45 min");
  });
});
