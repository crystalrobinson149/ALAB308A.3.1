// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


// central: database identifies which database the users are stored within
const val = await central(7);
console.log(val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(3)
console.log(val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(6);
console.log(val3);

central(10).then(db => console.log(db))
db3(10).then(userBasicInfo => console.log(userBasicInfo))
vault(10).then(userPersonalInfo => console.log(userPersonalInfo))



function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
}

async function getUserInfo(id) { 
  if (typeof id !== "number" || id < 1 || id > 10) {
      return Promise.reject(new Error("Invalid ID: ID must be a number between 1 and 10"));
  }

  try {
      const dbs = await central(id);

      const [userData, addressData, contactData] = await Promise.all([
          eval(dbName)(id), 
          address(id),
          contact(id)
      ]);

      return {
          id: id,
          name: contactData.name,
          username: userData.username,
          email: contactData.email,
          address: {
              street: addressData.street,
              suite: addressData.suite,
              city: addressData.city,
              zipcode: addressData.zipcode,
              geo: {
                  lat: addressData.geo.lat,
                  lng: addressData.geo.lng
              }
          },
          phone: contactData.phone,
          website: userData.website,
          company: {
              name: userData.company.name,
              catchPhrase: userData.company.catchPhrase,
              bs: userData.company.bs
          }
      };
  } catch (error) {
      return Promise.reject(new Error(`Failed to fetch user data: ${error.message}`));
  }
}
getUserInfo(9);
