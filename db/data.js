let instance;

class DB {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }

    // Default data
    this.data = {
      user: {
        "a16b2a2e-996b-404b-9a0b-f2ca150eac5e": {
          name: "darshan",
          userName: "darshan",
          password: "dr",
          id: "a16b2a2e-996b-404b-9a0b-f2ca150eac5e",
        },
        "21070ca2-fa00-4171-9c8a-bd9ae59a0261": {
          name: "sukhdev",
          userName: "sukhdev",
          password: "sukhi",
          id: "21070ca2-fa00-4171-9c8a-bd9ae59a0261",
        },
      },
      contact: {
        "a16b2a2e-996b-404b-9a0b-f2ca150eac5e": {
          "708e7cbc-a54e-4dc2-95ca-f9178b11897e": {
            firstName: "Vivek",
            lastName: "Jivani",
            userId: "a16b2a2e-996b-404b-9a0b-f2ca150eac5e",
            id: "708e7cbc-a54e-4dc2-95ca-f9178b11897e",
          },
        },
      },
      contactInfo: {
        "708e7cbc-a54e-4dc2-95ca-f9178b11897e": {
          "9e82a5db-d1a9-4e7d-b5ff-5df085fa02ab": {
            type: "Home",
            number: "123",
            contactId: "708e7cbc-a54e-4dc2-95ca-f9178b11897e",
            id: "9e82a5db-d1a9-4e7d-b5ff-5df085fa02ab",
          },
          "334b33fc-e0e8-4e21-bd6b-30d1a1b9fda9": {
            type: "Work",
            number: "456",
            contactId: "708e7cbc-a54e-4dc2-95ca-f9178b11897e",
            id: "334b33fc-e0e8-4e21-bd6b-30d1a1b9fda9",
          },
        },
      },
    };
  }
}

let dbInstance = new DB();

module.exports = dbInstance;
