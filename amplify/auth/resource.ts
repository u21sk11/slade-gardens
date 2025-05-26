import { defineAuth } from "@aws-amplify/backend";
import { customMessage } from "./custom-message/resource";
import { addUserToGroup } from "../data/add-user-to-group/resource"
import { removeUserFromGroup } from "../data/remove-user-from-group/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["ADMINS", "GUARDIAN"],
  triggers: {
    customMessage,
  },

  access: (allow) => [
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(removeUserFromGroup).to(["removeUserFromGroup"])
  ],
});
