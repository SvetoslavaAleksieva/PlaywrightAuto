// Test data for NewRequest: 3 valid and 3 invalid objects

// ===== Types =====

type ContactDetails = {
  name: string;
  email: string;
  phone: string;
};

type RequestLocation = {
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

// ===== Valid test data =====

const valid1: NewRequest = {
  contact: { name: 'Peter Parker', email: 'p.parker@ss.com', phone: '0883312345' },
  location: { city: 'Sofia', street: 'Slivnica 139' },
  details: { title: 'Printer is not working', description: 'Paper jam on the 3rd floor' },
  attachments: [{ fileName: 'photo.png' }],
};

const valid2: NewRequest = {
  contact: { name: 'Mary Jane', email: 'mary.jane@ss.com', phone: '0887654321' },
  location: { city: 'Plovdiv', street: 'Main Street 5' },
  details: { title: 'No internet', description: 'Wi-Fi is down in room 12' },
  attachments: [], // no files is OK
};

const valid3: NewRequest = {
  contact: { name: 'Tony Stark', email: 'tony@ss.com', phone: '0899111222' },
  location: { city: 'Varna', street: 'Sea Garden 1' },
  details: { title: 'New laptop needed', description: 'The old one does not turn on' },
  attachments: [{ fileName: 'invoice.pdf' }, { fileName: 'laptop.jpg' }],
};

// ===== Invalid test data =====

const invalid1: NewRequest = {
  // Invalid: contact is missing the email field
  // @ts-expect-error
  contact: { name: 'Bruce Wayne', phone: '0888000111' },
  location: { city: 'Sofia', street: 'Vitosha 10' },
  details: { title: 'Broken chair', description: 'One leg is missing' },
  attachments: [],
};

const invalid2: NewRequest = {
  // Invalid: phone is a number, but it must be a string
  // @ts-expect-error
  contact: { name: 'Clark Kent', email: 'clark@ss.com', phone: 888222333 },
  location: { city: 'Burgas', street: 'Port 3' },
  details: { title: 'Phone not working', description: 'No signal' },
  attachments: [],
};

// Invalid: the attachments field is missing completely
// @ts-expect-error
const invalid3: NewRequest = {
  contact: { name: 'Diana Prince', email: 'diana@ss.com', phone: '0877333444' },
  location: { city: 'Ruse', street: 'Danube 7' },
  details: { title: 'Light is broken', description: 'The lamp in the hall flickers' },
};

console.log('Valid requests:');
console.log(`  - ${valid1.details.title}`);
console.log(`  - ${valid2.details.title}`);
console.log(`  - ${valid3.details.title}`);

console.log('Invalid requests:');
console.log(`  - invalid1: email is ${invalid1.contact.email}`);
console.log(`  - invalid2: phone is a ${typeof invalid2.contact.phone}`);
console.log(`  - invalid3: attachments is ${invalid3.attachments}`);