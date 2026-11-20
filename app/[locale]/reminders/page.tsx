import { collectionListing } from "@/components/content/CollectionPages";

// EZJSDEV reminders ("pense-bêtes") collection, declared in constants/site.ts.
const page = collectionListing("reminders");

export const generateMetadata = page.generateMetadata;
export default page.Page;
