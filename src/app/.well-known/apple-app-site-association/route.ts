import { NextResponse } from "next/server";

// iOS Universal Links: lets https://frapic.de/u/<username> open the Frapic app
// directly instead of the browser. Must be served over HTTPS, uncompressed, with
// no redirects, and (per Apple's spec) works with or without a .json extension —
// this route exists specifically so the content-type is always application/json
// regardless of hosting platform, since static-file serving doesn't reliably set
// that for a file with no extension.
//
// TODO: replace REPLACE_WITH_APPLE_TEAM_ID with the real value from
// developer.apple.com/account -> Membership (10-character code, e.g. QQ57RJ5UTD).
const TEAM_ID = "5F7WJT52AV";

const BUNDLE_IDS = [
  "com.Frapic.Frapic", // production
  "com.Frapic.Frapic.preview",
  "com.Frapic.Frapic.dev",
];

export function GET() {
  return NextResponse.json(
    {
      applinks: {
        apps: [],
        details: BUNDLE_IDS.map((bundleId) => ({
          appID: `${TEAM_ID}.${bundleId}`,
          paths: ["/u/*"],
        })),
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
