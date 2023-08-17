import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { Contacts, iSoftClient } from '../../../client';
import { ContactsForm } from '@/components/forms/ContactsForm';
import { WarningMessage } from '@/components/ui/WarningMessage';

type ContactsProps = {
  contactsData: Contacts[] | null;
};

export const getServerSideProps: GetServerSideProps<
  ContactsProps
> = async () => {
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const contactsData =
      await client.contactsEndpoints.contactsControllerGetContacts();
    return {
      props: { contactsData },
    };
  } catch (err) {
    return {
      props: { contactsData: null },
    };
  }
};

const Contacts: FC<ContactsProps> = ({ contactsData }) => {
  return (
    <SectionLayout>
      <Title>Контакти</Title>
      {contactsData ? (
        <ContactsForm contactsData={contactsData} />
      ) : (
        <WarningMessage>Інформацію про контакти не знайдено!</WarningMessage>
      )}
    </SectionLayout>
  );
};

export default Contacts;
