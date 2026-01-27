import { useMutation } from "@tanstack/react-query";

import { addToContacts } from "@/entities/contact/api/addToContacts";
import { mapToAddByPhonePayload } from "@/entities/contact/model/mappers";
import { useContactStore } from "@/entities/contact/model/store";
import { Contact } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";

type ContactCardFeatureProps = {
  contact: Contact;
};

export const ContactCardFeature: React.FC<ContactCardFeatureProps> = ({ contact }) => {
  const addContactToStore = useContactStore((s) => s.addContacts);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = mapToAddByPhonePayload(contact);
      const res = await addToContacts(payload);

      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: (newContact) => {
      addContactToStore([newContact]);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const handleClick = () => {
    // Вызываем мутацию только если запрос еще не идет
    if (!isPending) {
      mutate();
    }
  };
  return <ContactCard contact={contact} onClick={handleClick} />;
};
