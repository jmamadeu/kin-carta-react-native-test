import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { ContactProperties, ContactSectionedByFavoriteProperties } from '../models/contact';
import { api } from '../services/api';

const fetchAllContacts = async (): Promise<ContactSectionedByFavoriteProperties[]> => {
  const { data: contacts } = await api.get<ContactProperties[]>('/contacts.json');

  const parsedContacts: ContactSectionedByFavoriteProperties[] = [
    {
      title: 'Favorites Contacts',
      isFavorite: true,
      data: contacts.filter((contact) => contact.isFavorite)
    },
    {
      title: 'Others Contacts',
      isFavorite: false,
      data: contacts.filter((contact) => !contact.isFavorite)
    }
  ];

  return parsedContacts;
};

export function useContacts() {
  return useQuery<ContactSectionedByFavoriteProperties[], AxiosError>('contacts', fetchAllContacts);
}
