import { ContactProperties } from '../models/contact';

export function sortContactsByName(section: ContactProperties[]): ContactProperties[] {
  const sectionSorted = section
    ?.map((cont) => cont.name)
    ?.sort()
    ?.map((cont) => section?.find((d) => d.name === cont) || ({} as ContactProperties));

  return sectionSorted || [];
}
