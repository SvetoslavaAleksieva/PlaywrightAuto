type DataRequest = {
  title: string;
  category: string;
  priority: number;
  email: string;
};

class TestDataFactory {
  validRequest(overrides?: Partial<DataRequest>): DataRequest {
    const defaults: DataRequest = {
      title: 'Printer is not working',
      category: 'Support',
      priority: 3,
      email: 'p.parker@ss.com',
    };

    // Values from overrides replace the default values
    return { ...defaults, ...overrides };
  }
}

function printRequest(label: string, request: DataRequest): void {
  console.log(`--- ${label} ---`);
  console.log(`  Title:    ${request.title}`);
  console.log(`  Category: ${request.category}`);
  console.log(`  Priority: ${request.priority}`);
  console.log(`  Email:    ${request.email}`);
  console.log('');
}

const factory = new TestDataFactory();

const request1 = factory.validRequest();
const request2 = factory.validRequest({ priority: 1 });
const request3 = factory.validRequest({ title: 'No internet', category: 'Bug' });

printRequest('Request 1 (defaults)', request1);
printRequest('Request 2 (priority: 1)', request2);
printRequest('Request 3 (title + category)', request3);

// Each call returns a fresh object, so changing one does not change another
request1.title = 'Changed title';
const request4 = factory.validRequest();

console.log('--- Fresh object check ---');
console.log(`  request1 title: ${request1.title}`);
console.log(`  request4 title: ${request4.title}`);