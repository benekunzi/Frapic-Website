import type { Metadata } from "next";
import Link from "next/link";
import { getPublicProfile } from "@/lib/getPublicProfile";

// Not part of the main marketing site nav — a narrow-purpose landing page that
// share links (frapic.de/u/<username>) resolve to, so it intentionally skips
// the site's LanguageProvider/i18n (English only).

const APP_STORE_URL = "https://apps.apple.com/de/app/frapic/id6778465385";
const FALLBACK_IMAGE = "/Frapic-Logo.png";

type PageProps = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params;
    const profile = await getPublicProfile(username);

    const title = profile
        ? `${profile.displayName || profile.username} is on Frapic`
        : "Frapic";
    const description = profile
        ? `Add ${profile.displayName || profile.username} on Frapic to see their journal.`
        : "Frapic is a social app for close friends.";
    const image = profile?.profilePicUrl || FALLBACK_IMAGE;

    return {
        title,
        description,
        // Bots that unfurl share previews (WhatsApp, iMessage, Slack, Telegram, ...) fetch
        // this page's OG tags regardless of robots directives — this only keeps it out of
        // search engines, since it's not a page meant to be discovered/browsed directly.
        robots: { index: false, follow: false },
        openGraph: {
            title,
            description,
            images: [image],
        },
        twitter: {
            card: "summary",
            title,
            description,
            images: [image],
        },
    };
}

export default async function PublicProfilePage({ params }: PageProps) {
    const { username } = await params;
    const profile = await getPublicProfile(username);
    const appLink = `frapicexpo://user/${encodeURIComponent(username)}`;

    return (
        <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
            {profile?.profilePicUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote, per-request signed URL; not worth wiring into next/image's remote-pattern config
                <img
                    src={profile.profilePicUrl}
                    alt={profile.displayName || profile.username}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover"
                />
            ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                    {(profile?.displayName || username).charAt(0).toUpperCase()}
                </div>
            )}

            <h1 className="mt-6 text-2xl font-semibold">
                {profile ? (profile.displayName || `@${profile.username}`) : "This profile could not be found"}
            </h1>
            {profile && <p className="mt-1 text-white/50">{`@${profile.username}`}</p>}

            <p className="mt-6 text-white/70 max-w-sm">
                {profile
                    ? "Add them on Frapic to see their journal."
                    : "This link may be broken, or the account no longer exists."}
            </p>

            <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
                {profile && (
                    <Link
                        href={appLink}
                        className="px-6 py-3 rounded-xl bg-white text-black font-semibold transition-colors hover:bg-white/90"
                    >
                        Open in Frapic
                    </Link>
                )}
                <Link
                    href={APP_STORE_URL}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
                >
                    Get Frapic on the App Store
                </Link>
            </div>
        </main>
    );
}
