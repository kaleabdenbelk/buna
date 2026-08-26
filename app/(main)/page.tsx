import HomeClient from "./HomeClient";

export default async function Page() {
    // Page renders instantly — stats & session are fetched client-side
    // so MongoDB slowness never blocks the initial paint.
    // Footer is rendered in (main)/layout.tsx
    return <HomeClient />;
}
