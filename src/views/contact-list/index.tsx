import React from 'react';
import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ContactListItem } from '../../components/contact-list-item';
import { useContacts } from '../../hooks/use-contacts';

export function ContactList() {
  const { data: contacts = [], error, isLoading } = useContacts();

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
            <>
              {index > 0 && <View style={styles.divider} />}
              <ContactListItem {...contact} />
            </>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
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
  divider: {
    borderBottomColor: '#3334',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20
  }
});
