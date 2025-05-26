import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Guardian: a
      .model({
        guardianId: a.id().required(),
        firstName: a.string().required(),
        lastName: a.string().required(),
        addressLine1: a.string().required(),
        addressLine2: a.string(),
        city: a.string().required(),
        postcode: a.string().required(),
        phoneNumber: a.phone().required(),
        permissionMedia: a.boolean().required(),
        permissionContact: a.boolean().required(),
        referralSource: a.string(),
        children: a.hasMany("Child", "guardianId"),
        auditEntry: a.hasMany("Audit", "guardianId"),
      })
      .identifier(["guardianId"]),

    Child: a
      .model({
        childId: a.id().required(),
        guardianId: a.id().required(),
        guardian: a.belongsTo("Guardian", "guardianId"),
        firstName: a.string().required(),
        lastName: a.string().required(),
        gender: a.ref("GenderEnum").required(),
        ethnicity: a.ref("EthnicityEnum").required(),
        dob: a.date().required(),
        school: a.string().required(),
        allergies: a.string(),
        disabilities: a.string(),
        freeSchoolMeals: a.boolean(),
        permissionToLeave: a.boolean(),
        playgroundEntry: a.hasOne("Playground", "childId"),
        assignedEmoji: a.hasOne("AssignedEmojis", "childId"),
        auditEntry: a.hasMany("Audit", "childId"),
      })
      .identifier(["childId"]),

    Playground: a
      .model({
        childId: a.id().required(),
        child: a.belongsTo("Child", "childId"),
        fullName: a.string().required(),
      })
      .identifier(["childId"]),

    Audit: a
      .model({
        auditId: a.id().required(),
        eventType: a.ref("EventType").required(),
        message: a.string(),
        visitor: a.boolean(),
        volunteer: a.boolean(),
        guardianId: a.id(),
        guardian: a.belongsTo("Guardian", "guardianId"),
        childId: a.id(),
        child: a.belongsTo("Child", "childId"),
      })
      .identifier(["auditId"]),

    EmojiStore: a
      .model({
        emoji: a.id().required(),
      })
      .identifier(["emoji"]),

    AssignedEmojis: a
      .model({
        emoji: a.id().required(),
        childId: a.id().required(),
        child: a.belongsTo("Child", "childId"),
        firstName: a.string().required(),
        lastName: a.string().required(),
      })
      .identifier(["emoji"]),

    Statistics: a
      .model({
        fullDate: a.id().required(),
        day: a.string().required(),
        month: a.string().required(),
        year: a.string().required(),
        totalVisitors: a.integer().required(),
        totalChildren: a.integer().required(),
      })
      .identifier(["fullDate"]),

    GenderEnum: a.enum([
      "MALE",
      "FEMALE",
      "NON_BINARY",
      "OTHER",
      "SKIP"
    ]),

    EthnicityEnum: a.enum([
      "INDIAN",
      "PAKISTANI",
      "BANGLADESHI",
      "CHINESE",
      "OTHER_ASIAN",
      "AFRICAN",
      "CARIBBEAN",
      "OTHER_BLACK",
      "WHITE_AND_BLACK_CARIBBEAN",
      "WHITE_AND_BLACK_AFRICAN",
      "WHITE_AND_ASIAN",
      "OTHER_MIXED",
      "WHITE_BRITISH",
      "WHITE_IRISH",
      "WHITE_GYPSY_TRAVELLER",
      "ROMA",
      "WHITE_OTHER",
      "ARAB",
      "OTHER",
      "SKIP"
    ]),

    EventType: a.enum([
      "CREATE",
      "READ",
      "UPDATE",
      "DELETE",
      "ERROR",
      "ENTRY",
      "EXIT",
      "EMOJISTORE",
      "VOLUNTEER",
      "VISITOR",
    ]),
  })
  .authorization((allow) => [allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
