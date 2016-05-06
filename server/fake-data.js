import faker from 'faker';
import { times, random } from 'lodash';

export default function fakeData() {
  return times(random(2, 20)).map((_, idx) => {
    return {
      title: `${faker.commerce.department()} - ${faker.commerce.productName()}`,
      BIC: {
          code: faker.random.number(),
          description: faker.lorem.sentences(3)
      },
      CU: {
          code: faker.random.number(),
          title: faker.company.catchPhrase(),
          description: faker.lorem.sentences(3)
      },
      expanded: false
    };
  });
}
