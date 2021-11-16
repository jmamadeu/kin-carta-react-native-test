import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContactProperties } from '../src/models/contact';

export type RootStackParamList = {
  Contacts: undefined;
  Contact: { contactId: ContactProperties['id'] };
};

export type ContactsProps = NativeStackScreenProps<RootStackParamList, 'Contacts'>;
export type ContactsScreenNavigationProp = ContactsProps['navigation'];
export type ContactsScreenRouteProp = ContactsProps['route'];

export type ContactProps = NativeStackScreenProps<RootStackParamList, 'Contact'>;
export type ContactScreenNavigationProp = ContactProps['navigation'];
export type ContactScreenRouteProp = ContactProps['route'];
