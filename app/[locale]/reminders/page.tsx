import { collectionListing } from "@/components/content/CollectionPages";

// EZJSDEV reminders ("pense-bêtes") collection, declared in site/config.ts.
const page = collectionListing("reminders");

export const generateMetadata = page.generateMetadata;
export default page.Page;
