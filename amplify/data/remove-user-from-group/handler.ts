import type { Schema } from "../resource"
import { env } from "$amplify/env/remove-user-from-registered"
import {
  AdminRemoveUserFromGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["removeUserFromGroup"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {
  const { userId } = event.arguments

  const command = new AdminRemoveUserFromGroupCommand({
    Username: userId,
    GroupName: "registered",
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  })
  const response = await client.send(command)
  
  return response
}