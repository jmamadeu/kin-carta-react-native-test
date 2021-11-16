import React from 'react';
import { Button, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ContactListItem } from '../../components/contact-list-item';
import { useContacts } from '../../hooks/use-contacts';
import { ContactProperties, ContactSectionedByFavoriteProperties } from '../../models/contact';
import { queryClient } from '../../services/api';
import { sortContactsByName } from '../../utils/contacts';

export function ContactList() {
  const { data: contacts = [], error, isLoading } = useContacts();

  const handleOnPressSort = (isFavorite: ContactProperties['isFavorite']) => {
    const sortedFavorites: ContactSectionedByFavoriteProperties[] = [];

    if (isFavorite) {
      sortedFavorites.push(
        {
          ...contacts[0],
          data: sortContactsByName(contacts[0].data)
        },
        contacts[1]
      );
    } else {
      sortedFavorites.push(contacts[0], {
        ...contacts[1],
        data: sortContactsByName(contacts[1].data)
      });
    }

    queryClient.setQueryData('contacts', sortedFavorites);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading contacts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Contacts</Text>

      <SafeAreaView>
        <SectionList
          sections={contacts}
          extraData={contacts}
          keyExtractor={(contact) => contact.id}
          renderItem={({ item: contact, index }) => (
            <View style={styles.contactContainer}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.contactItemContainer}>
                <ContactListItem {...contact} />
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title, isFavorite } }) => (
            <View>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Button title="Sort" onPress={() => handleOnPressSort(isFavorite)} />
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 40
  },
  mainTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10
  },
  sectionTitle: {
    backgroundColor: '#f4f4f3',
    padding: 8,
    textTransform: 'uppercase',
    marginVertical: 8
  },
  contactContainer: {
    marginHorizontal: 20
  },
  divider: {
    borderBottomColor: '#3334',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  contactItemContainer: {
    marginVertical: 10
  }
});
