import { collectionEntry } from "@/components/content/CollectionPages";

// EZJSDEV reminders ("pense-bêtes") collection, declared in site/config.ts.
const page = collectionEntry("reminders");

export const generateMetadata = page.generateMetadata;
export default page.Page;
