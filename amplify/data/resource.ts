import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Guardian: a
      .model({
        guardianId: a.id().required(),
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.email().required(),
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
        ethnicity: a.string().required(),
        dob: a.date().required(),
        school: a.string().required(),
        allergies: a.string(),
        disabilities: a.string(),
        freeSchoolMeals: a.boolean(),
        permissionToLeave: a.boolean(),
        playgroundEntry: a.hasOne("Playground", "childId"),
        assignedEmoji: a.hasOne("EmojiStore", "childId"),
        auditEntry: a.hasMany("Audit", "childId"),
      })
      .identifier(["childId"]),

    Playground: a
      .model({
        childId: a.id().required(),
        child: a.belongsTo("Child", "childId"),
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
        childId: a.id(),
        child: a.belongsTo("Child", "childId"),
      })
      .identifier(["emoji"]),

    GenderEnum: a.enum(["MALE", "FEMALE", "NONBINARY", "NA"]),

    EventType: a.enum([
      "CREATE",
      "READ",
      "UPDATE",
      "DELETE",
      "ERROR",
      "ENTRY",
      "EXIT",
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