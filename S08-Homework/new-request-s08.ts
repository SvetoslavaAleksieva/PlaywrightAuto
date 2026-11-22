type ContactDetails = {
  name: string;
  email: string;
  phone: string;
};

type RequestLocation  = {
  city: string;
  street: string;
};

type RequestDetails = {
  title: string;
  description: string;
};

type Attachment = {
  fileName: string;
};

type NewRequest = {
  contact: ContactDetails;
  location: RequestLocation;
  details: RequestDetails;
  attachments: Attachment[];
};

const r: NewRequest = {
  contact: { name: 'Peter Parker', email: 'p.parker@ss.com', phone:'0883312345' },
  location: { city: 'Sofia', street: 'Slivnica 139' },
  details: { title: 'Printer is not working', description: 'Paper jam on the 3rd floor' },
  attachments: [{ fileName: 'photo.png' }],
};

console.log('===== New Request =====');
console.log(`Title:       ${r.details.title}`);
console.log(`Description: ${r.details.description}`);
console.log('');
console.log('Contact');
console.log(`  Name:  ${r.contact.name}`);
console.log(`  Email: ${r.contact.email}`);
console.log(`  Phone: ${r.contact.phone}`);
console.log('');
console.log(`Location: ${r.location.street}, ${r.location.city}`);
console.log('');
console.log('Attachments');
for (const attachment of r.attachments) {
  console.log(`  - ${attachment.fileName}`);
}
console.log('=======================');