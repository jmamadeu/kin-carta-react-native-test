import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ContactDetailSection } from '../../components/contact-detail-section';
import { Divider } from '../../components/divider';
import { ContactScreenRouteProp } from '../../routes/types';
import { queryClient } from '../../services/api';
import { getContactsParsedByFavorite, parseContactsByFavorite } from '../../utils/contacts';

export function ContactProfile() {
  const {
    params: { contact }
  } = useRoute<ContactScreenRouteProp>();
  const [isFavorite, setIsFavorite] = useState(contact.isFavorite);

  const favoriteImg = isFavorite
    ? require('../../assets/favorite-true.png')
    : require('../../assets/favorite-false.png');

  function toggleFavoriteContacts() {
    const contactsParsed = getContactsParsedByFavorite().map((cont) =>
      cont.id === contact.id ? { ...cont, isFavorite: !cont.isFavorite } : cont
    );

    return contactsParsed;
  }
  const handlePressContactToggleFavorite = () => {
    const contacts = toggleFavoriteContacts();
    const contactsParsed = parseContactsByFavorite(contacts);

    queryClient.setQueryData('contacts', contactsParsed);
    setIsFavorite((old) => !old);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: contact.largeImageURL }} style={styles.largeProfilePhoto} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{contact?.name}</Text>
            <TouchableOpacity onPress={handlePressContactToggleFavorite} activeOpacity={0.5}>
              <Image source={favoriteImg} />
            </TouchableOpacity>
          </View>
          <Text>{contact.companyName}</Text>
        </View>

        {contact.phone.home ? (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Phone',
                value: contact.phone.home,
                subTitle: 'Home'
              }}
            />
          </>
        ) : null}

        {contact.phone.mobile ? (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Phone',
                value: contact.phone.mobile,
                subTitle: 'Mobile'
              }}
            />
          </>
        ) : null}

        {contact.phone.work ? (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Phone',
                value: contact.phone.work,
                subTitle: 'Work'
              }}
            />
          </>
        ) : null}

        {contact.address && (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Address',
                value: `${contact.address.zipCode}, ${contact.address.street}, ${contact.address.city}, ${contact.address.state}, ${contact.address.country}`
              }}
            />
          </>
        )}

        {contact.birthdate ? (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Birthday',
                value: `${contact.birthdate}`
              }}
            />
          </>
        ) : null}

        {contact.emailAddress ? (
          <>
            <Divider />
            <ContactDetailSection
              data={{
                title: 'Email',
                value: contact.emailAddress
              }}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  },
  scrollViewContainer: {
    marginHorizontal: 20
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  nameContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5
  },
  largeProfilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#333'
  }
});
